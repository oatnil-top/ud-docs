---
title: 可复用的 AI 技能——属于你的提示词模板
description: 了解 UnDercontrol 的技能系统如何让你创建、管理和复用提示词模板，并在团队间共享，可直接通过管道传入 Claude Code 或任意 AI 代理。
authors: [lintao]
tags: [feature]
date: 2026-04-12
---

如果你经常使用 AI 助手，大概已经积累了一套真正好用的提示词。那个总能产出干净结果的重构提示词，符合团队风格的提交信息模板，还有每次生产故障时都要粘贴一遍的 bug 排查清单。

问题在于，这些提示词要么藏在你脑子里，要么贴在便利贴上，要么埋在一个没人记得打开的 Notion 文档里。UnDercontrol 的技能系统就是为了解决这个问题。

## 什么是技能？

技能是存储在 UnDercontrol 中的具名、可复用提示词模板。每个技能都有一个 slug（例如 `refactor-ts`、`daily-standup`、`pr-review`），一段 markdown 正文，并归属于某个群组。最后这一点很重要——技能的作用域是群组级别的，团队可以共享同一套提示词库，而不需要每个人各自维护一份副本。

你可以通过 Web 界面创建和编辑技能，通过 CLI 管理技能，也可以通过 YAML 文件以声明式方式应用技能。markdown 内容支持各种提示词结构：指令、变量、多步骤工作流，满足你的任何使用场景。

## 创建技能

在 Web 编辑器中，创建技能就像写一篇笔记一样简单。给它起个名字、设定一个 slug，然后在 markdown 编辑器里写好提示词内容。保存之后，群组内的所有人立即可以使用。

通过 CLI，你可以像应用 Kubernetes 清单一样应用技能定义：

```
ud apply -f my-skill.yaml
```

YAML 文件的格式大致如下：

```yaml
kind: Skill
metadata:
  slug: pr-review
  name: PR Review Checklist
spec:
  content: |
    Review the following pull request diff and provide feedback on:
    - Logic correctness
    - Error handling
    - Test coverage
    - Naming and readability

    Diff:
    {{input}}
```

这让技能具备了可移植性。你可以将它们纳入 dotfiles 仓库，和其他配置一起做版本管理，然后用一条命令部署到新的 UnDercontrol 实例。

## 使用技能——`ud prompt` 命令

技能真正的价值体现在使用方式上。`ud prompt` 命令通过 slug 获取技能内容，并将其输出到 stdout。之后你可以将它管道传递到任何地方。

想把技能传入 Claude Code？

```
ud prompt pr-review | claude
```

想在发送给 AI 代理之前，将本地文件内容和技能内容组合起来？

```
cat git.diff | ud prompt pr-review | claude
```

因为输出的就是标准的 stdout，`ud prompt` 可以与任何从 stdin 读取内容的工具配合使用——Claude Code、其他本地 AI 代理、shell 管道，一切都取决于你的工作流。UnDercontrol 不试图掌控 AI 层，它只是帮你管理好提示词，让你不必为此操心。

## 内置系统技能

UnDercontrol 内置了一套面向常见开发任务的系统技能。这些技能是只读的（不会被意外覆盖），同时也是理解技能结构的良好参考。你可以像调用自定义技能一样，通过 slug 引用它们。

系统技能涵盖摘要生成、代码解释、变更日志生成等场景——这类实用提示词频繁出现，却不值得每次都重新发明。

## 长期管理技能

技能是 UnDercontrol 中的一等资源，通过 Web 界面和 CLI 均支持完整的增删改查操作。

- `ud get skills` — 列出群组中的所有技能
- `ud get skill pr-review` — 查看某个技能的详情
- `ud delete skill pr-review` — 删除不再需要的技能
- `ud apply -f skills/` — 一次性应用整个目录下的技能定义

Web 编辑器适合快速编辑和浏览现有技能，CLI 则更适合自动化、批量更新，以及将提示词库作为代码来管理。

## 为什么这很重要

技能背后的理念很简单：好用的提示词值得保留。将它们存储在一个自托管、群组作用域的系统中，意味着它们不会因为某人离职而消失，不会淹没在聊天记录里，也不需要每个人独立摸索出同样的工作流。

这也保护了你的提示词隐私。由于 UnDercontrol 是自托管的，你的提示词库——其中往往沉淀着组织知识、内部流程和特定领域的上下文——始终存放在你自己的基础设施上。

## 立即开始

技能功能今天就可以在 UnDercontrol 中使用。如果你已经在运行实例，请在群组设置中查看技能部分。如果你是首次部署，自托管指南可以帮助你在大约十分钟内完成部署。

[阅读文档](https://undercontrol.dev/docs)或[部署自己的实例](https://undercontrol.dev/docs/self-hosting)即可开始。
