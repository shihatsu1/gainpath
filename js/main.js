// GainPath: the startup sequence
// A plain script (not a module) sharing one global scope with the other
// js/ files; index.html sets the load order. Map: docs/index-section-map.md
load();
// Anything after load() that throws on a set-up profile must end on the recovery
// sheet (Download keeps the raw data), never on onboarding, which would invite
// the user to overwrite gp_cfg.
function startApp(){
try{
  if(!analyticsOn())dropAnonId();
  requestPersist();idbInit();applyTheme();applyLang();OB.step=1;obDots();
  settlePendingDone();
  if(CFG.setup){
    accentColor();
    if(!restoreInProgress()){
      refreshHome();ss('home');
      if(cmpVer(CFG.lastSeenVersion,WHATS_NEW_VERSION)<0)showWhatsNew();
    }
  }else{ss('ob');}
}catch(e){
  if(!CFG.setup)throw e;
  console.error('[GainPath] startup stopped:',e);
  gid('s-ob').classList.remove('active');
  LOAD_BAD.boot_crash=JSON.stringify({error:String(e&&e.message||e),keys:lsSnapshot()});
}
if(Object.keys(LOAD_BAD).length){saveFailed('lock');showLoadRecovery();}
startMigrationReceiver();
}
// The current language's exercise text first (a cached file; English is already loaded), then start.
// A hung network must not hold the app back: after 3 s it starts with the English text.
Promise.race([loadExText(CFG.lang),new Promise(r=>setTimeout(r,3000))]).then(startApp);

if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('sw.js').catch(()=>{});});}
