import assert from 'node:assert/strict';
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
assert.match(home, /fonts\/geist\/Geist-Regular.woff2/);
assert.doesNotMatch(home, /calorie ,and/);
assert.equal((await get('/month')).status, 404, 'obsolete unknown URL remains a real 404');
console.log(`PASS: ${count} sitemap pages; HTTP status, canonical, title, description, one H1, robots, JSON-LD, internal discovery, article authorship and calculator links.`);
