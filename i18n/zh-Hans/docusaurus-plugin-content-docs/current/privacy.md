---
title: 隐私政策
description: UnderControl Web Clipper 隐私政策与数据使用说明
sidebar_position: 20
---

# 隐私政策

最后更新：2026-02-20

本隐私政策说明 UnderControl Web Clipper Chrome 扩展如何处理用户数据。

## 单一用途

本扩展将当前网页捕获为 HTML 快照和 Markdown 文件，然后保存到本地或上传到 UnderControl 服务器。

## 数据收集

### 我们收集的数据

| 数据类型 | 是否收集 | 用途 |
|---------|---------|------|
| 网站内容 | 是 | 当您点击"保存"时，会捕获页面 HTML 和文本内容。内容保存到本地磁盘或上传到您自己的 UnderControl 服务器。 |
| 身份验证信息 | 是 | 登录凭据（令牌、API 密钥）存储在 chrome.storage.local 中，用于与您的 UnderControl 服务器进行身份验证。凭据仅发送到您配置的服务器地址。 |
| 个人身份信息 | 否 | — |
| 健康信息 | 否 | — |
| 财务和付款信息 | 否 | — |
| 个人通讯 | 否 | — |
| 位置 | 否 | — |
| 网络记录 | 否 | 本扩展不会跟踪或收集浏览历史。仅在您主动发起保存时处理当前页面。 |
| 用户活动 | 否 | — |

### 数据如何使用

- **网站内容** 仅在您明确点击"Save Page"或"Save to Local"时捕获。内容会下载到本地磁盘或发送到您配置的 UnderControl 服务器地址。不会将任何内容发送给第三方。
- **身份验证凭据** 使用 `chrome.storage.local` 存储在您的设备本地。仅传输到您在扩展设置中配置的服务器地址。

### 数据存储

- 所有数据使用 Chrome 的 `chrome.storage.local` API 存储在您的设备本地。
- 我们的服务器不存储任何数据。使用"Save to UnderControl"功能时，数据发送到您配置的服务器地址——通常是您自己的自托管实例。
- 您可以随时通过点击扩展中的"Logout"清除所有存储的数据。

## 远程代码

本扩展**不使用**远程代码。所有脚本（SingleFile、Readability、Turndown）均打包在扩展包内。

## 权限说明

| 权限 | 原因 |
|------|------|
| `activeTab` | 在您点击"保存"时读取当前标签页的内容，以生成 HTML 快照和提取 Markdown。 |
| `storage` | 在浏览器会话间保存您的偏好设置和身份验证状态。 |
| `scripting` | 将页面捕获脚本（SingleFile）和内容提取脚本（Readability + Turndown）注入到活动标签页中。 |
| `downloads` | 将捕获的 HTML 和 Markdown 文件保存到本地磁盘。 |
| 主机权限 (`<all_urls>`) | 捕获您访问的任何网页。SingleFile 需要访问任何域上的页面资源（图片、样式、字体）以创建完整的自包含 HTML 快照。 |

## 开源

本扩展在 AGPL-3.0 许可证下开源。您可以在 [github.com/oatnil-top/ud-chrome-extension](https://github.com/oatnil-top/ud-chrome-extension) 查看完整源代码。

## 联系方式

如果您对本隐私政策有疑问，请在 [GitHub](https://github.com/oatnil-top/ud-chrome-extension/issues) 上提交 issue。
