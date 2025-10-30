# Docusaurus i18n Implementation Guide

This document explains how internationalization (i18n) was implemented in this Docusaurus project to support both English and Simplified Chinese.

## Overview

Docusaurus has built-in i18n support that allows you to create multilingual documentation sites. Our implementation supports:
- **English (en)**: Default locale at `/`
- **Simplified Chinese (zh-Hans)**: Available at `/zh-Hans/`

## Architecture

### 1. Configuration (docusaurus.config.ts)

The i18n configuration is defined in `docusaurus.config.ts`:

```typescript
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'zh-Hans'],
  localeConfigs: {
    en: {
      label: 'English',
      direction: 'ltr',
      htmlLang: 'en-US',
    },
    'zh-Hans': {
      label: '简体中文',
      direction: 'ltr',
      htmlLang: 'zh-Hans',
    },
  },
},
```

**Key points:**
- `defaultLocale`: The fallback language (English)
- `locales`: Array of supported locales
- `localeConfigs`: Metadata for each locale (label shown in dropdown, text direction, HTML lang attribute)

### 2. Locale Dropdown

Added to the navbar for easy language switching:

```typescript
navbar: {
  items: [
    // ... other items
    {
      type: 'localeDropdown',
      position: 'right',
    },
  ],
},
```

This automatically generates a dropdown menu with all configured locales.

## Directory Structure

```
project-root/
├── docs/                    # Default (English) documentation
│   ├── intro.md
│   ├── deployment/
│   └── features/
├── src/
│   └── pages/
│       └── index.tsx        # Default (English) homepage
└── i18n/
    └── zh-Hans/             # Chinese translations
        ├── code.json        # General UI translations
        ├── docusaurus-plugin-content-blog/
        │   └── options.json # Blog plugin translations
        ├── docusaurus-plugin-content-docs/
        │   ├── current.json # Sidebar/version translations
        │   └── current/     # Translated documentation
        │       ├── intro.md
        │       ├── deployment/
        │       └── features/
        ├── docusaurus-plugin-content-pages/
        │   ├── index.tsx    # Translated homepage
        │   └── index.module.css
        └── docusaurus-theme-classic/
            ├── navbar.json  # Navbar translations
            └── footer.json  # Footer translations
```

## Translation Types

### 1. Theme Translations (JSON files)

Docusaurus automatically generates translation files for UI components:

**Command to generate:**
```bash
npx docusaurus write-translations --locale zh-Hans
```

This creates JSON files in `i18n/zh-Hans/` for:
- `docusaurus-theme-classic/navbar.json` - Navbar items
- `docusaurus-theme-classic/footer.json` - Footer links
- `docusaurus-plugin-content-docs/current.json` - Sidebar categories
- `docusaurus-plugin-content-blog/options.json` - Blog settings
- `code.json` - General UI strings

**Example: navbar.json**
```json
{
  "item.label.Docs": {
    "message": "文档",
    "description": "Navbar item with label Docs"
  },
  "item.label.Blog": {
    "message": "博客",
    "description": "Navbar item with label Blog"
  }
}
```

### 2. Documentation Translations (Markdown files)

Copy and translate markdown files from `docs/` to `i18n/zh-Hans/docusaurus-plugin-content-docs/current/`:

```bash
# Copy structure
cp -r docs/* i18n/zh-Hans/docusaurus-plugin-content-docs/current/

# Then manually translate each file
```

**Example: intro.md**
```markdown
---
sidebar_position: 1
---

# 欢迎使用 UnderControl

UnderControl 是一个自托管平台...
```

### 3. React Page Translations

For custom React pages (like `src/pages/index.tsx`), create locale-specific versions:

**Location:** `i18n/zh-Hans/docusaurus-plugin-content-pages/index.tsx`

**Implementation approach:**
```typescript
// Chinese homepage
import type {ReactNode} from 'react';
// ... other imports

const FeatureList: FeatureItem[] = [
  {
    title: '端到端加密',
    icon: Lock,
    description: (
      <>
        所有数据传输均使用 HTTPS/TLS 加密...
      </>
    ),
  },
  // ... more features
];

function HomepageHeader() {
  return (
    <header>
      <Heading as="h1">您的数据，您做主</Heading>
      <p>随时随地记录任何内容...</p>
    </header>
  );
}
```

**Important:**
- Copy the entire component structure
- Translate all text content
- Keep the same CSS module names
- Copy CSS files as-is (no translation needed)

## Build Process

### Development Mode

