/**
 * Live deployment verification (run against the published GitHub Pages site).
 *
 *   node scripts/verify-live.mjs [baseUrl]
 *
 * Sequential and generous on timeouts, so it measures the deployed site rather
 * than the local server. Checks every route, direction, metadata, canonical,
 * hreflang, image loading and console errors.
 */
import { chromium } from '@playwright/test';

const base = (process.argv[2] ?? 'https://mouldexprecast.com').replace(/\/$/, '');

const SERVICES = [
  'precast-claddings',
  'load-bearing-structures',
  'villas',
  'hollow-core-slabs',
  'precast-boundary-walls',
  'precast-joints-sealant-works',
];
const PROJECTS = [
  'madinat-jumeirah-living-phase-4',
  'bulgari-ocean-villas',
  'lamborghini-villas',
  'beachgate-by-address',
  'palmiera-the-oasis',
  'al-kharafi',
];

const routes = [];
for (const lang of ['en', 'ar']) {
  const p = `/${lang}/`;
  routes.push({ lang, path: `${p}`, kind: 'home' });
  routes.push({ lang, path: `${p}about/`, kind: 'about' });
  routes.push({ lang, path: `${p}services/`, kind: 'services' });
  for (const slug of SERVICES) routes.push({ lang, path: `${p}services/${slug}/`, kind: 'service' });
  routes.push({ lang, path: `${p}projects/`, kind: 'projects' });
  for (const slug of PROJECTS) routes.push({ lang, path: `${p}projects/${slug}/`, kind: 'project' });
  routes.push({ lang, path: `${p}contact/`, kind: 'contact' });
}

const failures = [];
const record = (where, message) => failures.push(`${where}: ${message}`);

const browser = await chromium.launch({ channel: 'chrome' });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
page.setDefaultTimeout(60_000);

let consoleErrors = [];
page.on('console', (message) => {
  if (message.type() === 'error') consoleErrors.push(message.text());
});
page.on('pageerror', (error) => consoleErrors.push(`pageerror: ${error.message}`));

console.log(`Verifying ${routes.length} routes on ${base}\n`);

for (const route of routes) {
  consoleErrors = [];
  let response;
  try {
    response = await page.goto(base + route.path, { waitUntil: 'load', timeout: 60_000 });
  } catch (error) {
    record(route.path, `navigation failed: ${error.message}`);
    continue;
  }
  if (response?.status() !== 200) record(route.path, `status ${response?.status()}`);

  // force lazy images to load, then scroll through the page to settle them
  await page.evaluate(async () => {
    for (const image of Array.from(document.images)) {
      image.loading = 'eager';
      const src = image.getAttribute('src') ?? '';
      if (src) image.setAttribute('src', src);
    }
    await new Promise((resolve) => {
      let y = 0;
      const step = () => {
        y += 600;
        window.scrollTo(0, y);
        if (y < document.body.scrollHeight) setTimeout(step, 50);
        else {
          window.scrollTo(0, 0);
          setTimeout(resolve, 400);
        }
      };
      step();
    });
  });

  const info = await page.evaluate(async () => {
    const html = document.documentElement;
    const meta = document.querySelector('meta[name="description"]');
    const canonical = document.querySelector('link[rel="canonical"]');
    const hreflang = Array.from(document.querySelectorAll('link[rel="alternate"][hreflang]')).map(
      (node) => node.getAttribute('hreflang'),
    );
    const headings = Array.from(document.querySelectorAll('h1')).map((node) =>
      (node.textContent ?? '').trim(),
    );
    // wait for every image to settle (loaded or failed) for up to 25 s
    const deadline = Date.now() + 25_000;
    while (Date.now() < deadline) {
      const pending = Array.from(document.images).filter((image) => !image.complete);
      if (pending.length === 0) break;
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
    const images = Array.from(document.images).map((image) => ({
      src: image.currentSrc || image.src,
      naturalWidth: image.naturalWidth,
      alt: image.getAttribute('alt'),
    }));
    return {
      lang: html.getAttribute('lang'),
      dir: html.getAttribute('dir'),
      title: document.title,
      description: (meta?.getAttribute('content') ?? '').trim(),
      canonical: canonical?.getAttribute('href') ?? '',
      hreflang,
      headings,
      images,
    };
  });

  if (info.lang !== route.lang) record(route.path, `lang ${info.lang} !== ${route.lang}`);
  const expectedDir = route.lang === 'ar' ? 'rtl' : 'ltr';
  if (info.dir !== expectedDir) record(route.path, `dir ${info.dir} !== ${expectedDir}`);
  if (info.title.trim().length < 10) record(route.path, 'title too short');
  if (info.description.length < 50) record(route.path, `meta description too short (${info.description.length})`);
  if (!info.canonical.startsWith(`${base}/`)) record(route.path, `canonical ${info.canonical}`);
  for (const code of ['en', 'ar', 'x-default']) {
    if (!info.hreflang.includes(code)) record(route.path, `missing hreflang ${code}`);
  }
  if (info.headings.length !== 1) record(route.path, `h1 count ${info.headings.length}`);
  if (route.lang === 'ar' && !/[\u0600-\u06FF]/.test(info.headings[0] ?? '')) {
    record(route.path, `Arabic h1 is not Arabic: "${info.headings[0]}"`);
  }
  const broken = info.images.filter((image) => image.naturalWidth === 0);
  for (const image of broken) record(route.path, `broken image ${image.src}`);
  const missingAlt = info.images.filter((image) => !(image.alt ?? '').trim());
  for (const image of missingAlt) record(route.path, `empty alt ${image.src}`);
  if (consoleErrors.length > 0) record(route.path, `console errors: ${consoleErrors.join(' | ')}`);

  console.log(
    `${info.lang}/${info.dir} ${String(response?.status()).padEnd(4)} images:${info.images.length} ${route.path} — ${info.title.slice(0, 60)}`,
  );
}

// root redirect + 404 behaviour
try {
  const root = await page.goto(base + '/', { waitUntil: 'load' });
  await page.waitForURL(`**/en/`, { timeout: 15_000 });
  if (root?.status() !== 200) record('/', `root status ${root?.status()}`);
  console.log(`ok   / redirects to ${new URL(page.url()).pathname}`);
} catch (error) {
  record('/', `redirect failed: ${error.message}`);
}

try {
  const missing = await page.goto(`${base}/en/this-page-does-not-exist/`, { waitUntil: 'domcontentloaded' });
  if (missing?.status() !== 404) record('/404', `unknown route status ${missing?.status()}`);
  const hasTitle = (await page.locator('h1').innerText()).length > 3;
  if (!hasTitle) record('/404', 'no h1 on 404 page');
  console.log('ok   unknown route returns the 404 page');
} catch (error) {
  record('/404', error.message);
}

// main navigation + language switch on the live site
try {
  await page.goto(`${base}/en/services/villas/`, { waitUntil: 'load' });
  await page.locator('.header__end .lang-switch').click();
  await page.waitForURL('**/ar/services/villas/**', { timeout: 20_000 });
  if (!page.url().includes('/ar/services/villas/')) record('language switch', page.url());
  console.log('ok   language switch keeps the current page');
} catch (error) {
  record('language switch', error.message);
}

await browser.close();

console.log('');
if (failures.length > 0) {
  console.log(`FAILED (${failures.length})`);
  for (const failure of failures) console.log(' -', failure);
  process.exit(1);
}
console.log(`PASSED — ${routes.length} routes verified on ${base}`);
