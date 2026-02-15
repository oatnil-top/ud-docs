---
title: Manage Multiple Accounts
sidebar_position: 10
---

# Manage Multiple Accounts

Use kubectl-style contexts to switch between different servers or accounts.

## CLI

### Login to multiple servers

```bash
# Personal server
ud login --context personal --api-url https://ud.home.com

# Work server
ud login --context work --api-url https://ud.company.com
```

### List contexts

```bash
ud config get-contexts
```

### Switch context

```bash
ud config use-context work
```

### Show current context

```bash
ud config current-context
```

### One-off command with a different context

```bash
UD_CONTEXT=work ud get task
```

### Rename a context

```bash
ud config rename-context personal home
```

### Delete a context

```bash
ud config delete-context old-server
```

### Use API key (for CI/CD)

```bash
ud config set-context ci --api-url https://ud.company.com --api-key your-api-key
```
