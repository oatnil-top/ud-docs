import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  emoji: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'End-to-End Encryption',
    emoji: '🔒',
    description: (
      <>
        All data transmission uses HTTPS/TLS encryption. Sensitive information
        is encrypted in the database using industry-standard AES-256 encryption.
      </>
    ),
  },
  {
    title: 'Complete Data Export',
    emoji: '📦',
    description: (
      <>
        Export all your data in JSON, CSV, or Markdown formats with one click.
        No restrictions, no vendor lock-in. Your data is always accessible.
      </>
    ),
  },
  {
    title: 'Self-Hosting Ready',
    emoji: '🏠',
    description: (
      <>
        Deploy on your own infrastructure with Docker. Support for major cloud
        providers and local network deployment. You control where your data lives.
      </>
    ),
  },
  {
    title: 'Transparent Access Control',
    emoji: '👁️',
    description: (
      <>
        JWT and API Key-based permission management. You always know who accessed
        what data and when. Full audit trail included.
      </>
    ),
  },
];

function Feature({title, emoji, description}: FeatureItem) {
  return (
    <div className={clsx('col col--6 col--md-3')}>
      <div className="text--center">
        <div className={styles.featureEmoji}>{emoji}</div>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
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
