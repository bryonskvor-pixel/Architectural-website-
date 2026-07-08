Master Website Plan: Division 10/08 Specialty Architectural Products Dealer & Installer (Ohio)

Build-Ready Specification for Claude Code

Placeholder brand: [COMPANY] (swap in final name). Placeholder domain: [company].com.


TL;DR


Build a name-agnostic, premium-technical website for a spin-off of Air Control Products' architectural division that positions the company as Ohio's expert dealer-installer of five specialty lines (Euro-Wall, Skyfold, Modernfold, Smoke Guard, Airolite), with the signature differentiator being five per-product conversational catalog AI agents that let architects and GCs interrogate real manufacturer spec data with citations.
The site must serve architects/spec-writers first and GCs/estimators second by mirroring how they actually specify — CSI section numbers, STC/fire ratings, structural-support requirements, CAD/BIM/spec downloads, and lead-time transparency — while complementing (not duplicating) the manufacturers' own libraries and clearly separating the four sell-and-install lines from the sell-only Airolite line.
Technically, reuse the existing stack (Vercel Pro + Next.js, Cloudflare D1/Vectorize, Claude API, GitHub) with a one-agent-per-endpoint RAG pattern, Claude Haiku 4.5 ($1/$5 per MTok) + prompt caching for cost control, and Cloudflare Turnstile + rate limiting for public-deployment safety; ship in phases (Phase 1 = content site + agents; later phases = portfolio + installation videos).



KEY FINDINGS

1. The parent site under-serves architects. Air Control Products is a Broadview Heights, Ohio manufacturers' rep whose architectural division is a sub-brand of an HVAC business, described on its own site as "Northern and Central Ohio's exclusive distributor for Modernfold®, Skyfold®, Smoke Guard®, and Airolite®." The current architectural page is thin — brand blurbs and a contact CTA, no spec/CAD/BIM resources, no per-product technical depth, no process transparency, no project portfolio. The spin-off's entire reason to exist is to become the technical resource the parent never was.

2. The best comparable proves the model. Powers Products (Denver, founded 1941, serves CO/WY/NM/West TX) carries nearly the identical stack (Modernfold, Skyfold, Euro-Wall, Smoke Guard/McKeon) and organizes its site by problem category ("Space Flexibility," "Fire + Smoke Separation," "Daylighting"), offers a Specs/BIM page organized by CSI number (e.g., /specs-bim/10-22-26/), a "Design Assist" service, an AIA-CES credits page, a portfolio, a "Build" (preconstruction) offering, and an in-house Service Division that services all brands regardless of manufacturer. This is the template to beat. (Other regional analogues: ModernfoldStyles in NJ, RPC in Texas, W.L. Hall, Norcon Industries — all dealer/installers presenting manufacturer lines to specifiers.)

3. Architects self-serve and specify on data. Per AIA's "The Architect's Journey to Specification" research (2023, with ConstructConnect/Deltek), continuing education (83%) and manufacturer websites (79%) are architects' top product-research resources, and over 80% of architects are responsible for finding new products and materials; technical information, product specs, and design guides remain the most critical resources they need to specify. Decisions crystallize in the schematic/design-development phases, not at the spec stage — so early, self-serve technical content wins the spec. Some architects will skip manufacturers who don't provide BIM objects. Younger architects prefer chat/text support over phone calls, which validates the conversational-agent bet. Acelabusa

4. Each of the five lines has a distinct market and CSI home:


