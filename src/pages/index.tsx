import {useState, useEffect, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';

import styles from './index.module.css';

const APP_URL = 'https://ud.oatnil.com';

// Mirror of ud-vite-app/src/lib/cdn.ts — pick R2 (global) or Bitiful (China) by locale.
const CDN_BASE = {
  en: 'https://pub-35d77f83ee8a41798bb4b2e1831ac70a.r2.dev',
  zh: 'https://oatnil-public.s3.bitiful.net',
} as const;

function useCdnImg() {
  const {i18n} = useDocusaurusContext();
  const base = i18n.currentLocale === 'zh-Hans' ? CDN_BASE.zh : CDN_BASE.en;
  return (filename: string) => `${base}/features/${filename}`;
}

/**
 * Page structure: one claim, one band, one proof.
 *
 * Every band states a single claim on the left and shows the evidence for it on the
 * right, split by a continuous hairline. Do not reintroduce a summary/pillar grid that
 * restates the bands — that duplication is what this page was rebuilt to remove.
 */

// --- Shared carousel primitives ---
// The hero reel and the All-in-One showcase are the same object: an auto-advancing
// image strip with dots and click-to-zoom. Behaviour lives here so they cannot drift.

/** Auto-advance an index over `length` images. Pass `resetKey` to jump back to 0 when
 *  the underlying set changes (the showcase swaps sets when you pick a tab). */
function useAutoRotate(length: number, intervalMs: number, resetKey?: unknown) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [resetKey]);

  // `index` is a dependency so the timer restarts whenever the slide changes. Without it
  // the interval keeps its own schedule and a dot you just clicked can be advanced past
  // almost immediately; this way every slide — picked or automatic — gets its full dwell.
  useEffect(() => {
    if (length <= 1) return undefined;
    const id = setTimeout(() => setIndex((prev) => (prev + 1) % length), intervalMs);
    return () => clearTimeout(id);
  }, [length, intervalMs, resetKey, index]);

  return [index, setIndex] as const;
}

function CarouselDots({count, index, onSelect}: {count: number; index: number; onSelect: (i: number) => void}) {
  if (count <= 1) return null;
  return (
    <span className={styles.carouselDots}>
      {Array.from({length: count}, (_, i) => (
        <button
          key={i}
          type="button"
          className={`${styles.carouselDot} ${i === index ? styles.carouselDotActive : ''}`}
          onClick={() => onSelect(i)}
          aria-label={`Go to image ${i + 1}`}
        />
      ))}
    </span>
  );
}

function Lightbox({src, alt, onClose}: {src: string; alt: string; onClose: () => void}) {
  return (
    <div className={styles.lightbox} onClick={onClose}>
      <button type="button" className={styles.lightboxClose} onClick={onClose} aria-label="Close lightbox">
        ×
      </button>
      <img src={src} alt={alt} className={styles.lightboxImage} onClick={(e) => e.stopPropagation()} />
    </div>
  );
}

// --- Hero ---
// The reel answers the subtitle in its own order — Jira, Obsidian, AI agents, Mint —
// so the first screen shows the evidence for the claim it just made. Built inside a
// hook, not at module scope, so the Translate/translate ids stay statically extractable.
function useHeroShots() {
  return [
    {
      file: 'home-page/v2/hero/1.jpg',
      caption: <Translate id="homepage.hero.shot.board">Agile boards — every column is a saved query</Translate>,
      alt: translate({
        id: 'homepage.hero.shot.board.alt',
        message: 'A UnDercontrol agile board with Backlog, Sprint, In Progress, Blocked, In Review and Done columns',
      }),
    },
    {
      file: 'home-page/v2/hero/2.jpg',
      caption: <Translate id="homepage.hero.shot.explorer">Markdown docs and tasks in one tree</Translate>,
      alt: translate({
        id: 'homepage.hero.shot.explorer.alt',
        message: 'The UnDercontrol explorer showing a folder tree beside a Markdown task',
      }),
    },
    {
      file: 'home-page/v2/hero/3.jpg',
      caption: <Translate id="homepage.hero.shot.workspace">AI agents at work, grouped by agent</Translate>,
      alt: translate({
        id: 'homepage.hero.shot.workspace.alt',
        message: 'UnDercontrol workspace sessions running AI agents across several machines',
      }),
    },
    {
      file: 'home-page/v2/hero/4.jpg',
      caption: <Translate id="homepage.hero.shot.finance">Expenses and budgets, same workspace</Translate>,
      alt: translate({
        id: 'homepage.hero.shot.finance.alt',
        message: 'UnDercontrol expense tracking with a monthly total and top categories',
      }),
    },
  ];
}

