import {useState} from 'react';
import Translate from '@docusaurus/Translate';

import shared from './demos.module.css';
import styles from './AgentsDemo.module.css';

/**
 * Agent-team simulation for the homepage hero stage (task b00f9e8f): a roster
 * of specialist agents; clicking one flips the detail panel to its role and
 * latest activity. Alfred leads the list — he is the head butler who routes
 * work to the others, matching the architecture story further down the page.
 */

type Agent = {
  id: string;
  emoji: string;
  name: string;
  role: string;
  blurb: string;
  activity: string;
};

const AGENTS: Agent[] = [
  {
    id: 'alfred',
    emoji: '🎩',
    name: 'Alfred',
    role: 'Head butler',
    blurb: 'Understands your messages, remembers context, hands work to the right specialist.',
    activity: 'Delegated "login bug" to ud · 11:51',
  },
  {
    id: 'ud',
    emoji: '💻',
    name: 'ud',
    role: 'Dev agent',
    blurb: 'Ships features end-to-end: code, tests, commit, report.',
    activity: 'Fixed login bug, fix verified · 13:42',
  },
  {
    id: 'infra-ops',
    emoji: '🔧',
    name: 'infra-ops',
    role: 'Ops agent',
    blurb: 'Watches deploys, servers and certificates so you never have to.',
    activity: 'Deployed v0.120 to prod · Tue',
  },
  {
    id: 'blog-writer',
    emoji: '✍️',
    name: 'blog-writer',
    role: 'Writing agent',
    blurb: 'Turns finished work into release notes and blog drafts.',
    activity: 'Drafted v0.120 release notes · Mon',
  },
];

export default function AgentsDemo() {
  const [activeId, setActiveId] = useState('alfred');
  const active = AGENTS.find((a) => a.id === activeId)!;

  return (
    <div className={shared.fill}>
      <div className={shared.head}>
        <span className={shared.title}>UD · Agent team</span>
        <span className={shared.hint}>
          <Translate id="demo.agents.hint">click an agent</Translate>
        </span>
      </div>
      <div className={`${shared.body} ${styles.split}`}>
        <div className={styles.roster} role="tablist" aria-label="Agents">
          {AGENTS.map((agent) => (
            <button
              key={agent.id}
              type="button"
              role="tab"
              aria-selected={agent.id === activeId}
              className={agent.id === activeId ? `${styles.item} ${styles.itemOn}` : styles.item}
              onClick={() => setActiveId(agent.id)}>
              <span className={styles.emoji} aria-hidden="true">
                {agent.emoji}
              </span>
              <span className={styles.itemText}>
                <span className={styles.itemName}>{agent.name}</span>
                <span className={styles.itemRole}>{agent.role}</span>
              </span>
              <span className={styles.online} aria-hidden="true" />
            </button>
          ))}
        </div>
        <div key={active.id} className={styles.detail}>
          <div className={styles.detailName}>
            {active.emoji} {active.name}
          </div>
          <div className={styles.detailRole}>{active.role} · online</div>
          <p className={styles.detailBlurb}>{active.blurb}</p>
          <div className={styles.detailActivityLabel}>Last activity</div>
          <div className={styles.detailActivity}>{active.activity}</div>
        </div>
      </div>
    </div>
  );
}
