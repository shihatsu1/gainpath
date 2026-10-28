#!/usr/bin/env node
// Crawls the rendered Japanese and Korean UI and fails on any visible text,
// aria-label, placeholder, title or alt that is English: a text node (or
// attribute) with a 3+ letter ASCII word and no Japanese/Korean character in it.
// Out of scope per CLAUDE.md: exercise data (names, tips, instructions), the
// PDF body, brand names and units, which are allowlisted below.
//
// Screens: onboarding (3 steps, with the split suggestion), Home and the other
// tabs, every Settings page, the day editor, the workout screen, rest, plate
// calculator, the summary and the sheets. Chromium and WebKit.
//
// Usage: npm run test:i18n

import { chromium, webkit } from './lib/browsers.mjs';
import { createServer } from 'http';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 8757;
const MIME = { '.html': 'text/html', '.png': 'image/png', '.webp': 'image/webp', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.woff2': 'font/woff2' };
const server = await new Promise((resolve) => {
  const s = createServer(async (req, res) => {
    const u = decodeURIComponent(req.url.split('?')[0]);
    let data; try { data = await readFile(path.join(ROOT, u === '/' ? '/index.html' : u)); } catch { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(u)] || 'application/octet-stream' }); res.end(data);
  });
  s.listen(PORT, () => resolve(s));
});

// Words that are allowed to stay in English: brands, units, file formats and
// the names of other products the UI points at.
const ALLOW_WORDS = ['English', 'GainPath', 'kg', 'lbs', 'lb', 'RIR', 'PDF', 'CSV', 'JSON', 'iOS', 'iPhone', 'iPad', 'Android', 'Safari', 'Chrome', 'Apple', 'Google', 'Garmin', 'Fitbit', 'Shortcuts', 'YouTube', 'EmailJS', 'Chart', 'PRs', 'Wi', 'Fi', 'Hz', 'min', 'sec', 'cm', 'ft', 'kcal', 'bpm', 'URL', 'ID', 'OK', 'WIP'];
const CFG0 = { name: 'I18n Test', firstName: 'I', sex: 'male', setup: true, unit: 'kg', exp: 'intermediate', goal: 'definition', split: 'pplul', freq: 5, warmup: true, wuReps: 12, prefReps: 10, prefRest: 90, prefSets: 3, startingWeights: 'manual', keyLifts: {}, lastSeenVersion: '9.9.9', tutorialSeen: true, badgesIntroSeen: true };

// Runs in the page: every visible text node and text-bearing attribute that is English.
const COLLECT = (allow) => {
  const exNames = new Set(Object.keys(EXPOOL));
  const CJK = /[぀-ヿ㐀-鿿가-힯＀-￯]/;
  const visible = (el) => { for (let e = el; e && e !== document.documentElement; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.display === 'none' || cs.visibility === 'hidden') return false; } return true; };
  const english = (text) => {
    let s = text;
    exNames.forEach((n) => { if (s.includes(n)) s = s.split(n).join(' '); });
    allow.forEach((w) => { s = s.replace(new RegExp('\\b' + w + '\\b', 'g'), ' '); });
    return /[A-Za-z]{3,}/.test(s) && !CJK.test(s);
  };
  const out = [];
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = w.nextNode(); n; n = w.nextNode()) {
    const p = n.parentElement; if (!p || /^(SCRIPT|STYLE|NOSCRIPT)$/.test(p.tagName)) continue;
    if (p.closest('#ch-hist-sel,#ch-sel')) continue; // exercise pickers list exercise data (out of scope)
    const text = n.textContent.replace(/\s+/g, ' ').trim(); if (!text || !visible(p)) continue;
    if (!/@/.test(text) && english(text)) out.push({ kind: 'text', text: text.slice(0, 120), where: (p.id ? '#' + p.id : p.tagName.toLowerCase() + (p.className ? '.' + String(p.className).split(' ')[0] : '')) });
  }
  document.querySelectorAll('[aria-label],[placeholder],[title],img[alt]').forEach((el) => {
    if (!visible(el)) return;
    ['aria-label', 'placeholder', 'title', 'alt'].forEach((a) => {
      const v = (el.getAttribute(a) || '').replace(/\s+/g, ' ').trim();
      if (v && !/@/.test(v) && english(v)) out.push({ kind: a, text: v.slice(0, 120), where: el.id ? '#' + el.id : el.tagName.toLowerCase() });
    });
  });
  return out;
};