function HeroGallery() {
  const cdnImg = useCdnImg();
  const shots = useHeroShots();
  const [index, setIndex] = useAutoRotate(shots.length, 5000);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const current = shots[index];
  const src = cdnImg(current.file);
  const srcs = shots.map((s) => cdnImg(s.file)).join(',');

  // Warm every shot up front. Rotation swaps the src, so an uncached slide would
  // render as a blank gap until it downloaded.
  useEffect(() => {
    srcs.split(',').forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, [srcs]);

  return (
    <div className={styles.heroImageWrap}>
      {/* Caption and dots sit above the shot: heroDesktopImg deliberately bleeds off the
          bottom of the hero, so there is no edge underneath to hang controls on. */}
      <div className={styles.heroShotMeta}>
        <span>{current.caption}</span>
        <CarouselDots count={shots.length} index={index} onSelect={setIndex} />
      </div>
      {/* Not lazy: this is above the fold and is the page's LCP element. */}
      <img
        className={styles.heroDesktopImg}
        src={src}
        alt={current.alt}
        fetchPriority="high"
        onClick={() => setIsLightboxOpen(true)}
      />
      {isLightboxOpen && <Lightbox src={src} alt={current.alt} onClose={() => setIsLightboxOpen(false)} />}
    </div>
  );
}

/**
 * Agent onboarding pill.
 *
 * The whole onboarding contract is one line of text an agent can act on:
 * `Fetch <AGENT_SETUP_PROMPT_URL>`. The prompt itself lives in this repo at
 * static/agent-setup/prompt.md; we point at the GitHub raw URL rather than the
 * docs domain because oatnil.com's bot protection blocks some agents' fetchers,
 * whereas raw.githubusercontent.com is reliably reachable. Edit the file in this
 * repo, never here. Mirrored on the app landing page
 * (ud-vite-app/src/pages/home-page/index.tsx); keep the copied text identical.
 */
const AGENT_SETUP_PROMPT_URL = 'https://raw.githubusercontent.com/oatnil-top/ud-docs/main/static/agent-setup/prompt.md';
const AGENT_SETUP_COMMAND = `Fetch ${AGENT_SETUP_PROMPT_URL}`;

/** The Clipboard API needs a secure context; keep the button working over plain http. */
function copyViaTextarea() {
  const el = document.createElement('textarea');
  el.value = AGENT_SETUP_COMMAND;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  el.remove();
}

function AgentSetupButton() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const id = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(id);
  }, [copied]);

  const copy = () => {
    // Flip the label first: Chrome can leave writeText pending until the document
    // regains focus, so awaiting it would swallow the feedback entirely.
    setCopied(true);
    try {
      const pending = navigator.clipboard?.writeText(AGENT_SETUP_COMMAND);
      if (pending) {
        pending.catch(copyViaTextarea);
        return;
      }
    } catch {
      // Fall through — no Clipboard API here.
    }
    copyViaTextarea();
  };

  return (
    <button
      type="button"
      className={styles.agentSetupButton}
      onClick={copy}
      title={AGENT_SETUP_COMMAND}
      aria-label={translate({
        id: 'homepage.hero.agentSetup.aria',
        message: 'Copy the agent setup prompt',
      })}>
      <span className={styles.agentSetupLabel}>
        {copied ? (
          <Translate id="homepage.hero.agentSetup.copied">Copied — paste it into your agent</Translate>
        ) : (
          <Translate id="homepage.hero.agentSetup.label">Onboard your agent to UnDercontrol</Translate>
        )}
      </span>
      <code className={styles.agentSetupCode}>{copied ? '✓' : AGENT_SETUP_COMMAND}</code>
    </button>
  );
}

function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <span className={styles.eyebrow}>
        <span className={styles.dot} />
        {/* "Since September 2024" is a trust signal, and the date is verifiable: the
            first ud-next-web commit is 2024-09-22 (ud-server 2024-09-23). NOT the
            current monorepo's 2025-07-03 — that is only the Go+Vite rewrite. See the
            competitor timeline in ud task e95c1469, note d6f1e6b1.
            "Self-hosted" was dropped from this line: it pushed the eyebrow onto two
            rows on a phone, and the nav, the CTA row and the whole "three ways to run"
            band already say it. Keep this line short enough to stay on one row. */}
        <Translate id="homepage.hero.eyebrow">Free for personal use · Built since September 2024</Translate>
      </span>
      <h1 className={styles.heroTitle}>
        <Translate id="homepage.hero.tagline">
          One private place for all your valuable information.
        </Translate>
      </h1>
      <p className={styles.heroSubtitle}>
        <Translate id="homepage.hero.subtitle">
          Knowledge base like Obsidian. Project management like Jira. Personal finance like Mint. File storage like Google Drive — one private workspace, ready for your AI agents.
        </Translate>
      </p>
      {/* No keyword-pill row here. Self-hosted / local-first / AI-native / open API /
          all-in-one were five badges restating the eyebrow and the subtitle in single
          words — on a phone they wrapped into a second row of noise above the CTAs.
          The hero carries at most two pill-shaped things: the eyebrow (trust) and the
          agent onboarding action. Claims belong in the bands below, next to evidence. */}
      <div className={styles.heroButtons}>
        <Link className={styles.heroButtonPrimary} to={APP_URL}>
          <Translate id="homepage.hero.tryOnlineCta">Try it online</Translate>
        </Link>
        <Link className={styles.heroButtonSecondary} to="/subscribe">
          <Translate id="homepage.hero.download">Download Desktop App</Translate>
        </Link>
        <Link className={styles.heroButtonText} to="#run">
          <Translate id="homepage.hero.waysLink">Or self-host it — three ways to run ↓</Translate>
        </Link>
      </div>
      <div className={styles.heroAgentRow}>
        <AgentSetupButton />
      </div>
      <HeroGallery />
    </section>
  );
}

