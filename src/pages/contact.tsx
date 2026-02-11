import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import {
  Mail,
  Github,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';

import styles from './contact.module.css';

interface ContactCardProps {
  icon: ReactNode;
  title: ReactNode;
  description: ReactNode;
  linkText: ReactNode;
  linkHref: string;
}

function ContactCard({icon, title, description, linkText, linkHref}: ContactCardProps) {
  return (
    <div className={styles.card}>
      <div>
        <div className={styles.cardIcon}>{icon}</div>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{description}</p>
      </div>
      <div className={styles.cardButton}>
        <Link href={linkHref} className={styles.cardButtonOutline}>
          {linkText}
          <ExternalLink size={14} strokeWidth={2} />
        </Link>
      </div>
    </div>
  );
}

export default function ContactPage(): ReactNode {
  return (
    <Layout
      title={translate({
        id: 'contact.meta.title',
        message: 'Contact Us',
        description: 'The contact page meta title',
      })}
      description={translate({
        id: 'contact.meta.description',
        message: 'Get in touch with the UnderControl team. Email, GitHub, Discord, or WeChat.',
        description: 'The contact page meta description',
      })}>
      <main className={styles.mainContainer}>
        {/* Hero */}
        <section className={styles.heroSection}>
          <h1 className={styles.heroTitle}>
            <Translate id="contact.hero.title">Contact Us</Translate>
          </h1>
          <p className={styles.heroSubtitle}>
            <Translate id="contact.hero.subtitle">
              We'd love to hear from you. Choose the best way to reach us.
            </Translate>
          </p>
        </section>

        {/* Contact Methods */}
        <section className={styles.cardsSection}>
          <div className={styles.cardsGrid}>
            <ContactCard
              icon={<Mail size={20} strokeWidth={2} />}
              title={<Translate id="contact.methods.email.title">Email</Translate>}
              description={
                <Translate id="contact.methods.email.description">
                  For general inquiries, feature requests, or business discussions. We typically respond within 24-48 hours.
                </Translate>
              }
              linkText={<Translate id="contact.methods.email.linkText">Send Email</Translate>}
              linkHref="mailto:lintao.amons@gmail.com"
            />
            <ContactCard
              icon={<Github size={20} strokeWidth={2} />}
              title={<Translate id="contact.methods.github.title">GitHub Issues</Translate>}
              description={
                <Translate id="contact.methods.github.description">
                  Found a bug or have a technical issue? Open an issue on GitHub for faster resolution.
                </Translate>
              }
              linkText={<Translate id="contact.methods.github.linkText">Open Issue</Translate>}
              linkHref="https://github.com/oatnil-top/ud-docs/issues"
            />
            <ContactCard
              icon={<MessageCircle size={20} strokeWidth={2} />}
              title={<Translate id="contact.methods.discord.title">Discord</Translate>}
              description={
                <Translate id="contact.methods.discord.description">
                  Join our Discord server for real-time chat, support, and community discussions.
                </Translate>
              }
              linkText={<Translate id="contact.methods.discord.linkText">Join Discord</Translate>}
              linkHref="https://discord.gg/vkw2nhxE"
            />
            <ContactCard
              icon={<MessageCircle size={20} strokeWidth={2} />}
              title={
                <Translate id="contact.methods.community.title">Community</Translate>
              }
              description={
                <Translate id="contact.methods.community.description">
                  Join discussions, share ideas, and connect with other users in our GitHub Discussions.
                </Translate>
              }
              linkText={
                <Translate id="contact.methods.community.linkText">Join Discussion</Translate>
              }
              linkHref="https://github.com/oatnil-top/ud-docs/discussions"
            />
          </div>
        </section>

        {/* Additional Info */}
        <section className={styles.infoSection}>
          <h2 className={styles.infoTitle}>
            <Translate id="contact.info.title">Additional Information</Translate>
          </h2>
          <div className={styles.infoContent}>
            <p>
              <Translate id="contact.info.responseTime">
                We aim to respond to all inquiries within 24-48 hours during business days.
              </Translate>
            </p>
            <p>
              <Translate id="contact.info.languages">
                We support English and Chinese for communication.
              </Translate>
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footerSection}>
          <div className={styles.footerBrand}>
            <span className={styles.footerLogo}>UnderControl</span>
            <span className={styles.footerCopyright}>© {new Date().getFullYear()}</span>
          </div>
          <div className={styles.footerLinks}>
            <Link to="/docs/download" className={styles.footerLink}>
              <Translate id="homepage.footer.download">Download</Translate>
            </Link>
            <Link to="/docs/intro" className={styles.footerLink}>
              <Translate id="homepage.footer.documentation">Documentation</Translate>
            </Link>
            <Link to="/docs/pricing" className={styles.footerLink}>
              <Translate id="homepage.footer.pricing">Pricing</Translate>
            </Link>
          </div>
        </footer>
      </main>
    </Layout>
  );
}
