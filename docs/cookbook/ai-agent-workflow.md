---
title: AI Agent Workflow
sidebar_position: 11
---

# AI Agent Workflow

Use the CLI in your AI coding agent (Claude Code, Cursor, etc.) to read tasks, track progress, and report results.

## Setup

Add to your `.claude/instructions.md` or `.cursorrules`:

```markdown
Use `ud` CLI to manage tasks:
- List tasks: `ud get task`
- View details: `ud describe task <id>`
- Create task: `ud task create "title" -d "description"`
- Add note: `ud task note add <id> "progress update"
- Complete: `ud task done <id>`
```

## Workflow

### 1. Agent reads the task

```bash
ud describe task a1b2
```

### 2. Agent logs progress via notes

```bash
ud task note add a1b2 "Started: setting up database schema"

ud task note add a1b2 "Done: schema migration created. Commit: 3fa8b2c"

ud task note add a1b2 "Blocked: need API key for external service"
```

### 3. Agent completes the task

```bash
ud task note add a1b2 "All steps completed. Summary: added user auth with JWT tokens"
ud task done a1b2
```

## Natural language queries

Let the agent search tasks with plain language:

```bash
ud task nl "what tasks are blocked?"

ud task nl "show me tasks tagged backend that are in progress"
```
