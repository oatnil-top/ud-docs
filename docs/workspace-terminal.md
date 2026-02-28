---
title: Workspace Terminal
description: Launch Claude Code from task details to implement tasks in the Electron desktop app
sidebar_position: 6
---

# Workspace Terminal

The Workspace Terminal is an Electron desktop feature that opens a dedicated window for implementing tasks with Claude Code. It provides a side-by-side view of task details and an embedded terminal, connected to a real PTY process.

## Overview

When you click the terminal icon on a task's action bar, a new workspace window opens:

- **Left panel**: Task details with auto-refresh (detects note updates from the ud CLI)
- **Right panel**: xterm.js terminal running Claude Code's `/init-task` workflow

The terminal automatically runs `claude --dangerously-skip-permissions "/init-task <task-id>"` on startup, which reads the task, refines requirements, plans implementation, and tracks progress through task notes.

> This feature is only available in the Electron desktop app.

## Quick Start

1. Open the Electron desktop app
2. Navigate to a board's settings (gear icon) and set the **Project Directory**
3. Open any task on that board
4. Click the **terminal icon** in the task actions bar
5. A workspace window opens with Claude Code ready to implement the task

## Board Configuration

Each kanban board stores workspace settings in its metadata. Configure these in the board settings drawer (click the gear icon on the board header).

### Project Directory

The working directory for workspace terminals. When set, all workspace terminals for tasks on this board will start in this directory.

**Example**: Set to `/Users/me/projects/my-app` and Claude Code will run with that as its working directory, giving it access to your project files.

If not set, the terminal defaults to your HOME directory.

### Tmux Session

Optional. When configured, the Claude Code command is wrapped in a named tmux session:

```bash
tmux new-session -As <session-name> 'claude --dangerously-skip-permissions "/init-task <task-id>"'
```

**Behavior**:
- If the session already exists: attaches to it
- If the session doesn't exist: creates it and runs Claude Code
- Closing the workspace window does NOT kill the tmux session — it continues in the background
- Reopening the workspace reattaches to the running session

This is useful for long-running implementations where you want the Claude Code session to persist even if you close the window.

## Configuration Resolution Chain

Workspace options are resolved from the board that a task belongs to:

```
task → findTaskCurrentBoard(task, boards) → board.metadata.projectDir → terminal cwd
task → findTaskCurrentBoard(task, boards) → board.metadata.tmuxSession → tmux session name
```

**Fallback**: If no board configuration is found, the terminal uses HOME as the working directory and runs without tmux.

The task-to-board mapping uses `findTaskCurrentBoard()`, which checks which board's column queries match the task.

## Architecture

### Components

| Component | Location | Role |
|-----------|----------|------|
| `workspace-manager.js` | Electron main process | Spawns BrowserWindow + PTY per task |
| `preload/index.js` | Electron preload | Exposes `workspaceApi` via contextBridge |
| `workspace.ts` | Vite app | Typed API wrapper for renderer |
| `TaskActions.tsx` | Vite app | Button + board config resolution |
| Workspace page | Vite app | Split layout with xterm.js terminal |

### Data Flow

```
TaskActions (click)
  → resolve board metadata (projectDir, tmuxSession)
  → openWorkspace(taskId, { cwd, tmuxSession })
  → IPC invoke 'workspace:open'
  → workspace-manager creates BrowserWindow + spawns PTY
  → PTY sends claude command on first shell prompt
  → PTY output → IPC → xterm.js renderer
  → User keyboard input → IPC → PTY stdin
```

### IPC Channels

| Channel | Direction | Purpose |
|---------|-----------|---------|
| `workspace:open` | renderer → main | Open workspace window |
| `workspace:close` | renderer → main | Close workspace window |
| `workspace:pty-data` | main → renderer | PTY stdout data |
| `workspace:pty-input` | renderer → main | User keyboard input |
| `workspace:pty-resize` | renderer → main | Terminal resize events |
| `workspace:pty-exit` | main → renderer | PTY process exited |
| `workspace:closed` | main → renderer | Window was closed |

### Window Management

- **One window per task**: Opening the same task again focuses the existing window
- **Position persistence**: Window bounds saved to `~/.undercontrol/workspace-positions.json`
- **Cascade positioning**: New windows are offset by 30px from the last one
- **Cleanup on close**: PTY process is killed when window closes

## Terminal Details

### Shell Startup

The workspace spawns a non-login shell (fast startup) with an augmented environment:

- `TERM=xterm-256color` for full color support
- `COLORTERM=truecolor` for 24-bit color
- PATH extended with common tool locations (`/usr/local/bin`, `/opt/homebrew/bin`, `~/.local/bin`, etc.)

### Command Execution

The claude command is sent to the shell after the first prompt appears (detected via first PTY data event), ensuring the shell is ready before executing:

```javascript
// Without tmux:
claude --dangerously-skip-permissions "/init-task <task-id>"

// With tmux session configured:
tmux new-session -As <session-name> 'claude --dangerously-skip-permissions "/init-task <task-id>"'
```

After Claude Code exits, the shell remains alive so you can run additional commands.

## Troubleshooting

### Terminal shows wrong directory

**Problem**: The terminal starts in HOME instead of the project directory.

**Solution**: Check that the board has a Project Directory configured in its settings. The task must be on the board (matched by column queries). After changing board settings, you may need to restart the Electron app for main process changes to take effect.

### node-pty errors on startup

**Problem**: Error like "NODE_MODULE_VERSION mismatch" in the console.

**Solution**: Run `npx electron-rebuild` in the `ud-electron-vite` directory to rebuild native modules for the current Electron version. This is needed after Electron or Node.js version changes.

### Tmux session not persisting

**Problem**: Closing the workspace window kills the Claude Code session.

**Solution**: Make sure you have the **Tmux Session** field configured in the board settings. Without it, the PTY process is killed directly when the window closes. With tmux, only the tmux client detaches — the session continues in the background.

### Window opens but terminal is blank

**Problem**: The workspace window opens but the terminal panel shows nothing.

**Solution**: This can happen if node-pty failed to load. Check the Electron main process console for `[WorkspaceManager] Failed to load node-pty` errors. Run `npx electron-rebuild` to fix native module issues.
