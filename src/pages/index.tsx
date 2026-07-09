import {useState, useEffect, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import {
  Package,
  Lock,
  Bot,
  Radio,
  Puzzle,
  Smartphone,
  Shield,
  WifiOff,
  Server,
  Wifi,
  Code,
  Terminal,
  Globe,
  Monitor,
} from 'lucide-react';

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

// --- Hero ---
function HeroSection() {
  const cdnImg = useCdnImg();
  return (
    <section className={styles.heroSection}>
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
      <div className={styles.heroPills}>
        <span className={styles.heroPill}><Translate id="homepage.hero.pill.selfhosted">Self-hosted</Translate></span>
        <span className={styles.heroPill}><Translate id="homepage.hero.pill.localfirst">Local-first</Translate></span>
        <span className={styles.heroPill}><Translate id="homepage.hero.pill.ainative">AI-native</Translate></span>
        <span className={styles.heroPill}><Translate id="homepage.hero.pill.openapi">Open API</Translate></span>
        <span className={styles.heroPill}><Translate id="homepage.hero.pill.allinone">All-in-one</Translate></span>
      </div>
      <div className={styles.heroButtons}>
        <Link className={styles.heroButtonPrimary} to={APP_URL}>
          <Translate id="homepage.hero.tryNow">Try Now</Translate>
        </Link>
        <Link className={styles.heroButtonSecondary} to="/subscribe">
          <Translate id="homepage.hero.download">Download Desktop App</Translate>
        </Link>
      </div>
      <div className={styles.heroImageWrap}>
        <img
          className={styles.heroDesktopImg}
          src={cdnImg('desktop.jpg')}
          alt="UnDercontrol desktop"
          loading="lazy"
        />
        <img
          className={styles.heroMobileImg}
          src={cdnImg('mobile.jpg')}
          alt="UnDercontrol mobile"
          loading="lazy"
        />
      </div>
    </section>
  );
}

// --- Why UnDercontrol: 6-pillar grid ---
const PILLARS = [
  {key: 'allinone', Icon: Package},
  {key: 'private', Icon: Lock},
  {key: 'ainative', Icon: Bot},
  {key: 'orchestrator', Icon: Radio},
  {key: 'open', Icon: Puzzle},
  {key: 'access', Icon: Smartphone},
] as const;

const PILLAR_TEXT: Record<string, {title: ReactNode; desc: ReactNode}> = {
  allinone: {
    title: <Translate id="homepage.pillarsGrid.allinone.title">All-in-One</Translate>,
    desc: (
      <Translate id="homepage.pillarsGrid.allinone.desc">
        Knowledge base like Obsidian and Notion. Project management like Jira and Trello. Personal finance like Mint and YNAB. File storage like Google Drive and Dropbox — one private workspace.
      </Translate>
    ),
  },
  private: {
    title: <Translate id="homepage.pillarsGrid.private.title">Private by Design & No Vendor Lock-in</Translate>,
    desc: (
      <Translate id="homepage.pillarsGrid.private.desc">
        Self-hosted, local-first. Everything-as-code — your tasks, notes, and data are declarable in Markdown and YAML, versionable with Git, and fully portable. No proprietary formats, no lock-in.
      </Translate>
    ),
  },
  ainative: {
    title: <Translate id="homepage.pillarsGrid.ainative.title">AI-Native</Translate>,
    desc: (
      <Translate id="homepage.pillarsGrid.ainative.desc">
        Everything is defined as structured schemas — Kubernetes-style, as-code. AI agents read and write your tasks, notes, and resources through CLI and API, just like kubectl apply.
      </Translate>
    ),
  },
  orchestrator: {
    title: <Translate id="homepage.pillarsGrid.orchestrator.title">Agent Orchestrator</Translate>,
    desc: (
      <Translate id="homepage.pillarsGrid.orchestrator.desc">
        Orchestrate AI agents from anywhere. Launch remote sessions, assign tasks to agents, and let them work autonomously — even when you're offline.
      </Translate>
    ),
  },
  open: {
    title: <Translate id="homepage.pillarsGrid.open.title">Open & Extensible — Single Source of Truth</Translate>,
    desc: (
      <Translate id="homepage.pillarsGrid.open.desc">
        Open API, open schema. Hermes, OpenClaw, or any custom client can CRUD your information via API key and CLI. Share reusable skills — prompt templates that any agent can consume.
      </Translate>
    ),
  },
  access: {
    title: <Translate id="homepage.pillarsGrid.access.title">Access Everywhere</Translate>,
    desc: (
      <Translate id="homepage.pillarsGrid.access.desc">
        Read and write from any device, anytime. Web, desktop, mobile, CLI, Chrome extension, and Apple Shortcuts.
      </Translate>
    ),
  },
};

function PillarsGridSection() {
  return (
    <section className={styles.pillarsGridSection}>
      <h2 className={styles.sectionLabel}>
        <Translate id="homepage.pillarsGrid.label">Why UnDercontrol</Translate>
      </h2>
      <div className={styles.pillarsGrid}>
        {PILLARS.map(({key, Icon}) => (
          <div key={key} className={styles.pillarCard}>
            <Icon size={18} strokeWidth={2} className={styles.pillarCardIcon} />
            <h3 className={styles.pillarCardTitle}>{PILLAR_TEXT[key].title}</h3>
            <p className={styles.pillarCardDesc}>{PILLAR_TEXT[key].desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- All-in-One image showcase ---
const SHOWCASE = [
  {key: 'tasks', images: ['home-page/tasks/1.jpg', 'home-page/tasks/2.jpg', 'home-page/tasks/3.jpg', 'home-page/tasks/4.jpg', 'home-page/tasks/5.jpg', 'home-page/tasks/6.jpg', 'home-page/tasks/7.jpg']},
  {key: 'finance', images: ['home-page/finance/1.jpg', 'home-page/finance/2.jpg', 'home-page/finance/3.jpg', 'home-page/finance/4.jpg']},
  {key: 'resources', images: ['home-page/resources/1.jpg', 'home-page/resources/2.jpg', 'home-page/resources/3.jpg']},
  {key: 'workspace', images: ['home-page/workspace/1.jpg']},
  {key: 'access', images: ['home-page/access/1.jpg', 'home-page/access/2.jpg']},
] as const;

const SHOWCASE_TEXT: Record<string, {label: ReactNode; desc: ReactNode}> = {
  tasks: {
    label: <Translate id="homepage.showcase.tasks.label">Tasks & Knowledge</Translate>,
    desc: <Translate id="homepage.showcase.tasks.desc">Kanban, Markdown, knowledge graphs and mind maps.</Translate>,
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
    desc: <Translate id="homepage.showcase.workspace.desc">Agent launch, parallel execution, workspace dashboard.</Translate>,
  },
  access: {
    label: <Translate id="homepage.showcase.access.label">Works Everywhere</Translate>,
    desc: <Translate id="homepage.showcase.access.desc">Web, desktop, CLI, Chrome extension, Shortcuts, API.</Translate>,
  },
};

function ShowcaseSection() {
  const cdnImg = useCdnImg();
  const [activeItem, setActiveItem] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [failed, setFailed] = useState<Record<string, boolean>>({});

  const current = SHOWCASE[activeItem];
  const images = current.images;
  const currentSrc = cdnImg(images[imageIndex] || images[0]);
  const isFailed = failed[currentSrc];

  useEffect(() => {
    setImageIndex(0);
  }, [activeItem]);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length, activeItem]);

  return (
    <section className={styles.featureSection}>
      <div className={styles.featureContent}>
        <h2 className={styles.sectionLabel}>
          <Translate id="homepage.showcase.label">All-in-One</Translate>
        </h2>
        <div className={styles.pillarItems}>
          {SHOWCASE.map((item, index) => {
            const isActive = index === activeItem;
            return (
              <div
                key={item.key}
                onClick={() => setActiveItem(index)}
                className={`${styles.pillarItem} ${isActive ? styles.pillarItemActive : ''}`}>
                <div className={styles.pillarItemHeader}>
                  <span className={styles.pillarItemLabel}>{SHOWCASE_TEXT[item.key].label}</span>
                </div>
                {isActive && <p className={styles.pillarItemDesc}>{SHOWCASE_TEXT[item.key].desc}</p>}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.featureMedia}>
        <div className={styles.carousel}>
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
          {images.length > 1 && (
            <div className={styles.carouselDots}>
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`${styles.carouselDot} ${index === imageIndex ? styles.carouselDotActive : ''}`}
                  onClick={() => setImageIndex(index)}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {isLightboxOpen && !isFailed && (
        <div className={styles.lightbox} onClick={() => setIsLightboxOpen(false)}>
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close lightbox">
            ×
          </button>
          <img src={currentSrc} alt={current.key} className={styles.lightboxImage} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}

// --- Trust ---
const TRUST_ITEMS = [
  {key: 'private', Icon: Shield},
  {key: 'offline', Icon: WifiOff},
  {key: 'selfhost', Icon: Server},
  {key: 'free', Icon: Wifi},
] as const;

const TRUST_TEXT: Record<string, {title: ReactNode; desc: ReactNode}> = {
  private: {
    title: <Translate id="homepage.trust.private.title">Fully Private</Translate>,
    desc: <Translate id="homepage.trust.private.desc">AI runs on your machine. Data never leaves your device.</Translate>,
  },
  offline: {
    title: <Translate id="homepage.trust.offline.title">Works Offline</Translate>,
    desc: <Translate id="homepage.trust.offline.desc">Desktop app with built-in backend. No internet required.</Translate>,
  },
  selfhost: {
    title: <Translate id="homepage.trust.selfhost.title">Self-Hostable</Translate>,
    desc: <Translate id="homepage.trust.selfhost.desc">Deploy on your own infrastructure. Your server, your rules.</Translate>,
  },
  free: {
    title: <Translate id="homepage.trust.free.title">Free Forever</Translate>,
    desc: <Translate id="homepage.trust.free.desc">No ads, no tracking. Personal use is free, always.</Translate>,
  },
};

function TrustSection() {
  return (
    <section className={styles.trustSection}>
      <h2 className={styles.sectionLabel}>
        <Translate id="homepage.trust.label">Private by Design & No Vendor Lock-in</Translate>
      </h2>
      <div className={styles.trustGrid}>
        {TRUST_ITEMS.map(({key, Icon}) => (
          <div key={key} className={styles.trustItem}>
            <Icon size={16} strokeWidth={2} />
            <div>
              <h3>{TRUST_TEXT[key].title}</h3>
              <p>{TRUST_TEXT[key].desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- Developers (AI-Native) ---
const DEV_ITEMS = [
  {key: 'agents', Icon: Code, text: <Translate id="homepage.developers.agents">Launch Claude Code or Codex agents directly from tasks</Translate>},
  {key: 'cli', Icon: Terminal, text: <Translate id="homepage.developers.cli">kubectl-style CLI — scriptable, AI-agent-friendly</Translate>},
  {key: 'api', Icon: Globe, text: <Translate id="homepage.developers.api">Open HTTP API — embed in any workflow</Translate>},
  {key: 'workspace', Icon: Monitor, text: <Translate id="homepage.developers.workspace">Workspace terminal with parallel agent execution</Translate>},
] as const;

function DevelopersSection() {
  return (
    <section className={styles.developersSection}>
      <div className={styles.developersHeader}>
        <h2 className={styles.sectionLabel}>
          <Translate id="homepage.developers.label">AI-Native</Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="homepage.developers.subtitle">
            Everything is defined as structured schemas — Kubernetes-style, as-code. AI agents consume your data natively.
          </Translate>
        </p>
      </div>
      <div className={styles.developersList}>
        {DEV_ITEMS.map(({key, Icon, text}) => (
          <div key={key} className={styles.developerItem}>
            <Icon size={16} strokeWidth={2} />
            <span>{text}</span>
          </div>
        ))}
      </div>
      <div className={styles.cliTerm}>
        <div className={styles.cliBar}>
          <span className={styles.cliDots}><i /><i /><i /></span>
          <span className={styles.cliName}>bash — ud CLI</span>
        </div>
        <div className={styles.cliBody}>
          <pre>
            <span className={styles.c}># everything-as-code: tasks are markdown, agents speak CLI{'\n'}</span>
            <span className={styles.p}>$</span> ud apply -f task.md          <span className={styles.c}># create or update from a file</span>{'\n'}
            <span className={styles.p}>$</span> ud get task <span className={styles.f}>--status</span> todo     <span className={styles.c}># kubectl-style queries</span>{'\n'}
            <span className={styles.p}>$</span> ud describe task 49322857     <span className={styles.c}># full context for an agent</span>
          </pre>
        </div>
      </div>
    </section>
  );
}

// --- How It Works: Agent Orchestrator diagram ---
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

function HowItWorksSection() {
  return (
    <section className={styles.orchestrationSection}>
      <h2 className={styles.sectionLabel}>
        <Translate id="homepage.howItWorks.label">Agent Orchestrator</Translate>
      </h2>
      <p className={styles.sectionSubtitle}>
        <Translate id="homepage.howItWorks.subtitle">
          Orchestrate AI agents from anywhere. Launch remote sessions, assign tasks, and let them work autonomously — even when you're offline.
        </Translate>
      </p>
      <OrchestrationDiagram />
    </section>
  );
}

// --- Open & Extensible ---
const OPEN_ITEMS = [
  {key: 'api', Icon: Globe, text: <Translate id="homepage.openExtensible.api">Open API and open schema — any client can integrate</Translate>},
  {key: 'hermes', Icon: Puzzle, text: <Translate id="homepage.openExtensible.hermes">Hermes, OpenClaw, or any custom client can CRUD your data via API key</Translate>},
  {key: 'cli', Icon: Terminal, text: <Translate id="homepage.openExtensible.cli">CLI access for scripting and automation workflows</Translate>},
  {key: 'skills', Icon: Code, text: <Translate id="homepage.openExtensible.skills">Share reusable skills — prompt templates that any agent can consume</Translate>},
] as const;

function OpenExtensibleSection() {
  return (
    <section className={styles.developersSection}>
      <div className={styles.developersHeader}>
        <h2 className={styles.sectionLabel}>
          <Translate id="homepage.openExtensible.label">Open & Extensible — Single Source of Truth</Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="homepage.openExtensible.subtitle">
            Your data lives here. Every tool and agent reads from and writes to one central place.
          </Translate>
        </p>
      </div>
      <div className={styles.developersList}>
        {OPEN_ITEMS.map(({key, Icon, text}) => (
          <div key={key} className={styles.developerItem}>
            <Icon size={16} strokeWidth={2} />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- CTA ---
function CTASection() {
  return (
    <section className={styles.ctaSection}>
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
        <PillarsGridSection />
        <ShowcaseSection />
        <TrustSection />
        <DevelopersSection />
        <HowItWorksSection />
        <OpenExtensibleSection />
        <CTASection />
      </main>
    </Layout>
  );
}
