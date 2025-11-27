import {useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import {ExternalLink, Download, Server, Lock, ArrowDownToLine} from 'lucide-react';

type Platform = 'macOS (Apple Silicon)' | 'macOS (Intel)' | 'Windows' | 'Linux';

const RELEASE_VERSION = '0.1.3';
const R2_BASE_URL = 'https://pub-35d77f83ee8a41798bb4b2e1831ac70a.r2.dev/releases';

const downloadUrls: Record<Platform, string> = {
  'macOS (Apple Silicon)': `${R2_BASE_URL}/${RELEASE_VERSION}/undercontrol-desktop-${RELEASE_VERSION}-arm64.dmg`,
  'macOS (Intel)': `${R2_BASE_URL}/${RELEASE_VERSION}/undercontrol-desktop-${RELEASE_VERSION}-x64.dmg`,
  Windows: `${R2_BASE_URL}/${RELEASE_VERSION}/undercontrol-desktop-${RELEASE_VERSION}-setup.exe`,
  Linux: `${R2_BASE_URL}/${RELEASE_VERSION}/undercontrol-desktop-${RELEASE_VERSION}.AppImage`,
};

import styles from './index.module.css';

function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <div className="container">
        <span className={styles.versionBadge}>
          <Translate
            id="homepage.hero.version"
            description="Version badge text">
            v2.1.0 Available Now
          </Translate>
        </span>
        <h1 className={styles.heroTitle}>
          <Translate
            id="homepage.hero.title"
            description="The homepage hero title">
            Your Data, Your Control.
          </Translate>
        </h1>
        <p className={styles.heroSubtitle}>
          <Translate
            id="homepage.hero.subtitle"
            description="The homepage hero subtitle">
            Built by indie developer + AI. The ultimate secure workspace.
          </Translate>
        </p>
      </div>
    </section>
  );
}

function CardsSection() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('macOS (Apple Silicon)');
  const platforms: Platform[] = ['macOS (Apple Silicon)', 'macOS (Intel)', 'Windows', 'Linux'];

  return (
    <section className={styles.cardsSection}>
      <div className="container">
        <div className={styles.cardsGrid}>
          {/* Try Online Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>
                <Translate id="homepage.cards.web.label">WEB</Translate>
              </span>
              <div className={styles.cardIcon}>
                <ExternalLink size={20} strokeWidth={2} />
              </div>
            </div>
            <h3 className={styles.cardTitle}>
              <Translate id="homepage.cards.web.title">Try Online / Subscribe</Translate>
            </h3>
            <p className={styles.cardDescription}>
              <Translate id="homepage.cards.web.description">
                Quick start with a visitor account, or subscribe to our hosted service. We will do the best to secure the data, but we respect zero trust—even big companies leak data. For true security, deploy on your own trusted machine.
              </Translate>
            </p>
            <div className={styles.cardButton}>
              <Link
                className={styles.cardButtonOutline}
                to="https://oatnil.top/ud/login">
                <Translate id="homepage.cards.web.button">Launch Web App</Translate>
              </Link>
            </div>
          </div>

          {/* Download App Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>
                <Translate id="homepage.cards.desktop.label">DESKTOP APP</Translate>
              </span>
              <div className={styles.cardIcon}>
                <Download size={20} strokeWidth={2} />
              </div>
            </div>
            <h3 className={styles.cardTitle}>
              <Translate id="homepage.cards.desktop.title">Download App</Translate>
            </h3>
            <p className={styles.cardDescription}>
              <Translate id="homepage.cards.desktop.description">
                Native performance, totally offline, and system integration. The best way to experience UnderControl. Free forever for personal usage.
              </Translate>
            </p>
            <div className={styles.cardPlatforms}>
              {platforms.map((platform) => (
                <button
                  key={platform}
                  type="button"
                  className={`${styles.platformButton} ${selectedPlatform === platform ? styles.platformButtonActive : ''}`}
                  onClick={() => setSelectedPlatform(platform)}>
                  {platform}
                </button>
              ))}
            </div>
            <div className={styles.cardButton}>
              <Link
                className={styles.cardButtonPrimary}
                to={downloadUrls[selectedPlatform]}>
                <Translate id="homepage.cards.desktop.button">Download</Translate>
              </Link>
            </div>
          </div>

          {/* Self-Deploy Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>
                <Translate id="homepage.cards.selfhost.label">SELF-HOST</Translate>
              </span>
              <div className={styles.cardIcon}>
                <Server size={20} strokeWidth={2} />
              </div>
            </div>
            <h3 className={styles.cardTitle}>
              <Translate id="homepage.cards.selfhost.title">Self-Deploy</Translate>
            </h3>
            <p className={styles.cardDescription}>
              <Translate id="homepage.cards.selfhost.description">
                Complete control. Deploy to your server/internal network. Work offline. Your data never leaves your infrastructure. Personal tier free forever.
              </Translate>
            </p>
            <div className={styles.cardButton}>
              <Link
                className={styles.cardButtonOutline}
                to="/docs/self-deployment">
                <Translate id="homepage.cards.selfhost.button">View Docs</Translate>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <div className={styles.featuresGrid}>
          <div className={styles.feature}>
            <div className={styles.featureHeader}>
              <Lock size={20} strokeWidth={1.5} className={styles.featureIcon} />
              <span className={styles.featureTitle}>
                <Translate id="homepage.features.encryption.title">
                  End-to-End Encryption
                </Translate>
              </span>
            </div>
            <p className={styles.featureDescription}>
              <Translate id="homepage.features.encryption.description">
                AES-256 encryption at rest. Zero-knowledge architecture available for self-hosted instances.
              </Translate>
            </p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureHeader}>
              <ArrowDownToLine size={20} strokeWidth={1.5} className={styles.featureIcon} />
              <span className={styles.featureTitle}>
                <Translate id="homepage.features.export.title">
                  No Vendor Lock-in
                </Translate>
              </span>
            </div>
            <p className={styles.featureDescription}>
              <Translate id="homepage.features.export.description">
                Export to JSON/Markdown/CSV at any time. Your data structure is open and documented.
              </Translate>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={translate({
        id: 'homepage.title',
        message: 'Hello from {title}',
        description: 'The homepage meta title',
      }, {title: siteConfig.title})}
      description={translate({
        id: 'homepage.description',
        message: 'Built by indie developer + AI. Self-host, work offline, deploy to internal network. Your data stays yours. Personal tier free forever. Zero trust, full control.',
        description: 'The homepage meta description',
      })}>
      <main>
        <HeroSection />
        <CardsSection />
        <FeaturesSection />
      </main>
    </Layout>
  );
}
