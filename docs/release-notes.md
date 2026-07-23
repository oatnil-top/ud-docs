---
title: Release Notes
description: Complete version history and changelog for UnDercontrol
sidebar_position: 1
---

# Release Notes

Complete version history and new features for UnDercontrol.

## Version Numbering

UnDercontrol follows **Semantic Versioning** (format: MAJOR.MINOR.PATCH), e.g., `v0.19.0`:

- **MAJOR version 0**: Indicates development version, API and features may change significantly
- **MINOR version** (e.g., 0.**19**.0): Incremented for new features, major improvements, or breaking changes
- **PATCH version** (e.g., 0.19.**0**): Incremented for bug fixes and backward-compatible improvements

---

## v0.118.0 (2026-07-23)

### New Features

**Create a possession straight from an expense**
- The expense detail view has a new "Create possession" action.
- It opens the possession form pre-filled from that expense, so a purchase becomes a tracked possession in one step.
- The expense itself is never modified — a new possession is created and linked back to it.

**"Onboard your agent to UnDercontrol" button on the homepage**
- One click copies a single line you can paste into any AI agent.
- The agent reads the setup instructions itself, installs the CLI, and connects to your workspace.

**`ud describe skill <name> -o content`**
- Prints a skill's body with no metadata header.
- Redirect it into a `SKILL.md` file, or pipe it straight to an agent.

### Improvements

**Agent sessions can recover their own identity**
- When a first mention's setup message failed to land, the session ran on with no identity at all.
- Every follow-up mention and reply now tells the session to load its agent settings.

### Bug Fixes

**The Skills page copy buttons handed out a dead command**
- They copied `ud prompt <name>`, which was removed from the CLI, so pasting it just errored.
- Every copy command and in-app doc now points at `ud describe skill`.

**The web app was stuck on an old build**
- The frontend build had been failing on out-of-memory since 0.117.1, leaving ud.oatnil.com serving the 0.117.0 bundle.
- Fixed, so the web app updates again.

---

## v0.117.1 (2026-07-21)

### Bug Fixes

**Possession dates were saved one day off outside UTC**
- Acquisition and disposal dates were stored as the previous day (east of UTC) or the next day (west of UTC).
- That made holding days and daily cost wrong — at UTC+8 the daily cost showed as roughly half the real figure, and the error was silent because a halved number still looks plausible.
- The date you pick is now recorded exactly as picked.

### Upgrade Notes

- Possessions created before this fix keep the date they were saved with; holding periods are not recomputed automatically. If a possession's daily cost looks wrong, re-pick its acquisition date to correct it.

---

## v0.117.0 (2026-07-21)

### New Features

**Possessions — track the things you own and what they cost you per day**
- New Possessions module for physical items: record what you paid, when you got it, and see the running daily cost of ownership.
- Full lifecycle: wish -> in service -> retired / sold / lost. Costs are derived live, so the daily figure is always current without any bookkeeping.
- Disposing of an item as "sold" can book the proceeds straight into Income.
- Outliving its expected lifespan reads as "Target reached", not an overspend warning — more days than you planned for is the good outcome.
- Possessions appear in the Explorer tree and in the sidebar's finance group.
- A cost too small to show at two decimals is stated as a monthly figure rather than displayed as "0.00 a day".

**Multi-currency accounts**
- Account totals are now reported exactly, per currency. Balances in different currencies are no longer added together into a meaningless number.
- Optionally roll everything up into one display currency of your choice, using the exchange rates configured in system settings.
- The dashboard, trend chart and account list show a single combined figure only when that figure is honest — otherwise they show a per-currency breakdown.
- When a roll-up can't include everything, the app names the currencies it left out instead of quietly understating your total.
- Currency is chosen from a picker when creating an account, not typed.

### Improvements
- The Income module is complete: dedicated list page, route and summary.
- Summaries and cash-flow figures are currency-aware throughout.
- The currency breakdown is ordered by what each holding is actually worth when rates are available, instead of by raw amount.
- Clearer messaging when a conversion isn't available, naming the specific currency that lacks a rate rather than giving one generic message.
- Fewer redundant success toasts on actions that already update instantly.

### Bug Fixes
- Expenses inside a budget shared with a group are now visible to group members. Previously only per-user shares worked, so members saw the budget but none of its expenses.
- Fixed authorization gaps in group-shared expenses and income.
- Opening an account with a balance of 0 works. It was rejected as "Invalid format" while editing an existing account to 0 succeeded.
- Amounts too small to store are now refused instead of being silently saved as 0.
- The budget and off-budget parts of a converted total now add up to the total.
- Holdings worth something but less than 0.01 show "< 0.01" instead of 0.
- A malformed currency code in a request is rejected rather than ignored.

### Upgrade Notes
- Account currency is now restricted to active ISO-4217 codes at creation time. Existing accounts are unaffected and no migration is needed. Self-hosted users who tracked points, tokens or local scrip as an account currency can no longer create accounts with custom codes.
- Rolling everything up into a single currency relies on exchange rates in system settings, which is a Pro feature. Personal tier continues to get the exact per-currency breakdown.

---

## v0.116.0 (2026-07-20)

### New Features

- **Spreadsheet-style paste in tables** — Paste multi-cell data from Google Sheets, Excel, or CSV directly at any cell: rows and columns expand from where you point, and multi-line values are parsed correctly.
- **Full-page Conversations view** — Browse all your comment threads in a dedicated page with the thread list on the left and the conversation on the right.
- **Pop-out conversation windows** — Open any conversation thread in its own standalone window with the new pop-out icon.

### Improvements

- **Terminal zoom controls** — Workspace terminal zoom controls are now a translucent floating overlay, leaving the whole pane for your output.
- **Read-only terminals fill the pane** — Read-only terminals now scale to fill the pane and follow external terminal resizes.
- **Conversation filters wrap** — Filter chips wrap onto multiple lines instead of hiding in a horizontal scroll.
- **Conversations open faster** — Expanding conversations auto-opens the top thread and preloads the next page of threads.

### Bug Fixes

- **Table editing** — Typing to edit a cell no longer loses the first character; cutting or deleting a selection is now a single undo step; CSV delimiter detection and markdown escaping are more robust.
- **AI Chat layout** — Long message content no longer overflows the chat panel.
- **Resource deletion** — Deleting an uploaded file now removes it from your configured storage provider.

---

## v0.115.0 (2026-07-18)

### New Features

- **Zero-config agile sprints** — Boards now support Scrum-style sprints with no setup: create your first sprint from the new Backlog page and sprint tooling lights up automatically.
- **Backlog page** — Plan work in a dedicated backlog: sprint sections, drag tasks into a sprint, and quick-create tasks in place.
- **Sprint scope bar on the board** — A scope bar on the kanban board focuses the view on the active sprint with one click.
- **Reports: burndown & velocity** — A new Reports tab charts sprint burndown and team velocity, powered by daily automatic snapshots.
- **Sprint ceremonies** — Start a sprint with date presets; complete it with a closing dialog that rolls unfinished tasks into the next sprint and produces an itemized retro summary.
- **Risk alerts & WIP warnings** — The board warns when a column exceeds its WIP limit, and at-risk sprint tasks automatically receive a risk-alert comment.
- **Jira-style named views** — Board / Backlog / Gantt view tabs are unified across board pages, with a shared header and a board switcher everywhere.
- **Agile fields on tasks** — Tasks gain built-in agile fields (like their sprint), editable in the task detail and usable in board queries.
- **CLI sprint management** — `ud sprint close` completes a sprint with rollover from the terminal; `ud patch task --set` patches task metadata (including JSON arrays/objects); plus a built-in agile skill and cook recipes.

### Improvements

- **More compact board layout** — Tabs move inline with the header, sprint scope merges into the filter bar, and the Gantt header collapses to a single row — more room for your tasks.
- **Flexible dates when creating tasks** — Task creation (API and CLI) now accepts relaxed date formats.
- **Sprint title links to its task** — Sprint section titles open the sprint's task detail, where its dates can be edited.

### Bug Fixes

- **Directed agent replies stay in their thread** — Replies addressed to a specific session no longer broadcast to other bound sessions.
- **Agent startup failures are reported** — When an agent session fails to initialize, the error is now replied into the comment thread that triggered it.
- **Custom field types display correctly** — Field types and option sources now show proper labels.
- **Reports & backlog respect the board scope** — Backlog, sprint lists, and progress queries follow the board's scope, and Reports resets the selected sprint when you switch boards.

---

## v0.114.0 (2026-07-18)

### New Features

- **Obsidian-style vault layout for CLI sync** — `ud init` now creates a vault layout by default: tasks live as plain Markdown files and notes materialize into a visible `notes/` folder, so your whole checkout works directly as an Obsidian vault.
- **Wikilink translation** — `[[wikilinks]]` in your vault files are converted to ud task links on push and back to wikilinks on pull, so links keep working on both sides.
- **File names with spaces and special characters** — Synced paths now allow spaces and most special characters; only characters your filesystem itself forbids are rejected.
- **Fetch attachments on pull** — `ud pull --fetch-attachments` downloads task attachments into your vault.
- **Migrate existing checkouts** — `ud migrate-layout` converts an existing ud-layout checkout to the new vault layout in place.

### Bug Fixes

- **Your own edits are no longer flagged as conflicts** — Sync no longer reports conflicts for changes you just pushed, and timestamp comparison now uses full nanosecond precision.
- **Dotfiles sync correctly** — Dotfile resources (e.g. `.gitignore`) are materialized verbatim on pull, with sensible names when deduplication is needed.
- **Pull reconciles identical untracked files** — Pulling over an untracked local file with identical content now adopts it into tracking instead of failing.

---

## v0.113.0 (2026-07-16)

### New Features

- **LaTeX math in the editor and viewer** — Write math formulas anywhere: use inline math or insert a math block from the slash menu, and see them rendered beautifully with KaTeX in both edit and view modes — including AI chat responses.
- **Personal global instructions for AI agents** — Define your own global instructions once, and every AI agent session you start will follow them automatically.

### Improvements

- **Zoom controls in the terminal viewer** — The read-only terminal view now has +/- zoom buttons, making long output readable on small and mobile screens.
- **Terminal output keeps its original layout** — Long lines in the read-only terminal no longer wrap unexpectedly; the view sizes itself to the content.
- **Cleaner site header** — The public site header navigation has been simplified.

---

## v0.112.1 (2026-07-15)

### Improvements

- **AI agent sessions no longer stall on interactive prompts** — Agent sessions now run to completion autonomously instead of pausing to wait for user input.

### Bug Fixes

- **Budgets and expenses display in their own currency** — Budgets and expenses now render in their own currency instead of a single global currency.
- **In-app markdown links navigate correctly** — Markdown links inside the app now route through the in-app router everywhere instead of breaking navigation.
- **AI chat settings link goes to AI settings** — The settings link in AI chat now navigates directly to the AI settings section.

