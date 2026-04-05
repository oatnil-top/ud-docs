---
title: Managing Multiple Accounts with CLI Contexts
description: Learn how UnDercontrol's kubectl-style context system lets you switch between multiple accounts and self-hosted instances from the command line.
authors: [lintao]
tags: [feature]
date: 2026-04-05
---

If you run more than one UnDercontrol instance — say, a personal server and a work server — you've probably felt the friction of juggling different API endpoints and credentials. The `ud` CLI ships with a context system modeled after `kubectl`, so switching between accounts is a single command.

<!-- truncate -->

## What a Context Is

A context in `ud` is a named configuration that bundles an API endpoint, credentials (either a session token from interactive login or a static API key), and a display username. Contexts live in `~/.config/ud/config.yaml` — nothing is sent anywhere.

A typical context list looks like this:

```
$ ud config get-contexts
CURRENT  NAME      API URL                           USER
*        personal  https://ud.home.example.com       me@example.com
         work      https://ud.corp.example.com       me@corp.com
         local     http://localhost:4000              admin@oatnil.com
```

The asterisk marks the active context. Every `ud` command uses that context unless you override it.

## Setting Up Your First Context

The fastest way to create a context is through login. The `-n` flag names the context in one step:

```bash
# Login and create a named context
ud login --api-url https://ud.home.example.com -n personal

# Add another for work
ud login --api-url https://ud.corp.example.com -n work
```

This prompts for your credentials, authenticates, and saves the token under the given context name. If you need a context for CI/CD or headless environments where interactive login isn't practical, use `config set-context` with an API key:

```bash
ud config set-context ci --api-url https://ud.corp.example.com --api-key ak_xxxxx
```

Generate API keys from the UnDercontrol web interface under Settings. No browser prompt needed at runtime.

## Switching Contexts

To switch your active context:

```bash
ud config use-context work
```

That's it. Your next `ud get task` or `ud describe task` hits the work server with work credentials. Switch back just as easily:

```bash
ud config use-context personal
```

If you're in the TUI, type `:ctx` in command mode to open an interactive context picker — arrow keys to navigate, Enter to confirm. Same muscle memory as `kubectx`.

## One-off Overrides

Sometimes you want to target a specific instance for a single command without permanently switching. The `--context` flag and environment variables handle this:

```bash
# Use a named context for one command
ud --context work get task

# Or via environment variable
UD_CONTEXT=work ud get task

# Point at an arbitrary endpoint without a named context
UD_API_URL=http://localhost:4000 UD_API_KEY=dev-key ud get task
```

The priority order is: `--context` flag > `UD_CONTEXT` env var > `current-context` in config file. This makes scripts explicit about which instance they target, regardless of whatever context happens to be active on the machine.

## Independent Auth Per Context

Each context maintains its own authentication state. Logging out of one context doesn't affect others. If your work session token expires, re-login just that context:

```bash
ud login --context work
```

Your personal and local contexts remain untouched.

## Inspecting Your Setup

```bash
# Show which context is active
ud config current-context

# List all contexts
ud config get-contexts

# View the full config (tokens are masked)
ud config view
```

## Housekeeping

```bash
# Rename a context
ud config rename-context old-name new-name

# Delete a context you no longer need
ud config delete-context staging
```

If you delete the currently active context, `ud` automatically switches to the first remaining one.

## Why This Matters for Self-Hosted Users

UnDercontrol is built around the premise that your data belongs to you. Running your own instance is a first-class workflow. The context system reflects that — it assumes you might run multiple instances, want to move between them without friction, and need automation without compromising security.

Whether you're managing a personal instance, a family server, and a work deployment, or simply running local dev alongside production, contexts give you a clean mental model and a consistent CLI interface across all of them.

## Get Started

Install the `ud` CLI via Homebrew (`brew install oatnil/ud/ud`) or grab a binary from the releases page. Set up your first context:

```bash
ud login --api-url https://your-instance.example.com -n myserver
```

Full documentation: [CLI Authentication & Contexts](/docs/cli-auth-context).
