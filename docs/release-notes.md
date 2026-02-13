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

## v0.29.0 (2026-02-13)

### New Features

#### Budget Projection Ledger

View projected budget balance over time with the new projection ledger.

#### Budget Breakdown Timeline

A new timeline view showing budget plans and one-time adjustments:

- Add plans and adjustments directly from the breakdown timeline
- Sidebar shows related expenses for a complete budget overview

#### Quick Navigation Links

- Navigate directly from an expense to its linked account
- Navigate directly from an expense to its linked budget
- Add expenses directly from the budget detail page

### Improvements

- Account link icon now always visible when an account is set on an expense
- Currency field shown (read-only) when creating a budget for clarity

### Bug Fixes

- Fixed budget dialogs using hardcoded CNY instead of the budget's own currency
- Fixed date format issues in plan and adjustment dialogs
- Fixed timeline alignment issues
- Fixed redundant top bar in editor source mode
- Fixed default theme in preference subscription

---

## v0.28.5 (2026-02-13)

### New Features

#### AI Translation

Select any text and translate it using AI directly from the bubble menu.

#### Enhanced AI Bubble Menu

- Added "Ask AI" button for quick AI assistance when editing
- Added copy button to easily copy AI-generated results
- Visual checkmark feedback after copying

### Bug Fixes

- Fixed crashes that could occur when using AI text refinement
- Fixed AI chat input auto-resize behavior

---

## v0.28.4 (2026-02-12)

Build failed - superseded by v0.28.5.

---

## v0.28.3 (2026-02-12)

### Bug Fixes

- Fixed AI chat causing excessive network requests when tasks were selected as context

---

## v0.28.2 (2026-02-12)

### Improvements

- AI chat now sends task notes as context to the AI provider, enabling more informed responses

### Bug Fixes

- Fixed floating action buttons appearing on budget detail page
- Fixed kanban task preview modal showing stale data

---

## v0.28.1 (2026-02-12)

### New Features

#### Queue Tasks Page

A new page for viewing and monitoring background queue tasks. Retry failed tasks with one click.

### Bug Fixes

- Fixed empty state display in the queue page

---

## v0.28.0 (2026-02-11)

### New Features

#### UDQ Inline Task Query Blocks

Embed dynamic task queries directly in Markdown documents. Use `udq` code blocks to query tasks by status, priority, tags, and more — results render live inline.

#### Discord Community

Added a Discord invite link to the contact page for easy access to the community.

### Bug Fixes

- Fixed sidebar overlapping fullscreen editors (DrawIO diagrams, Mind Maps)
- Fixed duplicate API key label on profile page
- Fixed profile page content not using full available width

---

## v0.27.2 (2026-02-10)

### New Features

#### CLI File Upload & Attachment

Upload files and attach resources to tasks directly from the terminal — no need to open the web app.

- `ud upload resource <file>` — Upload a file to your resource library
- `ud attach resource <resource-id> --entity-type <type> --entity-id <id>` — Attach a resource to a task or other entity
- Upload and attach in one step by specifying the target entity during upload

---

## v0.27.1 (2026-02-10)

### New Features

#### Dataflow AI Generation

Generate dataflow diagrams using AI directly in the diagram editor. Supports multiple AI providers — describe your data flow in natural language and get a diagram instantly.

### Improvements

- Sidebar auto-hides when editing diagrams for more workspace

---

## v0.27.0 (2026-02-10)

### New Features

#### Tag Management Page

A new dedicated page for browsing and managing your tags. The left panel shows all tags with usage counts, and the right panel displays tasks for the selected tag.

- Master-detail two-column layout for easy navigation
- Sort tags by most used, alphabetical, or recent
- Search to filter tags quickly
- View all tasks associated with a tag, with pagination
- Delete unused tags directly from the list

---

## v0.26.0 (2026-02-09)

### New Features

#### Tag Autocomplete

All tag inputs now show smart suggestions from your existing tags. Suggestions appear immediately when you focus the input — no typing required. The suggestion dropdown stays open when selecting multiple tags for faster batch tagging.

### Improvements

- Tags now display as `#tag` pill badges consistently across the app
- Tag names now support special characters

### Bug Fixes

- Fixed tag suggestions not refreshing after saving task tags

---

## v0.25.5 (2026-02-09)

### New Features

#### kubectl-style CLI Commands

The CLI now supports `get`, `describe`, `apply`, `delete` as top-level commands for managing tasks, making operations more intuitive.

### Improvements

- Saved query task rows can now be opened in a new tab
- In-app CLI documentation updated with kubectl-style command reference
- Query docs now link to full documentation site

---

## v0.25.4 (2026-02-08)

### New Features

#### Sidebar Advanced Search

Added advanced search entry point in the sidebar for quick navigation to the search page.

#### CLI Note Apply Command

New `ud task note apply` command to create or update task notes directly from the CLI.

### Improvements

- Admin pages (users, roles, groups) now use mobile-first card layouts for better browsing on mobile devices

### Bug Fixes

- Fixed command palette selecting extra items when pressing Ctrl/Cmd+Enter in link modal

---

## v0.25.3 (2026-02-08)

### New Features

#### Natural Language Search

Search your data using natural language queries in the advanced search page, no need to remember complex query syntax.

---

## v0.25.2 (2026-02-08)

### Improvements

- Query builder simple mode now supports all field types (text, number, date, boolean, select, etc.) with appropriate input controls for each type

### Bug Fixes

- Fixed CONTAINS_ALL query generating incorrect syntax in the query builder

---

## v0.25.0 (2026-02-07)

