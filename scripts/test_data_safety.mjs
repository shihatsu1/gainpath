#!/usr/bin/env node
// End-to-end data-safety checks, driven through the real UI with real files:
//  - backup → restore on a fresh device (onboarding "Already used GainPath
//    before?") returns every record, for a large lbs history with custom
//    exercises, weigh-ins, machine bases, gear and day plans
//  - restoring over existing data asks first, keeps a copy, and Undo brings
//    the old data back exactly; cancelling changes nothing
//  - a failing save raises the alert, Back up still works from memory, and
//    the alert clears once saving works again
//  - the iPhone "not installed" warning (WebKit, iPhone user agent), its
//    30-day return, and that desktop never sees it
//  - the backup-reminder interval setting
//  - progress photos, in Chromium and WebKit: downscaled and kept across a
//    relaunch, never in the backup, visible errors when storage is full or a
//    file can't be read, the low-storage warning, Save to Photos, delete, and
//    Reset erasing them
// Downloads land in scripts/.data-safety/ (gitignored).
//
// Usage: npm run test:data   (ENGINE=webkit npm run test:data for WebKit)

import { chromium, webkit, devices } from './lib/browsers.mjs';
import { createServer } from 'http';
import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'scripts', '.data-safety');
const PORT = 8746;
const URL0 = `http://localhost:${PORT}/index.html`;
const MIME = { '.html': 'text/html', '.png': 'image/png', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.woff2': 'font/woff2' };

function startServer() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      const u = decodeURIComponent(req.url.split('?')[0]);
      const f = path.join(ROOT, u === '/' ? '/index.html' : u);
      let data;
      try { data = await readFile(f); } catch { res.writeHead(404); return res.end(); }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
      res.end(data);
    });
    server.listen(PORT, () => resolve(server));
  });
}

// A large, awkward lbs user: 400 sessions, custom exercise, weigh-ins,
// machine bases, owned gear, a day plan and a conversion memo.
function bigUser(seedW) {
  const history = [];
  for (let i = 0; i < 400; i++) {
    const d = new Date(Date.UTC(2025, 0, 1) + i * 2 * 864e5).toISOString().slice(0, 10);
    history.push({ day: 'push', dayName: 'Push', date: d, dk: d, mk: d.slice(0, 7), dur: '48m', sets: 6, feel: 'good', exercises: [
      { name: 'Barbell bench press', exFeel: 'good', sets: [{ done: true, t: 'w', w: 95, r: 12 }, { done: true, t: 'x', w: seedW + (i % 20) * 5, r: 8 }, { done: true, t: 'x', w: seedW + (i % 20) * 5, r: 7 }] },
      { name: 'My cable thing', exFeel: 'hard', note: 'custom note', sets: [{ done: true, t: 'x', w: 42.5, r: 12 }] },
      { name: 'Machine hack squat', exFeel: 'easy', sets: [{ done: true, t: 'x', w: 180, r: 10 }] }
    ] });
  }
  const cfg = { name: 'Big Lbs', firstName: 'Big', lastName: 'Lbs', sex: 'male', setup: true, unit: 'lbs', bw: 187.4, exp: 'advanced', goal: 'strength',
    split: 'pplul', freq: 5, warmup: true, wuReps: 10, prefReps: 8, prefRest: 120, prefSets: 3, startingWeights: 'ai', keyLifts: { chest: { w: 225, r: 5 } },
    customExercises: [{ name: 'My cable thing', mg: 'chest', baseW: 40, custom: true, equip: 'cable' }], gymDumbbells: [5, 10, 25, 50, 75, 100], gymPlates: { 45: 1, 25: 1, 10: 1, 5: 1, 2.5: 1 },
    dayPlan: { push: { 'Barbell bench press': { w: 235, r: 5 } } }, unitMemo: { from: 'kg', to: 'lbs', w: { '220.5': 100 }, db: {}, pl: {} }, lang: 'en', lastSeenVersion: '9.9.9', tutorialSeen: true, badgesIntroSeen: true };
  const bw = [{ dk: '2025-01-01', date: 'Jan 1, 2025', w: 190.2, waist: 34, arms: null }, { dk: '2026-06-01', date: 'Jun 1, 2026', w: 187.4, waist: null, arms: 15.5 }];
  return { cfg, history, bw, mw: { 'Hack squat': 75, 'Smith machine': 20 } };
}

async function seed(page, u, extra = {}) {
  await page.goto(URL0);
  await page.evaluate(({ u, extra }) => {
    localStorage.clear();
    localStorage.setItem('gp_cfg', JSON.stringify(u.cfg)); localStorage.setItem('gp_h', JSON.stringify(u.history));
    localStorage.setItem('gp_bw', JSON.stringify(u.bw)); localStorage.setItem('gp_mw', JSON.stringify(u.mw)); localStorage.setItem('gp_p', '{}');
    localStorage.setItem('gp_a2hs_dismissed', 'true'); localStorage.setItem('gp_last_export', new Date().toISOString());
    Object.entries(extra).forEach(([k, v]) => localStorage.setItem(k, v));
  }, { u, extra });
  await page.reload();
  await page.waitForSelector('#s-home.active');
  // Let the app write its normalised state (defaults filled in), so "before"
  // snapshots are what the app itself stores.
  await page.evaluate(() => { saveCFG(); saveData(); });
}
// Seed localStorage from a non-app page on the same origin, so the app's very
// first boot (and its IndexedDB migration) sees this data. Deleting the
// database under a live page is deferred in WebKit, so tests never do that.
async function seedCold(page, u) {
  await page.goto(`http://localhost:${PORT}/manifest.json`);
  await page.evaluate((u) => {
    localStorage.setItem('gp_cfg', JSON.stringify(u.cfg)); localStorage.setItem('gp_h', JSON.stringify(u.history));
    localStorage.setItem('gp_bw', JSON.stringify(u.bw)); localStorage.setItem('gp_mw', JSON.stringify(u.mw)); localStorage.setItem('gp_p', '{}');
    localStorage.setItem('gp_a2hs_dismissed', 'true'); localStorage.setItem('gp_last_export', new Date().toISOString());
  }, u);
  await page.goto(URL0);
  await page.waitForSelector('#s-home.active');
}
const stored = (page) => page.evaluate(() => ({
  cfg: JSON.parse(localStorage.getItem('gp_cfg')), history: JSON.parse(localStorage.getItem('gp_h')),
  bw: JSON.parse(localStorage.getItem('gp_bw')), mw: JSON.parse(localStorage.getItem('gp_mw')), prs: JSON.parse(localStorage.getItem('gp_p'))
}));
// The records a restore must bring back. cfg is compared on the user's own
// fields; bookkeeping written on the way (lastSeenVersion, exportedAtHistoryLen)
// is allowed to differ.
const core = (s) => {
  const { lastSeenVersion, exportedAtHistoryLen, ...cfg } = s.cfg; // eslint-disable-line no-unused-vars
  return JSON.stringify({ cfg: Object.keys(cfg).sort().map(k => [k, cfg[k]]), history: s.history, bw: s.bw, mw: s.mw });
};

// First difference between two stored states, for failure output.
function firstDiff(x, y, at = '') {
  if (JSON.stringify(x) === JSON.stringify(y)) return null;
  if (x && y && typeof x === 'object' && typeof y === 'object') {
    for (const k of new Set([...Object.keys(x), ...Object.keys(y)])) { const d = firstDiff(x[k], y[k], at + '.' + k); if (d) return d; }
  }
  return { at, a: JSON.stringify(x)?.slice(0, 160), b: JSON.stringify(y)?.slice(0, 160) };
}
async function exportViaUI(page, file) {
  await page.evaluate(() => { openSettings(); openDataSettings(); });
  const [dl] = await Promise.all([page.waitForEvent('download'), page.click('#s-setdata button[onclick="exportData()"]')]);
  const p = path.join(OUT, file); await dl.saveAs(p); exportViaUI.lastName = dl.suggestedFilename(); return p;
}

