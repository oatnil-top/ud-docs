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

## v0.58.0 (2026-03-27)

### New Features

- Dataflow canvas box selection — drag to select multiple nodes at once
- Merge/append import for dataflow diagrams — import without replacing existing work
- Topological layout for imported nodes — auto-arranged for readability
- Accept simplified AI format for dataflow graph import
- Warning shown on failed dataflow graph import
- Improved AI prompt for dataflow diagram generation
- Migrate-from-personal flag for self-hosted Pro/Max tier migration

### Improvements

- Zoom out further in dataflow canvas

### Bug Fixes

- Fixed advanced search not triggering initial search on page load
- Fixed onboarding dialog unmounting early, leaving empty task list
- Fixed terminal not auto-focusing when workspace window gains focus

---

## v0.57.0 (2026-03-26)

### New Features

- Dataflow multi-field selection — Ctrl+Click to select multiple fields with 7-color highlight palette

### Bug Fixes

- Fixed task attachments not syncing properly with resource store
- Fixed long task titles overflowing in links section

### Improvements

- Thin scrollbar applied globally for a cleaner interface

---

## v0.56.0 (2026-03-25)

### New Features

- Kanban cards show assignee avatars with assignee filter in toolbar
- Scheduled database backups with configurable backup owner
- Delete action in scheduled jobs dropdown menu
- Refresh button on resources page
- "Run Ad-hoc" moved to first position in workspace menu

### Bug Fixes

- Fixed onboarding dialog blocking existing users, now dismissible via click-outside or Escape
- Fixed cross-origin file downloads
- Fixed refresh button not resetting resource cache
- Fixed audit column migration table names and field widths
- Hidden backup UI when using PostgreSQL

---

## v0.55.1 (2026-03-24)

### New Features

- Task Assignee — assign team members to tasks directly from the task properties panel
- Audit channel tracking for better change history visibility

### Bug Fixes

- Fixed dialog overflow when displaying long content
- Fixed edit column dialog layout overflow with long conditions

---

## v0.55.0 (2026-03-24)

### New Features

- Gantt chart view for task scheduling — visualize tasks on a timeline with start and end dates
- Drag-to-resize Gantt chart bars to adjust task dates directly
- Kickoff (start date) field for tasks, enabling calendar and Gantt planning
- Updated list view icon, gallery view now supports selection

### Bug Fixes

- Fixed metadata not flowing through account/budget/expense creation
- Fixed kanban board filter being dropped when column has ORDER BY

---

## v0.54.2 (2026-03-23)

### New Features

- Batch select, delete, and move files to folders in File Storage view
- Command palette tasks now sorted by most recently updated

### Bug Fixes

- Fixed H4 and H5 heading styles missing in rich text editor
- Fixed timeline status segment being clipped when too narrow

---

## v0.54.1 (2026-03-23)

### New Features

- Edit drawio, dataflow, and text resources directly from the detail page

### Bug Fixes

- Fixed command palette text overflow in title and preview content
- Fixed workspace working directory resolution from task/board metadata in TUI

---

## v0.54.0 (2026-03-23)

### New Features

- Storage class management — Admin UI for creating, editing, deleting, and testing storage classes with backup replication, user/group/system assignment hierarchy, and resolution overview
- Fullscreen mode for Kanban board
- Heading H4 & H5 support and clear formatting in markdown/bubble menu editor

### Improvements

- CLI migration: unified metadata-based idempotent incremental migration for all entity types

### Bug Fixes

- Fixed storage class edit modal overwriting secrets with masked values

---

## v0.53.4 (2026-03-21)

### New Features

- Referral hint in workspace limit dialog — invite friends to unlock more workspaces
- Platform hints integrated into download dialog popup
- Growth trend line charts on admin dashboard

### Improvements

- Code blocks now scroll horizontally within their container
- Dialogs are scrollable on small viewports with tighter spacing
- Workspace limit description updated to mention feedback unlocks

### Bug Fixes

- Fixed ISO date format handling in growth chart X-axis labels
- Fixed dialog content overflow on small screens

---

## v0.53.3 (2026-03-20)

### Improvements

- Added a dedicated "preview in new window" button for opening detail pages in a separate window

### Bug Fixes

- Fixed detail page to always open in a new window instead of navigating away from the current view

---

## v0.53.2 (2026-03-20)

### New Features

- Resource preview: open previewed files in a new window for side-by-side viewing
- Markdown editor: translate selected text directly from the bubble menu
- Download dialog: added referral hint with profile link and Discord community link

### Bug Fixes

- Fixed Ctrl+Q keyboard shortcut not working correctly

---

## v0.53.1 (2026-03-20)

### Bug Fixes

- Fixed desktop app startup crash caused by SQLite database migration error

---

## v0.53.0 (2026-03-19)

### New Features

- Keyboard shortcuts reference section on profile page
- Workspace switcher command palette (Ctrl+Q)
- Fold/unfold all and refresh shortcuts in CLI board view

### Bug Fixes

- Fixed drawio files losing original format when saving
- Fixed Electron app singleton lock not cleaning up properly on startup
- Fixed duplicate case handling in column condition builder
- Adjusted table of contents breakpoint for better viewport compatibility
- Fixed database migration failure for pre-existing databases missing workspace_sessions table

---

## v0.52.0 (2026-03-19)

### New Features

- Configurable query widgets on dashboard with settings icon
- Customize widget size and display order
- Widget configurations are persisted server-side via preferences

### Improvements

