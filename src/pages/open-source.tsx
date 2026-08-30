import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import {Workflow, FileJson, Scissors, Scale, ArrowUpRight} from 'lucide-react';

import styles from './open-source.module.css';

/**
 * The page has one hard editorial rule, and it is the reason the copy below is
 * worded the way it is (ud task ce943e6e):
 *
 *   Every sentence containing the phrase "open source" must have a COMPONENT or
 *   a REPOSITORY as its subject — never UnDercontrol. The product is
 *   proprietary; only these extracted pieces are published.
 *
 * The check is literal: `grep -n -i 'open.source'` over this file, then read the
 * subject of each hit. That is why the boundary note states the proprietary half
 * WITHOUT the phrase — it says "its source is not published". Stating the same
 * fact the obvious way, as a negative sentence about the product, would put
 * UnDercontrol in the subject slot of a matching line: right meaning, failed
 * check. The wording above is the one that is both true and greppable.
 *
 * Only three repositories are listed, and that is a decision, not a backlog:
 * an entry earns its place by standing on its own (installable, licensed,
 * current) and by having a one-sentence relationship to the product. Others
 * exist under the same org and are added when they clear that bar.
 */

const ORG = 'https://github.com/oatnil-top';
const REPO_DATAFLOW = `${ORG}/ud-dataflow-diagram`;
const REPO_SCHEMAS = `${ORG}/ud-schemas`;
// Identical to the footer's "Chrome Extension" link in docusaurus.config.ts —
// both surfaces point at the repository, so they never disagree.
const REPO_CLIPPER = `${ORG}/ud-chrome-extension`;
const NPM_DATAFLOW = 'https://www.npmjs.com/package/@oatnil/ud-dataflow-diagram';
const PLAYGROUND_DATAFLOW = 'https://ud-dataflow-diagram.lintao-amons.workers.dev';

function HeroSection() {
  return (
    <header className={styles.hero}>
      <p className={styles.eyebrow}>
        <Translate id="oss.hero.eyebrow">Open Source Components</Translate>
      </p>
      <h1 className={styles.heroTitle}>
        <Translate id="oss.hero.title.a">Three components, </Translate>
        <em>
          <Translate id="oss.hero.title.b">published on their own.</Translate>
        </em>
      </h1>
      <p className={`${styles.lede} ${styles.heroLede}`}>
        <Translate id="oss.hero.lede">
          These components were extracted from UnDercontrol and released under open source licenses. You can read them, install them into your own projects, and build against them — without running UnDercontrol at all.
        </Translate>
      </p>
      <div className={styles.pillrow}>
        <span className={styles.pill}>
          <b>3</b> <Translate id="oss.hero.pill1">repositories</Translate>
        </span>
        <span className={styles.pill}>
          <b>MIT</b> <Translate id="oss.hero.pill2">and AGPL-3.0</Translate>
        </span>
        <span className={styles.pill}>
          <b><Translate id="oss.hero.pill3a">No account</Translate></b> <Translate id="oss.hero.pill3b">needed to use them</Translate>
        </span>
      </div>
      <BoundaryNote />
    </header>
  );
}

function BoundaryNote() {
  return (
    <div className={styles.boundary}>
      <Scale size={19} />
      <div>
        <h2>
          <Translate id="oss.boundary.title">What is published here, and what is not</Translate>
        </h2>
        <p>
          <Translate id="oss.boundary.p1">
            Each component below is released under the open source license printed on its card. That license covers that one repository and nothing else.
          </Translate>
        </p>
        <p>
          <Translate id="oss.boundary.p2">
            UnDercontrol itself — the backend, the web app, the desktop app and the CLI — is a proprietary product, and its source is not published. Installing anything on this page gives you that component, not the product.
          </Translate>
        </p>
      </div>
    </div>
  );
}

