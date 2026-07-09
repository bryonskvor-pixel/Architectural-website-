# Session Notes

## 2026-07-09 — Session 7: Brand finalized (IAS) + all marketing pages authored

**Accomplished — the brand is real and every marketing scaffold is now authored content. Pushed to origin/main (deploys to prod).** Two parts, committed in logical groups.

**Part 1 — Brand finalized: Integrated Architectural Solutions (IAS)** (commit `6c80044`)
- **Name lives ONLY in [lib/brand.ts](lib/brand.ts)** (CLAUDE.md rule #1): `activeBrand.name = "Integrated Architectural Solutions"`, new **`mark: "IAS"`** field, `legalName` set. Palette accent retuned from the placeholder safety-orange to the **logo's steel-teal `#2A6E88`** (accentInk white), applied as `{ ...palettes.bone, accent, accentInk }` so the bone canvas stays and only the accent changes. Also updated the globals.css `:root` fallback accent to match (avoids an orange SSR flash).
- **Logo:** real raster dropped at `public/brand/logo.jpg` (the full lockup w/ concrete background); the placeholder `logo.svg` was replaced with a background-free faceted **IAS** monogram (teal facets). Source file was `~/Downloads/IAS logo.JPG`.
- **`<Wordmark/>`** gained `variant="full" | "mark"`. Header renders the **IAS** mark + full name (full shows lg+ only, since the full name is long); footer/pages render the full name.
- **Every `[COMPANY]` literal replaced** in all five `lib/content/*.ts` (via `import { activeBrand }` + `${activeBrand.name}` template literals), plus `SiteFooter`, `RfqForm`, `README.md`, `package.json`. Verified in prerendered HTML: real name on home + product pages + sell-only Airolite, **zero `[COMPANY]` in output**. Code comments describing the placeholder *convention* were left where they document intent.

**Part 2 — 16 marketing pages authored** (5 commits: `f87f2aa` process, `b56cf71` resources, `d023637` solutions, `8fd98db` about, `caf61b2` contact)
- **New shared primitives: [components/Marketing.tsx](components/Marketing.tsx)** — `PageHero, Section, Prose, CardGrid/Card, NumberedSteps, Checklist, DataTable, Callout, FaqList, ButtonLink, CtaBand`. Built in the Skyfold visual contract (bone canvas, editorial serif + mono, hairline borders, hairline-grid layering, no shadows/gradients). All server components. **Reuse these for any new page** rather than re-deriving JSX.
- **Process ×4** (led first, per request — the dealer-installer differentiator): `/process` full bid→preconstruction→field-measure→install→service pipeline + "no finger-pointing" thesis + sell-only carve-out; `/design-assist` (architect track, agents, AIA CEU); `/preconstruction-install` (GC track + the "what the GC provides" checklist); `/service` (in-house, all brands, Phase 1.5 flagged).
- **Resources ×6:** hub ("linked, not mirrored"); `spec-library` + `cad-bim` (per-line, driven off `productLines`, link to manufacturer/ARCAT roots); `lead-times` (**real Airolite Qwik-Ship 1/3/5/10/20-day tiers**; honest quote-confirmed framing for the custom lines — **no fabricated week counts**); `aia-ceu`; `faq` (8 seeded Q&As + **FAQPage JSON-LD**).
- **Solutions ×2:** hub (problem-framed) + `[category]` (at-a-glance `SpecBand` per line + per-category selection guidance). The `[category]/[brand]` product template was already done (Session 2–4).
- **About ×2:** `/about` (why-we-exist + four commitments + the **full logo lockup** as a banner) + `/service-area` (one substantive page across Cleveland/Columbus/Akron-Canton/Toledo — deliberately **not** thin per-metro doorway pages; metro galleries deferred to Phase 2).
- **Contact ×2:** `/contact` (two paths + phone/email + agent-escalation note) + `/book-lunch-and-learn` (routes through the **existing** `/api/rfq` intake tagged `source=lunch-and-learn` — no throwaway form; dedicated calendar is Phase 1.5). `/contact/request-quote` (the live RfqForm) untouched.
- `isSellOnly()` gating held throughout; **`/portfolio` + `/videos` untouched as Phase 2/3 stubs** (still the only two `PageScaffold` pages).

**Also:** added **§6.4 "Imagery & video sourcing (planning)"** to [Docs/Master_Website_Plan.md](Docs/Master_Website_Plan.md) — own install photos > licensed dealer/manufacturer media kits > (avoid hotlinking) > never scrape-and-rehost (copyright); YouTube embeds are sanctioned but brush the Phase-3 `/videos` boundary (use lite-embed + nocookie); manufacturer marketing imagery needs a consistent treatment to fit the no-shadow/no-gradient system.

**Validation:** `typecheck` clean; full `build` green — **32 routes prerender**. Verified new pages render (process hero, FAQ JSON-LD, Qwik-Ship table, About logo img, category guidance) and no `[COMPANY]` in built HTML. **Pushed `d1fadd7..caf61b2` to origin/main → Vercel prod deploy triggered.**

**STILL PENDING (carry-over, flagged to user):**
1. **Real contact info** — `activeBrand.contact` is still placeholder `(000) 000-0000` / `hello@[company].com`, now rendering live on `/contact` + footer. One-line fix in `brand.ts` once the real phone + domain exist. (Domain also unblocks the RFQ email/CRM notifier + Cloudflare Email Routing — see Session 5.)
2. **Palette accent decision** — I chose the logo teal `#2A6E88` over the old orange for cohesion. If the user prefers a contrasting accent, it's one value in `brand.ts`.
3. **Browser smoke-test of a live agent answer** — still the last unverified launch piece (Turnstile blocks curl). Solve Turnstile, ask a Skyfold STC question, confirm streamed answer + `[n]` citation chips.
4. **Session 5 leftovers (unchanged):** email/CRM notifier off `rfq_submissions` once a domain lands; spend/lead dashboard over `agent_events` + `rfq_submissions`; make prompt caching actually engage; verify header/footer "Request a Quote" CTA (it points at `/contact/request-quote`).

**Gotchas (unchanged):** Windows build is memory-fragile — use `NODE_OPTIONS=--max-old-space-size=2048` and call `& "C:\Program Files\nodejs\npm.cmd"` directly (PS npm wrapper errors; in Git Bash use `"/c/Program Files/nodejs/npm.cmd"`). D1 param store id `18812c7c-0661-4e87-beaa-926b18f13a67` (table `parameters`: `model_id, brand, parameter_name, value, unit, source_doc, last_verified` — note it's `parameter_name`, not `param_name`).

---

## 2026-07-08 — Session 6: Production launch verified live (deploy hardening, pt. 2)

**Accomplished — the site is deployed, public, and the data tier is confirmed working in production.** This was a deployment/ops session, not content.

- **Deploy model confirmed:** production deploys from GitHub (`bryonskvor-pixel/Architectural-website-`, branch `main`) → Vercel project `architectural-website` (team `bryonskvor-3733s-projects`). A `git push` ships it.
- **Code change — deploy hardening** (commit `e5fcf61`, pushed): the three shared, **non-secret** D1 database IDs (params / knowledge / web-agent — already in `.env.example`) are now defaulted in [lib/cloudflare.ts](lib/cloudflare.ts) as `DB_IDS`, plus a new `isCloudflareConfigured()` helper. [retrieval.ts](lib/retrieval.ts), [guardrails.ts](lib/agents/guardrails.ts), and [rfq/route.ts](app/api/rfq/route.ts) now read `DB_IDS`. **The local-dev bypasses were re-keyed** from "is the DB id set" → `isCloudflareConfigured()` (i.e. gated on real credentials), so defaulting the IDs didn't silently switch on enforcement in local dev. Net effect: the only real secrets a deploy needs are `CLOUDFLARE_ACCOUNT_ID` + `CLOUDFLARE_API_TOKEN` + `ANTHROPIC_API_KEY`.
- **Removed Vercel Deployment Protection** (Vercel Authentication) — it was 401-walling the entire site, including `/api/agent/*`, for all anonymous traffic. Now public.
- **Live prod probe (the proof):** `GET /` → 200; `POST /api/agent/skyfold` (no Turnstile token) → `turnstile_failed` **429**. That single response proves three things at once: (1) protection wall is off, (2) **Cloudflare is configured in prod** — guardrails ran *full enforcement*, not the dev-bypass, so `CLOUDFLARE_ACCOUNT_ID` + token are present/valid, and (3) **Turnstile is provisioned and enforcing** the first-message gate. The full happy path (retrieval → Claude stream → citations) is **not** curl-testable because Turnstile blocks non-browser first messages by design — it needs a browser smoke test (still outstanding, see below).

**Key facts / corrections for a fresh agent:**
- **Cloudflare account ID = `f6533d2f54eb09876d33ad2f11bcc60c`** (retrieved from the sibling `~/dev/pm-intelligence-agent/.cloudflare.env`, verified against the D1 REST API). It is **already set in Vercel Production/Preview.** Earlier this session I *wrongly* inferred it was missing — because `.env.local` had been generated by `vercel env pull`, which defaults to the **Development** environment, so prod-only vars don't appear in it. Lesson: never infer Vercel prod env state from a pulled `.env.local`.
- **Prod URL:** `architectural-website-bryonskvor-3733s-projects.vercel.app`. The bare `architectural-website.vercel.app` is **someone else's** project (global namespace) — not ours.
- **Tooling limit:** the claude.ai Vercel connector can see the *team* but is **not scoped to this project** (`get_project` 404, deployments/runtime-logs 403) and exposes **no env-var tool** at all. So a headless agent cannot read or change this project's Vercel env/logs — those are dashboard-only, user actions. Diagnose prod behavior by calling the live endpoint instead.

**State:** Phase 1 is live — home + 5 product pages + agents (all 5 brands) + RFQ intake, all in production. Local `.env.local` still lacks `CLOUDFLARE_ACCOUNT_ID` + the D1 IDs (dev-scope pull); with the new hardcoded D1 defaults, **adding just `CLOUDFLARE_ACCOUNT_ID` to `.env.local` is enough to run the agents on localhost.**

**Next steps (Session 7 — content + brand):**
1. **BRAND IS FINALIZED** — the user now has a real company **name + logo**. This is CLAUDE.md rule #1: wire them into [lib/brand.ts](lib/brand.ts) (`activeBrand.name`, palette choice) + drop the logo into `public/brand/`, then **grep every content file for the literal `[COMPANY]`** and replace via `activeBrand.name` (the product content prose still hardcodes `[COMPANY]`). Do NOT hardcode the name anywhere but `brand.ts`.
2. **Author the 18 placeholder marketing pages** (still `PageScaffold` stubs): Solutions hub + [category]; Process ×4 (design-assist, preconstruction-install, service); Resources ×6 (spec-library, cad-bim, lead-times, aia-ceu, faq); About ×2 (+ service-area); Contact ×2 (+ book-lunch-and-learn). **Recommend authoring the Process pages first** as the reference — dealer-installer coordination is the company's core differentiator. `/portfolio` + `/videos` stay Phase 2/3 stubs — do NOT build.
3. **Browser smoke-test** a real agent answer (solve Turnstile, ask a Skyfold STC question, confirm streamed answer + `[n]` citation chips). This is the last unverified piece of the launch.
4. **Session 5 leftovers:** wire the header/footer "Request a Quote" CTA to `/contact/request-quote`; email/CRM notifier off `rfq_submissions` once the domain lands; lightweight spend/lead dashboard over `agent_events` + `rfq_submissions`; make prompt caching actually engage.

**Gotchas:** Windows build is memory-fragile — `next build` needs `NODE_OPTIONS=--max-old-space-size=2048` and call `& "C:\Program Files\nodejs\npm.cmd"` directly (the PowerShell npm wrapper errors). Turnstile is now live in prod, so local agent testing either needs a real Turnstile site key in `.env.local` or relies on the no-CF-creds dev bypass.

---

## 2026-07-08 — Session 5: RFQ lead intake + agent human-escalation pre-fill (launch hardening, pt. 1)

**Accomplished — the quote/RFI path is live end-to-end and the agents hand off into it.** Session 4 was pushed to origin/main first, as requested.
- **`/api/rfq` wired** ([app/api/rfq/route.ts](app/api/rfq/route.ts)) from a 501 stub to a working intake: validate (email + message, length caps) → **Turnstile-verify** (reuses the agents' `verifyTurnstile`; dev-bypassed when no secret) → **persist to the web-agent D1** (`e0188046…`, new `rfq_submissions` table). Intent framing gates on `isSellOnly()` — Airolite → **"takeoff"**, install lines → **"field-measure"** (never by name). Persist failure returns **502** so a real lead is never silently dropped; local dev (no `WEB_AGENT_D1`) accepts so the form is testable.
- **Real RFQ form** ([components/RfqForm.tsx](components/RfqForm.tsx)) in the site's design language, with the Turnstile widget (only when a site key is set) and a sell-only CTA ("Request takeoff" vs "Request quote"). Rendered on [request-quote](app/contact/request-quote/page.tsx) inside a `Suspense` boundary (Next 15 `useSearchParams` requirement).
- **Agent escalation pre-fill** ([components/AgentPanel.tsx](components/AgentPanel.tsx)): `sessionId` moved ref→state so the escalation href reliably carries it; both "Talk to a specialist" links now point to the RFI form pre-filled with `?line=&topic=<last question>&session=&source=agent-escalation`. The form reads those params to pre-fill the product line + message. (Plan Part 4.5: "routes to RFI form pre-filled with the conversation topic and product line.")
- **Validation (live):** install submit → `intent=field-measure, persisted:true`; sell-only Airolite → `intent=takeoff` + `agent_session_id` linkage; bad email / empty message → 400. Test rows deleted afterward (table clean). `typecheck` clean; `build` green.

**Lead delivery decision:** D1 capture only for now — CLAUDE.md forbids new paid services and Cloudflare Email Routing needs the (unfinalized) `[company].com` domain. An email/CRM notifier can hook off `rfq_submissions` once the domain lands.

**`rfq_submissions` DDL** (created this session in the web-agent D1; recorded here since the project has no migrations file — same convention as the Session 3 tables):
```sql
CREATE TABLE IF NOT EXISTS rfq_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT, ts INTEGER NOT NULL,
  name TEXT, email TEXT NOT NULL, company TEXT, phone TEXT,
  product_line TEXT, intent TEXT, message TEXT NOT NULL,
  source TEXT, agent_session_id TEXT, ip TEXT);
CREATE INDEX IF NOT EXISTS idx_rfq_ts   ON rfq_submissions (ts);
CREATE INDEX IF NOT EXISTS idx_rfq_line ON rfq_submissions (product_line);
```

**STILL NEEDS YOU (secrets / account actions I can't do headless — the code is already plug-and-play):**
1. **Turnstile** — create a widget in the Cloudflare dashboard (or via a Turnstile-scoped token + the `turnstile-spin` skill), then set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` in `.env.local` **and** in Vercel. The gate then auto-engages on the first agent message and on RFQ submit (both already call `verifyTurnstile`). Until then it's dev-bypassed (open).
2. **Dedicated Anthropic key** — mint a project key in the Anthropic console, replace the borrowed `ANTHROPIC_API_KEY` in `.env.local` + Vercel.
3. **Scoped Cloudflare token** — a token limited to D1:Edit + Vectorize:Edit + Workers AI:Read for `CLOUDFLARE_API_TOKEN` (retire any broad token).

**Remaining Session 5 / launch-hardening backlog (code, can be done next):**
- Email/CRM notifier off `rfq_submissions` once a domain exists (Cloudflare Email Routing is free and in-budget).
- Lightweight spend/lead dashboard or query over `agent_events` + `rfq_submissions`.
- Make prompt caching engage (cache the shared spec context) — still reads 0 cached tokens.
- Wire the header/footer persistent "Request a Quote" CTA to the new form (verify it points at `/contact/request-quote`).

---

## 2026-07-08 — Session 4: All product content authored + full agent roster live

**Accomplished — the four remaining product lines are authored from real D1 data and every agent is enabled.**
- **Authored [modernfold](lib/content/modernfold.ts), [euro-wall](lib/content/euro-wall.ts), [smoke-guard](lib/content/smoke-guard.ts), [airolite](lib/content/airolite.ts)** as full `LineContent`, pulled from the pm-intelligence-agent D1 param store (`18812c7c…`) exactly as Skyfold was — brand-scoped `parameters` **and** the `required_conditions` table (the richest source for the GC-readiness modules). Every fact carries a `source` matching the D1 `source_doc`. Registered all four in [lib/content/index.ts](lib/content/index.ts).
- **Generic models-table mode** ([components/ProductSections.tsx](components/ProductSections.tsx) + [types.ts](lib/content/types.ts)): Skyfold's `ModelsTable` hard-codes System-STC/Panel-STC columns — right for the acoustic lines but dead "—" columns for the other three. Added an **additive** branch: when `models.columns` is set, rows render free-form `cells` under custom headers. Skyfold + Modernfold keep the acoustic layout untouched; Euro-Wall/Smoke Guard/Airolite get fit-for-purpose columns (approvals/sizes/DP; application/opening/power/fail-safe; free-area/water-rating). This is an extension, not a redesign of the Skyfold reference.
- **Sell-vs-install held structurally**: Airolite has **no `gcReadiness`** (suppressed by `isSellOnly`, gated on the flag — never by name), a supply-only overview, and the "Request louver quote / takeoff" CTA. Verified on the rendered page that the "What the GC must provide" module is **absent** and the supply-only framing is present.
- **Enabled all five agents** — [PILOT_BRANDS](lib/agents/pilot.ts) now = every line. Live end-to-end tests (prod `next start`, real Cloudflare + Claude):
  - Modernfold: STC ceiling question → 5 citations, $0.0054.
  - Euro-Wall: HVHZ/FL# question → correct **FL17838** + volunteered the Channel-Sill-not-impact-rated nuance, $0.0053.
  - Airolite: "not water-rated?" + "can you install it?" → correct spec **and** the supply-only redirect ("[COMPANY] supplies… installed by your own contractor"), $0.0057.
  - All three events logged to the agent D1 (`e0188046…`, `agent_events`) with tokens/cost, `refused=0`, `escalated=0`. (Smoke Guard already validated in Session 3.)
- **Reconciled the Skyfold support-steel nuance**: the D1 `required_conditions` (#1) confirm the overhead steel is engineered/furnished **by others** to Skyfold's load/deflection criteria — the page's "supplied by others" is correct; the Session-3 agent claim (Skyfold supplies/designs it) was the error. Fixed with a per-brand `brandNotes` addendum in [config.ts](lib/agents/config.ts) so the agent now agrees with the page.

**Validation:** `npm run typecheck` clean; `npm run build` green (all 5 product pages prerendered); all four new pages serve HTTP 200 with authored content.

**Known nuances / gotchas for a fresh agent:**
- **Windows build is memory-fragile.** `next build` spawns a worker that dies with `VirtualAlloc failed` / exit `3221226505` when the machine is out of commit charge (this box is 7.6 GB RAM). It is **not** a code bug — clean HEAD reproduces it. Free memory first; build succeeds with `NODE_OPTIONS=--max-old-space-size=2048`. Also: `npm` via the PowerShell wrapper throws "Could not determine Node.js install directory" — call `& "C:\Program Files\nodejs\npm.cmd"` directly instead.
- Content prose uses the literal `[COMPANY]` placeholder (same as the Skyfold reference); it is **not** wired to `activeBrand.name`. When the real name is chosen, update `brand.ts` **and** grep the content files for `[COMPANY]`.
- Prompt caching still reads 0 cached tokens (Haiku min prefix > brand prompt) — unchanged from Session 3, still harmless.
- Turnstile still unprovisioned (bot gate off in dev); Anthropic key still the borrowed one — both are Session 5 launch-hardening items.

**Proposed Session 5 — launch hardening (as you flagged):**
1. Provision **Cloudflare Turnstile** (site + secret keys), set the env vars, and confirm the first-message gate actually engages (the `turnstile-spin` skill can do this end-to-end).
2. Swap in a **dedicated Anthropic project key** (retire the borrowed one) and a dedicated Cloudflare token scoped to D1:Edit + Vectorize:Edit + Workers AI:Read.
3. Wire **`/api/rfq`** intake (currently 501) + the agent's **human-escalation pre-fill** — carry the session's question/brand into the Request-a-Quote form.
4. Optional: cache the shared spec context to make prompt caching engage, and add a lightweight `agent_events` spend dashboard/query.

---

## 2026-07-08 — Session 3: Agent data tier wired (pilot: Skyfold + Smoke Guard)

**Accomplished — the catalog agents are live end-to-end and validated against the real Cloudflare + Claude services.**
- **Dedicated D1 database created**: `architectural-web-agent` (`e0188046-2ac2-4485-a6d7-fdb35d38d969`, ENAM) — isolated from the internal PM data. Tables `agent_sessions` + `agent_events` (+ indexes) hold session state, rate-limit counters, and cost logs. The user authorized a separate DB (the shared knowledge DB was correctly off-limits).
- **Read path** ([lib/retrieval.ts](lib/retrieval.ts) + shared [lib/cloudflare.ts](lib/cloudflare.ts)): D1 param query (brand-scoped), light model-id detection to narrow params, Workers AI `bge-base-en-v1.5` embedding, per-brand Vectorize query. Live-smoke-tested first (106 Skyfold rows, 768-dim, relevant chunks) before building on it.
- **Claude client** ([lib/claude.ts](lib/claude.ts)): `@anthropic-ai/sdk` streaming, Haiku 4.5, `cache_control` on the static system prompt, numbered-source citations ([n] markers parsed from the stream → exactly the sources used), token+cost accounting.
- **Guardrails** ([lib/agents/guardrails.ts](lib/agents/guardrails.ts)) against the dedicated D1: input screening, global daily-spend circuit breaker, per-session/minute rate limit, per-session/day cap, Turnstile gate on the first message. Fails **closed** on infra error (money path); allows in dev when no state DB is set.
- **Shared route** ([app/api/agent/[brand]/route.ts](app/api/agent/[brand]/route.ts)): config → guardrails → retrieve → numbered sources → SSE stream → recordSpend. Non-pilot brands return 503; unknown brands 404.
- **Full system prompts** ([lib/agents/config.ts](lib/agents/config.ts)): public-scoped, per-brand, with scope/refusal/citation/AHJ rules; sell-only variant redirects install questions. Pilot flag via SDK-free [lib/agents/pilot.ts](lib/agents/pilot.ts) (so the client never bundles the SDK).
- **AgentPanel client** ([components/AgentPanel.tsx](components/AgentPanel.tsx)): streams SSE, renders inline citation chips, suggested questions, human-escalation link, Turnstile widget (only when a site key is set), and a "coming soon" state for non-pilot lines.

**Validation (live, not just compile):**
- Skyfold: *"system STC for Classic 60 + support steel?"* → correct answer (system 60 vs panel 66, ±0.5 in over length incl. loaded deflection, ±0.125 in centerline), inline [1]/[6] citations to real source docs, cost $0.0044, event logged to D1.
- Smoke Guard: elevator-lobby/IBC-3006 question → cited answer **with the mandatory "final determination rests with your AHJ" caveat** + specialist escalation.
- Non-pilot (Modernfold) → 503. Production `next start` build serves the page (200) and streams answers.

**Known nuances / next steps:**
- **Prompt caching isn't engaging yet**: Haiku's min cacheable prefix (~2048 tokens) is larger than the current brand system prompt, so `cachedInputTokens` reads 0. Harmless (`cache_control` stays); it'll engage if prompts grow, or we could cache the shared spec context. Not urgent at pilot volume.
- **Turnstile not provisioned**: no site/secret key yet, so the bot gate is disabled in dev (verify returns true when secret unset). Provision Turnstile keys before public launch and set the env vars.
- **Anthropic key is still the borrowed one** — swap for a dedicated project key.
- **Support-steel framing**: the Skyfold agent said Skyfold *supplies/designs* the steel while the page content says "supplied by others" — a real nuance in the source chunk worth reconciling when authoring the other pages / reviewing content.
- Build needs `outputFileTracingRoot` pinned (added to next.config.ts) because a stray `~/package-lock.json` otherwise makes Next trace the whole home dir and crash with `spawn UNKNOWN` on Windows.
- **Session 4 options:** enable the other 3 agents (just add to `PILOT_BRANDS` once cost/quality validated) and author their page content; or provision Turnstile + a dedicated API key and do a real public-safety pass; or wire the `/api/rfq` intake + the human-escalation pre-fill.

**Context for a fresh agent:** agents are gated by `PILOT_BRANDS` in [lib/agents/pilot.ts](lib/agents/pilot.ts) (currently skyfold + smoke-guard). Cost/usage lands in the `architectural-web-agent` D1 (`e0188046…`) — query `agent_events` to monitor spend and mine long-tail questions. `.env.local` holds working creds (gitignored); `.env.example` documents them.

---

## 2026-07-07 — Session 2: Skyfold reference page

**Accomplished:**
- Built the **Skyfold product-line page as the visual + content reference implementation** — the contract the other four pages will copy. Build green, typecheck clean, page renders 200 with real data.
- **Pulled authoritative Skyfold spec data from the D1 param store** (via the Cloudflare MCP `d1_database_query`, db `18812c7c…`, 213 rows read) rather than inventing numbers. Content in [lib/content/skyfold.ts](lib/content/skyfold.ts); every fact carries a `source` string matching the D1 `source_doc`, so page citations and agent citations agree.
- **Rich content model** ([lib/content/types.ts](lib/content/types.ts)) + registry ([lib/content/index.ts](lib/content/index.ts)): a line with an entry renders the full spec-forward template; lines without one keep the placeholder scaffold. Only Skyfold is authored so far.
- **Rich-section components** ([components/ProductSections.tsx](components/ProductSections.tsx)): ModelsTable (system-STC vs panel-STC nuance made explicit), TechnicalData (grouped, each fact with a drawing-tag citation via `SourceTag`), GcReadinessModule ("What the GC must provide" checklist — the uniquely-dealer value-add), ResourceList (Manufacturer/Dealer badge enforcing link-vs-host).
- **Hero upgraded** ([components/SectionCutHeader.tsx](components/SectionCutHeader.tsx), now a client component): section-cut framing, a monospace spec ticker, and a scroll-driven "retract" motion (panels rise into the ceiling line) — transform/opacity only, fully disabled under `prefers-reduced-motion`. Enabled for `space-flexibility` lines.
- Template ([components/ProductLineTemplate.tsx](components/ProductLineTemplate.tsx)) now branches on authored content and still enforces sell-vs-install (GC module + field-measure CTA suppressed for sell-only).

**State:**
- Skyfold page is the reference: overview → applications → models table → technical data (4 groups, all cited) → GC coordination → finishes → resources → docked agent → process cross-link → CTA.
- Other 4 product pages still render the placeholder scaffold (correct — they're authored later from their D1 data using the same `LineContent` shape).
- Agents still not wired (handler 501) — unchanged from Session 1.

**Next steps — Session 3 options (recommend the agent data tier now):**
- **Wire the agent data tier** (recommended): implement [lib/retrieval.ts](lib/retrieval.ts) + [lib/claude.ts](lib/claude.ts) + [lib/agents/guardrails.ts](lib/agents/guardrails.ts) against the live Cloudflare indexes, make [app/api/agent/[brand]/route.ts](app/api/agent/[brand]/route.ts) stream real Haiku answers with citation chips + Turnstile, and pilot on **Skyfold + Smoke Guard** per plan RECOMMENDATIONS. Skyfold now has a finished page for the agent to live in.
- **Or** author the other 4 product pages' content (repeat the Skyfold D1-pull → LineContent process for Modernfold, Euro-Wall, Smoke Guard, Airolite).

**Context:**
- Content numbers are sourced from D1; re-pull if the param store changes. Skyfold db id `18812c7c-0661-4e87-beaa-926b18f13a67`, `brand = 'Skyfold'`.
- The system-STC vs panel-STC distinction is intentional and important — specifiers design to system STC; keep both columns for every acoustic line.

---

## 2026-07-07 — Session 1: Scaffold + contracts

**Accomplished:**
- Cloned this repo (`bryonskvor-pixel/Architectural-website-`) to `~/dev/Architectural-website-`, separate from `pm-intelligence-agent`.
- Read `Docs/Master_Website_Plan.md` in full (the master spec) and scaffolded Phase 1 structure per it. Scope was deliberately **scaffolding + contracts only** — no product-page content, no wired agents.
- Initialized **Next.js 15 (App Router, TypeScript) + Tailwind v4**, targeting Vercel. `npm run build` is green: 32 routes, all 5 product-line pages prerendered via `generateStaticParams`. `tsc --noEmit` clean.
- **Brand-token system** ([lib/brand.ts](lib/brand.ts)): single source of company identity. Two placeholder palettes (`bone`, `charcoal`), typography tokens, and `brandCssVars()` injected on `<html>` in the root layout — whole site re-themes from this one object. `<Wordmark/>` reads `activeBrand.name`. Placeholder SVG logo slot at `public/brand/logo.svg`.
- **Product model** ([lib/products.ts](lib/products.ts)): 5 lines + 4 solution categories, each line carrying a `fulfillment` flag. `isSellOnly()` is the single gate enforcing the sell-vs-install rule (Airolite = sell-only). Everything downstream (nav, template, agent config) derives from this so nothing can drift.
- **Design system** ([app/globals.css](app/globals.css)): warm bone canvas, near-black text, hairline borders, single accent, editorial serif (Newsreader) + mono (JetBrains Mono) + premium sans (Hanken Grotesk — Inter/Roboto/Open Sans avoided), no shadows/gradients, `prefers-reduced-motion` honored.
- **Components**: SiteHeader, SiteFooter, Wordmark, SpecBand + CsiChip, FulfillmentBadge, SectionCutHeader, AgentPanel (client stub, "catalog terminal" styling), ProductLineTemplate (the spec-forward layout), PageScaffold (consistent stub shell).
- **Full sitemap routes** stubbed per plan Part 2: home, /solutions + [category] + [category]/[brand] (dynamic, validated — wrong category/brand pair 404s), /process (+3), /resources (+5), /about (+service-area), /contact (+2), /portfolio (Phase 2 stub), /videos (Phase 3 stub), 404.
- **Agent/data tier — typed stubs with TODO markers**: shared handler [app/api/agent/[brand]/route.ts](app/api/agent/[brand]/route.ts) (currently returns **501** by design), per-brand [lib/agents/config.ts](lib/agents/config.ts) (derived from products.ts; skeleton system prompts; Haiku default; sellOnly flag), [lib/agents/guardrails.ts](lib/agents/guardrails.ts) (Turnstile/rate/session/daily-spend, default-closed), [lib/retrieval.ts](lib/retrieval.ts) (Cloudflare D1+Vectorize REST, mirrors pm-intelligence-agent's cloudflare.js), [lib/claude.ts](lib/claude.ts) (model tiers + prompt-caching shape), and [app/api/rfq/route.ts](app/api/rfq/route.ts).
- **CLAUDE.md** written at root encoding all non-negotiables: brand-token indirection, sell-vs-install structural rule, agent architecture + guardrails, Cloudflare data tier, phase boundaries, design system.
- `.env.example` carries the reused Cloudflare D1 IDs and the env contract; `.gitignore` protects secrets.

**State — what's wired vs. stubbed:**
- ✅ Builds and renders end-to-end; navigation works; sell-only enforcement is real in the UI.
- 🟡 **Stubbed (intentional):** agent handler (501), retrieval/Claude/guardrail calls (TODO), RFQ intake (501), all product-page technical content (placeholder), hero/project imagery (placeholder slots).
- **Not committed yet** — files are on disk on `main`, uncommitted.

**Next steps — recommended Session 2: apply the design system to ONE complete product page (Skyfold) as the reference implementation.**
Rationale: the plan's whole thesis is the "specifier test" premium-technical aesthetic; proving it on one real page (real Skyfold content from the ingested data, section-cut hero, spec bands, scroll motion, agent styling) sets the visual contract every other page copies — cheaper to get right once than to retrofit five pages. It also surfaces any design-token gaps before they multiply. The **agent data tier** is the alternative Session 2 (wire retrieval + Haiku + guardrails + Turnstile against the live Cloudflare indexes, pilot on Skyfold + Smoke Guard per plan RECOMMENDATIONS); do this second so the reference page gives the agent a finished home to live in.

**Context a fresh agent needs:**
- The company has **no name** — never hard-code one; it's `[COMPANY]` and lives only in `lib/brand.ts`.
- The 5 Cloudflare Vectorize indexes + D1 params are **already populated** by `pm-intelligence-agent` — this site only reads them, with new PUBLIC-scoped prompts (never reuse the internal PM prompts). Cloudflare account ID and D1 IDs are in `pm-intelligence-agent/Docs/Cloudflare_Resources.md` and `.env.example`.
- Portfolio (Phase 2) and Videos (Phase 3) are **stub routes only** — do not build.
- Agent handler returns 501 on purpose until wired — that's the explicit contract, not a bug.
