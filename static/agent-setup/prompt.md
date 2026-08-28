These are official instructions from UnDercontrol to connect your AI coding agent to a
UnDercontrol workspace — tasks, documents, files and personal finance, driven from the
terminal by the `ud` CLI. Once connected you can read the user's tasks, record progress
as notes, attach files, and open follow-up work without leaving the terminal.

Start by orienting the user, then complete the rest yourself by running the commands
directly. The only command you hand to the user is `ud login` — it prompts for a
password — so wait for them to report back on that one. Never invent credentials, and
never ask the user to tell you their password.

- Orient the user and confirm cloud vs self-hosted
- Install the ud CLI
- Run the onboarding check and follow it until it passes

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

## Run the onboarding check

The CLI carries its own onboarding checklist, so these instructions don't have to —
what to configure, in what order, and the exact next command for anything missing all
come from the tool itself and always match the installed version:

```
ud config onboarding --json
```

It never prompts. Read the report and act on each check whose `state` is `"action"`:

- Run its `next_command` yourself — **unless** `requires_human` is `true`. That marks
  the step only the user can do (above all `ud login`, which prompts for their
  password): show the user that exact command, wait for them to run it and report
  back, then re-run the check. The password must never pass through you.
- The `hint` on each check carries the details — for example, which file the agent
  instruction goes in for your agent, or what to do when the server URL is wrong.
- Loop "run → act → re-run" until the command exits 0 (`"ok": true`). That is the
  whole setup.

If your installed CLI doesn't know the command (older version), upgrade first:
`npm update -g @oatnil/ud`.

Once done, tell the user:

```
┌─ UnDercontrol Setup Complete ────────────────────────┐
│  ✓ CLI      ud <version>                             │
│  ✓ Context  <context name> → <api url>               │
│  ✓ Skill    <path the skill check reports>           │
│                                                      │
│  ⚡ Ask me to work on a task to get started          │
└──────────────────────────────────────────────────────┘
```

---

## Before your first write

The skill file the onboarding check had you install is the full reference. Three rules
that matter most:

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
