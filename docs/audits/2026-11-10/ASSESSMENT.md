# GainPath assessment, 10 November 2026 (v2.14.2)

Third audit. Earlier: `docs/audits/2026-10-16/`, `docs/audits/2026-10-27/` (F1–F20).
This pass adds a security test (tools plus a hostile-backup probe), re-checks F1–F20,
and tries four ways of turning the 3-panel exercise pictures into loops.
Nothing in the app was changed. New findings are numbered G1–G13.

## What was run

| Check | Result |
|---|---|
| `npm run precheck` (lint, units, data, a11y, i18n, sw, worker, visual-check) | **passed**, all 8 steps, 143 s |
| `npm run test:i18n` | 12/12 passed |
| `npm run simulate` | no invariant violations in 300 iterations (seed -1022395998) |
| `npm run chaos` | **failed**: 6 console errors, WebKit only, "resource responded 403"; Chromium clean. Which request is not identified yet (G13). Replay: `SEED=-1022352965 npm run chaos` |
| `npm run measure:startup` | throttled baseline: interactive in 2.57 s, 465 KB transferred, 24 requests; 146 KB of that is exercise text (1.86 s without it) |
| gitleaks, 154 commits | no secrets in history. One hit in the working folder: `analytics-worker/.dev.vars` (ignored, never committed) |
| semgrep `p/javascript` `p/xss` `p/security-audit`, 90 rules, 31 files | 0 findings (it cannot parse `?.` on 4 lines of `js/math.js`; those lines hold no HTML) |
| eslint-plugin-no-unsanitized (Mozilla) | 55 HTML sinks it cannot prove safe; used as the map for the probe below |
| retire.js on `vendor/` | nothing recognised |
| npm audit | root: 45 advisories (3 critical, 19 high), all in the Appium / WebdriverIO dev tools (already accepted in CLAUDE.md). `analytics-worker`: 4 high in wrangler / miniflare / undici / sharp (dev and deploy tooling, not the deployed worker code) |
| zizmor on the two workflows | 6 high: actions pinned to a tag, not a commit hash. 2 medium: checkout keeps credentials |
| Hostile-backup probe (own Playwright script, Chromium + WebKit, 20 screens) | **injection found**, see G1–G3. A planted unsafe sink was detected first, so the detector works |
| OWASP ZAP baseline | not run: needs Docker, which is not installed |
| Live site | headers read only. No active scan of github.io, and the live worker was never contacted |

Not checked: a real iPhone, VoiceOver, the deployed worker's settings (is the rate limiter
on?), the EmailJS domain allowlist.

## P0

- **G1. The old GitHub name `jedmangubat` is free for anyone to register.**
  `api.github.com/users/jedmangubat` returns 404; the account is now `shihatsu1` and GitHub
  only redirects the old repo address until someone takes the name. The 27 October audit
  left this unchecked. Whoever registers it can publish `jedmangubat.github.io/gainpath/` and then:
  (a) serve their page to every phone still on the old address (and read the workouts stored
  there); (b) pass the new app's migration check, which trusts that origin
  (`MIGRATE_FROM`, `js/data-safety.js:130`), and with G2 run script in the real app after one
  "OK"; (c) send counts to the worker, which also allows that origin
  (`analytics-worker/src/index.js:12`); (d) receive `git fetch` / `git pull` from this
  folder, because the remote still says `github.com/jedmangubat/gainpath.git`.
  You chose earlier to skip reclaiming the name; (b) and (d) are new.
  Fix: point the remote at `shihatsu1/gainpath` (one command). Then either hold the name
  (create a free GitHub organisation called `jedmangubat`) or remove the old origin from the
  receiver and the worker allowlist. Size: small.

## P1

