import {useState, useEffect, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import {
  Brain,
  CheckSquare,
  Wallet,
  Monitor,
  Server,
  ArrowRight,
  Shield,
  WifiOff,
  HardDrive,
  Heart,
  Code,
  Terminal,
  FolderSync,
  Globe,
  LayoutDashboard,
} from 'lucide-react';

// Centralized version - update version.json when releasing
import versionConfig from '../../version.json';
const VERSION = versionConfig.version;

import styles from './index.module.css';

function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <span className={styles.versionBadge}>
        <Translate
          id="homepage.hero.version"
          description="Version badge text"
          values={{version: VERSION}}>
          {'v{version} Available Now'}
        </Translate>
      </span>
      <h1 className={styles.heroTitle}>
        <Translate
          id="homepage.hero.tagline"
          description="The homepage hero tagline">
          Your Private AI Butler
        </Translate>
      </h1>
      <p className={styles.heroSubtitle}>
        <Translate
          id="homepage.hero.subtitle"
          description="The homepage hero subtitle">
          An AI assistant that lives on your machine — manages your tasks, knowledge, and finances. Talk to it from any device. Your data never leaves your control.
        </Translate>
      </p>
      <div className={styles.heroButtons}>
        <Link
          className={styles.heroButtonPrimary}
          to="https://ud.oatnil.top">
          <Translate id="homepage.hero.tryNow">Try Now</Translate>
        </Link>
        <Link
          className={styles.heroButtonSecondary}
          to="/subscribe">
          <Translate id="homepage.hero.download">Download Desktop App</Translate>
        </Link>
      </div>
    </section>
  );
}

// --- What Your Butler Does ---
const BUTLER_ITEMS = [
  {key: 'knowledge', Icon: Brain},
  {key: 'tasks', Icon: CheckSquare},
  {key: 'finance', Icon: Wallet},
] as const;

const BUTLER_IMAGES: Record<string, string[]> = {
  knowledge: ['tasks-show-en.png', 'tasks-details-markdown-en.png'],
  tasks: ['tasks-details-en.png'],
  finance: ['resources-main.en.png'],
};

