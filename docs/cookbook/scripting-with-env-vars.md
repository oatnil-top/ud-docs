---
title: Scripting with Environment Variables
sidebar_position: 16
---

# Scripting with Environment Variables

Override CLI settings per-command for scripting and CI/CD.

## Environment variables

| Variable | Description |
|----------|-------------|
| `UD_CONTEXT` | Override current context |
| `UD_API_URL` | Override API URL |
| `UD_API_KEY` | Override API key |
| `UD_TOKEN` | Override auth token |
| `EDITOR` | Editor for `task edit` |

## Examples

### Use a different context for one command

```bash
UD_CONTEXT=staging ud get task
```

### Point to a local server

```bash
UD_API_URL=http://localhost:4000 ud get task
```

### CI/CD pipeline with API key

```bash
export UD_API_URL=https://ud.company.com
export UD_API_KEY=your-api-key

# Create a task from CI
ud task create "Deploy v2.1.0" -d "Automated release from CI pipeline"

# Mark deploy task done
ud task done $TASK_ID
```

### Script: create tasks from a file list

```bash
#!/bin/bash
while IFS= read -r line; do
  ud task create "$line" -s todo
done < tasks.txt
```

### Script: export overdue tasks

```bash
ud task query "deadline < 'today' AND status != 'done'" \
  --limit 100
```

### Script: daily standup report

```bash
#!/bin/bash
echo "=== Updated yesterday ==="
ud task query "updated_at >= '-1d' AND status = 'in-progress'"

echo "=== Due today ==="
ud task query "deadline BETWEEN 'today' AND 'tomorrow' AND status != 'done'"

echo "=== Blocked ==="
ud task query "status = 'pending'"
```