// --- Three ways to run it ---
// Each column carries a spec table so the trade-off is scannable rather than prose.
// Download is the primary action: local-with-no-server is the option people don't expect.
const WAYS = [
  {
    key: 'online',
    primary: false,
    to: APP_URL,
    label: <Translate id="homepage.ways.online.label">Try it online</Translate>,
    title: <Translate id="homepage.ways.online.title">Nothing to install.</Translate>,
    desc: (
      <Translate id="homepage.ways.online.desc">
        Open the cloud demo and file your first task in about a minute. Bring your data over later, or don&apos;t.
      </Translate>
    ),
    where: <Translate id="homepage.ways.online.where">our server</Translate>,
    setup: <Translate id="homepage.ways.online.setup">~1 min</Translate>,
    offline: <Translate id="homepage.ways.online.offline">no</Translate>,
    cta: <Translate id="homepage.ways.online.cta">Open the demo</Translate>,
  },
  {
    key: 'desktop',
    primary: true,
    to: '/subscribe',
    label: <Translate id="homepage.ways.desktop.label">Download the app</Translate>,
    title: <Translate id="homepage.ways.desktop.title">Local, with no server at all.</Translate>,
    desc: (
      <Translate id="homepage.ways.desktop.desc">
        The desktop app ships its own backend. No account, no network, no Docker — your workspace is a folder on your disk.
      </Translate>
    ),
    where: <Translate id="homepage.ways.desktop.where">your machine</Translate>,
    setup: <Translate id="homepage.ways.desktop.setup">~2 min</Translate>,
    offline: <Translate id="homepage.ways.desktop.offline">yes</Translate>,
    cta: <Translate id="homepage.ways.desktop.cta">Download the app</Translate>,
  },
  {
    key: 'selfhost',
    primary: false,
    to: '/self-hosting',
    label: <Translate id="homepage.ways.selfhost.label">Self-host it</Translate>,
    title: <Translate id="homepage.ways.selfhost.title">Your box, reachable everywhere.</Translate>,
    desc: (
      <Translate id="homepage.ways.selfhost.desc">
        One Docker Compose file on a machine you control. Web, mobile, and CLI all point at it — and nothing in the middle is ours.
      </Translate>
    ),
    where: <Translate id="homepage.ways.selfhost.where">your server</Translate>,
    setup: <Translate id="homepage.ways.selfhost.setup">~15 min</Translate>,
    offline: <Translate id="homepage.ways.selfhost.offline">on your LAN</Translate>,
    cta: <Translate id="homepage.ways.selfhost.cta">Self-hosting guide</Translate>,
  },
] as const;

function WaysSection() {
  return (
    <>
      <section className={styles.ways} id="run">
        {WAYS.map((way) => (
          <div key={way.key} className={styles.way}>
            <p className={styles.sectionLabel}>{way.label}</p>
            <h3 className={styles.wayTitle}>{way.title}</h3>
            <p className={styles.wayDesc}>{way.desc}</p>
            <div className={styles.spec}>
              <div>
                <span><Translate id="homepage.ways.spec.where">Data lives</Translate></span>
                <b>{way.where}</b>
              </div>
              <div>
                <span><Translate id="homepage.ways.spec.setup">Setup</Translate></span>
                <b>{way.setup}</b>
              </div>
              <div>
                <span><Translate id="homepage.ways.spec.offline">Offline</Translate></span>
                <b>{way.offline}</b>
              </div>
              <div>
                <span><Translate id="homepage.ways.spec.cost">Cost</Translate></span>
                <b><Translate id="homepage.ways.spec.free">free</Translate></b>
              </div>
            </div>
            <Link
              className={way.primary ? styles.heroButtonPrimary : styles.heroButtonSecondary}
              to={way.to}>
              {way.cta}
            </Link>
          </div>
        ))}
      </section>
      <p className={styles.waysNote}>
        <Translate id="homepage.ways.note">
          Same app, same data model, same CLI in all three. Start on the demo, move to your laptop, graduate to your own server — nothing to migrate but the folder.
        </Translate>
      </p>
    </>
  );
}

