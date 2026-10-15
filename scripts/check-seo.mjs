import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const base = process.argv[2] ?? 'http://localhost:3000';
const get = async (path) => {
  const res = await fetch(new URL(path, base), { redirect: 'manual', signal: AbortSignal.timeout(30000) });
  return { status: res.status, html: await res.text(), headers: res.headers };
};
const sitemap = await get('/sitemap.xml');
assert.equal(sitemap.status, 200, 'sitemap status');
const urls = [...sitemap.html.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
assert.ok(urls.length > 50, 'sitemap includes public content');
assert.equal(new Set(urls).size, urls.length, 'no duplicate sitemap URLs');
const robots = await get('/robots.txt');
assert.equal(robots.status, 200);
assert.match(robots.html, /Sitemap: https:\/\/helthy.app\/sitemap.xml/);
assert.doesNotMatch(robots.html, /Disallow: \/\s*$/m);
let count = 0;
const pages = new Map();
for (let i = 0; i < urls.length; i += 4) {
  await Promise.all(urls.slice(i, i + 4).map(async url => {
    assert.equal(new URL(url).origin, 'https://helthy.app');
    const path = new URL(url).pathname;
    const { status, html, headers } = await get(path);
    assert.equal(status, 200, `${path} responds successfully`);
    assert.doesNotMatch(headers.get('x-robots-tag') ?? '', /noindex/i, `${path} response indexable`);
    assert.match(html, /<title>[^<]+<\/title>/, `${path} title`);
    assert.match(html, /<meta name="description" content="[^"]+"/, `${path} description`);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
    assert.ok(canonical, `${path} canonical exists`);
    assert.equal(canonical[1].replace(/\/$/, ''), url.replace(/\/$/, ''), `${path} self canonical`);
    assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${path} one H1`);
    assert.doesNotMatch(html, /<meta name="robots" content="[^"]*noindex/, `${path} indexable`);
    for (const match of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) JSON.parse(match[1]);
    pages.set(path, html); count++;
  }));
}
// Verify every sitemap page can be reached through rendered internal anchors.
const paths = new Set(urls.map(url => new URL(url).pathname));
const linked = new Set(['/']);
for (const html of pages.values()) {
  for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const url = new URL(href.replaceAll('&amp;', '&'), 'https://helthy.app');
    if (url.origin === 'https://helthy.app') linked.add(url.pathname);
  }
}
for (const path of paths) assert.ok(linked.has(path), `${path} has a rendered internal link`);
const article = pages.get('/blog/how-much-protein-to-build-muscle');
assert.match(article, /"author":\{"@type":"Organization"/);
assert.match(article, /href="\/about#editorial"/);
assert.match(pages.get('/tools/tdee-calculator'), /id="check-your-estimate"/);
assert.match(pages.get('/tools/tdee-calculator'), /href="https:\/\/pubmed.ncbi.nlm.nih.gov\/2305711\/"/);
const home = pages.get('/');
assert.match(home, /fetchPriority="high"|fetchpriority="high"/);
assert.match(home, /fonts\/unbounded\/Unbounded-Medium.woff2/);
assert.doesNotMatch(home, /calorie ,and/);
assert.equal((await get('/month')).status, 404, 'obsolete unknown URL remains a real 404');

// Check the article body, not the shared footer, for contextual product links.
const body = path => pages.get(path).match(/<article\b[\s\S]*?<\/article>/)?.[0] ?? '';
assert.match(body('/blog/how-much-protein-to-build-muscle'), /href="\/calorie-tracker"/);
assert.match(body('/exercises/tricep-dip'), /href="\/workout-tracker"/);

// Every exercise must be discoverable through the rendered related-guides block.
const exercisePaths = [...paths].filter(path => path.startsWith('/exercises/'));
const relatedTargets = new Set();
for (const path of exercisePaths) {
  const related = pages.get(path).match(/<section[^>]*>\s*<h2[^>]*>More [\s\S]*?<\/section>/)?.[0] ?? '';
  const targets = [...related.matchAll(/href="(\/exercises\/[^"]+)"/g)].map(m => m[1]);
  assert.ok(targets.length > 0 && targets.length <= 5, `${path} related guides render`);
  assert.equal(new Set(targets).size, targets.length, `${path} no duplicate related links`);
  for (const target of targets) {
    assert.notEqual(target, path, `${path} no self-link`);
    assert.ok(paths.has(target), `${target} exists`);
    relatedTargets.add(target);
  }
}
for (const path of exercisePaths) assert.ok(relatedTargets.has(path), `${path} receives a related-guide link`);

// Recorded dates must survive sitemap serialization; never substitute build time.
for (const [, entry] of sitemap.html.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
  const path = new URL(entry.match(/<loc>(.*?)<\/loc>/)[1]).pathname;
  if (!/^\/(exercises|blog)\/.+/.test(path)) continue;
  const file = `content${path}.mdx`;
  const meta = readFileSync(file, 'utf8').split(/\n};?/)[0];
  const updated = meta.match(/updated:\s*"([^"]+)"/)?.[1];
  const published = meta.match(/date:\s*"([^"]+)"/)?.[1];
  const expected = updated ?? published;
  assert.match(expected, /^\d{4}-\d{2}-\d{2}$/);
  assert.ok(expected <= new Date().toISOString().slice(0, 10), `${path} date is not in the future`);
  if (published && updated) assert.ok(updated >= published, `${path} update follows publication`);
  assert.equal(entry.match(/<lastmod>(.*?)<\/lastmod>/)?.[1], expected, `${path} recorded lastmod`);
}
const pricingText = pages.get('/pricing').replace(/<[^>]*>/g, '');
assert.match(pricingText, /Barcode scansUnlimitedUnlimited/);
assert.match(pricingText, /AI meal photo scans2 a weekUnlimited/);
assert.match(pages.get('/calorie-tracker'), /Barcode scans are unlimited on the free plan/);
const llms = await get('/llms.txt');
assert.equal(llms.status, 200);
assert.match(llms.html, /Unlimited barcode scans/);
assert.doesNotMatch(llms.html, /2 camera scans a week/);
console.log(`PASS: ${count} sitemap pages; status, metadata, robots, JSON-LD, recorded dates, internal links, ${exercisePaths.length} related-guide coverage, contextual product links and barcode allowances.`);