- Query string always shown in dimmed style for better readability

### Bug Fixes

- Fixed missing group_id columns in accounts table
- Fixed dashboard store persistence merge strategy
- Fixed incorrect SQL-like query syntax format

---

## v0.51.4 (2026-03-19)

### Improvements

- Refined referral reward card with updated description
- Improved invite code section to show referral benefits

---

## v0.51.3 (2026-03-19)

### New Features

- Added invite code display and referral reward card to the profile page for easy access and copying

---

## v0.51.2 (2026-03-18)

### New Features

- Added referral reward system — earn rewards by sharing invite codes for desktop app downloads
- New download dialog with Discord community join prompt and invite code entry

---

## v0.51.1 (2026-03-18)

### Improvements

- Added Configure link to the Implementation Tool dropdown for quick access to AI provider settings

### Bug Fixes

- Fixed entity links not working in Safari browser
- Fixed kanban board not filtering by default tags in CLI TUI view
- Fixed missing translation keys for kanban prompt and hooks settings

---

## v0.51.0 (2026-03-18)

### New Features

- Redesigned Add to Board panel — shows all boards with type labels and ownership info, private boards shown as read-only, sharing warning when adding to shared boards
- Kanban AI prompt setting — configure AI prompts when creating boards
- Email and linked identity providers now displayed on profile page

### Improvements

- Board removal confirmation now shows group name and tags list
- Removal confirmation shown for all boards, not just shared ones
- Refresh buttons now show spin animation for visual feedback

### Bug Fixes

- Fixed profile page crash
- Improved Chinese translations for more natural phrasing

---

## v0.50.1 (2026-03-17)

### Improvements

- Internal maintenance and stability improvements

---

## v0.50.0 (2026-03-17)

### Improvements

- Enhanced permission auditing — bulk permission changes now correctly track who made them and emit audit events

### Bug Fixes

- Fixed bulk permission updates not tracking the updater and not emitting audit events

---

## v0.49.6 (2026-03-17)

### Improvements

- Simplified board filtering — boards now use default tags instead of raw query syntax

### Bug Fixes

- Fixed various UI glitches in board settings panel (scrollbar, borders, focus rings)

---

## v0.49.5 (2026-03-17)

### New Features

- Board query scoping — Kanban boards can now filter tasks using a board-level query, with a scope indicator badge showing when filtering is active

### Bug Fixes

- Fixed break reminder timer resetting when navigating between pages

---

## v0.49.4 (2026-03-16)

### New Features

- Added OpenCode as a built-in AI agent option
- Workspace window limit dialog now shows a thank-you message

### Bug Fixes

- Fixed workspace close events being lost during app shutdown
- Fixed Safari navigating to custom protocol URLs in markdown links

---

## v0.49.3 (2026-03-16)

### Bug Fixes

- Fixed ugly scrollbar and layout shift in Gantt charts
- Fixed Linux binary execute permissions in CI pipeline

---

## v0.49.2 (2026-03-16)

### Bug Fixes

- Fixed monthly chart click navigation not working after recharts upgrade

---

## v0.49.1 (2026-03-16)

### New Features

- Daily spending chart — new per-day summary chart on the transactions page

### Improvements

- Simplified CLI installation to npm only

### Bug Fixes

- Fixed monthly chart hover index type error

---

## v0.49.0 (2026-03-15)

### New Features

- Task Status Timeline — new Gantt chart page showing task status changes over time, letting you visualize how tasks flow through statuses
- Status Changes Feed — dashboard "Recently Updated" widget replaced with a live feed of task status changes
- Knowledge Graph Tag Filter — filter nodes by tag in the knowledge graph view
- Kanban Subtask Preview — subtasks now shown directly in the kanban card preview modal

---

## v0.48.1 (2026-03-15)

### New Features

- Task preview below search results on mobile for quick context
- Title/Grep segmented control on mobile command palette
- Section-level add task button in board list view
- Inline search and tag filter in list view

### Improvements

- Tag suggestions sorted by last used instead of alphabetical

### Bug Fixes

- Fixed focus ring clipping on title input in create task dialog

---

## v0.48.0 (2026-03-14)

### New Features

- Subtask ordering with drag-and-drop reordering
- Show all workspace windows instead of just current board
- Go-to-parent button in epic view for quick navigation
- Open-externally buttons now navigate within the current window
- CLI: `--parent` and `--subtask` flags for `ud task unlink`

### Improvements

- Optimistic updates for subtask drag-and-drop (instant visual feedback)

### Bug Fixes

- Relations graph now shows when task has only subtasks
- Fixed subtask title alignment and styling
- Fixed drag handle causing layout shift

---

## v0.47.1 (2026-03-14)

### Improvements

- Optimized Linux desktop app build pipeline

---

## v0.47.0 (2026-03-14)

### New Features

- Mermaid diagram rendering in TipTap editor with fullscreen pan-zoom preview and SVG download
- Task relationships restructure: dedicated Parent, Subtasks, and Linked sections with subtask progress bar
- CLI subtask support with `--parent` and `--subtask` flags, subtask display in task detail
- Configurable storage quota via admin system config
- Local sync frontmatter support for parent, subtasks, and linked fields

### Improvements

- Add existing task as subtask dialog for quick subtask creation

### Bug Fixes

- Fixed mermaid SVG sanitization for XML parsing on download
- Fixed fullscreen preview invisible on light mode
- Fixed resource detail page preview inconsistency
- Fixed user role not passed through upload quota validation paths
- Fixed subtask progress count not using backend data

