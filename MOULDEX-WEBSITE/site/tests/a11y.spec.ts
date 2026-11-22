import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '@playwright/test';

const A11Y_ROUTES = [
  '/en/',
  '/en/about/',
  '/en/services/',
  '/en/services/precast-claddings/',
  '/en/projects/',
  '/en/projects/madinat-jumeirah-living-phase-4/',
  '/en/contact/',
  '/ar/',
  '/ar/services/villas/',
  '/ar/projects/',
  '/ar/contact/',
];

test.describe('accessibility', () => {
  for (const route of A11Y_ROUTES) {
    test(`axe scan has no serious violations: ${route}`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'load' });
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      const serious = results.violations.filter((violation) =>
        ['serious', 'critical'].includes(violation.impact ?? ''),
      );
      const summary = serious.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        nodes: violation.nodes.map((node) => node.target.join(' ')).slice(0, 4),
      }));
      expect(summary, JSON.stringify(summary, null, 2)).toEqual([]);
    });
  }

  test('landmarks and heading order are sane', async ({ page }) => {
    await page.goto('/en/');
    const header = await page.locator('header').count();
    const main = await page.locator('main').count();
    const footer = await page.locator('footer').count();
    expect(header).toBe(1);
    expect(main).toBe(1);
    expect(footer).toBe(1);
    const headings = await page.$$eval('h1,h2,h3,h4', (nodes) =>
      nodes.map((node) => ({ level: Number(node.tagName.slice(1)), text: node.textContent?.trim() })),
    );
    expect(headings.filter((heading) => heading.level === 1)).toHaveLength(1);
    expect(headings[0].level).toBe(1);
  });

  test('interactive controls have accessible names', async ({ page }) => {
    for (const route of ['/en/', '/en/contact/', '/en/projects/']) {
      await page.goto(route);
      const unnamed = await page.$$eval('a, button', (nodes) =>
        nodes
          .filter((node) => {
            const text = (node.textContent ?? '').trim();
            const aria = node.getAttribute('aria-label');
            const labelledBy = node.getAttribute('aria-labelledby');
            const imgAlt = node.querySelector('img')?.getAttribute('alt');
            return !text && !aria && !labelledBy && !imgAlt;
          })
          .map((node) => node.outerHTML.slice(0, 120)),
      );
      expect(unnamed, `unnamed controls on ${route}`).toEqual([]);
    }
  });
});
