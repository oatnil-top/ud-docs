---
title: Query and Filter Tasks
sidebar_position: 2
---

# Query and Filter Tasks

Find tasks using the SQL-like query syntax or natural language.

## CLI

### List all tasks

```bash
ud get task
```

### Filter by status

```bash
ud get task --status todo
```

### Query with SQL-like syntax

```bash
# Overdue tasks
ud task query "deadline < 'today' AND status != 'done'"

# Tasks tagged "work" created this week
ud task query "tags HAS 'work' AND created_at >= '-7d'"

# Search by title keyword
ud task query "title ILIKE '%report%'"

# Sort by deadline, upcoming first
ud task query "status = 'todo' ORDER BY deadline ASC"
```

### Natural language query

```bash
# Let AI translate your question into a query
ud task nl "what tasks are due this week?"

ud task nl "show me all high-priority work tasks"
```

## curl

### Query with filters

```bash
curl -X POST https://your-server.com/todolist/query \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "deadline < '\''today'\'' AND status != '\''done'\'' ORDER BY deadline ASC"
  }'
```

### Natural language query

```bash
curl -X POST https://your-server.com/todolist/nl-query \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "what tasks are due this week?"
  }'
```

**Response:**

```json
{
  "tasks": [
    {
      "id": "a1b2c3d4-...",
      "title": "Submit expense report",
      "status": "todo",
      "deadline": "2026-02-17T00:00:00Z"
    }
  ],
  "total": 1
}
```

:::tip
See [Query Syntax](../query-syntax) for the full list of operators, fields, and date shortcuts.
:::
