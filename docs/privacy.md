---
title: Privacy Policy
description: UnderControl Web Clipper privacy policy and data usage
sidebar_position: 20
---

# Privacy Policy

Last updated: 2026-02-20

This privacy policy describes how the UnderControl Web Clipper Chrome extension handles user data.

## Single Purpose

This extension captures the current web page as an HTML snapshot and Markdown file, then saves them locally or uploads to an UnderControl server.

## Data Collection

### Data We Collect

| Data Type | Collected | Purpose |
|-----------|-----------|---------|
| Website content | Yes | Page HTML and text are captured when you click "Save". Content is saved to your local disk or uploaded to your own UnderControl server. |
| Authentication info | Yes | Login credentials (tokens, API key) are stored locally in chrome.storage.local to authenticate with your UnderControl server. Credentials are only sent to the server URL you configure. |
| Personal identity | No | — |
| Health info | No | — |
| Financial info | No | — |
| Personal communications | No | — |
| Location | No | — |
| Browsing history | No | The extension does NOT track or collect browsing history. It only processes the current page when you explicitly initiate a save. |
| User activity | No | — |

### How Data Is Used

- **Website content** is captured only when you explicitly click "Save Page" or "Save to Local". It is either downloaded to your local disk or sent to the UnderControl server URL you configured. No content is sent to any third party.
- **Authentication credentials** are stored locally on your device using `chrome.storage.local`. They are only transmitted to the server URL you have configured in the extension settings.

### Data Storage

- All data is stored locally on your device using Chrome's `chrome.storage.local` API.
- No data is stored on our servers. When using the "Save to UnderControl" feature, data is sent to the server URL you configure — this is typically your own self-hosted instance.
- You can clear all stored data at any time by clicking "Logout" in the extension.

## Remote Code

This extension does **not** use remote code. All scripts (SingleFile, Readability, Turndown) are bundled locally in the extension package.

## Permissions

| Permission | Reason |
|------------|--------|
| `activeTab` | Read the content of the current tab when you click "Save" to generate an HTML snapshot and extract Markdown. |
| `storage` | Persist your preferences and authentication state across browser sessions. |
| `scripting` | Inject page capture scripts (SingleFile) and content extraction scripts (Readability + Turndown) into the active tab. |
| `downloads` | Save captured HTML and Markdown files to your local disk. |
| Host permissions (`<all_urls>`) | Capture any web page you visit. SingleFile needs access to page resources (images, styles, fonts) on any domain to create a complete self-contained HTML snapshot. |

## Open Source

The extension is open source under the AGPL-3.0 license. You can review the full source code at [github.com/oatnil-top/ud-chrome-extension](https://github.com/oatnil-top/ud-chrome-extension).

## Contact

If you have questions about this privacy policy, please open an issue on [GitHub](https://github.com/oatnil-top/ud-chrome-extension/issues).
