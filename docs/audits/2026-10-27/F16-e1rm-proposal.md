# F16: e1RM proposal (not applied)

`e1rm(w,r)` in `js/math.js` is Epley, `w·(1+r/30)`, rounded to 0.5.

**Problems (recorded as `known('B1')` and `known('B2')` in `test:units`):**
- **B1.** A single (`r=1`) returns `w·1.033`: a lift you actually did once is reported
  as a heavier "estimated" 1RM (100 → 103.5). A true single should be its own weight.
- **B2.** Epley is not reliable far above ~10–12 reps. A set of 20 gives `w·1.667`, which
  then feeds the Climb chart, PRs and Home.

**Proposed fix (needs your approval; no formula has been changed):**
1. `r===1` → return `w` (rounded as now).
2. For `r>12`: do not turn it into a 1RM. Return 0 in `e1rm()` (as it does for `w<=0`), so
   charts and PRs skip it. Alternative: keep the number but mark the point as an estimate in
   the chart legend. I recommend skipping, because a marked-but-plotted 25-rep estimate still
   drives the chart's shape.
3. Update the lifting guide `guides/one-rep-max.html` and its worked examples (re-run them
   through the real function), and add the reasoning to `2026-09-25-lift-sync.md`.
4. Because PRs and badges are derived from `e1rm`, call `recomputePRs()` and
   `recomputeBadges()` after the change so existing users' derived PRs update once.
   A user's rep-PR for a 20-rep set would disappear from the strength PR list.
5. Flip B1 and B2 from `known()` to real `check()` calls, and add a CHANGELOG entry.

**Impact to weigh:** existing users will see some Climb points and strength PRs change
(singles drop by 3%, very high-rep sets disappear). Both are corrections, but they are visible.
