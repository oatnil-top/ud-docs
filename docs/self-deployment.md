---
sidebar_position: 2
---

# Self-Deployment Guide

Self-host UnDercontrol with a single Docker command. The **all-in-one image** bundles
the frontend and backend in one container, so there is nothing to wire together — just
run it and open your browser.

The images are published for both **linux/amd64** and **linux/arm64** (Apple Silicon,
ARM servers), so the same command works on any machine.

## Quick Start (Free / Personal)

No license required. Single user, SQLite, local file storage.

```bash
docker run -d --name undercontrol \
  -p 3000:8080 \
  -e HOST_DOMAIN=http://localhost:3000 \
  -e JWT_SECRET=change-me-to-a-random-string \
  -v undercontrol-data:/app/data \
  lintao0o0/undercontrol:latest
```

Then open `http://localhost:3000` and click **Start**. The frontend and backend are in
the same container and connect automatically via `/api/v1` — no server URL to configure.

### First-boot banner

The container logs make success and failure obvious. On a successful boot,
`docker logs undercontrol` ends with a ready banner telling you exactly where to go
and how to log in:

```text
==============================================================================

  UnDercontrol v1.x.x is ready

  --> Open http://localhost:3000 to get started

      Login as:  personal@undercontrol.local
                 default password: personal123 (set PERSONAL_TIER_PASSWORD to change it)
      Tier:      Personal (max users: 1)
      Database:  SQLITE
      Storage:   LocalFS

==============================================================================
```

If the configuration is broken, the container exits immediately and the same logs show
a `STARTUP FAILED` block explaining exactly what to fix — a missing `HOST_DOMAIN`, a
missing `ADMIN_EMAIL` on Pro/Max, or a port already in use. The password hint only
appears while the account is still on the shipped default password.

## Bare-metal (npm, no Docker)

The server is also published as an npm package with the web UI compiled into the
binary — nothing else to install. Requires Node.js 18+. Available for macOS
(Intel & Apple Silicon), Linux (x64 & ARM64), and Windows (x64).

```bash
npm install -g @oatnil/ud-server @oatnil/ud   # server + CLI

ud-server -host-domain http://localhost:8080 -data-path ./data
```

Then open `http://localhost:8080` — the same ready banner as Docker prints in the
terminal with the login credentials. Everything lives under `./data` (SQLite database
and uploads), so backing up or moving the instance is copying that directory.

- Configuration is identical to Docker: every environment variable in the
  [Configuration reference](/configuration) also works as a CLI flag
  (`ud-server -help` lists them). `HOST_DOMAIN` is the only required setting.
- Licenses work the same way: export `LICENSE_TOKEN` / `LICENSE_HOST_SECRET`
  before starting to unlock Pro features.
- Upgrade with `npm update -g @oatnil/ud-server`; uninstall with
  `npm uninstall -g @oatnil/ud-server` (your `./data` directory is untouched).
- To run it as a service, wrap the command in systemd / launchd like any other
  single binary.

## Pro / Max (Multi-user)

Add a license token and an admin account to unlock multi-user, PostgreSQL, S3 storage and
the admin dashboard. Contact the UnDercontrol team for a license token.

```bash
docker run -d --name undercontrol \
  -p 3000:8080 \
  -e HOST_DOMAIN=http://localhost:3000 \
  -e JWT_SECRET=change-me-to-a-random-string \
  -e ADMIN_EMAIL=admin@example.com \
  -e ADMIN_PASSWORD=your-secure-password \
  -e LICENSE_TOKEN=your-license-token \
  -e LICENSE_HOST_SECRET=your-license-host-secret \
  -v undercontrol-data:/app/data \
  lintao0o0/undercontrol:latest
```

