/**
 * Subscribe — pricing page for self-hosted udctl licenses.
 *
 * The four tiers and amounts below were approved verbatim by the owner on
 * 2026-09-14 (card efc8e0a9; source thread 34730d9c, comment b2262f09):
 * personal free forever · teams of 3 or fewer free · up to 20 people
 * US$49/mo or US$490/yr · unlimited US$149/mo or US$1490/yr. Annual is
 * priced at ten monthly payments. USD only — tax and payment channel are
 * NOT decided yet, which is why every call to action here is "contact us"
 * and never a buy button. Do not add one until a real payment path exists.
 *
 * Deliberate omissions — each is a constraint, not an oversight:
 * - Nothing about what happens when a license expires (no "read-only",
 *   no "your data stays exportable"). The backend's actual behavior today
 *   is a hard stop: an expired license fails startup via log.Fatalf
 *   (go-backend cmd/server/main.go:129 ← internal/license/startup.go:79).
 *   Renewal-policy copy waits until the product can honor it (card ab50aba5).
 * - No per-tier feature lists. The owner priced team-size bands only;
 *   which features gate to which band is not decided.
 * - No middle tier between 20 and unlimited. The 49→149 step is a known,
 *   accepted cliff.
 * - No competitor names or amounts anywhere in the copy — a stale
 *   comparison number is the easiest thing on this page to attack. For
 *   internal calibration only: Jira's 100-user tier was US$9.05/user/month
 *   on atlassian.com as checked 2026-09-14.
 *
 * The band-not-headcount framing is load-bearing: a license covers a size
 * band at one flat price (license MaxUsers is enforced at user creation,
 * go-backend internal/domain/support/auth/user_service.go:720-734), and the
 * homepage's "no per-user-per-month line in the bill" claim rests on it.
 * Never re-lay this page out as a per-seat price list.
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
        {t({en: 'Self-hosted licenses', zh: '自部署许可证'})}
      </span>
      <h1 className={styles.heroTitle}>
        {t({en: 'One flat license ', zh: '一张许可证，'})}
        <em>{t({en: 'for your whole team.', zh: '覆盖整个团队。'})}</em>
      </h1>
      <p className={styles.lede}>
        {t({
          en: 'udctl self-hosted licenses are priced by team-size band, not by headcount. Pick the band your team fits in and that is the whole bill — hiring inside your band changes nothing, and no line on it reads "per user per month".',
          zh: 'udctl 自部署许可证按团队规模分档定价，不按人头计费。选中团队所在的档位，账单就是那一个数——档位内加人不加钱，账单里也没有任何一行写着「每人每月」。',
        })}
      </p>
    </header>
  );
}

type Tier = {
  name: L;
  size: L;
  price: L;
  annual: L | null;
  note: L;
};

const TIERS: Tier[] = [
  {
    name: {en: 'Personal', zh: '个人'},
    size: {en: 'One person', zh: '一个人用'},
    price: {en: 'Free', zh: '免费'},
    annual: null,
    note: {en: 'Forever. No license key needed.', zh: '永久免费，无需许可证。'},
  },
  {
    name: {en: 'Small team', zh: '小团队'},
    size: {en: 'Up to 3 people', zh: '3 人及以下'},
    price: {en: 'Free', zh: '免费'},
    annual: null,
    note: {en: 'One free license for the team.', zh: '整队一张免费许可证。'},
  },
  {
    name: {en: 'Team', zh: '团队'},
    size: {en: 'Up to 20 people', zh: '20 人及以下'},
    price: {en: 'US$49 / month', zh: 'US$49 / 月'},
    annual: {en: 'or US$490 / year', zh: '或 US$490 / 年'},
    note: {en: 'Flat, for the whole deployment.', zh: '整套部署一个价。'},
  },
  {
    name: {en: 'Unlimited', zh: '无限'},
    size: {en: 'Any team size', zh: '人数不设上限'},
    price: {en: 'US$149 / month', zh: 'US$149 / 月'},
    annual: {en: 'or US$1490 / year', zh: '或 US$1490 / 年'},
    note: {en: 'Flat, for the whole deployment.', zh: '整套部署一个价。'},
  },
];

function TiersSection() {
  const t = useT();
  return (
    <section className={styles.section}>
      <p className={styles.eyebrow}>{t({en: 'Pricing', zh: '定价'})}</p>
      <h2 className={styles.h2}>
        {t({en: 'Four bands. Prices in USD.', zh: '四个档位，价格以美元计。'})}
      </h2>
      <div className={styles.tierGrid}>
        {TIERS.map((tier) => (
          <div key={tier.name.en} className={styles.tier}>
            <p className={styles.tierName}>{t(tier.name)}</p>
            <p className={styles.tierSize}>{t(tier.size)}</p>
            <p className={styles.tierPrice}>{t(tier.price)}</p>
            {tier.annual ? (
              <p className={styles.tierAnnual}>{t(tier.annual)}</p>
            ) : (
              <p className={styles.tierAnnual}>&nbsp;</p>
            )}
            <p className={styles.tierNote}>{t(tier.note)}</p>
          </div>
        ))}
      </div>
      <p className={styles.finePrint}>
        {t({
          en: 'A year is billed as ten months — two months on us. Prices are in US dollars.',
          zh: '年付按十个月计——等于送两个月。价格以美元计。',
        })}
      </p>
      <div className={styles.btnrow}>
        <Link className={styles.btnPrimary} to="/contact">
          {t({en: 'Contact us for a license', zh: '联系我们获取许可证'})}
          <ChevronRight size={14} strokeWidth={2} />
        </Link>
      </div>
    </section>
  );
}

function BandSection() {
  const t = useT();
  return (
    <section className={styles.section}>
      <p className={styles.eyebrow}>{t({en: 'How licensing works', zh: '许可证如何计价'})}</p>
      <h2 className={styles.h2}>
        {t({
          en: 'A band, not a headcount.',
          zh: '按档位，不按人头。',
        })}
      </h2>
      <p className={styles.lede}>
        {t({
          en: 'Each license covers a size band at one flat price. Going from 4 people to 20 costs exactly nothing; only crossing into the next band changes the number. Your bill never grows because someone joined.',
          zh: '每张许可证覆盖一个规模档位，一个固定价格。团队从 4 个人涨到 20 个人，一分钱不多花；只有跨进下一个档位，数字才会变。账单不会因为多来了一个人而变长。',
        })}
      </p>
    </section>
  );
}

function SelfHostSection() {
  const t = useT();
  return (
    <section className={styles.section}>
      <p className={styles.eyebrow}>{t({en: 'Start today', zh: '现在就能开始'})}</p>
      <h2 className={styles.h2}>
        {t({en: 'Deploy first, decide later.', zh: '先部署，再决定。'})}
      </h2>
      <p className={styles.lede}>
        {t({
          en: 'Self-hosting is a first-class path: one all-in-one Docker image or a single npm-installed binary, with a free 3-month Pro trial license included on the self-hosting page. Prefer zero servers? The desktop app ships its own backend and runs fully local, free.',
          zh: '私有部署是一等公民：一个 all-in-one Docker 镜像，或一条 npm 命令安装的单二进制，私有部署页面还附带免费 3 个月 Pro 试用许可证。不想碰服务器？桌面应用自带后端，完全本地运行，免费。',
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

function CloudSection() {
  const t = useT();
  return (
    <section className={styles.section}>
      <p className={styles.eyebrow}>{t({en: 'Managed cloud', zh: '云端托管'})}</p>
      <h2 className={styles.h2}>
        {t({en: 'Hosted udctl is still on the way.', zh: '托管版 udctl 仍在路上。'})}
      </h2>
      <p className={styles.lede}>
        {t({
          en: 'The prices above are for licenses you run on your own infrastructure. A hosted udctl you can subscribe to — no servers, no maintenance — is in the works, and its plans will appear here when it ships. Reach out and we will let you know the moment it is ready.',
          zh: '上面的价格都是跑在你自己环境里的许可证。可以直接订阅的托管云服务——无需服务器、无需运维——正在打造中，上线时方案会出现在本页。欢迎联系我们，上线第一时间通知你。',
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
        en: 'Pricing — Self-Hosted Licenses',
        zh: '定价——自部署许可证',
      })}
      description={t({
        en: 'udctl self-hosted license pricing: free for individuals and teams of 3 or fewer, US$49/month up to 20 people, US$149/month unlimited. Flat per team-size band, never per seat.',
        zh: 'udctl 自部署许可证定价：个人与 3 人及以下团队免费，20 人及以下 US$49/月，无限人数 US$149/月。按团队规模档位一口价，不按席位。',
      })}>
      <main className={styles.page}>
        <Hero />
        <TiersSection />
        <BandSection />
        <SelfHostSection />
        <CloudSection />
      </main>
    </Layout>
  );
}
