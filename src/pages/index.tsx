import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import Translate, {translate} from '@docusaurus/Translate';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          <Translate
            id="homepage.hero.title"
            description="The homepage hero title">
            Your Data, Your Control
          </Translate>
        </Heading>
        <p className="hero__subtitle">
          <Translate
            id="homepage.hero.subtitle"
            description="The homepage hero subtitle">
            Built by indie developer + AI collaboration. Your data, your rules—self-host, work offline, stay secure. Personal tier free forever.
          </Translate>
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="https://oatnil.top/ud/login">
            <Translate
              id="homepage.hero.tryOnline"
              description="Try online button text">
              Try Online
            </Translate>
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/docs/self-deployment"
            style={{marginLeft: '1rem'}}>
            <Translate
              id="homepage.hero.selfDeploy"
              description="Self-deploy button text">
              Self-Deploy
            </Translate>
          </Link>
        </div>
        <p className="hero__subtitle" style={{fontSize: '0.9rem', marginTop: '1.5rem', opacity: 0.9}}>
          <strong>
            <Translate
              id="homepage.hero.tryOnlineLabel"
              description="Try online label">
              Try Online:
            </Translate>
          </strong>{' '}
          <Translate
            id="homepage.hero.tryOnlineDesc"
            description="Try online description">
            Quick start with a visitor account, no fussing. But we respect zero trust—even big companies leak data. For true security, deploy on your own trusted machine.
          </Translate>
          <br />
          <strong>
            <Translate
              id="homepage.hero.selfDeployLabel"
              description="Self-deploy label">
              Self-Deploy (Recommended):
            </Translate>
          </strong>{' '}
          <Translate
            id="homepage.hero.selfDeployDesc"
            description="Self-deploy description">
            Complete control. Deploy to your server/internal network. Work offline. Your data never leaves your infrastructure. Personal tier free forever—no limitations.
          </Translate>
        </p>
      </div>
    </header>
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
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
