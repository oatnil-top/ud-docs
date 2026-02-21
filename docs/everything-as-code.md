---
title: Everything as Code
description: Open file format specifications for UnderControl tasks and notes
sidebar_position: 3
---

# Everything as Code

UnderControl stores tasks and notes as **plain markdown files with YAML frontmatter**. The file formats are defined by open JSON Schemas published in the [`ud-schemas`](https://github.com/user/ud-schemas) repository.

This approach means your data is always:
- **Human-readable** — edit with any text editor
- **Diffable** — track changes in version control
- **Portable** — no vendor lock-in, standard formats
- **AI-friendly** — LLMs can read and write your tasks natively

## Schemas

| Schema | Description |
|--------|-------------|
| `task.v1.schema.json` | Task file — title, status, tags, deadline + markdown body |
| `note.v1.schema.json` | Note file — attached to a parent task via `task_id` + markdown body |

Both schemas use [JSON Schema draft-2020-12](https://json-schema.org/draft/2020-12/json-schema-core).

---

## Task File Format

A task file is a markdown file with YAML frontmatter between `---` delimiters:

```markdown
---
id: 550e8400-e29b-41d4-a716-446655440000
title: Ship v1 release
status: in-progress
tags:
  - release
  - urgent
deadline: 2025-06-01
created_at: 2025-01-01T00:00:00Z
updated_at: 2025-05-20T14:30:00Z
---

Final checklist before the v1 launch:

- [ ] Run full test suite
- [ ] Update changelog
- [ ] Tag release
```

### Task Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | UUID | No | Present = update existing task. Absent = create new task. |
| `title` | string | Yes | Task title. Also used to derive the filename. |
| `status` | string | No | One of: `todo`, `in-progress`, `pending`, `stale`, `done`, `archived`. Default: `todo` |
| `tags` | string[] | No | List of tags |
| `deadline` | string | No | Deadline in ISO 8601 or `YYYY-MM-DD` format |
| `created_at` | date-time | No | Set by server. Do not modify. |
| `updated_at` | date-time | No | Set by server. Used for sync conflict detection. |

### Status Values

Canonical values use hyphens. Clients normalize on read:

| Input | Normalized |
|-------|-----------|
| `in_progress`, `InProgress`, `in progress` | `in-progress` |
| `to-do` | `todo` |
| `completed`, `complete` | `done` |
| `archive` | `archived` |

### Deadline Formats

All of these are accepted and normalized to ISO 8601:

```yaml
deadline: 2025-03-15
deadline: 2025/03/15
deadline: 2025-03-15T14:30:00
deadline: 2025-03-15T14:30:00Z
deadline: 2025-03-15T14:30:00+08:00
```

---

## Note File Format

Notes are attached to a parent task via `task_id`:

```markdown
---
id: 7a8e6f4f-1234-5678-abcd-ef0123456789
task_id: 550e8400-e29b-41d4-a716-446655440000
created_at: 2025-05-20T15:00:00Z
updated_at: 2025-05-20T15:00:00Z
---

Discussed deployment strategy with the team.
Decided to go with a blue-green deployment approach.
```

### Note Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | UUID | No | Present = update. Absent = create. |
| `task_id` | UUID | Yes | UUID of the parent task |
| `created_at` | date-time | No | Set by server |
| `updated_at` | date-time | No | Set by server |

---

## Create vs Update (Declarative Semantics)

Both task and note files follow **kubectl-style declarative semantics**:

- **No `id` in frontmatter** → CREATE a new resource
- **`id` present** → UPDATE the existing resource (ID can be full UUID or unique prefix)

This applies to the CLI `ud apply` command and Local Sync file scanning.

```bash
# Create: no id in file
echo '---
title: New Task
status: todo
---
Description here.' | ud apply -f -

# Update: id present
echo '---
id: 550e8400
title: Updated Title
status: done
---
Updated description.' | ud apply -f -
```

---

## Filename Conventions

### Task Files

Task files are named using `normalizeFilename(title)`:

1. Replace unsafe characters (`/\:*?"<>|%!#$&'()+,;=@[]^{}~`) with `-`
2. Collapse multiple spaces/dashes into a single dash
3. Trim leading/trailing dashes
4. Truncate to 100 characters
5. Empty result becomes `untitled`
6. Duplicates get `-2`, `-3` suffixes

Example: `Ship v1 release` → `Ship-v1-release.md`

### Note Files

Note files are named: `{normalizeFilename(taskTitle)}-{normalizeFilename(noteFirstLine)}.md`

The task title prefix associates the note with its parent task in the filesystem.

---

## URL Conventions

Content can cross-reference other resources using these URL schemes:

### App Protocol (stored in backend)

| Scheme | Format |
|--------|--------|
| `resource://` | `resource://{resourceId}` |
| `tasks://` | `tasks://{taskId}` |
| `note://` | `note://{taskId}/{noteId}` |

### Local File Paths (in sync folder)

| Type | Format |
|------|--------|
| Resources | `./resources/{resourceId}.{ext}` |
| Tasks | `./{Task-Title}.md` |
| Notes | `./{TaskTitle}-{NoteFirstLine}.md` |

Clients convert between these formats during sync.

---

## Validating Files

### With `check-jsonschema` (Python)

```bash
pip install check-jsonschema
check-jsonschema --schemafile task.v1.schema.json your-task.json
```

### With `ajv` (Node.js)

```bash
npm install -g ajv-cli ajv-formats
ajv validate -s task.v1.schema.json -d your-task.json --spec=draft2020
```

### Editor Integration

Most editors with YAML/JSON Schema support can use these schemas for autocompletion and inline validation.

---

## Schema Repository

The schemas are published as an open-source repository:

- **Repository**: [`ud-schemas`](https://github.com/user/ud-schemas)
- **License**: MIT
- **Versioning**: Schemas use a `v{N}` suffix. Breaking changes bump the version number.

The repository includes example files and usage instructions.
