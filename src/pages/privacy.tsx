import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import {
  Shield,
  Heart,
  Monitor,
  Database,
  Server,
  Mail,
} from 'lucide-react';

import styles from './privacy.module.css';

function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroIcon}>
        <Shield size={24} strokeWidth={2} />
      </div>
      <h1 className={styles.heroTitle}>
        <Translate id="privacy.title">Privacy Policy</Translate>
      </h1>
      <p className={styles.heroSubtitle}>
        <Translate id="privacy.subtitle">
          An honest take on data privacy from an indie developer
        </Translate>
      </p>
      <p className={styles.heroDate}>
        <Translate id="privacy.lastUpdated">Last updated: December 2025</Translate>
      </p>
    </section>
  );
}

interface PolicySectionProps {
  icon: ReactNode;
  titleId: string;
  titleDefault: string;
  paragraphs: ReactNode[];
}

function PolicySection({icon, titleId, titleDefault, paragraphs}: PolicySectionProps) {
  return (
    <div className={styles.policySection}>
      <div className={styles.policySectionInner}>
        <div className={styles.policySectionIcon}>{icon}</div>
        <div className={styles.policySectionBody}>
          <h2 className={styles.policySectionTitle}>
            <Translate id={titleId}>{titleDefault}</Translate>
          </h2>
          {paragraphs.map((paragraph, index) => (
            <p key={index} className={styles.policySectionText}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function PolicyContent() {
  return (
    <section className={styles.policyContent}>
      <PolicySection
        icon={<Heart size={20} strokeWidth={2} />}
        titleId="privacy.sections.honestTake.title"
        titleDefault="An Honest Take"
        paragraphs={[
          <Translate key="p1" id="privacy.sections.honestTake.p1">
            {"I'm an indie developer, not a big corporation. One of my main motivations for building UnderControl was that I wanted full control over my own sensitive data — tasks, finances, personal notes — instead of handing them to big tech companies. I built this for myself first, and now I'm sharing it with you."}
          </Translate>,
          <Translate key="p2" id="privacy.sections.honestTake.p2">
            {"I have zero interest, ability, resources, or motivation to do anything with your data. That said, I understand if you don't fully trust me — you shouldn't blindly trust anyone online. Big companies with entire security teams still get breached. So why would you trust a solo developer? You have every right to be skeptical."}
          </Translate>,
        ]}
      />

      <PolicySection
        icon={<Monitor size={20} strokeWidth={2} />}
        titleId="privacy.sections.yourChoices.title"
        titleDefault="Your Choices"
        paragraphs={[
          <span key="p1">
            <Translate id="privacy.sections.yourChoices.p1_before">
              {"That's why I give you options. You don't have to use our cloud service. You can use the Desktop App — "}
            </Translate>
            <strong className={styles.highlight}>
              <Translate id="privacy.sections.yourChoices.p1_highlight">
                your data stays 100% on your device, never touches any server. Or you can Self-Host — run your own instance, full control, your infrastructure.
              </Translate>
            </strong>
          </span>,
          <Translate key="p2" id="privacy.sections.yourChoices.p2">
            {"The cloud service exists for convenience, not because I want your data. If privacy is your priority, go local or self-host. No hard feelings."}
          </Translate>,
        ]}
      />

      <PolicySection
        icon={<Database size={20} strokeWidth={2} />}
        titleId="privacy.sections.whatWeCollect.title"
        titleDefault="What's Saved on the Server"
        paragraphs={[
          <Translate key="p1" id="privacy.sections.whatWeCollect.p1">
            {"If you use our cloud service: account info (email, username) and the data you create — tasks, expenses, budgets, etc. I promise I won't look into your data, but you don't need to trust me."}
          </Translate>,
          <strong key="p2" className={styles.highlight}>
            <Translate id="privacy.sections.whatWeCollect.p2_highlight">
              Choose desktop app or self-host to fully control your data
            </Translate>
          </strong>,
        ]}
      />

      <PolicySection
        icon={<Shield size={20} strokeWidth={2} />}
        titleId="privacy.sections.security.title"
        titleDefault="Security"
        paragraphs={[
          <Translate key="p1" id="privacy.sections.security.p1">
            {"I do my best: HTTPS everywhere, passwords are hashed, database is secured. But I'm not a security expert. If you're handling sensitive data, self-host or use the desktop app."}
          </Translate>,
          <Translate key="p2" id="privacy.sections.security.p2">
            For self-hosted users, security is in your hands. Keep your server updated and follow basic security practices.
          </Translate>,
        ]}
      />

      {/* Options */}
      <div className={styles.optionsGrid}>
        <Link to="/subscribe#desktop-section" className={styles.optionCard}>
          <Monitor size={20} strokeWidth={2} className={styles.optionCardIcon} />
          <div>
            <div className={styles.optionCardTitle}>
              <Translate id="privacy.options.desktop.title">Desktop App</Translate>
            </div>
            <div className={styles.optionCardDescription}>
              <Translate id="privacy.options.desktop.description">
                100% local, your device only
              </Translate>
            </div>
          </div>
        </Link>
        <Link to="/subscribe#selfhosted-section" className={styles.optionCard}>
          <Server size={20} strokeWidth={2} className={styles.optionCardIcon} />
          <div>
            <div className={styles.optionCardTitle}>
              <Translate id="privacy.options.selfhost.title">Self-Host</Translate>
            </div>
            <div className={styles.optionCardDescription}>
              <Translate id="privacy.options.selfhost.description">
                Your server, full control
              </Translate>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className={styles.contactSection}>
      <div className={styles.contactHeader}>
        <Mail size={20} strokeWidth={2} />
        <h2 className={styles.contactTitle}>
          <Translate id="privacy.contact.title">Questions?</Translate>
        </h2>
      </div>
      <p className={styles.contactDescription}>
        <Translate id="privacy.contact.description">
          {"If you have questions or concerns, just reach out. I'm a real person, not a support ticket system."}
        </Translate>
      </p>
      <Link to="/contact" className={styles.contactButton}>
        <Translate id="privacy.contact.button">Contact Me</Translate>
      </Link>
    </section>
  );
}

function FooterSection() {
  return (
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
  );
}

export default function PrivacyPage(): ReactNode {
  return (
    <Layout
      title={translate({
        id: 'privacy.meta.title',
        message: 'Privacy Policy',
        description: 'The privacy page meta title',
      })}
      description={translate({
        id: 'privacy.meta.description',
        message: 'An honest take on data privacy from an indie developer. Your data, your choice.',
        description: 'The privacy page meta description',
      })}>
      <main className={styles.mainContainer}>
        <HeroSection />
        <PolicyContent />
        <ContactSection />
        <FooterSection />
      </main>
    </Layout>
  );
}
