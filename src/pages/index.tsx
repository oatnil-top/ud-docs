import {useEffect, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';

import PhoneDemo from '@site/src/components/HeroDemos/PhoneDemo';
import KanbanDemo from '@site/src/components/HeroDemos/KanbanDemo';
import GraphDemo from '@site/src/components/HeroDemos/GraphDemo';
import AgentsDemo from '@site/src/components/HeroDemos/AgentsDemo';

import styles from './butler.module.css';

/**
 * Homepage, design v7.1 (task b00f9e8f, boss feedback 2026-07-26): the hero
 * rotates through four product angles — Alfred chat (lead) → boards →
 * knowledge graph → agent orchestration (Finance dropped per feedback) —
 * headline and stage in sync, 5s autoplay, hover pauses, tabs jump directly,
 * no autoplay under prefers-reduced-motion. The stage no longer shows
 * screenshots: each angle is a live INTERACTIVE simulation from
 * src/components/HeroDemos/ (chat playback, drag-drop kanban, draggable
 * graph, clickable agent roster), all sharing one fixed stage frame so every
 * slide has an identical footprint. Below: the "start with Alfred" funnel to
 * /alfred, the engine row, the architecture diagram, and the CTA. Structure
 * and copy were previously mirrored on the Vite app's /home — that mirror
 * still shows v7 screenshots; align it when it is next touched. Get-started
 * CTAs point at /download (boss decision 2026-07-26): everything rests on a
 * locally installed daemon, so the download IS the first step.
 */

/**
 * Agent onboarding pill.
 *
 * The whole onboarding contract is one line of text an agent can act on:
 * `Fetch <AGENT_SETUP_PROMPT_URL>`. The prompt itself lives in this repo at
 * static/agent-setup/prompt.md; we point at the GitHub raw URL rather than the
 * docs domain because oatnil.com's bot protection blocks some agents' fetchers,
 * whereas raw.githubusercontent.com is reliably reachable. Edit the file in this
 * repo, never here. Mirrored on the app landing page
 * (ud-vite-app/src/pages/home-page/index.tsx); keep the copied text identical.
 */
const AGENT_SETUP_PROMPT_URL = 'https://raw.githubusercontent.com/oatnil-top/ud-docs/main/static/agent-setup/prompt.md';
const AGENT_SETUP_COMMAND = `Fetch ${AGENT_SETUP_PROMPT_URL}`;

/** The Clipboard API needs a secure context; keep the button working over plain http. */
function copyViaTextarea() {
  const el = document.createElement('textarea');
  el.value = AGENT_SETUP_COMMAND;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  el.remove();
}

function AgentSetupButton() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const id = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(id);
  }, [copied]);

  const copy = () => {
    // Flip the label first: Chrome can leave writeText pending until the document
    // regains focus, so awaiting it would swallow the feedback entirely.
    setCopied(true);
    try {
      const pending = navigator.clipboard?.writeText(AGENT_SETUP_COMMAND);
      if (pending) {
        pending.catch(copyViaTextarea);
        return;
      }
    } catch {
      // Fall through — no Clipboard API here.
    }
    copyViaTextarea();
  };

  // Boss feedback 2026-07-26 (task b00f9e8f): the pill stays compact — never
  // print the Fetch command itself, only a copy glyph; the command lives in
  // the title tooltip and the clipboard.
  return (
    <button
      type="button"
      className={styles.agentSetupButton}
      onClick={copy}
      title={AGENT_SETUP_COMMAND}
      aria-label={translate({
        id: 'homepage.hero.agentSetup.aria',
        message: 'Copy the agent setup prompt',
      })}>
      <span>
        {copied ? (
          <Translate id="homepage.hero.agentSetup.copied">Copied — paste it into your agent</Translate>
        ) : (
          <Translate id="homepage.hero.agentSetup.label">Onboard your agent to UnDercontrol</Translate>
        )}
      </span>
      <code className={styles.agentSetupCode}>{copied ? '✓' : '⧉'}</code>
    </button>
  );
}

// --- Hero: five rotating angles, copy and stage in sync ---

type Slide = {key: string; t1: ReactNode; t2: ReactNode; sub: ReactNode; tab: ReactNode; demo: ReactNode};

