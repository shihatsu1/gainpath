// The one list of what gets published to GitHub Pages: the app only. Used by
// scripts/stage_site.mjs (the Pages workflow) and by visual-check, which fails if a
// file the service worker precaches would not be published and if any published file
// still names the old host. Everything else in the repo (docs, scripts, marketing,
// analytics-worker, notes) stays out of the site.
export const PUBLISHED = ['index.html', 'js', 'sw.js', 'manifest.json', 'privacy.html', 'guides', 'sitemap.xml', 'images', 'fonts', 'vendor'];
