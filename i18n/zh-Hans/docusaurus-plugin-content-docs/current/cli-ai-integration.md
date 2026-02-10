---
title: CLI AI 助手集成
description: 使用 ud prompt 将 UnderControl 与 Claude Code、Cursor 等 AI 编程助手集成
sidebar_position: 6
---

# CLI AI 助手集成

`ud prompt` 命令生成技能提示词，教会 AI 编程助手如何使用 UnderControl CLI。这使 AI 助手能够管理你的任务、记录进度、上传文件和跟踪工作 — 全部通过自然对话完成。

## 为什么需要 AI 集成？

当 Claude Code 或 Cursor 等 AI 编程助手可以访问你的任务系统时，它们可以：

- **编码前检查上下文** — 阅读任务描述和需求
- **自动记录进度** — 在完成工作时添加备注
- **上传附件** — 将截图、文档或图表附加到任务
- **创建后续任务** — 在实现过程中捕获发现的新问题
- **解析文件附件** — 下载并分析附加到任务的文件

## 快速设置

### Claude Code

```bash
# 创建技能目录
mkdir -p .claude/skills/ud-cli

# 生成技能文件
ud prompt --frontmatter > .claude/skills/ud-cli/SKILL.md
```

就这样。Claude Code 现在会在处理任务时自动使用 ud CLI。

### Cursor / 其他 AI 助手

```bash
# 输出提示词并复制到 AI 指令文件中
ud prompt > .cursorrules
# 或
ud prompt >> .claude/instructions.md
```

## `ud prompt` 命令

```bash
ud prompt [flags]
```

输出一份全面的技能提示词，涵盖所有 CLI 命令、最佳实践和 AI 助手工作流。

**标志：**

| 标志 | 默认值 | 说明 |
|------|--------|------|
| `--frontmatter` | `false` | 包含 Claude Code 技能的 YAML 前置元数据 |
| `--name` | `ud-cli` | 前置元数据中的技能名称 |
| `--description` | *(自动)* | 前置元数据中的技能描述 |

**示例：**

```bash
# 预览提示词
ud prompt

# 保存为 Claude Code 技能（推荐）
ud prompt --frontmatter > .claude/skills/ud-cli/SKILL.md

# 自定义技能名称
ud prompt --frontmatter --name my-tasks > .claude/skills/my-tasks/SKILL.md

# 追加到现有指令文件
ud prompt >> .cursor/instructions.md
```

:::tip 自动更新
提示词由 CLI 程序本身生成，因此始终与你安装的版本匹配。更新 CLI 后，重新生成技能文件即可获取最新命令：

```bash
ud prompt --frontmatter > .claude/skills/ud-cli/SKILL.md
```
:::

## 提示词包含的内容

生成的提示词包含以下指导：

### 任务管理
- 使用 `ud apply`（kubectl 风格）创建任务
- 查看和查询任务
- 标记任务完成
- 创建带链接的子任务

### 进度跟踪
- 添加备注记录实现进度
- 包含 commit 哈希以便追踪
- 记录决策和阻塞问题
- 基于会话的任务跟踪（记住任务 ID）

### 文件操作
- 使用 `ud upload resource` 上传文件
- 将文件附加到任务
- 通过预签名 URL 下载资源
- 从任务描述中解析 `resource://` URI

### 实体查询
- 使用 `ud entity get` 通过 UUID 检索任何实体
- 自动检测实体类型（任务、预算、费用、文件）
- 获取文件资源的预签名下载 URL

## AI 工作流示例

以下是典型的 AI 辅助开发会话：

```
你：    "处理任务 abc-123"
AI：    [执行：ud describe task abc-123]
        "我看到这个任务是关于添加用户认证的。
         我会在本次会话中跟踪任务 abc-123 的进度。"

你：    "实现它"
AI：    [实现功能]
        [执行：ud task note add abc-123 "实现了 JWT 认证中间件。
         Commit: def456"]
        "完成了。我已添加认证中间件并记录了进度。
         要把这个任务标记为完成吗？"

你：    "是的，再把架构图附上"
AI：    [执行：ud task done abc-123]
        [执行：ud upload resource ./auth-flow.png -t todolist -e abc-123]
        "任务已完成，图表已附加。"
```

## 最佳实践

### 项目级 vs 全局设置

**项目级**（推荐）：将技能文件放在项目的 `.claude/skills/` 目录中。这样 AI 助手只在该项目中使用 CLI。

```bash
cd your-project
mkdir -p .claude/skills/ud-cli
ud prompt --frontmatter > .claude/skills/ud-cli/SKILL.md
```

**全局**：放在用户主目录下，对所有项目生效。

```bash
mkdir -p ~/.claude/skills/ud-cli
ud prompt --frontmatter > ~/.claude/skills/ud-cli/SKILL.md
```

### 版本控制

你可以将技能文件提交到仓库，这样团队成员自动获得 AI 集成：

```bash
git add .claude/skills/ud-cli/SKILL.md
git commit -m "添加 ud CLI 技能以支持 AI 助手"
```

### 多上下文设置

如果你使用多个 ud 上下文（个人/工作），AI 助手会使用当前活跃的上下文：

```bash
# 在 AI 会话前设置工作上下文
ud config use-context work

# AI 助手现在将操作你的工作任务
```

## 支持的 AI 助手

| 助手 | 设置方式 |
|------|----------|
| Claude Code | `ud prompt --frontmatter > .claude/skills/ud-cli/SKILL.md` |
| Cursor | `ud prompt > .cursorrules` |
| GitHub Copilot | `ud prompt > .github/copilot-instructions.md` |
| 其他 | 将 `ud prompt` 输出复制到你的 AI 指令文件中 |

## 故障排除

### AI 没有使用 CLI

**问题：** 即使有技能文件，AI 也不使用 ud 命令。

**解决方案：**
1. 确认技能文件存在：`cat .claude/skills/ud-cli/SKILL.md`
2. 确保已登录：`ud config current-context`
3. 重新生成技能文件：`ud prompt --frontmatter > .claude/skills/ud-cli/SKILL.md`

### AI 使用了错误的上下文

**问题：** AI 在错误的账户/服务器上操作。

**解决方案：** 在启动 AI 会话前切换上下文：
```bash
ud config use-context <correct-context>
```

### 技能文件过期

**问题：** AI 不知道新命令（如 `upload resource`）。

**解决方案：** CLI 更新后重新生成：
```bash
ud prompt --frontmatter > .claude/skills/ud-cli/SKILL.md
```
