---
title: CLI Apply & Resource Schema
description: Declarative resource management with ud apply — k8s-like schemas for tasks, notes, boards, budgets, accounts, expenses, and incomes
sidebar_position: 7
---

# CLI Apply & Resource Schema

The `ud apply -f` command lets you create and update resources declaratively from files — similar to `kubectl apply`. The file is the single source of truth: apply it once to create, apply it again (with the ID) to update.

```bash
ud apply -f task.md          # create or update a task
ud apply -f note.md          # create or update a note (auto-detected)
ud apply -f board.yaml       # create or update a board
ud apply -f resources.yaml   # apply multiple resources from one file
cat spec.yaml | ud apply -f - # read from stdin
```

---

## Two File Formats

| Extension | Resources | Structure |
|-----------|-----------|-----------|
| `.md` | Task, Note | YAML frontmatter + markdown body |
| `.yaml` / `.yml` | Board, Budget, Account, Expense, Income | k8s-like `apiVersion/kind/metadata/spec` |

The format is determined by file extension. For stdin (`-f -`), format is auto-detected: content starting with `apiVersion:` is parsed as YAML, otherwise as markdown.

---

## Markdown Resources (`.md`)

Markdown files use YAML frontmatter between `---` delimiters, followed by a markdown body.

### Task

A `.md` file without `task_id` in frontmatter is a **Task**.

```markdown
---
title: Ship v1 release
status: in-progress
tags:
  - release
  - urgent
kickoff: 2025-05-01
deadline: 2025-06-01
board: abc123
---

Final checklist before the v1 launch:

- [ ] Run full test suite
- [ ] Update changelog
- [ ] Tag release
- [ ] Deploy to production
```

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | no | Task UUID or prefix. Present = update, absent = create. |
| `title` | string | no | Derived from body first line or filename if omitted. |
| `status` | string | no | `todo` (default), `in-progress`, `pending`, `stale`, `done`, `archived` |
| `tags` | array | no | List of tags. |
| `kickoff` | string | no | Start date (`YYYY-MM-DD` or ISO 8601). |
| `deadline` | string | no | Due date (`YYYY-MM-DD` or ISO 8601). |
| `board` | string | no | Board ID or prefix — creates the task directly in the board. |
| *(body)* | string | no | Becomes the task description. |

**Title derivation** (when `title` is not in frontmatter):
1. First non-empty line of the body (with `#` prefix stripped)
2. Filename without `.md` extension (dashes replaced with spaces)
3. `"Untitled"`

### Note

A `.md` file with `task_id` in frontmatter is a **Note** — no subcommand needed.

```markdown
---
task_id: a1b2c3d4
---

## Progress Update

- Completed API integration
- Next: wire up the frontend
```

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `task_id` | string | **yes** | Parent task UUID or prefix. |
| `note_id` | string | no | Note UUID or prefix. Present = update, absent = create. |
| *(body)* | string | no | Note content in markdown. |

:::tip Auto-detection
You don't need `ud apply note -f` anymore. Plain `ud apply -f note.md` detects the Note format automatically by checking for `task_id` in frontmatter. The `ud apply note` subcommand still works as a backward-compatible alias.
:::

---

## YAML Resources (`.yaml` / `.yml`)

YAML files use a **k8s-like envelope** with four top-level fields:

```yaml
apiVersion: ud/v1
kind: Board
metadata:
  id: abc12345          # present = update, absent = create
  tags: [work, sprint]
spec:
  name: Sprint Board
  # kind-specific fields...
```

| Field | Required | Description |
|-------|----------|-------------|
| `apiVersion` | **yes** | Always `ud/v1`. |
| `kind` | **yes** | Resource type: `Board`, `Budget`, `Account`, `Expense`, `Income`. |
| `metadata` | no | Common fields: `id` (for update), `tags`. |
| `spec` | **yes** | Kind-specific fields (see below). |