Euro-Wall — folding/sliding/pivot glass wall systems; CSI 08 43 33 (Sliding/Folding Doors) under Division 08 Openings (per Euro-Wall's ARCAT 3-part spec); high-end residential + high-end commercial exterior; hurricane/impact heritage (Miami-Dade/HVHZ, AAMA/WDMA/CSA NAFS, ASTM E330/E547, TAS 201/202/203); 10-year warranty; sell-and-install.
Skyfold — vertically-retracting automated operable walls; CSI 10 22 39; STC up to 60 (RW 59) on Classic, plus a Classic NRC at STC 50; more than 5,000 walls installed worldwide; electric (208VAC 3-phase), no floor tracks; requires GC-supplied Skyfold-approved support steel (C-channel C8×11.5), ceiling pocket; panels weigh ~34.2–46.0 kg/m² (≈7.0–9.4 lbs/ft²); max height to ~11,000 mm (8,535 mm for Classic 60); 2-yr/5,000-cycle parts-and-labor + 10-yr acoustic warranty; premium; sell-and-install.
Modernfold — operable partitions; CSI 10 22 26 (movable glass wall systems 10 22 43); Acousti-Seal panels up to 30 ft high; Acousti-Seal Encore is an industry-leading 56 STC single/paired system (4"/102 mm welded 14/16-gauge steel-frame panels), with the broader Acousti-Seal range spanning roughly 28–52 STC; 1-hr UL fire-rated Legacy option; the workhorse "wherever a room divider is needed" line; ASTM E557 install / ASTM E90 acoustic testing; sell-and-install.
Smoke Guard — elevator/opening smoke & fire containment curtains (M200/M400/M600/M2100E/M3000/M4000); code-driven (IBC §3006 elevator hoistway/lobby, §717/§710 opening protection, UL 1784 smoke, UL 10D fire, NFPA 80/105, ICC-ES ESR-1136; 2024 IBC hoistway updates); increasingly standard in commercial builds; sell-and-install.
Airolite — architectural louvers, grilles, sun controls, equipment screens; CSI 08 90 00; AMCA 500-L/540/550 tested; Qwik Ship expedited program; made-in-USA; sell-only, no installation — the IA must make this distinction explicit.


5. Conversational catalog agents are credible if scoped, cited, and honest. State-of-the-art public RAG guidance (Anthropic, Cloudflare, OWASP LLM Top 10, multiple 2025–2026 arXiv defense papers) converges on: open with explicit scope, cite source manufacturer documents, refuse out-of-scope questions, escalate to a human, treat retrieved docs as untrusted data (prompt-injection defense), and layer rate limiting + Turnstile + per-session caps for cost/abuse control. The existing infra pattern (one-agent-per-Vercel-call, D1 intermediate state, per-brand Vectorize indexes) maps cleanly onto five public agents; the internal pm-intelligence-agent prompts do not cross over.


PART 1 — POSITIONING & MESSAGING (name-agnostic)

1.1 Positioning statement

[COMPANY] is Ohio's specialty architectural products partner — the single team that specifies, supplies, field-measures, installs, and services high-performance wall, door, partition, and life-safety systems for commercial and high-end residential projects. We turn Division 10 and Division 08 specialty scopes from a coordination headache into a solved problem.

1.2 Value pillars (message hierarchy)


Specify with confidence. Real spec data, CAD/BIM, STC/fire ratings, and structural requirements — plus an AI catalog agent per product line that answers technical questions instantly, with citations.
One accountable team, design through service. Bid → preconstruction → field measure → factory-trained install → lifetime service. No finger-pointing between supplier and installer.
Regional presence, factory-trained expertise. Ohio-based, serving Ohio and surrounding regions, factory-certified on every line we install.
The right system, not just a sale. Consultative selection across five complementary lines (and honest "Airolite we supply; you install").


1.3 Audience-specific messaging


Architects/spec writers (primary): "Everything you need to specify — spec sections, CAD/BIM, acoustical and fire data, and a design-assist team that shows up at DD." Lead with the agent + resource library.
GCs/estimators (secondary-primary): "Accurate budgets, clean scope, on-time field measure and install, no surprises." Lead with process transparency, lead times, and structural coordination (support steel, backing, power).
Building owners (secondary): "Flexible, code-compliant, beautiful spaces — installed right and serviced for life." Lead with outcomes and portfolio.


1.4 Placeholder brand treatment (for Claude Code)


Use a design-token file (/lib/brand.ts + CSS custom properties) so name, logo, wordmark, colors, and typefaces are swappable in one place.
Logo: render a text wordmark component <Wordmark/> reading [COMPANY] from a single constant; reserve an SVG slot (/public/brand/logo.svg) with a placeholder mark.
Provide two placeholder palettes (see Part 5) as named token sets so the final brand can pick without a refactor.
Every user-facing string referencing the company name pulls from brand.name — never hard-coded.



PART 2 — SITEMAP & INFORMATION ARCHITECTURE

Top-level nav organized by problem/solution category (proven by Powers) with product lines nested, plus a resources-forward secondary nav for specifiers.

/ (Home)
/solutions
  /space-flexibility            → Modernfold (operable partitions), Skyfold (vertical retracting)
    /modernfold                 → product line page + Modernfold agent
    /skyfold                    → product line page + Skyfold agent
  /glass-wall-systems           → Euro-Wall (folding/sliding/pivot exterior)
    /euro-wall                  → product line page + Euro-Wall agent
  /fire-smoke-containment       → Smoke Guard
    /smoke-guard                → product line page + Smoke Guard agent
  /louvers-sun-control          → Airolite (SELL-ONLY — labeled distinctly)
    /airolite                   → product line page + Airolite agent (supply-only scope)
/process                        → bid/spec → preconstruction → field measure → install → service
  /design-assist                → for architects (spec help, AIA CEU, CAD/BIM)
  /preconstruction-install      → for GCs (scheduling, structural coord, field measure)
  /service                      → maintenance/repair all brands (phase 1.5)
/resources
  /spec-library                 → by CSI section (08 43 33, 10 22 26, 10 22 39, 10 22 43, 08 90 00)
  /cad-bim                      → links/hosted files per line
  /lead-times                   → transparency table
  /aia-ceu                      → lunch-and-learn / CEU booking
  /faq
/portfolio                      → filterable (phase 2)
/videos                         → installation & operation (phase 3)
/about
  /service-area                 → Ohio + regional (SEO)
/contact
  /request-quote                → structured RFQ/RFI flow
  /book-lunch-and-learn

2.1 Sell-and-install vs sell-only distinction in IA


The four install lines carry a consistent "We supply + install + service" badge and full process cross-links.
Airolite pages carry a "We supply — installed by others" badge, omit the install/field-measure process modules, and route CTAs to "Request louver quote / takeoff" rather than "Schedule field measure." The agent's scope prompt explicitly states no-install and redirects install questions.


2.2 Global components


Persistent "Ask the [Line] Agent" launcher on every product page (docked, not intrusive).
Persistent "Request a Quote / RFI" and phone CTA in header/footer.
Breadcrumbs with CSI section chips on product/resource pages (specifier wayfinding + SEO).



PART 3 — PAGE-BY-PAGE CONTENT STRATEGY (five product lines)

Every product-line page shares a spec-forward template: hero (project photo + one-line positioning) → "at a glance" spec band (CSI #, key ratings, sizes, install status) → applications → models/series → technical data (acoustic/fire/structural/electrical) → resources (CAD/BIM/spec — link vs host per below) → the embedded agent → process cross-link → CTA. Link to manufacturer resources when they're authoritative and frequently updated (CAD/BIM/CSI spec DOCs on the manufacturer site or ARCAT); host locally only the dealer-value-add (lead-time notes, regional project photos, "what the GC must provide" checklists, curated cut sheets).

3.1 Euro-Wall (glass wall systems — high-end residential + commercial exterior)


Positioning: "Disappearing glass walls for signature openings." Emphasize largest panel sizes, slim sightlines (<1" interlock on multi-slide), flush sills, impact/hurricane ratings, wood-clad/aluminum finishes. Powers ProductsPowers Products
Content: systems (Euro Vista Fold, Multi-Slide, Lift & Slide, Pivot — panels up to ~14 ft); performance (AAMA/WDMA/CSA NAFS, ASTM E330/E547, Miami-Dade/HVHZ, TAS 201/202/203); finishes (anodized/Kynar standard, faux-wood, interior wood cladding); CSI 08 43 33; 10-year warranty. ARCATEuro-wall
Resources: link to euro-wall.com DWG files (/support/dwg-files/), BIMsmith Revit, ARCAT 3-part spec, and the 65-item "Architect & Designer Resources" library (technical docs, Florida product approvals, cut sheets, install instructions, profile sheets, warranty); host Ohio-relevant guidance (thermal performance for cold climates, non-coastal application notes, integration with structural openings). Cross-link Euro-Wall's five AIA courses under /aia-ceu: "Continuous Design Uses for Large Opening Glass Wall Systems" (1 LU/HSW), "Architectural Trends for Wind Borne Areas" (1 LU/HSW), "How Large Openings Contribute to Improved Mental Health" (1 LU/HSW), "Solutions for Large Openings in Wind Borne/Coastal Areas" (1 LU/HSW), and "Euro-Wall Systems – Factory Tour" (2 LU).
Agent scope: panel sizes/weights, sightlines, sill options, impact ratings, thermal, finish/material options, rough-opening prep, lead times, install sequencing.


3.2 Skyfold (premium vertical-retracting operable walls)


Positioning: "The wall that vanishes into the ceiling." Highest STC in category, zero floor tracks, fully automated, space-saving. ARCATModernfoldstyles
Content: series (Classic 51/55/60/NRC, Zenith, Zenith Premium, Mirage/Prisma glass); STC table (up to 60 / RW 59; NRC at STC 50; Mirage glass STC 33–36); CSI 10 22 39; critical GC coordination module — Skyfold-approved support steel (C-channel C8×11.5, flanges up, supplied/installed by others), deflection tolerance (parallel to floor within 1/2" over the full length including loaded deflection), floor flatness (±1/4" over length), 208VAC 3-phase power available at install, ceiling-pocket dimensions, wall weight ~7.0–9.4 lbs/ft², 2-yr/5,000-cycle parts-and-labor + 10-yr acoustic warranty. ARCAT
Resources: link Skyfold CAD/BIM/spec + "Notes to G.C." drawings; host a dealer "Skyfold structural & electrical readiness checklist" (high-value, uniquely dealer).
Agent scope: STC by model, max height/width, structural steel + electrical requirements, pocket sizing, retrofit feasibility, finishes, cycle life, lead time.


3.3 Modernfold (general operable partitions — the workhorse)


Positioning: "Flexible rooms, wherever you need them." Broadest applications (schools, hotels, offices, worship, multipurpose).
Content: series (Acousti-Seal Encore — industry-leading 56 STC with automatic SureSet seals; Legacy, Premier, 1-hr UL fire-rated; Acousti-Clear glass; single/paired; base Acousti-Seal range ~28–52 STC); panel heights to 30 ft; STC/panel-weight tables; finishes (vinyl, fabric, wood veneer, laminate, steel skins 22–16 ga, markerboard); CSI 10 22 26 (glass 10 22 43); ASTM E557 install / ASTM E90 acoustic test; stack configurations. ARCAT
Resources: link Modernfold BIM/spec/SpecWizard; host finish galleries with regional installs and a "configuration selector" explainer (single vs paired, stacking, pass doors, header/backing requirements).
Agent scope: STC vs panel/finish, max heights, stacking/track configs, fire-rated options, finishes, structural header/backing requirements, lead times.


3.4 Smoke Guard (code-driven fire & smoke containment)


Positioning: "Code compliance without compromising the design." Invisible-until-deployed curtains that solve elevator-lobby and opening-protection requirements now commonly specified.
Content: models (M200/M400/M600 elevator, M2100E smoke/fire, M3000 horizontal, M4000 perimeter); code map — IBC §3006 (elevator hoistway/lobby), §717/§710 opening protection, UL 1784 (smoke leakage), UL 10D (fire endurance), NFPA 80/105, ICC-ES ESR-1136; 2024 IBC hoistway updates; when-is-it-required decision guide.
Resources: link Smoke Guard ESR report + specs; host an original "smoke curtain code requirements" explainer (major SEO play — see Part 7) and a "which model for which condition" selector.
Agent scope: which model per opening condition, IBC/UL/NFPA references, deployment/egress behavior (manual rewind <15 lbf, battery backup), control/fire-alarm integration, drop-test/inspection service, lead times. Agent must caveat that final code determination rests with the AHJ/design team.


3.5 Airolite (louvers/sun control — SELL-ONLY)


Positioning: "Architectural louvers and sun control, supplied fast." Clearly badged supply-only.
Content: categories (drainable, stationary, adjustable, sightproof, storm/hurricane AMCA 550, acoustic, narrow-profile, sun controls ASC/TSC airfoil + rectangular, equipment screens, penthouses); CSI 08 90 00; AMCA 500-L/540/550 data; free-area/water-penetration/beginning-point-of-water-penetration performance; Qwik Ship lead-time program (1/3/5/10/20-day cycles); made-in-USA. Greenheck
Resources: link Airolite CAD/specs/AMCA data; host a "how to specify louvers (width×height, free vs face velocity, AMCA ratings)" primer and lead-time/Qwik-Ship notes.
Agent scope: louver selection by application, AMCA ratings, free-area/airflow, finishes, sizing conventions, Qwik-Ship lead times. Explicit no-install scope: redirect install questions to "Airolite is supplied by us and installed by your contractor."



PART 4 — CONVERSATIONAL CATALOG AGENT DESIGN

4.1 Concept

Five per-brand agents, each an on-page "catalog expert" for its product line — not a generic sitewide chatbot. Each is scoped to one brand's manufacturer documents and structured parameters, presented as "Ask the [Line] Agent."

4.2 Placement & UI pattern


Docked panel on each product-line page (right-rail on desktop, bottom sheet on mobile), collapsed by default with a labeled prompt: "Ask about Skyfold specs — STC, sizes, structural support, lead times."
Suggested-question chips seed the interaction (reduces blank-box anxiety, steers on-scope): e.g., "What STC can Classic reach?", "What support steel does the GC provide?", "Lead time for a 30-ft opening?"
Streaming responses with buffered markdown (handle partial tags/code blocks gracefully); citation chips under each answer linking to the source manufacturer document/page in Vectorize.
Progressive disclosure: answer first, "sources" and "show the spec excerpt" expandable beneath — trusted users move on, verifiers drill down.
Persistent human-escalation button: "Talk to a [COMPANY] specialist" → routes to RFI form pre-filled with the conversation topic and product line.
Section-508/WCAG-AA: keyboard nav, high-contrast bubbles, screen-reader labels, large tap targets on mobile.


4.3 Scope boundaries (per agent)


Each agent's system prompt is scoped to exactly one brand + [COMPANY]'s services for that brand. It answers product specs, dimensions, ratings, applications, structural/electrical requirements, finishes, and lead times, plus [COMPANY]'s process.
Refuse out-of-scope (other brands, firm pricing, unrelated topics, legal/code determinations) with a redirect: cross-brand questions → "That's a Modernfold question — here's the Modernfold agent"; code determinations → "Confirm with your AHJ; here's the relevant IBC reference and a specialist contact."
Airolite agent additionally scoped supply-only.


4.4 Evidence / citation behavior


Retrieval-grounded: answer only from D1 structured parameters + the brand's Vectorize index. If retrieval confidence is low or no source supports the claim, say so and escalate — never fabricate a spec.
Every substantive spec claim carries a citation to the source document ("According to the Skyfold Classic spec (10 22 39)…" with a link).
Numbers (STC, dimensions, weights, ratings) are preferentially served from D1 structured parameters (authoritative, versioned) rather than free-text generation, with Vectorize used for explanatory/context passages.


4.5 Shared infrastructure (five agents, one pattern)


One agent endpoint per Vercel serverless function, brand selected by route param (/api/agent/[brand]). Shared handler, per-brand config (system prompt, Vectorize index binding, D1 table scope).
Per-brand Vectorize indexes (five) keep retrieval clean and prevent cross-brand bleed.
D1 holds structured spec parameters (per-brand tables) + session/rate-limit state + conversation/cost logs.
Reuses the existing pm-intelligence-agent infrastructure pattern (one-agent-per-call, D1 intermediate state, per-brand indexes) but with new, public-scoped prompts and content — the internal PM decision-support agents do not cross over.


4.6 Public-deployment safeguards


Prompt-injection resistance: system-message policy states retrieved documents and user input are untrusted data, never instructions; ignore embedded instructions in docs; refuse requests to reveal the system prompt; separate instruction vs context blocks; insert RAG content in a clearly labeled context/tool block. Documents are first-party manufacturer PDFs (low poisoning risk), but harden anyway — this maps to the layered defenses (input screening + hierarchical guard prompts + response verification) shown in 2025–2026 research to cut attack success from ~73% to <9%.
Rate limiting: Cloudflare rate-limiting rules per IP + per session (e.g., N messages/minute, hard daily cap per session); response-based counting on the agent endpoint. Cloudflare's first 10,000 qualifying requests are free.
Abuse/bot prevention: Cloudflare Turnstile (invisible/managed) gating the first message of a session; Pre-Clearance cookie for the SPA flow. (Cloudflare explicitly lists "public AI inference … to prevent abuse of your compute resources" as a Turnstile use case.)
Cost caps: per-session token/message ceiling enforced in D1; global daily spend circuit-breaker (disable agent + show "contact us" fallback when exceeded); max output tokens capped; conversation length trimmed.
Model/cost strategy: default Claude Haiku 4.5 (claude-haiku-4-5, $1/$5 per MTok, 200K context — Anthropic's recommended tier for "high-volume, latency-sensitive workloads: classification, routing, extraction") for retrieval-grounded catalog Q&A; escalate to Sonnet 4.x ($3/$15) only for complex multi-part reasoning. Apply prompt caching to the large, static per-brand system prompt + spec context: per Anthropic's Dec 17, 2024 launch, caching reduces "costs by up to 90% and latency by up to 85% for long prompts," with cache-read tokens billed at ~10% of base input (minimum cacheable prefix ~1,024 tokens for Haiku). Cache the brand system prompt across all sessions.
Logging/monitoring: log queries, retrieval hits, refusals, escalations, and token spend to D1; alert on cost-spike or refusal-rate anomalies (possible attack).



PART 5 — CREATIVE DIRECTION (premium, technical, distinctive)

The aesthetic target: "premium utilitarian minimalism / editorial-technical" — the visual language of high-end architectural glass and systems brands (Vitrocsa, panoramah!, Sky-Frame) crossed with the rigor of technical documentation. It should read as architected with deliberate precision, credible to specifiers, never generic-corporate. Reference models: Vitrocsa (ultra-minimal, gallery-forward, image-first, systems-based nav, "watchmaking precision" craft narrative), panoramah! (lowercase technical product nomenclature ah!38/ah!60 as a typographic system), Sky-Frame (cinematic film-led experience), and Construction Specialties (best-in-class technical louver/facade site with interactive spec tools — "BetterBuilt Studio" configurator and an "Airflow Design Tool" that "lets you specify the correct louver with proper free area and pressure drop every time").

5.1 Visual system


Palette: warm bone/off-white canvas (#F7F6F3 / #FBFBFA) or a charcoal alternate; body text near-black not pure black (#111111 / #2F3437); hairline 1px borders (#EAEAEA); a single restrained accent (a technical safety-orange or a brand gold — Euro-Wall itself uses a gold accent) used only for CTAs/semantic emphasis. Muted, disciplined; "color is a scarce resource, used only for semantic meaning."
Typography: pair an editorial neo-serif for headings (tight tracking, −0.02 to −0.04em; e.g., Newsreader/Instrument Serif/Lyon-class) with a monospace (Geist Mono/JetBrains Mono) for metadata, dimensions, CSI numbers, ratings, and agent source labels — the monospace makes spec data read as "technical instrument." Premium sans for body. Ban Inter/Roboto/Open Sans defaults, heavy drop shadows, gradients. UI Skills
Layout: strict grid as visible architecture; massive macro-whitespace (generous vertical section padding, py-24/py-32); constrained reading measure (max-w-4xl/5xl); hairline rules and overlapping grid lines / Z-index layering for depth instead of shadows ("depth is no longer faked through blur").
Photography/video: large-format, full-bleed architectural project imagery, slightly desaturated/warm; indoor-outdoor "let the outside in" hero shots for Euro-Wall; subtle film-grain overlay (opacity ~0.04) for depth; never oversaturated stock.


5.2 Distinctive, on-brand interaction concepts (technical, not gimmicky)


Section-cut / drawing-inspired aesthetic: product headers rendered as architectural section details — hairline dimension lines, leader annotations, elevation callouts overlaid on photography. Spec "at a glance" bands styled like a drawing title block.
Kinetic product-motion references (for operable/moving systems): scroll-driven micro-animations that echo the product's real motion — Skyfold panels "retract" into a ceiling line as you scroll; Modernfold panels stack; Euro-Wall panels fold/slide open to reveal the hero view; Smoke Guard curtain "deploys." Transform/opacity only; respect prefers-reduced-motion.
Technical-drawing overlays: hover/scroll reveals dimensioned CAD-style overlays on product photos (panel widths, pocket depths, sightlines) — turning marketing imagery into spec communication.
Monospace spec ticker / data band: key ratings (STC 60, 08 43 33, 30 ft, AMCA 550) presented as a monospace data strip, reinforcing the "instrument" feel.
Agent as "catalog terminal": the conversational agent styled as a precise technical console (monospace input, citation chips as drawing tags) rather than a cartoon chat bubble — trust over cuteness.


5.3 Guardrail

Every creative device must survive the "specifier test": does it help an architect/GC extract or trust technical information faster? If not, cut it. Motion is expressive but subordinate to spec access.


PART 6 — TECHNICAL ARCHITECTURE & BUILD PLAN

6.1 Recommended stack (no new paid services)


Framework: Next.js (App Router) on Vercel Pro — best-in-class DX, git-push previews, ideal for Claude Code iteration; server components for content, route handlers for agent endpoints.
AI: Claude API (Haiku 4.5 default, Sonnet for escalation) with prompt caching.
Retrieval: Cloudflare Vectorize — five per-brand indexes of manufacturer documents.
Structured data + state: Cloudflare D1 — per-brand spec parameter tables, session/rate-limit state, conversation + cost logs (5 GB free, then ~$0.75/GB-mo — cheap for read-heavy workloads).
Edge security: Cloudflare (proxying [company].com) for Turnstile + rate limiting + WAF; DNS on Cloudflare.
Repo/CI: GitHub → Vercel auto-deploy.
Architecture note: because the agents call Cloudflare D1/Vectorize while the site runs on Vercel, either access Cloudflare bindings via a thin Cloudflare Worker as the data/retrieval tier that Vercel route handlers call, or use Cloudflare's REST APIs from Vercel. Keep the public site on Vercel; keep retrieval + structured lookups on Cloudflare — matching the existing infra pattern and avoiding any new paid service.


6.2 Repo structure (for Claude Code)

/app
  /(marketing)                 → home, solutions, process, about, contact
  /solutions/[category]/[brand]→ product line pages
  /resources/...               → spec library, cad-bim, lead-times, aia-ceu, faq
  /portfolio, /videos          → phased
  /api/agent/[brand]/route.ts  → shared agent handler, per-brand config
  /api/rfq/route.ts            → quote/RFI submission
/lib
  brand.ts                     → placeholder brand tokens (name, colors, type)
  agents/config.ts             → per-brand prompt, index binding, D1 scope, model tier
  agents/guardrails.ts         → injection defenses, scope refusal, cost caps
  retrieval.ts                 → Vectorize query + D1 param lookup
  claude.ts                    → Claude client + prompt caching
/content                       → MDX for product/spec/resource pages (versioned specs)
/components                    → Wordmark, SpecBand, AgentPanel, SectionCutHeader, ...
/data                          → seed scripts for D1 spec tables per brand
/public/brand                  → logo/mark placeholders
CLAUDE.md                      → build spec, conventions, this plan's constraints
wrangler / cloudflare config   → D1 + Vectorize bindings (Worker data tier)

Provide a CLAUDE.md at root encoding: the brand-token indirection rule, agent scope/guardrail requirements, the sell-vs-install IA rule, and phase boundaries — so each Claude Code session has the contract.

6.3 Phased roadmap


Phase 1 (launch): content site + agents. All static pages, five product-line pages, spec/resource library (mostly links + curated hosted docs), five conversational agents with full guardrails, RFQ/RFI + lunch-and-learn forms, service-area/SEO pages. The MVP that beats the parent site immediately.
Phase 1.5: Service Division page, lead-time transparency table, AIA-CEU booking, expanded hosted checklists (Skyfold readiness, louver specifying).
Phase 2: portfolio. Filterable project gallery (by product line, building type, region), editorial case studies naming architect/GC. Feeds SEO and trust.
Phase 3: installation & operation videos. Hosted/embedded video library per line; agents can cite/link relevant videos.
Phase 4 (optional): authenticated dealer/GC portal, deeper configurators (Euro-Wall/louver product selectors), project-status tracking.



PART 7 — SEO & DISCOVERABILITY

7.1 Query intent buckets to target


Product + dealer/installer: "Skyfold dealer Ohio," "Modernfold installer Ohio," "operable partition installer [city]," "Euro-Wall dealer Ohio," "Airolite louver distributor Ohio."
Spec-section queries: "10 22 26 operable partitions," "10 22 39 vertical folding partition," "08 43 33 folding glass door spec," "08 90 00 louvers spec."
Problem/code queries (highest-value content plays): "smoke curtain code requirements," "IBC elevator smoke containment," "when is a smoke curtain required," "operable partition STC ratings," "how to specify louvers free area."
Regional service-area: Cleveland, Columbus, Akron, Toledo, and surrounding Ohio metros + "surrounding regions."


7.2 Tactics


Service-area pages for genuine markets served — avoid thin/duplicate doorway pages (Google sees through them); make each specific with real projects, local code notes, and coverage. Optimize a Google Business Profile.
CSI-section landing pages in the spec library — architects search by number; own those.
Problem/code explainer content (original, authoritative): the Smoke Guard code guide, "operable partition STC + NRC," "specifying louvers" — matches how architects research in DD and earns backlinks. This is the content moat.
Schema markup: LocalBusiness/Contractor, Product, FAQ; per-page CSI chips.
Technical SEO: fast, mobile-first, clean IA, descriptive alt text on project imagery, indexable spec pages.
Agent-as-content loop: log real agent questions to discover long-tail queries and turn recurring ones into FAQ/spec content (compounding SEO + agent-quality flywheel).



RECOMMENDATIONS (staged, with thresholds)


Build Phase 1 now, prioritizing the five product-line pages + agents + spec library. Course-change trigger: if agent cost/session exceeds target or the refusal/hallucination rate is high, tighten scope prompts and drop to Haiku-only before adding features.
Launch agents on 2 lines first (Skyfold + Smoke Guard) as a pilot — they have the richest technical Q&A and clearest ROI (structural coordination and code compliance are exactly where specifiers get stuck) — then roll to all five once guardrails and cost are validated. Threshold: agent spend within budget target and a high cited-answer rate before full rollout.
Instrument everything from day one (query logs, escalations, token cost). Use the data to (a) prioritize portfolio/video content and (b) mine SEO long-tail.
Keep manufacturer resources linked, not mirrored for CAD/BIM/CSI specs (they update; you don't want stale specs); host only dealer-value-add. Revisit only if a manufacturer's link stability becomes a problem.
Treat the code/problem explainer content as the SEO investment — one strong Smoke Guard code guide will outperform ten thin pages.
Defer portfolio/video until real project assets are collected; don't block launch on them.



CAVEATS


Some 2026 web-design "trend" sources (e.g., the "Tactile Brutalism/Invisible Architecture" and "premium utilitarian minimalism" articulations) are forward-looking or design-community artifacts rather than academic sources; treat the creative direction as a defensible aesthetic thesis, not guaranteed fashion. Named leaders (Vitrocsa, Sky-Frame, panoramah!) are consistently cited as category/design leaders but I could not independently confirm dated Awwwards "Site of the Day" wins for each.
Claude model names/prices and Cloudflare/Vercel free-tier limits shift; verify current Haiku/Sonnet pricing, prompt-caching thresholds, and Vectorize/D1 limits at build time (Claude Haiku 3 retires April 19, 2026 — use Haiku 4.5+).
CSI section numbers should be confirmed against the manufacturers' current published 3-part specs at build (Euro-Wall 08 43 33, Skyfold 10 22 39, Modernfold 10 22 26 / glass 10 22 43, Airolite 08 90 00) — manufacturers occasionally file under adjacent sections, and DASMA notes glazed door placement can vary by framing type.
Final code determinations (IBC/UL/NFPA for Smoke Guard) always rest with the AHJ and design team; the agent must never present itself as the code authority.
Air Control Products' stated territory is "Northern and Central Ohio"; confirm the spin-off's intended (possibly expanded) service region before finalizing service-area pages.
The existing pm-intelligence-agent repo is an internal PM decision-support tool; only its infrastructure pattern is reused — its agents/prompts must not be exposed publicly.