---

## v0.112.0 (2026-07-14)

### New Features

- **Fullscreen image lightbox in conversations** — Click any image in a conversation to open it in a fullscreen viewer, then pan and zoom to inspect the details.

### Improvements

- **The ud assistant now orchestrates your whole team** — Your default ud agent now acts as a root manager over all top-level team leads, coordinating work across teams instead of operating in isolation.
- **Clearer CLI daemon feedback** — `ud` daemon start now reports real success or failure from the captured output instead of silently swallowing errors.

---

## v0.111.0 (2026-07-12)

### Improvements

- **Smarter agent team delegation** — Team leads now delegate to specialists through their AI tool's built-in subagent capability by default: run `ud describe agent <name> -o prompt` to get a ready-to-inject identity prompt (persona, skills, working constraints) and spawn the specialist as a subagent, with results reported right back in the thread. @mention delegation remains for specialists on other machines and long-running background work, and members that can only be reached remotely are now clearly marked in the team roster. Leads are also guided to delegate rather than do everything themselves, staying focused on coordination and review.

---

## v0.110.0 (2026-07-11)

### New Features

- **Running badge focuses its window** — Clicking a workspace's Running badge now brings the already-open workspace window to the front when it's on the same computer, instead of doing nothing.
- **Stuck workspace launches are detected** — Workspace sessions that never start are now failed automatically after a timeout, with a notification posted back into the task thread — no more sessions silently stuck on "starting".

### Improvements

- **Faster terminal reconnects** — Reopening a workspace terminal now restores the screen from a snapshot instead of replaying the entire output history, making reconnects faster and cleaner.
- **Sharper terminal rendering** — The terminal now uses WebGL rendering with more accurate font-size fitting and correct raw output display.

### Bug Fixes

- **Workspace launches without a project folder** — When no working directory is configured, a dedicated sandbox folder is now created automatically instead of the session failing to start.
- **Stray "~" folder** — Fixed the desktop app creating a literal `~` folder inside the project directory when setting up workspace hooks.
- **Conversation previews** — The conversations sidebar now previews the latest reply in a thread, not an older message.

---

## v0.109.0 (2026-07-08)

### Improvements

- **Copy commands everywhere in Markdown** — Copy as rich text, copy as Markdown, and copy Markdown link are now available in every Markdown editor — task and note descriptions, expense/income/account notes, and the kanban preview — not just the task detail view.
- **Cleaner Kanban toolbar** — The board header is now a minimal, unified toolbar: quick icon actions stay visible while everything else folds into an overflow menu, with a single responsive layout for mobile and desktop.
- **Smarter built-in `@ud` agent** — The default `@ud` AI agent now acts as an orchestrator: it understands the full agent roster, clarifies with you, then delegates work to specialist agents instead of doing everything itself.

---

## v0.108.0 (2026-07-08)

### Security

- Fixed a SQL-injection vulnerability in Advanced Search where a specially crafted custom-field name could be injected into the underlying query.

### New Features

- **Unified search bar** — Advanced Search is now a single query bar with three modes: **Filters** (visual chips), **Query** (SQL-like), and **Ask AI** (describe what you want). Filters apply instantly as you add or remove them, switching between Filters and Query keeps your work intact, and a live validity indicator shows when your query is ready.
- **Filter Kanban columns by more fields** — board columns can now match on **Title**, **Description**, and other fields (not just Status and Tags), including a new "contains all tags" option. The column editor shows a live preview of the generated query plus a wildcard hint for pattern matching.

### Improvements

- Kanban: filtering a column by a read-only field (like Title) no longer risks overwriting that field when a card is dropped into the column.

### Bug Fixes

- Fixed terminal (tty) alignment and resizing on the task detail page.

---

## v0.107.0 (2026-07-06)

### New Features

- **Agent Teams** — organize your AI agents into teams with a lead and specialist members. Each member gets a "when to delegate here" note, and that roster is injected into the lead's session so it automatically knows who to hand work off to. Teams nest to form a delegation hierarchy. Manage them in the new **Agents** hub (Agents · Teams · Skills tabs), or from the `ud` CLI (`ud apply` / `ud get agent-team`).
- **Copy as Rich Text** — right-click a task, or its description, to copy it as rich text for pasting into other apps.

### Improvements

- Comment threads: resolving a thread now offers **resolve + mark done + terminate** in place of the old resolve + delete.
- File explorer: a resource attached to a task now appears co-located with that task.

---

## v0.106.0 (2026-07-06)

### New Features

- Pasted images stay tidy — pasting or inserting an image now routes it to a dedicated `/system/pasted-image/` folder instead of cluttering your file explorer root
- Smarter workspace daemon selection — workspace sessions now prefer and reuse your last-used daemon instead of always grabbing the first online one

### Bug Fixes

- AI chat: failed tool steps now clearly show an error state instead of incorrectly rendering as a green "done"; a clear notice appears when a tool loop reaches its iteration limit
- AI chat: long messages in enlarged mode are now centered at a comfortable line width for easier reading
- Workspace: session control buttons no longer get clipped in short or narrow panes

---

## v0.105.0 (2026-07-05)

### New Features

- CLI: new `stop-workspace-session` command to actually terminate a running agent session (not just mark its status)

### Improvements

- Agent sessions now fall back to a default workspace project — when no working directory is configured, sessions run in a dedicated "Default" project so every session gets a real, listed working directory
- When an @agent mention can't start a session (e.g. no agent daemon is online), you now get a clear error reply in the thread instead of the mention silently doing nothing

### Bug Fixes

- Fixed garbled text in read-only terminal views when a workspace session was resized — all viewers now re-apply the new size immediately
- Fixed the task explorer not reflecting status, path, or tag changes after a refresh
- Fixed the Claude Code status indicator showing "idle" while background subagents were still running

---

## v0.104.0 (2026-07-05)

### Improvements

- The markdown editor's popup edit mode has been removed — zen mode (full-screen editing) is now the only way to edit
- Task detail page: better edit-mode affordances, onboarding no longer blocks usage on failure, and the outline now supports grouping
- Task detail page: error states support retry, empty fields can be edited with a single click, and dialogs are more accessible
- Previously hardcoded text in the editor is now properly localized

### Bug Fixes

- Fixed some screens showing raw translation keys instead of proper text
- Fixed the markdown editor sometimes losing unsaved content
- Fixed unsafe link protocols not being filtered in editor links
- Fixed new workspace session windows covering the currently focused window

---

## v0.103.0 (2026-07-04)

### New Features

- Workspace session windows now open in the background — click the status indicator to bring a window into focus
- Click a workspace session title to preview its associated task in a popup

### Improvements

- The workspace group-by toggle now uses icons with tooltip hints
- The compose agent picker supports keyboard navigation, and your draft is kept when switching recipients
- Read-only terminals are now scrollable and support text copying

### Bug Fixes

- Quick-note mention tasks no longer duplicate content across the title, description, and comment

---

## v0.102.0 (2026-07-04)

### New Features

- Responsive mobile layout for the workspaces page — drill down from the session list into the detail view on small screens
- Group workspace sessions by agent or daemon — your group-by choice is remembered
- Stop a session directly from the workspaces sidebar — a stop button appears when hovering a session
- Read-only terminal viewing now scales to fit your window, and the terminal resizes to match the viewer
- The workspace sidebar remembers its collapsed state across sessions
- CLI: `ud apply --dry-run` previews board changes before applying, and board columns round-trip losslessly through export and apply

### Improvements

- Sending input to a remote workspace session now requires Cmd/Ctrl+Enter, preventing accidental sends
- The conversation and explorer sidebars are now mutually exclusive — opening one closes the other

### Bug Fixes

- The workspace working directory is validated before the terminal spawns — an invalid path now shows a clear error instead of a black terminal
- Options chosen in the Run dialog are now honored when generating the workspace session prompt
- Removed a stale keyboard-shortcut hint from the workspace session input placeholder

---

## v0.101.1 (2026-07-03)

### Bug Fixes

- Fixed the backend failing to start when applying the v0.101.0 database migrations (affected self-hosted Docker images and binaries; desktop apps and the CLI were not affected)

---

## v0.101.0 (2026-07-03)

### New Features

- New `ud init` command — bind an existing local folder to a virtual path and publish it with `ud push`; tracking folders are now bound to the path they were pulled from (git-clone style), so `ud pull` with no arguments incrementally syncs everything tracked
- Start a workspace session without picking an existing task — the redesigned prompt-first Run dialog puts your prompt first and collapses settings into a summary line
- Workspace sessions are now grouped by working directory, and the concurrent-workspace limit has been removed entirely
- Gemini, GitHub Copilot, and Qwen are now available as built-in agents for local workspace sessions
- Dataflow is now fully translated into Chinese and English

### Improvements

- Much faster resource lists — download links are now cached and included in list responses, removing a request per resource
- Dataflow visual refresh — flat nodes, orthogonal edges, outlined groups, and smoother dragging without canvas-wide re-renders
- Conversations now live in the sidebar panel; the separate full-page view has been removed

### Bug Fixes

- Explorer: the drag-and-drop target highlight is now visible and stays steady while dragging over folders
- Dataflow: fixed undo tracking and data corruption on rename/duplicate/delete, jumping icon-node anchors, and pipe rendering from any handle direction
- Workspace: terminal history no longer renders twice, and the Run dialog no longer clips input focus rings
- Fixed duplicate folders appearing when pulling or pushing paths with inconsistent formatting

### Upgrade Notes

- The old local-sync feature has been removed from the app, desktop, CLI, and backend — use the new tracking-folder workflow instead (`ud pull` a path into a folder, edit, `ud push`). Old v1 `tracking.json` folders are no longer recognized; re-pull them with the current CLI

---

## v0.100.0 (2026-07-02)

### New Features

- New `ud pull`, `ud push`, and `ud status` CLI commands — sync tasks, notes, and resources between local files and the server, git-style: pull server content into a folder, edit locally, check changes with `ud status`, then push them back
- Comment conversations now have a Resolve & Delete Task button in the header — close a discussion and remove its comment task in one click

### Improvements

- Workspace sessions that fail to start now show the actual error from the daemon instead of failing silently

---

## v0.99.29 (2026-06-29)

### Improvements

- Workspace session detail now shows a read-only live terminal view instead of notes
- Faster task lists — notes and share links are now batch-loaded, removing redundant lookups
- Faster CLI task browsing — `ud tree` and hierarchy views now use dedicated, lighter endpoints

### Bug Fixes

- Workspace terminal: initial output is now buffered until the view is ready, so you no longer miss the first lines
- Fixed access to task tree and hierarchy views that were previously blocked

### Upgrade Notes (self-hosted)