---

## v0.46.6 (2026-03-13)

### Improvements

- Added additional showcase image for the access control feature on the homepage

---

## v0.46.5 (2026-03-13)

### Bug Fixes

- Fixed CLI binary auto-update: the desktop app now silently updates the CLI on startup
- Fixed child window size: new windows now default to a larger size showing desktop view
- Removed automatic DevTools popup that was interrupting users

---

## v0.46.4 (2026-03-13)

### Bug Fixes

- Fixed Linux dock icons displaying in grayscale instead of color (sRGB conversion)
- Child windows now open much faster (reduced fallback timer from 5s to 500ms)

---

## v0.46.3 (2026-03-13)

### Bug Fixes

- Fixed child window display issues on Linux with fallback show timer and error handling
- Fixed Electron desktop app builds for macOS and Windows by using prebuilt native binaries

---

## v0.46.2 (2026-03-13)

### Improvements

- Added mobile board selector and view toggle to kanban list page

### Bug Fixes

- Fixed database migration failing on fresh installs
- Fixed board metadata (workspace working directory) lost during updates
- Fixed tags wrapping to multiple lines
- Fixed mobile sidebar toggle visibility
- Fixed Linux desktop app terminal not rendering

---

## v0.46.1 (2026-03-12)

### Bug Fixes

- Fixed expired login sessions cached in the browser bypassing the login page and showing the onboarding dialog

---

## v0.46.0 (2026-03-12)

### Improvements

- Database upgrades now use versioned SQL migrations for more reliable schema management
- Fixed a startup crash on desktop (SQLite) caused by legacy database column cleanup

---

## v0.45.2 (2026-03-12)

### New Features

- Command palette now highlights search terms in results and shows note previews
- Navigation commands consolidated into a single /nav submenu for a cleaner command palette

### Bug Fixes

- Fixed kanban sidebar icon not navigating directly to the selected board
- Fixed /board command not navigating to the selected board correctly

---

## v0.45.1 (2026-03-12)

### Improvements

- Added integration test framework for better release quality assurance

---

## v0.45.0 (2026-03-12)

### New Features

- Command palette now supports grep search mode — press Tab to toggle between title-only and full-text search (title + description + notes)
- Added "Go to Board" button in workspace TaskPanel
- Resource preview now supports multiple text formats, markdown preview, and docx/xlsx preview
- Added text resource support for task attachments

---

## v0.44.5 (2026-03-11)

### New Features

- Added /windows command to command palette for quick window switching
- Dataflow nodes now support description fields with edit button and hover tooltip

### Improvements

- Replaced familiar features section with highlights gallery on comparison page

### Bug Fixes

- Fixed kanban window title not showing the selected board name

---

## v0.44.4 (2026-03-11)

### Bug Fixes

- Hidden history actions (floating button and context menu) for read-only shared tasks
- Fixed workspace terminal not inheriting the board's configured working directory

---

## v0.44.3 (2026-03-11)

### New Features

- Workspace now enforces a window limit; unlock more windows with a license key
- Task ID is now displayed beneath the task title in the Workspace task panel

### Bug Fixes

- Fixed finance data not refreshing after preset data cleanup or logout
- Hidden the create board button on mobile view

---

## v0.44.2 (2026-03-11)

### New Features

- Workspace switcher dropdown in workspace TaskPanel
- "Save to UnderControl" button in standalone editor

### Bug Fixes

- Fixed frontmatter block corruption in visual editor
- Fixed editor instances not properly separated per mode

---

## v0.44.1 (2026-03-11)

### New Features

- Inline workspace bar on kanban board page

### Bug Fixes

- Fixed page-level horizontal scroll during kanban drag
- Fixed auto-scroll continuing when cursor moves past scroll container edge
- Fixed kanban drag-to-offscreen columns and right margin
- Fixed toolbar scrolling away — now sticks below title bar
- Hidden all write actions for read-only shared tasks

---

## v0.44.0 (2026-03-10)

### New Features

- Standalone Markdown editor in the desktop app — open and edit .md files directly

### Bug Fixes

- Fixed missing custom protocols in Electron protocol filter

---

## v0.43.0 (2026-03-10)

### New Features

- k9s-style TUI overhaul: 3-section layout, two-column header with branding and context info
- TUI kanban view: vertical columns with expand/collapse, board drill-down navigation
- TUI workspace support: launch from task detail, PTY management, action picker
- Edit tasks in `$EDITOR` from TUI with frontmatter format
- Create new tasks via editor in TUI
- k9s-style `/` filter for all TUI resource views
- `:ctx` command to switch contexts, shows API URL and user info in header
- Command mode accessible from any view
- Backend liveness indicator in TUI header
- Resource shortname and plural aliases for CLI commands
- "Open Claude (task context)" workspace action

### Improvements

- Arrow up/down navigation in table while in filter mode

### Bug Fixes

- Fixed expenses table padding so DATE column is not truncated
- Fixed view not restored when leaving workspace picker
- Fixed goroutine leak on workspace detach and reattach
- Fixed TUI layout issue on workspace reattach

---

## v0.42.1 (2026-03-09)

### Improvements

- Added internationalization support for kanban board fields and placeholders

### Bug Fixes

- Fixed hooks toggle requiring correct project directory context

---

## v0.42.0 (2026-03-09)

### New Features

