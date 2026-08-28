---
title: CLI AI Agent Integration
description: Teach AI coding assistants like Claude Code, Cursor, and Codex to use the UnDercontrol CLI via its built-in skills
sidebar_position: 6
---

# CLI AI Agent Integration

The `ud` CLI is designed to be driven by AI coding assistants. It ships with **built-in skills** — self-describing command references that an agent can load on demand — so you don't have to hand-maintain a prompt file. This lets AI agents manage your tasks, record progress, upload files, and track work through natural conversation.

## Why AI Integration?

When AI coding assistants like Claude Code or Cursor can access your task system, they can:

- **Check context before coding** — read task descriptions and requirements
- **Record progress automatically** — add notes as they complete work
- **Upload attachments** — attach screenshots, documents, or diagrams to tasks
- **Create follow-up tasks** — capture new issues discovered during implementation
- **Parse file attachments** — download and analyze files attached to tasks

## How Agents Learn the CLI

The CLI carries its own agent-facing reference as a built-in skill named `ud-cli`. An agent loads the full command reference and usage patterns by running:

```bash
ud describe skill ud-cli
```

This is the mechanism `ud --help` points agents to — its footer reads:

```
AI Agents: run "ud describe skill ud-cli" to load full command reference and usage patterns.
```

Because the skill is served by the CLI/backend, it always matches your installed version — there is nothing to regenerate when you update.

### Discovering Skills

Skills are group-scoped capability definitions. List them and read any one:

```bash
# List all available skills
ud get skills

# Show a skill's full content (the prompt an agent consumes)
ud describe skill ud-cli
ud describe skill ud-pm
```

Beyond `ud-cli`, other built-in skills teach specific workflows (e.g. `ud-pm` for kanban review, `ud-common` for everyday task queries, `spawn-workspace` for launching agent sessions).

### Discovering Recipes

For per-resource, copy-pasteable command recipes, use `ud cook`:

```bash
ud cook task
ud cook note
ud cook board
```

## Quick Setup

Setup lives in the tool, not in this page. The CLI's own onboarding check knows what a
machine is still missing — server, sign-in, and the instruction file your assistant
loads — and names the exact next command for each:

```bash
ud config onboarding          # human-readable checklist
ud config onboarding --json   # for agents: next_command / requires_human per check
```

For a from-scratch, agent-driven setup (install, sign-in, skill file), have your agent
fetch and follow [https://oatnil.com/agent-setup/prompt.md](https://oatnil.com/agent-setup/prompt.md) —
that page is the single source of truth for the setup flow, and this section
deliberately does not restate it.

## What the Skill Teaches

The `ud-cli` skill covers everything an agent needs:

### Task Management
- Creating and updating tasks with `ud apply -f -` (no `id` = create, `id` = update)
- Viewing and querying tasks (`ud describe task`, `ud get task`, `ud query`)
- Marking tasks done by applying `status: done`
- Linking tasks and subtasks with `ud link task`

### Progress Tracking
- Adding notes by applying a document with `task_id` in the frontmatter
- Including commit hashes for traceability
- Documenting decisions and blockers
- Remembering task IDs across a session

### File Operations
- Uploading files with `ud upload resource`
- Attaching files to tasks
- Downloading resources via presigned URLs
- Parsing `resource://` URIs from task descriptions

### Entity Lookup
- Retrieving any entity by UUID with `ud get entity`
- Accessing presigned download URLs for file resources

## Example AI Workflow

Here's what a typical AI-assisted development session looks like:

```
You:    "Work on task abc-123"
AI:     [runs: ud describe task abc-123]
        "I see this task is about adding user authentication.
         I'll track progress on task abc-123 for this session."

You:    "Implement it"
AI:     [implements the feature]
        [runs: cat <<'EOF' | ud apply -f -
                ---
                task_id: abc-123
                ---
                Implemented JWT auth middleware. Commit: def456
                EOF]
        "Done. I've added auth middleware and recorded progress.
         Should I mark this task as done?"

You:    "Yes, and attach the architecture diagram"
AI:     [runs: cat <<'EOF' | ud apply -f -
                ---
                id: abc-123
                status: done
                ---
                EOF]
        [runs: ud upload resource ./auth-flow.png -t todolist -e abc-123]
        "Task completed and diagram attached."
```

## Best Practices

### Per-Project vs Global Setup

**Per-project** (recommended): Put the instruction (or skill file) in your project's `.claude/` directory so the agent only manages tasks when working in that project.

**Global**: Put it in your home directory (`~/.claude/`) to apply across all projects.

### Multi-Context Setup

If you use multiple ud contexts (personal/work), the agent operates on whichever context is currently active:

```bash
# Set the work context before an AI session
ud config use-context work

# The agent now operates on your work tasks
```

You can also pin a single command to a context with the global `--context` flag, e.g. `ud --context work get task`.

## Troubleshooting

### AI Not Using the CLI

**Problem:** The agent doesn't use `ud` commands.

**Solutions:**
1. Run `ud config onboarding` — it checks the sign-in, the server, and whether an
   instruction file exists, and names the next command for whatever is missing.
2. Verify the skill loads: `ud describe skill ud-cli`.

### AI Using Wrong Context

**Problem:** The agent operates on the wrong account/server.

**Solution:** Switch context before starting the session:
```bash
ud config use-context <correct-context>
```

### Outdated Skill File

**Problem:** You saved the skill to a file and it's missing newer commands.

**Solution:** Prefer loading the skill live with `ud describe skill ud-cli`. If you keep a file, regenerate it after CLI updates:
```bash
ud describe skill ud-cli > .claude/skills/ud-cli/SKILL.md
```
