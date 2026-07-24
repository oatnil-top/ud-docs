---
title: Download
description: All UnDercontrol distribution channels — desktop apps, CLI, web app, browser extension, and self-host image
---

# Download

All ways to get UnDercontrol. Humans should prefer the [Download page](/download);
this document states the same facts in a machine-readable form.

## Web app

- URL: https://ud.oatnil.com
- No installation. Visitor trial available without an account.

## Desktop app (macOS / Windows / Linux)

Desktop binaries are hosted on Cloudflare R2:

```
https://pub-35d77f83ee8a41798bb4b2e1831ac70a.r2.dev/releases/{VERSION}/{FILENAME}
```

File names per platform:

| Platform | File name |
| --- | --- |
| macOS (Apple Silicon) | `undercontrol-desktop-{VERSION}-arm64.dmg` |
| macOS (Intel) | `undercontrol-desktop-{VERSION}-x64.dmg` |
| Windows (x64) | `undercontrol-desktop-{VERSION}-setup.exe` |
| Linux (x64) | `undercontrol-desktop-{VERSION}.AppImage` |

To discover the current `{VERSION}`, fetch the auto-update metadata (plain YAML,
`version:` on the first line):

```
https://pub-35d77f83ee8a41798bb4b2e1831ac70a.r2.dev/releases/latest/latest-mac.yml
https://pub-35d77f83ee8a41798bb4b2e1831ac70a.r2.dev/releases/latest/latest.yml        # Windows
https://pub-35d77f83ee8a41798bb4b2e1831ac70a.r2.dev/releases/latest/latest-linux.yml
```

Only the most recent versions are retained on R2 — always resolve the current
version first instead of hardcoding one.

Platform notes:

- **macOS**: builds are signed and notarized with an Apple Developer ID. The app
  opens directly from the DMG — no Gatekeeper warnings and no `xattr` workarounds.
- **Linux**: make the AppImage executable: `chmod +x undercontrol-desktop-{VERSION}.AppImage`.

## CLI (`ud`)

npm is the only distribution channel (the former Homebrew tap is discontinued):

```bash
npm install -g @oatnil/ud   # requires Node.js 18+
ud --version
```

Docs: [CLI guide](/docs/cli) · [AI agent integration](/docs/cli-ai-integration)

## Browser extension

- [UnDercontrol Web Clipper](https://chromewebstore.google.com/detail/undercontrol-web-clipper/mckkbigikfkoeddpcbhdmpncoljoagog)
  on the Chrome Web Store — save web pages as tasks with full-page snapshots and
  video transcript extraction.

## Mobile (iOS)

The native iOS app is in TestFlight preparation — not yet available. Interim
options: the [Apple Shortcut](https://www.icloud.com/shortcuts/4e0becebe3cd48a180940ccbd04d6fa7)
for one-tap capture, or the web app in a mobile browser.

## Self-host

The all-in-one Docker image `lintao0o0/undercontrol:latest` (linux/amd64 and
linux/arm64) bundles the web app and backend in one container. See the
[Self-Deployment guide](/docs/self-deployment) for `docker run` / compose /
Kubernetes setups and the [Configuration reference](/configuration) for all
environment variables.
