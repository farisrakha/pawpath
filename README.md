# PawPath

Pet adoption and rehoming marketplace for Jabodetabek. Shelters and verified private owners list animals that need a home. Adopters apply — not buy. Lifestyle matching replaces catalog browsing, and a five-stage application lifecycle replaces checkout.

**Live demo:** https://pawpath.vercel.app

> **v1 is a frontend-only prototype.** Every screen and flow is fully interactive, but there is no backend. All listings, lister profiles, and application data are mock state stored in the browser via `localStorage`. This validates the adoption UX and the trust-surface hypothesis before any backend investment. Data shapes mirror the planned Phase 2 API, so going live is a data-layer swap rather than a rewrite. See `PRD.html` for the full product spec.

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

**Demo account:** sign in at `/login` with `demo@pawpath.id` and any password. It comes seeded with a saved match profile and submitted applications so the status-tracking and lister inbox flows have data to show.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the dev server on port 3000 |
| `pnpm build` | Production build (Vite + Nitro), output in `.output/` |
| `pnpm preview` | Preview the production build |
| `pnpm test` | Run Vitest once (`pnpm exec vitest` for watch mode) |
| `pnpm check` | Biome lint + format check (also `pnpm lint`, `pnpm format`) |

## Tech stack

- **TanStack Start** (React 19) with file-based routing, server-rendered through Vite and Nitro
- **Tailwind CSS v4** with a coral and honey-yellow design-token system in `src/styles.css`
- **shadcn/ui** (Base UI, new-york) for accessible interactive primitives
- **Biome** for linting and formatting (tabs, double quotes)
- **Vitest** for tests

## Project structure

```
src/
  data/        Static pet listings, lister profiles, mock user and application data
  lib/         Formatting (IDR, dates), SSR-safe storage, analytics stub, id helpers
  context/     React providers: listings, applications, lister profiles, auth, pet-profiles
  components/  layout (shell, nav, footer), pet cards, application form, trust surfaces, ui/ shadcn primitives
  routes/      File-based routes; routeTree.gen.ts is auto-generated, never edit it
```

Feature areas: pet listing browse and lifestyle-match filtering, pet profile pages, multi-step adoption application form (lifestyle screening), five-stage application status lifecycle (Terkirim → Ditinjau → Meet & Greet → Disetujui → Diadopsi), lister profiles with trust signals and verification badges, WhatsApp deep-link contact revealed at meet-and-greet stage, optional shelter donation at application. UI copy is Bahasa Indonesia.

## Deployment

The build produces a self-contained artifact in `.output/` using Nitro's default node-server preset.

### Any Node host (Render, Fly.io, a VPS)

```bash
pnpm build
node .output/server/index.mjs   # respects PORT, defaults to 3000
```

### Vercel

`vercel.json` forces the Nitro `vercel` preset so the build emits a Build Output API bundle:

```bash
vercel deploy --prod
```

The project is connected to this GitHub repo, so pushing to `main` triggers a production deploy automatically. For other hosts, set `NITRO_PRESET` (for example `cloudflare`, `netlify`) and see https://nitro.build/deploy.

## TanStack Start notes

Routes live in `src/routes` as files. The root layout and HTML shell are in `src/routes/__root.tsx`. Server logic uses `createServerFn` from `@tanstack/react-start` or the `server.handlers` property on a file route. PawPath v1 does not call the network, so these are unused today but are the seam for Phase 2.

Learn more at the [TanStack Start documentation](https://tanstack.com/start).
