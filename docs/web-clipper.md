---
title: Web Clipper (Chrome Extension)
description: Save web pages as UnderControl tasks with full-page snapshots
sidebar_position: 8
---

# Web Clipper (Chrome Extension)

The UnderControl Web Clipper is a Chrome browser extension that saves web pages as UnderControl tasks with a full-page HTML snapshot attached as a resource.

## Features

- **One-click save** — Click the extension icon, edit the title, and save
- **Full-page snapshot** — Captures the entire page as a single HTML file using [SingleFile](https://github.com/nicoleahmed/SingleFile)
- **Auto-attachment** — The HTML snapshot is attached as a resource to the newly created task
- **Custom title** — Edit the task title before saving (defaults to the page title)
- **API Key auth** — Connects securely using your UnderControl API key

## Installation

The extension is not yet published on the Chrome Web Store. Install from source:

1. Download or clone the [`ud-chrome-extension`](https://github.com/user/ud-chrome-extension) repository
2. Open Chrome and navigate to `chrome://extensions`
3. Enable **Developer mode** (toggle in the top right)
4. Click **Load unpacked**
5. Select the `ud-chrome-extension` folder

The extension icon will appear in the Chrome toolbar.

## Configuration

### Step 1: Get an API Key

1. Log in to the UnderControl web app
2. Go to **Settings** → **API Keys**
3. Click **Create API Key** — the key starts with `ak_`
4. Copy the key (it's only shown once)

> See the [API Keys documentation](/docs/advanced/api-keys) for details on managing API keys.

### Step 2: Configure the Extension

1. Click the UnderControl icon in the Chrome toolbar
2. Enter your **API URL** (e.g., `https://api.undercontrol.app`)
3. Enter your **API Key** (starts with `ak_`)
4. Click **Test** to verify the connection
5. You should see "Connected as [your username]"
6. Click **Save**

## Usage

### Saving a Page

1. Navigate to the web page you want to save
2. Click the UnderControl icon in the toolbar
3. Edit the task title if desired (pre-filled with the page title)
4. Click **Save Page**
5. Wait for the capture to complete — the popup auto-closes on success

The saved page appears as a new task in your UnderControl task list. The full-page HTML snapshot is attached as a resource.

### Managing Settings

- **Settings** — Click the Settings link at the bottom to change API URL or API Key
- **Test** — Verify your connection before saving
- **Clear** — Remove all configuration and start fresh

## How It Works

1. When you click **Save Page**, the extension injects the SingleFile library into the current tab
2. SingleFile captures the entire page (HTML, CSS, images, fonts) into a single self-contained HTML file
3. The extension uploads the HTML file to your UnderControl server via the [Resource API](/docs/features/resources)
4. A new task is created with the HTML file attached as a resource

## Limitations

- Cannot capture Chrome internal pages (`chrome://`, `chrome-extension://`)
- Very complex pages with heavy dynamic content may take up to 2 minutes
- The HTML snapshot is a point-in-time capture — it won't update if the original page changes

## Troubleshooting

### "Invalid API key"

- Verify the key starts with `ak_`
- Regenerate the key from Settings → API Keys in the web app
- Make sure the API URL is correct

### "Cannot reach server"

- Check your network connection
- Verify the API URL (no trailing slash)
- Ensure your server is running and accessible

### Capture fails or times out

- Some pages with heavy media content take longer
- Try refreshing the page before capturing
- Chrome internal pages cannot be captured

### "Invalid format" error

- This usually means the server version is outdated
- Update your UnderControl backend to the latest version

## Open Source

The Web Clipper is open source under the **AGPL-3.0** license, as it incorporates the [SingleFile](https://github.com/nicoleahmed/SingleFile) library.

- Source code: [github.com/user/ud-chrome-extension](https://github.com/user/ud-chrome-extension)
- License: AGPL-3.0
