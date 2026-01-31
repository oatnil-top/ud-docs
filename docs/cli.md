---
title: CLI Reference
description: Complete command reference for the UnderControl CLI tool
sidebar_position: 4
---

# CLI Reference

The UnderControl CLI (`ud`) is a command-line tool for managing tasks from the terminal. It supports both direct commands and an interactive TUI mode with vim-style keybindings.

## Installation

### Download

Download the appropriate version for your platform:

| Platform | Filename |
|----------|----------|
| macOS (Apple Silicon) | `ud_x.x.x_darwin_arm64.tar.gz` |
| macOS (Intel) | `ud_x.x.x_darwin_amd64.tar.gz` |
| Linux (x64) | `ud_x.x.x_linux_amd64.tar.gz` |
| Linux (ARM64) | `ud_x.x.x_linux_arm64.tar.gz` |
| Windows | `ud_x.x.x_windows_amd64.zip` |

### Install

**macOS / Linux:**

```bash
# Extract
tar -xzf ud_x.x.x_darwin_arm64.tar.gz

# Move to PATH
sudo mv ud /usr/local/bin/ud

# Verify
ud --version
```

**Windows:**

1. Extract the `.zip` file
2. Move `ud.exe` to a directory in your PATH
3. Or add the extracted directory to your system PATH

---

## Authentication

### Login

```bash
ud login
```

You'll be prompted for:
- **Server URL**: Your UnderControl server (e.g., `https://api.undercontrol.app`)
- **Username**: Your account email
- **Password**: Your account password

Credentials are saved to `~/.config/ud/config.yaml`.

### Multi-Context Support

The CLI supports kubectl-style contexts for managing multiple accounts. See [CLI Multi-Context Authentication](./cli-auth-context) for details.

```bash
# List contexts
ud config get-contexts

# Switch context
ud config use-context work

# Login to specific context
ud login --context work --api-url https://ud.company.com
```

---

## Task Commands

### List Tasks

```bash
ud task list [--status <status>]
```

**Options:**
- `--status`: Filter by status (`todo`, `in-progress`, `pending`, `stale`, `done`, `archived`)

**Examples:**
```bash
# List all tasks
ud task list

# List only todo tasks
ud task list --status todo

# List in-progress tasks
ud task list --status in-progress
```

### Create Task

```bash
ud task create <title> [flags]
ud task create -f <file>
```

**Flags:**
- `-d, --description`: Task description
- `-s, --status`: Initial status (default: `todo`)
- `-f, --file`: Create from file (first line = title, rest = description)

**Examples:**
```bash
# Simple task
ud task create "Fix login bug"

# With description
ud task create "Refactor API" -d "Update to v2 endpoints"

# With initial status
ud task create "Review PR" -s in-progress

# From file
ud task create -f requirements.md
```

**File format for `-f`:**
```markdown
Task title goes here
The rest of the file
becomes the description.
```

### View Task

```bash
ud task view <id>
```

Displays task details including title, description, status, tags, deadline, and timestamps.

:::tip Short ID Support
All commands that accept a task ID support **prefix matching**. You can use the 8-character short IDs shown in `task list` output, or even shorter prefixes as long as they're unique.

```bash
ud task view 3de9f82b    # Full short ID from list
ud task view 3de         # Shorter prefix (if unique)
ud task view 3de9f82b-fc49-4e84-b288-9ae3174f69ae  # Full UUID also works
```

If a prefix matches multiple tasks, you'll see an error listing the matches:
```
Error: ambiguous ID prefix '3' matches 2 tasks:
  3de9f82b (Task title one)
  3fbf7c24 (Task title two)
Please use a longer prefix
```
:::

### Mark Task Done

```bash
ud task done <id>
```

Shortcut to set task status to `done`.

### Edit Task

```bash
ud task edit <id>
```

Opens the task in your `$EDITOR` (defaults to `vi`). The file format is:
- First line: title
- Blank line
- Rest: description

### Apply Changes from File

```bash
ud task apply -f <file> <id>
ud task apply -f - <id>  # Read from stdin
```

Updates a task using a Markdown file with YAML frontmatter. Only specified fields are updated.