// ── Progress photos (both engines: WebKit is the iPhone engine, and Blob
// storage in IndexedDB is exactly where it has differed in the past).
async function photoTests(engine, tag, check, errors) {
  const b = await engine.launch();
  const c = await b.newContext({ acceptDownloads: true, viewport: { width: 390, height: 844 } });
  const p = await c.newPage(); p.on('pageerror', e => errors.push(`${tag}: ${e}`));
  await seed(p, bigUser(135));
  const toBody = () => p.evaluate(() => { bnav('ch'); chSeg('body'); });
  // A camera-sized image, made in the page, handed to the real input handler.
  const add = (n, w = 4032, h = 3024, kind = 'image/png') => p.evaluate(async ({ n, w, h, kind }) => {
    const files = [];
    for (let i = 0; i < n; i++) {
      const cv = document.createElement('canvas'); cv.width = w; cv.height = h; const g = cv.getContext('2d');
      g.fillStyle = ['#3a6', '#c64', '#48c'][i % 3]; g.fillRect(0, 0, w, h); g.fillStyle = '#fff'; g.fillRect(w * .3, h * .2, w * .4, h * .6);
      files.push(new File([await new Promise(r => cv.toBlob(r, kind))], 'IMG_' + i + '.png', { type: kind }));
    }
    await phAdd({ files, value: 'x' });
    return gid('ph-msg').textContent;
  }, { n, w, h, kind });
  const count = () => p.evaluate(async () => { PH_LIST = null; return (await phLoad()).length; });
  await toBody();
  check(`${tag} photos: the not-backed-up notice shows where photos are added`, /aren't in your backup/.test(await p.textContent('#ph-card')) && await p.isVisible('.ph-note'));
  const backupBefore = await p.evaluate(() => { const x = backupPayload(); delete x.exported; return JSON.stringify(x); });
  const msg = await add(2);
  const recs = await p.evaluate(async () => Promise.all((await phLoad()).map(async r => {
    const full = await phTx('full', 'readonly', tx => idbReq(tx.objectStore('full').get(r.id)));
    const b = new Uint8Array(full);
    return { w: r.w, h: r.h, jpeg: b[0] === 0xFF && b[1] === 0xD8, size: full.byteLength, thumb: r.thumb.byteLength };
  })));
  check(`${tag} photos: two added and confirmed`, recs.length === 2 && /2 photos saved/.test(msg), { msg, recs });
  check(`${tag} photos: downscaled to 1600px JPEG with a thumbnail`, recs.every(r => Math.max(r.w, r.h) === 1600 && r.jpeg && r.thumb > 0 && r.thumb < r.size), recs);
  check(`${tag} photos: grid and usage line show them`, await p.locator('#ph-grid .ph-tile').count() === 2 && /2 photos/.test(await p.textContent('#ph-usage')));
  await p.reload(); await p.waitForSelector('#s-home.active'); await toBody();
  await p.waitForFunction(() => document.querySelectorAll('#ph-grid .ph-tile').length === 2);
  check(`${tag} photos: still there after the app is relaunched`, await count() === 2);
  const backupAfter = await p.evaluate(() => { const x = backupPayload(); delete x.exported; return JSON.stringify(x); });
  check(`${tag} photos: the backup file is unchanged by photos`, backupBefore === backupAfter && !/gainpath-photos|image\/jpeg/.test(backupAfter));
  await p.waitForTimeout(400);
  await p.screenshot({ path: path.join(OUT, `photos-${tag}.png`), fullPage: true });
  // Full storage: the write fails, the message says so, nothing looks saved.
  await p.evaluate(() => { window.__put = IDBObjectStore.prototype.put; IDBObjectStore.prototype.put = function () { throw new DOMException('full', 'QuotaExceededError'); }; });
  const full = await add(1, 800, 600);
  await p.evaluate(() => { IDBObjectStore.prototype.put = window.__put; });
  check(`${tag} photos: storage full is shown as an error and nothing is added`, /Not saved: there's no storage space/.test(full) && await p.getAttribute('#ph-msg', 'class') === 'ph-msg bad' && await count() === 2, full);
  // WebKit once failed a write with no error object at all; that must still
  // read as "Not saved", never as saved.
  await p.evaluate(() => { IDBObjectStore.prototype.put = function () { this.transaction.abort(); return {}; }; });
  const aborted = await add(1, 800, 600);
  await p.evaluate(() => { IDBObjectStore.prototype.put = window.__put; });
  check(`${tag} photos: a write that aborts without an error is still shown as not saved`, /^Not saved/.test(aborted) && await count() === 2, aborted);
  const bad = await p.evaluate(async () => { await phAdd({ files: [new File(['not an image'], 'x.jpg', { type: 'image/jpeg' })], value: '' }); return gid('ph-msg').textContent; });
  check(`${tag} photos: an unreadable file is shown as an error`, /couldn't read that photo/.test(bad) && await count() === 2, bad);
  // Low storage: a standing warning, and adding asks first (No = nothing added).
  await p.evaluate(() => { navigator.storage.estimate = async () => ({ quota: 1e9, usage: 1e9 - 40 * 1048576 }); window.confirm = () => false; });
  await p.evaluate(() => renderPhotos());
  check(`${tag} photos: low storage shows a warning`, await p.isVisible('#ph-low') && /almost full: 40 MB left/.test(await p.textContent('#ph-low')));
  await add(1, 800, 600);
  check(`${tag} photos: low storage asks before adding, and No adds nothing`, await count() === 2);
  // Save to Photos: download on desktop, the share sheet with a JPEG on a phone.
  await p.evaluate(() => openPhoto(PH_LIST[0].id));
  check(`${tag} photos: tapping one opens it full size`, await p.isVisible('#ph-view') && !!(await p.getAttribute('#ph-view-img', 'src')));
  const [dl] = await Promise.all([p.waitForEvent('download'), p.click('#ph-view button[onclick="savePhoto()"]')]);
  check(`${tag} photos: Save downloads a .jpg where there's no share sheet`, /^gainpath-\d{4}-\d{2}-\d{2}\.jpg$/.test(dl.suggestedFilename()), dl.suggestedFilename());
  const shared = await p.evaluate(() => new Promise(res => {
    window.isMobileUA = () => true; navigator.canShare = () => true;
    navigator.share = async (d) => { res(d.files.map(f => f.type + ':' + f.size)); };
    savePhoto();
  }));
  check(`${tag} photos: on a phone Save opens the share sheet with the JPEG`, shared.length === 1 && /^image\/jpeg:\d+$/.test(shared[0]), shared);
  await p.evaluate(() => { window.confirm = () => true; });
  await p.click('#ph-view button[onclick="deletePhoto()"]');
  await p.waitForFunction(() => document.querySelectorAll('#ph-grid .ph-tile').length === 1);
  check(`${tag} photos: delete removes it and closes the viewer`, await count() === 1 && !(await p.isVisible('#ph-view')));
  // Reset app erases photos too, not only the workout data.
  await Promise.all([p.waitForNavigation(), p.evaluate(() => { window.confirm = () => true; resetApp(); })]);
  await p.waitForSelector('#s-ob.active');
  check(`${tag} photos: Reset app erases them`, await p.evaluate(async () => (await phLoad()).length) === 0);
  await b.close();
}

// ── Audit 2026-10-16 regressions (A01–A07). Each starts from the failure the
// audit reproduced. Synthetic data only; scripts/lib/browsers.mjs keeps every
// request to the analytics worker local.
// ── F1: old origin → new origin transfer. The two real origins are served from
// disk by routing (nothing leaves the machine), so the app's own APP_ORIGIN and
// the kit's origin checks are exercised unchanged: no test-only overrides.
const NEW_O = 'https://shihatsu1.github.io', OLD_O = 'https://jedmangubat.github.io';
async function routeOrigins(context) {
  const serve = (base, strip) => async (route) => {
    const u = new URL(route.request().url());
    let rel = decodeURIComponent(u.pathname).replace(/^\/gainpath\//, '');
    if (!rel || rel.endsWith('/')) rel += 'index.html';
    try { route.fulfill({ status: 200, contentType: MIME[path.extname(rel)] || 'application/octet-stream', body: await readFile(path.join(base, rel)) }); }
    catch { route.fulfill({ status: 404, body: '' }); }
  };
  await context.route(NEW_O + '/**', serve(ROOT));
  await context.route(OLD_O + '/**', serve(path.join(ROOT, 'migration', 'old-origin', 'gainpath')));
  await context.route('https://evil.example/**', (r) => r.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html><title>x</title>' }));
  await context.route('https://gainpath-analytics.jedmangubat.workers.dev/**', (r) => r.fulfill({ status: 204 }));
}
async function migrationTests(engine, tag, check, errors) {
  const browser = await engine.launch();
  const ctx = await browser.newContext({ acceptDownloads: true, serviceWorkers: 'block' });
  await routeOrigins(ctx);
  const dialogs = [];
  ctx.on('page', (pg) => { pg.on('pageerror', (e) => errors.push(`${tag} migrate: ${e}`)); pg.on('dialog', (d) => { dialogs.push(d.message()); d.accept(); }); });
  const kitSw = await readFile(path.join(ROOT, 'migration', 'old-origin', 'gainpath', 'sw.js'), 'utf8');
  check(`${tag} F1: the kit's worker never touches localStorage or IndexedDB and deletes only gainpath-* caches`,
    !/localStorage|indexedDB|sessionStorage/.test(kitSw) && /startsWith\('gainpath-'\)/.test(kitSw) && (kitSw.match(/caches\.delete/g) || []).length === 1);
  const u = bigUser(155);
  const old = await ctx.newPage();
  await old.goto(OLD_O + '/gainpath/');
  await old.evaluate((u) => {
    localStorage.clear();
    localStorage.setItem('gp_cfg', JSON.stringify(u.cfg)); localStorage.setItem('gp_h', JSON.stringify(u.history));
    localStorage.setItem('gp_bw', JSON.stringify(u.bw)); localStorage.setItem('gp_mw', JSON.stringify(u.mw)); localStorage.setItem('gp_p', '{}');
  }, u);
  await old.reload();
  const oldBefore = await old.evaluate(() => Object.keys(localStorage).sort().map(k => [k, localStorage.getItem(k)]));
  check(`${tag} F1: the old-origin page finds the workouts`, /400/.test(await old.textContent('#count')), await old.textContent('#count'));
  check(`${tag} F1: step 2 waits until the backup file is downloaded`, await old.isDisabled('#go'));
  const [dl] = await Promise.all([old.waitForEvent('download'), old.click('#dl')]);
  const f = path.join(OUT, 'migrate-backup.json'); await dl.saveAs(f);
  const filed = JSON.parse(await readFile(f, 'utf8'));
  check(`${tag} F1: the downloaded file has the backupPayload() shape and every record`,
    filed.version === '2.0' && filed.history.length === 400 && filed.cfg.name === 'Big Lbs' && filed.bw.length === 2 && !!filed.mw && 'prs' in filed && !!filed.exported && /^gainpath-backup-\d{4}-\d{2}-\d{2}\.json$/.test(dl.suggestedFilename()));
  const [nw] = await Promise.all([ctx.waitForEvent('page'), old.click('#go')]);
  await nw.waitForSelector('#s-home.active', { timeout: 20000 }).catch(() => {});
  const got = await nw.evaluate(() => ({ h: JSON.parse(localStorage.getItem('gp_h') || '[]'), cfg: JSON.parse(localStorage.getItem('gp_cfg') || 'null'), bw: JSON.parse(localStorage.getItem('gp_bw') || '[]'), mw: JSON.parse(localStorage.getItem('gp_mw') || '{}'), url: location.href }));
  check(`${tag} F1: the new app asked once, then imported all 400 sessions with config, weigh-ins and machine bases`,
    got.h.length === 400 && got.cfg && got.cfg.name === 'Big Lbs' && got.cfg.setup === true && got.bw.length === 2 && Object.keys(got.mw).length === 2 && dialogs.length === 1, { n: got.h.length, dialogs });
  check(`${tag} F1: the sessions are identical to the old origin's`, !firstDiff(got.h, u.history), firstDiff(got.h, u.history));
  check(`${tag} F1: the one-time ?migrate=1 is gone from the address afterwards`, !/migrate=/.test(got.url), got.url);
  check(`${tag} F1: the old origin kept every key untouched`, JSON.stringify(await old.evaluate(() => Object.keys(localStorage).sort().map(k => [k, localStorage.getItem(k)]))) === JSON.stringify(oldBefore));
  await old.waitForFunction(() => /\S/.test(document.getElementById('state').textContent) && document.getElementById('state').style.display === 'block', null, { timeout: 8000 }).catch(() => {});
  check(`${tag} F1: the old page is told it is done`, /Done/.test(await old.textContent('#state')), await old.textContent('#state'));
  await nw.close();

  // Existing data on the new origin: the normal replace confirm, and Undo restores it.
  const other = bigUser(95); other.cfg.name = 'Other Person'; other.history = other.history.slice(0, 7);
  const nw2 = await ctx.newPage();
  await nw2.goto(NEW_O + '/gainpath/index.html');
  await nw2.evaluate((u) => { localStorage.clear(); localStorage.setItem('gp_cfg', JSON.stringify(u.cfg)); localStorage.setItem('gp_h', JSON.stringify(u.history)); localStorage.setItem('gp_bw', '[]'); localStorage.setItem('gp_mw', '{}'); localStorage.setItem('gp_p', '{}'); localStorage.setItem('gp_a2hs_dismissed', 'true'); localStorage.setItem('gp_last_export', new Date().toISOString()); }, other);
  await nw2.close();
  dialogs.length = 0;
  const [nw3] = await Promise.all([ctx.waitForEvent('page'), old.click('#go')]);
  await nw3.waitForFunction(() => JSON.parse(localStorage.getItem('gp_h') || '[]').length === 400, null, { timeout: 20000 }).catch(() => {});
  const g3 = await nw3.evaluate(() => ({ n: JSON.parse(localStorage.getItem('gp_h') || '[]').length, pre: JSON.parse(localStorage.getItem('gp_pre_restore') || 'null') }));
  check(`${tag} F1: over existing data it asks to replace and keeps a copy for Undo`, g3.n === 400 && dialogs.length === 1 && /7/.test(dialogs[0]) && g3.pre && g3.pre.history.length === 7 && g3.pre.cfg.name === 'Other Person', { g3: g3.n, dialogs });
  await nw3.evaluate(() => undoRestore());
  const g4 = await nw3.evaluate(() => JSON.parse(localStorage.getItem('gp_h') || '[]').length);
  check(`${tag} F1: Undo brings the previous data back`, g4 === 7, g4);
  await nw3.close();

  // A page on any other origin cannot inject data, and cannot receive the handshake.
  const ectx = await browser.newContext({ acceptDownloads: true, serviceWorkers: 'block' }); // empty storage, incl. the IndexedDB mirror
  await routeOrigins(ectx);
  const evil = await ectx.newPage();
  await evil.goto('https://evil.example/x');
  const popP = ectx.waitForEvent('page');
  await evil.evaluate((url) => { window.__w = window.open(url, 'gp-evil'); window.__got = []; window.addEventListener('message', (e) => window.__got.push(e.origin)); }, NEW_O + '/gainpath/?migrate=1');
  const victim = await popP;
  await victim.waitForLoadState('load');
  await victim.waitForTimeout(800);
  await evil.evaluate((u) => { const p = { cfg: u.cfg, history: u.history, prs: {}, mw: {}, bw: [], version: '2.0' }; for (const n of ['', 'x'.repeat(32), '0'.repeat(32)]) window.__w.postMessage({ gpMigrate: 'data', nonce: n, payload: p }, '*'); }, u);
  await victim.waitForTimeout(800);
  const injected = await victim.evaluate(() => ({ h: localStorage.getItem('gp_h'), cfg: localStorage.getItem('gp_cfg'), ob: document.getElementById('s-ob').classList.contains('active') }));
  check(`${tag} F1: another origin cannot hand the app data`, !injected.h && !injected.cfg && injected.ob, injected);
  check(`${tag} F1: another origin never receives the handshake`, (await evil.evaluate(() => window.__got)).length === 0);
  await browser.close();
}

// ── F4: a set-up profile must never be stranded on onboarding by one bad record.
// Each case starts from a normally booted, normalised profile, damages exactly
// one key, and relaunches. Expect Home or the recovery sheet, no uncaught error,
// and no write to any key (the only allowed one is the kept raw copy of a
// rejected in-progress workout, gp_corrupt_gp_wip).
async function bootTests(engine, tag, check, errors) {
  const browser = await engine.launch();
  const good = bigUser(135); good.history = good.history.slice(0, 5);
  const sess = { day: 'push', exercises: [{ name: 'Barbell bench press', sets: [{ done: true, t: 'x', w: 100, r: 5 }] }] };
  const okEx = { ex: { name: 'Barbell bench press', mg: 'chest', baseW: 20, equip: 'barbell' }, sets: [{ w: 100, r: 5, t: 'x', done: false }] };
  const cases = [
    { key: 'gp_wip', name: 'gp_wip whose sd is not an array', val: { day: 'push', exi: 0, sd: 'oops', t0: Date.now() - 60000, screen: 'wo' }, copy: true },
    { key: 'gp_wip', name: 'gp_wip with exi past the end of sd', val: { day: 'push', exi: 5, sd: [okEx], t0: Date.now() - 60000, screen: 'wo' }, copy: true },
    { key: 'gp_wip', name: 'gp_wip that is a bare string', val: 'oops', copy: false },
    { key: 'gp_h', name: 'gp_h containing null', val: [null, { ...sess, dk: '2026-10-01', date: '2026-10-01' }], copy: false },
    { key: 'gp_h', name: 'gp_h record whose exercises is not an array', val: [{ day: 'push', dk: '2026-10-01', date: '2026-10-01', exercises: 'bad' }], copy: false },
    { key: 'gp_done', name: 'gp_done with no exercises', val: { cid: 123, day: 'push', dk: '2026-10-02', date: '2026-10-02' }, copy: false }
  ];
  for (const c of cases) {
    const ctx = await browser.newContext({ acceptDownloads: true, serviceWorkers: 'block' });
    const page = await ctx.newPage();
    const errs = []; page.on('pageerror', (e) => errs.push(String(e))); page.on('dialog', (d) => d.accept());
    await seed(page, good);
    const raw = JSON.stringify(c.val);
    await page.evaluate(([k, v]) => localStorage.setItem(k, v), [c.key, raw]);
    const snap = () => page.evaluate(() => Object.fromEntries(Object.keys(localStorage).sort().map(k => [k, localStorage.getItem(k)])));
    const before = await snap();
    await page.reload();
    await page.waitForTimeout(700);
    const st = await page.evaluate(() => ({ ob: document.getElementById('s-ob').classList.contains('active'), home: document.getElementById('s-home').classList.contains('active'), rec: getComputedStyle(document.getElementById('load-recovery')).display !== 'none' }));
    const after = await snap();
    const added = Object.keys(after).filter(k => !(k in before) || after[k] !== before[k]);
    const allowed = c.copy ? ['gp_corrupt_gp_wip'] : [];
    check(`${tag} F4 ${c.name}: reaches Home or the recovery sheet, never onboarding`, !st.ob && (st.home || st.rec), st);
    check(`${tag} F4 ${c.name}: no uncaught error`, errs.length === 0, errs);
    check(`${tag} F4 ${c.name}: nothing is written${c.copy ? ' except the kept raw copy' : ''}`, added.every(k => allowed.includes(k)) && Object.keys(before).every(k => k in after) && after[c.key] === raw, added);
    if (c.copy) check(`${tag} F4 ${c.name}: the raw text is kept in gp_corrupt_gp_wip`, after.gp_corrupt_gp_wip === raw);
    if (c.key === 'gp_h') check(`${tag} F4 ${c.name}: the recovery sheet names the history`, st.rec);
    await ctx.close();
  }
  // Anything else that throws after load() on a set-up profile (here a shape-valid
  // workout whose machine-weight screen state is garbage) lands on the recovery
  // sheet with a Download that holds the raw data, never on onboarding.
  {
    const ctx = await browser.newContext({ acceptDownloads: true, serviceWorkers: 'block' });
    const page = await ctx.newPage(); page.on('dialog', (d) => d.accept());
    await seed(page, good);
    const wip = JSON.stringify({ day: 'push', exi: 0, sd: [okEx], t0: Date.now() - 1000, screen: 'rest', restInfo: { si: 0 }, restEnd: Date.now() + 5000 });
    await page.evaluate((w) => localStorage.setItem('gp_wip', w), wip);
    const before = await page.evaluate(() => Object.fromEntries(Object.keys(localStorage).sort().map(k => [k, localStorage.getItem(k)])));
    await page.reload(); await page.waitForTimeout(700);
    const st = await page.evaluate(() => ({ ob: document.getElementById('s-ob').classList.contains('active'), rec: getComputedStyle(document.getElementById('load-recovery')).display !== 'none' }));
    check(`${tag} F4 crash barrier: an unexpected boot error shows the recovery sheet, not onboarding`, !st.ob && st.rec, st);
    let dumped = {};
    if (st.rec) {
      const [dl] = await Promise.all([page.waitForEvent('download'), page.click('#lr-download')]);
      const f = path.join(OUT, 'boot-crash.json'); await dl.saveAs(f);
      dumped = JSON.parse(await readFile(f, 'utf8'));
    }
    let snapKeys = {}; try { snapKeys = JSON.parse((dumped.gainpathUnreadableData || {}).boot_crash || '{}').keys || {}; } catch {}
    check(`${tag} F4 crash barrier: Download holds the raw stored data`, snapKeys.gp_wip === wip && !!snapKeys.gp_h && !!snapKeys.gp_cfg, Object.keys(snapKeys));
    const after = await page.evaluate(() => Object.fromEntries(Object.keys(localStorage).sort().map(k => [k, localStorage.getItem(k)])));
    check(`${tag} F4 crash barrier: nothing is written`, JSON.stringify(before) === JSON.stringify(after), Object.keys(after).filter(k => after[k] !== before[k]));
    await ctx.close();
  }
  await browser.close();
}

async function auditTests(engine, tag, check, errors) {
  const browser = await engine.launch();
  const mk = async () => {
    const c = await browser.newContext({ acceptDownloads: true });
    const p = await c.newPage(); p.on('pageerror', e => errors.push(`${tag} audit: ${e}`));
    const dialogs = []; p.on('dialog', d => { dialogs.push(d.message()); d.accept(); });
    p.dialogs = dialogs; return [c, p];
  };
  const finish = (p, name = 'Barbell bench press') => p.evaluate((name) => {
    CFG.startingWeights = 'manual'; ST.day = 'push'; ST.exi = 0; ST.t0 = Date.now() - 60000;
    ST.sd = [{ ex: { name, mg: 'chest', baseW: 20, equip: 'barbell' }, sets: [{ w: 300, r: 5, t: 'x', done: true }], sugDone: true }];
    finishWo();
  }, name);
  const blockKeys = (p, keys) => p.evaluate((keys) => {
    window.__realSet = Storage.prototype.setItem;
    Storage.prototype.setItem = function (k, v) { if (keys.includes(k)) throw new DOMException('full', 'QuotaExceededError'); return window.__realSet.call(this, k, v); };
  }, keys);
  const unblock = (p) => p.evaluate(() => { Storage.prototype.setItem = window.__realSet; });
  const ls = (p, k) => p.evaluate((k) => localStorage.getItem(k), k);
  const histLen = async (p) => JSON.parse(await ls(p, 'gp_h') || '[]').length;

  // A01 + A02: a failed completion stays recoverable, and nothing hides the alert.
  let [c1, p1] = await mk();
  await seed(p1, bigUser(135));
  const n0 = await histLen(p1);
  await finish(p1); await blockKeys(p1, ['gp_h']);
  await p1.evaluate(() => submitFeel('good'));
  check(`${tag} A01: failed completion keeps a recoverable record on disk`, (await ls(p1, 'gp_done')) !== null || (await ls(p1, 'gp_wip')) !== null);
  check(`${tag} A01: history on disk is untouched while the save fails`, await histLen(p1) === n0);
  check(`${tag} A01: the alert is showing`, await p1.isVisible('#save-alert'));
  await p1.evaluate(() => { saveCFG(); saveInProgress(); });
  check(`${tag} A02: a later successful config/WIP save does not hide the alert`, await p1.isVisible('#save-alert'));
  await unblock(p1); await p1.reload(); await p1.waitForSelector('#s-home.active');
  check(`${tag} A01: after relaunch the finished workout is in history exactly once`, await histLen(p1) === n0 + 1);
  check(`${tag} A01: the pending records are cleared once settled`, (await ls(p1, 'gp_done')) === null && (await ls(p1, 'gp_wip')) === null);
  check(`${tag} A01: the alert is gone once everything is saved`, !(await p1.isVisible('#save-alert')));
  await p1.reload(); await p1.waitForSelector('#s-home.active');
  check(`${tag} A01: a second relaunch does not duplicate it`, await histLen(p1) === n0 + 1);
  // Both the history and the pending record fail: the workout resumes on the feel screen.
  await finish(p1); await blockKeys(p1, ['gp_h', 'gp_done']);
  await p1.evaluate(() => submitFeel('good'));
  await unblock(p1); await p1.reload(); await p1.waitForSelector('.screen.active');
  check(`${tag} A01: with no pending record the workout resumes instead of vanishing`, await p1.evaluate(() => !!ST.pendingRec && !!ST.day) && await histLen(p1) === n0 + 1);
  await p1.evaluate(() => { if (ST.pendingRec) submitFeel('good'); });
  check(`${tag} A01: finishing the resumed workout saves it once`, await histLen(p1) === n0 + 2);
  await c1.close();

  // A03: each corrupt key is kept, reported, and never overwritten.
  for (const key of ['gp_cfg', 'gp_h', 'gp_p', 'gp_mw', 'gp_bw']) {
    const [c, p] = await mk(); await seed(p, bigUser(135));
    const raw = '{"broken":' + key;
    await p.evaluate(({ key, raw }) => localStorage.setItem(key, raw), { key, raw });
    await p.reload(); await p.waitForTimeout(400);
    check(`${tag} A03 ${key}: recovery sheet shows`, await p.isVisible('#load-recovery'));
    await p.evaluate(() => { try { saveCFG(); saveData(); } catch (e) { /* locked */ } });
    check(`${tag} A03 ${key}: the unreadable value is untouched after saves`, await ls(p, key) === raw);
    check(`${tag} A03 ${key}: a save alert shows instead of silently dropping writes`, await p.isVisible('#save-alert'));
    await p.click('#lr-fresh', { timeout: 1500 }).catch(() => {});
    check(`${tag} A03 ${key}: starting fresh keeps a copy of the raw value`, await ls(p, 'gp_corrupt_' + key) === raw);
    check(`${tag} A03 ${key}: recovery sheet closes and the key saves again`, !(await p.isVisible('#load-recovery')) && await p.evaluate((k) => { saveCFG(); saveData(); try { JSON.parse(localStorage.getItem(k)); return true; } catch (e) { return false; } }, key));
    await c.close();
  }

  // A03: the verified mirror can restore just the unreadable keys.
  for (const key of ['gp_h', 'gp_cfg']) {
    const [c, p] = await mk(); await seed(p, bigUser(135));
    await p.waitForFunction(() => IDB_READY, null, { timeout: 8000 }).catch(() => {});
    await p.evaluate(() => { saveCFG(); saveData(); }); await p.waitForTimeout(500);
    const good = await ls(p, key), raw = '{"broken":' + key;
    await p.evaluate(({ key, raw }) => localStorage.setItem(key, raw), { key, raw });
    await p.reload(); await p.waitForTimeout(800);
    check(`${tag} A03 mirror ${key}: the second-copy option is offered`, await p.isVisible('#lr-mirror'));
    await p.click('#lr-mirror', { timeout: 1500 }).catch(() => {}); await p.waitForTimeout(1200);
    check(`${tag} A03 mirror ${key}: the key is restored exactly and the app opens`, await ls(p, key) === good && !(await p.isVisible('#load-recovery')));
    check(`${tag} A03 mirror ${key}: the damaged text is kept`, await ls(p, 'gp_corrupt_' + key) === raw);
    await c.close();
  }
  // A03: no usable second copy, no offer.
  { const [c, p] = await mk(); await seed(p, bigUser(135));
    await p.waitForFunction(() => IDB_READY, null, { timeout: 8000 }).catch(() => {});
    await p.evaluate(() => { saveData(); }); await p.waitForTimeout(500);
    await p.evaluate(() => new Promise((res) => { const tx = IDB.transaction('kv', 'readwrite'); tx.objectStore('kv').put('{"x":', 'gp_bw'); tx.oncomplete = res; }));
    await p.evaluate(() => localStorage.setItem('gp_bw', '{"x":')); await p.reload(); await p.waitForTimeout(1000);
    check(`${tag} A03 mirror: shown the sheet, but a mirror with the same damage is not offered`, await p.isVisible('#load-recovery') && !(await p.isVisible('#lr-mirror')));
    await c.close(); }

  // Test isolation: production services are answered locally by scripts/lib/browsers.mjs.
  { const [c, p] = await mk(); await p.goto(URL0);
    const st = await p.evaluate(async () => (await fetch('https://gainpath-analytics.jedmangubat.workers.dev/e', { method: 'POST', body: '{}' })).status);
    check(`${tag} isolation: a request to the analytics worker is answered by the test harness (204), not the network`, st === 204, st);
    await c.close(); }

  // A04: names are text, never markup or broken handlers.
  const [c4, p4] = await mk(); await seed(p4, bigUser(135));
  const names = ["O'Brien row", '<b id="audit-mark">Row</b>', '"Quote" & <i>amp</i>', '日本語のロウ', '한국어 로우'];
  for (const name of names) {
    const r = await p4.evaluate((name) => {
      CFG.startingWeights = 'manual';
      ST.day = 'push'; ST.exi = 0; ST.sd = [{ ex: { name, mg: 'back', baseW: 10, equip: 'cable', custom: true, yt: 'row' }, sets: [{ w: 10, r: 10, t: 'x', done: false }], sugDone: true }];
      renderEx();
      const bad = [...document.querySelectorAll('#ex-area [onclick]')].filter(el => { try { new Function(el.getAttribute('onclick')); return false; } catch (e) { return true; } }).length;
      const injected = !!document.querySelector('#ex-area #audit-mark, #ex-area i:not(.ti)');
      return { bad, injected };
    }, name);
    check(`${tag} A04: "${name}" renders with valid handlers and no injected markup`, r.bad === 0 && !r.injected, r);
  }
  await p4.evaluate(() => {
    ST.history = []; ST.prs = {}; ST.badges = {}; ST.t0 = Date.now() - 1000;
    ST.sd = [{ ex: { name: '<b id="audit-mark2">PR</b>', mg: 'back', baseW: 10, equip: 'cable', custom: true }, sets: [{ w: 50, r: 5, t: 'x', done: true }] }];
    ST.day = 'push'; ST.pendingRec = buildRec(); submitFeel('good');
  });
  const sweep = await p4.evaluate(() => {
    const H = '<b id="audit-x1">x</b>', out = [];
    const bad = [{ name: H, mg: 'chest', baseW: 10, equip: 'cable', custom: true }];
    CFG.customExercises = bad; EXPOOL[H] = bad[0];
    ST.history = [{ day: 'push', dayName: H, date: H, dk: '2026-10-01', mk: '2026-10', dur: '1:00', sets: 1, feel: 'good', note: H, exercises: [{ name: H, exFeel: 'good', note: H, sets: [{ w: 50, r: 5, t: 'x', done: true }] }] }];
    ST.prs = { [H]: { w: 50, r: 5, date: H, dk: '2026-10-01' } };
    CFG.customProgram = { name: H, days: [{ id: 'cd_1', name: H }] }; CFG.customDays = { cd_1: [] };
    ST.editDay = 'push'; ST.editList = [{ name: H, mg: 'chest', baseW: 10, equip: 'cable', custom: true }]; ST.editMid = false;
    let seen = 0; const run = (n, f) => { try { f(); } catch (e) { out.push(n + ' threw ' + e.message); } const c = document.querySelectorAll('#audit-x1').length; if (c > seen) out.push(n + ' injected'); seen = c; };
    run('home', () => refreshHome()); run('prs', () => renderPRs()); run('session', () => { openSession(0); });
    run('dayedit', () => renderDayEdit()); run('customlist', () => renderCustomExList()); run('badges', () => renderBadges());
    run('chart', () => renderChSeg()); run('program', () => { ST.progDraft = CFG.customProgram; renderProgramBuilder(); }); run('exhist', () => renderExHistory(H));
    run('swap', () => { ST.swapIdx = null; ST.swapPart = 'chest'; ST.swapSearch = 'audit'; renderSwapParts(); });
    run('split', () => { OB.split = 'custom'; renderSplitOpts('set-split-opts', 'custom'); });
    return { out, injected: out.filter(x => /injected/.test(x)).length };
  });
  check(`${tag} A04: history, PRs, day edit, program and chart screens escape every name`, sweep.injected === 0, sweep);
  check(`${tag} A04: summary PR stamp escapes the exercise name`, await p4.evaluate(() => !document.querySelector('#audit-mark2')));
  await c4.close();

  // A05: nested validation, rollback, and protection for a user with no sessions.
  const [c5, p5] = await mk();
  const cfgOnly = { ...bigUser(135), history: [] };
  await seed(p5, cfgOnly);
  const valid = await p5.evaluate(() => JSON.parse(JSON.stringify(backupPayload())));
  const rejects = (mut) => p5.evaluate(({ valid, mut }) => { const d = JSON.parse(JSON.stringify(valid)); new Function('d', mut)(d); try { validateBackup(sanitizeImport(d)); return false; } catch (e) { return true; } }, { valid, mut });
  check(`${tag} A05: customProgram.days=null is rejected`, await rejects('d.cfg.customProgram={days:null}'));
  check(`${tag} A05: history[0].exercises as a string is rejected`, await rejects('d.history=[{exercises:"invalid"}]'));
  check(`${tag} A05: customExercises that are not objects are rejected`, await rejects('d.cfg.customExercises=[1,2]'));
  check(`${tag} A05: customDays as an array is rejected`, await rejects('d.cfg.customDays=[]'));
  const rolled = await p5.evaluate(() => {
    const before = JSON.stringify([CFG, ST.history, ST.prs, ST.mw, ST.bw]); const real = recomputeBadges;
    recomputeBadges = () => { throw new Error('boom'); };
    let threw = false; try { applyBackup({ cfg: { name: 'Replaced', setup: true }, history: [{ day: 'x', exercises: [] }] }); } catch (e) { threw = true; }
    recomputeBadges = real; return { threw, same: JSON.stringify([CFG, ST.history, ST.prs, ST.mw, ST.bw]) === before };
  });
  check(`${tag} A05: a failure while applying rolls the live state back`, rolled.threw && rolled.same, rolled);
  const file5 = path.join(OUT, 'audit-backup.json');
  await writeFile(file5, JSON.stringify({ cfg: { ...cfgOnly.cfg, name: 'Imported' }, history: [], bw: [], prs: {}, mw: {}, version: '2.0' }));
  const cfgBefore = await ls(p5, 'gp_cfg');
  p5.dialogs.length = 0;
  await p5.setInputFiles('#import-file', file5); await p5.waitForTimeout(500);
  check(`${tag} A05: a configured user with no sessions is asked before replacement`, p5.dialogs.some(m => /Replace/.test(m)), p5.dialogs);
  check(`${tag} A05: and a copy is kept for Undo`, (await ls(p5, 'gp_pre_restore')) !== null);
  await p5.evaluate(() => undoRestore()); await p5.waitForTimeout(200);
  check(`${tag} A05: Undo brings the configured profile back`, await p5.evaluate(() => CFG.name) === 'Big Lbs' && JSON.parse(await ls(p5, 'gp_cfg')).name === 'Big Lbs', cfgBefore && 1);
  await c5.close();

  // A06: an aborted mirror write is reported as a degraded mirror, not a failed save.
  const [c6, p6] = await mk(); await seed(p6, bigUser(135));
  await p6.waitForFunction(() => IDB_READY, null, { timeout: 8000 }).catch(() => {});
  await p6.evaluate(() => { const put = IDBObjectStore.prototype.put; IDBObjectStore.prototype.put = function (v, k) { const r = put.call(this, v, k); this.transaction.abort(); return r; }; saveCFG(); });
  await p6.waitForTimeout(500);
  check(`${tag} A06: an aborted mirror write marks the mirror degraded`, await p6.evaluate(() => typeof MIRROR_DEGRADED !== 'undefined' && MIRROR_DEGRADED === true));
  check(`${tag} A06: it does not raise the save alert (localStorage was saved)`, !(await p6.isVisible('#save-alert')));
  await p6.evaluate(() => { openSettings(); openDataSettings(); });
  check(`${tag} A06: Reports & backup says the second copy is not updating`, /second copy/i.test(await p6.textContent('#bk-status')));
  await c6.close();

  // A06: recovery that cannot write everything must not reload into a partial profile.
  const [c7, p7] = await mk(); await seed(p7, bigUser(135));
  await p7.waitForFunction(() => IDB_READY, null, { timeout: 8000 }).catch(() => {});
  await p7.evaluate(() => { saveCFG(); saveData(); }); await p7.waitForTimeout(500);
  await p7.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
  await p7.addInitScript(() => { const s = Storage.prototype.setItem; Storage.prototype.setItem = function (k, v) { if (k === 'gp_h') throw new DOMException('full', 'QuotaExceededError'); return s.call(this, k, v); }; });
  await p7.reload(); await p7.waitForTimeout(1200);
  check(`${tag} A06: a failed recovery write leaves no half-restored profile`, await ls(p7, 'gp_cfg') === null);
  check(`${tag} A06: and does not mark recovery as done`, await p7.evaluate(() => sessionStorage.getItem('gp_idb_recovered')) === null);
  await c7.close();

  // A07: Reset reports a blocked deletion, and a real Reset erases the pre-migration backup too.
  const [c8, p8] = await mk(); await seed(p8, bigUser(135));
  await p8.waitForFunction(() => IDB_READY, null, { timeout: 8000 }).catch(() => {});
  await p8.evaluate(async () => { await phLoad(); });
  const p8b = await c8.newPage(); await p8b.goto(URL0);
  await p8b.evaluate(() => new Promise((res) => { const r = indexedDB.open('gainpath-photos'); r.onsuccess = () => { window.__hold = r.result; res(); }; r.onupgradeneeded = () => {}; }));
  await p8.evaluate(() => { resetApp(); }); await p8.waitForTimeout(1200);
  check(`${tag} A07: a blocked photo deletion keeps the data and says why`, await ls(p8, 'gp_cfg') !== null && /another GainPath tab/i.test(await p8.evaluate(() => gid('reset-st').textContent)));
  await p8b.evaluate(() => window.__hold.close()); await p8b.close();
  await p8.waitForTimeout(500);
  await p8.evaluate(() => { resetApp(); }); await p8.waitForNavigation({ timeout: 8000 }).catch(() => {}); await p8.waitForTimeout(1500);
  const left = await p8.evaluate(() => new Promise((res) => { const r = indexedDB.open('gainpath'); r.onsuccess = () => { const db = r.result; const tx = db.transaction('backups'); const q = tx.objectStore('backups').get('pre-idb-2.9.0'); q.onsuccess = () => { db.close(); res(q.result ? Object.keys(q.result.data || {}) : []); }; }; r.onerror = () => res(['error']); }));
  check(`${tag} A07: Reset erased the pre-migration backup too`, !left.includes('gp_h') && !left.includes('gp_cfg'), left);
  check(`${tag} A07: Reset erased the app's own data`, await p8.evaluate(() => !localStorage.getItem('gp_h')));
  await c8.close();
  await browser.close();
}

function printAndExit(results, errors) {
  for (const r of results) console.log(`${r.pass ? 'PASS' : 'FAIL'}  ${r.name}${r.pass || r.detail === undefined ? '' : '\n      ' + JSON.stringify(r.detail)}`);
  if (errors.length) console.log('\nPage errors:\n' + errors.join('\n'));
  const failed = results.filter(r => !r.pass).length;
  console.log(`\n${results.length - failed}/${results.length} passed. Screenshots in scripts/.data-safety/`);
  process.exit(failed || errors.length ? 1 : 0);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const server = await startServer();
  const results = [], errors = [];
  const check = (name, pass, detail) => results.push({ name, pass: !!pass, detail });

  if (process.env.MIGRATE_ONLY) { // MIGRATE_ONLY=1: just the old→new origin transfer
    await migrationTests(chromium, 'chromium', check, errors);
    if (process.env.ENGINE !== 'chromium') await migrationTests(webkit, 'webkit', check, errors);
    server.close(); return printAndExit(results, errors);
  }
  if (process.env.BOOT_ONLY) { // BOOT_ONLY=1: just the F4 damaged-record boot cases
    await bootTests(chromium, 'chromium', check, errors);
    if (process.env.ENGINE !== 'chromium') await bootTests(webkit, 'webkit', check, errors);
    server.close(); return printAndExit(results, errors);
  }
  if (process.env.AUDIT_ONLY) { // AUDIT_ONLY=1 node scripts/test_data_safety.mjs: just the A01–A07 regressions
    await auditTests(chromium, 'chromium', check, errors);
    if (process.env.ENGINE !== 'chromium') await auditTests(webkit, 'webkit', check, errors);
    server.close(); return printAndExit(results, errors);
  }

  // ENGINE=webkit runs sections 1–4 and 6 in WebKit (the iPhone engine) too.
  const browser = await (process.env.ENGINE === 'webkit' ? webkit : chromium).launch();
  const ctx = async (opts) => { const c = await browser.newContext({ acceptDownloads: true, ...opts }); const p = await c.newPage(); p.on('pageerror', e => { errors.push(String(e)); console.log('PAGEERROR', String(e)); }); return [c, p]; };

  // ── 1. Backup on one device, restore on a fresh one.
  const user = bigUser(185);
  let [cA, a] = await ctx();
  await seed(a, user);
  const before = await stored(a);
  const file = await exportViaUI(a, 'big-lbs.json');
  const fileData = JSON.parse(await readFile(file, 'utf8'));
  check('export: file name is dated', /^gainpath-backup-\d{4}-\d{2}-\d{2}\.json$/.test(exportViaUI.lastName), exportViaUI.lastName);
  check('export: file holds all 400 sessions, weigh-ins, machine bases and cfg', fileData.history.length === 400 && core({ ...fileData }) === core(before), firstDiff(before, fileData));
  await cA.close();

  let [cB, b] = await ctx();
  await b.goto(URL0);
  await b.waitForSelector('#ob-import-file', { state: 'attached' });
  await b.setInputFiles('#ob-import-file', file);
  await b.waitForSelector('#s-home.active');
  const after = await stored(b);
  check('restore on a fresh device (onboarding): every record identical', core(after) === core(before), firstDiff(before, after));
  check('restore: lbs unit, custom exercise, gear, day plan and unit memo survive',
    after.cfg.unit === 'lbs' && after.cfg.customExercises[0].name === 'My cable thing' && JSON.stringify(after.cfg.gymDumbbells) === JSON.stringify(user.cfg.gymDumbbells) &&
    after.cfg.dayPlan.push['Barbell bench press'].w === 235 && after.cfg.unitMemo.w['220.5'] === 100);
  const prBench = after.prs['Barbell bench press'];
  check('restore: PRs are rebuilt from history (not trusted from the file)', prBench && prBench.w === 185 + 19 * 5, prBench);
  await cB.close();

  // ── 1b. v2.10 exercise renames: data saved under the old names follows the rename.
  const oldUser = bigUser(185); oldUser.history = oldUser.history.slice(0, 6);
  oldUser.history.forEach(h => { h.exercises[0].name = 'Flat barbell bench press'; h.exercises[2].name = 'Hack squat'; h.exercises.push({ name: 'Leg press', exFeel: 'good', sets: [{ done: true, t: 'x', w: 300, r: 10 }] }); });
  // The user's own exercise happens to carry an old built-in name: it must be left alone.
  oldUser.cfg.customExercises.push({ name: 'Leg press', mg: 'quads', baseW: 100, custom: true, equip: 'machine' });
  oldUser.cfg.customDays = { push: ['Flat barbell bench press', 'Lat pulldown', 'My cable thing'] };
  oldUser.cfg.dayPlan = { push: { 'Flat barbell bench press': { w: 235, r: 5 } } };
  oldUser.cfg.syncDismiss = { 'Lat pulldown': 100 };
  oldUser.mw = { 'Hack squat': 75, 'Plate-loaded standing calf raise': 40, 'Smith machine': 20 };
  const renamedOK = (s) => {
    const names = new Set(s.history.flatMap(h => h.exercises.map(e => e.name)));
    return names.has('Barbell bench press') && names.has('Machine hack squat') && names.has('Leg press') && !names.has('Flat barbell bench press') && !names.has('Hack squat') &&
      JSON.stringify(s.cfg.customDays.push) === JSON.stringify(['Barbell bench press', 'Machine pulldown', 'My cable thing']) &&
      s.cfg.dayPlan.push['Barbell bench press'].w === 235 && !('Flat barbell bench press' in s.cfg.dayPlan.push) &&
      s.cfg.syncDismiss['Machine pulldown'] === 100 && !('Lat pulldown' in s.cfg.syncDismiss) &&
      s.mw['Hack squat'] === 75 && s.mw['Machine plate-loaded calf raise'] === 40 && !('Plate-loaded standing calf raise' in s.mw) && s.mw['Smith machine'] === 20 &&
      s.prs['Barbell bench press'] && s.prs['Machine hack squat'] && s.prs['Leg press'] && !s.prs['Flat barbell bench press'] && !s.prs['Hack squat'];
  };
  let [cR, r1] = await ctx();
  await seed(r1, oldUser);
  const ren = await stored(r1);
  check('renames: history, custom days, day plan, sync chip, machine bases and PRs move to the new names', renamedOK(ren), JSON.stringify({ d: ren.cfg.customDays, p: ren.cfg.dayPlan, mw: ren.mw, prs: Object.keys(ren.prs) }));
  check('renames: sets, feel and notes are untouched', ren.history.length === 6 && ren.history[0].exercises[0].sets.length === 3 && ren.history[0].exercises[1].note === 'custom note');
  await r1.reload(); await r1.waitForSelector('#s-home.active');
  check('renames: a second load changes nothing', core(await stored(r1)) === core(ren));
  check('renames: an in-progress workout and day edit are renamed on resume', await r1.evaluate(() => {
    const rn = exRenamer(), sd = [{ ex: { name: 'Lat pulldown' }, sets: [] }, { ex: { name: 'My cable thing' }, sets: [] }], list = [{ name: 'Hack squat' }];
    renameExList(sd, rn); renameExList(list, rn);
    return sd[0].ex.name === 'Machine pulldown' && sd[1].ex.name === 'My cable thing' && list[0].name === 'Machine hack squat' && rn('Leg press') === 'Leg press';
  }));
  check('renames: every built-in exercise still has its image file', await r1.evaluate(async () => {
    const miss = [];
    for (const n of Object.keys(EXPOOL)) { if (EXPOOL[n].custom) continue; const r = await fetch('images/exercises/' + exSlug(EX_OLD_NAME[n] || n) + (EXPOOL[n].webp ? '.webp' : '.png'), { method: 'HEAD' }); if (!r.ok) miss.push(n); }
    return miss.length ? miss.join(', ') : true;
  }) === true);
  await cR.close();
  // A backup made before the renames restores under the new names.
  const oldFile = path.join(OUT, 'old-names.json');
  await writeFile(oldFile, JSON.stringify({ cfg: oldUser.cfg, history: oldUser.history, prs: {}, mw: oldUser.mw, bw: oldUser.bw, exported: new Date().toISOString(), version: '2.0' }));
  let [cS, r2] = await ctx();
  await r2.goto(URL0);
  await r2.waitForSelector('#ob-import-file', { state: 'attached' });
  await r2.setInputFiles('#ob-import-file', oldFile);
  await r2.waitForSelector('#s-home.active');
  check('renames: a backup made under the old names restores under the new ones', renamedOK(await stored(r2)));
  await cS.close();

  // ── 2. Restoring over existing data: confirm, keep a copy, undo.
  const other = bigUser(100); other.history = other.history.slice(0, 12);
  let [cC, c] = await ctx();
  await seed(c, other);
  const mine = await stored(c);
  c.once('dialog', d => d.dismiss());
  await c.evaluate(() => { openSettings(); openDataSettings(); });
  await c.setInputFiles('#import-file', file);
  await c.waitForTimeout(500);
  check('restore over data: cancelling the confirm changes nothing', core(await stored(c)) === core(mine));
  c.once('dialog', d => d.accept());
  await c.setInputFiles('#import-file', file);
  await c.waitForSelector('#s-home.active');
  check('restore over data: accepted restore brings in the backup', core(await stored(c)) === core(before));
  check('restore over data: the previous data is kept for undo', await c.evaluate(() => JSON.parse(localStorage.getItem('gp_pre_restore') || 'null')?.history?.length) === 12);
  await c.evaluate(() => { openSettings(); openDataSettings(); });
  check('restore over data: Undo button is shown', await c.isVisible('#undo-restore-btn'));
  c.once('dialog', d => d.accept());
  await c.click('#undo-restore-btn');
  await c.waitForSelector('#s-home.active');
  check('undo restore: the original data is back exactly', core(await stored(c)) === core(mine));
  check('undo restore: the kept copy is cleared', await c.evaluate(() => localStorage.getItem('gp_pre_restore')) === null);
  await c.setInputFiles('#import-file', path.join(ROOT, 'package.json'));
  await c.waitForFunction(() => /invalid backup/.test(gid('ex-st').textContent), null, { timeout: 5000 }).catch(() => {});
  check('restore: a non-backup JSON file is rejected with a message', /invalid backup/.test(await c.textContent('#ex-st')) && core(await stored(c)) === core(mine));
  await cC.close();

  // ── 3. Save failures are visible, and Back up still works from memory.
  let [cD, d] = await ctx();
  await seed(d, bigUser(135));
  check('save alert: hidden while saving works', !(await d.isVisible('#save-alert')));
  await d.evaluate(() => {
    window.__realSet = Storage.prototype.setItem;
    Storage.prototype.setItem = function () { throw new DOMException('full', 'QuotaExceededError'); };
    setWeighIn(dkey(new Date()), 186);
  });
  check('save alert: a failed save shows the alert', await d.isVisible('#save-alert'));
  await d.screenshot({ path: path.join(OUT, 'save-alert.png') });
  const [dl2] = await Promise.all([d.waitForEvent('download'), d.click('#save-alert button')]);
  const rescue = JSON.parse(await readFile(await dl2.path(), 'utf8'));
  check('save alert: Back up works while saving fails, and includes the unsaved weigh-in', rescue.bw[rescue.bw.length - 1].w === 186);
  await d.evaluate(() => { Storage.prototype.setItem = window.__realSet; saveData(); });
  check('save alert: clears once a save succeeds again', !(await d.isVisible('#save-alert')));
  check('save alert: the weigh-in is saved once storage works', await d.evaluate(() => JSON.parse(localStorage.getItem('gp_bw')).some(e => e.w === 186)));
  await cD.close();

  // ── 4. Backup reminder interval.
  let [cE, e] = await ctx();
  const five = new Date(Date.now() - 5 * 864e5).toISOString();
  const eu = bigUser(135); eu.cfg.exportedAtHistoryLen = eu.history.length; // backed up after the last session, so only the day rule applies
  await seed(e, eu, { gp_last_export: five, gp_backup_nudge_seen: five });
  check('reminder: 5 days since backup with a 7-day interval → no reminder', await e.evaluate(() => checkBackupNudge()) === false);
  await e.evaluate(() => { openSettings(); openDataSettings(); });
  await e.click('#bkd-3');
  await e.evaluate(() => ss('home'));
  const rem = await e.evaluate(() => ({ banner: gid('prt-h').textContent, saved: JSON.parse(localStorage.getItem('gp_cfg')).backupEveryDays }));
  check('reminder: after switching to 3 days, going back to Train shows the reminder; the setting is saved', /back up/i.test(rem.banner) && rem.saved === 3, rem);
  check('status: shows days since the last backup', /Last backup: 5 day/.test(await e.textContent('#bk-status')));
  check('desktop: no iPhone warning banner or risk line', !/could be deleted/.test(await e.textContent('#prt-h')) && !/7 days/.test(await e.textContent('#bk-status')));
  // ── Privacy screen + page.
  await e.evaluate(() => localStorage.removeItem('gp_anon_id'));
  await e.evaluate(() => { openSettings(); openPrivacySettings(); });
  check('privacy: with no ID yet, the screen shows none and does not create one', (await e.textContent('#privacy-anon-id')) === '—' && await e.evaluate(() => localStorage.getItem('gp_anon_id')) === null);
  const anon = await e.evaluate(() => getAnonId());
  await e.evaluate(() => openPrivacySettings());
  check('privacy: the screen shows the exact ID the usage counter receives', (await e.textContent('#privacy-anon-id')) === anon);
  await e.setViewportSize({ width: 390, height: 844 }); await e.waitForTimeout(400); await e.screenshot({ path: path.join(OUT, 'privacy-settings.png'), fullPage: true });
  const pp = await (await e.context()).newPage(); const ext = []; const perr = [];
  pp.on('request', r => { const h = new URL(r.url()).hostname; if (h !== 'localhost') ext.push(h); }); pp.on('pageerror', x => perr.push(String(x)));
  await pp.goto(`http://localhost:${PORT}/privacy.html`); await pp.waitForLoadState('networkidle');
  check('privacy.html: loads with no third-party requests and no errors', ext.length === 0 && perr.length === 0 && /Your workouts stay on your device/.test(await pp.textContent('body')), { ext, perr });
  await pp.setViewportSize({ width: 390, height: 844 }); await pp.screenshot({ path: path.join(OUT, 'privacy-page.png'), fullPage: true });
  check('privacy.html: no horizontal scroll at phone width', await pp.evaluate(() => document.documentElement.scrollWidth <= 390));
  await pp.close();
  await cE.close();

  // ── 6. IndexedDB mirror: verified migration, dual-write, recovery, reset.
  const idbDump = (page) => page.evaluate(() => new Promise((res, rej) => {
    const r = indexedDB.open('gainpath', 1);
    r.onsuccess = () => {
      const d = r.result, out = { kv: {}, meta: {}, backups: {} }, tx = d.transaction(['kv', 'meta', 'backups']);
      ['kv', 'meta', 'backups'].forEach(n => { const c = tx.objectStore(n).openCursor(); c.onsuccess = () => { const x = c.result; if (x) { out[n][x.key] = x.value; x.continue(); } }; });
      tx.oncomplete = () => { d.close(); res(out); }; tx.onerror = () => rej(tx.error);
    };
    r.onerror = () => rej(r.error);
  }));
  const lsAll = (page) => page.evaluate(() => { const o = {}; for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k.startsWith('gp_')) o[k] = localStorage.getItem(k); } return o; });
  const idbSettled = (page) => page.waitForFunction(() => IDB_READY || (IDB_ACTIVE_STATE && IDB_ACTIVE_STATE.state === 'failed'));
  const mirrorMatches = (ls, kv) => ['gp_cfg', 'gp_h', 'gp_p', 'gp_mw', 'gp_bw'].every(k => ls[k] === kv[k]);

  // Fresh user (no data yet).
  let [cF, f] = await ctx();
  await f.goto(URL0); await idbSettled(f);
  let db = await idbDump(f);
  check('idb/fresh user: migration verified with nothing to copy, backup snapshot written', db.meta.migration?.state === 'verified' && !!db.backups['pre-idb-2.9.0']);
  await f.evaluate(() => { CFG.firstName = 'Fresh'; saveCFG(); });
  await f.waitForTimeout(100); db = await idbDump(f);
  check('idb/fresh user: later saves are mirrored', db.kv.gp_cfg === await f.evaluate(() => localStorage.getItem('gp_cfg')));
  await cF.close();

  // Large lbs history with custom exercises: migrate, verify, backup, re-run.
  let [cG, g] = await ctx();
  const gu = bigUser(185);
  await seedCold(g, gu);
  await idbSettled(g);
  const lsBefore = { gp_h: JSON.stringify(gu.history) };
  db = await idbDump(g);
  const lsNow = await lsAll(g);
  check('idb/large lbs user: migration verified', db.meta.migration?.state === 'verified', db.meta.migration);
  check('idb/large lbs user: mirror matches localStorage key by key (400 sessions, custom exercise, lbs)',
    mirrorMatches(lsNow, db.kv) && JSON.parse(db.kv.gp_h).length === 400 && JSON.parse(db.kv.gp_cfg).unit === 'lbs' && JSON.parse(db.kv.gp_cfg).customExercises[0].name === 'My cable thing');
  check('idb/large lbs user: pre-migration backup holds the original data', db.backups['pre-idb-2.9.0'].data.gp_h === lsBefore.gp_h && JSON.parse(db.backups['pre-idb-2.9.0'].data.gp_cfg).name === 'Big Lbs');
  check('idb/localStorage untouched by the migration', lsNow.gp_h === lsBefore.gp_h && lsNow.gp_bw === JSON.stringify(gu.bw) && lsNow.gp_mw === JSON.stringify(gu.mw));
  const firstAt = db.backups['pre-idb-2.9.0'].at, firstMig = db.meta.migration.at;
  await g.reload(); await g.waitForSelector('#s-home.active'); await idbSettled(g);
  db = await idbDump(g);
  check('idb/running twice: backup and migration record are not redone', db.backups['pre-idb-2.9.0'].at === firstAt && db.meta.migration.at === firstMig);
  await g.evaluate(() => setWeighIn(dkey(new Date()), 183.2)); await g.waitForTimeout(150);
  db = await idbDump(g);
  check('idb/dual-write: a new weigh-in lands in both stores', mirrorMatches(await lsAll(g), db.kv) && JSON.parse(db.kv.gp_bw).some(e => e.w === 183.2));

  // localStorage loses the data, the verified mirror brings it back once.
  await g.evaluate(() => localStorage.clear());
  await g.reload(); await g.waitForSelector('#s-home.active', { timeout: 15000 });
  check('idb/recovery: after localStorage is wiped, the app comes back with all 400 sessions', await g.evaluate(() => ST.history.length) === 400 && await g.evaluate(() => JSON.parse(localStorage.getItem('gp_bw')).some(e => e.w === 183.2)));

  // Erase all data must stay erased.
  g.once('dialog', dd => dd.accept());
  await g.evaluate(() => { openSettings(); resetApp(); });
  await g.waitForSelector('#s-ob.active, #s-onboarding.active, .ob-step.active', { timeout: 15000 });
  await g.reload(); await g.waitForTimeout(800);
  check('idb/reset: erased data does not come back from the mirror', await g.evaluate(() => !localStorage.getItem('gp_cfg') && ST.history.length === 0));
  await cG.close();

  // Partially migrated (interrupted copy, no verified flag): finishes cleanly.
  let [cH, h] = await ctx();
  await seed(h, bigUser(150));
  await idbSettled(h);
  await h.evaluate(() => new Promise(r => { const tx = IDB.transaction(['kv', 'meta'], 'readwrite'); tx.objectStore('meta').delete('migration'); tx.objectStore('kv').clear(); tx.objectStore('kv').put('[{"stale":true}]', 'gp_h'); tx.oncomplete = r; }));
  await h.reload(); await h.waitForSelector('#s-home.active'); await idbSettled(h);
  db = await idbDump(h);
  check('idb/partial state: re-run completes, verifies, and replaces the stale partial copy', db.meta.migration?.state === 'verified' && mirrorMatches(await lsAll(h), db.kv));
  await cH.close();

  // Verification failure: mirror corrupts gp_h → stays on localStorage, logs why.
  let [cI, iP] = await ctx();
  const warns = []; iP.on('console', m => { if (m.type() === 'warning') warns.push(m.text()); });
  await iP.addInitScript(() => {
    const put = IDBObjectStore.prototype.put;
    IDBObjectStore.prototype.put = function (v, k) { return put.call(this, k === 'gp_h' && typeof v === 'string' ? v.replace('"w":185', '"w":186') : v, k); };
  });
  const iu = bigUser(185);
  await seedCold(iP, iu);
  await idbSettled(iP);
  const lsI = { gp_h: JSON.stringify(iu.history) };
  db = await idbDump(iP);
  check('idb/verification failure: state failed with the reason recorded', db.meta.migration?.state === 'failed' && /gp_h session \d+ differs/.test(db.meta.migration.reason), db.meta.migration);
  check('idb/verification failure: logged, mirroring off, localStorage unchanged, app works',
    warns.some(w => /verification failed/.test(w)) && await iP.evaluate(() => !IDB_READY) && (await lsAll(iP)).gp_h === lsI.gp_h && await iP.evaluate(() => ST.history.length) === 400);
  await cI.close();

  await browser.close();

  // ── 5. iPhone, not installed (WebKit with an iPhone user agent).
  const wk = await webkit.launch();
  const ic = await wk.newContext({ ...devices['iPhone 13'] });
  const ip = await ic.newPage(); ip.on('pageerror', x => errors.push(String(x)));
  await seed(ip, bigUser(135));
  check('iPhone: "could be deleted" warning shows on Train', /could be deleted/.test(await ip.textContent('#prt-h')));
  check('iPhone: warning offers a backup when there is data', await ip.isVisible('#prt-h button[onclick="exportData()"]'));
  await ip.waitForTimeout(500);
  await ip.screenshot({ path: path.join(OUT, 'iphone-warning.png') });
  await ip.click('#prt-h button[onclick="dismissIOSWarn()"]');
  check('iPhone: Later dismisses it', !/could be deleted/.test(await ip.textContent('#prt-h')));
  await ip.evaluate(() => { localStorage.setItem('gp_ios_warn_dismissed', new Date(Date.now() - 31 * 864e5).toISOString()); renderHomeBanners(); });
  check('iPhone: it returns 30 days after dismissal', /could be deleted/.test(await ip.textContent('#prt-h')));
  await ip.evaluate(() => { openSettings(); openDataSettings(); });
  check('iPhone: Reports & backup shows the 7-day risk', /7 days/.test(await ip.textContent('#bk-status')));
  await ip.waitForTimeout(500);
  await ip.screenshot({ path: path.join(OUT, 'iphone-data-settings.png') });
  await wk.close();
  await photoTests(chromium, 'chromium', check, errors);
  await photoTests(webkit, 'webkit', check, errors);
  await auditTests(chromium, 'chromium', check, errors);
  await auditTests(webkit, 'webkit', check, errors);
  await migrationTests(chromium, 'chromium', check, errors);
  await migrationTests(webkit, 'webkit', check, errors);
  await bootTests(chromium, 'chromium', check, errors);
  await bootTests(webkit, 'webkit', check, errors);
  server.close();

  printAndExit(results, errors);
}

main();