- `HOST_DOMAIN` is now required at startup — set it in your deployment configuration or the backend will not start

---

## v0.99.28 (2026-06-28)

### New Features

- Workspaces, redesigned — Active Sessions now use a full-height master–detail layout at /workspaces, with sub-navigation showing live session-count pills and a more inviting empty state with a clear "New Session" action
- Smoother onboarding — after you pick a language, UnDercontrol seeds a welcome board and opens a maximized Quick Note so you can start right away
- System-wide storage limit — admins can now set a total storage volume cap across all users from Admin → Storage, alongside the per-file and per-user limits
- Desktop apps now offer to install the ud CLI for you when you launch a local workspace without it

### Improvements

- Refined the sidebar app rail with a lighter, more consistent line style
- The homepage "Try Now" button now jumps straight to a full-screen loading page with clear feedback

### Bug Fixes

- The admin Max File Size setting now takes effect immediately for all users
- Workspace session controls (stop, screenshot, send input) now reliably target the exact session instead of the whole task
- Follow-up mention prompts now submit correctly in desktop workspaces
- Task detail now shows a skeleton placeholder instead of a brief "Invalid Date"
- Opening the explorer no longer clobbers loaded task content
- Removed a redundant "Run" button from the empty session list

---

## v0.99.27 (2026-06-27)

### New Features

- Video files now play directly on the resource detail page with full playback controls (play, timeline, volume, fullscreen) — videos no longer show "preview not available"

### Improvements

- Simplified the desktop app's update check to a single "Check for Updates" button: it tells you whether you're up to date or offers a Download button for a new version. The best download mirror is now chosen automatically, and a startup crash tied to the updater has been fixed
- Clearer error messages when a file can't be previewed or downloaded — you now see the specific reason (file missing, link expired, storage unavailable) instead of a generic "file not found"

---

## v0.99.26 (2026-06-26)

### Bug Fixes

- Fixed a startup issue where the desktop app could fail to launch with "Backend failed to start within 30s"; the backend now starts reliably

### Improvements

- The desktop app now asks your permission before adding Claude Code hooks to your projects (for real-time workspace status). Choose during onboarding, or toggle anytime in Profile → CLI. Nothing is written to your Claude Code config unless you allow it

---

## v0.99.25 (2026-06-21)

### New Features

- Explorer: Highlight active task in sidebar
- CLI: Added `path` as a queryable built-in field in `ud query`
- Skills now browsable in explorer API

### Bug Fixes

- Fixed large file (MP4) upload timeout in `ud sync resources`
- Fixed infinite loop when agent reply contains self-mention in comment threads
- Fixed empty state flash during task detail page reload

---

## v0.99.24 (2026-06-19)

### New Features

- CLI: Added `ud share` and `ud unshare` commands for managing group sharing on tasks, budgets, expenses, incomes, and accounts
- CLI: Added `ud patch resource` subcommand for updating resource properties
- Mobile: Search button added to floating action group
- Explorer: Manual refresh button in header
- Task navigation: Auto-navigate to previous task after deleting current

### Improvements

- Agent-to-agent comment thread reply routing with rate limiting

### Bug Fixes

- Improved comment reply notification readability
- Fixed explorer live refresh not handling path field changes correctly

---

## v0.99.23 (2026-06-18)

### New Features

- Task status icon in conversation sidebar is now clickable for quick status changes

### Bug Fixes

- Fixed conversation detail header buttons showing redundant text labels
- Fixed status dropdown in conversations being obscured by overlapping elements

---

## v0.99.22 (2026-06-18)

### New Features

- **Unified Explorer**: Tasks and resources merged into a single tree with drag-and-drop and folder operations for all node types
- **Incremental Sync**: Explorer uses IndexedDB cache and syncs only changes for faster loading
- **Unfiled Section**: Items without a folder path are grouped in a dedicated "Unfiled" area
- **Explorer Context Menu**: Right-click to create new Diagrams, Dataflows, and Sheets directly
- **Code File Preview**: Inline preview for JSON, JS, CSS, XML, and other code/data files
- **Reveal in Explorer**: Quickly locate both tasks and resources in the explorer tree
- **Task Status Icons**: Tasks in the explorer tree display their status icons
- **Note Node Styling**: Style panel for dataflow Note nodes with color presets and font size
- **Focus Window Button**: Workspace session controls include a focus window button
- **Resend Init Button**: Resend the initialization prompt in workspace sessions

### Bug Fixes

- Fixed explorer not auto-syncing when tab regains focus
- Fixed right-click inside folder content using the wrong path
- Fixed explorer context menu hidden behind panels

---

## v0.99.21 (2026-06-16)

### New Features

- **Dataflow Kubernetes Icons**: Added 22 K8s resource icons (Pod, Deployment, Service, Ingress, CRD, etc.) with group presets for Cluster, Namespace, and Node
- **Dataflow Sequence Icons**: New numbered circle icons (1–20) for indicating steps and ordering in diagrams
- **AI Chat Comment Management**: AI assistant can now create, edit, and delete task comments directly
- **Floating AI Chat Popup**: Open AI chat as a floating window when the sidebar is collapsed

### Improvements

- Monospace font for Note nodes in the dataflow editor for better readability
- Faster page rendering with optimistic updates and stale-while-revalidate caching

### Bug Fixes

- Fixed style panels not following nodes/edges during drag in the dataflow editor
- Fixed skill/prompt picker being hidden behind the floating conversation panel
- Fixed race condition in terminal session output restore

---

## v0.99.20 (2026-06-15)

### New Features

- **Dataflow Shape Nodes**: Added shape node with 8 geometric variants — rectangle, rounded rectangle, circle, diamond, parallelogram, hexagon, triangle, and cylinder
- **Dataflow Pipe Styling**: Customize pipe/connection colors, width, dash patterns, and animated flow effects
- **Unsaved Changes Warning**: Dataflow editor now warns before navigating away with unsaved changes
- **Resource Preview**: Click resources to preview inline instead of downloading
- **Explorer Sidebar**: Explorer is now a toggleable sidebar for quick access
- **Workspace Thread Binding**: @mention-triggered workspace sessions now bind to threads immediately

### Improvements

- Resource nodes accept all file types, not limited to images

### Bug Fixes

- Fixed style panel clicks causing node deselection in dataflow editor
- Fixed mobile keyboard dismissing buttons and popovers
- Fixed missing back button in desktop sidebar conversation view

---

## v0.99.19 (2026-06-14)

### New Features

- Added new conversation button (+) in the conversation sidebar — start new conversations with agents or self without leaving the panel
- Added skill & prompt picker in compose view — quickly insert skill references when talking to agents

### Improvements

- Collapsed navigation sidebar now opens the conversation panel directly instead of navigating to the full page
- Conversation sidebar loads instantly from cache with background refresh

---

## v0.99.18 (2026-06-14)

### New Features

- Mobile floating conversation switcher: slide-in panel with filters, session status badges, and quick thread switching
- Conversation popup mode: view and reply to threads in a floating panel without leaving the current page
- Conversation threads sorted by last activity time (including reply timestamps)

### Improvements

- Workspace toggle button stays visible when popover is open
- Floating edge buttons unified into a shared component with automatic stacking and consistent sizing

---

## v0.99.17 (2026-06-14)

### New Features

- Recycle bin: view deleted task details and permanently delete
- `ud tree` command for visualizing task hierarchies as a tree
- `ud get task -l <tag>` tag filtering and `ud get tags` aggregation view
- CLI access to soft-deleted tasks

### Bug Fixes

- Pagination footer now more prominent with --page/--all hints

---

## v0.99.16 (2026-06-14)

### New Features

- Table editor overhaul: Google Sheets-like UX with cell selection, keyboard navigation, drag select
- Multi-sheet workbook support
- Boolean checkbox and date column types
- Column width drag resize
- Excel paste, Markdown copy/export, and clipboard support
- Right-click context menu and row height adjustment
- Selection enhancements: Ctrl+A, column select, range perimeter border

### Bug Fixes

- Fixed row height jumping when entering edit mode
- Fixed cell outline color and cursor visibility issues
- Eliminated double border artifacts in cell selection

---

## v0.99.15 (2026-06-13)

### New Features

- Support updating resource metadata via `ud apply`
- Workspace sessions now available as CLI resource type (`ud get workspace-session`, `ud describe workspace-session`)
- File-based sync lock to prevent concurrent access conflicts

### Bug Fixes

- Fixed resource preview not rendering on full-screen resource page
- Fixed folder move action not working in file browser
- Fixed comment change notifications not being delivered

---

## v0.99.14 (2026-06-12)

### New Features

- Explorer sidebar now loads all tasks, showing the complete folder tree regardless of task count
- CLI: New `ud patch task --path` command to quickly move tasks into virtual folders (e.g. `ud patch task abc123 --path docs/design`)

### Improvements

- CLI auto-prepends leading `/` to path arguments, making the command more forgiving

---

## v0.99.13 (2026-06-12)

### New Features

- Entity protocol links (e.g. `task://`) in comments and conversations are now clickable
- Pinned tasks now appear in the conversation sidebar
- CLI: New `ud cook` command (cookbook recipes for all 15 API resources) and `ud patch` command (with comment `--status` support)

### Bug Fixes

- Fixed comment anchor highlight not working (clicking a comment link now correctly scrolls and highlights the referenced comment)
- Fixed CLI `bind task --project` sending wrong JSON field name

---

## v0.99.12 (2026-06-09)

### New Features

- Conversations now appear next to AI Assistant in sidebar, with a new "AI vs Conversations" doc page
- CLI: New `ud get resource` and `ud describe resource` commands with date filtering (`--since`, `--before`)
- CLI: Local-sync is now a built-in agent, with `--create-dir` and `--create-project` flags

### Bug Fixes

- CLI: Resource table now shows full UUIDs instead of partial IDs

---

## v0.99.11 (2026-06-09)

### New Features

- Added `-o apply` flag to all `ud get` commands and `ud describe comment/income` for direct apply-compatible output, enabling easier piping and automation

### Bug Fixes

- Fixed agent mention dropdown not refreshing properly due to stale-while-revalidate caching

---

## v0.99.10 (2026-06-09)

### New Features

- Notes can now be accessed by note ID alone — no need to specify the parent task ID for read, update, or delete operations
- New `ud describe note` command to view note details and export in apply-compatible format

### Improvements

- Simplified `ud delete note` to accept just a note ID instead of requiring both task ID and note ID

---

## v0.99.9 (2026-06-07)

### New Features

- Resource preview now supports .dataflow.json file format
- Double-click to edit task title (single-click on mobile)
- Paste image and file upload in task comment sidebar
- New builtin dataflow-creator agent

### Improvements

