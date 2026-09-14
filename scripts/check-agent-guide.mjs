// Gate: is static/agent-setup/guide.md still the go-backend ud-guide.md it
// claims to be a copy of? (task 15455d96)
//
// guide.md is a GENERATED copy — the source lives in the (private, sibling)
// monorepo at go-backend/internal/domain/core/skill/builtin/ud-guide.md and
// auto/sync-agent-guide.sh regenerates it with a 4-line provenance stamp.
//
// Three explicit states, because "passed" and "never ran" must never share an
// output (the go-test twin of this gate measurably fails that bar — its skips
// are invisible in plain output and the test cache can even mask a would-be
// FAIL; see builtin_sync_test.go in ud-cli):
//   agent-guide gate: OK            — copies match, exit 0
//   agent-guide gate: DRIFT         — they differ, exit 1 (fails the build)
//   agent-guide gate: CANNOT-CHECK  — no monorepo beside this checkout
//                                     (Cloudflare Workers Builds clones only
//                                     this repo), exit 0 but says so loudly.
//
// This is fast local feedback. The LOAD-BEARING gate is the monorepo's
// auto/verify-release-surfaces.sh agent-guide surface, which compares what
// udctl.com actually serves.
//
// Editing the corpus content? The edit duty (sync + rerun the six-question
// result probe) is pinned next to the source:
// go-backend/internal/domain/core/skill/builtin/WEBSITE-CORPUS.md.
import {readFileSync, existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const copyPath = join(here, '..', 'static', 'agent-setup', 'guide.md');
const srcPath = join(here, '..', '..', 'go-backend', 'internal', 'domain', 'core', 'skill', 'builtin', 'ud-guide.md');

if (!existsSync(srcPath)) {
  console.log(`agent-guide gate: CANNOT-CHECK — no monorepo checkout beside this repo (${srcPath}); drift NOT checked`);
  process.exit(0);
}
if (!existsSync(copyPath)) {
  console.error('agent-guide gate: DRIFT — static/agent-setup/guide.md is missing; run auto/sync-agent-guide.sh in the monorepo');
  process.exit(1);
}

const src = readFileSync(srcPath, 'utf8');
// Strip the 4-line provenance stamp (3 comment lines + 1 blank line).
const copy = readFileSync(copyPath, 'utf8').split('\n').slice(4).join('\n');

if (copy === src) {
  console.log('agent-guide gate: OK — static/agent-setup/guide.md matches go-backend ud-guide.md');
  process.exit(0);
}
console.error('agent-guide gate: DRIFT — static/agent-setup/guide.md differs from go-backend ud-guide.md; run auto/sync-agent-guide.sh and commit the result');
process.exit(1);
