# App section map

**Since the Phase 7 split (v2.9.0) each section below is its own file under
`js/`**, loaded in this order by plain `<script src>` tags in `index.html`:

| File | Sections |
|---|---|
| `js/boot.js` | Boot constants, analytics, What's New |
| `js/exercises.js` | Splits and machine keys, exercise database, exercise pool |
| `js/exercise-text-en.js` | Exercise tips and instructions in English plus the lookup helpers; always loaded (~0.9 MB) |
| `js/exercise-text-ja.js`, `js/exercise-text-ko.js` | Japanese / Korean names, tips and instructions (~1.1 MB each), loaded on demand by `loadExText()` and precached |
| `js/state.js` | State (`CFG`, `ST`), `load()` with per-key validation (`LOAD_BAD`) |
| `js/i18n.js` | `STRINGS`, `t()` |
| `js/storage.js` | Migrations, per-store saving (`SAVE_FAILS`), pending-completion settling, IndexedDB mirror, in-progress workout |
| `js/ui-core.js` | Date/DOM helpers (`locTag`, `fmtDk`, `showDate`), `ss()` navigation, on-demand libraries (`loadLib`, `vendor/`), modal manager (`modalOpen`/`modalClose`), accessible-name linking, audio and timers |
| `js/onboarding.js` | Onboarding, tutorial |
| `js/math.js` | GAINPATH MATH |
| `js/history.js` | Suggestion chips, session editor, calendar, streaks, badges, Home |
| `js/settings.js` | Settings, custom program builder |
| `js/day-edit.js` | Day edit, swap, custom exercises |
| `js/workout.js` | Start workout, plate calculator, workout screen |
| `js/climb.js` | Climb charts, PRs, PDF report |
| `js/photos.js` | Progress photos (own IndexedDB database, added in Phase 8) |
| `js/data-safety.js` | Backups, restore, unreadable-data recovery sheet, Home banners, nudges, feedback |
| `js/main.js` | Startup sequence and service-worker registration |

## Coupling facts that matter for a split

- **Everything is one shared global scope.** There are 463 top-level
  declarations, and every section reads `CFG`, `ST`, `t()` and `gid()` freely.
- **271 inline handlers** (181 in static markup, 90 built inside JS strings)
  call **154 distinct top-level functions by bare name**.
- **13 top-level `let` bindings are reassigned** (`CFG`, `ST`, `OB`, `TUT`,
  `IDB`, `SAVE_FAILED`, `HOLD_TIMER`, `wakeLockSentinel`, `_actx`, …), about
  20 sites in all, from several different sections.
- **The tests reach in by bare name.** `test:units` alone has about 340 bare
  `CFG.`/`ST.` references inside `page.evaluate`, plus direct calls to math
  and UI functions. `simulate`, `test:data`, `visual-check`, `chaos` and
  `capture:tutorial` do the same.
- **Code that runs at load:** `emailjs.init` (guarded), `buildExercisePool()`,
  two `visibilitychange` listeners, the boot block, and the service worker
  registration. Everything else is declarations.

## Regenerate

```sh
grep -n "// ═══" js/*.js                                    # section markers
grep -nE '^(async )?function |^(const|let|var) ' js/*.js    # declarations
grep -nE '^[A-Za-z_$(\[;!]' js/*.js | grep -vE ':(async )?function |:(const|let|var) '  # load-time statements
```