- Mobile conversations page UX: wider chat bubbles, hidden tags and external link button
- Mobile resource detail: nav buttons in separate row, single-click title editing
- Admin config nav pills scrollable on mobile
- Conversation header shows only status icon for cleaner look

### Bug Fixes

- Fixed taskId reference error in task comments

---

## v0.99.8 (2026-06-05)

### New Features

- File upload support in conversation reply and compose windows
- Conversation links: render conversation:// links and copy comment IDs for cross-referencing
- Task status selector in conversation thread header
- @mention support in conversation reply window
- Paste resource:// URI to create resource nodes in dataflow diagrams

### Bug Fixes

- Fixed mention dropdown opening direction in conversation reply
- Fixed resource node missing default dimensions preventing image rendering
- Fixed feature toggle not appearing in admin system config page

---

## v0.99.7 (2026-06-03)

### New Features

- Elements Panel: new architecture diagram capabilities
  - Icon nodes with built-in AWS, Azure, and Lucide icon libraries in a 2-level sidebar
  - Icon style customization: SVG stroke, fill, and border colors
  - Enhanced group nodes with icons, style presets, and nested group support
  - Architecture import format (Format A+) with nested groups
- Admin toggle for public task sharing
- Inline HTML resource rendering via resource:// protocol in markdown with auto-sizing, download button
- Task selector in workspace run dialog
- Exec button on task detail page

### Bug Fixes

- Fixed group z-index and drag behavior in dataflow
- Fixed icon SVG stroke color rendering
- Fixed mouse wheel scrolling in task selector dropdown
- Fixed HTML embed height issues

---

## v0.99.6 (2026-06-02)

### New Features

- AI chat now supports file attachments and voice recording input
- AI chat messages persist across page navigation — no more lost conversations

### Improvements

- Improved HTML resource preview with sandboxed rendering
- Cleaner AI chat interface with more space for conversations

### Bug Fixes

- Fixed resource preview being cut off by parent containers
- Fixed divider buttons overlapping with modals
- Fixed misaligned icons in chat input area

---

## v0.99.5 (2026-05-31)

### New Features

- Added `ud get income` command for querying income records from the CLI

### Bug Fixes

- Fixed agent-to-agent @mention delegation not working correctly in workspace sessions

---

## v0.99.4 (2026-05-31)

### New Features

- Community Skill Registry: browse, install, and share skills via `ud market` commands

### Improvements

- Mobile task detail: simplified bottom bar by moving pin and check-in into the More menu

### Bug Fixes

- AI chat input now auto-focuses when opened via Ctrl+J for immediate typing
- Fixed conversation popup displaying sidebar and extra UI instead of just the chat window

---

## v0.99.3 (2026-05-30)

### New Features

- AI chat pop-out window with Ctrl+J shortcut
- Pop-out button for conversation thread view
- Ctrl+K shortcut to focus main window
- Markdown Embeds documentation page

### Improvements

- Task detail right sidebar stays sticky on scroll
- Outline navigation targets visible elements correctly

### Bug Fixes

- Fixed todolist item path field not persisting on update
- Fixed tooltip display on AI talk page
- Updated pop-out icon to ExternalLink for clarity

---

## v0.99.2 (2026-05-30)

### New Features

- Mobile collapsible layout: Task detail and explorer pages now have collapsible sections (Session, Comments, Description, Notes, Details) with a Comments button in the bottom action bar
- AI chat suggestions: Onboarding prompts with randomized topic pool for AI assistant conversations
- Agent comment threads: Agent conversations now use comment threads instead of task description
- Scheduled jobs: Schedule agent tasks with new CLI commands and builtin skill
- Dataflow set operations: JSON field set operations (union, intersection, difference, complement)

### Improvements

- Comment status model: "Annotated" is now a final state (same level as "Resolved") for notes that don't need resolution
- Conversation page defaults to showing unresolved threads

### Bug Fixes

- Fixed AI chat message overflow on mobile screens
- Fixed workspace session reappearing after stop due to SSE race condition
- Removed duplicate Reply button in comment threads
- Fixed divider lines showing for hidden sections on mobile

---

## v0.99.1 (2026-05-28)

### New Features

- Star threads: Gmail-style star to bookmark important conversations
- Prompt & skill picker added to conversation thread input
- Optimistic update for conversation resolve toggle
- Workspace control strip in conversation thread view
- Mobile sidebar toggle for explorer page

### Improvements

- Conversation filter bar is now horizontally scrollable
- Conversation threads auto-refresh on new comment events (SSE)

### Bug Fixes

- Fixed infinite loop in CommentFeed from preference store selector
- Fixed explorer sidebar toggle overlapping with main sidebar toggle

---

## v0.99.0 (2026-05-27)

### New Features

- Explorer view: new 3-column layout with virtual folder tree, drag-to-move, and context menus
- Task paths: tasks now support hierarchical paths for folder-based organization
- AI Talk landing page: AI Talk replaces the dashboard, unified with /commands and @agent mentions
- Conversations: comments page upgraded to conversations with chat bubble UI
- Image paste in conversations: paste images directly to upload as a resource
- Inline resource images: resource:// images render inline in conversation messages

### Improvements

- Task detail page: full-width layout with actions consolidated into overflow dropdown
- Auto-switch to comments sidebar when adding a comment
- Description editor fills full container height
- Login page loads instantly using cached tier info

### Bug Fixes

- Fixed explorer path handling, command autocomplete, and prefix matching
- Fixed chat hint display with /commands and @agent
- Fixed comment count badge clipping
- Fixed first-visit tier detection

---

## v0.98.1 (2026-05-26)

### Improvements

- Comment status upgraded to three states: open/resolved/annotated for finer discussion management
- Comments page now updates in real-time via SSE — no manual refresh needed
- Selected comment thread persists in URL — page refresh preserves your position
- Thread-linked workspace session status badges are now more reliable (backed by server-side binding data)
- Workspace dialog CWD display aligned with backend resolution

---

## v0.98.0 (2026-05-26)

### New Features

- User avatars: set and display profile pictures across the app
- Dashboard focus view: quickly resume your last visited task
- Dataflow diagram: undo/redo support with toolbar buttons
- Dataflow diagram: paste plain text to create note nodes
- Drag-to-reorder fields in JSON nodes

### Improvements

- Agent mentions now include comment content for better context

### Bug Fixes

- Fixed workspace monitor tile rendering with correct session keys
- Removed artificial 9-session limit from workspace monitor
- Agent users no longer count toward loginable user limit

---

## v0.97.4 (2026-05-26)

### Improvements

- Image paste in canvas now shows a placeholder immediately with upload loading state
- After sending agent instructions, automatically navigates to the new task
- Agent session status now visible in comment thread feed
- "No daemon available" hint shown in send instructions dialog

### Bug Fixes

- Fixed legacy 'image' type canvas nodes not rendering correctly
- Fixed duplicate agent instruction requests when clicking send button rapidly
- Fixed agent list not refreshing when opening send instructions dialog

---

## v0.97.3 (2026-05-25)

### Improvements

- Added inline resolve button to comment feed sidebar for quicker resolution
- Added "Resolved" filter tab to comments page to view resolved threads
- Added reply button alongside resolve in comment thread footer

### Bug Fixes

- Fixed error toast import path

---

## v0.97.2 (2026-05-24)

### New Features

- Added duplicate button on the agent detail page to quickly create a copy of an existing agent
- Comment threads now use thread-level session routing for more accurate and contextual AI responses

---

## v0.97.1 (2026-05-23)

### New Features

- Workspace Run Dialog now shows the source of the resolved working directory (board, project, task, or default)

### Bug Fixes

- Comment SSE notifications now reach the task owner, not just the commenter
- Agent display names resolve correctly in comments and UI
- Workspace CWD correctly falls back to `~/.undercontrol/workspace` instead of showing broken paths
- Agent sessions with AgentCLI now properly deliver the initial prompt
- Workspace prompt delivery is more reliable (pattern-based detection replaces fragile debounce)
- Mentions in task descriptions are now parsed on creation
- Board and project selection are properly decoupled in workspace launcher

---

## v0.97.0 (2026-05-22)

### New Features

- New Workspace and Send Instructions shortcuts in sidebar
- Send Instructions button on agent detail page
- Agent Creator is now a builtin skill, available out of the box
- CLI: `-o apply` flag on `describe` commands for round-trip YAML export
- CLI: grouped command help output for better discoverability
- CLI: Daemon and AgentCLI are now managed resources with get/describe/delete

### Bug Fixes

- Default to Unresolved tab in comments page
- YAML parser now handles `---` inside block scalars correctly

### Upgrade Notes

- `ud get entity` renamed to `ud get entity` (old command removed)
- `ud daemon` renamed to `ud run-as-daemon`
- `ud apply note` subcommand removed
- Markdown-based apply for Skills, Prompts, AgentCLI removed (YAML only)

---

## v0.96.2 (2026-05-21)

### Improvements

- Workspace arguments are now resolved server-side for improved reliability
- Fixed agent CLI command resolution in local Electron desktop app

---

## v0.96.1 (2026-05-21)

### Improvements

- Desktop app now identifies each device by hardware UUID, enabling accurate per-device daemon management.

### Bug Fixes

- Fixed daemon connection incorrectly targeting the first registered device instead of the current one.

---

## v0.96.0 (2026-05-20)

### New Features

- **Agent Workspace Sessions** — Launch AI agent workspace sessions directly from the CLI with `ud apply workspace`, or from the UI via any workspace launcher.
- **Built-in Agents** — Two built-in agents (`@ud` for task management with skill discovery, `@agent-creator` for creating new agents) are auto-seeded on startup.
- **Prompt Preview** — Preview the fully assembled prompt before launching a workspace — see exactly what the AI agent will receive.
- **Spawn Workspace Skill** — New built-in skill enables agents to spawn additional workspace sessions.

### Improvements

- Workspace daemon selection is now optional — simpler startup flow.
- Agent configuration UI redesigned with a clearer two-column layout.
- Agent sessions reuse existing terminal windows instead of creating duplicates.

### Bug Fixes

- Fixed workspace project resolution for prefix/name matching and CWD overrides.
- Entity ID validation now correctly requires full UUIDs for project and daemon IDs.

---

## v0.95.0 (2026-05-18)

### New Features

- **Quick Note @mention agents** — Type @agent in Quick Note to send commands to AI agents.
- **Dedicated Agents page** — New "AI Agents" navigation entry for managing agent configurations.
- **Agent config enhancements** — Skills picker (badge-chip UI) and workspace defaults (daemon, tags, board, project).
- **Comment deletion** — Delete button in comments thread view.
- **CLI verb-first commands** — New `bind`, `unbind`, `link`, `unlink`, `grep` commands replacing old resource-first syntax.

### Improvements

- Renamed "Agent" to "Agent CLI" in workspace run dialog for clarity.

### Bug Fixes