function ButlerSection() {
  const {i18n} = useDocusaurusContext();
  const locale = i18n.currentLocale;
  const imgSuffix = locale === 'zh-Hans' ? 'zh' : 'en';

  const [activeItem, setActiveItem] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const currentKey = BUTLER_ITEMS[activeItem].key;
  const images = BUTLER_IMAGES[currentKey] || [];
  const currentImageSrc = useBaseUrl(`/img/${images[imageIndex] || 'tasks-show-en.png'}`);

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
          <Translate id="homepage.butler.label">What Your Butler Does</Translate>
        </h2>
        <div className={styles.butlerItems}>
          {BUTLER_ITEMS.map((item, index) => {
            const isActive = index === activeItem;
            const {Icon} = item;
            return (
              <div
                key={item.key}
                onClick={() => setActiveItem(index)}
                className={`${styles.butlerItem} ${isActive ? styles.butlerItemActive : ''}`}>
                <div className={styles.butlerItemHeader}>
                  <Icon size={16} strokeWidth={2} />
                  <span className={styles.butlerItemLabel}>
                    {item.key === 'knowledge' && (
                      <Translate id="homepage.butler.knowledge.label">Remembers Everything</Translate>
                    )}
                    {item.key === 'tasks' && (
                      <Translate id="homepage.butler.tasks.label">Manages Your Work</Translate>
                    )}
                    {item.key === 'finance' && (
                      <Translate id="homepage.butler.finance.label">Tracks Your Money</Translate>
                    )}
                  </span>
                </div>
                {isActive && (
                  <p className={styles.butlerItemDesc}>
                    {item.key === 'knowledge' && (
                      <Translate id="homepage.butler.knowledge.desc">
                        Markdown knowledge base with graphs, mind maps, and bi-directional links. Your butler never forgets.
                      </Translate>
                    )}
                    {item.key === 'tasks' && (
                      <Translate id="homepage.butler.tasks.desc">
                        Kanban boards, calendars, hierarchy views. Your butler keeps your projects on track.
                      </Translate>
                    )}
                    {item.key === 'finance' && (
                      <Translate id="homepage.butler.finance.desc">
                        Budgets, expenses, accounts. Snap a receipt — your butler logs it automatically.
                      </Translate>
                    )}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.featureMedia}>
        <div className={styles.carousel}>
          <img
            src={currentImageSrc}
            alt={currentKey}
            className={styles.showcaseImage}
            onClick={() => setIsLightboxOpen(true)}
          />
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

      {isLightboxOpen && (
        <div className={styles.lightbox} onClick={() => setIsLightboxOpen(false)}>
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close lightbox">
            ×
          </button>
          <img
            src={currentImageSrc}
            alt={currentKey}
            className={styles.lightboxImage}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

// --- How It Works ---
function HowItWorksSection() {
  return (
    <section className={styles.howItWorksSection}>
      <h2 className={styles.sectionLabel}>
        <Translate id="homepage.howItWorks.label">How It Works</Translate>
      </h2>
      <p className={styles.sectionSubtitle}>
        <Translate id="homepage.howItWorks.subtitle">
          Your butler lives on your machine. Intelligence runs locally. The server is just a relay.
        </Translate>
      </p>
      <div className={styles.howItWorksSteps}>
        <div className={styles.howItWorksStep}>
          <Monitor size={24} strokeWidth={1.5} />
          <h3>
            <Translate id="homepage.howItWorks.you.label">You</Translate>
          </h3>
          <p>
            <Translate id="homepage.howItWorks.you.desc">
              Talk from any device — web, desktop, CLI, or mobile
            </Translate>
          </p>
        </div>
        <ArrowRight size={16} className={styles.howItWorksArrow} />
        <div className={`${styles.howItWorksStep} ${styles.howItWorksStepMuted}`}>
          <Server size={24} strokeWidth={1.5} />
          <h3>
            <Translate id="homepage.howItWorks.server.label">Server</Translate>
          </h3>
          <p>
            <Translate id="homepage.howItWorks.server.desc">
              Relays messages only. No intelligence, no data processing.
            </Translate>
          </p>
        </div>
        <ArrowRight size={16} className={styles.howItWorksArrow} />
        <div className={styles.howItWorksStep}>
          <Brain size={24} strokeWidth={1.5} />
          <h3>
            <Translate id="homepage.howItWorks.butler.label">Your Butler</Translate>
          </h3>
          <p>
            <Translate id="homepage.howItWorks.butler.desc">
              AI agent on your machine. Orchestrates local tools, manages your data.
            </Translate>
          </p>
        </div>
      </div>
    </section>
  );
}

// --- For Developers ---
const DEV_ITEMS = [
  {key: 'agents', Icon: Code},
  {key: 'cli', Icon: Terminal},
  {key: 'sync', Icon: FolderSync},
  {key: 'api', Icon: Globe},
  {key: 'workspace', Icon: LayoutDashboard},
] as const;

function DevelopersSection() {
  return (
    <section className={styles.developersSection}>
      <div className={styles.developersHeader}>
        <h2 className={styles.sectionLabel}>
          <Translate id="homepage.developers.label">Built for Developers</Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="homepage.developers.subtitle">Your butler can code, too.</Translate>
        </p>
      </div>
      <div className={styles.developersList}>
        {DEV_ITEMS.map((item) => {
          const {Icon} = item;
          return (
            <div key={item.key} className={styles.developerItem}>
              <Icon size={16} strokeWidth={2} />
              <span>
                {item.key === 'agents' && (
                  <Translate id="homepage.developers.agents">
                    Launch Claude Code or Codex agents directly from tasks
                  </Translate>
                )}
                {item.key === 'cli' && (
                  <Translate id="homepage.developers.cli">
                    kubectl-style CLI — scriptable, AI-agent-friendly
                  </Translate>
                )}
                {item.key === 'sync' && (
                  <Translate id="homepage.developers.sync">
                    Two-way local sync — AI agents read and write your notes directly
                  </Translate>
                )}
                {item.key === 'api' && (
                  <Translate id="homepage.developers.api">
                    Open HTTP API — embed in any workflow
                  </Translate>
                )}
                {item.key === 'workspace' && (
                  <Translate id="homepage.developers.workspace">
                    Workspace terminal with parallel agent execution
                  </Translate>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// --- Trust Section ---
const TRUST_ITEMS = [
  {key: 'private', Icon: Shield},
  {key: 'offline', Icon: WifiOff},
  {key: 'selfhost', Icon: HardDrive},
  {key: 'free', Icon: Heart},
] as const;

function TrustSection() {
  return (
    <section className={styles.trustSection}>
      <h2 className={styles.sectionLabel}>
        <Translate id="homepage.trust.label">Your Data, Your Rules</Translate>
      </h2>
      <div className={styles.trustGrid}>
        {TRUST_ITEMS.map((item) => {
          const {Icon} = item;
          return (
            <div key={item.key} className={styles.trustItem}>
              <Icon size={16} strokeWidth={2} />
              <div>
                <h3>
                  {item.key === 'private' && (
                    <Translate id="homepage.trust.private.title">Fully Private</Translate>
                  )}
                  {item.key === 'offline' && (
                    <Translate id="homepage.trust.offline.title">Works Offline</Translate>
                  )}
                  {item.key === 'selfhost' && (
                    <Translate id="homepage.trust.selfhost.title">Self-Hostable</Translate>
                  )}
                  {item.key === 'free' && (
                    <Translate id="homepage.trust.free.title">Free Forever</Translate>
                  )}
                </h3>
                <p>
                  {item.key === 'private' && (
                    <Translate id="homepage.trust.private.desc">
                      Your butler runs on your machine. Data never leaves your device.
                    </Translate>
                  )}
                  {item.key === 'offline' && (
                    <Translate id="homepage.trust.offline.desc">
                      Desktop app with built-in backend. No internet required.
                    </Translate>
                  )}
                  {item.key === 'selfhost' && (
                    <Translate id="homepage.trust.selfhost.desc">
                      Deploy on your own infrastructure. Your server, your rules.
                    </Translate>
                  )}
                  {item.key === 'free' && (
                    <Translate id="homepage.trust.free.desc">
                      No ads, no tracking. Personal use is free, always.
                    </Translate>
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// --- CTA Section ---
function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <p className={styles.ctaSubtitle}>
        <Translate id="homepage.cta.subtitle">
          Download the desktop app or try the cloud demo.
        </Translate>
      </p>
      <div className={styles.heroButtons}>
        <Link
          className={styles.heroButtonPrimary}
          to="/subscribe">
          <Translate id="homepage.cta.getStarted">Get Started</Translate>
        </Link>
        <Link
          className={styles.heroButtonSecondary}
          to="https://ud.oatnil.top">
          <Translate id="homepage.cta.tryDemo">Try Demo</Translate>
        </Link>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footerSection}>
      <div className={styles.footerBrand}>
        <span className={styles.footerLogo}>UnDercontrol</span>
        <span className={styles.footerCopyright}>© {new Date().getFullYear()}</span>
      </div>
      <div className={styles.footerLinks}>
        <Link to="https://ud.oatnil.top" className={styles.footerLink}>
          <Translate id="homepage.footer.home">Home</Translate>
        </Link>
        <Link to="/docs/intro" className={styles.footerLink}>
          <Translate id="homepage.footer.documentation">Documentation</Translate>
        </Link>
        <Link to="/docs/pricing" className={styles.footerLink}>
          <Translate id="homepage.footer.pricing">Pricing</Translate>
        </Link>
      </div>
    </footer>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title={translate({
        id: 'homepage.title',
        message: 'UnDercontrol — Your Private AI Butler',
        description: 'The homepage meta title',
      })}
      description={translate({
        id: 'homepage.description',
        message: 'A private AI butler that manages your tasks, knowledge, and finances. Runs on your machine, talks to you from anywhere. Download the desktop app or self-host — your data never leaves your control.',
        description: 'The homepage meta description',
      })}>
      <main className={styles.mainContainer}>
        <HeroSection />
        <ButlerSection />
        <HowItWorksSection />
        <DevelopersSection />
        <TrustSection />
        <CTASection />
        <FooterSection />
      </main>
    </Layout>
  );
}
