---
title: 使用 CLI Context 管理多个账户
description: 了解 UnDercontrol 仿 kubectl 风格的 context 系统如何让你在命令行中自由切换多个账户和自托管实例。
authors: [lintao]
tags: [feature]
date: 2026-04-05
---

如果你同时运行多个 UnDercontrol 实例——比如一个个人服务器和一个工作服务器——你大概已经体会过在不同 API 端点和凭据之间反复切换的麻烦。`ud` CLI 内置了一套仿照 `kubectl` 设计的 context 系统，切换账户只需一条命令。

<!-- truncate -->

## 什么是 Context

`ud` 中的 context 是一个具名配置，包含：API 端点、凭据（交互式登录的会话 token 或静态 API key），以及显示用户名。Context 存储在本地的 `~/.config/ud/config.yaml` 中，不会被发送到任何地方。

一个典型的 context 列表：

```
$ ud config get-contexts
CURRENT  NAME      API URL                           USER
*        personal  https://ud.home.example.com       me@example.com
         work      https://ud.corp.example.com       me@corp.com
         local     http://localhost:4000              admin@oatnil.com
```

星号标记当前激活的 context。你执行的每一条 `ud` 命令都会使用该 context，除非主动覆盖。

## 创建你的第一个 Context

最快的方式是通过登录创建，`-n` 参数一步完成命名：

```bash
# 登录并创建具名 context
ud login --api-url https://ud.home.example.com -n personal

# 再添加一个工作用的
ud login --api-url https://ud.corp.example.com -n work
```

系统会提示输入用户名和密码，完成认证后将 token 保存到对应 context。如果需要为 CI/CD 或无界面环境配置 context，使用 `config set-context` 配合 API key：

```bash
ud config set-context ci --api-url https://ud.corp.example.com --api-key ak_xxxxx
```

在 UnDercontrol Web 界面的 Settings 中生成 API key，运行时无需浏览器交互。

## 切换 Context

切换当前 context：

```bash
ud config use-context work
```

就这样。接下来执行的 `ud get task` 或 `ud describe task` 都会访问工作服务器。切回来同样简单：

```bash
ud config use-context personal
```

在 TUI 中，命令模式下输入 `:ctx` 可打开交互式 context 选择器——方向键导航，Enter 确认。和 `kubectx` 一样的操作习惯。

## 临时覆盖

有时只想为某一条命令指定实例，而不想永久切换。`--context` 参数和环境变量可以做到：

```bash
# 为单条命令使用指定 context
ud --context work get task

# 或通过环境变量
UD_CONTEXT=work ud get task

# 直接指向任意端点，无需预先创建 context
UD_API_URL=http://localhost:4000 UD_API_KEY=dev-key ud get task
```

优先级顺序：`--context` 参数 > `UD_CONTEXT` 环境变量 > 配置文件中的 `current-context`。这使得脚本可以明确指定目标实例，不依赖机器上当前激活的 context。

## 各 Context 独立认证

每个 context 维护独立的认证状态，互不影响。工作 context 的 token 过期了，只需重新登录该 context：

```bash
ud login --context work
```

个人和本地 context 完全不受影响。

## 查看配置

```bash
# 显示当前激活的 context
ud config current-context

# 列出所有 context
ud config get-contexts

# 查看完整配置（token 会被脱敏）
ud config view
```

## 管理 Context

```bash
# 重命名 context
ud config rename-context old-name new-name

# 删除不再需要的 context
ud config delete-context staging
```

如果删除了当前激活的 context，`ud` 会自动切换到第一个可用的 context。

## 对自托管用户的意义

UnDercontrol 的核心理念是：你的数据属于你自己。自托管是第一优先级的使用方式。context 系统正是这一理念的体现——它假设你可能同时运行多个实例，希望无缝切换，并在不牺牲安全性的前提下实现自动化。

无论你是管理个人实例、家庭服务器和工作部署，还是在本地开发和生产环境之间并行工作，context 都能提供清晰的心智模型和统一的 CLI 操作界面。

## 开始使用

通过 Homebrew 安装 `ud` CLI（`brew install oatnil/ud/ud`）或从发布页面下载二进制文件。创建你的第一个 context：

```bash
ud login --api-url https://your-instance.example.com -n myserver
```

完整文档：[CLI 认证与 Context](/docs/cli-auth-context)。
