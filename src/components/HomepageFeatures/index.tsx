import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import { Lock, Download, Server, Eye } from 'lucide-react';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';

function EncryptionFeature() {
  return (
    <div className={clsx('col col--6 col--md-3')}>
      <div className="text--center">
        <div className={styles.featureIcon}>
          <Lock size={32} strokeWidth={1.5} />
        </div>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">
          <Translate
            id="homepage.features.encryption.title"
            description="Feature title: End-to-End Encryption">
            End-to-End Encryption
          </Translate>
        </Heading>
        <p>
          <Translate
            id="homepage.features.encryption.description"
            description="Feature description: End-to-End Encryption">
            All data transmission uses HTTPS/TLS encryption. Sensitive information is encrypted in the database using industry-standard AES-256 encryption.
          </Translate>
        </p>
      </div>
    </div>
  );
}

function ExportFeature() {
  return (
    <div className={clsx('col col--6 col--md-3')}>
      <div className="text--center">
        <div className={styles.featureIcon}>
          <Download size={32} strokeWidth={1.5} />
        </div>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">
          <Translate
            id="homepage.features.export.title"
            description="Feature title: Complete Data Export">
            Complete Data Export
          </Translate>
        </Heading>
        <p>
          <Translate
            id="homepage.features.export.description"
            description="Feature description: Complete Data Export">
            Export all your data in JSON, CSV, or Markdown formats with one click. No restrictions, no vendor lock-in. Your data is always accessible.
          </Translate>
        </p>
      </div>
    </div>
  );
}

function SelfHostFeature() {
  return (
    <div className={clsx('col col--6 col--md-3')}>
      <div className="text--center">
        <div className={styles.featureIcon}>
          <Server size={32} strokeWidth={1.5} />
        </div>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">
          <Translate
            id="homepage.features.selfhost.title"
            description="Feature title: Self-Hosting Ready">
            Self-Hosting Ready
          </Translate>
        </Heading>
        <p>
          <Translate
            id="homepage.features.selfhost.description"
            description="Feature description: Self-Hosting Ready">
            Deploy on your own infrastructure with Docker. Support for major cloud providers and local network deployment. You control where your data lives.
          </Translate>
        </p>
      </div>
    </div>
  );
}

function AccessControlFeature() {
  return (
    <div className={clsx('col col--6 col--md-3')}>
      <div className="text--center">
        <div className={styles.featureIcon}>
          <Eye size={32} strokeWidth={1.5} />
        </div>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">
          <Translate
            id="homepage.features.access.title"
            description="Feature title: Transparent Access Control">
            Transparent Access Control
          </Translate>
        </Heading>
        <p>
          <Translate
            id="homepage.features.access.description"
            description="Feature description: Transparent Access Control">
            JWT and API Key-based permission management. You always know who accessed what data and when. Full audit trail included.
          </Translate>
        </p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <EncryptionFeature />
          <ExportFeature />
          <SelfHostFeature />
          <AccessControlFeature />
        </div>
      </div>
    </section>
  );
}
