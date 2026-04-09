# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- Use `pnpm` for repo commands.
- `pnpm dev` — local dev server
- `pnpm build` — production SSG build
- `pnpm build-tc2` — TC2 variant build (rewrites `src/pages/` in place; avoid on dirty worktrees)
- `pnpm format` — Prettier (with `prettier-plugin-astro`)
- `pnpm lint` — ESLint for `.ts`, `.tsx`, `.astro`
- `pnpm stylelint` — stylelint for `.scss`, `.astro`
- `pnpm tsc` — type-check only (no emit)
- `pnpm check` — Astro check (noisy from pre-existing errors; don't assume failures are from your change)

## Architecture

**Framework:** Astro 5 (SSG) with React islands. Pages are `.astro`; interactive UI is `.tsx` hydrated via `client:*` directives.

**Path aliases** (configured in tsconfig, usable in all `.astro`/`.ts`/`.tsx`):
- `@components` → `src/components/`
- `@layouts` → `src/layouts/`
- `@pages` → `src/pages/`
- `@ssg` → `src/ssg/`
- `@store` → `src/store/`
- `@styles` → `src/styles/`
- `@utils` → `src/utils/`
- `@img` → `src/img/`

**Data flow at build time:** `src/ssg/` fetches and caches external API data (mastercomfig releases, HUD list, quickplay data, etc.). `src/pages/api/` and `src/pages/gameData/` expose JSON endpoints built from that data. `src/ssg/appData.ts` is the main entry used by `src/pages/app.astro`.

**Client state:** Zustand stores in `src/store/`. `items.ts` drives the TF2 configurator, `quickplay.ts` drives quickplay, `deadlock.ts` drives the Deadlock configurator.

**Two configurators:**
- `/app` (`src/pages/app.astro`) — TF2/mastercomfig config tool; the primary feature
- `/app-dl` (`src/pages/app-dl.astro`) — Deadlock config tool; uses `src/utils/deadlock.ts`, `src/utils/deadlockData.ts`, `src/components/deadlock/`

**Styling:** Tailwind v4 (via `@tailwindcss/vite`) + Bootstrap 5/Bootswatch + SCSS. Bootstrap aliases `~bootstrap` and `~bootswatch` are set in `astro.config.mts` vite resolve.

**PWA:** `@vite-pwa/astro` with Workbox precaching. SW registration is in `src/pwa.ts`.

**CSP/SRI:** `@kindspells/astro-shield` generates SRI hashes into `generated/sriHashes.mjs` at build time. A custom `astro-csp-hash-exporter` integration forks `scripts/generate-headers-file.js` post-build to write `generated/nonce.txt` and headers. The nonce is injected via Vite's `html.cspNonce`.

**Domain:** Defaults to `comfig.app`; override with `ASTRO_DOMAIN_OVERRIDE` env var (used by `build-tc2` to target `teamcomtress.com`).

**Loaders pattern:** `src/components/loaders/` contains thin `.astro` wrappers that inject scripts or lazy-load heavy React components. Prefer adding a loader over importing heavy libs directly in pages.

## Gotchas

- `pnpm build-tc2` moves `src/pages/tc2/` to become all of `src/pages/` before building — it mutates the working tree.
- `pnpm check` has pre-existing errors in `astro.config.mts` and generated `out/` content; treat it as informational, not a gate.
- `src/utils/deadlock.ts` still contains a dead `window.desktop?.isElectron` check — Electron has been removed; that branch is unreachable and can be cleaned up.
- The `generated/` directory is created at build time; it will not exist in a fresh clone until after a build runs.
