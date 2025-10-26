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
          Open-source, self-hostable platform for managing your data with complete privacy and control.
          Built for individuals and teams who value data sovereignty.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get Started
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/docs/deployment"
            style={{marginLeft: '1rem'}}>
            Self-Deploy
          </Link>
        </div>
      </div>
    </header>
  );
}

function PrinciplesSection() {
  const principles = [
    'Your data belongs to you. We never access or sell your data without authorization.',
    'Delete, export, or migrate your data anytime without technical barriers.',
    'Local-first storage reduces dependency on cloud services.',
    'Independent development team with no complex commercial conflicts.',
  ];

  return (
    <section className={styles.principlesSection}>
      <div className="container">
        <Heading as="h2" className="margin-bottom--lg">
          Privacy Commitment
        </Heading>
        <div className="row">
          {principles.map((principle, idx) => (
            <div key={idx} className="col col--12">
              <div className={styles.principleCard}>
                <div className={styles.checkmark}>•</div>
                <p className={styles.principleText}>{principle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Open-source, self-hostable platform for managing your data with complete privacy and control">
      <HomepageHeader />
      <main>
        <PrinciplesSection />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
