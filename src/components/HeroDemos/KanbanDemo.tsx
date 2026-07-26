import {useState, type DragEvent} from 'react';
import Translate from '@docusaurus/Translate';

import shared from './demos.module.css';
import styles from './KanbanDemo.module.css';

/**
 * Mini kanban simulation for the homepage hero stage (task b00f9e8f): three
 * columns of demo cards, movable via native HTML5 drag-and-drop. Touch
 * devices see a static board — the drag affordance is best-effort, the board
 * itself is the message. Demo data is intentionally English-only (promo
 * surfaces are all-English) and mirrors the Alfred chat storyline.
 */

type Card = {id: string; title: string; tag: string};
type Col = {key: string; title: string; cards: Card[]};

const INITIAL: Col[] = [
  {
    key: 'todo',
    title: 'To Do',
    cards: [
      {id: 'pricing', title: 'Pricing page copy', tag: 'web'},
      {id: 'blog', title: 'Release blog draft', tag: 'writing'},
      {id: 'invoices', title: 'Send Q3 invoices', tag: 'ops'},
    ],
  },
  {
    key: 'doing',
    title: 'In Progress',
    cards: [{id: 'login', title: 'Fix login bug', tag: 'backend'}],
  },
  {
    key: 'done',
    title: 'Done',
    cards: [{id: 'deploy', title: 'Deploy v0.120', tag: 'release'}],
  },
];

export default function KanbanDemo() {
  const [cols, setCols] = useState<Col[]>(INITIAL);
  const [dragId, setDragId] = useState<string | null>(null);
  const [overCol, setOverCol] = useState<string | null>(null);

  const onDragStart = (e: DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
    setDragId(id);
  };

  const onDrop = (e: DragEvent, colKey: string) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    setOverCol(null);
    setDragId(null);
    if (!id) return;
    setCols((cur) => {
      const card = cur.flatMap((c) => c.cards).find((c) => c.id === id);
      if (!card) return cur;
      return cur.map((c) => {
        const rest = c.cards.filter((k) => k.id !== id);
        return c.key === colKey ? {...c, cards: [...rest, card]} : {...c, cards: rest};
      });
    });
  };

  return (
    <div className={shared.fill}>
      <div className={shared.head}>
        <span className={shared.title}>UD · Board</span>
        <span className={shared.hint}>
          <Translate id="demo.kanban.hint">drag a card</Translate>
        </span>
      </div>
      <div className={`${shared.body} ${styles.board}`}>
        {cols.map((col) => (
          <div
            key={col.key}
            className={overCol === col.key ? `${styles.col} ${styles.colOver}` : styles.col}
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'move';
            }}
            onDragEnter={() => setOverCol(col.key)}
            onDragLeave={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setOverCol(null);
            }}
            onDrop={(e) => onDrop(e, col.key)}>
            <div className={styles.colTitle}>
              {col.title} <span className={styles.count}>{col.cards.length}</span>
            </div>
            {col.cards.map((card) => (
              <div
                key={card.id}
                className={dragId === card.id ? `${styles.card} ${styles.cardDragging}` : styles.card}
                draggable
                onDragStart={(e) => onDragStart(e, card.id)}
                onDragEnd={() => {
                  setDragId(null);
                  setOverCol(null);
                }}>
                {card.title}
                <span className={styles.tag}>{card.tag}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
