# Session Notes

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