// Each slide's demo is an interactive simulation (src/components/HeroDemos/)
// rendered inside the fixed stage frame — same footprint for every slide.
// Built inside a hook, not at module scope, so the Translate ids stay
// statically extractable.
function useSlides(): Slide[] {
  return [
    {
      key: 'alfred',
      t1: <Translate id="home4.slide.alfred.t1">You just chat.</Translate>,
      t2: <Translate id="home4.slide.alfred.t2">Alfred handles the rest.</Translate>,
      sub: (
        <Translate id="home4.slide.alfred.sub">
          A private butler living in your Telegram: he understands, remembers, delegates, tracks — and results return
          to the chat.
        </Translate>
      ),
      tab: <Translate id="home4.tab.alfred">Chat with Alfred</Translate>,
      demo: <PhoneDemo frameless />,
    },
    {
      key: 'boards',
      t1: <Translate id="home4.slide.boards.t1">Tasks, boards, notes —</Translate>,
      t2: <Translate id="home4.slide.boards.t2">one place.</Translate>,
      sub: (
        <Translate id="home4.slide.boards.sub">
          Everything Alfred notes lands on your boards. When you want hands-on control, it's all there.
        </Translate>
      ),
      tab: <Translate id="home4.tab.boards">Boards</Translate>,
      demo: <KanbanDemo />,
    },
    {
      key: 'knowledge',
      t1: <Translate id="home4.slide.knowledge.t1">Every task is a doc.</Translate>,
      t2: <Translate id="home4.slide.knowledge.t2">Search, and it's there.</Translate>,
      sub: (
        <Translate id="home4.slide.knowledge.sub">
          Markdown notes, meeting minutes, decision records — linked into one graph; full-text search brings anything
          back in a second.
        </Translate>
      ),
      tab: <Translate id="home4.tab.knowledge">Knowledge</Translate>,
      demo: <GraphDemo />,
    },
    {
      key: 'agents',
      t1: <Translate id="home4.slide.agents.t1">A team of agents,</Translate>,
      t2: <Translate id="home4.slide.agents.t2">at your command.</Translate>,
      sub: (
        <Translate id="home4.slide.agents.sub">
          Dev, ops, writing — each has a specialist. Alfred is the head butler who hands work to the right one.
        </Translate>
      ),
      tab: <Translate id="home4.tab.agents">Agents</Translate>,
      demo: <AgentsDemo />,
    },
  ];
}

const ROTATE_MS = 5000;

