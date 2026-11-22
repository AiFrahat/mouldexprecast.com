import { test, expect } from '@playwright/test';
import { expectNoHorizontalOverflow, routes } from './helpers';

const KEY_ROUTES = [
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
];

const WIDTHS = [360, 390, 768, 1024, 1280, 1440];

test.describe('responsive layout', () => {
  for (const width of WIDTHS) {
    test(`no horizontal overflow at ${width}px on key pages`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const route of KEY_ROUTES) {
        await page.goto(route, { waitUntil: 'domcontentloaded' });
        await expectNoHorizontalOverflow(page);
        await expect(page.locator('h1')).toBeVisible();
        await expect(page.locator('header .brand')).toBeVisible();
        await expect(page.locator('.site-footer')).toBeVisible();
      }
    });
  }

  test('header switches between desktop nav and mobile toggle', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/en/');
    await expect(page.locator('.nav')).toBeVisible();
    await expect(page.locator('[data-menu-toggle]')).toBeHidden();

    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.locator('.nav')).toBeHidden();
    await expect(page.locator('[data-menu-toggle]')).toBeVisible();
    await expect(page.locator('.header__end .lang-switch')).toBeHidden();
  });

  test('mobile menu links are comfortably tappable', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/en/');
    await page.locator('[data-menu-toggle]').click();
    const links = page.locator('.mobile-menu__link');
    const count = await links.count();
    expect(count).toBe(5);
    for (let index = 0; index < count; index += 1) {
      const box = await links.nth(index).boundingBox();
      expect(box?.height ?? 0).toBeGreaterThan(44);
    }
  });

  test('reference table scrolls rather than breaking the layout at 390px', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/en/projects/');
    await expectNoHorizontalOverflow(page);
    const wrapper = page.locator('.ref-table-wrap');
    await expect(wrapper).toBeVisible();
    const overflowX = await wrapper.evaluate((element) => getComputedStyle(element).overflowX);
    expect(['auto', 'scroll']).toContain(overflowX);
  });

  test('all routes lay out without overflow at 360px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 780 });
    for (const route of routes) {
      await page.goto(route.path, { waitUntil: 'domcontentloaded' });
      await expectNoHorizontalOverflow(page);
    }
  });
});
