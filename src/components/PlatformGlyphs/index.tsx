import {type ReactNode} from 'react';

import styles from './styles.module.css';

/**
 * The one drawn icon set for our seven access surfaces.
 *
 * Shared by the homepage hero tile row (src/pages/index.tsx) and the download
 * page's platform census (src/pages/download.tsx) — it used to live inside
 * download.tsx, and the copy that grew on the homepage drifted from it the
 * moment the homepage redrew two glyphs. One definition, two consumers.
 *
 * DRAWN, NOT VENDOR MARKS — and that is a licence fact, not a style
 * preference. Three of the seven (Desktop / Web / Terminal) are CATEGORIES and
 * have no mark to hang; of the rest, Apple and Microsoft both forbid third
 * parties from using their logos outright, and the Chrome Web Store badge is a
 * horizontal button whose terms require it to link to the store listing — it
 * belongs on the download page, not in a 6.4%-wide square. Android's robot is
 * usable under CC-BY 3.0 but Google separately requires brand-team approval
 * (about a week's turnaround) plus an attribution line, so it is not a
 * drop-in. Drawing all seven also makes them read as one product rather than
 * seven third-party integrations. Full clause-by-clause table: ud task
 * d9f0567c, round 4/5.
 *
 * One 24 grid, 1.5 stroke, square caps, no fills. Inline + currentColor: no
 * icon dependency, and both themes come free.
 *
 * iOS and Android used to share one phone body differing only in what sat at
 * the bottom of the screen, which made the two tiles unreadable side by side.
 * They now differ in outline: iOS is an empty phone (earpiece + home bar),
 * Android is the same body with a download arrow through the screen — and that
 * arrow is a fact about the product, not a shape picked to break the tie: our
 * Android build ships as a direct APK download (see the ANDROID_APK_URL
 * section on the download page), while iOS installs through TestFlight.
 */
export function PlatformGlyphDefs(): ReactNode {
  return (
    <svg className={styles.defs} aria-hidden="true">
      <defs>
        <g id="ud-g-desktop">
          <rect x="2.75" y="4.75" width="18.5" height="12.5" />
          <path d="M12 17.25V20M8.5 20h7" />
        </g>
        <g id="ud-g-web">
          <rect x="2.75" y="3.75" width="18.5" height="16.5" />
          <path d="M2.75 8.25h18.5M5.75 6h1M8.75 6h1" />
        </g>
        <g id="ud-g-ios">
          <rect x="6.75" y="2.75" width="10.5" height="18.5" />
          <path d="M10.25 5.25h3.5M10.5 18.75h3" />
        </g>
        <g id="ud-g-android">
          <rect x="6.75" y="2.75" width="10.5" height="18.5" />
          <path d="M12 7v6.5M9.5 11l2.5 2.5L14.5 11M9.5 16.75h5" />
        </g>
        <g id="ud-g-chat">
          <rect x="2.75" y="4.75" width="18.5" height="11.5" />
          <path d="M7.5 16.25v4.5l4.5-4.5" />
        </g>
        <g id="ud-g-cli">
          <rect x="2.75" y="4.75" width="18.5" height="14.5" />
          <path d="M6.5 9.5l3 2.5-3 2.5M12.5 14.5h5" />
        </g>
        <g id="ud-g-ext">
          <path d="M3 4.75h13.5v4.5H21v5.5h-4.5v4.5H3z" />
        </g>
      </defs>
    </svg>
  );
}

/**
 * One glyph. `className` carries the size — the two consumers draw at
 * different scales (22px on the download page, a share of the hero width on
 * the homepage), so the size never lives here.
 */
export function PlatformGlyph({id, className}: {id: string; className?: string}): ReactNode {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      aria-hidden="true">
      <use href={`#${id}`} />
    </svg>
  );
}