const HIST = `(()=>{const mk=(d,n)=>({day:'push',dayName:'Push',date:d,dk:d,mk:d.slice(0,7),dur:'48m',sets:3,feel:'good',exercises:[{name:'Barbell bench press',exFeel:'good',sets:[{done:true,t:'x',w:60+n,r:8},{done:true,t:'x',w:60+n,r:8}]},{name:'Dumbbell lateral raise',exFeel:'good',sets:[{done:true,t:'x',w:8,r:12}]}]});return [mk('2026-09-20',0),mk('2026-09-27',2),mk('2026-10-04',4),mk('2026-10-11',5)];})()`;
const WORKOUT = `CFG.startingWeights='manual';ST.day='push';ST.exi=0;ST.t0=Date.now()-60000;ST.sd=[{ex:{name:'Barbell bench press',mg:'chest',baseW:20,equip:'barbell'},sets:[{w:20,r:12,t:'w',done:false},{w:60,r:8,t:'x',done:false},{w:60,r:8,t:'x',done:false}],sugDone:true},{ex:{name:'Dumbbell lateral raise',mg:'shoulders',baseW:8,equip:'dumbbell'},sets:[{w:8,r:12,t:'x',done:false}],sugDone:true}];renderEx();ss('wo');`;

const SCREENS = [
  ['home', ''],
  ['tab days', "stab('cal')"],
  ['tab climb', "stab('ch')"],
  ['tab climb body', "stab('ch');chSeg('body')"],
  ['tab prs', "stab('pr')"],
  ['settings', "stab('wk');openSettings()"],
  ['settings profile', "openSettings();ss('setprofile')"],
  ['settings prefs', "openSettings();ss('setprefs')"],
  ['settings rest plan', "openSettings();ss('setrestplan')"],
  ['settings equipment', "openSettings();ss('setequip')"],
  ['settings machines', "openSettings();ss('setmachines')"],
  ['settings notifications', "openSettings();ss('setnotify')"],
  ['settings watch', "openSettings();ss('setwatch')"],
  ['settings about', "openSettings();ss('setabout')"],
  ['settings reports & backup', "openSettings();openDataSettings()"],
  ['settings privacy', "openSettings();openPrivacySettings()"],
  ['settings prefs (pyramid)', "openSettings();ss('setprefs');setSettingSetStyle('pyramid')"],
  ['program day editor', "openSettings();openProgramBuilder();ST.progDraft.days.push({id:'custom-1',name:'テスト日'});CFG.customDays['custom-1']=[];renderProgramBuilder();openProgDayEdit(0)"],
  ['feedback', "openSettings();ss('feedback')"],
  ['program builder', "openSettings();openProgramBuilder()"],
  ['day editor', "clearEditState();ST.day=null;ST.sd=[];openDayEdit('push')"],
  ['workout', WORKOUT],
  ['exercise info sheet', WORKOUT + "showExInstructions('Barbell bench press')"],
  ['cancel workout sheet', WORKOUT + 'openCancelWorkoutSheet()'],
  ['organize workout sheet', WORKOUT + 'openMidWorkoutEdit()'],
  ['plate calculator', WORKOUT + "ST.plateIdx=1;gid('plate-bar-inp').value='';renderPlateCalc();ss('plate')"],
  ['whats new sheet', 'showWhatsNew()'],
  ['badge sheet', 'showBadge(BADGES[0].id)'],
  ['session detail', 'openSession(0)'],
  ['tutorial', 'showTutorial(true)'],
  ['recovery sheet', "LOAD_BAD.gp_bw='{bad';showLoadRecovery()"]
];

const results = [];
const check = (name, pass, detail) => results.push({ name, pass: !!pass, detail });

