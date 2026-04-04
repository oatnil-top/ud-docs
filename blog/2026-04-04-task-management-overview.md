---
title: "How UnderControl Handles Task Management: Views, Links, and the CLI"
description: A practical look at UnderControl's task system — multiple views, bidirectional linking, markdown notes, and a kubectl-style CLI for power users.
authors: [lintao]
tags: [feature]
date: 2026-04-04
---

Most task managers give you a list. Maybe a kanban board if you're lucky. UnderControl takes a different approach: your tasks are a data structure you can view, query, and manipulate from multiple angles — whether you're in the browser, the desktop app, or a terminal.

Here's a practical walkthrough of how the task system works.

## Six Statuses That Actually Mean Something

Tasks in UnderControl move through six statuses: **Todo**, **In Progress**, **Pending**, **Done**, **Stale**, and **Archived**.

The distinction between Pending and Stale is one I find genuinely useful. Pending means you're deliberately waiting — on a reply, a dependency, a decision. Stale means the task just hasn't been touched in a while. That difference matters when you're doing a weekly review and trying to figure out what to act on versus what to clean up.

## Pick the View That Matches Your Mental Model

Different work calls for different views. UnderControl gives you seven:

- **List** — The default. Fast, filterable, keyboard-friendly.
- **Kanban** — Drag cards between status columns. Good for sprint-style work.
- **Calendar** — Tasks plotted by deadline. Useful before a busy week.
- **Tree** — Hierarchical view of parent and child tasks. Great for projects with nested sub-tasks.
- **Graph** — A node-link diagram of all your bidirectional task relationships. Looks cool, but also genuinely useful for spotting how things connect.
- **Mindmap** — Freeform brainstorming layout.
- **Trash** — Review and restore deleted tasks.

Switching between views doesn't change your data — it's the same tasks, just rendered differently. The Graph view in particular is worth trying if you use linked tasks heavily.

## Bidirectional Linking

You can link any two tasks together, and the connection is bidirectional — follow it from either side. Over time, this turns your task list into something closer to a knowledge graph. The Graph view is where this becomes visible: nodes are tasks, edges are links, and you can see clusters form around related work.

Derived tasks (parent-child relationships) work differently. When you create a task from an existing one, the child inherits context from the parent and links back to it automatically. This is the right pattern for breaking down a large project into concrete steps.

## Markdown Notes with Edit History

Every task has a notes section. Notes support full markdown — headers, code blocks, lists, links. More importantly, every note keeps a full edit history. If you wrote something, changed your mind, and want to go back, you can revert to any previous version.

I use notes for things like decision logs, blockers, and meeting summaries attached to a task. It keeps everything in one place instead of scattered across documents and chat threads.

## Filtering and Queries

The quick filters cover the common cases: filter by status, tags, or deadline range (overdue, today, this week, and so on). For more specific needs, there's a structured query language:

```
status = 'pending' AND tag:work = 'true'
```

If you don't want to write the query yourself, the AI assistant accepts plain English — something like "show me overdue tasks tagged with client work" — and translates it into a filter.

## File Attachments and Sharing

Attach any file to a task — images, PDFs, diagrams, exported reports. The attachments live on your server, under your control.

For sharing, you can generate a public link to a specific task with an optional expiration date. Or share with a group and set whether they get read or read-write access.

## The CLI Is a First-Class Interface

If you work in a terminal, `ud` gives you the full task API from the command line:

```bash
ud task list
ud task create "Review Q2 metrics"
ud task done <id>
ud task query "status = 'todo' AND deadline < '2026-05-01'"
ud task apply -f task.md
```

The `apply` command is particularly useful — you can write a task in a markdown file and push it to UnderControl, which fits nicely into scripting and automation workflows. The CLI follows kubectl-style conventions, so if you spend time in Kubernetes or similar tools, the patterns feel familiar.

## Recurring Tasks and Check-ins

For repeating work, recurring tasks generate new task instances on a schedule — daily standups, weekly reviews, monthly reports. You can use presets or write a custom CRON expression.

Check-ins are a lighter-weight alternative for habit tracking: each check-in increments a counter and records a timestamp, giving you a simple log of consistency without the overhead of a full task lifecycle.

## Try It Yourself

All of this runs on your own infrastructure. No data leaves your server, no subscriptions, no vendor lock-in.

The full task management documentation is at [undercontrol.dev/docs/tasks](https://undercontrol.dev/docs/tasks), and the self-hosting guide covers deployment with Docker or the prebuilt binaries. If you run into anything, the GitHub repo is the right place to file issues or ask questions.