- Fixed agents page navigation i18n key.
- Fixed deprecated CLI command references in docs and frontend.

---

## v0.94.0 (2026-05-18)

### New Features

- **AI Agents** — Create custom AI agents with prompts, skills, and triggers. Agents run workspace sessions with delegated access — select them in the "Run as" dropdown when starting a workspace.
- **Agent @mentions** — @mention custom agents in private tasks (not just group tasks). The mention dropdown shows built-in @ud and all owned agents.
- **Agent management page** — New "AI Agents" section in Workspaces settings for creating, editing, and deleting custom agents.
- **CLI agent management** — Manage agents via `ud get agents`, `ud describe agent`, `ud apply agent`, `ud delete agent`.

### Improvements

- Default Agent CLI selector moved into Custom Agent CLIs section for a cleaner layout.

### Bug Fixes

- Fixed mobile scroll in Skills/Prompts/History popovers.

---

## v0.93.3 (2026-05-17)

### Improvements

- **Session mention labels** — @mentioning a workspace session in comments now shows the user name and task title (e.g., `alice · Fix auth bug`) instead of a cryptic session ID. Session mentions now work in all comment inputs, not just the rich text editor.

### Bug Fixes

- Workspace session tokens now last 7 days instead of 1 hour, preventing authentication loss during long work sessions.

---

## v0.93.2 (2026-05-17)

### Bug Fixes

- Fixed workspace terminal authentication failure when the desktop app connects to a remote server. CLI commands in workspace sessions now work without needing a `--context` flag workaround.

---

## v0.93.1 (2026-05-17)

### Bug Fixes

- CLI `whoami` command now correctly respects the `--context` flag priority over environment variables.
- Desktop: Fixed PTY spawn failure by auto-rebuilding node-pty after npm install.

---

## v0.93.0 (2026-05-16)

### New Features

- **@workspace session mentions** — Mention active workspace sessions directly in comments to send input to the running session, without targeting a specific user. The mention menu shows both members and active sessions.
- **Daemon injects backend URL** — Workspace PTY environment now has the backend URL auto-injected by the daemon, ensuring CLI commands within sessions connect to the correct server.

### Bug Fixes

- CLI `--context` flag now takes priority over `UD_*` environment variables, allowing you to target a different server from inside a workspace session.

---

## v0.92.0 (2026-05-16)

### New Features

- **Knowledge graph exploration** — New `ud graph` command for visualizing task connections and knowledge base relationships.
- **Auto-updater CDN source switching** — Desktop client can now switch between R2 and Bitiful CDN for updates (Settings > About).
- **Manual update checking** — Check for desktop app updates manually from the Electron client.

### Improvements

- Workspace terminal output cache now uses a memory-capped ring buffer, evicting the oldest session first when the cap is reached.

### Bug Fixes

- CLI `--context` flag now correctly overrides workspace environment variables, allowing you to target a different server from inside a workspace session.
- Auto-updater now has a 15-second timeout to prevent infinite spinning when the update server is unreachable.
- Workspace init simplified — daemon uses its own backend URL instead of receiving it from the frontend.

---

## v0.91.0 (2026-05-16)

### New Features

- **Built-in @ud agent** — Workspace sessions now use a built-in soul prompt for smarter AI-assisted task execution.
- **Multi-session list** — New multi-session list UI in task detail sidebar, showing all linked workspace sessions.
- **Comment resolve/unresolve** — Resolve and unresolve buttons added to comment thread view.
- **Window type color coding** — Color-coded left border for different window types in workspace picker.
- **Session creator indicator** — Bot/User icon shown across all session views to identify who created each session.
- **`ud whoami` command** — New CLI command for auth diagnostics and troubleshooting.

### Improvements

- Main window title now shows "Main Window: \<page name\>" for better clarity.
- Agent sessions now properly inject auth tokens and API URL.

### Bug Fixes

- Agent reply templates no longer show "wk:" prefix.
- Comment creator correctly shows agent identity instead of delegated human user.
- Agent prompts correctly placed in user prompt position.
- Fixed infinite re-render from Zustand selectors returning new object refs.
- Fixed agent session initialization with empty commands.

---

## v0.90.0 (2026-05-14)

### New Features

- **Comments feed page** — New cross-task comment feed with threaded discussions and inline replies.
- **Projects page** — Standalone projects page with list-detail layout, showing linked tasks per project.
- **Task-project linking** — Project picker in task detail view to link tasks to projects.
- **Local directory project linking** — Link local directories to projects via `ud.projects` file.
- **Collapsed sidebar menu** — Collapsed sidebar shows expandable chevron for hidden navigation items.
- **License info in admin** — License expiry warning banner and license info section in System Config.
- **Tag length increase** — Tags can now be up to 50 characters (previously 20).

### Bug Fixes

- Thread replies reset properly when switching between comments.
- Comment feed shows individual threads instead of grouping by task.
- Replies filtered from comment feed — only top-level threads shown.

---

## v0.89.0 (2026-05-13)

### New Features

- **Agent workspace sessions** — @ud mention on tasks now auto-initializes a workspace session running Claude Code, enabling AI-assisted task execution.
- Admin user management page now shows user types (human vs agent).

### Bug Fixes

- @ud agent is now always mentionable on private tasks (no longer requires group membership).
- Daily note carry-over no longer adds an unwanted "Carried Over" heading.
- Daily note carry-over now preserves original indentation of items.

---

## v0.88.4 (2026-05-12)

### New Features

- @workspace mention now works in task descriptions and notes (previously comments only).
- Quick notes can now be saved empty with an automatic datetime title.

### Bug Fixes

- Fixed anchored comments from notes showing wrong section and color.
- Fixed @workspace replies in descriptions/notes incorrectly appearing as anchored comments.

---

## v0.88.3 (2026-05-11)

### Bug Fixes

- Fixed workspace terminal window occasionally crashing on launch.

---

## v0.88.2 (2026-05-11)

### Improvements

- Workspace dialog board selector now shows all boards with grouped display.

### Bug Fixes

- Kanban search now supports short ID prefix matching.
- Sidebar elements are properly dimmed when dialog overlay is open.
- Fixed skills page scroll on mobile.
- Fixed missing /v1 in localfs presigned URL paths for self-hosted file access.
- Fixed @mention background styling in comments.
- Fixed comment anchors incorrectly marked as missing due to highlight timing race.

---

## v0.88.1 (2026-05-10)

### Bug Fixes

- Fixed SQLite database migration errors that could occur during upgrades for self-hosted users.

---

## v0.88.0 (2026-05-10)

### New Features

- **Task Comments** — Add threaded comments to tasks with replies, resolve/unresolve, and real-time sync. Quote text from description or notes to create anchored comments that highlight the referenced content.
- **@User Mentions** — Mention teammates in comments with `@username`. Mentioned users receive notifications.
- **Keyboard Shortcut** — Press Cmd/Ctrl+Enter to quickly submit comments, replies, and edits.
- **Notification Badge** — See unread notification count on the user icon when the sidebar is collapsed.
- **AI Assistant Tools** — Chat with the AI assistant to update tasks, create notes, update descriptions, and link tasks directly from the conversation.
- **Welcome Board** — New users get a starter board with a sample task to help them get started.
- **Group Budgets & Expenses** — Budgets and expenses now support group ownership for team collaboration.

### Improvements

- Skills list refreshes automatically after external changes in the workspace prompt picker.
- Dark mode highlights use brighter colors for better readability.
- Stale anchor indicator shown when quoted comment text is no longer found in content.

### Bug Fixes

- Fixed docs page header being hidden behind iOS Safari chrome after navigation.
- Fixed board membership check for shared boards with scope tags.

---

## v0.87.0 (2026-05-09)

### New Features

- **Workspace launcher board selector** — Board selector added to the global workspace launcher with cross-window shortcut
- **Cross-window sync** — Workspace windows now sync state in real-time via BroadcastChannel
- **AI assistant board integration** — AI assistant automatically adds tasks to the board when board context is provided

### Improvements

- AI chat can now correctly find tasks by ID
- Updated AI chat suggestion hints for better task tool discovery
- Run dialog now fetches latest skills when opened

### Bug Fixes

- Fixed skills not refreshing in the Run dialog

---

## v0.86.0 (2026-05-08)

### New Features

- **Dashboard editor action bar** — Action bar defaults to expanded for better editing experience
- **Custom scrollbars** — Dashboard editor uses OverlayScrollbars for a smoother look
- **Welcome guide** — New users get a welcome guide seeded in the dashboard editor after onboarding

### Improvements

- Dashboard editor uploads images to server instead of base64 inline
- Auth system upgraded to stateless OIDC-aligned architecture with zero DB queries per request

### Bug Fixes

- Fixed clear button confirmation dialog styling and interaction
- Fixed mobile editor viewport height and scroll issues
- Fixed dashboard switcher visibility on mobile browsers
- Fixed dashboard view switcher being pushed by content instead of staying fixed at bottom

---

## v0.85.2 (2026-05-08)

### Bug Fixes

- Fixed duplicate SSE connection in workspace windows
- Improved token refresh stability
- Fixed UserCreated event retention to persist indefinitely

---

## v0.85.1 (2026-05-06)

### Improvements

- Refined dashboard layout with 6-pillar grid homepage restructure
- Save button on floating toolbar now highlighted in primary color for better visibility
- Improved mobile voice recording UI
- Remembered password now encoded in base64 for better security

### Bug Fixes

- Fixed nested scroll container breaking editor height
- Fixed dashboard editor not filling available height in Electron
- Fixed focus not returning to terminal after prompt picker closes
- Fixed incorrect audio hint text about combined audio+text support
- Fixed legacy plaintext remembered password handling

---

## v0.85.0 (2026-05-06)

### New Features

- **Dashboard AI chat** — AI chat integrated into the dashboard with AI provider selector
- **Dashboard view switching** — Simplified dashboard with workspace-style switching between editor and chat, with floating save toolbar
- **All-in-One Docker deployment** — Single Docker image for easier self-hosted deployment
- **Delete budget/account** — Delete buttons with confirmation dialogs on budget and account pages
- **Global Error Boundary** — React Error Boundary prevents white-out page crashes

### Improvements

- Error boundary navigates to dashboard instead of full page reload
- Contact link added to error boundary page for easier support

### Bug Fixes

- Fixed AI provider selector not showing with a single provider
- Fixed AI providers loading without needing to open floating chat window
- Fixed keyboard shortcut hint visibility in dashboard chat view
- Fixed editor/chat flicker on view switch
- Fixed dashboard view switching height issues
- Fixed terminal losing focus after selecting a prompt

---

## v0.84.0 (2026-05-03)

### New Features

- **Floating content window** — Pin document content as an always-on-top window in the desktop app for easy reference
- **Workspace prompts sync** — Prompts are now stored on the server and synced across devices (migrated from local storage)
- Task sharing now includes the task title in the share message