Log in with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` you set.

:::warning ADMIN_EMAIL is required for Pro/Max
On Pro/Max tier the initial admin user is created from `ADMIN_EMAIL` at startup. If it is
missing the server **refuses to boot** with a clear error — set it (and `ADMIN_PASSWORD`)
before starting.
:::

## docker-compose

For persistent data and easier configuration, use docker-compose:

```yaml
services:
  undercontrol:
    image: lintao0o0/undercontrol:latest
    ports:
      - "3000:8080"
    volumes:
      - ./data:/app/data
    environment:
      - HOST_DOMAIN=http://localhost:3000
      - JWT_SECRET=change-me-to-a-random-string
      # Pro/Max only:
      # - ADMIN_EMAIL=admin@example.com
      # - ADMIN_PASSWORD=your-secure-password
      # - LICENSE_TOKEN=your-license-token
      # - LICENSE_HOST_SECRET=your-license-host-secret
```

```bash
docker compose up -d
```

## Environment Variables

The table below covers the variables most deployments touch. For every setting the
server reads — with an interactive config builder and boot preview — see the
[Configuration Reference](/configuration).

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `HOST_DOMAIN` | **Yes** | — | Public URL clients use to reach this instance. Used to build file download/upload links, so it must be reachable (e.g. `http://localhost:3000` or `https://ud.example.com`). |
| `JWT_SECRET` | **Yes** | — | Random secret used to sign auth tokens. |
| `ADMIN_EMAIL` | Pro/Max | — | Login username of the initial admin user. Required on Pro/Max tier. |
| `ADMIN_PASSWORD` | Pro/Max | `admin123` | Initial admin password. Change it. |
| `LICENSE_TOKEN` | Pro/Max | — | License token that unlocks Pro/Max features. |
| `LICENSE_HOST_SECRET` | Pro/Max | — | Host secret paired with your license token. |
| `PERSONAL_TIER_PASSWORD` | No | `personal123` | Password of the single Personal-tier user (`personal@undercontrol.local`). Set it **before first boot**: the **Start** auto-login always uses this variable, so changing only the env var after the user exists — or changing only the password in-app — breaks auto-login (the two must match; the login name itself cannot be changed). |
| `PORT` | No | `8080` | Port the server listens on inside the container. |
| `TELEGRAM_BOT_TOKEN` | No | — | Bot token that switches on the Telegram messenger channel for Alfred, the built-in butler agent. Optional even as a variable: an admin can also set, change or clear the token at runtime in **Admin → System Config → Integration**, no restart needed. Leave both unset and no messenger is started — everything else works unchanged. |

### Optional: PostgreSQL, S3 and AI

The all-in-one image defaults to SQLite + local file storage, which is enough for most
self-hosted instances. On Pro/Max you can point it at external services with additional
environment variables:

- **PostgreSQL** — set `DATABASE_URL` (or the individual `DB_*` variables) to a Postgres
  connection instead of the bundled SQLite.
- **S3 / R2 storage** — set the `S3_*` variables to store uploaded files in
  S3-compatible object storage (AWS S3, Cloudflare R2, MinIO) instead of the local volume.
- **AI provider** — set the OpenAI-compatible `AI_*` variables to enable AI features.

### Optional: Telegram messenger for Alfred

Alfred is the built-in butler agent. Users talk to him by mentioning `@alfred` in any comment
on the web, and that works on every instance with no configuration at all. Setting
`TELEGRAM_BOT_TOKEN` additionally lets each user link a personal Telegram account and message
Alfred from their phone.

