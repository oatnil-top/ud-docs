import {useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import {
  Lock,
  Code,
  WifiOff,
  Server,
  Database,
  Boxes,
  Cloud,
  Ship,
  KeyRound,
  FileKey,
  Container,
  Copy,
  Check,
  ArrowRight,
} from 'lucide-react';

import styles from './index.module.css';
import s from './self-hosting.module.css';

const INSTALL_CMD =
  'curl -fsSL https://raw.githubusercontent.com/oatnil-top/ud-docs/main/scripts/install.sh | sh';

// --- Hero ---
function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <h1 className={styles.heroTitle}>
        <Translate id="selfhosting.hero.title">
          Self-host UnDercontrol. Your server, your data, your rules.
        </Translate>
      </h1>
      <p className={styles.heroSubtitle}>
        <Translate id="selfhosting.hero.subtitle">
          Run the entire stack on your own infrastructure — from a single Docker Compose command to a full Kubernetes cluster. No vendor lock-in, nothing leaves your network.
        </Translate>
      </p>
      <div className={styles.heroButtons}>
        <Link className={styles.heroButtonPrimary} to="/docs/self-deployment">
          <Translate id="selfhosting.hero.guide">Read the Deployment Guide</Translate>
        </Link>
        <Link className={styles.heroButtonSecondary} to="#options">
          <Translate id="selfhosting.hero.options">Browse Options</Translate>
        </Link>
      </div>
    </section>
  );
}

// --- Why self-host ---
const WHY = [
  {key: 'ownership', Icon: Lock},
  {key: 'nolockin', Icon: Code},
  {key: 'offline', Icon: WifiOff},
  {key: 'control', Icon: Server},
] as const;

const WHY_TEXT: Record<string, {title: ReactNode; desc: ReactNode}> = {
  ownership: {
    title: <Translate id="selfhosting.why.ownership.title">Full Data Ownership</Translate>,
    desc: (
      <Translate id="selfhosting.why.ownership.desc">
        Your tasks, notes, files, and finances live on hardware you control. Nothing is sent to a third party — not even for AI, which can run against your own provider.
      </Translate>
    ),
  },
  nolockin: {
    title: <Translate id="selfhosting.why.nolockin.title">No Vendor Lock-in</Translate>,
    desc: (
      <Translate id="selfhosting.why.nolockin.desc">
        Everything-as-code. Your data is declarable in Markdown and YAML, versionable with Git, and exportable at any time. No proprietary formats to escape from.
      </Translate>
    ),
  },
  offline: {
    title: <Translate id="selfhosting.why.offline.title">Offline & Air-gapped</Translate>,
    desc: (
      <Translate id="selfhosting.why.offline.desc">
        Deploy inside a private network or a fully air-gapped environment. UnDercontrol keeps working without any outbound internet access.
      </Translate>
    ),
  },
  control: {
    title: <Translate id="selfhosting.why.control.title">Your Infrastructure, Your Rules</Translate>,
    desc: (
      <Translate id="selfhosting.why.control.desc">
        Pick your database, storage, backups, and scaling. Run it on a Raspberry Pi, a home server, a VPS, or a Kubernetes cluster — the choice is yours.
      </Translate>
    ),
  },
};

