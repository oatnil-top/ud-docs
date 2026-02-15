---
title: Query Cheat Sheet
sidebar_position: 14
---

# Query Cheat Sheet

Copy-paste query examples for common scenarios.

## By status

```bash
# All todo tasks
ud task query "status = 'todo'"

# Incomplete tasks
ud task query "status IN ('todo', 'in-progress')"

# Everything except archived
ud task query "status != 'archived'"
```

## By deadline

```bash
# Overdue
ud task query "deadline < 'today' AND status != 'done'"

# Due today
ud task query "deadline BETWEEN 'today' AND 'tomorrow' AND status != 'done'"

# Due this week
ud task query "deadline BETWEEN 'today' AND '+7d' AND status != 'done'"

# Due this month
ud task query "deadline BETWEEN 'today' AND '+30d'"

# No deadline set
ud task query "deadline IS NULL AND status = 'todo'"
```

## By tags

```bash
# Single tag
ud task query "tags = 'work'"

# Any of multiple tags
ud task query "tags IN ('work', 'personal')"

# Must have ALL tags
ud task query "tags CONTAINS_ALL ('work', 'urgent')"
```

## By text

```bash
# Title contains keyword (case-insensitive)
ud task query "title ILIKE '%meeting%'"

# Description contains keyword
ud task query "description ILIKE '%deploy%'"
```

## By time

```bash
# Created in the last 7 days
ud task query "created_at >= '-7d'"

# Updated today
ud task query "updated_at >= 'today'"

# Created in January 2026
ud task query "created_at BETWEEN '2026-01-01' AND '2026-01-31'"
```

## By custom fields

```bash
# Priority level
ud task query "cf.priority = 'High'"

# Story points over 5
ud task query "cf.points > 5"

# Not yet prioritized
ud task query "cf.priority IS NULL AND status = 'todo'"
```

## Combined

```bash
# Urgent: overdue or tagged urgent, not done
ud task query "(deadline < 'today' OR tags = 'urgent') AND status != 'done'"

# Active work: in-progress with work tag, sorted by update time
ud task query "tags = 'work' AND status = 'in-progress' ORDER BY updated_at DESC"

# Needs attention: due this week and still todo
ud task query "deadline BETWEEN 'today' AND '+7d' AND status = 'todo' ORDER BY deadline ASC"
```

## With sorting

```bash
# Newest first
ud task query "status = 'todo' ORDER BY created_at DESC"

# By deadline (earliest first)
ud task query "deadline IS NOT NULL ORDER BY deadline ASC"

# Alphabetical
ud task query "status != 'archived' ORDER BY title ASC"
```

:::tip
See [Query Syntax](/docs/query-syntax) for the full reference on operators, fields, and date expressions.
:::