- Board permission system: set boards as read-only, enforce permission ceiling for tasks
- Permission toggle in board share modal
- Read-only visual feedback for shared tasks and boards
- Transfer task ownership when sharing to board's group
- Click-to-enlarge image preview in rich text editor
- Kanban: create button moved next to settings for easier access
- Project-level hook injection with per-board consent toggle

### Improvements

- Cleaner image display in rich text editor (removed border-radius)

### Bug Fixes

- Fixed drag overlay escaping board container bounds
- Code blocks now scroll horizontally instead of wrapping
- Fixed white-space handling in code blocks
- Fixed drag-and-drop error with dynamic sensors

---

## v0.41.6 (2026-03-09)

### Improvements

- Kanban drag-and-drop order now persists across page reloads

### Bug Fixes

- Fixed kanban column display query
- Fixed kanban task sorting for consistent drag-and-drop feedback
- Fixed default query sort order

---

## v0.41.5 (2026-03-09)

### Bug Fixes

- Fixed PowerShell argument mangling on Windows that could cause CLI commands to fail
- Fixed variable word-splitting in workspace commands on Windows

---

## v0.41.4 (2026-03-08)

### Improvements

- Internal code optimization and maintainability improvements

---

## v0.41.3 (2026-03-08)

### Improvements

- Desktop app workspace agent starts faster — skills prompt is now embedded at build time instead of requiring a runtime CLI call

---

## v0.41.2 (2026-03-08)

### Improvements

- CLI now defaults to official server URL (ud.oatnil.top)
- Workspace desktop actions now show a confirmation dialog instead of a tooltip hint

### Bug Fixes

- Fixed kanban board card ordering not persisting after drag-and-drop
- Fixed workspace agent command execution reliability

---

## v0.41.1 (2026-03-08)

### Bug Fixes

- Fixed infinite loop in tag condition filtering that could cause the page to freeze

---

## v0.41.0 (2026-03-08)

### New Features

- Multi-account switching: save up to 5 accounts and switch between them without logging out, available in sidebar, login page, and profile page
- Task board in CLI: `ud task` now shows which board a task belongs to
- Unified onboarding flow: visitor account creation and sample data generation are now separate steps with clear progress indication
- Scheduled jobs: Run Now promoted to a direct button for easier access; preset data cleanup defaults to disabled

### Improvements

- Preference store now persists to localStorage for instant rendering on page reload

### Bug Fixes

- Fixed chart rendering warnings in dashboard
- Fixed stale pinned tasks appearing from cache after updates

---

## v0.40.0 (2026-03-08)

### New Features

- ud vs Obsidian comparison page: full landing page with feature comparison table, familiar features checklist, and pain point solutions
- Obsidian showcase section on homepage with image gallery
- Post-login onboarding dialog with language selection
- Admin workspace management page for system-wide daemon and session monitoring
- CLI `ud apply` now supports board field for direct board task creation
- Windows remote workspace agent support via PowerShell hook script
- Refresh button on workspace monitor page
- In-app remote workspace setup guide

### Improvements

- /tasks now redirects to kanban board view
- Pinned task cache uses stale-while-revalidate for faster rendering

### Bug Fixes

- Fixed kanban card floating outside board when dragged beyond the last column

---

## v0.39.0 (2026-03-07)

### New Features

- Workspace: Full remote workspace system with daemon registration & discovery, SSE event streaming, session tracking & agent spawning, control signals (stop/read-new-instruction), action blacklist for security, and frontend trigger & viewer UI
- Real-time task note notifications via SSE for workspace updates

### Bug Fixes

- Fixed CLI unable to run ud commands in spawned Claude Code agent sessions
- Fixed CLI passing task_id as prompt to Claude Code agent
- Hardened CLI daemon with safe ID truncation, SSE backoff reset, and consistent error handling
- Fixed SSE endpoint response interceptor causing connection issues

---

## v0.38.10 (2026-03-06)

### Bug Fixes

- Removed China download option from subscription desktop section

---

## v0.38.9 (2026-03-06)

### Bug Fixes

- Fixed ad-hoc command execution starting agent without a prompt
- Improved board type selection — shared is now default with clearer descriptions

---

## v0.38.8 (2026-03-06)

### New Features

- Added directory path picker for board project settings

### Bug Fixes

- Fixed context hint ordering for better task workflow

---

## v0.38.7 (2026-03-06)

### Bug Fixes

- Fixed ud CLI skills command compatibility
- Fixed prompt context for non-Claude AI agents
- Fixed prompt handling on Windows to prevent argument splitting

---

## v0.38.6 (2026-03-06)

### Bug Fixes

- Fixed Codex CLI prompt handling to properly combine system and user prompts
- Fixed argument splitting issue when passing prompts to Codex

---

## v0.38.5 (2026-03-06)

### New Features

- CLI: Added login hint to `set-context` command and `--name/-n` flag to `login` for easier authentication

### Bug Fixes

- Fixed workspace terminal not resolving user's full PATH correctly
- Removed stale /view command from command palette

---

## v0.38.4 (2026-03-06)

### Bug Fixes

- Fixed workspace launch failing on Windows due to PowerShell command parsing issues

---

## v0.38.3 (2026-03-06)

### New Features

- Dashboard account and budget widgets now show recent items
- Dashboard transaction widget shows 3 most recent transactions
- CLI: New migrate command for server-to-server data migration

### Bug Fixes

- Fixed dashboard accounts donut chart color inconsistencies
- Fixed dashboard accounts widget layout misalignment with budget and transactions widgets
- Fixed CLI saved-query and task-view list response formats

---

## v0.38.2 (2026-03-06)

