# Phase 0 hand-off (F1, F2): what only you can do

Nothing below has been run. Do 1 first; it is time-sensitive.

## 1. Reclaim `jedmangubat` on GitHub, right now
GitHub releases a renamed username. Until someone owns it again, anyone can
register it, publish `/gainpath/`, and every old install will load their page
first (old installs fetch navigations network-first). That page could read the
old origin's localStorage (workouts, body weight, name) and replace `sw.js`.

1. Check it is still free: open `https://github.com/jedmangubat`. A 404 means free.
   (If it already exists, stop and tell me; the kit then cannot be served there
   and old installs stay frozen but cannot be hijacked by new code only if the
   owner is you.)
2. Sign out, or use a private window, and go to `https://github.com/signup`.
3. Username `jedmangubat`. Use an email that is not on `shihatsu1`, for example an
   iCloud "Hide My Email" address. Use a strong unique password from your
   password manager (I never type or see it).
4. Verify the email, then Settings → Password and authentication → turn on 2FA
   and save the recovery codes.
5. Do nothing else with it yet. It stays yours permanently; never rename it.

## 2. Publish the migration kit (after step 1)
The kit is `migration/old-origin/gainpath/{index.html,sw.js}`. It reads the old
origin's data, downloads a backup file, and hands the data to the new app through
one origin-checked message. It never deletes storage (its worker removes only
old `gainpath-*` Cache Storage entries).

1. As `jedmangubat`, create a public repo named exactly `gainpath`.
2. Put `index.html` and `sw.js` from the kit at the repo root (no other files).
3. Settings → Pages → Deploy from branch → `main` / root.
4. Wait for `https://jedmangubat.github.io/gainpath/` to answer 200.
5. Check: `curl -sI https://jedmangubat.github.io/gainpath/sw.js` returns 200.
6. On a phone with the old install, open the app while online. The old worker
   fetches the new page, then `sw.js` updates itself. Tap 1 (download), then 2.
   The new app asks before it imports; "Undo last restore" is kept.
7. Do not publish before the new app (2.11.1 or later) is live at
   `shihatsu1.github.io/gainpath`, or step 2 has nothing to receive the data.

## 3. Redeploy the analytics worker (F2)
Until this runs, production still returns 403 to the new origin.

    cd analytics-worker && npx wrangler deploy

Then confirm with a preflight (writes nothing):

    curl -si -X OPTIONS https://gainpath-analytics.jedmangubat.workers.dev/e \
      -H 'Origin: https://shihatsu1.github.io' \
      -H 'Access-Control-Request-Method: POST' | grep -i access-control-allow-origin

## 4. Not checked, please verify
- EmailJS: add `shihatsu1.github.io` to the allowed domains in the EmailJS dashboard.
- `marketing/*.png` and `images/branding/share.png` are rasters; if they show the
  old address as text, they need re-rendering (`marketing/render.mjs`).
