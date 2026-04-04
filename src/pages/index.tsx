import {useState, useEffect, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import {
  Link2,
  FileText,
  Upload,
  Camera,
  Clock,
  HardDrive,
  PlusCircle,
  LayoutGrid,
  MessageSquare,
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
          Self-hosted Jira + Obsidian + Mint + S3 Browser — AI-powered, in one app
        </Translate>
      </h1>
      <p className={styles.heroSubtitle}>
        <Translate
          id="homepage.hero.subtitle"
          description="The homepage hero subtitle">
          A control plane for your tasks, knowledge, budget, and files. Launch AI agents like Claude Code directly from tasks, manage multiple sessions, and never lose track. Self-hosted, fully yours.
        </Translate>
      </p>
      <div className={styles.heroButtons}>
        <Link
          className={styles.heroButtonPrimary}
          to="https://ud.oatnil.top">
          <Translate id="homepage.hero.tryNow">Try Now</Translate>
        </Link>
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
              <div className={styles.mockupPlaceholderText}></div>
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
        message: 'UnderControl',
        description: 'The homepage meta title',
      })}
      description={translate({
        id: 'homepage.description',
        message: 'UnderControl combines project management, a markdown knowledge base, S3-compatible file browser, and budget tracking into a single self-hosted workspace. Configure your own AI provider, sync to local folders as plain Markdown, manage tasks from a k9s-style CLI, and deploy with Docker Compose in minutes. Free for personal use.',
        description: 'The homepage meta description',
      })}>
      <main className={styles.mainContainer}>
        <HeroSection />
        <TaskFeatureSection />
        <AiFeatureSection />
        <ResourceFeatureSection />
        <FooterSection />
      </main>
    </Layout>
  );
}
