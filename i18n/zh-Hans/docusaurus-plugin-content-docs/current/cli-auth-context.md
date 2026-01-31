---
title: CLI 多账户认证
description: 使用 kubectl 风格的上下文管理多个账户和 API 端点
sidebar_position: 5
---

# CLI 多账户认证

UnderControl CLI 支持使用 kubectl 风格的上下文系统管理多个账户和 API 端点。这让你可以轻松切换不同的服务器、账户或环境。

## 概述

一个 **上下文（Context）** 是一个命名配置，包含：
- API URL（服务器端点）
- 认证令牌或 API 密钥
- 用户名（用于显示）

你可以拥有多个上下文（如 `personal`、`work`、`staging`）并即时切换。

## 配置文件

上下文存储在 `~/.config/ud/config.yaml`：

```yaml
current-context: personal
contexts:
- name: personal
  context:
    api_url: https://api.undercontrol.app
    token: eyJhbGciOi...
    user: john@example.com
- name: work
  context:
    api_url: https://ud.company.com
    token: eyJhbGciOi...
    user: john@company.com
- name: staging
  context:
    api_url: http://localhost:4000
    api_key: ak_test_xxx
```

## 命令

### 列出所有上下文

```bash
ud config get-contexts
```

输出：
```
CURRENT  NAME      API URL                      USER
*        personal  https://api.undercontrol.app john@example.com
         work      https://ud.company.com       john@company.com
         staging   http://localhost:4000        (api-key)
```

`*` 表示当前激活的上下文。

### 切换上下文

```bash
ud config use-context work
```

输出：
```
Switched to context "work".
```

### 显示当前上下文

```bash
ud config current-context
```

输出：
```
work
```

### 创建或更新上下文

```bash
# 创建新上下文
ud config set-context staging --api-url http://localhost:4000

# 使用 API 密钥创建（用于 CI/CD）
ud config set-context ci --api-url https://api.example.com --api-key ak_xxx

# 更新现有上下文
ud config set-context work --api-url https://new-api.company.com
```

### 删除上下文

```bash
ud config delete-context staging
```

### 重命名上下文

```bash
ud config rename-context work production
```

### 查看完整配置

```bash
ud config view
```

输出（令牌会部分遮蔽）：
```
current-context: personal
contexts:
- name: personal
  context:
    api_url: https://api.undercontrol.app
    user: john@example.com
    token: eyJhbGciOi...xyz
- name: work
  context:
    api_url: https://ud.company.com
    user: john@company.com
    token: eyJhbGciOi...abc
```

## 登录时指定上下文

登录时，你可以指定将凭据保存到哪个上下文：

```bash
# 登录并保存到新上下文
ud login --context work --api-url https://ud.company.com

# 登录到现有上下文（更新凭据）
ud login --context personal
```

## 环境变量覆盖

你可以使用环境变量覆盖上下文设置：

| 变量 | 说明 |
|------|------|
| `UD_CONTEXT` | 覆盖当前上下文 |
| `UD_API_URL` | 覆盖 API URL |
| `UD_API_KEY` | 覆盖 API 密钥 |
| `UD_TOKEN` | 覆盖认证令牌 |

示例：
```bash
# 单次命令使用不同上下文
UD_CONTEXT=staging ud task list

# 临时覆盖 API URL
UD_API_URL=http://localhost:4000 ud task list
```

## 常用工作流

### 个人 + 工作 配置

```bash
# 设置个人账户
ud login --context personal --api-url https://api.undercontrol.app

# 设置工作账户
ud login --context work --api-url https://ud.company.com

# 在它们之间切换
ud config use-context personal
ud task list  # 列出个人任务

ud config use-context work
ud task list  # 列出工作任务
```

### 开发 + 生产 环境

```bash
# 本地开发
ud config set-context dev --api-url http://localhost:4000
ud login --context dev

# 生产环境
ud login --context prod --api-url https://api.undercontrol.app

# 快速切换
ud config use-context dev
ud config use-context prod
```

### CI/CD 使用 API 密钥

```bash
# 使用 API 密钥创建上下文（无需交互式登录）
ud config set-context ci \
  --api-url https://api.undercontrol.app \
  --api-key ak_your_api_key

# 在 CI/CD 脚本中使用
ud config use-context ci
ud task create "部署完成" -d "版本 1.2.3"
```

或使用环境变量：
```bash
export UD_API_URL=https://api.undercontrol.app
export UD_API_KEY=ak_your_api_key
ud task list
```

## 从单上下文迁移

如果你有使用旧格式单上下文的配置文件：

```yaml
# 旧格式
api_url: https://api.undercontrol.app
token: eyJhbGciOi...
```

CLI 会自动迁移到新格式：

```yaml
# 新格式（自动迁移）
current-context: default
contexts:
- name: default
  context:
    api_url: https://api.undercontrol.app
    token: eyJhbGciOi...
```

无需手动操作 - 首次使用时自动迁移。

## 故障排除

### 找不到上下文

```
Error: context "work" not found
```

**解决方案**：先创建上下文 `ud config set-context work --api-url <url>` 或 `ud login --context work`。

### 未登录

```
Error: not logged in. Run 'ud login' first or set UD_API_KEY environment variable
```

**解决方案**：当前上下文没有认证信息。运行 `ud login` 或设置 `UD_API_KEY`。

### 上下文错误

如果命令请求到了错误的服务器，检查当前上下文：

```bash
ud config current-context
ud config get-contexts
```

使用 `ud config use-context <name>` 切换到正确的上下文。