**Start dev server (all locales):**
```bash
npm run start
```

**Start dev server (specific locale):**
```bash
npm run start -- --locale zh-Hans
```

### Production Build

**Build all locales:**
```bash
npm run build
```

This generates:
- `build/` - English version
- `build/zh-Hans/` - Chinese version

**Serve production build:**
```bash
npx serve build -l 3000
```

## URL Structure

- English (default): `http://localhost:3000/`
- Chinese: `http://localhost:3000/zh-Hans/`
- English docs: `http://localhost:3000/docs/intro`
- Chinese docs: `http://localhost:3000/zh-Hans/docs/intro`

## Testing

### Automated Testing with Playwright

Created `test-i18n.js` for automated screenshot testing:

```javascript
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Test English pages
  await page.goto('http://localhost:3000');
  await page.screenshot({ path: 'screenshots/homepage-en.png' });

  // Test Chinese pages
  await page.goto('http://localhost:3000/zh-Hans/');
  await page.screenshot({ path: 'screenshots/homepage-zh.png' });

  await browser.close();
})();
```

**Run tests:**
```bash
# Install Playwright
npm install -D playwright
npx playwright install chromium

# Run tests
node test-i18n.js
```

## Best Practices

### 1. Translation Workflow

1. **Generate translation files:**
   ```bash
   npx docusaurus write-translations --locale zh-Hans
   ```

2. **Translate JSON files:** Edit generated JSON files with translations

3. **Copy documentation structure:**
   ```bash
   cp -r docs/* i18n/zh-Hans/docusaurus-plugin-content-docs/current/
   ```

4. **Translate markdown files:** Manually translate each `.md` file

5. **Create localized React pages:** For custom pages in `src/pages/`

### 2. Maintaining Consistency

- Keep the same file structure across locales
- Use the same frontmatter in translated markdown
- Preserve link structures (they'll automatically localize)
- Test both locales before deploying

### 3. Incremental Translation

You don't need to translate everything at once:
- Start with critical pages (homepage, intro)
- Untranslated pages will fall back to English
- Gradually add translations over time

### 4. SEO Considerations

Docusaurus automatically:
- Adds `hreflang` tags
- Generates separate sitemaps per locale
- Sets appropriate `<html lang>` attributes

## Common Issues & Solutions

### Issue: Chinese pages showing 404

**Problem:** Dev server doesn't automatically reload after adding i18n files.

**Solution:**
```bash
# Clear cache
rm -rf .docusaurus build

# Restart dev server
npm run start
```

### Issue: Production build works but dev doesn't

**Problem:** Dev server and production build handle routing differently.

**Solution:** Always test with `npm run build` before deploying.

### Issue: Missing translations

**Problem:** Some UI elements still in English.

**Solution:**
1. Run `npx docusaurus write-translations` again
2. Check if new JSON files were generated
3. Translate the new keys

## Deployment

### Static Hosting (Cloudflare Pages, Netlify, Vercel)

No special configuration needed. Just run:
```bash
npm run build
```

The build output includes all locales in the `build/` directory.

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve the build
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]
```

## Adding More Locales

To add another language (e.g., Spanish):

1. **Update config:**
   ```typescript
   i18n: {
     defaultLocale: 'en',
     locales: ['en', 'zh-Hans', 'es'],
     localeConfigs: {
       // ... existing configs
       es: {
         label: 'Español',
         direction: 'ltr',
         htmlLang: 'es',
       },
     },
   },
   ```

2. **Generate translations:**
   ```bash
   npx docusaurus write-translations --locale es
   ```

3. **Create content:**
   ```bash
   mkdir -p i18n/es/docusaurus-plugin-content-docs/current
   cp -r docs/* i18n/es/docusaurus-plugin-content-docs/current/
   ```

4. **Translate files** in `i18n/es/`

## Resources

- [Docusaurus i18n Documentation](https://docusaurus.io/docs/i18n/introduction)
- [Crowdin Integration](https://docusaurus.io/docs/i18n/crowdin) - For collaborative translation
- [Locale Codes](https://www.iana.org/assignments/language-subtag-registry) - Standard locale identifiers

## Summary

Our i18n implementation provides:
- ✅ Full bilingual support (English + Chinese)
- ✅ Automatic locale detection and switching
- ✅ SEO-optimized with proper meta tags
- ✅ Incremental translation capability
- ✅ Type-safe configuration
- ✅ Automated testing support

The system is maintainable, scalable, and follows Docusaurus best practices.
