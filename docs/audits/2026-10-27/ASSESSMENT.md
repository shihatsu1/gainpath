# GainPath repository assessment, 27 October 2026

Findings F1–F19 as supplied with the 27 October assessment, summarised from the
text provided; F20 was added afterwards. Phase and test coverage is tracked in
the final report of the remediation pass. Earlier audit: `docs/audits/2026-10-16/`.

## What was checked
- `test:units` 301/301 and `test:worker` passed. The WebKit suites could not run
  in the assessor's container (Playwright build 1228 expected, 1243 present).
- Live: old and new Pages URLs, plus a CORS preflight to the deployed worker.
- Browser probes (Chromium, 375×812, service worker blocked): cold start,
  onboarding to first workout, a seeded 40-session user on every tab, six kinds of
  damaged storage, a ja-UI crawl for English text, tap-target sizes.
- Not checked: a real iPhone, VoiceOver, WebKit, the EmailJS domain allowlist,
  and whether the `jedmangubat` GitHub username is taken.

## P0
- **F1. The domain move cut off every existing user and may leave their data
  open to whoever takes the old name.** `jedmangubat.github.io/gainpath/` is 404,
  `shihatsu1.github.io/gainpath/` is 200. Storage is per origin, so workouts
  logged before the move stay on the old origin. Old installs run frozen from
  their service-worker cache. If someone registers `jedmangubat` and publishes
  `/gainpath/`, every old install loads that page first (navigation is
  network-first) and it could read localStorage and replace `sw.js`. Canonical
  link, og tags, JSON-LD, sitemap, guides, marketing still named the old host.
- **F2. Analytics and email sign-ups rejected since the move.**
  `analytics-worker/src/index.js` allowed only the old origin; every `/e` event
  and `/lead` got 403. No check tied the worker's origin to the app's.
- **F3. Each release makes every phone download 281 MB.** `sw.js` install
  precaches the 221 PNGs in `EX_IMAGE_URLS` (281.2 MB) inside `waitUntil`; every
  `CACHE_NAME` bump re-downloads them and the new worker cannot activate until
  done. The 838 newer images are WebP (~56 KB); the PNGs average ~1.27 MB.
- **F4. One bad record strands a set-up user on onboarding.** `gp_wip` with
  `sd:"oops"`, `exi` past the end of `sd`, and `gp_h = [null, {exercises:"bad"}]`
  all throw after `ss('ob')` has run; `main.js` has no barrier.

## P1
- **F5.** Beginners always get the 5-day bro split (`onboarding.js:14`).
- **F6.** ja/ko still show English: split suggestion/names/descriptions, rest-screen
  heading and exercise name, some aria-labels, pyramid text, "Save day", backup
  status lines after a language switch. No test crawls the rendered ja/ko UI.
- **F7.** Home "Last:" uses array position, not the newest `dk`, and prints the
  stored locale date instead of `fmtDk()`.
- **F8.** Workout-row tap targets 26×26 (steppers, plate, delete) and 41×30 (Log)
  at 375px.
- **F9.** Navigation and same-origin scripts are network-first with no timeout.
- **F10.** Home has three competing primary actions.
- **F11.** Startup loads 3.2 MB of exercise text for all three languages.
- **F12.** Analytics has no off switch; honour Global Privacy Control.

## P2
- **F13.** Pages publishes the whole repo (brag-output, marketing, audits, notes,
  scripts); `.git` is 333 MB (assessor), `brag-output/brag.*` tracked though ignored.
- **F14.** No CI; Playwright version drift; no `executablePath` fallback.
- **F15.** Stale docs: `feature-backlog-review.txt`, pre-split line table in
  `docs/index-section-map.md`, hand-copied `AGENTS.md`, "dark mode" in
  `menu_prefs_sub`.
- **F16.** e1RM: Epley gives w×1.033 for a single; unreliable above ~12 reps.
  Needs `known('Bn')` and approval, not a silent fix.
- **F17.** Opening Settings from PRs leaves the PRs tab highlighted.
- **F18.** Workout image takes ~40% of the viewport on every exercise.
- **F19.** The 16 October manual checks (VoiceOver, 200% text, keyboard, installed
  offline) are still open.

## Added after the assessment
- **F20. No way to change the weekly workout target.** `CFG.freq` is set only in
  onboarding (`js/onboarding.js`); Settings can change the split but not the
  target. `weekTarget(wk)` applies the current `CFG.freq` to every past week, so
  a naive control would rewrite past streaks and "perfect week" badges. Chosen
  fix: a dated log (`CFG.freqLog`), phase 4.

## Order
F1+F2 today; F4; F3. F6, F7, F9 local fixes with tests. F5, F8, F10, F16 need a
product decision first. Then F11–F15.