### Improvements

- Internal stability and tooling improvements

---

## v0.38.1 (2026-03-06)

### New Features

#### System Info Viewer

- Admins can view database type, version, and size metadata directly in System Config

#### Dataflow Export as AI Prompt

- Copy dataflow diagrams as structured prompts for use with AI tools

#### Delete Tasks from Saved Queries

- Delete tasks directly from saved query result lists without navigating away

### Improvements

- AI assistant now describes its current task context
- Predefined saved query names and preset data cleanup jobs translated in Chinese/English

### Bug Fixes

- Fixed dataflow copy prompt to produce importable JSON format
- Fixed CLI install configuration

---

## v0.38.0 (2026-03-05)

### New Features

#### Board Creation Experience

- New visible "Create Board" button in kanban header for easy board creation
- Create Board dialog now includes advanced settings (description, visibility), expanded by default
- System boards guide you to create your own custom boards

#### Preset Data for New Users

- New users automatically receive sample data to explore the app
- Tag-based cleanup lets you remove all preset data with one click when ready

#### Desktop CLI Auto-Configuration

- Desktop app automatically configures CLI personal context on login — no manual setup needed

### Improvements

- Simplified onboarding from 30 to 10 tasks with more accurate content
- Shared board description better explains collaboration features

### Bug Fixes

- Fixed crash when clicking Create Board button
- Fixed preset data notice with cleanup link on welcome task
- Fixed Windows CLI path setup issue

---

## v0.37.9 (2026-03-05)

### Improvements

- Desktop app now automatically installs the ud CLI and configures Claude Code hooks on startup — no manual setup needed

### Bug Fixes

- Fixed Windows CLI path mismatch between install and workspace terminal
- Removed manual CLI install option from profile page (now automatic)

---

## v0.37.8 (2026-03-05)

### Bug Fixes

- Fixed Windows CLI compatibility issue
- Fixed desktop app package identification

---

## v0.37.7 (2026-03-05)

### Improvements

- Homepage showcase updated with resources feature images for a richer visual experience

---

## v0.37.6 (2026-03-05)

### New Features

- Added "Download Desktop App" button to the home page for easy access to the desktop client
- CLI now supports get/describe commands for expenses, budgets, and accounts

---

## v0.37.5 (2026-03-04)

### Improvements

- Main window close confirmation dialog now supports Chinese and English

---

## v0.37.4 (2026-03-04)

### New Features

#### Board Terminal

- Open AI agent terminals directly from kanban board headers, with support for multiple concurrent terminals
- Choose specific AI agents for individual actions and launch ad-hoc workspace actions

#### Real-Time Status Updates

- Workspace status now updates in real-time via Server-Sent Events for faster and more reliable updates

#### Close Confirmation

- The app now asks for confirmation before closing the main window when child windows (workspaces) are open, preventing accidental data loss

### Bug Fixes

- Fixed board terminal prompts including unnecessary task context
- Agents can now be started interactively when no prompt is provided
- Fixed agent selection dropdown display layering issue

---

## v0.37.3 (2026-03-04)

### New Features

#### Epic View

A new subtask tree visualization page showing task hierarchy:

- Navigate from task detail to Epic View for a full subtask tree
- Expand/collapse all nodes to quickly browse or focus on specific branches
- Quick-add subtasks directly within the tree
- Clickable task titles for fast navigation to task details

#### Subtask Progress Indicator

- Task list items and task detail page show subtask completion progress
- Progress bar displayed in linked tasks section

#### Workspace Event History

- Monitor page now tracks workspace status changes over time
- Workspaces auto-marked as idle on open for accurate event tracking

### Improvements

- Mobile hero section uses horizontal pill tabs for better browsing

### Bug Fixes

- Fixed kanban cards disappearing on refresh and after creating a new card
- Fixed workspace event history not always showing on monitor page

---

## v0.37.2 (2026-03-04)

### Bug Fixes

- Fixed workspace actions causing infinite re-render loop

---

## v0.37.1 (2026-03-04)

### New Features

#### Interactive Feature Showcase

- Home page feature cards now support click interaction with multi-image galleries, auto-rotation, left/right navigation, and click-to-enlarge lightbox
- Added "Try Now" button for visitors to instantly try the platform from the home page
- Updated descriptions for tasks, finance, workspace, resources, and localsync features

#### Workspace Window Status Indicator

- Workspace window titles now show status emoji for at-a-glance monitoring

### Bug Fixes

- Fixed infinite request loop when loading kanban columns
- Fixed infinite loop in agent selector
- Fixed linked task sorting to use update time consistently
- Removed non-functional Export PDF button from mobile view

---

## v0.37.0 (2026-03-04)

### New Features

#### Workspace Settings Redesign

- Settings page reorganized into CLI, Workspace, and Integrations sections for clearer navigation
- Built-in workspace actions and agent CLIs now visible as read-only items in settings
- Click on built-in actions and agents to view their full details

#### Configurable Agent CLIs & Per-Task Working Directory

- Add custom agent CLIs for workspace automation
- Configure working directory per task for context-aware CLI commands
- CLI context configuration available in board & task workspace

#### Quick Custom Action Access

- "Add Custom Action..." link added to workspace dropdown for quick access
- Custom action form now pre-filled with useful examples instead of empty placeholders

### Improvements

- Board settings and kanban dropdown menus fully localized (i18n)

### Bug Fixes

- Fixed custom action prompts containing unnecessary placeholders

---

## v0.36.9 (2026-03-03)

