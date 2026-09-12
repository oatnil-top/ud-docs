/**
 * ud-docs entry Worker.
 *
 * The site itself is a static Docusaurus build served by Workers Static Assets.
 * This script exists for one reason: the Worker's own
 * `ud-docs.lintao-amons.workers.dev` hostname serves a second, fully public copy
 * of the same site (card 5f3e4144 — over 09-11..09-12, GA counted 13 active
 * users landing on it, mostly via old shared links). The canonical tag stops
 * Google from picking the copy, but it does not stop the copy from opening, from
 * showing up in address bars, or from splitting the traffic — so the copy is
 * redirected away permanently instead of being hidden behind robots rules.
 * Blocking indexing would not close an existing link and would cost us the
 * canonical fallback.
 *
 * Path and query are preserved: a shared deep link must land on the same page on
 * the canonical host, not on the home page.
 *
 * Anything that is not a workers.dev host falls through to the asset server
 * untouched, so 404 handling, trailing-slash handling and content types stay
 * exactly as the platform's defaults — this script deliberately re-implements
 * none of that.
 *
 * `run_worker_first` in wrangler.jsonc is what lets this run at all; without it
 * the asset server answers first and the script never sees a request for a path
 * that exists.
 *
 * oatnil.com (the pre-2026-09-12 canonical host) is NOT handled here: it is a
 * zone we own and it redirects via a Cloudflare Redirect Rule. workers.dev is
 * not a zone we own, which is why this one has to live in code.
 */

const CANONICAL_ORIGIN = 'https://udctl.com';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname.endsWith('.workers.dev')) {
      return Response.redirect(CANONICAL_ORIGIN + url.pathname + url.search, 301);
    }

    return env.ASSETS.fetch(request);
  },
};
