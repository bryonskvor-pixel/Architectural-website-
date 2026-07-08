# [COMPANY] — Specialty Architectural Products Website

Public marketing + technical website for **[COMPANY]**, an Ohio Division 08/10
specialty architectural products **dealer-installer** (Euro-Wall, Skyfold,
Modernfold, Smoke Guard, Airolite). The signature feature is five per-line
conversational **catalog agents** that answer spec questions with citations,
backed by the Cloudflare D1 + Vectorize data tier already populated in the
sister `pm-intelligence-agent` project.

The company has **no final name yet** — it is `[COMPANY]` everywhere and swaps in
one place ([`lib/brand.ts`](lib/brand.ts)).

## Stack
Next.js (App Router, TypeScript) + Tailwind v4 on **Vercel** · **Cloudflare** D1
+ five per-brand Vectorize indexes (data tier) · **Claude** Haiku 4.5 with prompt
caching (agents) · Cloudflare Turnstile + rate limiting (safety).

## Getting started
```bash
npm install
cp .env.example .env.local   # fill in keys
npm run dev
```
`npm run build` · `npm run typecheck`

## Read first
- [`CLAUDE.md`](CLAUDE.md) — the build contract (non-negotiable rules).
- [`Docs/Master_Website_Plan.md`](Docs/Master_Website_Plan.md) — master spec.
- [`SESSION_NOTES.md`](SESSION_NOTES.md) — current state & next steps.

## Status
**Session 1: scaffold + contracts.** Structure, brand-token system, full sitemap
routes, the shared product-line template, and typed agent/data-tier stubs are in
place and the build is green. Agents are **not yet wired** (handler returns 501);
page content is placeholder. See `SESSION_NOTES.md`.