function HeroSection() {
  const slides = useSlides();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // `index` in the deps restarts the countdown on every slide change, so a
  // manual tab click always gets the full 5s (and an interaction with the
  // demo isn't cut short by a timer started slides ago).
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), ROTATE_MS);
    return () => clearInterval(id);
  }, [paused, index, slides.length]);

  const slide = slides[index];

  return (
    <header
      className={`${styles.hero} ${styles.wrap}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}>
      <div>
        <div className={styles.eyebrow}>Private AI Butler &amp; Workspace</div>
        {/* key remounts on rotation so the fade-up entrance replays; min-heights
            in CSS keep the CTAs from jumping as headline length changes. */}
        <div key={slide.key} className={styles.fadeup}>
          <h1>
            {slide.t1}
            <br />
            <span className={styles.turn}>{slide.t2}</span>
          </h1>
          <p className={styles.sub}>{slide.sub}</p>
        </div>
        {/* Boss feedback 2026-07-26: the hero sells UnDercontrol, not "an
            Alfred app" — exactly three CTAs, each landing on a dedicated
            page (never a docs page): /alfred, /download, /self-hosting. */}
        <div className={styles.ctas}>
          <Link className={styles.btnPrimary} to="/alfred">
            <Translate id="home4.hero.ctaMeet">Meet Alfred →</Translate>
          </Link>
          <Link className={styles.btnGhost} to="/download">
            <Translate id="home4.hero.ctaDownload">Download</Translate>
          </Link>
          <Link className={styles.btnGhost} to="/self-hosting">
            <Translate id="home4.hero.ctaSelfhost">Self-Host</Translate>
          </Link>
        </div>
        <p className={styles.fine}>
          <Translate id="home4.hero.fine">Free for personal use · Self-hostable · Also on Discord</Translate>
        </p>
        <div className={styles.agentSetupRow}>
          <AgentSetupButton />
        </div>
      </div>

      <div className={styles.stageBox}>
        <div
          className={styles.stage}
          aria-label={translate({id: 'home4.hero.stageAria', message: 'Product showcase'})}>
          <div key={slide.key} className={styles.fadeup} style={{height: '100%'}}>
            {slide.demo}
          </div>
        </div>
        <div
          className={styles.angleTabs}
          role="tablist"
          aria-label={translate({id: 'home4.hero.stageAria', message: 'Product showcase'})}>
          {slides.map((s, i) => (
            <button
              key={s.key}
              type="button"
              role="tab"
              aria-selected={i === index}
              className={i === index ? styles.tabOn : undefined}
              onClick={() => setIndex(i)}>
              {/* Alfred keeps a green lead-dot: he is the headline angle. */}
              {s.key === 'alfred' && <span className={styles.leadDot} />}
              {s.tab}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

// --- "Start with Alfred" funnel ---
function MeetAlfredSection() {
  return (
    <section className={styles.section}>
      <div className={`${styles.wrap} ${styles.meet}`}>
        <div>
          <div className={styles.eyebrow}>
            <Translate id="home4.meet.eyebrow">The lead angle</Translate>
          </div>
          <h2>
            <Translate id="home4.meet.title">Don't want to learn an interface? Start with Alfred.</Translate>
          </h2>
          <p className={styles.lede}>
            <Translate id="home4.meet.lede">
              Everything above — tasks, ledger, the agent team — can be driven entirely by chatting with Alfred.
            </Translate>
          </p>
        </div>
        <Link className={styles.btnGhost} to="/alfred">
          <Translate id="home4.meet.cta">Meet Alfred →</Translate>
        </Link>
      </div>
    </section>
  );
}

// --- Engine row: the five demoted angles, one line each ---
function EngineSection() {
  const items: Array<{key: string; t: ReactNode; d: ReactNode}> = [
    {
      key: 'tasks',
      t: <Translate id="home4.engine.tasks.t">Tasks &amp; Boards</Translate>,
      d: <Translate id="home4.engine.tasks.d">Everything is a task; views your way.</Translate>,
    },
    {
      key: 'notes',
      t: <Translate id="home4.engine.notes.t">Notes</Translate>,
      d: <Translate id="home4.engine.notes.d">Long-form lives beside your tasks.</Translate>,
    },
    {
      key: 'finance',
      t: <Translate id="home4.engine.finance.t">Finance</Translate>,
      d: <Translate id="home4.engine.finance.d">Multi-currency ledger, monthly rollups.</Translate>,
    },
    {
      key: 'agents',
      t: <Translate id="home4.engine.agents.t">Agent team</Translate>,
      d: <Translate id="home4.engine.agents.d">AI colleagues you hire, team up, hand off to.</Translate>,
    },
    {
      key: 'selfhost',
      t: <Translate id="home4.engine.selfhost.t">Self-hosted</Translate>,
      d: <Translate id="home4.engine.selfhost.d">Your data, on your own machine.</Translate>,
    },
  ];
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.eyebrow}>
          <Translate id="home4.engine.eyebrow">One engine</Translate>
        </div>
        <h2>
          <Translate id="home4.engine.title">Five angles, one UnDercontrol</Translate>
        </h2>
        <div className={styles.engineRow}>
          {items.map((item) => (
            <div key={item.key} className={styles.engineItem}>
              <div className={styles.engineT}>{item.t}</div>
              <div className={styles.engineD}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Architecture (design v6): box-and-arrow SVG between engine row and CTA ---
// Main line 你 → IM entry → Alfred → orchestration → CLI execution layer, with
// memory (bidirectional), scheduling and the prompt/cwd config plane as side
// inputs, and the green dashed ⑤ edge returning results to the chat. Colors go
// through the .scope tokens so light/dark adapt; narrow screens scroll the
// diagram horizontally. Mirrored in the Vite app's ArchitectureSection — keep
// the two SVGs identical.
function ArchitectureSection() {
  const s = styles;
  return (
    <section className={s.section}>
      <div className={s.wrap}>
        <div className={s.eyebrow}>
          <Translate id="home4.arch.eyebrow">Architecture</Translate>
        </div>
        <h2>
          <Translate id="home4.arch.title">How UnDercontrol is put together</Translate>
        </h2>
        <p className={s.lede}>
          <Translate id="home4.arch.lede">
            To you, it's a conversation. Underneath: memory, orchestration, and scheduling — three systems resting on
            an execution layer that does the real work.
          </Translate>
        </p>

        <div className={s.archScroll}>
          <svg
            className={s.archsvg}
            viewBox="0 0 880 530"
            role="img"
            aria-label={translate({id: 'home4.arch.aria', message: 'UnDercontrol architecture diagram'})}>
            <defs>
              <marker id="arch-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 z" className={s.aMk} />
              </marker>
              <marker id="arch-arrM" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 z" className={s.aMkM} />
              </marker>
              <marker id="arch-arrA" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 z" className={s.aMkA} />
              </marker>
            </defs>

            {/* you */}
            <rect x="375" y="12" width="130" height="36" rx="18" className={s.aBox} />
            <text x="440" y="35" textAnchor="middle" className={s.aTt}>
              <Translate id="home4.arch.you">💬 You</Translate>
            </text>

            {/* ① you -> IM */}
            <line x1="440" y1="48" x2="440" y2="84" className={s.aEdge} markerEnd="url(#arch-arr)" />
            <text x="452" y="70" className={s.aEstep}>
              <Translate id="home4.arch.step1">① Send a message</Translate>
            </text>

            {/* IM entry */}
            <rect x="290" y="88" width="300" height="52" rx="10" className={s.aBox} />
            <text x="440" y="109" textAnchor="middle" className={s.aTt}>
              <Translate id="home4.arch.im">IM entry</Translate>
            </text>
            <text x="440" y="128" textAnchor="middle" className={s.aSub}>
              Telegram · Discord · Web
            </text>

            {/* IM -> Alfred */}
            <line x1="440" y1="140" x2="440" y2="176" className={s.aEdge} markerEnd="url(#arch-arr)" />

            {/* Alfred */}
            <rect x="340" y="180" width="200" height="56" rx="12" className={s.aBoxAccent} />
            <text x="440" y="203" textAnchor="middle" className={`${s.aTt} ${s.aOnAccent}`}>
              🎩 Alfred
            </text>
            <text x="440" y="222" textAnchor="middle" className={`${s.aSub} ${s.aOnAccent}`}>
              <Translate id="home4.arch.alfredSub">Private butler</Translate>
            </text>

            {/* ② Alfred <-> Memory (read/write) */}
            <path d="M 380,236 L 380,264 L 190,264 L 190,296" className={s.aEdge} markerStart="url(#arch-arr)" markerEnd="url(#arch-arr)" />
            <text x="285" y="257" textAnchor="middle" className={s.aEstep}>
              <Translate id="home4.arch.step2">② Understand &amp; remember</Translate>
            </text>

            {/* memory */}
            <rect x="90" y="300" width="200" height="66" rx="10" className={s.aBox} />
            <text x="190" y="326" textAnchor="middle" className={s.aTt}>
              <Translate id="home4.arch.memory">Memory</Translate>
            </text>
            <text x="190" y="346" textAnchor="middle" className={s.aSub}>
              tasks · notes · boards — markdown
            </text>

            {/* ③ Alfred -> Orchestration */}
            <line x1="440" y1="236" x2="440" y2="296" className={s.aEdge} markerEnd="url(#arch-arr)" />
            <text x="452" y="270" className={s.aEstep}>
              <Translate id="home4.arch.step3">③ Delegate</Translate>
            </text>

            {/* orchestration */}
            <rect x="330" y="300" width="220" height="66" rx="10" className={s.aBox} />
            <text x="440" y="326" textAnchor="middle" className={s.aTt}>
              <Translate id="home4.arch.orch">Orchestration</Translate>
            </text>
            <text x="440" y="346" textAnchor="middle" className={s.aSub}>
              <Translate id="home4.arch.orchSub">agent team + resident daemons</Translate>
            </text>

            {/* scheduling */}
            <rect x="640" y="238" width="180" height="52" rx="10" className={s.aBox} />
            <text x="730" y="259" textAnchor="middle" className={s.aTt}>
              <Translate id="home4.arch.sched">Scheduling</Translate>
            </text>
            <text x="730" y="277" textAnchor="middle" className={s.aSub}>
              scheduled jobs &amp; agents
            </text>

            {/* scheduling -> orchestration */}
            <path d="M 640,264 L 540,264 L 540,296" className={s.aEdgeM} markerEnd="url(#arch-arrM)" />
            <text x="588" y="256" textAnchor="middle" className={s.aElabel}>
              <Translate id="home4.arch.fires">fires on schedule</Translate>
            </text>

            {/* prompt/cwd config plane */}
            <rect x="640" y="330" width="180" height="66" rx="10" className={s.aBoxDash} />
            <text x="730" y="356" textAnchor="middle" className={s.aTt}>
              prompt · cwd
            </text>
            <text x="730" y="376" textAnchor="middle" className={s.aSub}>
              <Translate id="home4.arch.configSub">agent definition · project</Translate>
            </text>

            {/* config -> orchestration */}
            <line x1="640" y1="352" x2="554" y2="352" className={s.aEdgeM} markerEnd="url(#arch-arrM)" />
            <text x="597" y="344" textAnchor="middle" className={s.aElabel}>
              <Translate id="home4.arch.configures">configures</Translate>
            </text>

            {/* ④ orchestration -> CLI */}
            <line x1="440" y1="366" x2="440" y2="428" className={s.aEdge} markerEnd="url(#arch-arr)" />
            <text x="452" y="400" className={s.aEstep}>
              <Translate id="home4.arch.step4">④ Execute</Translate>
            </text>

            {/* CLI layer */}
            <rect x="270" y="432" width="340" height="66" rx="10" className={s.aBox} />
            <text x="440" y="458" textAnchor="middle" className={s.aTt}>
              <Translate id="home4.arch.cli">Execution — the real CLIs</Translate>
            </text>
            <text x="440" y="478" textAnchor="middle" className={s.aSub}>
              Claude Code · Codex · OpenCode · …
            </text>

            {/* CLI writes back to memory */}
            <path d="M 270,465 L 190,465 L 190,370" className={s.aEdgeM} markerEnd="url(#arch-arrM)" />
            <text x="230" y="457" textAnchor="middle" className={s.aElabel}>
              <Translate id="home4.arch.writesBack">writes back</Translate>
            </text>

            {/* ⑤ results return to chat */}
            <path d="M 610,465 L 848,465 L 848,114 L 594,114" className={s.aEdgeA} markerEnd="url(#arch-arrA)" />
            <text x="721" y="104" textAnchor="middle" className={s.aEstep}>
              <Translate id="home4.arch.step5">⑤ Results return to chat</Translate>
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}

// --- CTA ---
function CtaSection() {
  return (
    <section className={styles.ctaBand}>
      <div className={styles.wrap}>
        <h2>
          <Translate id="home4.cta.title">Starting today, hand it to Alfred.</Translate>
        </h2>
        <Link className={styles.btnPrimary} to="/download">
          <Translate id="home4.cta.primary">Get started with Alfred</Translate>
        </Link>
        <p className={styles.fine}>
          <Translate id="home4.cta.fine">Free for personal use · Self-hostable · Running in five minutes</Translate>
        </p>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title={translate({
        id: 'homepage.title',
        message: 'UnDercontrol — Alfred, Your Private AI Butler',
        description: 'The homepage meta title',
      })}
      description={translate({
        id: 'homepage.description',
        message:
          'Meet Alfred, a private AI butler living in your Telegram: he understands, remembers, delegates to your AI agents, and reports back in the chat. Behind him: tasks, knowledge, finance, and agent orchestration in one private, self-hostable workspace.',
        description: 'The homepage meta description',
      })}>
      <main className={styles.scope}>
        <HeroSection />
        <MeetAlfredSection />
        <EngineSection />
        <ArchitectureSection />
        <CtaSection />
      </main>
    </Layout>
  );
}
