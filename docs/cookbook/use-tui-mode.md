---
title: Use TUI Mode
sidebar_position: 15
---

# Use TUI Mode

Launch the interactive terminal UI with vim-style keybindings.

## CLI

### Start TUI

```bash
ud
```

Or explicitly:

```bash
ud tui
```

### Key bindings — List view

| Key | Action |
|-----|--------|
| `j` / `k` | Move down / up |
| `gg` | Jump to top |
| `G` | Jump to bottom |
| `Enter` | View task details |
| `i` | Create new task |
| `e` | Edit task in `$EDITOR` |
| `x` | Toggle status |
| `dd` | Delete task |
| `/` | Search |
| `n` / `N` | Next / previous search result |
| `r` | Refresh |
| `f` | Open file picker |
| `q` | Quit |

### Key bindings — Detail view

| Key | Action |
|-----|--------|
| `j` / `k` | Scroll content |
| `x` | Toggle status |
| `e` | Edit task |
| `dd` | Delete task |
| `Esc` / `q` | Back to list |

### Set your editor

```bash
export EDITOR=vim    # or nano, code, etc.
```
