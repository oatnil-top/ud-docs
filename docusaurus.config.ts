import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// Centralized version - update version.json when releasing
const versionConfig = require('./version.json');
const VERSION = versionConfig.version;

const config: Config = {
  title: 'UnderControl',
  tagline: 'Personal budget and expense management',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: 'https://ud-docs.lintao-amons.workers.dev',
  baseUrl: '/',

  organizationName: 'oatnil-top',
  projectName: 'ud-docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

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

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/oatnil-top/ud-docs/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/oatnil-top/ud-docs/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'UnderControl',
      logo: {
        alt: 'UnderControl Logo',
        src: 'img/favicon.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/docs/cookbook',
          label: 'Cookbook',
          position: 'left',
        },
        {
          to: '/subscribe',
          label: 'Pricing',
          position: 'left',
        },
        {
          type: 'html',
          position: 'right',
          value: `<span class="navbar__item navbar__link" style="color: var(--ifm-color-primary); font-weight: 500;">v${VERSION}</span>`,
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          to: '/contact',
          label: 'Contact',
          position: 'right',
        },
        {
          href: 'https://github.com/oatnil-top/ud-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/vkw2nhxE',
            },
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/oatnil-top/ud-docs/discussions',
            },
            {
              label: 'Contact',
              to: '/contact',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Documentation',
              href: 'https://github.com/oatnil-top/ud-docs',
            },
            {
              label: 'Privacy Policy',
              to: '/privacy',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} UnderControl Project.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
