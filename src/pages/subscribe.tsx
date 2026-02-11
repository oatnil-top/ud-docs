import {useState, useRef, useEffect, type ReactNode} from 'react';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import {
  ExternalLink,
  Check,
  Cloud,
  Server,
  Download,
  ChevronDown,
  Monitor,
  Heart,
  Coffee,
  Smartphone,
  Terminal,
  ChevronRight,
} from 'lucide-react';

import versionConfig from '../../version.json';
const VERSION = versionConfig.version;

import styles from './subscribe.module.css';

type Platform = 'macOS (Apple Silicon)' | 'macOS (Intel)' | 'Windows' | 'Linux';
type CLIPlatform = 'macOS (Apple Silicon)' | 'macOS (Intel)' | 'Linux (x64)' | 'Linux (ARM64)' | 'Windows';

const R2_BASE_URL = 'https://pub-35d77f83ee8a41798bb4b2e1831ac70a.r2.dev/releases';
const CLI_R2_BASE_URL = 'https://pub-35d77f83ee8a41798bb4b2e1831ac70a.r2.dev/cli/releases';
const PLATFORMS: Platform[] = ['macOS (Apple Silicon)', 'macOS (Intel)', 'Windows', 'Linux'];
const CLI_PLATFORMS: CLIPlatform[] = ['macOS (Apple Silicon)', 'macOS (Intel)', 'Linux (x64)', 'Linux (ARM64)', 'Windows'];

function getDownloadUrl(platform: Platform, version: string): string {
  const fileNames: Record<Platform, string> = {
    'macOS (Apple Silicon)': `undercontrol-desktop-${version}-arm64.dmg`,
    'macOS (Intel)': `undercontrol-desktop-${version}-x64.dmg`,
    Windows: `undercontrol-desktop-${version}-setup.exe`,
    Linux: `undercontrol-desktop-${version}.AppImage`,
  };
  return `${R2_BASE_URL}/${version}/${fileNames[platform]}`;
}

function getCLIDownloadUrl(platform: CLIPlatform, version: string): string {
  const fileNames: Record<CLIPlatform, string> = {
    'macOS (Apple Silicon)': `ud_${version}_darwin_arm64.tar.gz`,
    'macOS (Intel)': `ud_${version}_darwin_amd64.tar.gz`,
    'Linux (x64)': `ud_${version}_linux_amd64.tar.gz`,
    'Linux (ARM64)': `ud_${version}_linux_arm64.tar.gz`,
    Windows: `ud_${version}_windows_amd64.zip`,
  };
  return `${CLI_R2_BASE_URL}/${version}/${fileNames[platform]}`;
}

function getCLIInstallCommand(platform: CLIPlatform, version: string): string {
  const fileNames: Record<CLIPlatform, string> = {
    'macOS (Apple Silicon)': `ud_${version}_darwin_arm64.tar.gz`,
    'macOS (Intel)': `ud_${version}_darwin_amd64.tar.gz`,
    'Linux (x64)': `ud_${version}_linux_amd64.tar.gz`,
    'Linux (ARM64)': `ud_${version}_linux_arm64.tar.gz`,
    Windows: `ud_${version}_windows_amd64.zip`,
  };
  if (platform === 'Windows') {
    return `curl -LO ${CLI_R2_BASE_URL}/${version}/${fileNames[platform]}`;
  }
  return `curl -sL ${CLI_R2_BASE_URL}/${version}/${fileNames[platform]} | tar xz && sudo mv ud /usr/local/bin/ && ud --version`;
}

function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <Link to="/docs/release-notes" className={styles.versionBadge}>
        <span>v{VERSION}</span>
        <span style={{height: 12, width: 1, background: 'var(--ifm-color-emphasis-300)'}} />
        <span style={{display: 'flex', alignItems: 'center', gap: 4}}>
          <Translate id="subscribe.whatsNew">{"What's new"}</Translate>
          <ChevronRight size={12} strokeWidth={2} />
        </span>
      </Link>
      <h1 className={styles.heroTitle}>
        <Translate id="subscribe.titleLine1">Your Tasks, Wiki, and Wealth.</Translate>
        <br />
        <Translate id="subscribe.titleLine2">All UnderControl.</Translate>
      </h1>
      <p className={styles.heroSlogan}>
        <Translate id="subscribe.slogan">
          The power of Jira, the flexibility of Obsidian, and the tracking of Expensify—unified for personal and team use.
        </Translate>
      </p>
      <span className={styles.heroPrivacyNote}>
        <Translate id="subscribe.privacyNote">
          Free forever for personal use. Use offline desktop or self-host—your data stays yours, shared with no one.
        </Translate>
      </span>
    </section>
  );
}

