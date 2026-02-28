---
title: 工作区终端
description: 从任务详情直接启动 Claude Code 实现任务（Electron 桌面版功能）
sidebar_position: 6
---

# 工作区终端

工作区终端是 Electron 桌面应用的功能，可以打开一个专用窗口，用 Claude Code 来实现任务。窗口左侧显示任务详情，右侧是连接到真实 PTY 进程的嵌入式终端。

## 概述

点击任务操作栏中的终端图标后，会打开一个新的工作区窗口：

- **左侧面板**：任务详情，支持自动刷新（检测 ud CLI 添加的备注更新）
- **右侧面板**：xterm.js 终端，运行 Claude Code 的 `/init-task` 工作流

终端启动时自动运行 `claude --dangerously-skip-permissions "/init-task <task-id>"`，Claude Code 会读取任务、细化需求、规划实现，并通过任务备注追踪进度。

> 此功能仅在 Electron 桌面应用中可用。

## 快速开始

1. 打开 Electron 桌面应用
2. 进入看板设置（齿轮图标），配置 **项目目录**
3. 打开该看板上的任意任务
4. 点击操作栏中的 **终端图标**
5. 工作区窗口打开，Claude Code 自动开始实现任务

## 看板配置

每个看板在其 metadata 中存储工作区设置。在看板标题栏的齿轮图标点击打开设置抽屉进行配置。

### 项目目录

工作区终端的工作目录。设置后，该看板上所有任务的工作区终端都会以此为起始目录。

**示例**：设置为 `/Users/me/projects/my-app`，Claude Code 将在该目录下运行，可以访问你的项目文件。

如果未设置，终端默认使用 HOME 目录。

### Tmux 会话

可选配置。设置后，Claude Code 命令会被包装在指定名称的 tmux 会话中：

```bash
tmux new-session -As <会话名> 'claude --dangerously-skip-permissions "/init-task <task-id>"'
```

**行为说明**：
- 如果会话已存在：自动附加到该会话
- 如果会话不存在：创建新会话并运行 Claude Code
- 关闭工作区窗口不会终止 tmux 会话，它会在后台继续运行
- 重新打开工作区会重新附加到运行中的会话

适用于长时间运行的实现工作，即使关闭窗口也希望 Claude Code 会话保持运行。

## 配置解析链

工作区选项从任务所在的看板解析：

```
任务 → findTaskCurrentBoard(task, boards) → board.metadata.projectDir → 终端 cwd
任务 → findTaskCurrentBoard(task, boards) → board.metadata.tmuxSession → tmux 会话名
```

**回退值**：如果未找到看板配置，终端使用 HOME 作为工作目录，且不使用 tmux。

任务与看板的映射通过 `findTaskCurrentBoard()` 函数实现，该函数检查哪个看板的列查询匹配该任务。

## 架构

### 组件

| 组件 | 位置 | 职责 |
|------|------|------|
| `workspace-manager.js` | Electron 主进程 | 为每个任务创建 BrowserWindow + PTY |
| `preload/index.js` | Electron 预加载脚本 | 通过 contextBridge 暴露 `workspaceApi` |
| `workspace.ts` | Vite 应用 | 渲染进程的类型化 API 封装 |
| `TaskActions.tsx` | Vite 应用 | 按钮 + 看板配置解析 |
| 工作区页面 | Vite 应用 | 分屏布局 + xterm.js 终端 |

### 数据流

```
TaskActions（点击）
  → 解析看板 metadata（projectDir、tmuxSession）
  → openWorkspace(taskId, { cwd, tmuxSession })
  → IPC invoke 'workspace:open'
  → workspace-manager 创建 BrowserWindow + 启动 PTY
  → PTY 在第一个 shell 提示符出现时发送 claude 命令
  → PTY 输出 → IPC → xterm.js 渲染
  → 用户键盘输入 → IPC → PTY stdin
```

### IPC 通道

| 通道 | 方向 | 用途 |
|------|------|------|
| `workspace:open` | 渲染 → 主 | 打开工作区窗口 |
| `workspace:close` | 渲染 → 主 | 关闭工作区窗口 |
| `workspace:pty-data` | 主 → 渲染 | PTY 标准输出数据 |
| `workspace:pty-input` | 渲染 → 主 | 用户键盘输入 |
| `workspace:pty-resize` | 渲染 → 主 | 终端大小调整事件 |
| `workspace:pty-exit` | 主 → 渲染 | PTY 进程退出 |
| `workspace:closed` | 主 → 渲染 | 窗口已关闭 |

### 窗口管理

- **每个任务一个窗口**：重复打开同一任务会聚焦已有窗口
- **位置持久化**：窗口位置保存在 `~/.undercontrol/workspace-positions.json`
- **级联定位**：新窗口相对上一个偏移 30px
- **关闭时清理**：窗口关闭时终止 PTY 进程

## 终端详情

### Shell 启动

工作区启动一个非登录 shell（快速启动），并增强环境变量：

- `TERM=xterm-256color` 支持完整颜色
- `COLORTERM=truecolor` 支持 24 位真彩色
- PATH 扩展了常用工具路径（`/usr/local/bin`、`/opt/homebrew/bin`、`~/.local/bin` 等）

### 命令执行

Claude 命令在第一个提示符出现后发送到 shell（通过检测首次 PTY 数据事件），确保 shell 就绪后再执行：

```javascript
// 不使用 tmux：
claude --dangerously-skip-permissions "/init-task <task-id>"

// 配置了 tmux 会话时：
tmux new-session -As <会话名> 'claude --dangerously-skip-permissions "/init-task <task-id>"'
```

Claude Code 退出后，shell 保持活跃，可以继续运行其他命令。

## 故障排除

### 终端显示错误的目录

**问题**：终端在 HOME 目录启动，而不是项目目录。

**解决方案**：检查看板设置中是否配置了项目目录。任务必须在该看板上（通过列查询匹配）。更改看板设置后，可能需要重启 Electron 应用以使主进程更改生效。

### node-pty 启动错误

**问题**：控制台出现 "NODE_MODULE_VERSION mismatch" 之类的错误。

**解决方案**：在 `ud-electron-vite` 目录下运行 `npx electron-rebuild` 重新编译原生模块。Electron 或 Node.js 版本变更后需要执行此操作。

### Tmux 会话未持久化

**问题**：关闭工作区窗口后 Claude Code 会话被终止。

**解决方案**：确保在看板设置中配置了 **Tmux 会话** 字段。如果未配置，关闭窗口时 PTY 进程会被直接终止。配置了 tmux 后，关闭窗口只是断开 tmux 客户端，会话在后台继续运行。

### 窗口打开但终端空白

**问题**：工作区窗口打开了，但终端面板什么都没显示。

**解决方案**：可能是 node-pty 加载失败。检查 Electron 主进程控制台是否有 `[WorkspaceManager] Failed to load node-pty` 错误。运行 `npx electron-rebuild` 修复原生模块问题。
