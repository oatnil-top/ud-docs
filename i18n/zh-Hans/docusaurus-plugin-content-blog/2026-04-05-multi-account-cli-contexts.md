---
title: 使用 CLI Context 管理多个账户
description: 了解 UnDercontrol 仿 kubectl 风格的 context 系统如何让你在命令行中自由切换多个账户和自托管实例。
authors: [lintao]
tags: [feature]
date: 2026-04-05
---

如果你同时运行多个 UnDercontrol 实例——比如一个个人服务器和一个工作服务器——你大概已经体会过在不同 API 端点和凭据之间反复切换的麻烦。`ud` CLI 现在内置了一套仿照 `kubectl` 设计的 context 系统，切换账户只需一条命令，再也不用手动折腾环境变量。

## 什么是 Context

`ud` 中的 context 是一个具名配置文件，包含三个要素：API 端点、一组凭据（来自交互式登录的会话 token，或静态 API key），以及其他针对该实例的偏好设置。Context 存储在本地，你的配置不会被发送到任何地方。

一个典型的 context 列表大致如下：

```
NAME          ENDPOINT                          CURRENT
personal      https://ud.home.example.com       *
work          https://ud.corp.example.com
local         http://localhost:4000
```

星号标记的是当前激活的 context。你执行的每一条 `ud` 命令都会使用该 context，除非你主动覆盖它。

## 切换 Context

切换只需运行：

```
ud ctx use work
```

就这样。接下来执行的 `ud task list` 或 `ud expense add` 都会访问工作服务器并使用工作凭据。切换回去同样简单：

```
ud ctx use personal
```

如果不想记 context 名称，直接运行 `ud ctx use`（不带参数）会打开一个交互式 TUI 选择器。你会看到一个支持模糊搜索的 context 列表，用方向键导航，按 Enter 确认。操作方式和 `kubectx` 或基于 `fzf` 的 shell 脚本如出一辙，但已内置于 CLI 中，无需额外配置。

## 添加 Context

创建一个 context 非常简单：

```
ud ctx add personal --endpoint https://ud.home.example.com
```

添加之后，运行 `ud ctx login personal` 即可完成交互式身份验证并保存 token。如果你是为共享环境或无界面环境配置 context，也可以直接传入 API key：

```
ud ctx add ci --endpoint https://ud.corp.example.com --api-key <your-key>
```

对于 CI/CD 流水线、定时任务或任何无法进行交互式登录的场景，API key 是更合适的选择。在 UnDercontrol Web 界面的 Settings 中生成一个 API key，然后在 context 配置中引用即可。无需浏览器，无需交互提示。

## 环境变量覆盖

有时你只想为某一条命令指定特定实例，而不想永久切换当前 context。两个环境变量可以满足这个需求：

```
UD_CONTEXT=work ud task list
UD_ENDPOINT=http://localhost:4000 UD_API_KEY=dev-key ud expense list
```

`UD_CONTEXT` 通过名称选择一个已有的 context；`UD_ENDPOINT` 和 `UD_API_KEY` 组合使用，则可以直接指向任意端点，完全不需要预先创建具名 context。在脚本中你希望显式控制目标实例、而不是依赖运行脚本的机器上碰巧激活的 context 时，这个方式非常实用。

## 各 Context 独立的身份验证

每个 context 都有独立的身份验证状态，互不影响。退出一个 context 不会影响其他 context。如果你工作 context 的会话 token 过期了，执行 `ud ctx login work` 即可刷新，不会动到个人或本地 context。Token 存储在一个独立的本地凭据文件中，与 context 定义分离，因此你可以跨机器共享 context 配置文件，而不必担心泄露凭据。

## 查看当前 Context

在调试脚本或排查意外的 API 响应时，确认当前激活的 context 往往很有帮助：

```
ud ctx current
```

该命令会打印当前 context 的名称、端点和身份验证方式。结合 `ud ctx list` 可以获得完整的概览。

## 对自托管用户的意义

UnDercontrol 的核心理念是：你的数据属于你自己。自托管是第一优先级的使用方式，而非可有可无的附加选项。context 系统正是这一理念的体现：它假设你可能同时运行多个实例，希望在它们之间无缝切换，并且可以在不牺牲安全性的前提下实现自动化。

无论你是在家里管理个人实例、运行家庭服务器和工作部署，还是在本地开发实例和生产环境之间并行工作，context 都能为你提供清晰的心智模型和统一的 CLI 操作界面。

## 开始使用

如果你还没有部署 UnDercontrol，自托管指南介绍了如何用 Docker 在十分钟内启动一个实例。实例运行后，通过 Homebrew 或二进制发布包安装 `ud` CLI，然后用 `ud ctx add` 配置你的第一个 context。

关于 context 系统的完整文档——包括凭据文件格式和所有可用参数——请参阅文档中的 CLI 参考章节。
