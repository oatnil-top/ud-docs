import {useState, useRef, useEffect, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import {
  ExternalLink,
  Download,
  Server,
  ChevronDown,
  Link2,
  FileText,
  Upload,
  Camera,
  Clock,
  HardDrive,
  PlusCircle,
  LayoutGrid,
  Layout as LayoutIcon,
  MessageSquare,
  Image,
} from 'lucide-react';

// Centralized version - update version.json when releasing
import versionConfig from '../../version.json';
const VERSION = versionConfig.version;
const AVAILABLE_VERSIONS = versionConfig.availableVersions;

type Platform = 'macOS (Apple Silicon)' | 'macOS (Intel)' | 'Windows' | 'Linux';

const R2_BASE_URL = 'https://pub-35d77f83ee8a41798bb4b2e1831ac70a.r2.dev/releases';

function getDownloadUrl(platform: Platform, version: string = VERSION): string {
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
          id="homepage.hero.title"
          description="The homepage hero title">
          Manage your money and time in one single app, own 100% of your data
        </Translate>
      </h1>
      <p className={styles.heroSubtitle}>
        <Translate
          id="homepage.hero.subtitle"
          description="The homepage hero subtitle">
          Built by indie developer + AI. No ads, no tracking, no motive to peek at your data.
        </Translate>
      </p>
    </section>
  );
}

