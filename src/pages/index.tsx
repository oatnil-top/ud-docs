import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Your Data, Your Control
        </Heading>
        <p className="hero__subtitle">
          Record anything anytime with all data controlled by yourself, empowered by AI
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="https://oatnil.top/ud/login">
            Try Online
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/docs/self-deployment"
            style={{marginLeft: '1rem'}}>
            Self-Deploy
          </Link>
        </div>
        <p className="hero__subtitle" style={{fontSize: '0.9rem', marginTop: '1.5rem', opacity: 0.9}}>
          <strong>Try Online:</strong> Start immediately with our SaaS service—data securely saved in our cloud.
          <br />
          <strong>Self-Deploy:</strong> Full control—you decide where to run, where to save data, even fully offline.
        </p>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Record anything anytime with all data controlled by yourself, empowered by AI">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
