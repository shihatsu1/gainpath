# Startup performance, F11 (exercise text split)

`npm run measure:startup` (Chromium, service worker blocked, throttled, 390×844, English). One run each, on the
same machine, so treat differences under ~10% as noise.

| | Before (2.12.0, one `exercise-text.js`) | After (per-language files) |
|---|---|---|
| Exercise text transferred | 484.8 KB (3.2 MB uncompressed) | 146.0 KB (913 KB uncompressed, English only) |
| Total transferred | 802.1 KB | 463.9 KB |
| Time to interactive | 4213 ms | 2570 ms |
| JS heap | 4.8 MB | 3.3 MB |
| Requests | 23 | 24 |

The "before" row is the run's `cdn-slow` variant, which is identical to the baseline now that nothing loads from a CDN;
the baseline line itself was cut from the captured output. A Japanese or Korean user also loads their own file
(about 1.1 MB uncompressed, ~160 KB transferred) before the first screen, from the cache after the first visit.
`no-exercise-text` (an empty stub) is the floor: 1854 ms, 318 KB, so the split recovered most of what the file cost.

Install size is unchanged by this split (6.2 MB): all three files are precached so every language works offline and
a language switch never needs the network. The alternative, precaching only the current language, would cut install
by about 2 MB but lets a switch fail offline; not done.