- **Get a token** — talk to [@BotFather](https://t.me/BotFather) on Telegram, send `/newbot`,
  and it hands you a token that looks like `123456:ABC-DEF...`.
- **Set it** — the simplest way is in the app: **Admin → System Config → Integration**, paste the
  token, save. It applies immediately — the messenger gateway starts, restarts or stops as the
  token is set, changed or cleared, with no server restart. Alternatively set the
  `TELEGRAM_BOT_TOKEN` environment variable (or `--telegram-bot-token` flag), which seeds the same
  setting at boot; while the env var stays set it wins on every boot and the field shows as locked
  in the admin UI, so remove the variable if you prefer to manage the token in-app.
- **Bad token?** — a token Telegram rejects is reported right on the System Config page
  (and in onboarding, to admins) instead of hiding in the server log.
- **What it changes in the app** — `GET /app/info` reports the messenger under `im_providers`,
  and that is what makes the Telegram option appear in the app (first-run onboarding step 4 and
  Profile → Messenger). While `im_providers` is empty the app says the channel is off: admins
  get a link to System Config, other members are told to ask their administrator.
- **Users link themselves** — each user generates a one-time code in the app and sends
  `/link CODE` to the bot. Codes expire after 10 minutes. The operator never handles
  per-user credentials.
- `DISCORD_BOT_TOKEN` / `--discord-bot-token` is accepted by the configuration, but no Discord
  provider is implemented yet — setting it alone starts nothing.

## First-run onboarding

The first time a user opens a fresh instance they get a four-step wizard. Every step is
skippable, and anything already configured shows up as completed instead of asking again.
Nothing here is required for the server to run — a bare instance completes onboarding fine.

1. **Language** — English or Chinese for the interface.
2. **Workspace status hooks** — asks permission to add Claude Code hooks to the workspace
   project's `.claude/settings.local.json`, which is what lets the desktop app show live agent
   status (running / waiting / idle). Nothing is written unless the user allows it.
3. **Register this machine as a daemon** — a daemon is the machine that runs agent sessions.
   In the UnDercontrol desktop app this is one click, plus a scan of the agent CLIs installed
   locally (Claude Code, Codex, …). In a browser the step recommends the desktop app, or gives
   the headless path for a server or remote box: `npm install -g @oatnil/ud`, `ud login`,
   `ud daemon start`. Either way the step completes as soon as the server reports an online
   daemon.
4. **Meet Alfred** — introduces the built-in butler agent (dispatching work to the right agent,
   remembering preferences and decisions, filing quick captures) and points users at
   `@alfred` mentions in web comments. If a Telegram bot token is configured, this step also
   offers the optional Telegram link described above; if not, the step explains that the channel
   is off and links admins straight to System Config, where the token applies without a restart.

**What the operator must do:** only step 4's Telegram option depends on server configuration.
Add the bot token in **Admin → System Config → Integration** (takes effect immediately) or via
`TELEGRAM_BOT_TOKEN` before your users go through onboarding if you want it to appear there;
otherwise they can link Telegram later from Profile → Messenger once you enable it.

## Separate frontend / backend images (advanced)

If you need to scale the frontend and backend independently, or put them behind different
proxies, they are also published as separate multi-arch images:

- Backend — `lintao0o0/undercontrol-backend:latest`
- Frontend — `lintao0o0/undercontrol-vite-app:latest`

The backend takes the same environment variables as above; the frontend serves the static
assets via nginx and proxies `/api` to the backend.

## Data & Backup

All state lives under `/app/data` (mounted as a volume above): the SQLite database and, by
default, uploaded files. Back up that volume to back up your instance. If you use external
PostgreSQL and S3, back those up instead.

## Troubleshooting

Start with `docker logs undercontrol`: a healthy boot ends with the ready banner shown
above, and a misconfigured one ends with a `STARTUP FAILED` block naming the exact
variable to fix.

- **Container exits immediately** — read the `STARTUP FAILED` block in the logs. The
  common causes are a missing `HOST_DOMAIN`, a missing `ADMIN_EMAIL` on Pro/Max, or the
  port already being in use.
- **`no matching manifest for linux/arm64/v8`** — update to the latest image; it is now
  published for both amd64 and arm64.
- **Don't know where to log in** — the ready banner prints the URL and the login account
  for your tier.
- **File links are unreachable** — `HOST_DOMAIN` must be the URL clients actually use to
  reach the instance, including scheme and port.
- If you're still stuck, contact support with the logs and your configuration (remove
  sensitive data).
