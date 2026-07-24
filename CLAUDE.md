# UnDercontrol Docs Site (ud-docs)

Docusaurus site served at https://oatnil.com. Deploys automatically via Cloudflare
Workers Builds on push to `main`. i18n: `en` (default) + `zh-Hans`.

## Audience positioning (decided 2026-07-24)

**`src/pages/` is for humans. `docs/` is for agents.**

- `src/pages/` — marketing and tool pages with full React interactivity
  (`/self-hosting`, `/configuration`). Optimize for discovery and interaction.
  i18n for TSX pages: `<Translate>` ids resolved in `i18n/zh-Hans/code.json`, or
  single-file `{en, zh}` string maps switched on `i18n.currentLocale`
  (see `src/pages/configuration.tsx`) — no page mirror files.
- `docs/` — plain, structured markdown with stable URLs. AI agents consume these
  raw from git (the homepage agent-setup prompt flow fetches raw GitHub URLs), so
  keep them machine-readable: no React components, no visual tricks, facts stated
  plainly. The rendered HTML is a byproduct for human readers.
  ZH mirrors live in `i18n/zh-Hans/docusaurus-plugin-content-docs/current/` and
  must stay in sync with the EN file.
- The same fact often appears on both surfaces (e.g. env vars on `/configuration`
  and in `docs/self-deployment.md`) — when you change one, check the other.

## Page ownership

- Self-host/onboarding surfaces (`/self-hosting`, `/configuration`,
  `docs/self-deployment.md`) are owned by the **Onboarding Experience Owner**
  agent. The Configuration Reference (`src/pages/configuration.tsx` +
  `src/components/ConfigBuilder/`) is generated from
  `go-backend/internal/config/config.go` in the main repo — any variable
  add/rename/default change there must update the page's `REFERENCE` data and the
  ConfigBuilder banner strings in the same task.
- The homepage "Fetch <url>" agent-setup prompt's source of truth is
  `static/agent-setup/prompt.md`; it is mirrored byte-identical in the main
  repo's `ud-vite-app` home page and in `src/pages/index.tsx` here.

## Conventions

- The product name is **UnDercontrol** (capital U and D). It is proprietary —
  never describe it as open-source.
- Verify changes with `npm run build` (builds both locales; broken links fail
  the build). Pre-existing broken-anchor warnings on `/zh-Hans/privacy`,
  `/zh-Hans/self-hosting` and `/zh-Hans/` are known.
- Commit messages: `[<task-id-prefix>] <type>(<scope>): <message>`.
