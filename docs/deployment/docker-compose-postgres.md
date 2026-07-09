---
sidebar_position: 2
---

# Docker Compose: PostgreSQL

Deploy UnDercontrol with the all-in-one image and a dedicated PostgreSQL database. Recommended for production, where concurrent access and reliability matter more than the single-file simplicity of SQLite.

## Stack overview

- **Image**: `lintao0o0/undercontrol:latest` — the all-in-one container (frontend + Go backend in one image)
- **Database**: PostgreSQL
- **Storage**: local filesystem (Docker volume)

## Prerequisites

- Docker 20.10+ and Docker Compose 2.0+
- A license token — see [Self-Hosting](/self-hosting) for a free 3-month trial license, or [contact us](/contact).

## docker-compose.yml

```yaml
services:
  postgres:
    image: postgres:18.1-alpine3.23
    environment:
      POSTGRES_DB: undercontrol
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - pg_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  undercontrol:
    image: lintao0o0/undercontrol:latest
    ports:
      - "3000:8080"
    environment:
      - GIN_MODE=release
      - HOST_DOMAIN=http://localhost:3000
      - JWT_SECRET=change-me-to-a-long-random-string
      - DATABASE_TYPE=postgres
      - POSTGRES_HOST=postgres
      - POSTGRES_PORT=5432
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DATABASE=undercontrol
      - ADMIN_EMAIL=admin@example.com
      - ADMIN_PASSWORD=changeme
      - LICENSE_TOKEN=your-license-token
      - LICENSE_HOST_SECRET=your-license-secret
    depends_on:
      postgres:
        condition: service_healthy
    restart: unless-stopped

volumes:
  pg_data:
```

## Configuration notes

- **`HOST_DOMAIN`** (required) — the public URL you reach the app at. It is used to build file download/upload links, so it must match how you actually access the app (the host-mapped port here, or your real domain). A wrong value results in broken file downloads.
- **`JWT_SECRET`** — a long random string used to sign auth tokens. Change it before exposing the instance publicly.
- **`LICENSE_TOKEN` / `LICENSE_HOST_SECRET`** — activate Pro features. Grab a free 3-month trial from the [Self-Hosting](/self-hosting) page.

See the [Backend Configuration](./backend-config) reference for the full list of environment variables and flags.

## Start

```bash
docker compose up -d
```

Then open `http://localhost:3000`. The database schema migrates automatically on first boot.

## Next steps

- Offload attachments to cloud storage: [S3 / R2 Storage](/docs/deployment/docker-compose-s3)
- Scale on a cluster: [Kubernetes + Helm](/docs/deployment/kubernetes-helm)
