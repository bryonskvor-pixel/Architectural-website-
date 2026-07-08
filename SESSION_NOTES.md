# Session Notes

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