- **G2. A backup file can run script in the app (stored XSS through Import).** Proven in
  Chromium and WebKit: restoring a crafted file ran script on Home with no further tap and
  read `gp_cfg`. Cause: a custom program day's `icon` and `color` go into
  `class="…"` and `style="…"` without `esc()` (`js/history.js:121`, `:139`, `:405`, values set
  in `syncProgramMeta()`, `js/settings.js:182`). `sanitizeImport()` removes only `<` and `>`,
  so a `"` ends the attribute and an `onanimationstart=` handler follows. Reach: a user must
  import a file someone gave them ("try my program"), or G1(b). Impact: read, change or
  erase everything stored, and send it out (there is no Content-Security-Policy).
  Fix: `esc()` at those three sinks; in `validateBackup()` allow `color` only as `#hex` and
  `icon` only as `ti-[a-z0-9-]+`; add the probe to `test:data`. Size: small.
- **G3. Same class, needs one tap: a custom exercise's muscle group.** `mg` is written into
  `onclick="pickSwapPart('…')"` without `jsArg()` (`js/day-edit.js:336`) and into
  `<option value="…">` (`:355`). A file with `mg: "chest');…//"` runs on tapping that button.
  Fix: `jsArg(mg)` / `esc(mg)`, and reject an unknown `mg` on import. Size: small.

## P2

- **G4. Many sinks trust stored values that Import happens to clean.** With the same
  payloads written straight to storage (not an attacker route today), script ran on Climb
  body, Settings → equipment, day editor, workout: `CFG.unit` (`js/settings.js:40`, the set
  row unit, the suggestion chip), weigh-in rows (`js/climb.js:157`), machine names in
  Settings, day-editor sub-lines. One missed path to storage makes each of these live.
  Fix: escape at the sink and check enums (`unit`, `sex`, `exp`, `lang`, set type) on load.
- **G5. No Content-Security-Policy.** Pages cannot send headers, but a `<meta>` policy with
  `script-src 'self'; script-src-attr 'unsafe-inline'; connect-src 'self'` plus the worker and
  EmailJS hosts; `object-src 'none'; base-uri 'self'` would stop injected `<script>` tags and
  limit where stolen data can be sent. It does not stop G2 by itself (inline handlers stay allowed).
- **G6. A restored file can switch on Health sync and name any Shortcut.**
  `healthSync` and `healthSyncStartShortcut` come from the backup; the next workout opens
  `shortcuts://run-shortcut?name=…` (`js/state.js:44`). It can only run a Shortcut already
  on that phone. Fix: do not restore these two fields, or ask first.
- **G7. `gp_wip` stores ready-made HTML** (`rNxHtml`, `rFbHtml`) and puts it back with
  `innerHTML` (`js/storage.js:261`). Not in backups, so not reachable from a file today.
  Fix: store the exercise name and rebuild the text.
- **G8. jsPDF 2.5.1 is behind published advisories** (fixed in 3.0.x to 4.2.1). The app calls
  only `text`, `rect`, `line`, `addPage`, `save` (`js/climb.js`), none of the affected
  features (GIF images, forms, HTML, open-in-new-window, Node file loading). Upgrade when
  convenient; not urgent.
- **G9. Worker abuse brake is optional.** The origin check is not authentication (the code
  says so): `curl` with a forged `Origin` can write one KV key per `/lead` or `/e` call. If
  the `RATE_LIMIT` binding did not deploy, a loop can use up the day's free KV writes and
  stop real counts. Check with `wrangler deployments` / the dashboard.
- **G10. Workflows:** pin the five actions to commit hashes and set
  `persist-credentials: false` on checkout (zizmor has an auto-fix).
- **G11. First visit still parses 913 KB of English exercise text** before the app starts
  (`js/exercise-text-en.js`, a plain tag); ja/ko load on demand. Offline shell is 3.9 MB
  (32 files) plus 0.5 MB of libraries; 1.5 MB of that is tutorial screenshots.
- **G12. Housekeeping.** `.git` holds a 1.31 GiB pack (old PNG history) and 22 stray `._*`
  files that git reports as garbage; the 11 manual checks from 16 October (VoiceOver, 200 %
  text, keyboard, installed offline) are all still unticked; the drive's `CLAUDE.md` still
  gives the repo as `github.com/jedmangubat/gainpath`.

- **G13. `chaos` fails in WebKit** with six "403 (Forbidden)" console errors (seed above).
  Chromium is clean. `chaos` is not part of `precheck`, so releases did not catch it. Find
  the request first; it may be a test-harness gap rather than an app fault.

