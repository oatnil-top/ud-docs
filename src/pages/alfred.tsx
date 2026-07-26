import {useState, type CSSProperties, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';

import styles from './butler.module.css';

/**
 * Alfred's dedicated page, design v4 (task 84ce8bf7, note fc24c386). Carries the
 * full butler narrative: chat-demo hero (messages play in one by one, replayable;
 * prefers-reduced-motion shows them all at once via butler.module.css) → four
 * verbs (understand / remember / delegate / track) → the journey of one message
 * → the engine behind him → CTA. Mirrored as /alfred in the Vite app — keep
 * structure and copy aligned when editing either. Per the design sign-off every
 * CTA points at the docs quickstart; the ghost CTA goes to the Telegram/Discord
 * configuration reference.
 */

function PhoneDemo() {
  // Remounting the message list restarts every CSS animation — that's the replay.
  const [playId, setPlayId] = useState(0);

  // Message delays echo a real chat rhythm: reply beats are longer than send beats.
  const beats = [
    {
      key: 'me1',
      cls: styles.msgMe,
      delay: 0.3,
      text: (
        <Translate id="alfredp.phone.me1">
          Note this down: pricing page on the website by next Wednesday. And have someone look at that login bug from
          this morning.
        </Translate>
      ),
    },
    {
      key: 'al1',
      cls: styles.msgAl,
      delay: 1.4,
      text: (
        <Translate id="alfredp.phone.al1">
          Noted. I've created the pricing-page task and assigned it to the web team, due next Wednesday. The login bug
          is with prod-debug. I'll ping you when there's news.
        </Translate>
      ),
    },
    {
      key: 'gap',
      cls: styles.timegap,
      delay: 2.6,
      text: <Translate id="alfredp.phone.gap">—— two hours later ——</Translate>,
    },
    {
      key: 'al2',
      cls: styles.msgAl,
      delay: 3.2,
      text: (
        <Translate id="alfredp.phone.al2">
          Login bug is fixed — expired sessions weren't refreshing. Pricing-page draft preview link coming tomorrow
          morning.
        </Translate>
      ),
    },
    {
      key: 'me2',
      cls: styles.msgMe,
      delay: 4.1,
      text: <Translate id="alfredp.phone.me2">👍 nice</Translate>,
    },
  ];

  return (
    <figure className={styles.phone}>
      <div className={styles.phoneHead}>
        <div className={styles.avatar} aria-hidden="true">
          🎩
        </div>
        <div>
          <div className={styles.phoneName}>Alfred</div>
          <div className={styles.phoneStatus}>
            <Translate id="alfredp.phone.status">Private butler · online</Translate>
          </div>
        </div>
        <button type="button" className={styles.replay} onClick={() => setPlayId((n) => n + 1)}>
          <Translate id="alfredp.phone.replay">Replay ↻</Translate>
        </button>
      </div>
      <div
        key={playId}
        className={styles.chat}
        aria-label={translate({id: 'alfredp.phone.aria', message: 'Demo conversation'})}>
        {beats.map((b) => (
          <p key={b.key} className={b.cls} style={{'--d': `${b.delay}s`} as CSSProperties}>
            {b.text}
          </p>
        ))}
      </div>
    </figure>
  );
}

function AlfredHero() {
  return (
    <header className={`${styles.aHero} ${styles.wrap}`}>
      <div>
        <div className={styles.eyebrow}>Private AI Butler</div>
        <h1>
          <Translate id="alfredp.hero.t1">Meet Alfred,</Translate>
          <br />
          <span className={styles.turn}>
            <Translate id="alfredp.hero.t2">the butler in your IM.</Translate>
          </span>
        </h1>
        <p className={styles.sub}>
          <Translate id="alfredp.hero.sub">
            Send one message — he understands, remembers, delegates to the right agent, and brings the result back to
            the chat. All of UnDercontrol, one conversation away.
          </Translate>
        </p>
        <div className={styles.ctas}>
          <Link className={styles.btnPrimary} to="/docs/intro">
            <Translate id="alfredp.hero.ctaPrimary">Get started with Alfred</Translate>
          </Link>
          <Link className={styles.btnGhost} to="/configuration">
            <Translate id="alfredp.hero.ctaSetup">Set up Telegram / Discord</Translate>
          </Link>
        </div>
      </div>
      <PhoneDemo />
    </header>
  );
}

function VerbsSection() {
  const verbs: Array<{key: string; z: ReactNode; p: ReactNode}> = [
    {
      key: 'understand',
      z: <Translate id="alfredp.verbs.understand.z">Understand</Translate>,
      p: (
        <Translate id="alfredp.verbs.understand.p">
          Casual phrasing, typos, half-sentences — he gets what you mean.
        </Translate>
      ),
    },
    {
      key: 'remember',
      z: <Translate id="alfredp.verbs.remember.z">Remember</Translate>,
      p: (
        <Translate id="alfredp.verbs.remember.p">
          People, events, preferences, context — never repeat yourself.
        </Translate>
      ),
    },
    {
      key: 'delegate',
      z: <Translate id="alfredp.verbs.delegate.z">Delegate</Translate>,
      p: (
        <Translate id="alfredp.verbs.delegate.p">
          Work goes to the right agent: dev, ops, writing, bookkeeping.
        </Translate>
      ),
    },
    {
      key: 'track',
      z: <Translate id="alfredp.verbs.track.z">Track</Translate>,
      p: (
        <Translate id="alfredp.verbs.track.p">
          He watches progress, chases results, and reports back in chat.
        </Translate>
      ),
    },
  ];
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.eyebrow}>
          <Translate id="alfredp.verbs.eyebrow">What he does</Translate>
        </div>
        <h2>
          <Translate id="alfredp.verbs.title">Four things, all the time</Translate>
        </h2>
        <div className={styles.verbs}>
          {verbs.map((verb) => (
            <div key={verb.key} className={styles.verb}>
              <div className={styles.verbZ}>{verb.z}</div>
              <div className={styles.verbE}>{verb.key}</div>
              <p>{verb.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepsSection() {
  const steps: Array<{key: string; t: ReactNode; p: ReactNode}> = [
    {
      key: 'send',
      t: <Translate id="alfredp.steps.send.t">Send a message</Translate>,
      p: (
        <Translate id="alfredp.steps.send.p">
          Say whatever's on your mind — a task, a memo, an expense, an idea. One sentence is enough.
        </Translate>
      ),
    },
    {
      key: 'arrange',
      t: <Translate id="alfredp.steps.arrange.t">Alfred arranges</Translate>,
      p: (
        <Translate id="alfredp.steps.arrange.p">
          He remembers context, files tasks, sets priorities, and delegates to the right agent for the job.
        </Translate>
      ),
    },
    {
      key: 'results',
      t: <Translate id="alfredp.steps.results.t">Results come back</Translate>,
      p: (
        <Translate id="alfredp.steps.results.p">
          Progress and outcomes return to the conversation. You never have to open a dashboard.
        </Translate>
      ),
    },
  ];
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.eyebrow}>
          <Translate id="alfredp.steps.eyebrow">How it works</Translate>
        </div>
        <h2>
          <Translate id="alfredp.steps.title">The journey of one message</Translate>
        </h2>
        <div className={styles.steps}>
          {steps.map((step, i) => (
            <div key={step.key} className={styles.step}>
              <div className={styles.stepN}>0{i + 1}</div>
              <h3>{step.t}</h3>
              <p>{step.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EngineSection() {
  return (
    <section className={styles.section}>
      <div className={`${styles.wrap} ${styles.meet}`}>
        <div>
          <div className={styles.eyebrow}>
            <Translate id="alfredp.engine.eyebrow">The engine</Translate>
          </div>
          <h2>
            <Translate id="alfredp.engine.title">Behind Alfred: all of UnDercontrol</Translate>
          </h2>
          <p className={styles.lede}>
            <Translate id="alfredp.engine.lede">
              Tasks, boards, notes, finance, a team of agents — open them whenever you like, or never at all.
            </Translate>
          </p>
        </div>
        <Link className={styles.btnGhost} to="/">
          <Translate id="alfredp.engine.back">← All angles on the homepage</Translate>
        </Link>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className={styles.ctaBand}>
      <div className={styles.wrap}>
        <h2>
          <Translate id="alfredp.cta.title">Starting today, hand it to Alfred.</Translate>
        </h2>
        <Link className={styles.btnPrimary} to="/docs/intro">
          <Translate id="alfredp.cta.primary">Get started with Alfred</Translate>
        </Link>
        <p className={styles.fine}>
          <Translate id="alfredp.cta.fine">Free for personal use · Self-hostable · Running in five minutes</Translate>
        </p>
      </div>
    </section>
  );
}

export default function AlfredPage(): ReactNode {
  return (
    <Layout
      title={translate({
        id: 'alfredp.meta.title',
        message: 'Alfred — Your Private AI Butler | UnDercontrol',
        description: 'The Alfred page meta title',
      })}
      description={translate({
        id: 'alfredp.meta.description',
        message:
          'Alfred is a private AI butler living in your Telegram or Discord. Send one message — he understands, remembers, delegates to your AI agents, and reports back in the chat.',
        description: 'The Alfred page meta description',
      })}>
      <main className={styles.scope}>
        <AlfredHero />
        <VerbsSection />
        <StepsSection />
        <EngineSection />
        <CtaSection />
      </main>
    </Layout>
  );
}