**Flags:**
- `-f, --file`: Markdown file with frontmatter (required, use `-` for stdin)

**File format:**
```markdown
---
title: Updated Task Title
status: in-progress
tags:
  - work
  - urgent
deadline: 2025-03-15
---

Task description content here.
Multi-line supported.
```

**Supported fields:**
| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Task title |
| `status` | string | Task status |
| `tags` | array | List of tags |
| `deadline` | string | Deadline date (YYYY-MM-DD or ISO 8601) |
| (body) | string | Becomes the description |

**Valid status values:**
- `todo` - Not started
- `in-progress` - Currently working on
- `pending` - Waiting for something
- `stale` - Inactive/stagnant
- `done` - Completed
- `archived` - Archived

**Examples:**
```bash
# Update from file
ud task apply -f task.md abc123

# Update from stdin
cat task.md | ud task apply -f - abc123

# Pipe from echo
echo '---
title: Quick Update
status: done
---' | ud task apply -f - abc123
```

**Deadline formats:**
```yaml
# Date only (midnight UTC)
deadline: 2025-03-15
deadline: 2025/03/15

# With time
deadline: 2025-03-15T14:30:00
deadline: 2025-03-15T14:30:00Z
deadline: 2025-03-15T14:30:00+08:00
```

### Delete Task

```bash
ud task delete <id>
ud task rm <id>  # Alias
```

### Query Tasks

```bash
ud task query "<query>" [flags]
```

Query tasks using SQL-like syntax.

**Flags:**
- `--page`: Page number (default: 1)
- `--limit`: Items per page (default: 50)
- `--sort`: Sort field (`title`, `deadline`, `created_at`, `updated_at`)
- `--order`: Sort direction (`asc`, `desc`)

**Examples:**
```bash
# Find todo tasks
ud task query "status = 'todo'"

# Search by title
ud task query "title ILIKE '%api%'"

# Find tasks due this week
ud task query "deadline BETWEEN 'today' AND '+7d'"

# Find tagged tasks
ud task query "tags = 'urgent'"

# Complex query
ud task query "(status = 'todo' OR status = 'in-progress') AND deadline <= 'today'"
```

### Natural Language Query

```bash
ud task nlquery "<natural language>"
ud task nl "<natural language>"  # Alias
```

Query tasks using natural language, which is translated to structured queries by AI.

**Examples:**
```bash
ud task nlquery "show me overdue tasks"
ud task nlquery "tasks tagged with work that are not done"
ud task nlquery "find tasks with report in the title"
ud task nlquery "tasks created in the last week"
```

---

## Note Commands

Notes allow you to add comments, progress updates, and context to tasks. They're useful for tracking work history and AI agent collaboration.

### Add Note

```bash
ud task note add <task-id> "<content>"
ud task note add <task-id> -f <file>
echo "content" | ud task note add <task-id> -
```

**Flags:**
- `-f, --file`: Read note content from file

**Examples:**
```bash
# Add inline note
ud task note add abc123 "Started implementation"

# Add progress update
ud task note add abc123 "✓ Auth middleware done"

# From file
ud task note add abc123 -f progress.md

# From stdin
echo "Completed review" | ud task note add abc123 -
```

### List Notes

```bash
ud task note list <task-id>
ud task note ls <task-id>  # Alias
```

**Output format:**
```
[4223db11] 2025-01-31 11:08
✓ Auth middleware done
---
[3150c5ce] 2025-01-31 10:45
Started implementation
```

### Delete Note

```bash
ud task note delete <task-id> <note-id>
ud task note rm <task-id> <note-id>  # Alias
```

**Example:**
```bash
ud task note delete abc123 4223db11
```

### AI Agent Workflow

Notes enable seamless collaboration between humans and AI agents:

```bash
# AI creates task from plan
ud task create -f plan.md
# Created task: abc12345

# Human reviews in UI, adds context via notes

# AI fetches task and logs progress
ud task view abc123
ud task note add abc123 "✓ Completed step 1: Database schema"
ud task note add abc123 "✓ Completed step 2: API endpoints"
ud task note add abc123 "⚠️ Blocked: Need API key for external service"

# Human sees progress, unblocks AI

# AI continues and completes
ud task note add abc123 "✓ All steps completed"
ud task done abc123
```