### New Features

- Workspace actions now use a template system for better organization
- Agents show a green "Planning" status when in plan mode
- New "Check Implementation" action in workspace dropdown

### Bug Fixes

- Removed invalid "shell" option from board implementation tool choices

---

## v0.36.8 (2026-03-03)

### Bug Fixes

- Adjusted workspace status dot size on kanban cards to match adjacent icons

---

## v0.36.7 (2026-03-03)

### Bug Fixes

- Fixed workspace status dot showing on kanban cards even when no workspace window is open

---

## v0.36.6 (2026-03-03)

### New Features

#### Resource Tags

- Resources now support tags for better organization and filtering

#### Kanban Agent Status

- Workspace agent status is now displayed directly on kanban cards

### Bug Fixes

- Unified workspace status colors for a more consistent look

---

## v0.36.5 (2026-03-03)

### New Features

#### Workspace Enhancements

- Added "Open Shell" option to workspace dropdown for quick terminal access
- Agent now knows the current task ID, enabling more context-aware assistance

### Bug Fixes

- Fixed kanban task creation dialog focusing on description instead of title
- Fixed workspace agent status not updating during permission and input dialogs

---

## v0.36.4 (2026-03-03)

### Improvements

- Removed calculator widget from expense and income dialogs for a cleaner interface
- Idle agent status now uses blue color for better visual distinction from working status

### Bug Fixes

- Fixed vertical scrolling not working on remaining public pages

---

## v0.36.3 (2026-03-03)

### New Features

#### Workspace Monitor

- New workspace monitor page for a bird's-eye view of all active workspaces
- Quickly accessible from the command palette
- Workspace task panels include a shortcut to open tasks in the main window for editing

### Improvements

- Status icons displayed alongside task titles in workspace panels

### Bug Fixes

- Fixed status icon alignment in workspace task panels

---

## v0.36.2 (2026-03-02)

### Improvements

- Desktop app profile page now shows a hint to install the CLI from Integrations

### Bug Fixes

- Fixed workspace limit dialog redirecting to wrong section
- Fixed vertical scrolling not working on public pages (subscribe, contact, docs)

---

## v0.36.1 (2026-03-02)

### Improvements

- Window titles now show WK/Task prefix for easy identification

### Bug Fixes

- Fixed double horizontal scrollbar on kanban page
- Fixed agent status cross-contamination between workspaces

---

## v0.36.0 (2026-03-02)

### New Features

#### AI Workspace Real-Time Status Detection

- Workspace windows now show real-time AI agent status (working/idle/offline)
- Status displayed as emoji prefix in window titles for quick recognition
- Idle status uses amber indicator for better attention

#### Task Pinning

- Pin/unpin button on task detail page to keep important tasks at the top

#### Electron Task Windows

- Open dedicated windows for tasks in the desktop app for parallel workflows
- Window titles display the task name for easy identification

#### Registration Language Preference

- Language preference selector added to the registration form

### Improvements

- Workspace notes now sorted by creation time (newest first)

---

## v0.35.7 (2026-03-01)

### New Features

#### Workspace Experience Improvements

- Workspace window titles now display the task name for easy identification
- Start implementation directly from the kanban task preview modal

### Improvements

- A confirmation dialog now appears before redirecting to the CLI install page

---

## v0.35.6 (2026-03-01)

### New Features

#### ud CLI Resource Sync Enhancements

- Added `--concurrent` flag for faster file synchronization
- Added filtering flags for selective file synchronization

### Bug Fixes

- Fixed scrollbar visibility in kanban columns while keeping scroll functionality

---

## v0.35.5 (2026-03-01)

### New Features

#### Break Reminder Widget

A new dashboard widget to help you take regular breaks:

- Countdown timer with customizable intervals (supports hours, minutes, seconds, e.g. "2m3s")
- In-app popup alerts with editable reminder titles
- Sound beep fallback when system notifications are suppressed

#### Transaction Widget

The dashboard expense widget has been upgraded to a transaction widget with a donut chart for visual income/expense breakdown.

#### Saved Query Improvements

- Duplicate saved queries with one click
- Create query dialog upgraded to a sheet drawer with preset query shortcuts
- Added "AI gen without Kanban" preset query

### Bug Fixes

- Fixed multiple break reminder issues (notification delivery, countdown display, timer stopping)
- Fixed popup title showing fixed text instead of custom message
- Fixed toggle not blocked when input has errors

---

## v0.35.4 (2026-03-01)

### New Features

#### Task Custom Metadata

View all metadata fields on task details and add custom key-value fields to any task.

#### Saved Query Task Actions

Change task status and share tasks to boards directly from saved query result rows.

### Bug Fixes

- Fixed task session creation failing with non-ASCII titles

---

## v0.35.3 (2026-02-28)

### New Features

#### Budget Share-to-Group

Share budgets with groups using Unix-style permission controls (read/write/admin) for collaborative budget management.

### Bug Fixes

- Fixed cash flow summary not rendering on mobile when subcategories exist but data is empty

---

## v0.35.2 (2026-02-28)

### New Features

#### Workspace Window Limit for Personal Tier

Personal tier users can now open up to 2 implementation windows at a time. An upgrade prompt appears when the limit is reached, with a link to get a Pro license.

#### Personal Tier Credentials Display

Personal tier users can now view their default login credentials on the profile page, making it easy to use with the CLI or other clients.

#### CLI Availability Check

The app now checks if the ud CLI is installed when using "Start Implementation" and prompts you to install it if needed.

