---
sidebar_position: 4
---

# Kubernetes with Helm

Deploy UnderControl on Kubernetes using Helm charts for enterprise-grade, highly available production deployments.

## Coming Soon

This deployment guide is currently being developed.

## Stack Overview

This deployment will include:

- **Orchestration**: Kubernetes cluster
- **Package Manager**: Helm 3
- **Storage**: Persistent Volume Claims
- **Database**: PostgreSQL (StatefulSet or external)
- **Backend**: Go-based API server (Deployment)
- **Frontend**: Next.js web application (Deployment)
- **Ingress**: Traefik or NGINX Ingress Controller

## Benefits

- Auto-scaling based on load
- Rolling updates with zero downtime
- High availability and fault tolerance
- Advanced health checks and self-healing
- Resource optimization
- Multi-environment support (dev, staging, prod)

## Prerequisites (When Available)

- Kubernetes cluster (1.19+)
- Helm 3 installed
- kubectl configured
- Ingress controller
- Storage class for persistent volumes

## Temporary Alternative

While this guide is being prepared, you can start with:

- [Docker Compose with Local Storage + SQLite](/docs/deployment/docker-compose-local) - Available now
- [Docker Compose with PostgreSQL](/docs/deployment/docker-compose-postgres) - Coming soon

Check back soon for the complete Kubernetes Helm deployment guide.