function WhySection() {
  return (
    <section className={styles.pillarsGridSection}>
      <h2 className={styles.sectionLabel}>
        <Translate id="selfhosting.why.label">Why Self-Host</Translate>
      </h2>
      <div className={styles.pillarsGrid}>
        {WHY.map(({key, Icon}) => (
          <div key={key} className={styles.pillarCard}>
            <Icon size={18} strokeWidth={2} className={styles.pillarCardIcon} />
            <h3 className={styles.pillarCardTitle}>{WHY_TEXT[key].title}</h3>
            <p className={styles.pillarCardDesc}>{WHY_TEXT[key].desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- Quick start ---
function QuickStartSection() {
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    navigator.clipboard?.writeText(INSTALL_CMD).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <section className={s.quickstartSection}>
      <h2 className={styles.sectionLabel}>
        <Translate id="selfhosting.quickstart.label">Quick Start</Translate>
      </h2>
      <p className={styles.sectionSubtitle}>
        <Translate id="selfhosting.quickstart.subtitle">
          One command sets up Docker Compose with local storage and SQLite — running in minutes.
        </Translate>
      </p>
      <div className={s.codeBlock}>
        <code>{INSTALL_CMD}</code>
        <button type="button" className={s.copyButton} onClick={onCopy}>
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? (
            <Translate id="selfhosting.quickstart.copied">Copied</Translate>
          ) : (
            <Translate id="selfhosting.quickstart.copy">Copy</Translate>
          )}
        </button>
      </div>
      <p className={s.quickstartNote}>
        <Translate id="selfhosting.quickstart.note">
          Prefer to review the script first, or deploy on Windows? See the
        </Translate>{' '}
        <Link to="/docs/deployment/docker-compose-local">
          <Translate id="selfhosting.quickstart.noteLink">step-by-step guide</Translate>
        </Link>
        .
      </p>
    </section>
  );
}

// --- Deployment options ---
const OPTIONS = [
  {key: 'sqlite', Icon: Database, to: '/docs/deployment/docker-compose-local', tag: 'start'},
  {key: 'postgres', Icon: Boxes, to: '/docs/deployment/docker-compose-postgres', tag: 'prod'},
  {key: 's3', Icon: Cloud, to: '/docs/deployment/docker-compose-s3', tag: 'cloud'},
  {key: 'k8s', Icon: Ship, to: '/docs/deployment/kubernetes-helm', tag: 'scale'},
] as const;

const OPTION_TEXT: Record<string, {title: ReactNode; desc: ReactNode}> = {
  sqlite: {
    title: <Translate id="selfhosting.options.sqlite.title">Docker Compose + SQLite</Translate>,
    desc: (
      <Translate id="selfhosting.options.sqlite.desc">
        The simplest path. Local filesystem storage and a single-file SQLite database. Perfect for trying it out or small personal deployments.
      </Translate>
    ),
  },
  postgres: {
    title: <Translate id="selfhosting.options.postgres.title">Docker Compose + PostgreSQL</Translate>,
    desc: (
      <Translate id="selfhosting.options.postgres.desc">
        Better for production. PostgreSQL handles concurrent access and gives you stronger reliability and performance.
      </Translate>
    ),
  },
  s3: {
    title: <Translate id="selfhosting.options.s3.title">Docker Compose + S3 / R2</Translate>,
    desc: (
      <Translate id="selfhosting.options.s3.desc">
        Cloud-ready file storage. Offload attachments to AWS S3, Cloudflare R2, or MinIO while keeping the database close.
      </Translate>
    ),
  },
  k8s: {
    title: <Translate id="selfhosting.options.k8s.title">Kubernetes + Helm</Translate>,
    desc: (
      <Translate id="selfhosting.options.k8s.desc">
        Enterprise scale. A Helm chart for high availability, auto-scaling, and rolling updates on your own cluster.
      </Translate>
    ),
  },
};

function OptionsSection() {
  return (
    <section className={s.optionsSection} id="options">
      <h2 className={styles.sectionLabel}>
        <Translate id="selfhosting.options.label">Deployment Options</Translate>
      </h2>
      <p className={styles.sectionSubtitle}>
        <Translate id="selfhosting.options.subtitle">
          Pick the setup that fits your infrastructure. Every option links to a detailed, step-by-step guide.
        </Translate>
      </p>
      <div className={s.optionsGrid}>
        {OPTIONS.map(({key, Icon, to, tag}) => (
          <Link key={key} to={to} className={s.optionCard}>
            <div className={s.optionHeader}>
              <Icon size={18} strokeWidth={2} className={s.optionIcon} />
              <h3 className={s.optionTitle}>{OPTION_TEXT[key].title}</h3>
              <span className={s.optionTag}>{tag}</span>
            </div>
            <p className={s.optionDesc}>{OPTION_TEXT[key].desc}</p>
            <span className={s.optionLink}>
              <Translate id="selfhosting.options.readGuide">Read guide</Translate>
              <ArrowRight size={13} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

// --- Architecture ---
function ArchSection() {
  return (
    <section className={s.archSection}>
      <h2 className={styles.sectionLabel}>
        <Translate id="selfhosting.arch.label">Architecture</Translate>
      </h2>
      <img className={s.archImage} src="/img/Arch.png" alt="UnDercontrol self-hosting architecture" loading="lazy" />
      <p className={s.archCaption}>
        <Translate id="selfhosting.arch.caption">
          A Go backend and a static web frontend, backed by your choice of PostgreSQL or SQLite. Optional external services — an OpenAI-compatible AI provider, S3-compatible storage, and OpenTelemetry — are all pluggable and fully under your control.
        </Translate>
      </p>
    </section>
  );
}

// --- Requirements ---
const REQUIREMENTS = [
  {key: 'docker', Icon: Container, text: <Translate id="selfhosting.req.docker">Docker or a compatible container runtime</Translate>},
  {key: 'jwt', Icon: KeyRound, text: <Translate id="selfhosting.req.jwt">A secure JWT secret (auto-generated by the install script)</Translate>},
  {key: 'license', Icon: FileKey, text: <Translate id="selfhosting.req.license">A license file — free for personal use, contact us to obtain one</Translate>},
] as const;

function RequirementsSection() {
  return (
    <section className={s.requirementsSection}>
      <h2 className={styles.sectionLabel}>
        <Translate id="selfhosting.req.label">What You'll Need</Translate>
      </h2>
      <div className={styles.developersList}>
        {REQUIREMENTS.map(({key, Icon, text}) => (
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
        <Translate id="selfhosting.cta.subtitle">
          Ready to own your workspace? Follow the guide and deploy in minutes.
        </Translate>
      </p>
      <div className={styles.heroButtons}>
        <Link className={styles.heroButtonPrimary} to="/docs/self-deployment">
          <Translate id="selfhosting.cta.guide">Deployment Guide</Translate>
        </Link>
        <Link className={styles.heroButtonSecondary} to="/contact">
          <Translate id="selfhosting.cta.contact">Contact Us</Translate>
        </Link>
      </div>
    </section>
  );
}

export default function SelfHosting(): ReactNode {
  return (
    <Layout
      title={translate({
        id: 'selfhosting.title',
        message: 'Self-Host UnDercontrol — Your Server, Your Data, Your Rules',
        description: 'The self-hosting page meta title',
      })}
      description={translate({
        id: 'selfhosting.description',
        message: 'Self-host UnDercontrol on your own infrastructure — Docker Compose or Kubernetes, PostgreSQL or SQLite, local or S3 storage. Your data never leaves your network.',
        description: 'The self-hosting page meta description',
      })}>
      <main className={styles.mainContainer}>
        <HeroSection />
        <WhySection />
        <QuickStartSection />
        <OptionsSection />
        <ArchSection />
        <RequirementsSection />
        <CTASection />
      </main>
    </Layout>
  );
}