---

## v0.35.1 (2026-02-28)

### New Features

#### Install CLI from Desktop App

You can now install the ud command-line tool directly from the desktop app — no need to install via Homebrew separately. Go to Settings > Integrations to set it up.

- One-click install with automatic system PATH configuration
- Shows installation status and path
- Detects externally installed CLI (e.g., via Homebrew)

#### Task Detail Refresh

Added a refresh button to task detail pages for quickly reloading the latest data.

### Bug Fixes

- Fixed monthly cash flow chart not displaying correctly on mobile

---

## v0.35.0 (2026-02-28)

### New Features

#### Workspace: AI-Powered Task Implementation

Start implementing tasks directly from the Kanban board with the new embedded terminal workspace:

- New "Start Implementation" button on the task detail page to kick off implementation
- Embedded terminal workspace launches Claude Code with your task context
- Board-level project directory configuration ensures the workspace opens in the right location

#### Monthly Income/Expense Chart

New bar chart on the transactions page showing monthly income vs. expenses at a glance, collapsed by default for a cleaner layout.

### Improvements

- Board edit dialog converted to a drawer layout with project directory configuration

---

## v0.34.7 (2026-02-27)

### New Features

#### Command Palette Preview

The command palette now includes a preview panel with a split layout for viewing task descriptions.

### Improvements

- Identity providers settings page now supports Chinese and English

### Bug Fixes

- Fixed active view not auto-refreshing after localsync pushes tasks

---

## v0.34.6 (2026-02-27)

### Bug Fixes

- Fixed cross-domain API URL handling for self-hosted deployments
- Fixed identity config page redirect URL display

---

## v0.34.5 (2026-02-26)

### New Features

#### Budget Monthly View

A new monthly budget view with a month picker for viewing and managing budgets by month, making it easier to track spending over time.

#### Budget Concepts Page

New documentation page explaining budget concepts and domain language to help you understand budget management terminology.

### Improvements

- AI "Feel Lucky" feature now includes source task references for better context

### Bug Fixes

- Fixed budget page layout issues on mobile devices

---

## v0.34.4 (2026-02-26)

### New Features

#### Feel Lucky Dashboard Widget

A new "Feel Lucky" widget on the dashboard for knowledge exploration — randomly discover and explore content from your knowledge base.

#### AI Provider Internationalization

AI provider configuration dialog and settings section now fully support Chinese and English.

### Improvements

- Added how-to guide for configuring AI providers

### Bug Fixes

- Fixed how-to guide navigation redirect
- Fixed file upload paths for task-from-vision and task-from-image
- Fixed AI provider startup configuration
- Improved AI error handling in Feel Lucky feature

---

## v0.34.3 (2026-02-25)

### New Features

#### Content Outline (Table of Contents)

A new content outline on the task detail page that automatically detects headings in the visible section:

- Navigate headings in both task descriptions and notes
- Available in both normal view and zen mode
- Smooth fade-in/fade-out animation

#### Redesigned Sidebar Toggle

New sidebar toggle with a vertical line and round button on the right edge, providing a cleaner and more elegant design.

#### Zen Mode Improvements

- Added right-edge back button for easy navigation
- Content outline (TOC) available in zen mode

#### Auto-collapse Sidebar

Left sidebar auto-collapses on task detail pages for more reading space.

### Improvements

- Auto-focus editor and position cursor at double-click location
- TOC hides automatically when editing content
- Wider content outline for better readability
- Removed Export PDF action button for cleaner task detail interface

### Bug Fixes

- Fixed print view to keep page numbers while hiding browser header
- Fixed sidebar toggle position to avoid scrollbar overlap
- Fixed content outline repositioning when sidebar state changes

---

## v0.34.2 (2026-02-25)

### New Features

#### Deadline Display in Kanban View

Tasks with deadlines now display the due date directly in both kanban list view and kanban cards, making it easier to track time-sensitive tasks at a glance.

#### @ Mention Menu in Editor

Type `@` in the rich text editor to bring up a mention menu. Quickly reference tasks, budgets, and other entities by searching and selecting from the popup menu.

### Bug Fixes

- Fixed deadline date format to show year when the deadline is not in the current year
- Fixed deadline date format to respect locale settings (Chinese/English)
- Improved deadline positioning inline after task title for better visual alignment
- Fixed alignment consistency for deadline badges across list rows
- Fixed arrow key navigation in the @ mention menu
- Fixed Chrome extension source code link URL

---

## v0.34.1 (2026-02-24)

### New Features

- Command palette: added `/localsync` command to quickly trigger local sync

### Bug Fixes

- Fixed task owner unable to edit task when shared as read-only
- Fixed local sync failing to parse filenames with spaces

---

## v0.34.0 (2026-02-23)

### New Features

#### Flat File Local Sync

Local sync now uses flat `.md` files instead of nested UUID folders, making it easier to browse and edit tasks in your file explorer or Obsidian.

#### Wikilink & Markdown Link Resolution

`[[wikilinks]]` and `[text](./file.md)` links between tasks are automatically resolved during sync, preserving cross-references between your tasks.

#### Full Push to Remote

New button to force-push all local files to the app at once.

#### Task Navigation History

Browser-style back/forward navigation arrows on the task detail page for quickly switching between tasks.

### Improvements

- Push/pull buttons now clearly show direction (Local → App, App → Local)
- Bare `.md` files with no frontmatter are accepted as tasks with default fields
- Local Sync promoted to its own section in Settings