### Board

```yaml
apiVersion: ud/v1
kind: Board
spec:
  name: Sprint Board
  board_type: private
  default_tags: [sprint-1]
  columns:
    - name: Backlog
      query: "status:todo"
    - name: In Progress
      query: "status:in-progress"
    - name: Review
      query: "status:pending"
    - name: Done
      query: "status:done"
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | **yes** | Board name. |
| `board_type` | string | no | `private` (default) or `shared`. |
| `columns` | array | no | Ordered list of columns. |
| `columns[].name` | string | yes | Column display name. |
| `columns[].query` | string | no | Filter query (e.g., `status:todo`). |
| `default_tags` | array | no | Tags auto-applied to new tasks in this board. |

### Budget

```yaml
apiVersion: ud/v1
kind: Budget
metadata:
  tags: [food]
spec:
  name: Groceries
  amount:
    amount: 500.00
    currency: USD
  starts_at: "2025-01-01"
  plans:
    - amount:
        amount: 500.00
        currency: USD
      frequency: monthly
      effective_from: "2025-01-01"
      reason: Initial monthly budget
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | **yes** | Budget name. |
| `amount` | money | **yes** | Initial budget amount. |
| `starts_at` | string | no | Budget start date (`YYYY-MM-DD`). |
| `plans` | array | no | Recurring budget plans. |
| `plans[].amount` | money | yes | Plan amount per period. |
| `plans[].frequency` | string | yes | `daily`, `weekly`, `biweekly`, `monthly`, `quarterly`, `yearly`. |
| `plans[].effective_from` | string | yes | Plan start date. |
| `plans[].effective_to` | string | no | Plan end date (omit for open-ended). |
| `plans[].reason` | string | no | Why this plan was created. |

### Account

```yaml
apiVersion: ud/v1
kind: Account
metadata:
  tags: [bank]
spec:
  name: Checking
  balance:
    amount: 5000.00
    currency: USD
  off_budget: false
  notes: Primary checking account
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | **yes** | Account name. |
| `balance` | money | **yes** | Current balance. |
| `off_budget` | boolean | no | Exclude from budget calculations (default: `false`). |
| `notes` | string | no | Free-form notes. |

### Expense

```yaml
apiVersion: ud/v1
kind: Expense
metadata:
  tags: [food, lunch]
spec:
  title: Team lunch
  amount:
    amount: 85.50
    currency: USD
  budget_id: abc123
  account_id: def456
  occurred_at: "2025-03-15"
  description: Monthly team lunch at the Italian place
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | no | Expense title. |
| `amount` | money | **yes** | Expense amount. |
| `description` | string | no | Additional details. |
| `budget_id` | string | no | Budget UUID or prefix. |
| `account_id` | string | no | Account UUID or prefix (paid from). |
| `occurred_at` | string | no | When the expense occurred (`YYYY-MM-DD`). |

### Income

```yaml
apiVersion: ud/v1
kind: Income
metadata:
  tags: [salary]
spec:
  title: March salary
  amount:
    amount: 5000.00
    currency: USD
  source: salary
  account_id: abc123
  occurred_at: "2025-03-31"
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | **yes** | Income title. |
| `amount` | money | **yes** | Income amount. |
| `description` | string | no | Additional details. |
| `source` | string | no | `salary`, `freelance`, `investment`, `gift`, `other`. |
| `account_id` | string | no | Account UUID or prefix (deposited to). |
| `occurred_at` | string | no | When the income was received (`YYYY-MM-DD`). |

### Money Type

All financial resources use a money object:

```yaml
amount:
  amount: 42.50      # decimal in major currency units
  currency: USD      # ISO 4217 code (defaults to USD if omitted)
```

---

## Multi-Document YAML

A single `.yaml` file can contain multiple resources, separated by `---`:

```yaml
apiVersion: ud/v1
kind: Account
spec:
  name: Checking
  balance:
    amount: 5000.00
    currency: USD