function QuickStartSection() {
  return (
    <section className={styles.quickStartSection}>
      <div className={styles.quickStartGrid}>
        {/* Web */}
        <div className={styles.quickStartCard}>
          <div>
            <div className={styles.quickStartCardHeader}>
              <span className={styles.quickStartCardLabel}>
                <Translate id="subscribe.cards.web.label">WEB</Translate>
              </span>
              <div className={styles.quickStartCardIcon}>
                <ExternalLink size={16} strokeWidth={2} />
              </div>
            </div>
            <h3 className={styles.quickStartCardTitle}>
              <Translate id="subscribe.cards.web.title">Try Online</Translate>
            </h3>
            <p className={styles.quickStartCardDescription}>
              <Translate id="subscribe.cards.web.description">
                Try as visitor or register to sync across devices. No setup required.
              </Translate>
            </p>
          </div>
          <div className={styles.quickStartCardButton}>
            <Link className={styles.buttonOutline} to="https://oatnil.top/ud/login">
              <Translate id="subscribe.cards.web.button">Launch Web App</Translate>
            </Link>
          </div>
        </div>

        {/* Desktop */}
        <div className={styles.quickStartCard}>
          <div>
            <div className={styles.quickStartCardHeader}>
              <span className={styles.quickStartCardLabel}>
                <Translate id="subscribe.cards.desktop.label">DESKTOP</Translate>
              </span>
              <div className={styles.quickStartCardIconFilled}>
                <Download size={16} strokeWidth={2} />
              </div>
            </div>
            <h3 className={styles.quickStartCardTitle}>
              <Translate id="subscribe.cards.desktop.title">Download App</Translate>
            </h3>
            <p className={styles.quickStartCardDescription}>
              <Translate id="subscribe.cards.desktop.description">
                Local-first, data stays on your computer. Optionally sync with remote server.
              </Translate>
            </p>
          </div>
          <div className={styles.quickStartCardButton}>
            <a className={styles.buttonOutline} href="#desktop-section">
              <Translate id="subscribe.cards.desktop.button">Download</Translate>
            </a>
          </div>
        </div>

        {/* Server */}
        <div className={styles.quickStartCard}>
          <div>
            <div className={styles.quickStartCardHeader}>
              <span className={styles.quickStartCardLabel}>
                <Translate id="subscribe.cards.selfhost.label">SERVER</Translate>
              </span>
              <div className={styles.quickStartCardIcon}>
                <Server size={16} strokeWidth={2} />
              </div>
            </div>
            <h3 className={styles.quickStartCardTitle}>
              <Translate id="subscribe.cards.selfhost.title">Self-Deploy</Translate>
            </h3>
            <p className={styles.quickStartCardDescription}>
              <Translate id="subscribe.cards.selfhost.description">
                Deploy via Docker. Your data never leaves your infrastructure.
              </Translate>
            </p>
          </div>
          <div className={styles.quickStartCardButton}>
            <a className={styles.buttonOutline} href="#selfhosted-section">
              <Translate id="subscribe.cards.selfhost.button">View Docs</Translate>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

interface TierCardProps {
  tierKey: string;
  title: ReactNode;
  badge: ReactNode;
  description: ReactNode;
  price: ReactNode;
  priceUnit?: ReactNode;
  originalPrice?: ReactNode;
  features: ReactNode[];
  cta: ReactNode;
  ctaLink?: string;
  ctaExternal?: boolean;
  comingSoon?: boolean;
}

function TierCard({title, badge, description, price, priceUnit, originalPrice, features, cta, ctaLink, ctaExternal, comingSoon}: TierCardProps) {
  return (
    <div className={styles.tierCard}>
      <div className={styles.tierCardHeader}>
        <h3 className={styles.tierCardTitle}>{title}</h3>
        <span className={styles.tierCardBadge}>{badge}</span>
      </div>
      <p className={styles.tierCardDescription}>{description}</p>
      {originalPrice && <p className={styles.tierCardOriginalPrice}>{originalPrice}</p>}
      <p className={styles.tierCardPrice}>
        {price}
        {priceUnit && <span className={styles.tierCardPriceUnit}>{priceUnit}</span>}
      </p>
      <ul className={styles.tierCardFeatures}>
        {features.map((feature, index) => (
          <li key={index} className={styles.tierCardFeature}>
            <Check size={16} strokeWidth={2} className={styles.checkIcon} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      {comingSoon ? (
        <span className={styles.buttonDisabled}>
          <Translate id="subscribe.comingSoon">Coming Soon</Translate>
        </span>
      ) : ctaExternal ? (
        <a href={ctaLink} target="_blank" rel="noopener noreferrer" className={styles.buttonPrimary}>
          {cta}
          <ExternalLink size={14} strokeWidth={2} />
        </a>
      ) : (
        <Link to={ctaLink || '/'} className={styles.buttonOutline}>
          {cta}
        </Link>
      )}
    </div>
  );
}

function SaasSection() {
  return (
    <section id="saas-section">
      <div className={styles.sectionHeader}>
        <div className={styles.sectionHeaderRow}>
          <Cloud size={20} strokeWidth={2} style={{color: '#2563eb'}} />
          <h2 className={styles.sectionHeaderTitle}>
            <Translate id="subscribe.saasSection.title">SAAS (Managed Cloud)</Translate>
          </h2>
        </div>
        <p className={styles.sectionHeaderDescription}>
          <Translate id="subscribe.saasSection.description">
            We host and manage everything for you. Just sign up and start using.
          </Translate>
        </p>
        <p className={styles.sectionHeaderNote}>
          <Translate id="subscribe.saasSection.inviteCodeRequired">
            Invitation code required for registration
          </Translate>
        </p>
      </div>
      <div className={styles.tierGrid4}>
        <TierCard
          tierKey="saasBasic"
          title={<Translate id="subscribe.saasBasic.title">Basic</Translate>}
          badge={<Translate id="subscribe.saasBasic.badge">SAAS</Translate>}
          description={<Translate id="subscribe.saasBasic.description">Get started with essential features</Translate>}
          price={<Translate id="subscribe.saasBasic.price">Free</Translate>}
          features={[
            <Translate key="f1" id="subscribe.saasBasic.features.feature1">1 user account</Translate>,
            <Translate key="f2" id="subscribe.saasBasic.features.feature2">Core features</Translate>,
            <Translate key="f3" id="subscribe.saasBasic.features.feature3">Cloud hosted</Translate>,
            <Translate key="f4" id="subscribe.saasBasic.features.feature4">Basic storage</Translate>,
            <Translate key="f5" id="subscribe.saasBasic.features.feature5">Community support</Translate>,
          ]}
          cta={<Translate id="subscribe.saasBasic.cta">Get Invite Code</Translate>}
          ctaLink="https://oatnil.top/ud/login"
          ctaExternal
        />
        <TierCard
          tierKey="saasMonthly"
          title={<Translate id="subscribe.saasMonthly.title">Monthly</Translate>}
          badge={<Translate id="subscribe.saasMonthly.badge">SAAS</Translate>}
          description={<Translate id="subscribe.saasMonthly.description">Pay month by month, cancel anytime</Translate>}
          price={<Translate id="subscribe.saasMonthly.price">$9.99</Translate>}
          priceUnit={<Translate id="subscribe.saasMonthly.priceUnit">/month</Translate>}
          features={[
            <Translate key="f1" id="subscribe.saasMonthly.features.feature1">1 user account</Translate>,
            <Translate key="f2" id="subscribe.saasMonthly.features.feature2">All core features</Translate>,
            <Translate key="f3" id="subscribe.saasMonthly.features.feature3">Cloud hosted</Translate>,
            <Translate key="f4" id="subscribe.saasMonthly.features.feature4">Automatic backups</Translate>,
            <Translate key="f5" id="subscribe.saasMonthly.features.feature5">Email support</Translate>,
          ]}
          cta={<Translate id="subscribe.saasMonthly.cta">Get Invite Code</Translate>}
          comingSoon
        />
        <TierCard
          tierKey="saasQuarterly"
          title={<Translate id="subscribe.saasQuarterly.title">Quarterly</Translate>}
          badge={<Translate id="subscribe.saasQuarterly.badge">SAAS</Translate>}
          description={<Translate id="subscribe.saasQuarterly.description">Save 15% with quarterly billing</Translate>}
          price={<Translate id="subscribe.saasQuarterly.price">$25.47</Translate>}
          priceUnit={<Translate id="subscribe.saasQuarterly.priceUnit">/3 months</Translate>}
          originalPrice={<Translate id="subscribe.saasQuarterly.originalPrice">$29.97</Translate>}
          features={[
            <Translate key="f1" id="subscribe.saasQuarterly.features.feature1">1 user account</Translate>,
            <Translate key="f2" id="subscribe.saasQuarterly.features.feature2">All core features</Translate>,
            <Translate key="f3" id="subscribe.saasQuarterly.features.feature3">Cloud hosted</Translate>,
            <Translate key="f4" id="subscribe.saasQuarterly.features.feature4">Automatic backups</Translate>,
            <Translate key="f5" id="subscribe.saasQuarterly.features.feature5">Priority support</Translate>,
          ]}
          cta={<Translate id="subscribe.saasQuarterly.cta">Get Invite Code</Translate>}
          comingSoon
        />
        <TierCard
          tierKey="saasYearly"
          title={<Translate id="subscribe.saasYearly.title">Yearly</Translate>}
          badge={<Translate id="subscribe.saasYearly.badge">SAAS</Translate>}
          description={<Translate id="subscribe.saasYearly.description">Save 30% with annual billing</Translate>}
          price={<Translate id="subscribe.saasYearly.price">$83.88</Translate>}
          priceUnit={<Translate id="subscribe.saasYearly.priceUnit">/year</Translate>}
          originalPrice={<Translate id="subscribe.saasYearly.originalPrice">$119.88</Translate>}
          features={[
            <Translate key="f1" id="subscribe.saasYearly.features.feature1">1 user account</Translate>,
            <Translate key="f2" id="subscribe.saasYearly.features.feature2">All core features</Translate>,
            <Translate key="f3" id="subscribe.saasYearly.features.feature3">Cloud hosted</Translate>,
            <Translate key="f4" id="subscribe.saasYearly.features.feature4">Automatic backups</Translate>,
            <Translate key="f5" id="subscribe.saasYearly.features.feature5">Priority support</Translate>,
          ]}
          cta={<Translate id="subscribe.saasYearly.cta">Get Invite Code</Translate>}
          comingSoon
        />
      </div>
    </section>
  );
}

function DesktopAppSection() {
  const [showPlatformDropdown, setShowPlatformDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowPlatformDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePlatformSelect = (platform: Platform) => {
    window.location.href = getDownloadUrl(platform, VERSION);
    setShowPlatformDropdown(false);
  };

  return (
    <section id="desktop-section">
      <div className={styles.sectionHeader}>
        <div className={styles.sectionHeaderRow}>
          <Monitor size={20} strokeWidth={2} style={{color: '#9333ea'}} />
          <h2 className={styles.sectionHeaderTitle}>
            <Translate id="subscribe.desktopSection.title">Desktop Application</Translate>
          </h2>
          <span className={`${styles.sectionHeaderBadge} ${styles.badgeGreen}`}>
            <Translate id="subscribe.desktopSection.freeLabel">Free to use</Translate>
          </span>
        </div>
        <p className={styles.sectionHeaderDescription}>
          <Translate id="subscribe.desktopSection.description">
            Download the desktop app for the best local-first experience with optional cloud sync.
          </Translate>
        </p>
        <p className={styles.sectionHeaderHint}>
          <Translate id="subscribe.desktopSection.hint">
            No registration required, use locally right away
          </Translate>
        </p>
      </div>
      <div className={styles.sectionContent}>
        <div className={styles.sectionContentFlex}>
          <div className={styles.sectionContentLeft}>
            <h3 className={styles.featureTitle}>
              <Translate id="subscribe.desktopSection.featuresTitle">Why Desktop?</Translate>
            </h3>
            <ul className={styles.featureList}>
              <li className={styles.featureItem}>
                <Check size={16} strokeWidth={2} className={styles.checkIcon} />
                <span><Translate id="subscribe.desktopSection.features.feature1">Local-first: Data stays on your computer</Translate></span>
              </li>
              <li className={styles.featureItem}>
                <Check size={16} strokeWidth={2} className={styles.checkIcon} />
                <span><Translate id="subscribe.desktopSection.features.feature2">Totally offline, use securely on your device</Translate></span>
              </li>
              <li className={styles.featureItem}>
                <Check size={16} strokeWidth={2} className={styles.checkIcon} />
                <span><Translate id="subscribe.desktopSection.features.feature3">Native performance and integration</Translate></span>
              </li>
              <li className={styles.featureItem}>
                <Check size={16} strokeWidth={2} className={styles.checkIcon} />
                <span><Translate id="subscribe.desktopSection.features.feature4">Optional remote server sync</Translate></span>
              </li>
            </ul>
          </div>
          <div className={styles.sectionContentRight}>
            <p className={styles.selectLabel}>
              <Translate id="subscribe.desktopSection.selectPlatform">Select your platform</Translate>
            </p>
            <div className={styles.downloadDropdown} ref={dropdownRef}>
              <button
                type="button"
                className={styles.downloadButton}
                onClick={() => setShowPlatformDropdown(!showPlatformDropdown)}>
                <Translate id="subscribe.cards.desktop.button">Download</Translate>
                <ChevronDown size={16} strokeWidth={2} />
              </button>
              {showPlatformDropdown && (
                <div className={styles.platformDropdown}>
                  {PLATFORMS.map((platform) => (
                    <button
                      key={platform}
                      type="button"
                      className={styles.platformOption}
                      onClick={() => handlePlatformSelect(platform)}>
                      {platform}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <p className={styles.versionLabel}>v{VERSION}</p>
          </div>
        </div>
        <p className={styles.noteAmber}>
          <Translate id="subscribe.desktopSection.chinaNote">
            {"China download may be unavailable due to limited hosting budget. Please contact me if needed. Thanks to Cloudflare R2 for providing free global downloads!"}
          </Translate>
        </p>
        <div className={styles.noteMuted}>
          <p>
            <Translate id="subscribe.desktopSection.macosNote">
              {"macOS users: The app isn't code-signed (Apple Developer Program costs $99/year, and we're an indie project). After downloading, run this command in Terminal:"}
            </Translate>
          </p>
          <code className={styles.codeBlock}>
            sudo xattr -r -d com.apple.quarantine /Applications/UnderControl.app
          </code>
        </div>
      </div>
    </section>
  );
}

function AppleShortcutsSection() {
  const shortcutUrl = 'https://www.icloud.com/shortcuts/4e0becebe3cd48a180940ccbd04d6fa7';

  return (
    <section id="shortcuts-section">
      <div className={styles.sectionHeader}>
        <div className={styles.sectionHeaderRow}>
          <Smartphone size={20} strokeWidth={2} style={{color: '#3b82f6'}} />
          <h2 className={styles.sectionHeaderTitle}>
            <Translate id="subscribe.shortcutsSection.title">Apple Shortcuts</Translate>
          </h2>
          <span className={`${styles.sectionHeaderBadge} ${styles.badgeBlue}`}>iOS / macOS</span>
        </div>
        <p className={styles.sectionHeaderDescription}>
          <Translate id="subscribe.shortcutsSection.description">
            Quick actions from your iPhone, iPad, or Mac with one tap.
          </Translate>
        </p>
      </div>
      <div className={styles.sectionContent}>
        <div className={styles.sectionContentFlex}>
          <div className={styles.sectionContentLeft}>
            <h3 className={styles.featureTitle}>
              <Translate id="subscribe.shortcutsSection.featuresTitle">What You Can Do</Translate>
            </h3>
            <ul className={styles.featureList}>
              <li className={styles.featureItem}>
                <Check size={16} strokeWidth={2} className={styles.checkIcon} />
                <span><Translate id="subscribe.shortcutsSection.features.feature1">One-tap to create tasks or log expenses</Translate></span>
              </li>
              <li className={styles.featureItem}>
                <Check size={16} strokeWidth={2} className={styles.checkIcon} />
                <span><Translate id="subscribe.shortcutsSection.features.feature2">Add to Home Screen or widgets for quick access</Translate></span>
              </li>
              <li className={styles.featureItem}>
                <Check size={16} strokeWidth={2} className={styles.checkIcon} />
                <span><Translate id="subscribe.shortcutsSection.features.feature3">{"Trigger via Siri: \"Hey Siri, run [shortcut name]\""}</Translate></span>
              </li>
            </ul>
          </div>
          <div className={styles.sectionContentRight}>
            <p className={styles.selectLabel}>
              <Translate id="subscribe.shortcutsSection.getShortcut">Add to your Shortcuts app</Translate>
            </p>
            <a
              href={shortcutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.buttonPrimary}
              style={{width: 200}}>
              <Translate id="subscribe.shortcutsSection.addShortcut">Get Shortcut</Translate>
              <ExternalLink size={14} strokeWidth={2} />
            </a>
            <p className={styles.versionLabel}>
              <Translate id="subscribe.shortcutsSection.requirement">Requires iOS 15+ or macOS 12+</Translate>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CLISection() {
  const [showPlatformDropdown, setShowPlatformDropdown] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<CLIPlatform>('macOS (Apple Silicon)');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowPlatformDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePlatformSelect = (platform: CLIPlatform) => {
    setSelectedPlatform(platform);
    window.location.href = getCLIDownloadUrl(platform, VERSION);
    setShowPlatformDropdown(false);
  };

  const installCommand = getCLIInstallCommand(selectedPlatform, VERSION);

  return (
    <section id="cli-section">
      <div className={styles.sectionHeader}>
        <div className={styles.sectionHeaderRow}>
          <Terminal size={20} strokeWidth={2} style={{color: '#ea580c'}} />
          <h2 className={styles.sectionHeaderTitle}>
            <Translate id="subscribe.cliSection.title">Command Line Interface</Translate>
          </h2>
          <span className={`${styles.sectionHeaderBadge} ${styles.badgeGreen}`}>
            <Translate id="subscribe.cliSection.freeLabel">Free</Translate>
          </span>
        </div>
        <p className={styles.sectionHeaderDescription}>
          <Translate id="subscribe.cliSection.description">
            Access your tasks from the terminal. Perfect for SSH sessions, headless servers, or AI coding agents.
          </Translate>
        </p>
      </div>
      <div className={styles.sectionContent}>
        <div className={styles.sectionContentFlex}>
          <div className={styles.sectionContentLeft}>
            <h3 className={styles.featureTitle}>
              <Translate id="subscribe.cliSection.featuresTitle">Use Cases</Translate>
            </h3>
            <ul className={styles.featureList}>
              <li className={styles.featureItem}>
                <Check size={16} strokeWidth={2} className={styles.checkIcon} />
                <span><Translate id="subscribe.cliSection.features.feature1">SSH access: Manage tasks on remote servers without a GUI</Translate></span>
              </li>
              <li className={styles.featureItem}>
                <Check size={16} strokeWidth={2} className={styles.checkIcon} />
                <span><Translate id="subscribe.cliSection.features.feature2">AI agent integration: Let Claude Code or Codex access your notes</Translate></span>
              </li>
              <li className={styles.featureItem}>
                <Check size={16} strokeWidth={2} className={styles.checkIcon} />
                <span><Translate id="subscribe.cliSection.features.feature3">TUI mode: Interactive terminal interface with vim keybindings</Translate></span>
              </li>
              <li className={styles.featureItem}>
                <Check size={16} strokeWidth={2} className={styles.checkIcon} />
                <span><Translate id="subscribe.cliSection.features.feature4">One-shot commands: Quick task creation from scripts</Translate></span>
              </li>
            </ul>
          </div>
          <div className={styles.sectionContentRight}>
            <p className={styles.selectLabel}>
              <Translate id="subscribe.cliSection.selectPlatform">Select your platform</Translate>
            </p>
            <div className={styles.downloadDropdown} ref={dropdownRef}>
              <button
                type="button"
                className={styles.downloadButton}
                onClick={() => setShowPlatformDropdown(!showPlatformDropdown)}>
                <Translate id="subscribe.cliSection.downloadCLI">Download CLI</Translate>
                <ChevronDown size={16} strokeWidth={2} />
              </button>
              {showPlatformDropdown && (
                <div className={styles.platformDropdown}>
                  {CLI_PLATFORMS.map((platform) => (
                    <button
                      key={platform}
                      type="button"
                      className={styles.platformOption}
                      onClick={() => handlePlatformSelect(platform)}>
                      {platform}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Link to="/docs/cli" className={styles.buttonOutline} style={{width: 200}}>
              <Translate id="subscribe.cliSection.viewDocs">View Documentation</Translate>
              <ChevronRight size={14} strokeWidth={2} />
            </Link>
            <p className={styles.versionLabel}>v{VERSION}</p>
          </div>
        </div>

        {/* Homebrew Install */}
        <div className={styles.installSection}>
          <div className={styles.installHeader}>
            <p className={styles.installTitle}>
              <Translate id="subscribe.cliSection.homebrewInstall">Install via Homebrew (macOS)</Translate>
            </p>
            <span className={styles.installNote}>
              <Translate id="subscribe.cliSection.homebrewNote">Recommended for macOS users</Translate>
            </span>
          </div>
          <div className={styles.installCommand}>
            <code className={styles.installCommandCode}>
              brew tap oatnil-top/ud && brew install ud
            </code>
          </div>
        </div>

        {/* Manual Install */}
        <div className={styles.installSection}>
          <div className={styles.installHeader}>
            <p className={styles.installTitle}>
              <Translate id="subscribe.cliSection.manualInstall">Manual Install (All Platforms)</Translate>
            </p>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value as CLIPlatform)}
              className={styles.platformSelect}>
              {CLI_PLATFORMS.map((platform) => (
                <option key={platform} value={platform}>{platform}</option>
              ))}
            </select>
          </div>
          <div className={styles.installCommand}>
            <code className={styles.installCommandCode}>{installCommand}</code>
          </div>
        </div>
      </div>
    </section>
  );
}

function SelfHostedSection() {
  return (
    <section id="selfhosted-section">
      <div className={styles.sectionHeader}>
        <div className={styles.sectionHeaderRow}>
          <Server size={20} strokeWidth={2} style={{color: '#16a34a'}} />
          <h2 className={styles.sectionHeaderTitle}>
            <Translate id="subscribe.selfHostedSection.title">Self-Hosted Deployment</Translate>
          </h2>
        </div>
        <p className={styles.sectionHeaderDescription}>
          <Translate id="subscribe.selfHostedSection.description">
            Deploy UnderControl on your own infrastructure. You control your data and hosting.
          </Translate>
        </p>
      </div>
      <div className={styles.tierGrid3}>
        <TierCard
          tierKey="personalTier"
          title={<Translate id="subscribe.personalTier.title">Personal</Translate>}
          badge={<Translate id="subscribe.personalTier.badge">Free Forever</Translate>}
          description={<Translate id="subscribe.personalTier.description">Free for personal use</Translate>}
          price={<Translate id="subscribe.personalTier.price">Free</Translate>}
          features={[
            <Translate key="f1" id="subscribe.personalTier.features.feature1">1 user</Translate>,
            <Translate key="f2" id="subscribe.personalTier.features.feature2">All core features</Translate>,
            <Translate key="f3" id="subscribe.personalTier.features.feature3">SQLite database</Translate>,
            <Translate key="f4" id="subscribe.personalTier.features.feature4">Local file storage</Translate>,
            <Translate key="f5" id="subscribe.personalTier.features.feature5">Community support</Translate>,
          ]}
          cta={<Translate id="subscribe.personalTier.cta">Get Started</Translate>}
          ctaLink="/docs/self-deployment"
        />
        <TierCard
          tierKey="proTier"
          title={<Translate id="subscribe.proTier.title">Pro</Translate>}
          badge={<Translate id="subscribe.proTier.badge">License Required</Translate>}
          description={<Translate id="subscribe.proTier.description">For small teams and families</Translate>}
          price={<Translate id="subscribe.proTier.price">Contact Us</Translate>}
          features={[
            <Translate key="f1" id="subscribe.proTier.features.feature1">Up to 20 users</Translate>,
            <Translate key="f2" id="subscribe.proTier.features.feature2">All core features + collaboration</Translate>,
            <Translate key="f3" id="subscribe.proTier.features.feature3">SQLite or PostgreSQL</Translate>,
            <Translate key="f4" id="subscribe.proTier.features.feature4">Local or cloud storage (S3, R2)</Translate>,
            <Translate key="f5" id="subscribe.proTier.features.feature5">Email support</Translate>,
          ]}
          cta={<Translate id="subscribe.proTier.cta">Contact Sales</Translate>}
          ctaLink="/contact"
        />
        <TierCard
          tierKey="maxTier"
          title={<Translate id="subscribe.maxTier.title">Max</Translate>}
          badge={<Translate id="subscribe.maxTier.badge">Supporter License</Translate>}
          description={<Translate id="subscribe.maxTier.description">For larger teams needing more capacity</Translate>}
          price={<Translate id="subscribe.maxTier.price">Contact Us</Translate>}
          features={[
            <Translate key="f1" id="subscribe.maxTier.features.feature1">Custom user limits</Translate>,
            <Translate key="f2" id="subscribe.maxTier.features.feature2">All core features + collaboration</Translate>,
            <Translate key="f3" id="subscribe.maxTier.features.feature3">SQLite or PostgreSQL</Translate>,
            <Translate key="f4" id="subscribe.maxTier.features.feature4">Local or cloud storage (S3, R2)</Translate>,
            <Translate key="f5" id="subscribe.maxTier.features.feature5">Priority support</Translate>,
          ]}
          cta={<Translate id="subscribe.maxTier.cta">Contact Sales</Translate>}
          ctaLink="/contact"
        />
      </div>
    </section>
  );
}

function HelpSection() {
  return (
    <section className={styles.helpSection}>
      <p className={styles.helpText}>
        <Translate id="subscribe.helpText">Need help getting started?</Translate>
      </p>
      <div className={styles.helpLinks}>
        <Link to="/docs/self-deployment" className={styles.helpLink}>
          <Translate id="subscribe.docsLink">View Deployment Guide</Translate>
        </Link>
        <span className={styles.helpDivider}>|</span>
        <Link to="/contact" className={styles.helpLink}>
          <Translate id="subscribe.contactLink">Contact Us</Translate>
        </Link>
      </div>
    </section>
  );
}

function DonateSection() {
  return (
    <section className={styles.donateSection}>
      <div className={styles.donateHeader}>
        <Heart size={20} strokeWidth={2} style={{color: '#ec4899'}} />
        <h2 className={styles.donateTitle}>
          <Translate id="subscribe.donate.title">Support Me</Translate>
        </h2>
      </div>
      <p className={styles.donateDescription}>
        <Translate id="subscribe.donate.description">
          Help me stay passionate and charge my AI companion
        </Translate>
      </p>
      <div className={styles.donateGrid}>
        <a
          href="https://github.com/sponsors/oatnil-top"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.donateCard}>
          <div className={`${styles.donateCardIcon} ${styles.donateCardIconPink}`}>
            <Heart size={16} strokeWidth={2} />
          </div>
          <div>
            <div className={styles.donateCardTitle}>GitHub Sponsors</div>
            <div className={styles.donateCardDesc}>
              <Translate id="subscribe.donate.githubDesc">Monthly sponsorship</Translate>
            </div>
          </div>
          <ExternalLink size={12} strokeWidth={2} style={{color: 'var(--ifm-color-emphasis-500)', marginLeft: 'auto'}} />
        </a>
        <a
          href="https://buymeacoffee.com/lintaoamond"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.donateCard}>
          <div className={`${styles.donateCardIcon} ${styles.donateCardIconAmber}`}>
            <Coffee size={16} strokeWidth={2} />
          </div>
          <div>
            <div className={styles.donateCardTitle}>Buy Me a Coffee</div>
            <div className={styles.donateCardDesc}>
              <Translate id="subscribe.donate.bmcDesc">One-time donation</Translate>
            </div>
          </div>
          <ExternalLink size={12} strokeWidth={2} style={{color: 'var(--ifm-color-emphasis-500)', marginLeft: 'auto'}} />
        </a>
      </div>
      <p className={styles.donateThanks}>
        <Translate id="subscribe.donate.thanks">Every contribution helps me improve!</Translate>
      </p>
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

export default function SubscribePage(): ReactNode {
  return (
    <Layout
      title={translate({
        id: 'subscribe.meta.title',
        message: 'Subscribe & Download',
        description: 'The subscribe page meta title',
      })}
      description={translate({
        id: 'subscribe.meta.description',
        message: 'Download UnderControl desktop app, subscribe to cloud service, or self-host on your own infrastructure.',
        description: 'The subscribe page meta description',
      })}>
      <main className={styles.mainContainer}>
        <HeroSection />
        <QuickStartSection />
        <SaasSection />
        <DesktopAppSection />
        <AppleShortcutsSection />
        <CLISection />
        <SelfHostedSection />
        <HelpSection />
        <DonateSection />
        <FooterSection />
      </main>
    </Layout>
  );
}