// --- All-in-One image showcase ---
const SHOWCASE = [
  {key: 'tasks', images: ['home-page/v2/tasks/1.jpg', 'home-page/v2/tasks/2.jpg', 'home-page/v2/tasks/3.jpg']},
  {key: 'graph', images: ['home-page/v2/graph/1.jpg', 'home-page/v2/graph/2.jpg']},
  {key: 'finance', images: ['home-page/v2/finance/1.jpg', 'home-page/v2/finance/2.jpg']},
  {key: 'resources', images: ['home-page/v2/resources/1.jpg']},
  {key: 'workspace', images: ['home-page/v2/workspace/1.jpg']},
] as const;

const SHOWCASE_TEXT: Record<string, {label: ReactNode; desc: ReactNode}> = {
  tasks: {
    label: <Translate id="homepage.showcase.tasks.label">Tasks & Knowledge</Translate>,
    desc: <Translate id="homepage.showcase.tasks.desc2">Kanban boards, Markdown docs, threaded comments.</Translate>,
  },
  graph: {
    label: <Translate id="homepage.showcase.graph.label">Knowledge Graph</Translate>,
    desc: <Translate id="homepage.showcase.graph.desc">Links and hierarchy, drawn. Plus per-task mindmaps.</Translate>,
  },
  finance: {
    label: <Translate id="homepage.showcase.finance.label">Finance</Translate>,
    desc: <Translate id="homepage.showcase.finance.desc">Expense tracking, budgets, AI receipt scanning.</Translate>,
  },
  resources: {
    label: <Translate id="homepage.showcase.resources.label">Resources</Translate>,
    desc: <Translate id="homepage.showcase.resources.desc">Attach images, draw diagrams, sync via CLI.</Translate>,
  },
  workspace: {
    label: <Translate id="homepage.showcase.workspace.label">AI Workspace</Translate>,
    desc: <Translate id="homepage.showcase.workspace.desc2">Sessions grouped by agent, running in parallel.</Translate>,
  },
};

