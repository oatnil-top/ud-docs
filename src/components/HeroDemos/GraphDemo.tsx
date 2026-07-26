import {useRef, useState, type PointerEvent} from 'react';
import Translate from '@docusaurus/Translate';

import shared from './demos.module.css';
import styles from './GraphDemo.module.css';

/**
 * Knowledge-graph simulation for the homepage hero stage (task b00f9e8f):
 * tasks/notes as nodes linked into one graph, draggable with pointer events
 * (works for mouse and touch — touch-action is disabled on the svg). Node
 * positions live in state; edges follow. Fixed viewBox, coordinates mapped
 * through the rendered rect so dragging stays accurate at any stage width.
 */

type Node = {id: string; x: number; y: number; label: string; hub?: boolean};

const VB_W = 460;
const VB_H = 360;

const INITIAL: Node[] = [
  {id: 'ud', x: 232, y: 186, label: 'UnDercontrol', hub: true},
  {id: 'pricing', x: 110, y: 84, label: 'Pricing page'},
  {id: 'login', x: 352, y: 76, label: 'Login bug'},
  {id: 'meeting', x: 84, y: 274, label: 'Meeting notes'},
  {id: 'release', x: 368, y: 286, label: 'Release v0.120'},
  {id: 'blog', x: 236, y: 52, label: 'Blog draft'},
];

const EDGES: Array<[string, string]> = [
  ['ud', 'pricing'],
  ['ud', 'login'],
  ['ud', 'meeting'],
  ['ud', 'release'],
  ['ud', 'blog'],
  ['pricing', 'blog'],
  ['login', 'release'],
];

export default function GraphDemo() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState<Node[]>(INITIAL);
  // Dragged node id + pointer offset from the node center, in viewBox units.
  const drag = useRef<{id: string; dx: number; dy: number} | null>(null);

  const toViewBox = (e: PointerEvent) => {
    const r = svgRef.current!.getBoundingClientRect();
    return {x: ((e.clientX - r.left) * VB_W) / r.width, y: ((e.clientY - r.top) * VB_H) / r.height};
  };

  const onPointerDown = (e: PointerEvent, node: Node) => {
    (e.target as Element).setPointerCapture(e.pointerId);
    const p = toViewBox(e);
    drag.current = {id: node.id, dx: node.x - p.x, dy: node.y - p.y};
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!drag.current) return;
    const p = toViewBox(e);
    const {id, dx, dy} = drag.current;
    const x = Math.min(VB_W - 20, Math.max(20, p.x + dx));
    const y = Math.min(VB_H - 20, Math.max(20, p.y + dy));
    setNodes((cur) => cur.map((n) => (n.id === id ? {...n, x, y} : n)));
  };

  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div className={shared.fill}>
      <div className={shared.head}>
        <span className={shared.title}>UD · Knowledge graph</span>
        <span className={shared.hint}>
          <Translate id="demo.graph.hint">drag the nodes</Translate>
        </span>
      </div>
      <div className={shared.body}>
        <svg
          ref={svgRef}
          className={styles.svg}
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="xMidYMid meet"
          onPointerMove={onPointerMove}
          onPointerUp={() => (drag.current = null)}
          onPointerCancel={() => (drag.current = null)}>
          {EDGES.map(([a, b]) => (
            <line
              key={`${a}-${b}`}
              x1={byId[a].x}
              y1={byId[a].y}
              x2={byId[b].x}
              y2={byId[b].y}
              className={styles.edge}
            />
          ))}
          {nodes.map((n) => (
            <g key={n.id} className={styles.node} onPointerDown={(e) => onPointerDown(e, n)}>
              <circle cx={n.x} cy={n.y} r={n.hub ? 13 : 8} className={n.hub ? styles.hubDot : styles.dot} />
              <text x={n.x} y={n.y + (n.hub ? 32 : 24)} textAnchor="middle" className={styles.label}>
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
