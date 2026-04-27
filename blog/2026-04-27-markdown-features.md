---
title: "Rich Markdown in Your Tasks — Code, Diagrams, and More"
description: UnDercontrol tasks support full markdown with syntax-highlighted code blocks, Mermaid diagrams, tables, checklists, and a slash command menu for fast formatting.
authors: [lintao]
tags: [feature, markdown, productivity]
date: 2026-04-27
---

### What Is a Task?

In UnDercontrol, a Task is the core unit of information. If you've used Jira, think of it as an Issue; if you've used Obsidian, think of it as a Note. A Task is essentially a piece of content bound to a status, with first-class attributes (title, tags, link relationships, etc.) and support for unlimited custom metadata fields (key-value pairs), so you can attach any information to it. Through the Notes mechanism, a Task can continuously evolve — recording progress, discussions, and decisions, accumulating into a complete knowledge context over time.

This post focuses on the Task's main body — the Description — and the rich-text capabilities it supports.

<!-- truncate -->

### Rich-Text Markdown Editor

UnDercontrol's markdown editor is built on [Tiptap 3](https://tiptap.dev/), providing a WYSIWYG rich-text editing experience with full markdown support. Write in markdown or use the visual editor — the content renders beautifully either way.

### Slash Commands — Format Without Leaving the Keyboard

Type `/` anywhere in a task description to open the command menu. Insert headings, code blocks, tables, Mermaid diagrams, checklists, and more — all without touching the mouse.

![Slash command menu in the editor](https://pub-35d77f83ee8a41798bb4b2e1831ac70a.r2.dev/features/blog/markdown-features/slide-2.png)

The slash menu supports:
- **Headings** (H1–H5) for document structure
- **Task lists** with interactive checkboxes
- **Code blocks** with language selection and syntax highlighting
- **Mermaid diagrams** for flowcharts, sequence diagrams, and more
- **Tables** with full cell editing
- **Blockquotes**, dividers, and images

### Syntax-Highlighted Code Blocks

Paste code snippets directly into your tasks. The editor supports 100+ programming languages with proper syntax highlighting — from TypeScript and Go to SQL and YAML.

![Task with syntax-highlighted TypeScript code block](https://pub-35d77f83ee8a41798bb4b2e1831ac70a.r2.dev/features/blog/markdown-features/api-task-top.png)

Code blocks include a language selector dropdown and a one-click copy button. Your code stays readable and properly formatted, whether you're documenting an API endpoint or saving a useful shell command.

### Mermaid Diagrams — Visualize Architecture Inline

One of the most powerful features: embed [Mermaid](https://mermaid.js.org/) diagrams directly in your task descriptions. Insert a Mermaid block via the slash menu, write your diagram syntax, and it renders live.

![Mermaid flowchart showing microservices architecture](https://pub-35d77f83ee8a41798bb4b2e1831ac70a.r2.dev/features/blog/markdown-features/arch-task-top.png)

Supported diagram types include:
- **Flowcharts** — system architecture, decision trees
- **Sequence diagrams** — API flows, authentication handshakes
- **Class diagrams** — data models, entity relationships
- **State diagrams** — workflow states, lifecycle tracking

![Mermaid sequence diagram showing authentication flow](https://pub-35d77f83ee8a41798bb4b2e1831ac70a.r2.dev/features/blog/markdown-features/api-task-mermaid.png)

The diagram viewer supports fullscreen preview, SVG download, and automatic dark/light theme switching.

### Tables for Structured Data

Need to document status codes, compare metrics, or track a feature matrix? Insert a table and edit cells directly. Add or remove rows and columns, toggle header rows, and merge cells — all from a context menu.

![Table with status codes and interactive checklist](https://pub-35d77f83ee8a41798bb4b2e1831ac70a.r2.dev/features/blog/markdown-features/api-task-table-checklist.png)

### Checklists That Actually Work

Task lists render as interactive checkboxes. Check items off directly in the rendered view — no need to switch to edit mode. Great for tracking sub-steps, acceptance criteria, or deployment checklists.

![Interactive checklist in task description](https://pub-35d77f83ee8a41798bb4b2e1831ac70a.r2.dev/features/blog/markdown-features/slide-5.png)

### AI-Powered Text Actions

Select any text in your task description to reveal the bubble menu. Beyond standard formatting (bold, italic, strikethrough), you get AI-powered actions:

- **Refine** — rewrite selected text for clarity
- **Translate** — translate to another language instantly
- **Chat** — ask questions about the selected content

![Feature overview — everything you need to document](https://pub-35d77f83ee8a41798bb4b2e1831ac70a.r2.dev/features/blog/markdown-features/slide-7.png)

### Entity Links — Connect Tasks Like a Wiki

Link to other tasks, notes, expenses, budgets, and accounts directly in your descriptions using custom protocols like `task://`, `note://`, and more. The links render as clickable references — click one to jump straight to the referenced entity.

![Rendered entity links in a task description](https://pub-35d77f83ee8a41798bb4b2e1831ac70a.r2.dev/features/blog/markdown-features/entity-links-rendered.png)

Switch to source mode to see the raw markdown — each link uses a custom protocol like `[API Integration Guide](task://189571b0-...)`:

![Raw markdown showing task:// protocol links](https://pub-35d77f83ee8a41798bb4b2e1831ac70a.r2.dev/features/blog/markdown-features/entity-links-raw.png)

This turns your task descriptions into a connected wiki, where context flows naturally between related items.

### Everything Works in the CLI Too

Write your markdown content locally and apply it through the `ud` CLI. The markdown renders identically in the web app, desktop app, and shared views. Your content stays portable and version-controllable.

---

Markdown support in UnDercontrol means your tasks can be as detailed and technical as they need to be — without leaving the tool where the work gets tracked. Code blocks, diagrams, tables, and checklists all live alongside your task status, deadlines, and collaboration context.

Try it out — create a task and type `/` to see what's possible.