async function crawl(engine, tag, lang) {
  const browser = await engine.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: 'block' });
  const page = await ctx.newPage();
  page.setDefaultTimeout(6000);
  page.on('dialog', (d) => d.dismiss());
  const errors = []; page.on('pageerror', (e) => errors.push(String(e)));
  const found = [];
  const scan = async (label) => { for (const f of await page.evaluate(COLLECT, ALLOW_WORDS)) found.push({ screen: label, ...f }); };

  // Onboarding
  await page.goto(`http://localhost:${PORT}/index.html`);
  await page.evaluate((lang) => { localStorage.setItem('gp_cfg', JSON.stringify({ lang, setup: false })); localStorage.setItem('gp_a2hs_dismissed', 'true'); }, lang);
  await page.reload(); await page.waitForSelector('#s-ob.active');
  await scan('onboarding 1');
  await page.evaluate(() => { gid('ob-fname').value = 'I'; OB.sex = 'male'; obNext(1); });
  await scan('onboarding 2');
  await page.evaluate(() => { gid('ob-bw').value = '80'; OB.exp = 'beginner'; obNext(2); });
  for (const d of [2, 3, 4, 5, 6]) { await page.evaluate((d) => setFreq(d), d); await scan(`onboarding 3 (${d} days)`); }
  await page.evaluate(() => { OB.exp = 'intermediate'; setFreq(4); });
  await scan('onboarding 3 (intermediate)');

  // A set-up user with history
  await page.evaluate(([cfg, lang, hist]) => { localStorage.clear(); localStorage.setItem('gp_cfg', JSON.stringify({ ...cfg, lang })); localStorage.setItem('gp_h', JSON.stringify(eval(hist))); localStorage.setItem('gp_a2hs_dismissed', 'true'); localStorage.setItem('gp_last_export', new Date().toISOString()); }, [CFG0, lang, HIST]);
  await page.reload(); await page.waitForSelector('#s-home.active');
  for (const [label, code] of SCREENS) {
    if (process.env.I18N_VERBOSE) console.error(`${lang} ${label}`);
    try { await page.evaluate(() => { localStorage.removeItem('gp_wip'); localStorage.removeItem('gp_done'); }); await page.reload(); await page.waitForSelector('#s-home.active'); if (code) await page.evaluate(code); await page.waitForTimeout(150); await scan(label); }
    catch (e) { check(`${tag} ${lang} crawl: "${label}" opens`, false, String(e).slice(0, 160)); }
  }
  // The rest screen is reached by really logging a set.
  try {
    await page.evaluate(() => { localStorage.removeItem('gp_wip'); localStorage.removeItem('gp_done'); }); await page.reload(); await page.waitForSelector('#s-home.active'); await page.evaluate(WORKOUT);
    await page.evaluate(() => { ST.sd[0].sets[0].done = false; const b = document.querySelector('#ex-area .log'); if (b) b.click(); });
    await page.waitForTimeout(300); await scan('rest (after logging a set)');
  } catch (e) { check(`${tag} ${lang} crawl: rest screen opens`, false, String(e).slice(0, 160)); }
  const restName = await page.evaluate(() => ({ shown: (gid('r-en') || {}).textContent, want: exLabel(ST.sd[0].ex.name), ja: EX_NAMES_JA[ST.sd[0].ex.name], ko: EX_NAMES_KO[ST.sd[0].ex.name] }));
  check(`${tag} ${lang}: the rest screen shows the localized exercise name when one exists`, !restName.want || restName.shown === restName.want, restName);
  // Switching language re-renders what is already on screen (backup status, month picker).
  const sw = await page.evaluate((lang) => { openSettings(); openDataSettings(); setLang('en'); const en = gid('bk-status').textContent; setLang(lang); return { en, now: gid('bk-status').textContent, month: gid('ex-mo').options[0].textContent }; }, lang);
  check(`${tag} ${lang}: backup status and the month picker re-render after a language switch`, !/[\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]/.test(sw.en) && /[\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]/.test(sw.now) && /[\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]/.test(sw.month), sw);
  check(`${tag} ${lang}: no page errors while crawling`, errors.length === 0, errors);

  const seen = new Set(), unique = [];
  for (const f of found) { const k = f.kind + '|' + f.text; if (!seen.has(k)) { seen.add(k); unique.push(f); } }
  check(`${tag} ${lang}: no English text, aria-label, placeholder or title on any screen (${unique.length} found)`, unique.length === 0, unique.map((f) => `[${f.screen}] ${f.kind} ${f.where}: ${f.text}`));
  await browser.close();
}

for (const lang of ['ja', 'ko']) { await crawl(chromium, 'chromium', lang); }
await crawl(webkit, 'webkit', 'ja');
server.close();

for (const r of results) console.log(`${r.pass ? 'PASS' : 'FAIL'}  ${r.name}${r.pass || r.detail === undefined ? '' : '\n      ' + (Array.isArray(r.detail) ? r.detail.join('\n      ') : JSON.stringify(r.detail))}`);
const failed = results.filter((r) => !r.pass).length;
console.log(`\n${results.length - failed}/${results.length} passed.`);
process.exit(failed ? 1 : 0);
