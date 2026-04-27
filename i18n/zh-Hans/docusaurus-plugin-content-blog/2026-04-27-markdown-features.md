---
title: "任务中的富文本 Markdown — 代码、图表，一应俱全"
description: UnDercontrol 任务支持完整的 Markdown 渲染，包括语法高亮代码块、Mermaid 图表、表格、清单，以及斜杠命令菜单实现快速排版。
authors: [lintao]
tags: [feature, markdown, productivity]
date: 2026-04-27
---

### 什么是任务（Task）？

在 UnDercontrol 中，Task（任务） 是信息的核心载体。如果你用过 Jira，可以把它理解为 Issue；如果你用过 Obsidian，可以把它理解为一篇 Note。Task 的本质是一段绑定了状态的主体内容，围绕它有一系列一等公民属性（标题、标签、链接关系等），同时支持无限的自定义元数据字段（键值对），让你可以将任何信息附加其上。通过笔记（Notes）机制，Task 还能不断演进——记录进展、讨论和决策，随时间沉淀为完整的知识上下文。

而这篇文章要讲的，是 Task 的主体内容——Description——支持怎样的富文本能力。

<!-- truncate -->

### 富文本 Markdown 编辑器

UnDercontrol 的 Markdown 编辑器基于 [Tiptap 3](https://tiptap.dev/) 构建，提供所见即所得的富文本编辑体验，同时完整支持 Markdown 语法。用 Markdown 书写或使用可视化编辑器——内容都会完美渲染。

### 斜杠命令 — 无需离开键盘即可排版

在任务描述的任意位置输入 `/`，即可打开命令菜单。从这里可以插入标题、代码块、表格、Mermaid 图表、清单等——全程无需使用鼠标。

![编辑器中的斜杠命令菜单](https://pub-35d77f83ee8a41798bb4b2e1831ac70a.r2.dev/features/blog/markdown-features/slide-2.png)

斜杠菜单支持：
- **标题**（H1–H5）用于文档结构
- **任务列表**，带有可交互的复选框
- **代码块**，支持语言选择和语法高亮
- **Mermaid 图表**，用于流程图、时序图等
- **表格**，支持完整的单元格编辑
- **引用块**、分割线和图片

### 语法高亮代码块

直接将代码粘贴到任务中。编辑器支持 100+ 种编程语言的语法高亮——从 TypeScript、Go 到 SQL、YAML。

![带语法高亮 TypeScript 代码块的任务](https://pub-35d77f83ee8a41798bb4b2e1831ac70a.r2.dev/features/blog/markdown-features/api-task-top.png)

代码块配有语言选择下拉框和一键复制按钮。无论是记录 API 接口还是保存常用的 Shell 命令，代码都保持清晰可读。

### Mermaid 图表 — 在任务中直接可视化架构

最强大的功能之一：在任务描述中直接嵌入 Mermaid 图表。通过斜杠菜单插入 Mermaid 块，编写图表语法，即可实时渲染。

![Mermaid 流程图展示微服务架构](https://pub-35d77f83ee8a41798bb4b2e1831ac70a.r2.dev/features/blog/markdown-features/arch-task-top.png)

支持的图表类型包括：
- **流程图** — 系统架构、决策树
- **时序图** — API 交互流程、认证握手
- **类图** — 数据模型、实体关系
- **状态图** — 工作流状态、生命周期追踪

![Mermaid 时序图展示认证流程](https://pub-35d77f83ee8a41798bb4b2e1831ac70a.r2.dev/features/blog/markdown-features/api-task-mermaid.png)

图表查看器支持全屏预览、SVG 下载，以及自动深色/浅色主题切换。

### 结构化数据表格

需要记录状态码、对比指标或追踪功能矩阵？插入表格后可直接编辑单元格。通过右键菜单添加或删除行列、切换表头行、合并单元格。

![状态码表格和可交互清单](https://pub-35d77f83ee8a41798bb4b2e1831ac70a.r2.dev/features/blog/markdown-features/api-task-table-checklist.png)

### 真正可用的清单

任务列表渲染为可交互的复选框。在渲染视图中直接勾选完成项——无需切换到编辑模式。非常适合追踪子步骤、验收标准或部署清单。

![任务描述中的可交互清单](https://pub-35d77f83ee8a41798bb4b2e1831ac70a.r2.dev/features/blog/markdown-features/slide-5.png)

### AI 驱动的文本操作

选中任务描述中的任意文本，即可显示气泡菜单。除了标准排版（加粗、斜体、删除线），还有 AI 驱动的操作：

- **润色** — 重写选中文本，提升表达清晰度
- **翻译** — 即时翻译为其他语言
- **对话** — 针对选中内容提出问题

![功能概览 — 文档编写的全部工具](https://pub-35d77f83ee8a41798bb4b2e1831ac70a.r2.dev/features/blog/markdown-features/slide-7.png)

### 实体链接 — 像 Wiki 一样连接任务

在描述中直接链接到其他任务、笔记、支出、预算和账户，使用 `task://`、`note://` 等自定义协议。链接渲染为可点击的引用——点击即可跳转到关联的实体。

![任务描述中渲染后的实体链接](https://pub-35d77f83ee8a41798bb4b2e1831ac70a.r2.dev/features/blog/markdown-features/entity-links-rendered.png)

切换到源码模式可以看到原始 markdown——每个链接使用自定义协议，如 `[API Integration Guide](task://189571b0-...)`：

![原始 markdown 展示 task:// 协议链接](https://pub-35d77f83ee8a41798bb4b2e1831ac70a.r2.dev/features/blog/markdown-features/entity-links-raw.png)

这将你的任务描述转变为一个互联的 Wiki，上下文在相关项目之间自然流转。

### CLI 中同样适用

在本地编写 Markdown 内容，通过 `ud` CLI 提交。Markdown 在 Web 应用、桌面应用和分享视图中的渲染效果完全一致。你的内容始终保持可移植、可版本控制。

---

UnDercontrol 的 Markdown 支持意味着你的任务可以承载任意深度的技术细节——而无需离开跟踪工作进展的工具。代码块、图表、表格和清单与任务状态、截止日期和协作上下文共存。

立即尝试——创建一个任务，输入 `/` 看看有什么可能。
