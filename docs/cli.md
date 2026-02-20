---
title: CLI Reference
description: Complete command reference for the UnderControl CLI tool
sidebar_position: 4
---

# CLI Reference

The UnderControl CLI (`ud`) is a command-line tool for managing tasks from the terminal. It supports both direct commands and an interactive TUI mode with vim-style keybindings.

## Installation

### npm (Recommended)

```bash
# Global install
npm install -g @oatnil/ud

# Or run directly without installing
npx @oatnil/ud --help
```

### Homebrew (macOS/Linux)

```bash
brew tap oatnil-top/ud
brew install ud
```

### Install Script

```bash
curl -fsSL https://get.oatnil.com/ud | bash
```

### Manual Download

Download the appropriate version for your platform:

| Platform | Filename |
|----------|----------|
| macOS (Apple Silicon) | `ud_x.x.x_darwin_arm64.tar.gz` |
| macOS (Intel) | `ud_x.x.x_darwin_amd64.tar.gz` |
| Linux (x64) | `ud_x.x.x_linux_amd64.tar.gz` |
| Linux (ARM64) | `ud_x.x.x_linux_arm64.tar.gz` |
| Windows | `ud_x.x.x_windows_amd64.zip` |

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

## Resource Commands (kubectl-style)

The CLI supports kubectl-style top-level verbs for managing resources. These are the **recommended** way to interact with resources.

### Get Resources

```bash
ud get task [id] [--status <status>]
```

Display one or many tasks in a table format.

**Options:**
- `--status`: Filter by status (`todo`, `in-progress`, `pending`, `stale`, `done`, `archived`)

**Examples:**
```bash
# List all tasks
ud get task

# List only todo tasks
ud get task --status todo

# Show a single task in table format
ud get task abc123
```

### Describe Resource

```bash
ud describe task <id>
```

Show detailed information about a specific task, including title, description, status, tags, deadline, timestamps, linked tasks, attachments, and notes.

**Examples:**
```bash
# View full task details
ud describe task abc123

# Using short prefix
ud describe task 3de
```

:::tip Short ID Support
All commands that accept a task ID support **prefix matching**. You can use the 8-character short IDs shown in `get task` output, or even shorter prefixes as long as they're unique.

```bash
ud describe task 3de9f82b    # Full short ID from list
ud describe task 3de         # Shorter prefix (if unique)
ud describe task 3de9f82b-fc49-4e84-b288-9ae3174f69ae  # Full UUID also works
```

If a prefix matches multiple tasks, you'll see an error listing the matches:
```
Error: ambiguous ID prefix '3' matches 2 tasks:
  3de9f82b (Task title one)
  3fbf7c24 (Task title two)
Please use a longer prefix
```
:::

### Apply Resource from File

```bash
ud apply -f <file>
ud apply -f -  # Read from stdin
```

Create or update a resource from a Markdown file with YAML frontmatter. The file is the single source of truth:
- If `id` is present in frontmatter → **update** the existing task
- If no `id` → **create** a new task

Currently supports `.md` files. YAML support is planned for future releases.

**Flags:**
- `-f, --file`: File to apply (required, use `-` for stdin)

**File format:**
```markdown
---
id: abc123          # optional - if present, updates existing task
title: Task Title
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
| `id` | string | Task ID (optional — present = update, absent = create) |
| `title` | string | Task title (required for new tasks) |
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
# Create a new task (no id in file)
ud apply -f task.md

# Update an existing task (id in file)
ud apply -f task.md

# From stdin
cat task.md | ud apply -f -

# Quick create from stdin
echo '---
title: New Task
status: todo
---
Description here.' | ud apply -f -
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

### Delete Resource

```bash
ud delete task <id>
```

Delete a task by ID.

**Examples:**
```bash
ud delete task abc123
ud delete task 3de9f82b
```

---

## Task Commands

:::caution Deprecated Commands
The following `ud task` subcommands are **deprecated** and will be removed in a future release. They still work but print a deprecation warning. Use the kubectl-style commands instead:

| Deprecated | Use instead |
|------------|-------------|
| `ud task list` | `ud get task` |
| `ud task view <id>` | `ud describe task <id>` |
| `ud task apply -f <file>` | `ud apply -f <file>` |
| `ud task delete <id>` | `ud delete task <id>` |
:::

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

## File Upload & Attachment Commands

Upload files as resources and optionally attach them to entities like tasks or expenses. Files are uploaded via presigned URLs directly to cloud storage.

### Upload a File

```bash
ud upload resource <file-path> [flags]
```

Upload a file as a resource. Optionally attach it to an entity in a single step.

**Flags:**
- `-t, --entity-type`: Entity type to attach to (e.g., `todolist`, `expense`)
- `-e, --entity-id`: Entity ID to attach to (supports prefix matching for tasks)

**Examples:**
```bash
# Upload a standalone file
ud upload resource ./receipt.png

