import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { Lock, Download, Server, Eye } from 'lucide-react';

import styles from './index.module.css';

type FeatureItem = {
  title: string;
  icon: typeof Lock;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: '端到端加密',
    icon: Lock,
    description: (
      <>
        所有数据传输均使用 HTTPS/TLS 加密。敏感信息在数据库中使用行业标准的 AES-256 加密算法进行加密。
      </>
    ),
  },
  {
    title: '完整数据导出',
    icon: Download,
    description: (
      <>
        一键导出您的所有数据为 JSON、CSV 或 Markdown 格式。无限制，无供应商锁定。您的数据始终可访问。
      </>
    ),
  },
  {
    title: '支持自托管',
    icon: Server,
    description: (
      <>
        使用 Docker 在您自己的基础设施上部署。支持主流云服务商和本地网络部署。您决定数据的存储位置。
      </>
    ),
  },
  {
    title: '透明访问控制',
    icon: Eye,
    description: (
      <>
        基于 JWT 和 API Key 的权限管理。您始终知道谁在何时访问了哪些数据。包含完整的审计跟踪。
      </>
    ),
  },
];

const featureStyles = {
  features: {
    display: 'flex',
    alignItems: 'center',
    padding: '3rem 0',
    width: '100%',
    borderTop: '1px solid var(--ifm-color-emphasis-200)',
  },
  featureIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 0.75rem',
    color: 'var(--ifm-color-emphasis-700)',
  },
};

function Feature({title, icon: Icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--6 col--md-3')}>
      <div className="text--center">
        <div style={featureStyles.featureIcon}>
          <Icon size={32} strokeWidth={1.5} />
        </div>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

function HomepageFeatures(): ReactNode {
  return (
    <section style={featureStyles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          您的数据，您做主
        </Heading>
        <p className="hero__subtitle">
          随时随地记录任何内容，所有数据由您自己控制，AI 赋能
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="https://oatnil.top/ud/login">
            在线试用
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/docs/self-deployment"
            style={{marginLeft: '1rem'}}>
            自主部署
          </Link>
        </div>
        <p className="hero__subtitle" style={{fontSize: '0.9rem', marginTop: '1.5rem', opacity: 0.9}}>
          <strong>在线试用：</strong>立即开始使用我们的 SaaS 服务——数据安全地保存在我们的云端。
          <br />
          <strong>自主部署：</strong>完全掌控——您决定在哪里运行、在哪里保存数据，甚至可以完全离线。
        </p>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`欢迎使用 ${siteConfig.title}`}
      description="随时随地记录任何内容，所有数据由您自己控制，AI 赋能">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
