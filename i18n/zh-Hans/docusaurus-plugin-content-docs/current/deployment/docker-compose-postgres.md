---
sidebar_position: 2
---

# Docker Compose: Local Storage + PostgreSQL

Deploy UnderControl with local filesystem storage and PostgreSQL database for better performance and reliability in small production environments.

## Coming Soon

This deployment guide is currently being developed.

## Stack Overview

This deployment will include:

- **Storage**: Local filesystem (Docker volume)
- **Database**: PostgreSQL
- **Backend**: Go-based API server
- **Frontend**: Next.js web application
- **Proxy**: Traefik reverse proxy

## Benefits Over SQLite

- Better concurrent access performance
- More reliable for production workloads
- Advanced query capabilities
- Better data integrity features

## Temporary Alternative

While this guide is being prepared, you can start with:

- [Docker Compose with Local Storage + SQLite](/docs/deployment/docker-compose-local) - Available now

Check back soon for the complete PostgreSQL deployment guide.
