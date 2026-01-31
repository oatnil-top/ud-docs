---
title: Release Notes
description: Complete version history and changelog for UnderControl
sidebar_position: 1
---

# Release Notes

Complete version history and new features for UnderControl.

## Version Numbering

UnderControl follows **Semantic Versioning** (format: MAJOR.MINOR.PATCH), e.g., `v0.19.0`:

- **MAJOR version 0**: Indicates development version, API and features may change significantly
- **MINOR version** (e.g., 0.**19**.0): Incremented for new features, major improvements, or breaking changes
- **PATCH version** (e.g., 0.19.**0**): Incremented for bug fixes and backward-compatible improvements

---

## v0.21.8 (2026-01-31)

### New Features

#### CLI Task Notes

Add notes, progress updates, and comments to tasks via CLI for seamless human-AI collaboration.

```bash
# Add a progress note
ud task note add abc123 "✓ Auth module done"

# List all notes for a task
ud task note list abc123

# Delete a note
ud task note delete abc123 note-id
```

This enables workflows where AI agents can log progress while humans track and provide context.

---

## v0.21.7 (2026-01-31)

### New Features

#### Custom Field Sorting

Task lists now support sorting by custom fields, allowing you to organize tasks based on project-specific fields.

#### CLI Improvements

- **Short ID Matching**: Use task ID prefixes to quickly select tasks without typing the full ID
- **Batch Update Command**: New `task apply` command for file-based batch updates

```bash
# Use short IDs to operate on tasks
ud task get abc     # Matches tasks starting with "abc"

# Batch update tasks from file
ud task apply tasks.yaml
```

---

## v0.21.6 (2026-01-31)

### New Features

#### Natural Language Task Query

Query your tasks using natural language from the CLI:

```bash
ud nlquery "show me tasks due this week"
ud nlquery "what are my high priority tasks?"
```

---

## v0.21.5 (2026-01-31)

### New Features

#### CLI Multi-Account Support

Manage multiple accounts and API endpoints with kubectl-style commands:

- **Multi-context management**: Easily switch between personal and work accounts
- **Multi-server support**: Configure development, staging, and production servers
- **Environment variable overrides**: Support for CI/CD scenarios

Common commands:
- `ud config get-contexts` - List all configured contexts
- `ud config use-context work` - Switch to work account
- `ud login --context staging` - Login to a specific context

### Documentation

- Added comprehensive CLI multi-context authentication guide

---

## v0.21.1 (2026-01-30)

### Improvements

#### CLI Installation Experience

- **Version Check**: CLI now supports `ud --version` command to verify installation
- **One-liner Install**: Subscribe page CLI section now has a copyable one-liner install command

---

## v0.21.0 (2026-01-30)

### New Features

#### Command Line Interface (CLI)

A brand new terminal tool for managing tasks from the command line:

- **TUI Interactive Mode**: Run `ud` to enter a visual terminal interface
  - Vim-style keybindings (j/k to move, gg/G to jump, / to search, etc.)
  - Browse task list and detail views
  - Create, edit, and delete tasks directly

- **File Picker**: Press `f` to open an fzf-like fuzzy search
  - Select files from current directory to create tasks
  - First line becomes title, rest becomes description
  - Binary files are automatically skipped

- **One-shot Commands**: Perfect for scripts and automation
  - `ud task list` - List tasks
  - `ud task create "title"` - Create a task
  - `ud task done <id>` - Mark task as done

- **AI Agent Integration**: Let Claude Code, Cursor, and other AI tools access your tasks

#### CLI Downloads

- **New CLI Download Section**: Added to subscribe page with support for macOS, Linux, and Windows
- **Complete Documentation**: New CLI docs page with installation, configuration, and usage instructions

---

## v0.20.3 (2026-01-29)

### Improvements

#### Kanban List View Enhancements

- **Column Settings Edit**: Click the settings button next to column headers in list view to edit column filters and sort order
- **Create Kanban Guide**: When clicking settings on the "All Tasks" system board, a helpful dialog appears encouraging you to create your own custom kanban for more flexible configuration

---

## v0.20.2 (2026-01-29)

### New Features

#### Kanban List View

A new list view mode for kanban boards, offering a more flexible way to browse tasks:

- **List View Mode**: Switch to list view on kanban page to see tasks in table format
- **All Tasks Board**: New system-level "All Tasks" board for viewing all private tasks
- **Board Selector**: Quickly switch between boards from the list page header

#### Task Detail Page Improvements

- **Desktop Sticky Sidebar**: The task detail sidebar now stays fixed in the viewport while scrolling

### Improvements

- **Navigation Update**: Tasks menu now links directly to kanban list view
- **Segmented Control Redesign**: Sidebar header now uses segmented controls for more intuitive interaction
- **Column Sorting**: Kanban columns now support ORDER BY configuration
- **Search Preview**: Added search preview link in column edit dialog

### Bug Fixes

- **Task Detail Sidebar**: Fixed sticky sidebar positioning
- **Kanban Translations**: Fixed missing i18n translations
- **Expense Date Format**: Fixed date format when updating expenses
- **Custom Field Queries**: Fixed custom field handling in kanban queries

---

## v0.20.1 (2026-01-29)

### New Features

#### Smart Kanban Drag & Drop

When dragging a task to a new column, the system intelligently updates task properties to match the target column's conditions:

- **Automatic property updates**: Task fields are automatically set to match target column requirements
- **Smart cleanup**: Properties only relevant to the source column are automatically cleared
- **Tag handling**: Tags are intelligently added or removed, not overwritten

