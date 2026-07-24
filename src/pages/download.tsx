/**
 * Download — standalone page at /download, every distributable in one place:
 * desktop apps, CLI, web app, browser extension, mobile status, self-host.
 *
 * Pure TSX with both locales in this one file as {en, zh} strings picked by
 * the current docusaurus locale (same pattern as /configuration — no i18n
 * mirror file). The version comes from version.json, which the release
 * workflow bumps every release, so download links never go stale by hand.
 *
 * Distribution facts encoded here (keep them true):
 * - Desktop binaries live on R2 under releases/{version}/; only recent
 *   versions are retained, which is why links must derive from version.json.
 * - macOS builds are Developer ID signed + notarized — no Gatekeeper
 *   workarounds; never re-add xattr/right-click instructions.
 * - The CLI ships through npm only (@oatnil/ud). The Homebrew tap is dead.
 * - iOS is in TestFlight preparation — keep the slot, add no link until live.
 *
 * Owned by the Onboarding Experience Owner.
 */
import {useState, type ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {Check, ChevronRight, Copy, Download as DownloadIcon, ExternalLink} from 'lucide-react';

import versionConfig from '../../version.json';
import styles from './download.module.css';

const VERSION: string = versionConfig.version;

const APP_URL = 'https://ud.oatnil.com';
const R2_RELEASES = 'https://pub-35d77f83ee8a41798bb4b2e1831ac70a.r2.dev/releases';
const CHROME_STORE_URL =
  'https://chromewebstore.google.com/detail/undercontrol-web-clipper/mckkbigikfkoeddpcbhdmpncoljoagog';
const SHORTCUT_URL = 'https://www.icloud.com/shortcuts/4e0becebe3cd48a180940ccbd04d6fa7';

const CLI_INSTALL = `# requires Node.js 18+
npm install -g @oatnil/ud
ud --version`;

type L = {en: string; zh: string};

function useT() {
  const {i18n} = useDocusaurusContext();
  const zh = i18n.currentLocale === 'zh-Hans';
  return (l: L) => (zh ? l.zh : l.en);
}

// --- Desktop artifacts ---

interface PlatformDl {
  os: L;
  arch: string;
  file: string;
  notarized?: boolean;
}

const PLATFORMS: PlatformDl[] = [
  {
    os: {en: 'macOS', zh: 'macOS'},
    arch: 'Apple Silicon · .dmg',
    file: `undercontrol-desktop-${VERSION}-arm64.dmg`,
    notarized: true,
  },
  {
    os: {en: 'macOS', zh: 'macOS'},
    arch: 'Intel · .dmg',
    file: `undercontrol-desktop-${VERSION}-x64.dmg`,
    notarized: true,
  },
  {
    os: {en: 'Windows', zh: 'Windows'},
    arch: 'x64 · installer .exe',
    file: `undercontrol-desktop-${VERSION}-setup.exe`,
  },
  {
    os: {en: 'Linux', zh: 'Linux'},
    arch: 'x64 · AppImage',
    file: `undercontrol-desktop-${VERSION}.AppImage`,
  },
];

function CopyBtn({text}: {text: string}) {
  const t = useT();
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(
        () => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        },
        () => undefined,
      );
    }
  };
  return (
    <button type="button" className={`${styles.copybtn} ${copied ? styles.ok : ''}`} onClick={onCopy}>
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? t({en: 'Copied', zh: '已复制'}) : t({en: 'Copy', zh: '复制'})}
    </button>
  );
}

