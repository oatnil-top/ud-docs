---
title: Upload and Attach Files
sidebar_position: 9
---

# Upload and Attach Files

Upload files and attach them to tasks, expenses, or budgets.

## CLI

### Upload and attach to a task in one step

```bash
ud upload resource ./screenshot.png -t todolist -e a1b2c3d4
```

### Upload a standalone file

```bash
ud upload resource ./document.pdf
```

### Attach an existing resource to a task

```bash
ud attach resource {resourceId} -t todolist -e a1b2c3d4
```

### Verify the attachment

```bash
ud describe task a1b2c3d4
# Shows: [2a2e542e] screenshot.png (image/png, 102.4 KB)
```

### Download a resource

```bash
# Get the presigned URL
ud entity get {resourceId}

# Download it
curl -o screenshot.png "<presigned-url>"
```

## Full workflow example

```bash
# 1. Find the task
ud get task --status in-progress

# 2. Upload and attach
ud upload resource ./design-v2.pdf -t todolist -e 3de9

# 3. Confirm
ud describe task 3de9
```
