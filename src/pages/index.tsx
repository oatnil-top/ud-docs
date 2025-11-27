import {useState, useRef, useEffect, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import {ExternalLink, Download, Server, Lock, ArrowDownToLine, ChevronDown} from 'lucide-react';

type Platform = 'macOS (Apple Silicon)' | 'macOS (Intel)' | 'Windows' | 'Linux';

const AVAILABLE_VERSIONS = ['0.1.3', '0.1.2', '0.1.1'];
const LATEST_VERSION = AVAILABLE_VERSIONS[0];
const R2_BASE_URL = 'https://pub-35d77f83ee8a41798bb4b2e1831ac70a.r2.dev/releases';

function getDownloadUrl(platform: Platform, version: string): string {
  const fileNames: Record<Platform, string> = {
    'macOS (Apple Silicon)': `undercontrol-desktop-${version}-arm64.dmg`,
    'macOS (Intel)': `undercontrol-desktop-${version}-x64.dmg`,
    Windows: `undercontrol-desktop-${version}-setup.exe`,
    Linux: `undercontrol-desktop-${version}.AppImage`,
  };
  return `${R2_BASE_URL}/${version}/${fileNames[platform]}`;
}

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
  const [showPlatformDropdown, setShowPlatformDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const platforms: Platform[] = ['macOS (Apple Silicon)', 'macOS (Intel)', 'Windows', 'Linux'];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowPlatformDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDownloadClick = () => {
    setShowPlatformDropdown(!showPlatformDropdown);
  };

  const handlePlatformSelect = (platform: Platform) => {
    const url = getDownloadUrl(platform, LATEST_VERSION);
    window.location.href = url;
    setShowPlatformDropdown(false);
  };

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
            <div className={styles.cardButton}>
              <div className={styles.downloadDropdown} ref={dropdownRef}>
                <button
                  type="button"
                  className={styles.downloadButton}
                  onClick={handleDownloadClick}>
                  <Translate id="homepage.cards.desktop.button">Download</Translate>
                  <ChevronDown size={16} strokeWidth={2} />
                </button>
                {showPlatformDropdown && (
                  <div className={styles.platformDropdown}>
                    {platforms.map((platform) => (
                      <button
                        key={platform}
                        type="button"
                        className={styles.platformOption}
                        onClick={() => handlePlatformSelect(platform)}>
                        {platform}
                      </button>
                    ))}
                  </div>
                )}
              </div>
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