### Bug Fixes

- Fixed floating viewer button placement — moved from bubble menu to the floating actions toolbar
- Fixed input method (IME) state preservation when viewing content in TiptapViewer

---

## v0.83.0 (2026-05-02)

### New Features

- **AI Quick Create** — Create tasks using voice recording with audio transcription, accessible from the sidebar
- **Inline audio player** — Play audio files directly in the resource preview dialog
- **AI Provider capabilities** — Configure chat/vision/transcription capabilities per provider; system automatically selects provider based on capabilities
- **Real-time task sync** — Other tabs/clients instantly see newly created tasks via SSE
- **Daemon selection preference** — Prefers online daemons and remembers your last selection

### Improvements

- Collapsed sidebar quick actions use a more compact 2-column grid layout

### Bug Fixes

- Fixed board view not updating correctly on SSE task_created events
- Fixed transcription using wrong model/language settings
- Fixed AI provider form losing draft when accidentally dismissed
- Fixed test connection using wrong endpoint for transcription-only providers
- Fixed vision-to-task status format producing invalid status values

---

## v0.82.2 (2026-05-01)

### Bug Fixes

- Fixed workspace monitor terminal display — tiles now properly fit their container with horizontal scrolling support for wide content

---

## v0.82.1 (2026-05-01)

### Bug Fixes

- Fixed register/reconnect button not always showing for local daemon connections
- Fixed command encoding using incorrect platform when no remote daemon is selected

---

## v0.82.0 (2026-05-01)

### New Features

- **Monitor Page** — New multi-session TTY dashboard with 3×3 grid layout and full-viewport focus mode
- **Grid Navigation** — Arrow keys and Enter for navigating between session tiles, click-to-select with session controls
- **Session Controls** — Collapsible screenshot, arrow key, and Enter signal buttons; hidden in focus mode for more terminal space
- **Quick Actions** — New session buttons on monitor and workspaces pages, settings button for quick navigation
- **Local Daemon** — Added local daemon execution option in execution dialogs

### Bug Fixes

- Fixed task creation with selected text — now uses selected text as description, first characters as title
- Fixed click propagation on controls causing unintended tile deselection
- Fixed i18n key for create task button label and toast

---

## v0.81.1 (2026-05-01)

### Improvements

- Improved real-time sync stability — daemon SSE connections now properly handle duplicates and prevent reconnect loops

---

## v0.81.0 (2026-04-30)

### New Features

- **Projects management** — create, edit, and delete projects; link them to boards and workspaces as working directories
- **Project selector** — choose a project in board settings, execution dialog, and global workspace launcher (Cmd+E)
- **Project CLI support** — manage projects via `ud project get/describe/apply/delete` commands
- **Skills section** — workspace page now includes a Skills area with sidebar navigation link
- **Workspace page redesign** — sidebar navigation layout, consistent with the profile page
- **Auto daemon registration** — idempotent registration on startup, no manual action needed

### Improvements

- Board selector always visible with "None" option, easily resettable
- Explicit CWD input in execution dialog with auto-preselection from board's linked project
- Default agent dropdown shows resolved name (e.g., "Default (Claude Code)")
- Project dropdown shows only project name, not full path
- Hide Register button when device already has a daemon, show short ID
- "This device" badge and reconnect button on daemon list
- Configure links navigate to /workspaces instead of /profile

### Bug Fixes

- Fixed daemon SSE connecting to wrong machine
- Fixed stale daemon ID not cleared when daemon deleted externally
- Fixed reconnect button not triggering SSE stream reconnect

---

## v0.80.0 (2026-04-29)

### New Features

- **Knowledge graph enhancements** — toggle tag nodes on/off, clearer parent-subtask relationship visualization
- **Task navigation history** — Obsidian-style back/forward navigation for seamless jumping between tasks
- **Sidebar "More" section** — collapsible area housing Calendar, Graph, and Timeline views
- **AI chat improvements** — multi-keyword OR search, create_task and list_boards tools
- **Admin onboarding config** — configure the default landing page for new users after onboarding
- **Default user groups** — admins can auto-assign default groups to newly registered users
- **Global workspace shortcut** — Cmd+E to launch workspace from any page
- **Floating prompt picker** — prompt picker button pinned to workspace TaskPanel viewport

### Improvements

- Cleaner sidebar: Tags and Advanced Search moved to Cmd+K command palette
- Quick Actions replaced with a 2×2 shortcut grid
- Admin page consolidation: Users/Roles/Groups/Onboarding in one view
- Minimal icon badge styling
- Actionable suggestion buttons in empty AI chat state

### Bug Fixes

- Fixed invisible legend line color for parent/subtask links in graph view
- Fixed sidebar "More" section not foldable on secondary routes

---

## v0.79.0 (2026-04-28)

### New Features

- **Remote terminal streaming** — view workspace terminal output in the browser in real-time; late-joining viewers automatically receive recent output history
- **Terminal output caching** — terminal output is cached server-side, so refreshing the page restores your terminal view

### Improvements

- Clearer error message when uploading empty (0-byte) files

### Bug Fixes

- Fixed duplicate API calls on the skills page
- Fixed terminal display issues (column width, font size, horizontal scrolling, background color)

---

## v0.78.1 (2026-04-27)

### New Features

- **View mode switcher** — switch between tree, list, and kanban views on board pages

### Improvements

- Minimal view mode switcher design — icon-only, no border

### Bug Fixes

- Fixed status icon alignment with task title in saved query rows
- Fixed status icon not vertically centered in tree view
- Fixed layout rendering issues in conditional view modes

---

## v0.78.0 (2026-04-27)

### New Features

- **Three-column layout** — desktop task list now supports a three-column view with sidebar, list, and detail panes side by side
- **Tree panel quick create** — create tasks directly from tree panel column headers with inline editing
- **Inline navigation** — back/forward navigation within the task detail panel without leaving the page

### Performance

- Zero-lag task switching — cache-first rendering with progressive background refresh
- Optimized large list rendering with useDeferredValue and memo

### Bug Fixes

- Fixed token refresh race condition causing request failures after long sessions
- Fixed CLI upload failing on Windows with "Incorrect function" error
- Fixed storage usage endpoint crash when owner_id is short
- Fixed login page tier-info request blocking indefinitely (added 3s timeout)
- Fixed CLI section not showing install info on web (was desktop-only)
- Fixed trailing slash in API base URL causing CLI request errors
- Fixed columns not scrolling independently in three-column layout
- Fixed data migration tool compatibility for v0.55.0 → v0.77.1 upgrades

### CLI Improvements

- Added kubectl-style usage examples and --context flag documentation to all commands

---

## v0.77.1 (2026-04-26)

### Bug Fixes

- Fixed a crash that could occur when SQLite encountered malformed JSON in task metadata
- Fixed shareable links incorrectly using the browser's URL instead of the configured frontend URL

---

## v0.77.0 (2026-04-26)

### New Features

- **Board name editing** — rename boards directly in board settings
- **Mobile workspace switcher** — floating trigger for quick workspace switching
- **Kanban advanced filters** — IS NULL / IS NOT NULL operators for custom fields
- **PowerShell preview** — human-readable script display in command preview
- **Audit log TTL** — per-event-type retention for self-hosted deployments

### Improvements

- Redesigned landing page with orchestration diagram and Three Pillars section
- Better mobile experience with enhanced sidebar trigger transparency
- Faster note sync — skips unchanged writes using timestamp comparison

### Bug Fixes

- Checkbox toggle in view mode now properly saves to backend
- Workspace switcher no longer overlaps sidebar trigger on mobile
- Save-as-prompt button visible on mobile in history popover
- Fixed clipboard handling in workspace dropdown
- Command preview sections now scroll when content overflows

---

## v0.76.1 (2026-04-25)

### Bug Fixes

- Fixed custom field values being lost when dragging cards between kanban columns
- Fixed column removal dialog translation

### Improvements

- Replaced browser native confirm dialog with styled dialog for kanban column removal

---

## v0.76.0 (2026-04-25)

### New Features

- **Folder sharing** — share resource folders with groups, with cascading file access. Resource list now shows Group and Permission columns
- **Session skill selector** — reorganized session controls with a skill selector for quick access
- **Auto-expanding input** — session input area grows automatically with content, plus a clear (X) button

### Improvements

- Image sizes now persist correctly across markdown round-trips using Obsidian-compatible pipe format (`![alt|size](src)`)
- Cleaner session UI: shorter prompt/history labels, hidden scrollbar for single-line content

---

## v0.75.0 (2026-04-24)

### New Features