function ReposSection() {
  return (
    <section className={styles.section}>
      <p className={styles.eyebrow}>
        <Translate id="oss.repos.label">The components</Translate>
      </p>
      <h2 className={styles.h2}>
        <Translate id="oss.repos.title">Each one is useful on its own.</Translate>
      </h2>
      <p className={styles.lede}>
        <Translate id="oss.repos.lede">
          A repository earns a place here by being installable today, carrying a license, and having a one-sentence answer to “what does this have to do with UnDercontrol?”
        </Translate>
      </p>

      <div className={styles.repos}>
        {/* --- ud-dataflow-diagram --- */}
        <article className={styles.repo}>
          <div className={styles.repoHead}>
            <Workflow size={20} className={styles.repoIcon} />
            <h3 className={styles.repoName}>ud-dataflow-diagram</h3>
            <span className={styles.lic}>MIT</span>
          </div>
          <p>
            <Translate id="oss.dataflow.what">
              This is the diagram editor built into UnDercontrol, extracted into a React component library you can install in your own app. UnDercontrol builds from this same repository, so what you install is the editor that ships in the product — not a reduced copy of it.
            </Translate>
          </p>
          <p>
            <b>
              <Translate id="oss.reachwhen">Reach for it when</Translate>
            </b>{' '}
            <Translate id="oss.dataflow.why">
              an agent should write the graph as JSON and a person should rearrange the picture by hand. It renders a dataflow or architecture diagram from a plain JSON document and hands edits back in the same shape.
            </Translate>
          </p>
          <div className={styles.cmd}>
            <span>$</span> npm install @oatnil/ud-dataflow-diagram
          </div>
          <div className={styles.linkrow}>
            <a href={REPO_DATAFLOW} target="_blank" rel="noreferrer">
              <Translate id="oss.link.repo">Repository</Translate> <ArrowUpRight size={14} />
            </a>
            <a href={NPM_DATAFLOW} target="_blank" rel="noreferrer">
              <Translate id="oss.link.npm">npm package</Translate> <ArrowUpRight size={14} />
            </a>
            <a href={PLAYGROUND_DATAFLOW} target="_blank" rel="noreferrer">
              <Translate id="oss.link.playground">Live playground</Translate> <ArrowUpRight size={14} />
            </a>
          </div>
        </article>

        {/* --- ud-schemas --- */}
        <article className={styles.repo}>
          <div className={styles.repoHead}>
            <FileJson size={20} className={styles.repoIcon} />
            <h3 className={styles.repoName}>ud-schemas</h3>
            <span className={styles.lic}>MIT</span>
          </div>
          <p>
            <Translate id="oss.schemas.what">
              The JSON Schemas for the objects UnDercontrol stores — 21 of them, covering tasks, notes, boards, comments, files, diagrams, agents and more. They are the written-down shape of the data, published separately from the server that serves it.
            </Translate>
          </p>
          <p>
            <b>
              <Translate id="oss.reachwhen">Reach for it when</Translate>
            </b>{' '}
            <Translate id="oss.schemas.why">
              you are writing your own client, an importer, or an integration: validate against these instead of reverse-engineering shapes out of API responses, and you will know when a field changes rather than discovering it in production.
            </Translate>
          </p>
          <div className={styles.linkrow}>
            <a href={REPO_SCHEMAS} target="_blank" rel="noreferrer">
              <Translate id="oss.link.repo">Repository</Translate> <ArrowUpRight size={14} />
            </a>
          </div>
        </article>

        {/* --- ud-chrome-extension --- */}
        <article className={styles.repo}>
          <div className={styles.repoHead}>
            <Scissors size={20} className={styles.repoIcon} />
            <h3 className={styles.repoName}>ud-chrome-extension</h3>
            <span className={styles.lic}>AGPL-3.0</span>
          </div>
          <p>
            <Translate id="oss.clipper.what">
              The Web Clipper browser extension. It saves a page as a full HTML snapshot or as Markdown, either to a local file or into UnDercontrol — and the local half works with no account at all.
            </Translate>
          </p>
          <p>
            <b>
              <Translate id="oss.reachwhen">Reach for it when</Translate>
            </b>{' '}
            <Translate id="oss.clipper.why">
              you want to keep what you read. A clipper necessarily sees every page you visit; this one is published in full, so you can read exactly what it does with that access before you install it.
            </Translate>
          </p>
          <div className={styles.linkrow}>
            <a href={REPO_CLIPPER} target="_blank" rel="noreferrer">
              <Translate id="oss.link.repo">Repository</Translate> <ArrowUpRight size={14} />
            </a>
          </div>
        </article>
      </div>

      <p className={styles.more}>
        <Translate id="oss.more">
          Other repositories live under the same organization. They are listed here once they stand on their own — a reader should be able to install one and use it without a tour of everything else.
        </Translate>
      </p>
    </section>
  );
}

function CTASection() {
  return (
    <section className={`${styles.section} ${styles.cta}`}>
      <h2 className={styles.ctaTitle}>
        <Translate id="oss.cta.title">Take a piece with you.</Translate>
      </h2>
      <p>
        <Translate id="oss.cta.lede">
          Read the code, open an issue, or send a pull request. Each repository takes contributions on its own terms.
        </Translate>
      </p>
      <div className={styles.btnrow}>
        <Link className={styles.btnPrimary} href={ORG}>
          <Translate id="oss.cta.org">Browse the organization</Translate>
        </Link>
        <Link className={styles.btnGhost} to="/docs/intro">
          <Translate id="oss.cta.docs">Documentation</Translate>
        </Link>
        <Link className={styles.btnGhost} to="/contact">
          <Translate id="oss.cta.contact">Contact us</Translate>
        </Link>
      </div>
    </section>
  );
}

export default function OpenSource(): ReactNode {
  return (
    <Layout
      title={translate({
        id: 'oss.title',
        message: 'Open Source Components',
        description: 'The open source components page meta title',
      })}
      description={translate({
        id: 'oss.description',
        message:
          'Three components extracted from UnDercontrol and released under open source licenses: the ud-dataflow-diagram React editor (MIT), the ud-schemas JSON Schemas (MIT), and the Web Clipper browser extension (AGPL-3.0).',
        description: 'The open source components page meta description',
      })}>
      <main className={styles.page}>
        <HeroSection />
        <ReposSection />
        <CTASection />
      </main>
    </Layout>
  );
}