# Upload and attach to a task
ud upload resource ./design.pdf --entity-type todolist --entity-id abc123

# Short flags
ud upload resource ./photo.jpg -t todolist -e abc123

# Upload a document to a task (partial ID)
ud upload resource ./notes.txt -t todolist -e 3de
```

**Output:**
```
Uploading ./receipt.png...
Uploaded: receipt.png
  ID:   2a2e542e-0711-4e7f-aafb-09a432e71860
  Type: image
  Size: 102.4 KB
  MIME: image/png
```

:::tip MIME Type Detection
The CLI automatically detects MIME types from file extensions. Common mappings:
- Images: `.png`, `.jpg`, `.gif`, `.webp`, `.svg` → `image`
- Documents: `.pdf`, `.doc`, `.docx`, `.txt`, `.csv` → `document`
- Diagrams: `.drawio`, `.drawio.png` → `diagram`
- Other: all other extensions → `other`
:::

### Attach Existing Resource

```bash
ud attach resource <resource-id> --entity-type <type> --entity-id <id>
```

Link an already-uploaded resource to an entity. Both `--entity-type` and `--entity-id` are required.

**Flags:**
- `-t, --entity-type`: Entity type (required)
- `-e, --entity-id`: Entity ID (required, supports prefix matching for tasks)

**Supported entity types:**
| Entity Type | Description |
|-------------|-------------|
| `todolist` | Tasks |
| `expense` | Expenses |
| `budget` | Budgets |
| `account` | Accounts |

**Examples:**
```bash
# Attach resource to a task
ud attach resource 2a2e542e-0711-4e7f-aafb-09a432e71860 -t todolist -e abc123

# Attach to an expense
ud attach resource 2a2e542e -t expense -e def456
```

### Download a Resource

To download a resource, use `ud entity get` to retrieve the presigned download URL, then download with `curl`:

```bash
# Get resource details (includes presigned download URL)
ud entity get 2a2e542e-0711-4e7f-aafb-09a432e71860

# Download using the presigned URL from the response
curl -o receipt.png "https://storage.example.com/...?signature=..."
```

### Upload Workflow Example

A typical workflow for attaching files to tasks:

```bash
# 1. Find the task
ud get task --status in-progress

# 2. Upload and attach a file
ud upload resource ./screenshot.png -t todolist -e 3de9f82b

# 3. Verify the attachment
ud describe task 3de9f82b
# Shows: [2a2e542e] screenshot.png (image/png, 102.4 KB)

# 4. Later, download the file
ud entity get 2a2e542e
# Copy the presignedUrl from the output
curl -o screenshot.png "<presigned-url>"
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

- List tasks: `ud get task`
- View task details: `ud describe task <id>`
- Create task: `ud task create "title" -d "description"`
- Complete task: `ud task done <id>`
- Update task: `ud apply -f task.md`
- Delete task: `ud delete task <id>`

Before implementing features, check related tasks for context.
```

### Batch Updates with Apply

Create a template file and apply to multiple tasks:

```bash
# Create status update template for each task
for id in abc123 def456 ghi789; do
  echo "---
id: $id
status: done
---" | ud apply -f -
done
```

### Export and Edit Workflow

```bash
# View task, copy content
ud describe task abc123

# Create markdown file with updates (include id for update)
cat > update.md << 'EOF'
---
id: abc123
title: Updated Title
status: in-progress
tags:
  - reviewed
  - approved
---

Updated description with new requirements.
EOF

# Apply changes
ud apply -f update.md
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