- **Dataflow pipe relationship markers** — pipes now support description labels and endpoint markers (arrow, one, many/crow's foot) for ER-diagram-style relationships
- **Terminal button creates task** — kanban terminal button auto-creates a task and initiates a workspace session
- **Session prompt history** — prompts can be saved to workspace prompt library for reuse
- **Workspace settings drawer** — workspace configuration moved from profile page to a settings drawer on the workspaces page

### Improvements

- Monitor icon now visible on kanban page for all clients (not just Electron)
- Board name shown in selector with resolved path displayed separately in CWD section
- Pipe markers refined: subtler sizes, better defaults, improved crow's foot direction

### Bug Fixes

- Fixed NoteNode drag during text selection
- Fixed reconciliation overriding awaiting_input status back to running
- Fixed CWD resolution for multi-board tasks in exec dialog

---

## v0.74.0 (2026-04-24)

### New Features

- **AI Chat tool calling** — the AI assistant can now search your tasks semantically during conversations
- **Multi-board tasks** — tasks can belong to multiple boards; board selector dropdown when opening workspaces
- **Workspace actions** — screenshot, interrupt, and check status directly from the workspaces page
- **File attachments in kanban preview** — view attached files without opening the full task detail
- **Dashboard edit mode** — cleaner interface for customizing your dashboard layout
- **Kanban list actions** — "Add to Board" and "Delete" buttons in the expanded list view

### Improvements

- Hooks now install automatically on all boards (no more per-board toggle)
- Workspace sessions transition optimistically from pending to running
- Custom field labels display with `cf.` prefix for clarity
- Resolved working directory shown in workspace dialog with copy support

### Bug Fixes

- Fixed checkbox toggle creating duplicate history entries
- Fixed CWD resolution fallback when no project directory is configured
- Fixed AI search tool query building for keyword searches
- Fixed migration error message to include environment variable instructions

---

## v0.73.4 (2026-04-22)

### New Features

- Share daemons with groups for workspace collaboration
- Show task title instead of raw ID in workspace sessions
- Multi-skill selection in exec dialogs

### Bug Fixes

- Fixed hooks ordering crash on task detail page
- Show empty state placeholder in workspace task panel when no content
- Copy full share message for existing links instead of just URL

---

## v0.73.3 (2026-04-22)

### Bug Fixes

- Fixed workspace screenshots appearing in attachment lists
- Screenshot button now shows a spinner while capturing
- Improved performance by reducing redundant API calls for resources

---

## v0.73.2 (2026-04-22)

### Improvements

- Workspace screenshots now display in a dedicated scrollable gallery with highlight animation
- Workspaces moved to the Tasks section in the sidebar for quicker access

### Bug Fixes

- Fixed editor bubble menu appearing when image or code block is selected
- Fixed images being auto-selected when opening the content viewer
- Sidebar navigation now preserves the selected board
- Fixed markdown checkbox toggling
- Fixed duplicate screenshot uploads in desktop app

---

## v0.73.1 (2026-04-21)

### Bug Fixes

- Fixed tier detection not working correctly in Electron desktop app and when using custom server URLs

### Improvements

- Server configuration page now displays the current tier name

---

## v0.73.0 (2026-04-21)

### New Features

- **Dashboard Widget Customization** — Hide or show dashboard widgets to personalize your workspace
- **Poster Name in Task Notes** — Task notes now display the poster's name for better attribution

### Bug Fixes

- Fixed workspace window title not syncing with tracked task name
- Fixed heartbeat, stale session cleanup, and screenshot upload issues in workspace
- Fixed missing stop button for pending workspace sessions on mobile
- Fixed excessive session polling causing unnecessary API calls

---

## v0.72.1 (2026-04-20)

### New Features

- **Mobile Workspace Shortcut** — Access workspace sessions directly from the task bottom action bar — quickly scroll to an active session or start a new one

### Bug Fixes

- Fixed daemon SSE connection reliability in desktop app — reconnection now works correctly after network interruptions

---

## v0.72.0 (2026-04-20)

### New Features

- **Workspace Screenshots** — Capture workspace window screenshots and attach them as task notes
- **Workspace Session Sidebar** — View workspace session status and duration in the task detail sidebar
- **Session Interrupt & Status Check** — New interrupt and check-status buttons for workspace sessions
- **Session Auto-Recovery** — Automatic session reconciliation on daemon reconnect
- **Daemon Rename** — Inline rename UI for daemon management

### Bug Fixes

- Fixed control character handling in terminal input
- Fixed daemon SSE stream premature disconnect
- Fixed incorrect daemon connection error code
- Fixed "Register this device" button incorrectly showing in web UI

---

## v0.71.0 (2026-04-19)

### New Features

- **Web Workspace Viewer** — View and manage AI agent workspaces directly from the browser
- **Daily Note Navigation** — Daily notes link to the previous day with auto pin/unpin
- **Remote Daemon Workspaces** — Desktop app connects to remote daemons for AI workspace orchestration via SSE
- **Workspace Status CLI** — New `ud workspace status` command to check workspace state
- **Workspace Input Relay** — Send user input to workspace PTY sessions
- **Mobile Kanban Menu** — Kanban header actions collapsed into hamburger menu on mobile

### Bug Fixes

- Fixed daemon connector authentication flow
- Fixed workspace status display for pending/completed/stopped states

---

## v0.70.0 (2026-04-18)

### New Features

- **Notification System** — Subscribe to tasks you care about and get notified when they change status or are updated
- **Daily Note** — Quickly create a daily note with automatic checkbox carry-over (Alt+D / Option+D shortcut)
- **Paste-to-Note** — Paste content anywhere on the task panel to append it to notes
- **"Create & Link" Button** — Create new tasks directly from subtask and linked task dialogs
- **Copy Resource Markdown Link** — Copy resource ID as a markdown link from all resource views
- **Outline Improvements** — Renamed outline with description as the first item for quick navigation
- **Pending Resource Management** — Interactive dialog replaces background cleanup with automatic stale resource removal

### Bug Fixes

- Fixed tag queries using an invalid operator
- Fixed macOS Alt key producing special characters instead of triggering shortcuts
- Fixed outline showing when no notes exist
- Improved paste hint styling with i18n support

---

## v0.69.2 (2026-04-16)

### New Features

- **AI Image to Markdown** — Convert images to markdown text using AI vision
- **Unified System Config Page** — All config categories in one scrollable view showing runtime values, env var names, and CLI flag names

### Improvements

- Board default columns: removed Draft column, moved Recent Created/Updated to end

### Bug Fixes

- Fixed mermaid diagram elements missing in fullscreen preview
- Fixed create task dialog size not aligned with task preview modal
- Fixed CreateBoardDialog default columns not matching backend defaults

---

## v0.69.1 (2026-04-16)

### New Features

- **Mobile Task Graph & Heatmap** — Calendar heatmap and knowledge graph now available on mobile list page
- **Default Board Columns** — Added "Recent Created", "Draft", and "Recent Updated" default columns with fold-all toggle
- **Exec Dialog** — Replaced kanban terminal dropdown with a more intuitive exec dialog
- **Editor Image Upload** — Added image upload button to markdown editor toolbar

### Improvements

- Renamed "Task Graph" to "Knowledge Graph" for clearer naming

### Bug Fixes

- Fixed white screen crash when using external toolbars
- Fixed graph fullscreen not working properly on mobile devices
- Fixed markdown editor toolbar positioning and z-index issues

---

## v0.69.0 (2026-04-15)

### New Features

- **Admin Storage Management** — New dedicated storage page in admin panel showing per-user storage usage and allowing individual quota overrides
- **Scope Tags** — Default Tags renamed to Scope Tags with automatic `board:` prefix auto-fill when creating new tags

### Improvements

- Shareable links now use configurable frontend URL, improving link sharing in Electron desktop app

### Bug Fixes

- Fixed dark mode flash on app startup — theme is now applied immediately from cache
- Fixed dark mode not applying to static loading screen
- Fixed dark mode theme not syncing across all Electron windows
- Fixed storage quota config not showing in admin system config page

---

## v0.68.1 (2026-04-14)

### New Features

- **AI Chat Quick Action** — Added AI chat shortcut to sidebar for faster access to the AI assistant
- **AI Language Adaptation** — Built-in AI skills now reply in the user's preferred language

### Improvements

- Redesigned Create Task Dialog with flat/minimal design language, improved tag input and padding alignment
- Dialog now uses 80% of viewport width and height for more editing space
- Mobile skill page uses master-detail layout with auto-hidden header bar when viewing details
- Mobile QuickNote toolbar moved to sticky top position with safe-area bottom padding

### Bug Fixes

- Fixed task creator showing the board owner instead of the actual requester
- Fixed username not resolving correctly across groups in share tooltips
- Fixed markdown content being cleared when resource URL resolution fails
- Fixed share links using incorrect domain in Electron
- Fixed resource group ownership when creating tasks on shared boards

---

## v0.68.0 (2026-04-13)

### New Features

- **Local Docker Deployment** — Ready-to-use docker-compose setups for self-hosted deployment with built-in `/api` nginx reverse proxy

### Bug Fixes

- Fixed Docker image requiring rebuild when changing API domain (now domain-agnostic)
- Fixed connection status indicator failing on unexpected server responses

### Upgrade Notes (Self-Hosted)

- New `deployment/docker-local-sqlite/` and `deployment/docker-local-postgres/` directories provide one-command docker-compose setups
- Docker frontend image no longer needs `VITE_API_URL` at build time — configure the API URL at runtime via nginx

---

## v0.67.2 (2026-04-13)

### New Features

- **Admin Skills Management** — Admins can now browse, edit, create, and delete system skills from the Admin panel
- **Built-in PM Skill** — New `ud-pm` system skill for batch PM review and task implementation

### Improvements

- Admin-customized system skills now persist across backend restarts

### Bug Fixes

- Fixed command preview not matching the actual executed command
- Fixed skill seeding issue on fresh installations

---

## v0.67.1 (2026-04-12)

### New Features

- Added `ud explain` command for viewing resource schema documentation directly from the CLI

### Improvements

- CLI skill commands now accept `skill`/`skills` aliases for all kubectl-style operations (get, describe, delete)

### Bug Fixes

- Fixed app crashes caused by localStorage QuotaExceededError on devices with limited storage

---

## v0.67.0 (2026-04-12)

### New Features

- **Skills Management** — New skills page for creating, editing, and managing reusable prompts and instructions with a WYSIWYG rich text editor. System-level built-in skills are visible to all users.
- **Pinned Tasks Dashboard Widget** — Pin important tasks and view them directly on the dashboard, with empty state guidance.
- **Agent CLI Command Preview** — See the exact command that will be executed before running an agent, with copy button and skill selector.
- **Agent CLI "Configure..." Option** — Quick access to agent configuration from all agent tool dropdowns.
- **Init Skill Support** — Agent CLI commands can now use init skills for workspace setup.

### Improvements

- Skill detail view with inline editing and read-only mode
- Side-by-side config + execute preview in agent CLI dialog
- Skill usage guidance shown in task detail view
- Right sidebar widened for full task ID display

### Bug Fixes

- Remove back/forward navigation buttons from main container
- Fix skill editor content scrolling and toolbar behavior

---

## v0.66.1 (2026-04-11)

### Bug Fixes

- Fix inline editor toolbar and floating action bar to restore correct floating style

---

## v0.66.0 (2026-04-11)

### New Features

- Inline invite code generation and deploy options on registration page
- Task status switcher in workspace window top bar
- Show created_by in task metadata section
- Links in workspace task panel open in new tab/window
- Kubernetes Helm deployment doc added to in-app docs

### Improvements

- Collapse metadata section by default on mobile task preview
- Redesign condition builder to stacked two-row layout
- Make kanban board selection lists scrollable

### Bug Fixes

- Improved registration UX for invite code flow and login redirect
- Redirect to dashboard instead of kanban after login
- Fix editor flash when entering/switching edit mode
- Fix editor toolbar and floating action bar positioning on mobile
- Fix onboarding skip button reliability
- Allow holding Ctrl+D/Ctrl+U for continuous fast scrolling
- Fix layout shift in kanban column condition editor
- Fix link routing in workspace task panel

---

## v0.65.3 (2026-04-10)

### Improvements

- Deployment pipeline improvements

---

## v0.65.2 (2026-04-09)

### Bug Fixes

- Internal stability improvements

---

## v0.65.1 (2026-04-09)

### New Features

- **China Mainland Download**: Added dedicated download button for users in mainland China

### Performance

- Eliminated flash when toggling to edit mode
- Deferred off-screen note editors for faster task page loading
- Fixed duplicate queries and N+1 issue for faster task detail loading
- Fixed 5-second navigation delay on task detail pages

### Bug Fixes

- Fixed mobile editor action bar overlapping with chat button
- Fixed editor toolbar frozen at left when scrolling horizontally
- Fixed toggle button not staying pinned when scrolling in editor
- Removed "Loading images..." indicator that caused layout shift on task navigation

---

## v0.65.0 (2026-04-08)

### New Features

- **Sidebar Outline Highlight**: Auto-track and highlight the active note section based on viewport visibility
- **Scroll-to-End Button**: Quick scroll-to-bottom button in the floating action bar
- **Keyboard Edit Shortcut**: Press `i` to enter Markdown edit mode (Vim-style insert)
- **Kanban in New Window**: Open kanban boards in a new Electron window
- **Image Size Controls**: S/M/L image size options in the TipTap editor
- **Dataflow Diagram Interaction**: Click to select/deselect nodes and edges in dataflow diagrams
- **Timer Commands**: `/timer` commands available in the command palette
- **Short ID Search**: Search tasks by short ID in the command palette
- **Mobile Toolbar Toggle**: Collapse/expand mobile editor toolbar with pinned image button
- **CLI `ud apply`**: Create resources from YAML files with `ud apply -f`, auto-detects notes
- **User-Defined Skills**: Store custom skills in the config directory

### Improvements

- **Task Detail Performance**: Lazy-loaded heavy components, deferred TipTap editors and note rendering, individual selectors — faster navigation and rendering
- **Simplified Timer**: Merged into single `/timer` command with toast feedback

### Bug Fixes

- Fixed tag suggestions overlapping the confirm button
- Fixed `i` shortcut editing the wrong section
- Fixed Mermaid fullscreen SVG flashing on zoom/scroll
- Fixed partial UUID search not working in command palette
- Fixed mobile editor toolbar not sticking to viewport bottom
- Fixed Ctrl+D/U Vim shortcuts scrolling the wrong container

---

## v0.64.0 (2026-04-07)

### New Features

- **Anthropic AI Provider**: Configure Anthropic as a backend AI provider alongside OpenAI, with simplified provider type selection
- **Task Switcher**: Quickly switch between tasks from the workspace window
- **Workspace Top Bar**: Shows status icon, task ID with copy button for quick reference
- **Vim Navigation**: Ctrl+D/U for half-page scroll, Ctrl+O/I for task visit history
- **Mermaid Fullscreen**: View mermaid diagrams in fullscreen mode
- **CLI Improvements**: `--folder` flag for uploads; `ud get` defaults to 20 results with pagination
- **Audit Cleanup**: Automatic audit log cleanup based on retention settings
- **Landing Page Redesign**: New "Private AI Butler" positioning with refreshed design

### Bug Fixes

- Fixed CLI upload folder path handling
- Fixed Chinese translation for API key expiry option
- Fixed task loading when not in local cache
- Fixed Ctrl+O/I to navigate task history instead of browser history
- Fixed landing page font weights

---

## v0.63.3 (2026-04-05)

### Improvements

- Real-time sync connections now auto-refresh every 30 minutes to prevent stale connections

### Bug Fixes

- Fixed real-time sync connections dropping unexpectedly
- Fixed task updates via real-time sync potentially causing data inconsistency

---

## v0.63.2 (2026-04-05)

### Bug Fixes

- Fixed task not refreshing when description is updated via SSE

---

## v0.63.1 (2026-04-05)

### Improvements

- Share message now uses code entry page URL with simplified sharing instructions
- "Open in new tab" replaces remote workspace action for easier multi-window workflow
- Redesigned login pages with refined flat minimal design and decorative guide lines
- Share message button is now more prominent and includes both sharing links
- Real-time updates now work in Electron workspace windows

### Bug Fixes

- Fixed find-in-page in desktop app: input losing focus after first character and stuck matches
- Fixed group invite links not being reusable (removed count limit)
- Fixed share message saying "content" instead of "task"

---

## v0.63.0 (2026-04-05)

### New Features

- Desktop: Find-in-page with Ctrl+F / Cmd+F
- CLI: New `ud local-sync` command with watch mode for real-time sync
- CLI: New `api-resources` command, enhanced help text
- CLI: `/task` alias routes and `X-UD-Channel` audit header
- CWD input field in ad-hoc execution dialog
- "Copy Share Message" button in share dialog
- Cmd+R shortcut to run task
- Restored Cmd+W close window shortcut

### Documentation

- Rewritten Quick Start page covering all entry points
- Rewritten Domain Language page with all app domains
- New Custom Clients doc page
- New Everything-as-Code doc page
- Task concept added to onboarding welcome task
- Reorganized docs sidebar structure

### Bug Fixes

- Fixed task detail sidebar height and scrollbar issues
- Fixed sidebar bottom items cut off on mobile
- Fixed docs sidebar not scrollable on mobile
- Fixed inline editor toolbar scrollable on mobile, removed popup editor
- Fixed global scrollbar CSS affecting xterm viewport
- Fixed dashboard charts -1 dimension warning
- Fixed dataflow node connection handles on fold/collapse
- Fixed parent sidebar items: click name navigates, chevron toggles fold
- Renamed "Run Ad-hoc" to "Run"

---

## v0.62.1 (2026-04-03)

### Improvements

- CLI: AI work sessions now record notes more frequently and promptly, ensuring knowledge and progress survive session interruptions

### Bug Fixes

- Fixed Windows desktop app icon background transparency

---

## v0.62.0 (2026-04-03)

### New Features

- Quick Note: Gmail-style popup with Ctrl+N shortcut, full-screen Markdown editor, sidebar entry, mobile FAB collapses on scroll
- Command Palette: SSE-based real-time cache invalidation, shows both Title/Grep search modes
- Window Management: Ctrl+Q shortcut to cycle between windows with MRU ordering
- Dataflow: resizable image/note nodes, "Copy for AI" export
- Global default AI agent setting
- "Back to App" button for authenticated users on public pages
- Updated app icons

### Bug Fixes

- Fixed command palette stale cache, task deletion cleanup
- Fixed Quick Note editor stability (tiptap lifecycle, mount guards)
- Fixed dataflow pipe delete button not working
- Fixed Markdown simplified URL rendering
- Fixed mobile FAB positioning
- Fixed Windows Codex launch path resolution
- Fixed dataflow node viewport placement

---

## v0.61.3 (2026-04-02)

### Bug Fixes

- Fixed task detail sidebar scrolling — sidebar is now independently scrollable with hidden scrollbar

---

## v0.61.2 (2026-04-02)

### Improvements

- CLI: `ud describe task` output now clarifies it already includes all notes

### Bug Fixes

- AI provider configuration now defaults to OpenAI-compatible type and no longer auto-fills endpoint URLs

---

## v0.61.1 (2026-04-02)

### Improvements

- AI: configure AI providers directly from AI-powered panels without navigating to settings

---

## v0.61.0 (2026-04-02)

### New Features

- Dataflow: raw editor mode for editing node JSON data directly
- Dataflow: cross-diagram copy/paste for nodes
- Dataflow: multiple connections for note/image nodes
- Kanban: open multiple terminal windows from column dropdown
- CLI: kubectl-style note commands (get notes, apply note, delete note)
- CLI: board name lookup, get columns, and query board commands

### Bug Fixes

- Fixed command palette navigation always targeting main window in Electron
- Fixed Ctrl+Q now shows all windows including editors
- Fixed kanban column search tooltip showing "Batch actions" instead of "Search in column"
- Removed non-functional column search button
- Unified startup loading screens to match flat/minimal design

---

## v0.60.0 (2026-04-01)

### New Features

- Draw.io editor: explicit Save / Save & Close buttons with quit confirmation dialog
- Ctrl+S triggers save & close in all resource editors
- Resource editors open in dedicated windows (desktop) or new tabs (browser)
- Ctrl/Cmd+Enter shortcut for ad-hoc action dialog
- Dataflow: blue dashed lines for image node connections
- Dataflow: { } button in field editor to convert fields to objects
- Dataflow: recursive child field creation

### Bug Fixes

- Fixed resource editor windows unable to close due to iframe beforeunload
- Fixed copy/paste shortcuts not working in all Electron windows
- Fixed new Draw.io resources saving in wrong format
- Fixed Save button in new resource editor unexpectedly closing tab/window
- Fixed JS replace() corrupting $ patterns in user prompts
- Fixed Electron startup Service Worker database error

---

## v0.59.1 (2026-03-31)

### New Features

- Dataflow: Image Nodes — new image node type with folding, Ctrl+V paste, and Draw.io export
- Dataflow: Node-level Handles — connection handles on JsonNode and ProcessNode, enlarge on hover
- Dataflow: Title Links — clickable URL links in node titles
- Dataflow: Inline Child Fields — expand child fields inline for object/array fields

### Bug Fixes

- Fixed group node border display issues
- Fixed group title positioning overlapping content
- Fixed node handles not visible when connected
- Fixed redundant blue indicator dot on JsonNode header
- Fixed image node Draw.io export for data URLs

---

## v0.59.0 (2026-03-30)

### New Features

- Share Access Code — securely share content via access codes
- Dataflow: Group Nodes — visually group related nodes, edit group name & color
- Dataflow: Note Nodes — add notes with attachments, drag-to-attach to nodes/fields, collapsible
- Dataflow: Field Editor — inline editing of field name, example, and description
- Dataflow: Multi-select Delete — bulk delete selected elements

### Bug Fixes

- Fixed command palette Cmd+Enter not opening task in new window
- Fixed Draw.io editor not using user's language preference
- Fixed dataflow grouped node export positions
- Fixed dataflow parent-child relationships lost on save/reload

---

## v0.58.4 (2026-03-29)

### New Features

- Draw.io editor: import and export local .drawio files
- Export dataflow diagrams as .drawio XML
- Checklist items link directly to subtasks via task:// protocol

### Improvements

- Onboarding reorganized into 4 top-level categories with how-to subtasks
- Onboarding defaults to English

### Bug Fixes

- Fixed white screen after Electron app updates (stale cache)
- Fixed Draw.io export list items with incorrect vertical positioning
- Fixed resource links opening unnecessarily in new windows
- Fixed welcome task checklist not mirroring full subtask tree
- Fixed Level 1 category tasks missing subtask checklists

---

## v0.58.3 (2026-03-28)

### Improvements

- Updated homepage hero copy and marketing tagline

### Upgrade Notes (Self-Hosted)

- Environment variable `ADMIN_USERNAME` has been renamed to `ADMIN_EMAIL`. Please update your deployment configuration accordingly.

### Documentation

- Added Personal → Pro/Max migration guide

---

## v0.58.2 (2026-03-27)

No end-user facing changes in this release.

This release contains internal build and release workflow updates only.

---

## v0.58.1 (2026-03-27)

No end-user facing changes in this release.

This release contains internal build and release workflow updates only.

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
- "Save to UnDercontrol" button in standalone editor

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

- CLI now defaults to official server URL (ud.oatnil.com)
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

New Chrome browser extension to save web pages as UnDercontrol tasks:

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