### New Features

#### Saved Queries

Save and reuse your frequently used task search queries for quick access. Expandable task rows let you view descriptions and notes inline without navigating to the detail page.

#### Sidebar Collapsible Sections

Navigation items are now organized into collapsible sections with clean divider labels, making the sidebar more organized and easier to navigate.

### Improvements

- Updated application icons

### Bug Fixes

- Fixed duplicate task creation when pressing Ctrl+Enter in Kanban view
- Fixed custom field support in saved query validation and autofill

---

## v0.24.0 (2026-02-06)

### New Features

#### Kanban Task Creation Matches Column Conditions

When creating a task from a specific column, the task automatically inherits the column's filter values. For example, creating a task in the "High Priority" column will automatically set it as high priority.

#### Custom Field Namespace System

Custom field names now support Unicode characters including Chinese, allowing you to name fields more naturally.

### Improvements

- Kanban column actions now support Chinese/English i18n
- System boards show an edit protection warning to prevent accidental modifications
- User-type enum fields supported in kanban column conditions

### Bug Fixes

- Fixed custom field metadata prefix handling in task detail panel
- Fixed shared boards not appearing in "Add to Board" modal
- Fixed user candidate prefetching and caching

---

## v0.23.0 (2026-02-05)

### New Features

#### Advanced Kanban Filtering and Querying

Kanban boards now support more powerful task filtering capabilities to help you find exactly what you need.

- String fields support fuzzy matching (LIKE, ILIKE) and null checks (IS NULL, IS NOT NULL)
- Number fields support full comparison operators (equals, greater than, less than, etc.)
- Enum fields support IN operator with multi-select for matching multiple values at once
- Added 8 new queryable fields: Status, Scheduled Date, Due Date, Started Time, Paused Time, Completed Time, Tag IDs, Priority

#### Custom Fields Improvements

- Custom field keys are now auto-generated, eliminating manual input
- Kanban cards now display task status
- Custom field dropdowns now show usernames instead of user IDs for better clarity

#### Command Palette Enhancement

Command palette now auto-detects and looks up entity UUIDs, making it easy to quickly locate tasks, budgets, and other resources.

#### User Experience Improvements

- Slash menu reordered: Task List moved to the top, Text formatting to the bottom, matching usage frequency
- Added Chinese translation support for Kanban interface

### Bug Fixes

- Fixed user field dropdown options not populating in Kanban
- Fixed custom fields not refreshing when task tags change
- Fixed Kanban query string parsing for comparison operators
- Fixed Kanban IN operator query formatting
- Fixed i18n translation key paths for field names
- Fixed field names not updating when language changes

### Improvements

- User dropdowns now refresh automatically when opened, ensuring up-to-date data
- Enhanced Chinese translations throughout Kanban interface

---

## v0.22.2 (2026-02-03)

### New Features

#### Trash & Recycle Bin

Tasks can now be safely deleted with the ability to restore them later.

- View deleted tasks in the new Trash page
- Restore accidentally deleted tasks with one click
- Kanban boards show a recycle bin widget in the sidebar

### Improvements

- Keyboard shortcuts now accessible via command palette

### Bug Fixes

- Fixed loading spinners appearing unnecessarily on kanban columns
- Fixed task deletion causing brief flicker in todo list
- Improved state handling when deleting tasks

---

## v0.22.1 (2026-02-03)

### New Features

#### Dashboard Quick Search

Added a command palette widget to the dashboard. Click to quickly search tasks, expenses, and commands without memorizing keyboard shortcuts.

#### Kanban Tag Filtering Enhancement

- Support "not contains" operator for filtering tasks without specific tags
- Clearer "contains/not contains" labels in condition configuration

#### CLI Improvements

- Require confirmation before marking tasks as done to prevent accidental completion

### Bug Fixes

- Fixed tag query consistency in Kanban boards
- Improved column configuration form layout
- Fixed issue where empty boards couldn't add columns

---

## v0.22.0 (2026-02-02)

### New Features

#### Kanban Card Transfer Actions

Cards can now automatically trigger preset actions when moving between columns:
- Support for column exit actions (exitAction)
- Smart break logic to prevent duplicate triggers
- Multiple actions are merged for efficient execution

#### ud-cli Task Linking Commands

New `link` and `unlink` commands to associate and disassociate tasks

### Improvements

- Personal tier users can now see dedicated feature entry points

### Bug Fixes

- Fixed kanban column actions not saving correctly in some cases
- Fixed default column action generation when creating boards

---

## v0.21.11 (2026-02-02)

### Improvements

#### Kanban Column Sort Order

Set sort order when creating kanban columns for more flexible task organization.

### Bug Fixes

- Fixed slash menu keyboard navigation scroll and Enter key issues in markdown editor

---

## v0.21.10 (2026-02-01)

### New Features

#### CLI Apply Command

New kubectl-style `apply` command for managing tasks using YAML files:

```bash
ud task apply -f task.yaml
```

#### Kanban Custom Field Sorting

Kanban now supports sorting by custom fields with intelligent direction labels based on field type.

### Bug Fixes

- Fix custom field sorting to properly handle null values
- Fix CLI status values to use correct format
- Fix private board updates to allow owners proper access
- Improve error messages for board permission issues

---

## v0.21.9 (2026-01-31)

### Improvements

#### Board Type Selection

When creating boards, you can now choose the board type (private or shared), giving you more flexibility in organizing tasks.

#### Simplified Private Boards

Private boards no longer create unnecessary groups, making personal task management cleaner and simpler.

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
