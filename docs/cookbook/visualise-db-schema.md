---
title: Visualise a Database Schema
sidebar_position: 20
---

# Visualise a Database Schema with Dataflow Diagrams

Turn a running PostgreSQL database into an interactive dataflow diagram in UnDercontrol. This guide uses Keycloak's database as a worked example.

## Overview

```
PostgreSQL ──(psql: \l \dn \c \d)──► schema file ──(AI Generate / JSON import)──► Dataflow Diagram
```

## Prerequisites

Install `psql` on macOS (without a full PostgreSQL server):

```bash
brew install libpq
```

## Step 1: Explore the Database

Connect to your PostgreSQL instance:

```bash
PGPASSWORD=keycloak psql -h localhost -p 5432 -U keycloak
```

Then explore the structure:

```sql
\l          -- List all databases
\c keycloak -- Connect to target database
\dn         -- List schemas
```

## Step 2: Export Table Definitions

Generate `\d` commands for all tables and capture the output in one go:

```bash
# Generate \d commands for every table
PGPASSWORD=keycloak psql -h localhost -p 5432 -U keycloak -d keycloak -t -A \
  -c "SELECT '\d ' || tablename FROM pg_tables WHERE schemaname='public'" \
  > /tmp/describe-all.sql

# Execute and capture output
PGPASSWORD=keycloak psql -h localhost -p 5432 -U keycloak -d keycloak \
  -f /tmp/describe-all.sql > /tmp/keycloak-schema.txt
```

### Filtering to a Subset

For large schemas (Keycloak has 90+ tables), filter to a domain area:

```bash
PGPASSWORD=keycloak psql -h localhost -p 5432 -U keycloak -d keycloak -t -A \
  -c "SELECT '\d ' || tablename FROM pg_tables WHERE schemaname='public' AND tablename LIKE '%user%'" \
  > /tmp/describe-all.sql

PGPASSWORD=keycloak psql -h localhost -p 5432 -U keycloak -d keycloak \
  -f /tmp/describe-all.sql > /tmp/keycloak-schema.txt
```

The output file contains columns, types, indexes, and foreign key constraints for each table.

## Step 3: Import into the Dataflow Diagram

Open the Dataflow Editor from a task's attachments ("New Data Flow") or from an existing `.dataflow.png` resource.

### Option A: AI Generate (Recommended)

The fastest way — AI parses the psql output directly into nodes and pipes.

1. Click the **AI Generate** button (sparkle icon) in the toolbar
2. Select an AI provider
3. Paste the content of `/tmp/keycloak-schema.txt` into the input box
4. Click **Generate**

The AI creates a node for each table and draws pipes for foreign key relationships automatically. Nodes are arranged in a topological layout — parent tables at the top, child tables below.

### Option B: External AI + JSON Import

If you don't have an AI provider configured in UnDercontrol, use an external AI to generate the JSON.

1. Click **Copy Prompt** in the toolbar — this copies a system prompt to your clipboard
2. Paste it into any AI tool (ChatGPT, Claude, etc.) along with your schema file content
3. The AI returns JSON in the dataflow format
4. Click **Import Graph** in the toolbar and paste the JSON

The JSON format looks like this:

```json
{
  "nodes": [
    {
      "name": "user_entity",
      "fields": {
        "id": "uuid",
        "email": "alice@example.com",
        "email_verified": false,
        "enabled": true,
        "realm_id": "master",
        "username": "admin"
      }
    },
    {
      "name": "credential",
      "fields": {
        "id": "uuid",
        "user_id": "uuid",
        "type": "password",
        "created_date": 1700000000,
        "secret_data": "...",
        "credential_data": "..."
      }
    }
  ],
  "pipes": [
    {
      "from_node": "user_entity",
      "from_field": "id",
      "to_node": "credential",
      "to_field": "user_id"
    }
  ]
}
```

**Key rules for the JSON:**
- `fields` values are example data that indicates the type (string, number, boolean)
- `from_node`/`to_node` must exactly match a node `name`
- `from_field`/`to_field` must exactly match a field key

### Option C: One Table at a Time

For manual import of individual tables:

1. Click **Import JSON** in the toolbar
2. Enter the table name (e.g., `user_entity`)
3. Paste a sample row as JSON
4. Repeat for each table, then draw pipes by dragging between field handles

## Step 4: Refine the Diagram

After importing:

- **Box-select** nodes by dragging on the canvas — move or delete them together
- **Draw pipes** between fields by dragging from an output handle to an input handle
- **Right-click** a node to duplicate, copy, or delete
- **Import more** — importing always appends to the existing diagram, so you can build up from multiple sources
- **Save** or **Save & Exit** to persist as a `.dataflow.png` resource attached to your task

## Merging Multiple Diagrams

You can import multiple schema files into the same diagram. Each import appends nodes to the right of the existing diagram. This is useful when you want to visualise relationships across different databases or services.

## Quick Reference

| psql Command | Purpose |
|--------------|---------|
| `\l` | List all databases |
| `\dn` | List schemas in current database |
| `\c dbname` | Connect to a database |
| `\d tablename` | Show columns, types, indexes, and FKs |

## Tips

- **Start small** — pick a domain subset first (e.g., `WHERE tablename LIKE '%user%'`)
- **`\d` shows FKs** — foreign key constraints in the output map directly to pipes in the diagram
- **Pipes = foreign keys** — each pipe connects a field in one node to a field in another, mirroring the FK relationship
- **Zoom out** — for large diagrams, zoom out with the scroll wheel to see all nodes (supports up to 85+ tables)
