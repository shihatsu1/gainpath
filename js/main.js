// GainPath: the startup sequence
// A plain script (not a module) sharing one global scope with the other
// js/ files; index.html sets the load order. Map: docs/index-section-map.md
load();
// Anything after load() that throws on a set-up profile must end on the recovery
// sheet (Download keeps the raw data), never on onboarding, which would invite
// the user to overwrite gp_cfg.
try{
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

if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('sw.js').catch(()=>{});});}