## F1–F20 today

| | Status | Evidence |
|---|---|---|
| F1 domain move | **open, worse** | old site 404, name unclaimed: G1 |
| F2 analytics allowlist | closed in code | both origins listed; `test:worker` ties it to `APP_ORIGIN`. Deployment not checked |
| F3 281 MB precache | closed | `sw.js` precaches no exercise images; all 1,059 are WebP, 56.5 MB in total, fetched on first view |
| F4 bad record strands user | closed | crash barrier covered by `test:data` |
| F5 beginner split | closed | `js/onboarding.js:15`: 2–3 days Full Body, 4 Upper/Lower |
| F6 English in ja/ko | closed | `test:i18n` (result above) |
| F7 Home "Last:" | closed | v2.11.4 |
| F8 tap targets | closed | `test:a11y` measures 40×40 at four widths |
| F9 network-first, no timeout | closed | cache-first with a 2.5 s race, `test:sw` |
| F10 three primary actions | closed | one `#h-start-btn` |
| F11 3.2 MB text at start | partly | ja/ko on demand; English 913 KB still at start (G11) |
| F12 analytics off switch | closed | `analyticsOn()` honours the setting and Global Privacy Control |
| F13 whole repo published | closed | `scripts/publish_list.mjs`; 63 MB published |
| F14 no CI | closed | `precheck.yml`, `pages.yml` (G10 for hardening) |
| F15 stale docs | closed | v2.11.4 |
| F16 e1RM | closed | v2.14.0 |
| F17 tab highlight | closed | v2.11.4 |
| F18 picture height | closed | picture folds after first view (`CFG.exImgSeen`) |
| F19 manual checks | **open** | 0 of 11 ticked |
| F20 weekly target | closed | `CFG.freqLog` |

## What is in good shape

Data safety is the strongest part: every save path reports failure, unreadable keys are never
overwritten, restore keeps an Undo copy, and it is all under test in two browser engines.
The math is isolated and unit-tested. No secrets were ever committed. The app has no runtime
dependencies and nothing third-party loads at start. The published site contains only the app.

## Exercise loops from the 3-panel pictures

Samples for three exercises, four methods, in the session scratchpad (`loops/out/compare.html`).
Panels sit at exact thirds of the 1774 px width, so a fixed crop (560×856 each) works for both
border styles.

| Method | Looks | Size per exercise | × 1,059 |
|---|---|---|---|
| A. Hard flip, MP4 | exact drawings, jumpy | 61–86 KB (animated WebP 40–61 KB) | ~75 MB |
| B. Crossfade, MP4 | exact drawings, soft | 62–68 KB | ~70 MB |
| C. RIFE in-betweens (free, runs locally on this Mac), MP4 | real motion. Clean on small moves (bench press); limbs smear for 2–3 frames when a leg crosses (curtsy lunge) | 122–186 KB (animated WebP 286–444 KB) | ~160 MB |
| D. No file: the page animates the existing picture | same look as B | 0 | 0 |

- The pose order is not the same for every picture: squat is start / bottom / start (1→2→3),
  bench is top / middle / bottom (1→2→3→2), alternating lunge is stand / left / right
  (1→2→1→3). Image similarity separates the first kind only; the other two need the
  exercise name or a manual flag. A full run needs that list first.
- For the app, D costs nothing, works offline and keeps the 56.5 MB library as it is. C would
  roughly triple the picture download and needs every loop looked at for smeared frames.
- For social posts, C on hand-picked exercises is good enough to use as is.
- Not tried (paid or too big for this Mac): ToonCrafter (about 24 GB of video memory) and
  start/end-frame video services, roughly $0.30–$1.60 a clip, so $300–$1,700 for the library.

## Suggested order

1. G1: fix the git remote now; decide hold-the-name or drop-the-old-origin.
2. G2 + G3 with the probe added to `test:data` (one bug-fix release).
3. G4 + G5 + G6 + G7 as one hardening release.
4. G10, G8, G9 when convenient. F19 manual checks.
5. Loops: pick D or C after watching the samples.
