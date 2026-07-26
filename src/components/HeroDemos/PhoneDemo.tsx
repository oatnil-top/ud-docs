import {useState, type CSSProperties} from 'react';
import Translate, {translate} from '@docusaurus/Translate';

import styles from './PhoneDemo.module.css';

/**
 * Alfred chat playback demo. Extracted from /alfred (task b00f9e8f) so the
 * homepage hero stage shows the same simulation instead of a screenshot.
 * `frameless` drops the figure's own border/shadow for use inside the stage
 * frame. Translate ids stay under alfredp.phone.* — they predate the move and
 * the ZH translations key on them.
 */
export default function PhoneDemo({frameless = false}: {frameless?: boolean}) {
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
    <figure className={frameless ? `${styles.phone} ${styles.frameless}` : styles.phone}>
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
