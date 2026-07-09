#!/usr/bin/env node
/**
 * insights.mjs — internal ops view over the web-agent D1
 * (architectural-web-agent, e0188046…). Two jobs, both read-only:
 *
 *   1. SPEND VISIBILITY — total + per-day + per-brand agent cost, today's spend
 *      against the same UTC-midnight daily ceiling the circuit breaker enforces
 *      (lib/agents/guardrails.ts), token usage, and prompt-cache hit ratio.
 *   2. LEAD + QUESTION MINING — RFQ submissions (rfq_submissions) and the
 *      agent-as-content loop: every question asked, with the refused/escalated
 *      ones surfaced first because those are the FAQ/spec-library gaps worth
 *      authoring next (plan Part 7.2).
 *
 * Deliberately a local script, not a page: this data (spend, raw leads) must
 * not be exposed on the public marketing site without auth. No new service, no
 * new dependency — just the Cloudflare D1 REST API with the existing token.
 *
 * Usage:
 *   node scripts/insights.mjs                # full report, all time
 *   node scripts/insights.mjs --days=7       # window to the last 7 days
 *   node scripts/insights.mjs --questions=50 # show up to N mined questions
 *   node scripts/insights.mjs --json         # machine-readable dump
 *
 * Credentials: reads .env.local (CLOUDFLARE_API_TOKEN required). The account ID
 * and web-agent DB ID are shared, non-secret identifiers and default to the
 * known values (same pattern as lib/cloudflare.ts DB_IDS); override via env.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// ---- config -------------------------------------------------------------
const DEFAULT_ACCOUNT_ID = "f6533d2f54eb09876d33ad2f11bcc60c";
const DEFAULT_WEB_AGENT_DB = "e0188046-2ac2-4485-a6d7-fdb35d38d969";
const DEFAULT_CEILING = 25;

// ---- .env.local loader (minimal, no dependency) -------------------------
function loadEnvLocal() {
  try {
    const raw = readFileSync(resolve(ROOT, ".env.local"), "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
      if (!m) continue;
      const key = m[1];
      let val = m[2].trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = val;
    }
  } catch {
    // no .env.local — rely on process.env only
  }
}
loadEnvLocal();

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || DEFAULT_ACCOUNT_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const WEB_DB = process.env.WEB_AGENT_D1_DATABASE_ID || DEFAULT_WEB_AGENT_DB;
const CEILING = Number(process.env.AGENT_DAILY_SPEND_CEILING_USD ?? DEFAULT_CEILING);

if (!API_TOKEN) {
  console.error(
    "✗ CLOUDFLARE_API_TOKEN is not set (checked env and .env.local).\n" +
      "  Set it in .env.local — the token needs D1:Read on this account.",
  );
  process.exit(1);
}

// ---- args ---------------------------------------------------------------
const args = process.argv.slice(2);
const getFlag = (name, fallback) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=")[1] : fallback;
};
const asJson = args.includes("--json");
const days = Number(getFlag("days", 0)); // 0 = all time
const questionLimit = Number(getFlag("questions", 25));

const now = Date.now();
const startOfUtcDay = now - (now % 86_400_000);
const windowStart = days > 0 ? now - days * 86_400_000 : 0;

// ---- D1 REST ------------------------------------------------------------
async function d1(sql, params = []) {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${WEB_DB}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sql, params }),
    },
  );
  const json = await res.json();
  if (!json.success) {
    throw new Error(
      `D1 query failed (${res.status}): ${JSON.stringify(json.errors)}`,
    );
  }
  return json.result[0]?.results ?? [];
}

// ---- formatting helpers -------------------------------------------------
const usd = (n) => `$${(Number(n) || 0).toFixed(4)}`;
const pct = (n, d) => (d > 0 ? `${((n / d) * 100).toFixed(1)}%` : "—");
const int = (n) => (Number(n) || 0).toLocaleString("en-US");
const day = (ts) => new Date(Number(ts)).toISOString().slice(0, 10);

function table(rows, cols) {
  if (rows.length === 0) return "  (none)";
  const widths = cols.map((c) =>
    Math.max(c.label.length, ...rows.map((r) => String(c.get(r)).length)),
  );
  const line = (cells) =>
    "  " +
    cells
      .map((cell, i) => (cols[i].right ? String(cell).padStart(widths[i]) : String(cell).padEnd(widths[i])))
      .join("  ");
  const header = line(cols.map((c) => c.label));
  const rule = "  " + widths.map((w) => "─".repeat(w)).join("  ");
  const body = rows.map((r) => line(cols.map((c) => c.get(r)))).join("\n");
  return [header, rule, body].join("\n");
}

function bar(fraction, width = 24) {
  const filled = Math.max(0, Math.min(width, Math.round(fraction * width)));
  return "█".repeat(filled) + "░".repeat(width - filled);
}

const H = (s) => `\n\x1b[1m${s}\x1b[0m`; // bold header
const dim = (s) => `\x1b[2m${s}\x1b[0m`;

// ---- queries ------------------------------------------------------------
const evWhere = windowStart > 0 ? "WHERE ts >= ?" : "";
const evParams = windowStart > 0 ? [windowStart] : [];

async function main() {
  const [overall] = await d1(
    `SELECT COUNT(*) n,
            COALESCE(SUM(cost_usd),0) cost,
            COALESCE(SUM(input_tokens),0) in_tok,
            COALESCE(SUM(output_tokens),0) out_tok,
            COALESCE(SUM(cached_input_tokens),0) cached_tok,
            COALESCE(SUM(refused),0) refused,
            COALESCE(SUM(escalated),0) escalated,
            MIN(ts) first_ts, MAX(ts) last_ts
       FROM agent_events ${evWhere}`,
    evParams,
  );

  const [{ s: spentToday } = { s: 0 }] = await d1(
    "SELECT COALESCE(SUM(cost_usd),0) s FROM agent_events WHERE ts >= ?",
    [startOfUtcDay],
  );

  const byBrand = await d1(
    `SELECT brand,
            COUNT(*) n,
            COALESCE(SUM(cost_usd),0) cost,
            COALESCE(SUM(refused),0) refused,
            COALESCE(SUM(escalated),0) escalated
       FROM agent_events ${evWhere}
      GROUP BY brand ORDER BY cost DESC`,
    evParams,
  );

  const byDay = await d1(
    `SELECT CAST(ts/86400000 AS INTEGER) d,
            COUNT(*) n,
            COALESCE(SUM(cost_usd),0) cost
       FROM agent_events ${evWhere}
      GROUP BY d ORDER BY d DESC LIMIT 30`,
    evParams,
  );

  const questions = await d1(
    `SELECT ts, brand, question, refused, escalated
       FROM agent_events ${evWhere}
      ORDER BY (refused + escalated) DESC, ts DESC
      LIMIT ?`,
    [...evParams, questionLimit],
  );

  // Leads (rfq_submissions) — not time-windowed by default; leads are rare.
  const rfqWhere = windowStart > 0 ? "WHERE ts >= ?" : "";
  const rfqParams = windowStart > 0 ? [windowStart] : [];
  const [rfqOverall] = await d1(
    `SELECT COUNT(*) n FROM rfq_submissions ${rfqWhere}`,
    rfqParams,
  );
  const rfqBySource = await d1(
    `SELECT COALESCE(source,'(none)') source, COALESCE(intent,'—') intent, COUNT(*) n
       FROM rfq_submissions ${rfqWhere}
      GROUP BY source, intent ORDER BY n DESC`,
    rfqParams,
  );
  const rfqRecent = await d1(
    `SELECT ts, email, company, product_line, intent, source
       FROM rfq_submissions ${rfqWhere}
      ORDER BY ts DESC LIMIT 15`,
    rfqParams,
  );

  if (asJson) {
    console.log(
      JSON.stringify(
        { overall, spentToday, ceiling: CEILING, byBrand, byDay, questions, rfq: { rfqOverall, rfqBySource, rfqRecent } },
        null,
        2,
      ),
    );
    return;
  }

  // ---- render ----------------------------------------------------------
  const scope = days > 0 ? `last ${days} day(s)` : "all time";
  const range =
    overall.n > 0
      ? `${day(overall.first_ts)} → ${day(overall.last_ts)}`
      : "no events";
  console.log(
    `\x1b[1mIAS — agent spend & lead insights\x1b[0m  ${dim(`(${scope}; ${range})`)}`,
  );

  // Spend & usage
  console.log(H("SPEND & USAGE"));
  console.log(`  Events            ${int(overall.n)}`);
  console.log(`  Total cost        ${usd(overall.cost)}`);
  console.log(
    `  Avg / event       ${overall.n > 0 ? usd(overall.cost / overall.n) : "—"}`,
  );
  const inTok = Number(overall.in_tok);
  const cachedTok = Number(overall.cached_tok);
  console.log(
    `  Input tokens      ${int(inTok)}  ${dim(`(cached ${int(cachedTok)}, ${pct(cachedTok, inTok)} hit)`)}`,
  );
  console.log(`  Output tokens     ${int(overall.out_tok)}`);
  if (cachedTok === 0 && overall.n > 0) {
    console.log(dim("  ⚠ prompt cache never hit — see Session 3/4 notes (Haiku min-prefix)"));
  }

  // Today's spend vs ceiling (matches the guardrail's UTC-midnight window)
  console.log(H("TODAY'S SPEND vs CIRCUIT BREAKER"));
  const frac = CEILING > 0 ? spentToday / CEILING : 0;
  console.log(
    `  ${bar(frac)}  ${usd(spentToday)} / $${CEILING.toFixed(2)}  ${dim(`(${pct(spentToday, CEILING)})`)}`,
  );
  if (spentToday >= CEILING) {
    console.log("  \x1b[31m⚠ ceiling reached — agents are paused until UTC midnight\x1b[0m");
  }

  // By brand
  console.log(H("BY BRAND"));
  console.log(
    table(byBrand, [
      { label: "Brand", get: (r) => r.brand },
      { label: "Q", get: (r) => int(r.n), right: true },
      { label: "Cost", get: (r) => usd(r.cost), right: true },
      { label: "Refused", get: (r) => int(r.refused), right: true },
      { label: "Escalated", get: (r) => int(r.escalated), right: true },
    ]),
  );

  // By day
  console.log(H("BY DAY (last 30 active days)"));
  console.log(
    table(byDay, [
      { label: "Date", get: (r) => day(r.d * 86_400_000) },
      { label: "Q", get: (r) => int(r.n), right: true },
      { label: "Cost", get: (r) => usd(r.cost), right: true },
    ]),
  );

  // Quality
  console.log(H("QUALITY"));
  console.log(`  Refusal rate      ${pct(overall.refused, overall.n)}  ${dim(`(${int(overall.refused)}/${int(overall.n)})`)}`);
  console.log(`  Escalation rate   ${pct(overall.escalated, overall.n)}  ${dim(`(${int(overall.escalated)}/${int(overall.n)})`)}`);

  // Question mining
  console.log(H(`QUESTION MINING — FAQ / spec-library gaps first (${questions.length})`));
  console.log(dim("  ▲ = refused, ↗ = escalated. These are content gaps worth authoring."));
  for (const q of questions) {
    const flags =
      (q.refused ? "\x1b[33m▲\x1b[0m" : " ") + (q.escalated ? "\x1b[36m↗\x1b[0m" : " ");
    const text = (q.question || "(empty)").replace(/\s+/g, " ").slice(0, 88);
    console.log(`  ${flags} ${dim(day(q.ts))} ${q.brand.padEnd(12)} ${text}`);
  }

  // Leads
  console.log(H(`LEADS — RFQ submissions (${int(rfqOverall.n)})`));
  if (Number(rfqOverall.n) === 0) {
    console.log("  (no leads captured yet)");
  } else {
    console.log(dim("  By source / intent:"));
    console.log(
      table(rfqBySource, [
        { label: "Source", get: (r) => r.source },
        { label: "Intent", get: (r) => r.intent },
        { label: "N", get: (r) => int(r.n), right: true },
      ]),
    );
    console.log(dim("\n  Recent:"));
    console.log(
      table(rfqRecent, [
        { label: "Date", get: (r) => day(r.ts) },
        { label: "Email", get: (r) => r.email || "—" },
        { label: "Company", get: (r) => r.company || "—" },
        { label: "Line", get: (r) => r.product_line || "—" },
        { label: "Intent", get: (r) => r.intent || "—" },
        { label: "Source", get: (r) => r.source || "—" },
      ]),
    );
  }
  console.log("");
}

main().catch((err) => {
  console.error(`✗ ${err.message}`);
  process.exit(1);
});
