/**
 * Subscribe — placeholder page at /subscribe for the future managed-cloud
 * subscription. Owner decision (2026-07-25, task be070b8d): we do not run a
 * reliably-deployed hosted service yet, so this page only says the cloud plan
 * is coming and points people at self-hosting (and the local desktop app)
 * today. Replace the placeholder sections with real tiers when the managed
 * cloud ships — until then, never promise availability or pricing here.
 *
 * Pure TSX with both locales in this one file as {en, zh} strings picked by
 * the current docusaurus locale (same pattern as /download and /configuration
 * — no i18n mirror file).
 *
 * Owned by the Onboarding Experience Owner.
 */
import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {ChevronRight} from 'lucide-react';

import styles from './subscribe.module.css';

type L = {en: string; zh: string};

function useT() {
  const {i18n} = useDocusaurusContext();
  const zh = i18n.currentLocale === 'zh-Hans';
  return (l: L) => (zh ? l.zh : l.en);
}

function Hero() {
  const t = useT();
  return (
    <header className={styles.hero}>
      <span className={styles.comingBadge}>
        {t({en: 'Coming soon', zh: '即将推出'})}
      </span>
      <h1 className={styles.heroTitle}>
        {t({en: 'Managed cloud is ', zh: '云端托管服务，'})}
        <em>{t({en: 'on the way.', zh: '正在路上。'})}</em>
      </h1>
      <p className={styles.lede}>
        {t({
          en: 'We are building a hosted UnDercontrol you can subscribe to — no servers, no maintenance. It is not ready yet, and we would rather say "coming" than run a service we cannot make reliable. Until then, everything works today on infrastructure you control.',
          zh: '我们正在打造可以直接订阅的 UnDercontrol 托管云服务——无需服务器、无需运维。它还没准备好，与其上线一个我们无法保证可靠性的服务，不如坦诚地说"即将推出"。在那之前，所有功能今天就能跑在你自己掌控的环境里。',
        })}
      </p>
    </header>
  );
}

function SelfHostSection() {
  const t = useT();
  return (
    <section className={styles.section}>
      <p className={styles.eyebrow}>{t({en: 'Available today', zh: '现在就能用'})}</p>
      <h2 className={styles.h2}>
        {t({en: 'Run it yourself — recommended.', zh: '自己部署——我们的推荐方式。'})}
      </h2>
      <p className={styles.lede}>
        {t({
          en: 'Self-hosting is a first-class path, not a fallback: one all-in-one Docker image or a single npm-installed binary, with a free 3-month Pro trial license included on the self-hosting page. Prefer zero servers? The desktop app ships its own backend and runs fully local, free.',
          zh: '私有部署是一等公民，不是退而求其次：一个 all-in-one Docker 镜像，或一条 npm 命令安装的单二进制，私有部署页面还附带免费 3 个月 Pro 试用许可证。不想碰服务器？桌面应用自带后端，完全本地运行，免费。',
        })}
      </p>
      <div className={styles.btnrow}>
        <Link className={styles.btnPrimary} to="/self-hosting">
          {t({en: 'Self-hosting guide', zh: '私有部署指南'})}
        </Link>
        <Link className={styles.btnGhost} to="/download#desktop">
          {t({en: 'Download the desktop app', zh: '下载桌面应用'})}
        </Link>
        <Link className={styles.btnGhost} to="/docs/self-deployment">
          {t({en: 'Deployment docs', zh: '部署文档'})}
        </Link>
      </div>
    </section>
  );
}

function NotifySection() {
  const t = useT();
  return (
    <section className={styles.section}>
      <p className={styles.eyebrow}>{t({en: 'When it ships', zh: '上线时'})}</p>
      <h2 className={styles.h2}>
        {t({en: 'Want to hear about it first?', zh: '想第一时间知道？'})}
      </h2>
      <p className={styles.lede}>
        {t({
          en: 'Subscription tiers and pricing will appear on this page when the managed cloud launches. Reach out and we will let you know the moment it is ready.',
          zh: '订阅方案与定价会在云服务上线时出现在本页。欢迎联系我们，上线第一时间通知你。',
        })}
      </p>
      <div className={styles.btnrow}>
        <Link className={styles.btnGhost} to="/contact">
          {t({en: 'Contact us', zh: '联系我们'})}
          <ChevronRight size={14} strokeWidth={2} />
        </Link>
      </div>
    </section>
  );
}

export default function SubscribePage(): ReactNode {
  const t = useT();
  return (
    <Layout
      title={t({
        en: 'Subscribe — Managed Cloud Coming Soon',
        zh: '订阅——云端托管即将推出',
      })}
      description={t({
        en: 'The hosted UnDercontrol cloud subscription is coming soon. Until then, self-host with Docker or npm, or run the fully-local desktop app for free.',
        zh: 'UnDercontrol 云端托管订阅即将推出。在此之前，可通过 Docker 或 npm 私有部署，或免费使用完全本地的桌面应用。',
      })}>
      <main className={styles.page}>
        <Hero />
        <SelfHostSection />
        <NotifySection />
      </main>
    </Layout>
  );
}