---

## TUI Mode

Run `ud` without arguments to enter the interactive terminal UI.

### List View Keybindings

| Key | Action |
|-----|--------|
| `j` / `k` | Move down/up |
| `gg` | Jump to top |
| `G` | Jump to bottom |
| `Enter` | View task details |
| `i` | Create new task |
| `e` | Edit task (uses $EDITOR) |
| `x` | Toggle task status |
| `dd` | Delete task |
| `/` | Search |
| `n` / `N` | Next/previous search result |
| `r` | Refresh list |
| `f` | Open file picker |
| `q` | Quit |
| `?` | Show help |

### Detail View Keybindings

| Key | Action |
|-----|--------|
| `j` / `k` | Scroll content |
| `x` | Toggle task status |
| `e` | Edit task |
| `dd` | Delete task |
| `Esc` / `q` | Return to list |

### File Picker

Press `f` in list view to open an fzf-like file picker:
- Fuzzy search files in current directory
- Select file to create task
- First line = title, rest = description
- Binary files are skipped

---

## Configuration Commands

### View Configuration

```bash
ud config view
```

Shows the full configuration with tokens partially masked.

### List Contexts

```bash
ud config get-contexts
```

### Switch Context

```bash
ud config use-context <name>
```

### Show Current Context

```bash
ud config current-context
```

### Create/Update Context

```bash
ud config set-context <name> [flags]
```

**Flags:**
- `--api-url`: API server URL
- `--api-key`: API key (for CI/CD)

### Delete Context

```bash
ud config delete-context <name>
```

### Rename Context

```bash
ud config rename-context <old-name> <new-name>
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `UD_CONTEXT` | Override current context |
| `UD_API_URL` | Override API URL |
| `UD_API_KEY` | Override API key |
| `UD_TOKEN` | Override auth token |
| `EDITOR` | Editor for `task edit` command |

**Examples:**
```bash
# Use different context for one command
UD_CONTEXT=staging ud task list

# Override API URL
UD_API_URL=http://localhost:4000 ud task list

# Set editor
export EDITOR=vim
```

---

## Common Workflows

### AI Agent Integration

Create `.claude/instructions.md` or `.cursorrules` in your project:

```markdown
# Task Management

Use UnderControl CLI to manage project tasks:

- View tasks: `ud task list`
- Create task: `ud task create "title" -d "description"`
- Complete task: `ud task done <id>`
- Update task: `ud task apply -f task.md <id>`

Before implementing features, check related tasks for context.
```

### Batch Updates with Apply

Create a template file and apply to multiple tasks:

```bash
# Create status update template
cat > done.md << 'EOF'
---
status: done
---
EOF

# Apply to multiple tasks
for id in abc123 def456 ghi789; do
  ud task apply -f done.md $id
done
```

### Export and Edit Workflow

```bash
# View task, copy content
ud task view abc123

# Create markdown file with updates
cat > update.md << 'EOF'
---
title: Updated Title
status: in-progress
tags:
  - reviewed
  - approved
---

Updated description with new requirements.
EOF

# Apply changes
ud task apply -f update.md abc123
```

---

## Troubleshooting

### Login Failed

**Problem:** `API error: Invalid credentials`

**Solutions:**
1. Verify username and password
2. Check server URL is correct
3. Try logging in via web to verify account

### Connection Timeout

**Problem:** `connection timeout`

**Solutions:**
1. Check network connection
2. Verify server URL is accessible
3. Check firewall settings

### Token Expired

**Problem:** `API error: Token expired`

**Solution:** Run `ud login` to re-authenticate.

### Editor Not Working

**Problem:** `task edit` has no effect

**Solution:** Set the `EDITOR` environment variable:
```bash
export EDITOR=vim  # or nano, code, etc.
```

### Invalid Status Error

**Problem:** `API error: An unexpected error occurred` when using `apply`

**Solution:** Ensure status is one of: `todo`, `in-progress`, `pending`, `stale`, `done`, `archived`

### Context Not Found

**Problem:** `context "work" not found`

**Solution:** Create the context first:
```bash
ud config set-context work --api-url https://ud.company.com
ud login --context work
```
