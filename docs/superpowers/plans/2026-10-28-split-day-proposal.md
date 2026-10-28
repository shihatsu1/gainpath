# Proposal: exercises for every day of every split

**Status: proposal only. No defaults have been changed.** This follows the F5 decision
(beginners get Full Body on 2–3 days and Upper/Lower on 4; a Push / Pull / Legs split was
added). It needs your approval before any `EX.*` list changes, because that is a coaching
change (CLAUDE.md). Every name below exists in `EXPOOL` (checked against the library).

## What the research supports (and what I did not claim)
These are the principles the proposal is built on. Per CLAUDE.md, none of them may be
quoted in a guide until it is graded in `2026-09-25-lift-sync.md`; they are listed here
as the basis for the choices, not as graded evidence.

1. **Train each muscle about twice a week.** A meta-analysis of training frequency
   (Schoenfeld, Ogborn & Krieger, 2016, *J Sports Sci*) found higher hypertrophy for
   2×/week than 1×/week once volume is equated. This is why Full Body (3×) and
   Upper/Lower (2×) suit beginners and why the 5-day Bro split, at about once a week
   per muscle, is the weakest default for them.
2. **About 10–20 hard sets per muscle per week** is the usual working range for growth,
   with more benefit up to roughly that point (dose–response meta-analysis, Schoenfeld,
   Ogborn & Krieger, 2017, *J Sports Sci*). The tallies below use 3 sets per exercise.
3. **Compound lift first, isolation last**, and cover the main movement patterns each
   week: squat, hip hinge, horizontal and vertical push and pull. The current lists have
   no hip hinge at all (only hamstring curls) and no barbell squat or row.
4. **Stretched-position work for isolation** (overhead triceps extension, incline or
   preacher curls) is increasingly supported, but the evidence is mostly short trials;
   treated here as a tiebreaker, not a rule.

## Problems with the current lists
| Issue | Where |
|---|---|
| No hip hinge (RDL, hip thrust) in any lower day; hamstrings only get a curl | `legs_*`, `lower_*`, `bro_legs`, `fullbody` |
| No barbell squat or free-weight leg compound; relies on hack squat / leg press | `legs_m`, `lower_m`, `fullbody` |
| Bro chest has 3 exercises and back 4: under 10 sets a week, once a week | `bro_chest`, `bro_back` |
| Push has no long-head triceps work (overhead) and no upper-chest/flat split beyond one press | `push_m` |
| Pull has no heavy horizontal row with free weights; rear delts and biceps get 3 of 7 slots | `pull_m` |
| Core before the main lifts (crunch and leg raise first) so it fatigues the legs | `legs_*`, `lower_*`, `fullbody` |
| Female lists differ by being dumbbell-only, not by need | `*_f` |

## Proposed lists (3 sets per exercise unless noted)

**Full Body** (3 days/week; each muscle 3×/week): Machine leg press, Dumbbell bench press,
Machine pulldown, Dumbbell Romanian deadlift, Dumbbell seated overhead press, Machine
seated cable row, Dumbbell curl, Cable bar pushdown, Forearm plank. Machines and
dumbbells first because the user is a beginner; one hinge, one squat pattern, a push and a
pull in each plane, and core last. Weekly sets per muscle ≈ 9 (chest, back, quads,
hamstrings, shoulders), 9 for arms by direct work.

**Upper / Lower** (4 days: Upper, Lower A, Upper, Lower B; the app rotates `upper`,
`lower-a`, `lower-b`):
- Upper: Dumbbell bench press, Machine pulldown, Dumbbell seated overhead press, Machine
  seated cable row, Dumbbell lateral raise, Cable bar pushdown, Dumbbell curl
- Lower A (squat day): Barbell squat, Barbell Romanian deadlift, Machine leg extension,
  Machine seated calf raises, Hanging leg raise
- Lower B (hinge/glute day): Machine leg press, Barbell hip thrust, Machine hamstring curl,
  Dumbbell forward lunge, Machine seated calf raises, Cable rope kneeling crunch

**Push / Pull / Legs** (new 3-day split, each muscle once a week; better as a 6-day PPL
run twice):
- Push: Barbell bench press, Dumbbell seated overhead press, Dumbbell incline bench press,
  Dumbbell lateral raise, Cable bar pushdown, Cable rope overhead tricep extension
- Pull: Machine pulldown, Machine seated cable row, Dumbbell single-arm row, Cable face
  pull, Dumbbell curl, Dumbbell hammer curl
- Legs: Barbell squat, Barbell Romanian deadlift, Machine leg press, Machine hamstring
  curl, Machine leg extension, Machine seated calf raises

**PPL / Upper-Lower (5-day)** uses the Push, Pull and Legs lists above plus the Upper list
and Lower A for the two extra days (chest, back and quads reach 2×/week).

**5-Day Bro Split** (kept for 5+ day beginners and anyone who picks it; each muscle once
a week, so volume is raised to compensate):
- Legs: Barbell squat, Barbell Romanian deadlift, Machine leg press, Machine hamstring
  curl, Machine seated calf raises, Machine crunch
- Chest: Barbell bench press, Dumbbell incline bench press, Dumbbell chest fly, Cable pec
  fly, Parallel bar dips
- Back: Pull-ups (or Machine pulldown), Barbell bent over row, Machine seated cable row,
  Machine pulldown, Straight arm cable pulldown
- Shoulders: Dumbbell seated overhead press, Dumbbell lateral raise, Cable face pull,
  Machine reverse fly, Barbell shrug
- Arms: Barbell curl, Cable bar pushdown, Dumbbell hammer curl, Cable rope overhead tricep
  extension, EZ bar preacher curl, Barbell close-grip bench press

**Alternating Legs / Push / Pull** keeps `legs-a` as the Legs list above and `legs-b` as
Lower B; Push and Pull as above.

## Decisions I need from you
1. **Approve, edit or reject** the lists above. If approved I change `EX.*`, update
   `EX_TIPS` coverage for any exercise that lacks it, add `test:units` checks (every day
   non-empty, compound first, each exercise exists), and release it as its own version.
2. **Beginner equipment.** Barbell squat, RDL and bench are in the proposal for
   intermediate and up. For true beginners I would substitute Dumbbell goblet squat,
   Dumbbell Romanian deadlift and Dumbbell bench press. Want a beginner variant, or one
   list for everyone?
3. **Sex-based lists (`*_m` / `*_f`).** The current split by sex isn't evidence-based.
   I recommend one list for everyone. That removes a product rule, so it's your call.
4. **Existing users.** Changing `EX.*` changes the exercises a user sees on days they
   haven't customised. Saved `customDays` and `dayPlan` are untouched; I would show a
   one-time "your plan was updated" note on Home. Is that acceptable?