function Terminal({name, code}: {name: string; code: string}) {
  return (
    <div className={styles.term}>
      <div className={styles.termBar}>
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.termName}>{name}</span>
        <CopyBtn text={code.replace(/^#.*\n/gm, '')} />
      </div>
      <div className={styles.termBody}>
        <pre>
          {code.split('\n').map((line, i) => (
            <span key={i} className={line.trimStart().startsWith('#') ? styles.cmt : undefined}>
              {line + '\n'}
            </span>
          ))}
        </pre>
      </div>
    </div>
  );
}

// --- Sections ---

function Hero() {
  const t = useT();
  const jumps: Array<{id: string; label: L}> = [
    {id: 'desktop', label: {en: 'Desktop', zh: '桌面端'}},
    {id: 'cli', label: {en: 'CLI', zh: '命令行'}},
    {id: 'web', label: {en: 'Web app', zh: '网页版'}},
    {id: 'extension', label: {en: 'Browser extension', zh: '浏览器扩展'}},
    {id: 'mobile', label: {en: 'Mobile', zh: '移动端'}},
    {id: 'selfhost', label: {en: 'Self-host', zh: '私有部署'}},
  ];
  return (
    <header className={styles.hero}>
      <Link to="/docs/release-notes" className={styles.versionBadge}>
        <b>v{VERSION}</b>
        <span>·</span>
        <span>{t({en: "What's new", zh: '更新内容'})}</span>
        <ChevronRight size={12} strokeWidth={2} />
      </Link>
      <h1 className={styles.heroTitle}>
        {t({en: 'One workspace. ', zh: '一个工作空间。'})}
        <em>{t({en: 'Every platform.', zh: '所有平台。'})}</em>
      </h1>
      <p className={`${styles.lede} ${styles.heroLede}`}>
        {t({
          en: 'UnDercontrol runs where you do — a signed desktop app, a zero-install web app, a CLI built for AI agents, and a browser clipper. Free to start, and every client can point at our cloud or a server you run yourself.',
          zh: 'UnDercontrol 跟随你的工作方式——已签名的桌面应用、免安装的网页版、为 AI Agent 而生的 CLI、浏览器剪藏扩展。免费起步，每个客户端都可以连接我们的云端，或你自己部署的服务器。',
        })}
      </p>
      <div className={styles.jumprow}>
        {jumps.map((j) => (
          <a key={j.id} href={`#${j.id}`} className={styles.jump}>
            {t(j.label)}
          </a>
        ))}
      </div>
    </header>
  );
}

function DesktopSection() {
  const t = useT();
  return (
    <section className={styles.section} id="desktop">
      <p className={styles.eyebrow}>{t({en: 'Desktop app', zh: '桌面应用'})}</p>
      <h2 className={styles.h2}>
        {t({en: 'Local-first. Your data stays on your machine.', zh: '本地优先，数据留在你的电脑上。'})}
      </h2>
      <p className={styles.lede}>
        {t({
          en: 'The desktop app ships the full stack — UI and backend in one install. Work fully offline with no account, or connect it to a remote server whenever you want to sync.',
          zh: '桌面应用内置完整技术栈——界面和后端一次安装。无需账号即可完全离线使用，随时可连接远程服务器同步。',
        })}
      </p>
      <div className={styles.plats}>
        {PLATFORMS.map((p) => (
          <div key={p.file} className={styles.plat}>
            <h3 className={styles.platOs}>{t(p.os)}</h3>
            <div className={styles.platArch}>{p.arch}</div>
            {p.notarized ? (
              <span className={styles.platBadge}>
                <Check size={11} strokeWidth={2.5} />
                {t({en: 'Signed & notarized', zh: '已签名 · 已公证'})}
              </span>
            ) : null}
            <div className={styles.platSpacer} />
            <a className={styles.platBtn} href={`${R2_RELEASES}/${VERSION}/${p.file}`}>
              <DownloadIcon size={14} strokeWidth={2} />
              {t({en: 'Download', zh: '下载'})}
            </a>
            <div className={styles.platFile}>{p.file}</div>
          </div>
        ))}
      </div>
      <div className={styles.footnotes}>
        <p className={styles.footnote}>
          <b>macOS:</b>{' '}
          {t({
            en: 'builds are signed and notarized with an Apple Developer ID — the app opens straight from the DMG, no Gatekeeper warnings, no Terminal workarounds.',
            zh: '构建已使用 Apple Developer ID 签名并公证——从 DMG 直接打开即可，没有 Gatekeeper 警告，无需任何终端命令绕过。',
          })}
        </p>
        <p className={styles.footnote}>
          <b>Linux:</b>{' '}
          {t({en: 'make the AppImage executable first: ', zh: '先给 AppImage 加执行权限：'})}
          <code>chmod +x undercontrol-desktop-{VERSION}.AppImage</code>
        </p>
      </div>
    </section>
  );
}

function CliSection() {
  const t = useT();
  return (
    <section className={styles.section} id="cli">
      <p className={styles.eyebrow}>{t({en: 'Command line', zh: '命令行'})}</p>
      <h2 className={styles.h2}>
        {t({
          en: "The same workspace, in your terminal — and your agents'.",
          zh: '同一个工作空间，在你的终端里——也在你的 AI Agent 手里。',
        })}
      </h2>
      <p className={styles.lede}>
        {t({
          en: 'One npm install gives you ud: kubectl-style commands, an interactive TUI, and the interface AI coding agents use to read and write your tasks. npm is the only distribution channel.',
          zh: '一条 npm 命令装好 ud：kubectl 风格的命令、交互式 TUI，也是 AI 编码 Agent 读写你任务的接口。npm 是唯一分发渠道。',
        })}
      </p>
      <Terminal name="bash — npm" code={CLI_INSTALL} />
      <div className={styles.btnrow}>
        <Link className={styles.btnGhost} to="/docs/cli">
          {t({en: 'CLI documentation', zh: 'CLI 文档'})}
        </Link>
        <Link className={styles.btnGhost} to="/docs/cli-ai-integration">
          {t({en: 'Use it with AI agents', zh: '配合 AI Agent 使用'})}
        </Link>
      </div>
    </section>
  );
}

function WebSection() {
  const t = useT();
  return (
    <section className={styles.section} id="web">
      <div className={styles.band}>
        <div>
          <p className={styles.eyebrow}>{t({en: 'Web app', zh: '网页版'})}</p>
          <h2 className={styles.h2}>{t({en: 'Nothing to install.', zh: '什么都不用装。'})}</h2>
          <p className={styles.lede}>
            {t({
              en: 'The hosted app runs in any modern browser — try it as a visitor before creating an account.',
              zh: '云端应用在任何现代浏览器中直接运行——注册之前可以先以游客身份试用。',
            })}
          </p>
        </div>
        <div className={styles.bandAction}>
          <a className={styles.btnPrimary} href={`${APP_URL}/#/login`} target="_blank" rel="noopener noreferrer">
            {t({en: 'Launch the web app', zh: '打开网页版'})}
            <ExternalLink size={14} strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  );
}

function ExtensionSection() {
  const t = useT();
  return (
    <section className={styles.section} id="extension">
      <div className={styles.band}>
        <div>
          <p className={styles.eyebrow}>{t({en: 'Browser extension', zh: '浏览器扩展'})}</p>
          <h2 className={styles.h2}>
            {t({en: 'Clip the web into your workspace.', zh: '把网页剪进你的工作空间。'})}
          </h2>
          <p className={styles.lede}>
            {t({
              en: 'UnDercontrol Web Clipper saves any page as a task with a full-page snapshot — video transcripts included.',
              zh: 'UnDercontrol Web Clipper 把任意网页存为任务，附带整页快照——还能提取视频字幕。',
            })}
          </p>
        </div>
        <div className={styles.bandAction}>
          <a className={styles.btnPrimary} href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer">
            {t({en: 'Add to Chrome', zh: '添加到 Chrome'})}
            <ExternalLink size={14} strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  );
}

function MobileSection() {
  const t = useT();
  return (
    <section className={styles.section} id="mobile">
      <div className={styles.band}>
        <div>
          <p className={styles.eyebrow}>{t({en: 'Mobile', zh: '移动端'})}</p>
          <h2 className={styles.h2}>{t({en: 'iOS app — on its way.', zh: 'iOS 应用——在路上了。'})}</h2>
          <p className={styles.lede}>
            {t({
              en: 'The native iOS app is being prepared for TestFlight. Until it lands, the Apple Shortcut gives you one-tap task capture from iPhone, iPad, and Mac, and the web app works great on mobile browsers.',
              zh: '原生 iOS 应用正在准备上架 TestFlight。在此之前，Apple 快捷指令支持在 iPhone、iPad 和 Mac 上一键创建任务，网页版在手机浏览器上也表现出色。',
            })}
          </p>
        </div>
        <div className={styles.bandAction}>
          <span className={styles.soon}>{t({en: 'TestFlight — coming soon', zh: 'TestFlight——即将推出'})}</span>
          <a className={styles.btnGhost} href={SHORTCUT_URL} target="_blank" rel="noopener noreferrer">
            {t({en: 'Get the Apple Shortcut', zh: '获取 Apple 快捷指令'})}
            <ExternalLink size={14} strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  );
}

function SelfHostSection() {
  const t = useT();
  return (
    <section className={`${styles.section} ${styles.selfhost}`} id="selfhost">
      <p className={styles.eyebrow}>{t({en: 'Self-host', zh: '私有部署'})}</p>
      <h2 className={styles.h2}>{t({en: 'Or skip our cloud entirely.', zh: '或者，完全不依赖我们的云。'})}</h2>
      <p className={styles.lede}>
        {t({
          en: 'Every client above also works against a server you run yourself. One all-in-one Docker image — amd64 and arm64 — brings the web app and backend up with a single command, and a free 3-month Pro trial license is included on the self-hosting page.',
          zh: '上面的每个客户端都可以连接你自己部署的服务器。一个 all-in-one Docker 镜像——支持 amd64 和 arm64——一条命令同时拉起网页端和后端，私有部署页面还附带免费 3 个月的 Pro 试用许可证。',
        })}
      </p>
      <div className={styles.btnrow}>
        <Link className={styles.btnPrimary} to="/self-hosting">
          {t({en: 'Self-hosting guide', zh: '私有部署指南'})}
        </Link>
        <Link className={styles.btnGhost} to="/configuration">
          {t({en: 'Configuration reference', zh: '配置参考'})}
        </Link>
        <Link className={styles.btnGhost} to="/docs/self-deployment">
          {t({en: 'Deployment docs', zh: '部署文档'})}
        </Link>
      </div>
    </section>
  );
}

export default function DownloadPage(): ReactNode {
  const t = useT();
  return (
    <Layout
      title={t({
        en: 'Download UnDercontrol — Desktop, CLI, Web, and Self-Host',
        zh: '下载 UnDercontrol——桌面端、CLI、网页版与私有部署',
      })}
      description={t({
        en: 'Download UnDercontrol for macOS, Windows, and Linux, install the CLI from npm, add the browser extension, or self-host the all-in-one Docker image.',
        zh: '下载 macOS、Windows、Linux 桌面版，通过 npm 安装 CLI，添加浏览器扩展，或用 all-in-one Docker 镜像私有部署 UnDercontrol。',
      })}>
      <main className={styles.page}>
        <Hero />
        <DesktopSection />
        <CliSection />
        <WebSection />
        <ExtensionSection />
        <MobileSection />
        <SelfHostSection />
      </main>
    </Layout>
  );
}