---
apiVersion: ud/v1
kind: Account
spec:
  name: Savings
  balance:
    amount: 20000.00
    currency: USD
  off_budget: true
---
apiVersion: ud/v1
kind: Budget
metadata:
  tags: [rent]
spec:
  name: Rent
  amount:
    amount: 2000.00
    currency: USD
  starts_at: "2025-01-01"
  plans:
    - amount:
        amount: 2000.00
        currency: USD
      frequency: monthly
      effective_from: "2025-01-01"
```

Resources are applied in order. An error in one document does not stop processing of the rest.

---

## Create vs Update

All resources follow the same declarative rule:

| Condition | Action |
|-----------|--------|
| No `id` in frontmatter/metadata | **Create** new resource |
| `id` present | **Update** existing resource |

IDs can be full UUIDs or unique prefixes (first 8 characters are usually enough):

```yaml
# Update — uses prefix
metadata:
  id: a1b2c3d4
```

```markdown
---
id: a1b2c3d4-e5f6-7890-abcd-ef1234567890
title: Updated title
---
```

---

## Supported Resources

Run `ud api-resources` to see all resource types and their available verbs:

```
NAME       SHORTNAMES   VERBS
task       tasks,t      get,describe,apply,delete,annotate
note       -            get,apply,delete
board      boards       get,describe,apply,query
budget     budgets,b    get,describe,apply
expense    expenses,e   get,describe,apply
account    accounts,a   get,describe,apply
income     incomes,i    get,describe,apply
resource   -            upload
column     columns      get
```

---

## Schema Definitions

Formal JSON Schema definitions for all resource types are published at:

**https://github.com/oatnil-top/ud-schemas**

| Schema | Format | Resources |
|--------|--------|-----------|
| `task.v1.schema.json` | Markdown | Task files |
| `note.v1.schema.json` | Markdown | Note files |
| `resource.v1.schema.json` | YAML | Generic envelope (shared definitions) |
| `board.v1.schema.json` | YAML | Board resources |
| `budget.v1.schema.json` | YAML | Budget resources |
| `account.v1.schema.json` | YAML | Account resources |
| `expense.v1.schema.json` | YAML | Expense resources |
| `income.v1.schema.json` | YAML | Income resources |

---

## Examples

### Set up a project from scratch

```bash
# Create accounts
cat <<'EOF' | ud apply -f -
apiVersion: ud/v1
kind: Account
spec:
  name: Checking
  balance:
    amount: 10000.00
    currency: USD
EOF

# Create budgets
ud apply -f monthly-budgets.yaml

# Create a sprint board
ud apply -f sprint-board.yaml

# Create tasks
cat <<'EOF' | ud apply -f -
---
title: Set up CI/CD pipeline
status: todo
tags:
  - infra
  - sprint-1
board: Sprint
---
Configure GitHub Actions for build, test, and deploy.
EOF
```

### AI agent workflow

AI agents (Claude Code, Cursor) can use `ud apply -f -` to create and update resources programmatically:

```bash
# Agent creates a task
cat <<'EOF' | ud apply -f -
---
title: Implement user auth
status: in-progress
---
JWT-based auth with refresh tokens.
EOF

# Agent adds a note
cat <<'EOF' | ud apply -f -
---
task_id: abc123
---
## Progress
- Added login endpoint — commit a1b2c3d4
- Next: refresh token rotation
EOF

# Agent logs an expense
cat <<'EOF' | ud apply -f -
apiVersion: ud/v1
kind: Expense
spec:
  title: API hosting - March
  amount:
    amount: 29.99
    currency: USD
  budget_id: infra
  occurred_at: "2025-03-31"
EOF
```

### Batch setup with multi-doc YAML

```bash
# Create all accounts in one file
ud apply -f accounts.yaml

# accounts.yaml contains multiple Account resources separated by ---
```
