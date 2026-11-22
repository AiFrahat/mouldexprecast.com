import { test, expect } from '@playwright/test';
import { routes, waitForImages } from './helpers';

const KEY_ROUTES = [
  '/en/',
  '/en/about/',
  '/en/services/',
  '/en/services/precast-claddings/',
  '/en/projects/',
  '/en/projects/madinat-jumeirah-living-phase-4/',
  '/en/contact/',
  '/ar/',
  '/ar/services/',
  '/ar/projects/',
];

test.describe('images and brand assets', () => {
  for (const route of KEY_ROUTES) {
    test(`every image on ${route} loads with alt text`, async ({ page }) => {
      const failed: string[] = [];
      page.on('response', (response) => {
        const url = response.url();
        if (/\.(jpe?g|png|webp|ico|svg)(\?|$)/i.test(url) && response.status() >= 400) {
          failed.push(`${response.status()} ${url}`);
        }
      });
      await page.goto(route, { waitUntil: 'load' });
      // force lazy images to load
      await page.evaluate(async () => {
        for (const image of Array.from(document.images)) {
          image.loading = 'eager';
          if (!image.complete) {
            const src = image.getAttribute('src') ?? '';
            image.setAttribute('src', src);
          }
        }
        await Promise.all(
          Array.from(document.images).map((image) => image.decode().catch(() => undefined)),
        );
      });
      await waitForImages(page);

      const images = await page.$$eval('img', (nodes) =>
        nodes.map((image) => ({
          src: image.currentSrc || image.src,
          alt: image.getAttribute('alt'),
          naturalWidth: image.naturalWidth,
        })),
      );
      expect(images.length).toBeGreaterThan(0);
      for (const image of images) {
        expect(image.naturalWidth, `broken image ${image.src}`).toBeGreaterThan(0);
        expect(image.alt, `missing alt on ${image.src}`).not.toBeNull();
        expect((image.alt ?? '').trim().length, `empty alt on ${image.src}`).toBeGreaterThan(2);
      }
      expect(failed, 'image requests failed').toEqual([]);
    });
  }

  test('logo, favicon and social image are served', async ({ request }) => {
    const assets = [
      '/brand/mouldex-logo-full.png',
      '/brand/mouldex-logo-reversed-160.png',
      '/favicon.ico',
      '/favicon-32.png',
      '/apple-touch-icon.png',
      '/og-image.jpg',
      '/site.webmanifest',
    ];
    for (const asset of assets) {
      const response = await request.get(asset);
      expect(response.status(), asset).toBe(200);
    }
  });

  test('header and footer use the supplied logo', async ({ page }) => {
    await page.goto('/en/');
    await expect(page.locator('.brand img')).toHaveAttribute('src', '/brand/mouldex-logo-full.png');
    await expect(page.locator('.site-footer img')).toHaveAttribute(
      'src',
      '/brand/mouldex-logo-reversed-160.png',
    );
    const favicon = await page.locator('link[rel="icon"][href="/favicon.ico"]').count();
    expect(favicon).toBe(1);
  });

  test('hero photograph is the project image from the company profile', async ({ page }) => {
    await page.goto('/en/');
    const heroSrc = await page.locator('.hero__media img').getAttribute('src');
    expect(heroSrc).toContain('bulgari-ocean-villas');
    await expect(page.locator('.hero__media img')).toHaveAttribute('alt', /Bulgari/);
  });
});
