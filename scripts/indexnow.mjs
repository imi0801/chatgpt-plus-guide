// Submit new or changed sitemap URLs to IndexNow (Bing, Yandex, Seznam, Naver share the endpoint).
// Usage: node scripts/indexnow.mjs [--dry-run] [--all]
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = new Set(process.argv.slice(2));
const dryRun = args.has('--dry-run');
const all = args.has('--all');
const statePath = path.join(root, 'scripts', '.indexnow-state.json');
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const CHUNK = 10000;

const key = (await readFile(path.join(root, 'scripts', '.indexnow-key'), 'utf8')).trim();
if (!/^[a-f0-9]{32}$/.test(key)) throw new Error('scripts/.indexnow-key must hold a 32-char hex key');
const sitemap = await readFile(path.join(root, 'docs', 'sitemap.xml'), 'utf8');
const entries = [...sitemap.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*(?:<lastmod>([^<]*)<\/lastmod>)?/g)].map(m => [m[1].trim(), (m[2] || '').trim()]);
if (!entries.length) throw new Error('no <url> entries in docs/sitemap.xml');

const host = new URL(entries[0][0]).host;
const keyLocation = `https://${host}/${new URL(entries[0][0]).pathname.split('/')[1]}/${key}.txt`;
let state = {};
try { state = JSON.parse(await readFile(statePath, 'utf8')); } catch { state = {}; }

const changed = entries.filter(([url, lastmod]) => all || state[url] !== lastmod);
console.log(`${entries.length} sitemap URLs, ${changed.length} to submit${all ? ' (--all)' : ''}${dryRun ? ' [dry-run]' : ''}`);
if (!changed.length) process.exit(0);

let ok = true;
for (let i = 0; i < changed.length; i += CHUNK) {
  const urlList = changed.slice(i, i + CHUNK).map(([u]) => u);
  if (dryRun) { urlList.forEach(u => console.log('  ' + u)); continue; }
  const res = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: JSON.stringify({ host, key, keyLocation, urlList }) });
  const text = await res.text();
  console.log(`POST ${ENDPOINT} → ${res.status} ${res.statusText}${text ? ' ' + text.slice(0, 200) : ''} (${urlList.length} URLs)`);
  if (res.status !== 200 && res.status !== 202) { ok = false; break; }
}
if (ok && !dryRun) {
  for (const [url, lastmod] of changed) state[url] = lastmod;
  for (const url of Object.keys(state)) if (!entries.some(([u]) => u === url)) delete state[url];
  await writeFile(statePath, JSON.stringify(state, null, 2) + '\n');
  console.log(`state saved → ${path.relative(root, statePath)}`);
}
process.exit(ok ? 0 : 1);
