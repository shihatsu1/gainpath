#!/usr/bin/env node
// Copies exactly the published app files (scripts/publish_list.mjs) into _site/,
// which the Pages workflow uploads. Usage: node scripts/stage_site.mjs
import { cp, rm, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { PUBLISHED } from './publish_list.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, '_site');
await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
for (const entry of PUBLISHED) await cp(path.join(ROOT, entry), path.join(OUT, entry), { recursive: true });
console.log(`Staged ${PUBLISHED.length} entries into _site/`);
