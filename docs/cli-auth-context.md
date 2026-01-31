---
title: CLI Multi-Context Authentication
description: Manage multiple accounts and API endpoints with kubectl-style contexts
sidebar_position: 5
---

# CLI Multi-Context Authentication

The UnderControl CLI supports managing multiple accounts and API endpoints using a kubectl-style context system. This allows you to easily switch between different servers, accounts, or environments.

## Overview

A **context** is a named configuration that contains:
- API URL (server endpoint)
- Authentication token or API key
- Username (for display)

You can have multiple contexts (e.g., `personal`, `work`, `staging`) and switch between them instantly.

## Configuration File

Contexts are stored in `~/.config/ud/config.yaml`:

```yaml
current-context: personal
contexts:
- name: personal
  context:
    api_url: https://api.undercontrol.app
    token: eyJhbGciOi...
    user: john@example.com
- name: work
  context:
    api_url: https://ud.company.com
    token: eyJhbGciOi...
    user: john@company.com
- name: staging
  context:
    api_url: http://localhost:4000
    api_key: ak_test_xxx
```

## Commands

### List All Contexts

```bash
ud config get-contexts
```

Output:
```
CURRENT  NAME      API URL                      USER
*        personal  https://api.undercontrol.app john@example.com
         work      https://ud.company.com       john@company.com
         staging   http://localhost:4000        (api-key)
```

The `*` indicates the currently active context.

### Switch Context

```bash
ud config use-context work
```

Output:
```
Switched to context "work".
```

### Show Current Context

```bash
ud config current-context
```

Output:
```
work
```

### Create or Update Context

```bash
# Create a new context
ud config set-context staging --api-url http://localhost:4000

# Create with API key (for CI/CD)
ud config set-context ci --api-url https://api.example.com --api-key ak_xxx

# Update existing context
ud config set-context work --api-url https://new-api.company.com
```

### Delete Context

```bash
ud config delete-context staging
```

### Rename Context

```bash
ud config rename-context work production
```

### View Full Configuration

```bash
ud config view
```

Output (tokens are partially masked):
```
current-context: personal
contexts:
- name: personal
  context:
    api_url: https://api.undercontrol.app
    user: john@example.com
    token: eyJhbGciOi...xyz
- name: work
  context:
    api_url: https://ud.company.com
    user: john@company.com
    token: eyJhbGciOi...abc
```

## Login with Context

When logging in, you can specify which context to save credentials to:

```bash
# Login and save to a new context
ud login --context work --api-url https://ud.company.com

# Login to existing context (updates credentials)
ud login --context personal
```

## Environment Variable Overrides

You can override context settings using environment variables:

| Variable | Description |
|----------|-------------|
| `UD_CONTEXT` | Override current context |
| `UD_API_URL` | Override API URL |
| `UD_API_KEY` | Override API key |
| `UD_TOKEN` | Override auth token |

Example:
```bash
# Use different context for one command
UD_CONTEXT=staging ud task list

# Override API URL temporarily
UD_API_URL=http://localhost:4000 ud task list
```

## Common Workflows

### Personal + Work Setup

```bash
# Setup personal account
ud login --context personal --api-url https://api.undercontrol.app

# Setup work account
ud login --context work --api-url https://ud.company.com

# Switch between them
ud config use-context personal
ud task list  # Lists personal tasks

ud config use-context work
ud task list  # Lists work tasks
```

### Development + Production

```bash
# Local development
ud config set-context dev --api-url http://localhost:4000
ud login --context dev

# Production
ud login --context prod --api-url https://api.undercontrol.app

# Quick switching
ud config use-context dev
ud config use-context prod
```

### CI/CD with API Key

```bash
# Create context with API key (no interactive login needed)
ud config set-context ci \
  --api-url https://api.undercontrol.app \
  --api-key ak_your_api_key

# Use in CI/CD scripts
ud config use-context ci
ud task create "Deployment completed" -d "Version 1.2.3"
```

Or use environment variables:
```bash
export UD_API_URL=https://api.undercontrol.app
export UD_API_KEY=ak_your_api_key
ud task list
```

## Migration from Single Context

If you have an existing config file with the old single-context format:

```yaml
# Old format
api_url: https://api.undercontrol.app
token: eyJhbGciOi...
```

The CLI automatically migrates it to the new format:

```yaml
# New format (auto-migrated)
current-context: default
contexts:
- name: default
  context:
    api_url: https://api.undercontrol.app
    token: eyJhbGciOi...
```

No manual action required - the migration happens automatically on first use.

## Troubleshooting

### Context Not Found

```
Error: context "work" not found
```

**Solution**: Create the context first with `ud config set-context work --api-url <url>` or `ud login --context work`.

### Not Logged In

```
Error: not logged in. Run 'ud login' first or set UD_API_KEY environment variable
```

**Solution**: The current context has no authentication. Run `ud login` or set `UD_API_KEY`.

### Wrong Context

If commands are hitting the wrong server, check your current context:

```bash
ud config current-context
ud config get-contexts
```

Switch to the correct context with `ud config use-context <name>`.
