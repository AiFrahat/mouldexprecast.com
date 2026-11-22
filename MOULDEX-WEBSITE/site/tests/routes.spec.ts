import { test, expect } from '@playwright/test';
import { routes, collectPageErrors } from './helpers';

test.describe('routes and document metadata', () => {
  for (const route of routes) {
    test(`GET ${route.path} renders a complete document`, async ({ page }) => {
      const errors = collectPageErrors(page);
      const response = await page.goto(route.path, { waitUntil: 'domcontentloaded' });
      expect(response?.status(), `status for ${route.path}`).toBe(200);

      // language + direction
      await expect(page.locator('html')).toHaveAttribute('lang', route.lang);
      await expect(page.locator('html')).toHaveAttribute(
        'dir',
        route.lang === 'ar' ? 'rtl' : 'ltr',
      );

      // one h1, non-empty title and description
      await expect(page.locator('h1')).toHaveCount(1);
      const title = await page.title();
      expect(title.trim().length, 'title length').toBeGreaterThan(10);
      const description = await page
        .locator('meta[name="description"]')
        .getAttribute('content');
      expect((description ?? '').trim().length, 'meta description length').toBeGreaterThan(60);

      // canonical + alternates
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toContain(route.path);
      const alternates = await page
        .locator('link[rel="alternate"][hreflang]')
        .evaluateAll((nodes) => nodes.map((node) => node.getAttribute('hreflang')));
      expect(alternates).toEqual(expect.arrayContaining(['en', 'ar', 'x-default']));

      // main landmark and no runtime errors
      await expect(page.locator('main#main')).toHaveCount(1);
      expect(errors, `runtime errors on ${route.path}`).toEqual([]);
    });
  }

  test('root path redirects to the English home page', async ({ page }) => {
    await page.goto('/');
    await page.waitForURL('**/en/');
    expect(new URL(page.url()).pathname).toBe('/en/');
  });

  test('unknown route returns the 404 page', async ({ page }) => {
    const response = await page.goto('/en/this-page-does-not-exist/');
    expect(response?.status()).toBe(404);
    await expect(page.locator('h1')).toContainText(/not found|غير موجودة/i);
    await expect(page.locator('a[href="/en/"]').first()).toBeVisible();
  });

  test('sitemap and robots.txt are published', async ({ request }) => {
    const sitemap = await request.get('/sitemap-index.xml');
    expect(sitemap.status()).toBe(200);
    const robots = await request.get('/robots.txt');
    expect(robots.status()).toBe(200);
    expect(await robots.text()).toContain('Sitemap:');
  });
});
