---
title: Managing Multiple Accounts with CLI Contexts
description: Learn how UnDercontrol's kubectl-style context system lets you switch between multiple accounts and self-hosted instances from the command line.
authors: [lintao]
tags: [feature]
date: 2026-04-05
---

If you run more than one UnDercontrol instance — say, a personal server and a work server — you have probably felt the friction of juggling different API endpoints and credentials. The `ud` CLI now ships with a context system modeled after `kubectl`, which means switching between accounts is a single command rather than a manual environment variable shuffle.

## What a Context Is

A context in `ud` is a named profile that bundles together three things: an API endpoint, a set of credentials (either a session token from interactive login or a static API key), and any other per-instance preferences. Contexts are stored locally, so nothing about your configuration is ever sent anywhere.

A typical context list might look like this:

```
NAME          ENDPOINT                          CURRENT
personal      https://ud.home.example.com       *
work          https://ud.corp.example.com
local         http://localhost:4000
```

The asterisk marks the active context. Every `ud` command you run uses that context unless you override it.

## Switching Contexts

To switch, you run:

```
ud ctx use work
```

That is it. Your next `ud task list` or `ud expense add` will hit the work server with the work credentials. Switch back just as easily:

```
ud ctx use personal
```

If you prefer not to memorize context names, running `ud ctx use` without arguments opens an interactive TUI picker. You get a fuzzy-searchable list of your contexts, navigate with arrow keys, and confirm with Enter. It is the same muscle memory as tools like `kubectx` or `fzf`-wrapped shell scripts, but built in.

## Adding a Context

Creating a context is straightforward:

```
ud ctx add personal --endpoint https://ud.home.example.com
```

After adding it, `ud ctx login personal` walks you through interactive authentication and stores the token. If you are setting up a context for a shared or headless environment, you can pass an API key directly instead:

```
ud ctx add ci --endpoint https://ud.corp.example.com --api-key <your-key>
```

API keys are the right choice for CI/CD pipelines, cron jobs, or any situation where interactive login is not practical. Generate an API key from the UnDercontrol web interface under Settings, then reference it in your context configuration. No browser, no interactive prompt.

## Environment Variable Overrides

Sometimes you want to target a specific instance for a single command without permanently switching your active context. Two environment variables cover this:

```
UD_CONTEXT=work ud task list
UD_ENDPOINT=http://localhost:4000 UD_API_KEY=dev-key ud expense list
```

`UD_CONTEXT` selects a named context by name. `UD_ENDPOINT` and `UD_API_KEY` together let you point at an arbitrary endpoint without creating a named context at all. This is useful in scripts where you want explicit control rather than relying on whatever context happens to be active on the machine running the script.

## Per-Context Auth

Each context maintains its own authentication state independently. Logging out of one context does not affect others. If a session token expires on your work context, `ud ctx login work` refreshes it without touching your personal or local contexts. The tokens are stored in a local credentials file, separate from the context definitions, so you can share a context configuration file across machines without accidentally sharing secrets.

## Inspecting the Current Context

When you are deep in a script or troubleshooting an unexpected API response, it helps to confirm which context is active:

```
ud ctx current
```

This prints the name, endpoint, and authentication method for the active context. Combine it with `ud ctx list` for a full overview.

## Why This Matters for Self-Hosted Users

UnDercontrol is designed around the premise that your data belongs to you. Running your own instance is a first-class workflow, not an afterthought. The context system reflects that: it assumes you might run multiple instances, that you want to move between them without friction, and that automation should be possible without compromising your security model.

Whether you are managing a personal instance at home, a family server, and a work deployment, or simply running a local development instance alongside production, contexts give you a clean mental model and a consistent CLI interface across all of them.

## Get Started

If you are not yet running UnDercontrol, the self-deployment guide covers getting an instance up in under ten minutes using Docker. Once your instance is running, install the `ud` CLI via Homebrew or the binary releases, then set up your first context with `ud ctx add`.

Full documentation for the context system, including the credentials file format and all available flags, is in the CLI reference section of the docs.
