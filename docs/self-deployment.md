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

### Optional: PostgreSQL, S3 and AI

The all-in-one image defaults to SQLite + local file storage, which is enough for most
self-hosted instances. On Pro/Max you can point it at external services with additional
environment variables:

- **PostgreSQL** — set `DATABASE_URL` (or the individual `DB_*` variables) to a Postgres
  connection instead of the bundled SQLite.
- **S3 / R2 storage** — set the `S3_*` variables to store uploaded files in
  S3-compatible object storage (AWS S3, Cloudflare R2, MinIO) instead of the local volume.
- **AI provider** — set the OpenAI-compatible `AI_*` variables to enable AI features.

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
