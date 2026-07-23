# Onboard your agent to UnDercontrol

You are an AI coding agent. Follow this document to connect the machine you are running
on to **UnDercontrol** — a private, self-hostable workspace for tasks, documents, files
and personal finance, driven from the terminal by the `ud` CLI.

Once set up, you can read the user's tasks, record your progress as notes, attach files,
and create follow-up work — all without leaving the terminal.

Work through the steps in order. Stop and ask the user only where a step says to.

---

## Step 1 — Install the CLI

npm is the only supported channel:

```bash
npm install -g @oatnil/ud
ud --version
```

If a global install is not possible, `npx @oatnil/ud <command>` works for every command
below; adjust the rest of this document accordingly.

## Step 2 — Authenticate

`ud login` is interactive, so **ask the user to run it themselves** and report back —
do not invent credentials.

Cloud (default server):

```bash
ud login --api-url https://ud.oatnil.com -n personal
```

Self-hosted — replace the URL with their own server:

```bash
ud login --api-url https://ud.example.com -n home
```

If the user has no account yet, point them at https://ud.oatnil.com to sign up, or at
https://oatnil.com/self-hosting to run their own server first.

Credentials and contexts are stored in `~/.config/ud/config.yaml`. Verify with:

```bash
ud whoami
```

## Step 3 — Load the CLI skill

The CLI carries its own agent-facing reference. It always matches the installed version,
so **read it instead of guessing flags**:

```bash
ud describe skill ud-cli
```

Then discover what else this workspace exposes:

```bash
ud get skills          # workflow skills available to the user's group
ud cook task           # copy-pasteable recipes, per resource
ud api-resources       # every resource the CLI can address
```

## Step 4 — Verify the connection

```bash
ud get task --limit 5
ud get board
```

If these return data (or an empty list without an auth error), setup is complete.

## Step 5 — Make it stick for future sessions

Add a short instruction to the project's agent config so later sessions load the skill
without being told. For Claude Code, append to `CLAUDE.md`; for Cursor, to the rules
file; for other agents, to their equivalent:

```markdown
This project uses UnDercontrol for task management via the `ud` CLI.
Before working with tasks, run `ud describe skill ud-cli` to load the full
command reference, then use `ud get`, `ud describe`, `ud apply`, and `ud delete`.
Record progress as notes on the task you are working on.
```

If the user prefers a checked-in skill file:

```bash
mkdir -p .claude/skills/ud-cli
ud describe skill ud-cli > .claude/skills/ud-cli/SKILL.md
```

Regenerate it after upgrading the CLI.

---

## Everyday commands

```bash
ud get task --status todo              # what's on the list
ud describe task <id>                  # full task, notes and comments
ud apply -f -                          # create or update from Markdown on stdin
ud upload file ./screenshot.png --task <id>
```

Create or update a task by piping Markdown with YAML frontmatter — omit `id` to create,
include it to update. `apply` **replaces** the task, so always send every field you want
to keep:

```bash
cat <<'EOF' | ud apply -f -
---
title: Ship the import flow
status: todo
tags: [backend]
---
Import CSV statements into the expense module.
EOF
```

Append a note (progress log) to an existing task by putting `task_id` in the frontmatter:

```bash
cat <<'EOF' | ud apply -f -
---
task_id: <task-id>
---
## Progress
- Implemented the parser
- Commit: abc1234
EOF
```

## Rules to follow

- Read `ud describe skill ud-cli` before your first write — this page is only the setup.
- Never invent IDs. List first (`ud get task`), then act on a real ID. Task, note and
  comment IDs accept an 8-character prefix; everything else needs the full UUID.
- `ud apply` replaces the whole record. Read it (`ud describe task <id> -o apply`) before
  updating so you don't drop fields.
- Record what you did as a **note** on the task, and keep **comments** short — they are
  the user's conversation channel.
- Deleting is not undoable. Ask before `ud delete`.

## More

- CLI reference: https://oatnil.com/docs/cli
- AI agent integration: https://oatnil.com/docs/cli-ai-integration
- Self-hosting: https://oatnil.com/self-hosting