#### Multi-Column Task Display

- **Tasks can appear in multiple columns**: If a task matches the conditions of multiple columns, it will appear in all matching columns
- **Independent card operations**: Each card instance can be dragged independently

#### Custom Field Filtering for Kanban

- **Custom field support**: Column match conditions now support custom fields for filtering
- **Flexible condition combinations**: Combine status, tags, and custom fields to create precise task views

#### Kanban Documentation

- **New kanban documentation**: Added documentation link in the board info hover card for easy access to usage guide

### Improvements

- **Column settings dialog**: Click column title to open dialog for easier viewing and editing of column name and match conditions

---

## v0.20.0 (2026-01-28)

### New Features

#### Kanban Edit Mode

A new kanban layout editing feature for more flexible task view management:

- **Layout Edit Mode**: Click "Edit Layout" button to enter edit mode
  - Inline column name editing - double-click to modify
  - Edit board conditions and column filters directly
  - Use status dropdown for quick condition selection
  - Drag columns to reorder

- **Condition Editor**: Display current filter conditions next to board title
  - Edit raw query string directly
  - Click to navigate to search page and view matches

#### Mind Map Enhancements

- **Status Color Display**: Task nodes now show different colors based on status, instantly identify task progress

#### Task View Sorting

- **Per-Section Sorting**: Configure independent sort rules for each section
- **View Default Sorting**: Pre-set sort configuration when creating views

#### Command Palette Improvements

- **Keyboard Shortcut Hints**: Display shortcuts for task creation and selection
- **Clearer Shortcut Display**: Improved visual presentation of keyboard shortcuts

### Improvements

- **Kanban Performance**: Column reordering uses optimistic updates for smoother interactions
- **View Editing**: Root-level filters can now be edited (with warning)

### Bug Fixes

- **Mind Map Stability**: Fixed tooltip display issues
- **Kanban Status Selection**: Fixed status value matching issues

---

## v0.19.1 (2026-01-27)

### Documentation Improvements

- **AI Chat Clarification**: Clearer explanation of communication modes for different AI providers, helping you better understand how AI features work
- **Version Numbering Guide**: Added explanation of version numbers in release notes, so you understand what each version means
- **Migration Guide**: Added data migration instructions for v0.18.0, helping self-hosted users upgrade smoothly
- **AI Assistance Tips**: Added AI assistance tips to query syntax documentation
- **Quick Access to Updates**: "What's New" button now links directly to the full release notes page

---

## v0.19.0 (2026-01-27)

### New Features

#### Mind Map

Visualize and organize your tasks with mind maps!

- **Task Hierarchy Mind Map**: Click "Mind Map" button in task detail page to view tasks and subtasks as a mind map
  - Automatically generate mind map from task relationships
  - Click nodes to navigate to task details
  - Clearly visualize task hierarchy

- **Mind Map Editor**: Add mind maps as task attachments
  - Click "Add Mind Map" in task attachments section
  - Create nodes and connections freely
  - Drag nodes to rearrange
  - Double-click to edit node content
  - Export as image

---

## v0.18.0 (2025-01-24)

### New Features

#### Resource Management Enhancements

- **One-to-Many Resource Links**: A single file can now be linked to multiple tasks, budgets, or accounts
  - Example: Link one design file to multiple related tasks
  - View all linked items on resource detail page

- **Quick Upload**: New upload button in resources page header for easier file uploads

### Improvements

- **Accounts, Budgets, Expenses Pages**: Faster loading and smoother interactions
- **Attachment Management**: Fixed several issues with attachment deletion and display
- **UI Polish**: Simplified button styles for a cleaner interface

### Upgrade Notes (Self-Hosted Users)

If you're upgrading from a previous version to v0.18.0, you need to run the following migration script to migrate existing resource associations:

```sql
-- Migration script: Migrate resource associations to new link table
-- This migrates entity_type/entity_id data from resources table
-- to the new resource_entity_links many-to-many join table.
-- Run AFTER the new table has been created by GORM AutoMigrate.
-- Safe to run multiple times (uses INSERT OR IGNORE).

INSERT OR IGNORE INTO resource_entity_links (
    id,
    resource_id,
    entity_type,
    entity_id,
    created_at,
    created_by,
    updated_at,
    updated_by
)
SELECT
    lower(hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-4' ||
          substr(hex(randomblob(2)),2) || '-' ||
          substr('89ab',abs(random()) % 4 + 1, 1) ||
          substr(hex(randomblob(2)),2) || '-' || hex(randomblob(6))) as id,
    r.id as resource_id,
    r.entity_type,
    r.entity_id,
    COALESCE(r.created_at, datetime('now')) as created_at,
    r.owner_id as created_by,
    COALESCE(r.updated_at, datetime('now')) as updated_at,
    r.owner_id as updated_by
FROM resources r
WHERE r.entity_type IS NOT NULL
  AND r.entity_type != ''
  AND r.entity_id IS NOT NULL
  AND r.entity_id != ''
  AND NOT EXISTS (
    SELECT 1 FROM resource_entity_links rel
    WHERE rel.resource_id = r.id
      AND rel.entity_type = r.entity_type
      AND rel.entity_id = r.entity_id
  );
```

**How to run**:
1. Connect to your database file using an SQLite client
2. Execute the above SQL script
3. Restart the application

---

## Previous Versions

For earlier version history, please refer to the project's Git commit log.
