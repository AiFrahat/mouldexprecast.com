/**
 * Screenshot helper for visual QA.
 * Usage: node scripts/screenshots.mjs [baseUrl] [outDir]
 * Uses the locally installed Chrome (channel: 'chrome'), no browser download.
 */
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const base = process.argv[2] ?? 'http://127.0.0.1:4321';
const outDir = process.argv[3] ?? 'qa/screenshots';

const pages = [
  ['en-home', '/en/', 'desktop'],
  ['en-home-mobile', '/en/', 'mobile'],
  ['en-about', '/en/about/', 'desktop'],
  ['en-services', '/en/services/', 'desktop'],
  ['en-service-claddings', '/en/services/precast-claddings/', 'desktop'],
  ['en-projects', '/en/projects/', 'desktop'],
  ['en-project-mjl', '/en/projects/madinat-jumeirah-living-phase-4/', 'desktop'],
  ['en-contact', '/en/contact/', 'desktop'],
  ['ar-home', '/ar/', 'desktop'],
  ['ar-home-mobile', '/ar/', 'mobile'],
  ['ar-about', '/ar/about/', 'desktop'],
  ['ar-services', '/ar/services/', 'desktop'],
  ['ar-service-claddings', '/ar/services/precast-claddings/', 'desktop'],
  ['ar-projects', '/ar/projects/', 'desktop'],
  ['ar-project-mjl', '/ar/projects/madinat-jumeirah-living-phase-4/', 'desktop'],
  ['ar-contact', '/ar/contact/', 'desktop'],
  ['not-found', '/404.html', 'desktop'],
];

const viewports = {
  desktop: { width: 1440, height: 1000 },
  mobile: { width: 390, height: 844 },
};

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
const consoleErrors = [];

for (const [name, url, device] of pages) {
  const context = await browser.newContext({
    viewport: viewports[device],
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(`${url}: ${message.text()}`);
  });
  page.on('pageerror', (error) => consoleErrors.push(`${url}: pageerror ${error.message}`));
  await page.goto(base + url, { waitUntil: 'networkidle' });
  // force lazy images below the fold to load, then wait for decode
  await page.evaluate(async () => {
    const images = Array.from(document.images);
    for (const image of images) {
      image.loading = 'eager';
      if (!image.complete || image.naturalWidth === 0) {
        const srcset = image.getAttribute('srcset');
        image.setAttribute('srcset', '');
        const src = image.getAttribute('src') ?? '';
        image.setAttribute('src', '');
        image.setAttribute('src', src);
        if (srcset) image.setAttribute('srcset', srcset);
      }
    }
    await Promise.all(
      images.map((image) => image.decode().catch(() => undefined)),
    );
  });
  await page.waitForTimeout(300);
  await page.screenshot({
    path: path.join(outDir, `${name}.png`),
    fullPage: true,
  });
  await context.close();
}

await browser.close();
if (consoleErrors.length > 0) {
  console.log('Console errors:');
  for (const error of consoleErrors) console.log(' -', error);
} else {
  console.log('No console errors.');
}
console.log(`Screenshots written to ${outDir}`);