function CardsSection() {
  const [showPlatformDropdown, setShowPlatformDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const platforms: Platform[] = ['macOS (Apple Silicon)', 'macOS (Intel)', 'Windows', 'Linux'];

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
    const url = getDownloadUrl(platform, VERSION);
    window.location.href = url;
    setShowPlatformDropdown(false);
  };

  return (
    <section className={styles.cardsSection}>
      <div className={styles.cardsGrid}>
        {/* Try Online Card */}
        <div className={styles.card}>
          <div>
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>
                <Translate id="homepage.cards.web.label">WEB</Translate>
              </span>
              <div className={styles.cardIcon}>
                <ExternalLink size={16} strokeWidth={2} />
              </div>
            </div>
            <h3 className={styles.cardTitle}>
              <Translate id="homepage.cards.web.title">Try Online</Translate>
            </h3>
            <p className={styles.cardDescription}>
              <Translate id="homepage.cards.web.description">
                Quick start with a visitor account. Best for testing features immediately.
              </Translate>
            </p>
          </div>
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
          <div>
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>
                <Translate id="homepage.cards.desktop.label">DESKTOP</Translate>
              </span>
              <div className={styles.cardIconFilled}>
                <Download size={16} strokeWidth={2} />
              </div>
            </div>
            <h3 className={styles.cardTitle}>
              <Translate id="homepage.cards.desktop.title">Download App</Translate>
            </h3>
            <p className={styles.cardDescription}>
              <Translate id="homepage.cards.desktop.description">
                Native performance, offline support, and system integration.
              </Translate>
            </p>
          </div>
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
          <div>
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>
                <Translate id="homepage.cards.selfhost.label">SERVER</Translate>
              </span>
              <div className={styles.cardIcon}>
                <Server size={16} strokeWidth={2} />
              </div>
            </div>
            <h3 className={styles.cardTitle}>
              <Translate id="homepage.cards.selfhost.title">Self-Deploy</Translate>
            </h3>
            <p className={styles.cardDescription}>
              <Translate id="homepage.cards.selfhost.description">
                Deploy via Docker. Your data never leaves your infrastructure.
              </Translate>
            </p>
          </div>
          <div className={styles.cardButton}>
            <Link
              className={styles.cardButtonOutline}
              to="/docs/self-deployment">
              <Translate id="homepage.cards.selfhost.button">View Docs</Translate>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function TaskFeatureSection() {
  const {i18n} = useDocusaurusContext();
  const locale = i18n.currentLocale;
  const imgSuffix = locale === 'zh-Hans' ? 'zh' : 'en';
  const tasksShowImg = useBaseUrl(`/img/tasks-show-${imgSuffix}.png`);
  const tasksDetailsImg = useBaseUrl('/img/tasks-details-en.png');
  const tasksMarkdownImg = useBaseUrl('/img/tasks-details-markdown-en.png');

  const images = [
    { src: tasksShowImg, alt: 'Tasks List' },
    { src: tasksDetailsImg, alt: 'Task Details' },
    { src: tasksMarkdownImg, alt: 'Markdown Editor' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <section className={styles.featureSection}>
      <div className={styles.featureContent}>
        <h2 className={styles.featureTitle}>
          <Translate id="homepage.features.tracker.title">
            Your Personal, Lightweight Issue Tracker
          </Translate>
        </h2>
        <ul className={styles.featureList}>
          <li className={styles.featureItem}>
            <h3>
              <Link2 size={16} strokeWidth={2} />
              <Translate id="homepage.features.tracker.linking.title">
                Bi-Directional Linking
              </Translate>
            </h3>
            <p>
              <Translate id="homepage.features.tracker.linking.description">
                Notes are contextually aware. Link content directly within the text editor or use the system linking provider.
              </Translate>
            </p>
          </li>
          <li className={styles.featureItem}>
            <h3>
              <FileText size={16} strokeWidth={2} />
              <Translate id="homepage.features.tracker.markdown.title">
                Markdown First
              </Translate>
            </h3>
            <p>
              <Translate id="homepage.features.tracker.markdown.description">
                A true first-class citizen. Edit, organize, and save all your captions and tasks in pure Markdown format.
              </Translate>
            </p>
          </li>
          <li className={styles.featureItem}>
            <h3>
              <Upload size={16} strokeWidth={2} />
              <Translate id="homepage.features.tracker.export.title">
                Export & Share
              </Translate>
            </h3>
            <p>
              <Translate id="homepage.features.tracker.export.description">
                No vendor lock-in. Export your data instantly or share specific accounts with friends and colleagues.
              </Translate>
            </p>
          </li>
        </ul>
      </div>
      <div className={styles.featureMedia}>
        <div className={styles.carousel}>
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className={styles.showcaseImage}
            onClick={() => setIsLightboxOpen(true)}
          />
          <div className={styles.carouselDots}>
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`${styles.carouselDot} ${index === currentIndex ? styles.carouselDotActive : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
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
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className={styles.lightboxImage}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
            aria-label="Previous image">
            ‹
          </button>
          <button
            type="button"
            className={`${styles.lightboxNav} ${styles.lightboxNext}`}
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            aria-label="Next image">
            ›
          </button>
        </div>
      )}
    </section>
  );
}

function AiFeatureSection() {
  return (
    <section className={styles.featureSectionReverse}>
      <div className={styles.featureContent}>
        <h2 className={styles.featureTitle}>
          <Translate id="homepage.features.ai.title">
            AI-Driven Workflows
          </Translate>
        </h2>
        <ul className={styles.featureList}>
          <li className={styles.featureItem}>
            <h3>
              <Camera size={16} strokeWidth={2} />
              <Translate id="homepage.features.ai.snap.title">
                Snap & Log Anything
              </Translate>
            </h3>
            <p>
              <Translate id="homepage.features.ai.snap.description">
                Send images, text, or voice to the AI. It helps you log expenses, create tasks, and manage everything in the app automatically.
              </Translate>
            </p>
          </li>
          <li className={styles.featureItem}>
            <h3>
              <Clock size={16} strokeWidth={2} />
              <Translate id="homepage.features.ai.shortcuts.title">
                Apple Shortcuts Integration
              </Translate>
            </h3>
            <p>
              <Translate id="homepage.features.ai.shortcuts.description">
                One-click access to your AI assistant. Seamlessly integrated into your OS for rapid capturing.
              </Translate>
            </p>
          </li>
        </ul>
      </div>
      <div className={styles.featureMedia}>
        <div className={styles.mockupMobile}>
          <div className={styles.mockupMobileHeader}>
            <div className={styles.mockupNotch} />
          </div>
          <div className={styles.mockupBody}>
            <div className={styles.mockupPlaceholder}>
              <MessageSquare size={48} strokeWidth={1} />
              <div className={styles.mockupPlaceholderText}>AI Assistant GIF</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResourceFeatureSection() {
  const resourcesMainImg = useBaseUrl('/img/resources-main.en.png');
  const resourcesDetailsImg = useBaseUrl('/img/resources-details.en.png');
  const resourcesAttachedImg = useBaseUrl('/img/resources-attached.en.png');
  const resourcesUploadImg = useBaseUrl('/img/resources-upload.en.png');

  const images = [
    { src: resourcesMainImg, alt: 'Resources Gallery' },
    { src: resourcesDetailsImg, alt: 'Resource Details' },
    { src: resourcesAttachedImg, alt: 'Attached Resources' },
    { src: resourcesUploadImg, alt: 'Upload Resources' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <section className={styles.featureSection}>
      <div className={styles.featureContent}>
        <h2 className={styles.featureTitle}>
          <Translate id="homepage.features.resources.title">
            Unified Resource Management
          </Translate>
        </h2>
        <ul className={styles.featureList}>
          <li className={styles.featureItem}>
            <h3>
              <HardDrive size={16} strokeWidth={2} />
              <Translate id="homepage.features.resources.location.title">
                Your Data, Your Location
              </Translate>
            </h3>
            <p>
              <Translate id="homepage.features.resources.location.description">
                Decide where your assets live. Store resources on your local system or configure a remote S3 blob service.
              </Translate>
            </p>
          </li>
          <li className={styles.featureItem}>
            <h3>
              <PlusCircle size={16} strokeWidth={2} />
              <Translate id="homepage.features.resources.attachments.title">
                Universal Attachments
              </Translate>
            </h3>
            <p>
              <Translate id="homepage.features.resources.attachments.description">
                Easily attach resources to tasks, expenses, or notes. Upload via drag-and-drop, paste, or file selection.
              </Translate>
            </p>
          </li>
          <li className={styles.featureItem}>
            <h3>
              <LayoutGrid size={16} strokeWidth={2} />
              <Translate id="homepage.features.resources.ui.title">
                User-Friendly UI
              </Translate>
            </h3>
            <p>
              <Translate id="homepage.features.resources.ui.description">
                Don't worry about where to push images. The unified interface handles organization for you.
              </Translate>
            </p>
          </li>
        </ul>
      </div>
      <div className={styles.featureMedia}>
        <div className={styles.carousel}>
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className={styles.showcaseImage}
            onClick={() => setIsLightboxOpen(true)}
          />
          <div className={styles.carouselDots}>
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`${styles.carouselDot} ${index === currentIndex ? styles.carouselDotActive : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
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
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className={styles.lightboxImage}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
            aria-label="Previous image">
            ‹
          </button>
          <button
            type="button"
            className={`${styles.lightboxNav} ${styles.lightboxNext}`}
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            aria-label="Next image">
            ›
          </button>
        </div>
      )}
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footerSection}>
      <div className={styles.footerBrand}>
        <span className={styles.footerLogo}>UnderControl</span>
        <span className={styles.footerCopyright}>© 2025</span>
      </div>
      <div className={styles.footerLinks}>
        <Link to="/docs/download" className={styles.footerLink}>
          <Translate id="homepage.footer.download">Download</Translate>
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
      <main className={styles.mainContainer}>
        <HeroSection />
        <CardsSection />
        <TaskFeatureSection />
        <AiFeatureSection />
        <ResourceFeatureSection />
        <FooterSection />
      </main>
    </Layout>
  );
}
