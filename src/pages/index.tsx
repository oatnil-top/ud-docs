import {useEffect, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';

import styles from './butler.module.css';

/**
 * Homepage, design v4 (task 84ce8bf7, note fc24c386): the hero rotates through
 * five product angles — Alfred chat (lead) → boards → knowledge graph → finance
 * → agent orchestration — headline and stage in sync, 5s autoplay, hover pauses,
 * tabs jump directly, no autoplay under prefers-reduced-motion. Below: the
 * "start with Alfred" funnel to /alfred, the five-item engine row, and the CTA.
 * All visuals are flat UI vignettes (no screenshots). Mirrored on the Vite
 * app's /home — keep structure and copy aligned when editing either.
 * Per the design sign-off every CTA points at the docs quickstart.
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
      <code className={styles.agentSetupCode}>{copied ? '✓' : AGENT_SETUP_COMMAND}</code>
    </button>
  );
}

// --- Stage vignettes (flat UI miniatures, one per angle) ---

function VigHead({children}: {children: ReactNode}) {
  return (
    <div className={styles.vigHead}>
      <span className={styles.vigDot} />
      {children}
    </div>
  );
}

function ChatVignette() {
  return (
    <>
      <VigHead>Telegram · Alfred</VigHead>
      <div className={styles.miniChat}>
        <p className={styles.mcMe}>
          <Translate id="home4.vig.chat.me1">
            Note this: pricing page by next Wednesday. And have someone check the login bug.
          </Translate>
        </p>
        <p className={styles.mcAl}>
          <Translate id="home4.vig.chat.al1">
            Noted. Pricing page is with the web team; login bug is with prod-debug. I'll ping you.
          </Translate>
        </p>
        <span className={styles.mcGap}>
          <Translate id="home4.vig.chat.gap">—— two hours later ——</Translate>
        </span>
        <p className={styles.mcAl}>
          <Translate id="home4.vig.chat.al2">Login bug fixed; pricing draft preview tomorrow morning.</Translate>
        </p>
      </div>
    </>
  );
}

function BoardVignette() {
  return (
    <>
      <VigHead>
        <Translate id="home4.vig.board.header">Board · This week</Translate>
      </VigHead>
      <div className={styles.miniBoard}>
        <div className={styles.mbCol}>
          <div className={styles.mbT}>
            <Translate id="home4.vig.board.todo">To do</Translate>
          </div>
          <div className={styles.mbCard}>
            <Translate id="home4.vig.board.pricingCopy">Pricing copy</Translate>
            <br />
            <span className={styles.chip}>gtm</span>
          </div>
          <div className={styles.mbCard}>
            <Translate id="home4.vig.board.expenseReport">Expense report</Translate>
          </div>
        </div>
        <div className={styles.mbCol}>
          <div className={styles.mbT}>
            <Translate id="home4.vig.board.doing">Doing</Translate>
          </div>
          <div className={styles.mbCard}>
            <Translate id="home4.vig.board.loginBug">Login bug fix</Translate>
            <br />
            <span className={styles.chip}>prod</span>
          </div>
        </div>
        <div className={styles.mbCol}>
          <div className={styles.mbT}>
            <Translate id="home4.vig.board.done">Done</Translate>
          </div>
          <div className={styles.mbCard}>
            <Translate id="home4.vig.board.blogShipped">Blog shipped</Translate>
          </div>
          <div className={styles.mbCard}>
            <Translate id="home4.vig.board.weeklyReport">Weekly report</Translate>
          </div>
        </div>
      </div>
    </>
  );
}

function KgNode({x, y, kind, label, hub}: {x: string; y: string; kind: ReactNode; label: ReactNode; hub?: boolean}) {
  return (
    <div className={hub ? styles.kgHub : styles.kgNode} style={{left: x, top: y}}>
      <span className={styles.kgKind}>{kind}</span>
      {label}
    </div>
  );
}

function KnowledgeVignette() {
  return (
    <>
      <VigHead>
        <Translate id="home4.vig.kg.header">Knowledge · Graph</Translate>
      </VigHead>
      <div className={styles.kg}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <line className={styles.kgHot} x1="50" y1="46" x2="20" y2="16" />
          <line className={styles.kgHot} x1="50" y1="46" x2="80" y2="22" />
          <line className={styles.kgHot} x1="50" y1="46" x2="76" y2="74" />
          <line className={styles.kgHot} x1="50" y1="46" x2="22" y2="72" />
          <line className={styles.kgLine} x1="22" y1="72" x2="80" y2="22" />
          <line className={styles.kgLine} x1="20" y1="16" x2="80" y2="22" />
          <line className={styles.kgLine} x1="76" y1="74" x2="92" y2="92" />
          <line className={styles.kgLine} x1="22" y1="72" x2="8" y2="90" />
          <line className={styles.kgLine} x1="20" y1="16" x2="6" y2="6" />
        </svg>
        <KgNode
          hub
          x="50%"
          y="46%"
          kind={<Translate id="home4.vig.kg.kindNote">Note</Translate>}
          label={<Translate id="home4.vig.kg.hub">Release process v2</Translate>}
        />
        <KgNode
          x="20%"
          y="16%"
          kind={<Translate id="home4.vig.kg.kindTask">Task</Translate>}
          label={<Translate id="home4.vig.kg.n1">k8s deploy checklist</Translate>}
        />
        <KgNode
          x="80%"
          y="22%"
          kind={<Translate id="home4.vig.kg.kindDecision">Decision</Translate>}
          label={<Translate id="home4.vig.kg.n2">Blue-green deploy</Translate>}
        />
        <KgNode
          x="76%"
          y="74%"
          kind={<Translate id="home4.vig.kg.kindTask">Task</Translate>}
          label={<Translate id="home4.vig.kg.n3">Pricing page launch</Translate>}
        />
        <KgNode
          x="22%"
          y="72%"
          kind={<Translate id="home4.vig.kg.kindNote">Note</Translate>}
          label={<Translate id="home4.vig.kg.n4">Server migration</Translate>}
        />
        <div className={styles.kgDot} style={{left: '92%', top: '92%'}} />
        <div className={styles.kgDot} style={{left: '8%', top: '90%'}} />
        <div className={styles.kgDot} style={{left: '6%', top: '6%'}} />
      </div>
    </>
  );
}

function FinRow({cat, label, amt, pos}: {cat: ReactNode; label: ReactNode; amt: string; pos?: boolean}) {
  return (
    <div className={styles.finRow}>
      <span className={styles.finCat}>{cat}</span>
      <span>{label}</span>
      <span className={`${styles.finAmt} ${pos ? styles.finPos : ''}`}>{amt}</span>
    </div>
  );
}

function FinanceVignette() {
  return (
    <>
      <VigHead>
        <Translate id="home4.vig.fin.header">Ledger · July</Translate>
      </VigHead>
      <div className={styles.miniFin}>
        <FinRow
          cat={<Translate id="home4.vig.fin.travel">Travel</Translate>}
          label={<Translate id="home4.vig.fin.taxi">Taxi</Translate>}
          amt="−¥38.00"
        />
        <FinRow
          cat={<Translate id="home4.vig.fin.subs">Subs</Translate>}
          label={<Translate id="home4.vig.fin.server">Server</Translate>}
          amt="−$12.00"
        />
        <FinRow
          cat={<Translate id="home4.vig.fin.food">Food</Translate>}
          label={<Translate id="home4.vig.fin.lunch">Team lunch</Translate>}
          amt="−¥216.00"
        />
        <FinRow
          cat={<Translate id="home4.vig.fin.income">Income</Translate>}
          label={<Translate id="home4.vig.fin.consulting">Consulting</Translate>}
          amt="+$800.00"
          pos
        />
        <div className={styles.finSum}>
          <Translate id="home4.vig.fin.net">Net this month</Translate>
          <span className={styles.finSumAmt}>+$495.20</span>
        </div>
      </div>
    </>
  );
}

function AgentKid({role, name, status}: {role: string; name: ReactNode; status: ReactNode}) {
  return (
    <div className={styles.agKid}>
      <span className={styles.agR}>{role}</span>
      {name}
      <br />
      <span className={styles.agS}>{status}</span>
    </div>
  );
}

function AgentsVignette() {
  return (
    <>
      <VigHead>
        <Translate id="home4.vig.ag.header">Agent orchestration</Translate>
      </VigHead>
      <div className={styles.miniAgents}>
        <span className={styles.agRoot}>🎩 Alfred</span>
        <div className={styles.agKids}>
          <AgentKid
            role="dev"
            name={<Translate id="home4.vig.ag.web">Web team</Translate>}
            status={<Translate id="home4.vig.ag.webStatus">Doing · pricing</Translate>}
          />
          <AgentKid role="ops" name="prod-debug" status={<Translate id="home4.vig.ag.opsStatus">Done · login bug</Translate>} />
          <AgentKid
            role="content"
            name={<Translate id="home4.vig.ag.writer">Blog writer</Translate>}
            status={<Translate id="home4.vig.ag.standby">Standing by</Translate>}
          />
          <AgentKid
            role="finance"
            name={<Translate id="home4.vig.ag.bookkeeper">Bookkeeper</Translate>}
            status={<Translate id="home4.vig.ag.standby2">Standing by</Translate>}
          />
        </div>
      </div>
    </>
  );
}

// --- Hero: five rotating angles, copy and stage in sync ---

type Slide = {key: string; t1: ReactNode; t2: ReactNode; sub: ReactNode; tab: ReactNode; Vignette: () => ReactNode};

// Built inside a hook, not at module scope, so the Translate ids stay statically extractable.
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
      Vignette: ChatVignette,
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
      Vignette: BoardVignette,
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
      Vignette: KnowledgeVignette,
    },
    {
      key: 'finance',
      t1: <Translate id="home4.slide.finance.t1">Say it once,</Translate>,
      t2: <Translate id="home4.slide.finance.t2">and it's booked.</Translate>,
      sub: (
        <Translate id="home4.slide.finance.sub">
          "Taxi, $6" — categorized, booked, rolled into your monthly summary. Alfred does it in passing.
        </Translate>
      ),
      tab: <Translate id="home4.tab.finance">Finance</Translate>,
      Vignette: FinanceVignette,
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
      Vignette: AgentsVignette,
    },
  ];
}

const ROTATE_MS = 5000;

function HeroSection() {
  const slides = useSlides();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), ROTATE_MS);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  const slide = slides[index];
  const Vignette = slide.Vignette;

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
        <div className={styles.ctas}>
          <Link className={styles.btnPrimary} to="/docs/intro">
            <Translate id="home4.hero.ctaPrimary">Get started with Alfred</Translate>
          </Link>
          <Link className={styles.btnGhost} to="/alfred">
            <Translate id="home4.hero.ctaMeet">Meet Alfred →</Translate>
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
            <Vignette />
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

// --- CTA ---
function CtaSection() {
  return (
    <section className={styles.ctaBand}>
      <div className={styles.wrap}>
        <h2>
          <Translate id="home4.cta.title">Starting today, hand it to Alfred.</Translate>
        </h2>
        <Link className={styles.btnPrimary} to="/docs/intro">
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
        <CtaSection />
      </main>
    </Layout>
  );
}
