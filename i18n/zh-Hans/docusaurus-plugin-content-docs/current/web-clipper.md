---
title: Web Clipper (Chrome 扩展)
description: 将网页保存为 UnderControl 任务，附带完整页面快照
sidebar_position: 8
---

# Web Clipper (Chrome 扩展)

UnderControl Web Clipper 是一个 Chrome 浏览器扩展，可以将网页保存为 UnderControl 任务，并附带完整的 HTML 页面快照作为资源附件。

## 功能特点

- **一键保存** — 点击扩展图标，编辑标题，保存整个页面
- **完整快照** — 使用 [SingleFile](https://github.com/nicoleahmed/SingleFile) 将页面捕获为单个 HTML 文件
- **自动附件** — HTML 快照作为资源附件关联到新创建的任务
- **自定义标题** — 保存前可编辑任务标题（默认为页面标题）
- **API Key 认证** — 使用 UnderControl API Key 安全连接

## 安装

扩展目前尚未发布到 Chrome 网上应用店，需要从源码安装：

1. 下载或克隆 [`ud-chrome-extension`](https://github.com/user/ud-chrome-extension) 仓库
2. 打开 Chrome，访问 `chrome://extensions`
3. 开启右上角的 **开发者模式**
4. 点击 **加载已解压的扩展程序**
5. 选择 `ud-chrome-extension` 文件夹

扩展图标将出现在 Chrome 工具栏中。

## 配置

### 第一步：获取 API Key

1. 登录 UnderControl Web 应用
2. 进入 **设置** → **API Keys**
3. 点击 **创建 API Key** — 密钥以 `ak_` 开头
4. 复制密钥（仅显示一次）

> 查看 [API Keys 文档](/docs/advanced/api-keys) 了解 API Key 管理详情。

### 第二步：配置扩展

1. 点击 Chrome 工具栏中的 UnderControl 图标
2. 输入你的 **API URL**（例如 `https://api.undercontrol.app`）
3. 输入你的 **API Key**（以 `ak_` 开头）
4. 点击 **Test** 验证连接
5. 应显示 "Connected as [你的用户名]"
6. 点击 **Save**

## 使用方法

### 保存页面

1. 浏览到你想保存的网页
2. 点击工具栏中的 UnderControl 图标
3. 根据需要编辑任务标题（默认为页面标题）
4. 点击 **Save Page**
5. 等待捕获完成 — 成功后弹窗自动关闭

保存的页面将作为新任务出现在你的 UnderControl 任务列表中。完整的 HTML 页面快照作为资源附件。

### 管理设置

- **Settings** — 点击底部的 Settings 链接修改 API URL 或 API Key
- **Test** — 保存前验证连接
- **Clear** — 清除所有配置，重新开始

## 工作原理

1. 点击 **Save Page** 时，扩展将 SingleFile 库注入当前标签页
2. SingleFile 将整个页面（HTML、CSS、图片、字体）捕获为一个自包含的 HTML 文件
3. 扩展通过 [资源 API](/docs/features/resources) 将 HTML 文件上传到你的 UnderControl 服务器
4. 创建一个新任务，HTML 文件作为资源附件

## 限制

- 无法捕获 Chrome 内部页面（`chrome://`、`chrome-extension://`）
- 内容非常复杂的页面可能需要最多 2 分钟
- HTML 快照是时间点捕获 — 如果原始页面发生变化，快照不会更新

## 故障排除

### "Invalid API key"

- 确认密钥以 `ak_` 开头
- 从 Web 应用的设置 → API Keys 重新生成密钥
- 确认 API URL 正确

### "Cannot reach server"

- 检查网络连接
- 确认 API URL（末尾不要有斜杠）
- 确保服务器正在运行且可访问

### 捕获失败或超时

- 包含大量媒体内容的页面需要更长时间
- 尝试在捕获前刷新页面
- Chrome 内部页面无法捕获

### "Invalid format" 错误

- 通常表示服务器版本过旧
- 将 UnderControl 后端更新到最新版本

## 开源信息

Web Clipper 采用 **AGPL-3.0** 许可证开源，因为它集成了 [SingleFile](https://github.com/nicoleahmed/SingleFile) 库。

- 源代码：[github.com/user/ud-chrome-extension](https://github.com/user/ud-chrome-extension)
- 许可证：AGPL-3.0
