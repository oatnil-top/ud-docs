These are official instructions from UnDercontrol to connect your AI coding agent to a
UnDercontrol workspace — tasks, documents, files and personal finance, driven from the
terminal by the `ud` CLI. Once connected you can read the user's tasks, record progress
as notes, attach files, and open follow-up work without leaving the terminal.

Start by orienting the user, then complete the rest of the steps yourself by running the
commands directly. The only command you hand to the user is `ud login` — it prompts for a
password — so wait for them to report back on that one. Never invent credentials.

- Orient the user and confirm cloud vs self-hosted
- Install the ud CLI
- Sign in to the user's workspace
- Install the UnDercontrol skill for your agent
- Verify the connection

---

## Orient the user

Before running anything, tell the user in a sentence or two what UnDercontrol is and what
you're about to set up — connecting their agent to a UnDercontrol workspace so you can read
and update their tasks, notes, files and finance from the terminal. Then ask the two
questions that decide how the rest goes, and wait for the answers:

1. **Cloud or self-hosted?** Cloud is `https://ud.oatnil.com`. Self-hosted means they run
   their own server, and you'll use that server's URL everywhere below instead.
2. **Do they already have an account?** If not, point them to sign up first — cloud users at
   `https://ud.oatnil.com`, self-hosters at `https://oatnil.com/self-hosting`.

Once you have both answers, work through the steps below.

## Install the ud CLI

npm is the only supported channel — the Homebrew tap and the install script are retired.

```
npm install -g @oatnil/ud
ud --version
```

If a global install is not possible, every `ud` command below also works as
`npx @oatnil/ud <command>`.

## Sign in to the user's workspace

**First, check whether they're already signed in** — run `ud whoami`. If it prints a user,
skip the rest of this step. This is common when the user runs the UnDercontrol desktop app:
logging in there automatically writes a CLI context named `personal` to
`~/.config/ud/config.yaml`, so the CLI is already authenticated and no login command is
needed. (Download the desktop app from `https://oatnil.com` if they'd prefer the GUI route.)

Otherwise sign in from the CLI. **This is the one command the user must run themselves** —
it prompts for a password. Ask them to run it, then continue once they confirm.

Cloud workspace:

```
ud login --api-url https://ud.oatnil.com -n personal
```

Self-hosted — substitute their own server:

```
ud login --api-url https://ud.example.com -n home
```

If they have no account yet, point them at `https://ud.oatnil.com` to sign up, or at
`https://oatnil.com/self-hosting` to run their own server first.

Credentials and contexts are written to `~/.config/ud/config.yaml`. Confirm the session
yourself with:

```
ud whoami
```

## Install the UnDercontrol skill for your agent

The CLI carries its own agent-facing reference as a built-in skill. It is served by the
CLI, so it always matches the installed version — read it instead of guessing flags, and
write it to disk so future sessions pick it up without being told.

Use the correct section for your agent below. Use `~/` paths instead of the project-local
ones if the user wants UnDercontrol available in every project.

### Claude Code

```
mkdir -p .claude/skills/ud-cli
ud describe skill ud-cli > .claude/skills/ud-cli/SKILL.md
```

### Codex / OpenCode / any agent that reads `AGENTS.md`

```
mkdir -p .agents/skills/ud-cli
ud describe skill ud-cli > .agents/skills/ud-cli/SKILL.md
```

Then append to `AGENTS.md`:

```
This project uses UnDercontrol for tasks. Read .agents/skills/ud-cli/SKILL.md
before reading or writing tasks, notes, or boards.
```

### Cursor — `.cursor/rules/undercontrol.mdc`

### Windsurf — `.windsurf/rules/undercontrol.md`

### GitHub Copilot — `.github/copilot-instructions.md`

Write the reference into the rules file for these three:

```
ud describe skill ud-cli > <the rules file above>
```

### Any other agent

Write `ud describe skill ud-cli` output to whatever file your agent loads as persistent
instructions, and tell the user which file you chose.

Regenerate the file after upgrading the CLI to pick up new commands.

## Verify the connection

```
ud get task --limit 5
ud get board
```

An empty list is a pass — only an authentication error is a failure.

Once done, tell the user:

```
┌─ UnDercontrol Setup Complete ────────────────────────┐
│  ✓ CLI      ud <version>                             │
│  ✓ Context  <context name> → <api url>               │
│  ✓ Skill    <path you wrote>                         │
│                                                      │
│  ⚡ Ask me to work on a task to get started          │
└──────────────────────────────────────────────────────┘
```

---

## Before your first write

The skill you just installed is the full reference. Three rules that matter most:

- `ud apply` **replaces** the whole record. Read it back first
  (`ud describe task <id> -o apply`) so you don't drop fields.
- Never invent IDs — list first, then act on a real one. Tasks, notes and comments accept
  an 8-character prefix; every other resource needs the full UUID.
- Deleting is not undoable. Ask before `ud delete`.

## Resources

- CLI reference: `https://oatnil.com/docs/cli`
- AI agent integration: `https://oatnil.com/docs/cli-ai-integration`
- Self-hosting: `https://oatnil.com/self-hosting`
- Portable skill for agentskills.io-compatible agents:
  `https://raw.githubusercontent.com/oatnil-top/ud-schemas/main/skills/ud-integration/SKILL.md`

These instructions are published at `https://oatnil.com/agent-setup/prompt.md` so you can
re-verify their authenticity at any time.