function ShowcaseSection() {
  const cdnImg = useCdnImg();
  const [activeItem, setActiveItem] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [failed, setFailed] = useState<Record<string, boolean>>({});

  const current = SHOWCASE[activeItem];
  const images = current.images;
  // activeItem as the reset key: picking a tab swaps the image set, so restart at its first shot.
  const [imageIndex, setImageIndex] = useAutoRotate(images.length, 4000, activeItem);
  const currentSrc = cdnImg(images[imageIndex] || images[0]);
  const isFailed = failed[currentSrc];

  return (
    <section className={styles.band}>
      <div className={styles.claim}>
        <p className={styles.sectionLabel}>
          <Translate id="homepage.showcase.label">All-in-One</Translate>
        </p>
        <h2 className={styles.claimTitle}>
          <Translate id="homepage.showcase.title">Four tools&apos; worth of your life, in one workspace.</Translate>
        </h2>
        <p className={styles.claimBody}>
          <Translate id="homepage.showcase.body">
            Tasks, notes, money, and files stop living in four silos that never talk to each other. One data model, one search, one place your agents can reach.
          </Translate>
        </p>
        <div className={styles.tabs} role="tablist">
          {SHOWCASE.map((item, index) => {
            const isActive = index === activeItem;
            return (
              <div key={item.key}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveItem(index)}
                  className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}>
                  <span className={styles.tabMark}>{isActive ? '●' : '○'}</span>
                  {SHOWCASE_TEXT[item.key].label}
                </button>
                {isActive && <p className={styles.tabDesc}>{SHOWCASE_TEXT[item.key].desc}</p>}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.proof}>
        <div className={styles.shotFrame}>
          {isFailed ? (
            <div className={styles.showcaseFallback}>{SHOWCASE_TEXT[current.key].desc}</div>
          ) : (
            <img
              src={currentSrc}
              alt={current.key}
              className={styles.showcaseImage}
              loading="lazy"
              onClick={() => setIsLightboxOpen(true)}
              onError={() => setFailed((prev) => ({...prev, [currentSrc]: true}))}
            />
          )}
        </div>
        <div className={styles.shotMeta}>
          <span>{`${current.key}/${imageIndex + 1} of ${images.length}`}</span>
          <CarouselDots count={images.length} index={imageIndex} onSelect={setImageIndex} />
        </div>
      </div>

      {isLightboxOpen && !isFailed && (
        <Lightbox src={currentSrc} alt={current.key} onClose={() => setIsLightboxOpen(false)} />
      )}
    </section>
  );
}

// --- Private & Portable ---
const TRUST_ROWS = [
  {
    key: 'private',
    k: <Translate id="homepage.trust.private.title">Fully Private</Translate>,
    v: <Translate id="homepage.trust.private.desc">AI runs on your machine. Data never leaves your device.</Translate>,
  },
  {
    key: 'offline',
    k: <Translate id="homepage.trust.offline.title">Works Offline</Translate>,
    v: <Translate id="homepage.trust.offline.desc">Desktop app with built-in backend. No internet required.</Translate>,
  },
  {
    key: 'selfhost',
    k: <Translate id="homepage.trust.selfhost.title">Self-Hostable</Translate>,
    v: <Translate id="homepage.trust.selfhost.desc">Deploy on your own infrastructure. Your server, your rules.</Translate>,
  },
  {
    key: 'free',
    k: <Translate id="homepage.trust.free.title">Free Forever</Translate>,
    v: <Translate id="homepage.trust.free.desc">No ads, no tracking. Personal use is free, always.</Translate>,
  },
] as const;

function PrivateSection() {
  return (
    <section className={styles.band}>
      <div className={styles.claim}>
        <p className={styles.sectionLabel}>
          <Translate id="homepage.private.label">Private &amp; Portable</Translate>
        </p>
        <h2 className={styles.claimTitle}>
          <Translate id="homepage.private.title">Your data is Markdown in a folder, not a hostage.</Translate>
        </h2>
        <p className={styles.claimBody}>
          <Translate id="homepage.private.body">
            Self-hosted and local-first. Every task, note, and board is declarable as Markdown with YAML frontmatter — diff it, commit it, grep it, take it. There is no export button because there is nothing to export from.
          </Translate>
        </p>
      </div>
      <div className={styles.proof}>
        <div className={styles.code}>
          <div className={styles.codeBar}>task.md</div>
          <div className={styles.codeBody}>
            <pre>
              <span className={styles.c}>---{'\n'}</span>
              <span className={styles.k}>title:</span> Ship the v0.113 release{'\n'}
              <span className={styles.k}>status:</span> in-progress{'\n'}
              <span className={styles.k}>tags:</span> [release, backend]{'\n'}
              <span className={styles.k}>deadline:</span> 2026-07-21{'\n'}
              <span className={styles.c}>---{'\n'}</span>
              Cut the tag, build the Electron artifacts, verify{'\n'}
              the uploaded DMG on a clean machine.
            </pre>
          </div>
        </div>
        <div className={styles.rows}>
          {TRUST_ROWS.map((row) => (
            <div key={row.key} className={styles.row}>
              <div className={styles.rowK}>{row.k}</div>
              <div className={styles.rowV}>{row.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- AI-Native & Open ---
const OPEN_ROWS = [
  {
    key: 'api',
    k: <Translate id="homepage.ainative.api.title">Open HTTP API</Translate>,
    v: <Translate id="homepage.ainative.api.desc">Embed your workspace in any workflow, with an API key.</Translate>,
  },
  {
    key: 'schema',
    k: <Translate id="homepage.ainative.schema.title">Open schema</Translate>,
    v: <Translate id="homepage.ainative.schema.desc">Hermes, OpenClaw, or a client you write yourself can CRUD your data.</Translate>,
  },
  {
    key: 'skills',
    k: <Translate id="homepage.ainative.skills.title">Shareable skills</Translate>,
    v: <Translate id="homepage.ainative.skills.desc">Prompt templates any agent can pull and consume.</Translate>,
  },
  {
    key: 'sst',
    k: <Translate id="homepage.ainative.sst.title">Single source of truth</Translate>,
    v: <Translate id="homepage.ainative.sst.desc">Every tool reads and writes the same place. Nothing drifts.</Translate>,
  },
] as const;

function AiNativeSection() {
  return (
    <section className={styles.band}>
      <div className={styles.claim}>
        <p className={styles.sectionLabel}>
          <Translate id="homepage.ainative.label">AI-Native &amp; Open</Translate>
        </p>
        <h2 className={styles.claimTitle}>
          <Translate id="homepage.ainative.title">Agents already know how to use it.</Translate>
        </h2>
        <p className={styles.claimBody}>
          <Translate id="homepage.ainative.body">
            Everything is a structured schema, kubectl-style. An agent that can run a command can read and write your workspace — no plugin, no scraping, no bespoke integration to maintain.
          </Translate>
        </p>
      </div>
      <div className={styles.proof}>
        <div className={`${styles.code} ${styles.term}`}>
          <div className={styles.codeBar}>bash — ud CLI</div>
          <div className={styles.codeBody}>
            <pre>
              <span className={styles.c}># everything-as-code: tasks are markdown, agents speak CLI{'\n'}</span>
              <span className={styles.p}>$</span> ud apply -f task.md          <span className={styles.c}># create or update from a file</span>{'\n'}
              <span className={styles.p}>$</span> ud get task <span className={styles.f}>--status</span> todo     <span className={styles.c}># kubectl-style queries</span>{'\n'}
              <span className={styles.p}>$</span> ud describe task 49322857     <span className={styles.c}># full context for an agent</span>
            </pre>
          </div>
        </div>
        <div className={styles.rows}>
          {OPEN_ROWS.map((row) => (
            <div key={row.key} className={styles.row}>
              <div className={styles.rowK}>{row.k}</div>
              <div className={styles.rowV}>{row.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Agent Orchestrator diagram ---
function OrchestrationDiagram() {
  // Monochrome, thin lines. Uses currentColor + opacity so it adapts to theme.
  const bg = 'var(--ifm-background-color)';
  const conn = {stroke: 'currentColor', strokeOpacity: 0.18, strokeWidth: 1};
  const connThin = {stroke: 'currentColor', strokeOpacity: 0.12, strokeWidth: 0.75};
  const label = {fill: 'currentColor', fillOpacity: 0.8};
  const sub = {fill: 'currentColor', fillOpacity: 0.4};
  const agentText = {fill: 'currentColor', fillOpacity: 0.5};
  const colLabel = {fill: 'currentColor', fillOpacity: 0.32};
  const arrowFill = {fill: 'currentColor', fillOpacity: 0.18};

  return (
    <div className={styles.orchestrationWrap}>
      <svg viewBox="0 0 820 420" className={styles.orchestrationSvg} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="ah" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <path d="M0,0.5 L5,2.5 L0,4.5" style={arrowFill} />
          </marker>
        </defs>

        {/* Clients -> Server */}
        <line x1="120" y1="85" x2="325" y2="188" style={conn} markerEnd="url(#ah)" />
        <line x1="120" y1="205" x2="325" y2="205" style={conn} markerEnd="url(#ah)" />
        <line x1="120" y1="325" x2="325" y2="222" style={conn} markerEnd="url(#ah)" />
        {/* Server -> Daemons */}
        <line x1="470" y1="182" x2="575" y2="88" style={conn} markerEnd="url(#ah)" />
        <line x1="470" y1="205" x2="575" y2="205" style={conn} markerEnd="url(#ah)" />
        <line x1="470" y1="228" x2="575" y2="322" style={conn} markerEnd="url(#ah)" />
        {/* Daemons -> Agents */}
        <line x1="660" y1="68" x2="712" y2="55" style={connThin} />
        <line x1="660" y1="102" x2="712" y2="115" style={connThin} />
        <line x1="660" y1="188" x2="712" y2="175" style={connThin} />
        <line x1="660" y1="222" x2="712" y2="235" style={connThin} />
        <line x1="660" y1="308" x2="712" y2="295" style={connThin} />
        <line x1="660" y1="342" x2="712" y2="355" style={connThin} />

        {/* Clients */}
        <circle cx="80" cy="85" r="30" style={{stroke: 'currentColor', strokeOpacity: 0.5, strokeWidth: 1, fill: bg}} />
        <text x="80" y="89" textAnchor="middle" fontSize="11" style={label}>Web</text>
        <circle cx="80" cy="205" r="30" style={{stroke: 'currentColor', strokeOpacity: 0.5, strokeWidth: 1, fill: bg}} />
        <text x="80" y="209" textAnchor="middle" fontSize="11" style={label}>Desktop</text>
        <circle cx="80" cy="325" r="30" style={{stroke: 'currentColor', strokeOpacity: 0.5, strokeWidth: 1, fill: bg}} />
        <text x="80" y="329" textAnchor="middle" fontSize="11" style={label}>Mobile</text>

        {/* Server hub */}
        <circle cx="400" cy="205" r="58" style={{stroke: 'currentColor', strokeOpacity: 0.7, strokeWidth: 1.5, fill: bg}} />
        <text x="400" y="202" textAnchor="middle" fontSize="14" fontWeight="500" style={label}>Server</text>
        <text x="400" y="219" textAnchor="middle" fontSize="9" style={sub}>relay (self-hostable)</text>

        {/* Daemons */}
        <circle cx="625" cy="85" r="40" style={{stroke: 'currentColor', strokeOpacity: 0.35, strokeWidth: 1, fill: bg}} strokeDasharray="5 4" />
        <text x="625" y="81" textAnchor="middle" fontSize="10" style={label}>Daemon 1</text>
        <text x="625" y="96" textAnchor="middle" fontSize="8" style={sub}>MacBook</text>
        <circle cx="625" cy="205" r="40" style={{stroke: 'currentColor', strokeOpacity: 0.35, strokeWidth: 1, fill: bg}} strokeDasharray="5 4" />
        <text x="625" y="201" textAnchor="middle" fontSize="10" style={label}>Daemon 2</text>
        <text x="625" y="216" textAnchor="middle" fontSize="8" style={sub}>Linux Server</text>
        <circle cx="625" cy="325" r="40" style={{stroke: 'currentColor', strokeOpacity: 0.35, strokeWidth: 1, fill: bg}} strokeDasharray="5 4" />
        <text x="625" y="321" textAnchor="middle" fontSize="10" style={label}>Daemon 3</text>
        <text x="625" y="336" textAnchor="middle" fontSize="8" style={sub}>Windows PC</text>

        {/* Agents */}
        <circle cx="745" cy="50" r="20" style={{stroke: 'currentColor', strokeOpacity: 0.25, strokeWidth: 0.75, fill: bg}} />
        <text x="745" y="54" textAnchor="middle" fontSize="8" style={agentText}>Claude</text>
        <circle cx="745" cy="120" r="20" style={{stroke: 'currentColor', strokeOpacity: 0.25, strokeWidth: 0.75, fill: bg}} />
        <text x="745" y="124" textAnchor="middle" fontSize="8" style={agentText}>Codex</text>
        <circle cx="745" cy="170" r="20" style={{stroke: 'currentColor', strokeOpacity: 0.25, strokeWidth: 0.75, fill: bg}} />
        <text x="745" y="174" textAnchor="middle" fontSize="8" style={agentText}>Claude</text>
        <circle cx="745" cy="240" r="20" style={{stroke: 'currentColor', strokeOpacity: 0.25, strokeWidth: 0.75, fill: bg}} />
        <text x="745" y="244" textAnchor="middle" fontSize="8" style={agentText}>OpenCode</text>
        <circle cx="745" cy="290" r="20" style={{stroke: 'currentColor', strokeOpacity: 0.25, strokeWidth: 0.75, fill: bg}} />
        <text x="745" y="294" textAnchor="middle" fontSize="8" style={agentText}>Codex</text>
        <circle cx="745" cy="360" r="20" style={{stroke: 'currentColor', strokeOpacity: 0.25, strokeWidth: 0.75, fill: bg}} />
        <text x="745" y="364" textAnchor="middle" fontSize="8" style={agentText}>Claude</text>

        {/* Column labels */}
        <text x="80" y="405" textAnchor="middle" fontSize="9" letterSpacing="1" style={colLabel}>CLIENTS</text>
        <text x="400" y="405" textAnchor="middle" fontSize="9" letterSpacing="1" style={colLabel}>SERVER</text>
        <text x="625" y="405" textAnchor="middle" fontSize="9" letterSpacing="1" style={colLabel}>DAEMONS</text>
        <text x="745" y="405" textAnchor="middle" fontSize="9" letterSpacing="1" style={colLabel}>AGENTS</text>
      </svg>
    </div>
  );
}

function OrchestratorSection() {
  return (
    <section className={styles.band}>
      <div className={styles.claim}>
        <p className={styles.sectionLabel}>
          <Translate id="homepage.howItWorks.label">Agent Orchestrator</Translate>
        </p>
        <h2 className={styles.claimTitle}>
          <Translate id="homepage.orchestrator.title">Run agents on every machine you own.</Translate>
        </h2>
        <p className={styles.claimBody}>
          <Translate id="homepage.orchestrator.body">
            Launch a session on your MacBook from your phone. Hand a task to the Linux box and close the laptop. The relay in the middle is self-hostable, so the only thing between you and your agents is yours.
          </Translate>
        </p>
      </div>
      <div className={styles.proof}>
        <OrchestrationDiagram />
      </div>
    </section>
  );
}

// --- Access Everywhere ---
const ACCESS_ROWS = [
  {
    key: 'web',
    k: <Translate id="homepage.access.web.title">Web &amp; Desktop</Translate>,
    v: <Translate id="homepage.access.web.desc">Browser, or a native app for macOS, Windows and Linux.</Translate>,
  },
  {
    key: 'mobile',
    k: <Translate id="homepage.access.mobile.title">Mobile</Translate>,
    v: <Translate id="homepage.access.mobile.desc">iOS and Android — read, capture, and steer agents.</Translate>,
  },
  {
    key: 'terminal',
    k: <Translate id="homepage.access.terminal.title">Terminal</Translate>,
    v: <Translate id="homepage.access.terminal.desc">The ud CLI, wherever you already live.</Translate>,
  },
  {
    key: 'clipper',
    k: <Translate id="homepage.access.clipper.title">Chrome &amp; Shortcuts</Translate>,
    v: <Translate id="homepage.access.clipper.desc">Clip a page, or fire a capture from an Apple Shortcut.</Translate>,
  },
] as const;

function AccessSection() {
  return (
    <section className={styles.band}>
      <div className={styles.claim}>
        <p className={styles.sectionLabel}>
          <Translate id="homepage.pillarsGrid.access.title">Access Everywhere</Translate>
        </p>
        <h2 className={styles.claimTitle}>
          <Translate id="homepage.access.title">Capture wherever the thought happens.</Translate>
        </h2>
        <p className={styles.claimBody}>
          <Translate id="homepage.access.body">
            A link on your laptop, a receipt photo in a queue, a note dictated to your watch. Six ways in, one workspace out — same data, same second.
          </Translate>
        </p>
      </div>
      <div className={styles.proof}>
        <div className={styles.rows}>
          {ACCESS_ROWS.map((row) => (
            <div key={row.key} className={styles.row}>
              <div className={styles.rowK}>{row.k}</div>
              <div className={styles.rowV}>{row.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Start here (docs) ---
const DOCS = [
  {
    key: 'intro',
    to: '/docs/intro',
    path: '/docs/intro',
    title: <Translate id="homepage.docs.intro.title">Quickstart</Translate>,
    desc: <Translate id="homepage.docs.intro.desc">Install, sign in, and file your first task.</Translate>,
  },
  {
    key: 'eac',
    to: '/docs/everything-as-code',
    path: '/docs/everything-as-code',
    title: <Translate id="homepage.docs.eac.title">Everything-as-Code</Translate>,
    desc: <Translate id="homepage.docs.eac.desc">The Markdown + YAML model your data actually is.</Translate>,
  },
  {
    key: 'cli',
    to: '/docs/cli',
    path: '/docs/cli',
    title: <Translate id="homepage.docs.cli.title">CLI reference</Translate>,
    desc: <Translate id="homepage.docs.cli.desc">get, apply, describe — and how agents use them.</Translate>,
  },
  {
    key: 'selfhost',
    to: '/docs/self-deployment',
    path: '/docs/self-deployment',
    title: <Translate id="homepage.docs.selfhost.title">Self-hosting</Translate>,
    desc: <Translate id="homepage.docs.selfhost.desc">Docker Compose on a box you control.</Translate>,
  },
  {
    key: 'workspace',
    to: '/docs/workspace-terminal',
    path: '/docs/workspace-terminal',
    title: <Translate id="homepage.docs.workspace.title">Workspace &amp; agents</Translate>,
    desc: <Translate id="homepage.docs.workspace.desc">Launch Claude Code or Codex straight from a task.</Translate>,
  },
  {
    key: 'cookbook',
    to: '/docs/cookbook',
    path: '/docs/cookbook',
    title: <Translate id="homepage.docs.cookbook.title">Cookbook</Translate>,
    desc: <Translate id="homepage.docs.cookbook.desc">Recipes people actually run day to day.</Translate>,
  },
] as const;

function DocsSection() {
  return (
    <section className={styles.band} id="docs">
      <div className={styles.claim}>
        <p className={styles.sectionLabel}>
          <Translate id="homepage.docs.label">Start Here</Translate>
        </p>
        <h2 className={styles.claimTitle}>
          <Translate id="homepage.docs.title">Pick the path you came for.</Translate>
        </h2>
        <p className={styles.claimBody}>
          <Translate id="homepage.docs.body">
            Fifteen minutes to a workspace of your own — running on someone else&apos;s machine or entirely on yours.
          </Translate>
        </p>
      </div>
      <div className={styles.proof}>
        <div className={styles.docList}>
          {DOCS.map((doc) => (
            <Link key={doc.key} className={styles.doc} to={doc.to}>
              <span>
                <span className={styles.docTitle}>{doc.title}</span>
                <br />
                <span className={styles.docDesc}>{doc.desc}</span>
              </span>
              <span className={styles.docPath}>{doc.path}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- CTA ---
function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <h2 className={styles.ctaTitle}>
        <Translate id="homepage.cta.title">Get your information under control.</Translate>
      </h2>
      <p className={styles.ctaSubtitle}>
        <Translate id="homepage.cta.subtitle">Download the desktop app or try the cloud demo.</Translate>
      </p>
      <div className={styles.heroButtons}>
        <Link className={styles.heroButtonPrimary} to="/subscribe">
          <Translate id="homepage.cta.getStarted">Get Started</Translate>
        </Link>
        <Link className={styles.heroButtonSecondary} to={APP_URL}>
          <Translate id="homepage.cta.signIn">Sign In</Translate>
        </Link>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title={translate({
        id: 'homepage.title',
        message: 'UnDercontrol — Tasks, Knowledge & AI Agent Orchestration',
        description: 'The homepage meta title',
      })}
      description={translate({
        id: 'homepage.description',
        message: 'One private workspace for tasks, knowledge, and AI agents. Knowledge base like Obsidian, project management like Jira, finance like Mint — self-hosted, your data never leaves your control.',
        description: 'The homepage meta description',
      })}>
      <main className={styles.mainContainer}>
        <HeroSection />
        <WaysSection />
        <ShowcaseSection />
        <PrivateSection />
        <AiNativeSection />
        <OrchestratorSection />
        <AccessSection />
        <DocsSection />
        <CTASection />
      </main>
    </Layout>
  );
}
