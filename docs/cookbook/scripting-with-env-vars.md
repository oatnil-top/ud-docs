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
| `EDITOR` | Editor used by the TUI when editing a task |

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
cat <<'EOF' | ud apply -f -
---
title: Deploy v2.1.0
---
Automated release from CI pipeline
EOF

# Mark deploy task done
echo "---
id: $TASK_ID
status: done
---" | ud apply -f -
```

### Script: create tasks from a file list

```bash
#!/bin/bash
while IFS= read -r line; do
  echo "---
title: $line
status: todo
---" | ud apply -f -
done < tasks.txt
```

### Script: export overdue tasks

```bash
ud query "deadline < 'today' AND status != 'done'" \
  --limit 100
```

### Script: daily standup report

```bash
#!/bin/bash
echo "=== Updated yesterday ==="
ud query "updated_at >= '-1d' AND status = 'in-progress'"

echo "=== Due today ==="
ud query "deadline BETWEEN 'today' AND 'tomorrow' AND status != 'done'"

echo "=== Blocked ==="
ud query "status = 'pending'"
```
