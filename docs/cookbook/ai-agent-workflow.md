---
title: AI Agent Workflow
sidebar_position: 11
---

# AI Agent Workflow

Use the CLI in your AI coding agent (Claude Code, Cursor, etc.) to read tasks, track progress, and report results.

## Setup

Add to your `.claude/instructions.md` or `.cursorrules`:

```markdown
Use the `ud` CLI to manage tasks (run `ud describe skill ud-cli` for the full reference):
- List tasks: `ud get task`
- View details: `ud describe task <id>`
- Create/update a task: `ud apply -f -` (no `id` = create, `id` = update)
- Add a note: `ud apply -f -` with `task_id` in the frontmatter
- Complete a task: apply it with `status: done`
```

## Workflow

### 1. Agent reads the task

```bash
ud describe task a1b2
```

### 2. Agent logs progress via notes

```bash
cat <<'EOF' | ud apply -f -
---
task_id: a1b2
---
Started: setting up database schema
EOF

cat <<'EOF' | ud apply -f -
---
task_id: a1b2
---
Done: schema migration created. Commit: 3fa8b2c
EOF

cat <<'EOF' | ud apply -f -
---
task_id: a1b2
---
Blocked: need API key for external service
EOF
```

### 3. Agent completes the task

```bash
cat <<'EOF' | ud apply -f -
---
task_id: a1b2
---
All steps completed. Summary: added user auth with JWT tokens
EOF

cat <<'EOF' | ud apply -f -
---
id: a1b2
status: done
---
EOF
```

