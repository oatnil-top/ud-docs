---
title: CLI AI Agent Integration
description: Use ud prompt to integrate UnderControl with AI coding assistants like Claude Code, Cursor, and Codex
sidebar_position: 6
---

# CLI AI Agent Integration

The `ud prompt` command generates a skill prompt that teaches AI coding assistants how to use the UnderControl CLI. This enables AI agents to manage your tasks, record progress, upload files, and track work — all through natural conversation.

## Why AI Integration?

When AI coding assistants like Claude Code or Cursor can access your task system, they can:

- **Check context before coding** — read task descriptions and requirements
- **Record progress automatically** — add notes as they complete work
- **Upload attachments** — attach screenshots, documents, or diagrams to tasks
- **Create follow-up tasks** — capture new issues discovered during implementation
- **Parse file attachments** — download and analyze files attached to tasks

## Quick Setup

### Claude Code

```bash
# Create the skill directory
mkdir -p .claude/skills/ud-cli

# Generate the skill file
ud prompt --frontmatter > .claude/skills/ud-cli/SKILL.md
```

That's it. Claude Code will now automatically use the ud CLI when working on tasks.

### Cursor / Other AI Assistants

```bash
# Output the prompt and copy it into your AI instructions file
ud prompt > .cursorrules
# or
ud prompt >> .claude/instructions.md
```

## The `ud prompt` Command

```bash
ud prompt [flags]
```

Outputs a comprehensive skill prompt that covers all CLI commands, best practices, and workflows for AI agents.

**Flags:**

| Flag | Default | Description |
|------|---------|-------------|
| `--frontmatter` | `false` | Include YAML frontmatter for Claude Code skills |
| `--name` | `ud-cli` | Skill name in frontmatter |
| `--description` | *(auto)* | Skill description in frontmatter |

**Examples:**

```bash
# Preview the prompt
ud prompt

# Save as Claude Code skill (recommended)
ud prompt --frontmatter > .claude/skills/ud-cli/SKILL.md

# Custom skill name
ud prompt --frontmatter --name my-tasks > .claude/skills/my-tasks/SKILL.md

# Append to existing instructions
ud prompt >> .cursor/instructions.md
```

:::tip Self-Updating
The prompt is generated from the CLI binary itself, so it always matches your installed version. When you update the CLI, regenerate the skill file to get the latest commands:

```bash
ud prompt --frontmatter > .claude/skills/ud-cli/SKILL.md
```
:::

## What the Prompt Teaches

The generated prompt includes instructions for:

### Task Management
- Creating tasks with `ud apply` (kubectl-style)
- Viewing and querying tasks
- Marking tasks as done
- Creating subtasks with links

### Progress Tracking
- Adding notes to record implementation progress
- Including commit hashes for traceability
- Documenting decisions and blockers
- Session-based task tracking (remembering task IDs)

### File Operations
- Uploading files with `ud upload resource`
- Attaching files to tasks
- Downloading resources via presigned URLs
- Parsing `resource://` URIs from task descriptions

### Entity Lookup
- Retrieving any entity by UUID with `ud entity get`
- Auto-detecting entity types (task, budget, expense, file)
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
        [runs: ud task note add abc-123 "Implemented JWT auth middleware.
         Commit: def456"]
        "Done. I've added auth middleware and recorded progress.
         Should I mark this task as done?"

You:    "Yes, and attach the architecture diagram"
AI:     [runs: ud task done abc-123]
        [runs: ud upload resource ./auth-flow.png -t todolist -e abc-123]
        "Task completed and diagram attached."
```

## Best Practices

### Per-Project vs Global Setup

**Per-project** (recommended): Place the skill file in your project's `.claude/skills/` directory. This way the AI agent only uses the CLI when working in that project.

```bash
cd your-project
mkdir -p .claude/skills/ud-cli
ud prompt --frontmatter > .claude/skills/ud-cli/SKILL.md
```

**Global**: Place it in your home directory for all projects.

```bash
mkdir -p ~/.claude/skills/ud-cli
ud prompt --frontmatter > ~/.claude/skills/ud-cli/SKILL.md
```

### Version Control

You can commit the skill file to your repository so team members automatically get AI integration:

```bash
git add .claude/skills/ud-cli/SKILL.md
git commit -m "Add ud CLI skill for AI assistants"
```

### Multi-Context Setup

If you use multiple ud contexts (personal/work), the AI agent uses whichever context is currently active:

```bash
# Set work context before AI session
ud config use-context work

# The AI agent will now operate on your work tasks
```

## Supported AI Assistants

| Assistant | Setup Method |
|-----------|-------------|
| Claude Code | `ud prompt --frontmatter > .claude/skills/ud-cli/SKILL.md` |
| Cursor | `ud prompt > .cursorrules` |
| GitHub Copilot | `ud prompt > .github/copilot-instructions.md` |
| Other | Copy `ud prompt` output into your AI's instruction file |

## Troubleshooting

### AI Not Using the CLI

**Problem:** AI doesn't use ud commands even with the skill file present.

**Solutions:**
1. Verify the skill file exists: `cat .claude/skills/ud-cli/SKILL.md`
2. Ensure you're logged in: `ud config current-context`
3. Regenerate the skill file: `ud prompt --frontmatter > .claude/skills/ud-cli/SKILL.md`

### AI Using Wrong Context

**Problem:** AI operates on the wrong account/server.

**Solution:** Switch context before starting the AI session:
```bash
ud config use-context <correct-context>
```

### Outdated Skill File

**Problem:** AI doesn't know about new commands (e.g., `upload resource`).

**Solution:** Regenerate after CLI updates:
```bash
ud prompt --frontmatter > .claude/skills/ud-cli/SKILL.md
```