### Bug Fixes

- Fixed macOS dock icon sizing and proportions
- Navigation arrows always visible with cached fallback

---

## v0.33.2 (2026-02-20)

### New Features

#### Account Asset Trend Chart

Multi-line asset trend chart on the accounts homepage for visualizing asset changes:

- Defaults to 3-month view with toggleable time ranges
- Chart is collapsible (collapsed by default), click to expand
- Data points marked at actual history dates

#### Account History Comments

Added comment field to account history records for documenting each change.

#### CSV Export

Export account data as CSV files directly from the browser.

#### Resource Metadata

Resource upload flow now supports adding metadata, with a new metadata update endpoint.

#### CLI Folder Sync

New `ud sync resource` command for recursively syncing local folders to the cloud.

### Improvements

- Visitor mode shows enriched account history preset data for better trend visualization

### Bug Fixes

- Fixed trend chart X-axis ticks showing the same date repeatedly
- Fixed historical dates being lost when generating preset account history
- Fixed visitor account history not aligned to consistent time points

---

## v0.33.1 (2026-02-20)

### New Features

#### Command Palette Hint Bar Enhancements

- Added toggle to hide/show the keyboard shortcut hint bar for a cleaner workspace
- Added "Open in New Tab" and "Copy Link" shortcuts with clickable hint labels
- Shortcut hints now display with text labels for better readability

#### npm Distribution for ud CLI

ud CLI is now available via npm: `npm install -g @oatnil/ud`

### Improvements

- Web Clipper now supports both Markdown and SingleFile HTML formats
- Updated installation documentation with npm and Homebrew methods

---

## v0.33.0 (2026-02-19)

### New Features

#### Predefined Saved Queries for New Users

New users automatically receive a set of predefined saved queries upon account creation, making it easier to get started.

#### CLI Kanban Board Commands

New CLI commands for kanban boards: get, describe, and board add.

#### Income Preset Data for Visitors

Visitor accounts now include preset income data for a more complete demo experience.

### Improvements

- Personal tier access tokens now last 7 days, reducing the need for frequent re-login
- Homepage architecture diagram now includes clear descriptions for each component

### Bug Fixes

- Fixed transaction filters row height and alignment on mobile devices

---

## v0.32.0 (2026-02-18)

### New Features

#### Income Tracking & Unified Transactions Page

A new income tracking feature and unified transactions page to manage all your finances in one place:

- Add and track income with a dedicated detail page and transaction click-through
- Unified transactions page showing both expenses and income together
- Auto-fill default title when creating income entries

#### Cash Flow Summary

New cash flow summary on the transactions page:

- View real-time income and expense totals
- Multi-currency support with separate buckets per currency
- Automatic refresh when expenses or income are added or deleted

#### Budget Progress Tracking

New budget progress bars in the transactions sidebar for at-a-glance budget monitoring:

- Individual progress bars for each budget
- Total expense/budget summary progress bar

#### Blind Mode

New blind mode toggle on the transactions page to hide financial amounts for privacy.

#### Task PDF Export

Export tasks with their notes as PDF files for offline sharing and archiving.

### Improvements

- Simplified transaction icons and amount colors for a cleaner look
- More compact cash flow summary layout

### Bug Fixes

- Fixed expenses not using the budget's currency when created from a budget
- Fixed queue tasks list page auto-refreshing unnecessarily

---

## v0.31.1 (2026-02-15)

### Improvements

#### Website Showcase Redesign

- App showcase section redesigned with auto-playing slideshow featuring real product screenshots
- SaaS subscription section redesigned with improved visual layout
- Architecture diagram now supports interactive node previews — click nodes to see actual app screens
- Architecture diagram updated with Desktop App, Apple Shortcuts, and storage option nodes

### Bug Fixes

- Fixed dialog accessibility issues

---

## v0.31.0 (2026-02-15)

### New Features

#### Web Clipper (Chrome Extension)

New Chrome browser extension to save web pages as UnderControl tasks:

- Click the extension icon, edit the title, and save the entire page
- Captures full-page HTML snapshots using SingleFile technology
- Snapshots are automatically attached as resources to the new task
- Web Clipper section added to the subscribe page with documentation link

#### CLI Multi-Account Support

New `--context` flag for ad-hoc context switching in the CLI:

- Quickly access different accounts/servers without changing the default context
- Example: `ud --context work get task` to temporarily use the work context
- In-app documentation updated with full multi-account usage guide

---

## v0.30.1 (2026-02-14)

### Bug Fixes

- Fixed build errors for improved application stability

---

## v0.30.0 (2026-02-14)

### New Features

#### Filesystem-Style Resource Browsing

The resources page now provides a file system-like browsing experience:

- Create folders to organize files into directories
- Breadcrumb navigation for quick directory switching
- Click `..` to navigate to parent directory
- Both list view and gallery view support folder browsing

#### Drag-and-Drop File Management

- Drag files onto folders to move them
- Drag files from desktop to upload directly into the current directory

#### Sortable File List

- Click column headers (Name, Size, Created, Updated) to sort files
- Arrow indicators show current sort direction

#### Quick Task Input in Kanban

- Quickly add tasks with AI creation directly from kanban list view

### Improvements

- AI-recognized expense receipts are automatically filed to `/system/expense-from-vision/`
- AI-recognized task images are automatically filed to `/system/task-from-vision/`

---

## v0.29.1 (2026-02-13)

### Improvements

- Saved queries now display a refresh icon for quick re-execution

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
