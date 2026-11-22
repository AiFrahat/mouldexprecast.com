import { test, expect } from '@playwright/test';
import { SERVICES, PROJECTS, arabicRe, routes } from './helpers';

const NAV_LABELS = {
  en: ['Home', 'About', 'Services', 'Projects', 'Contact'],
  ar: ['الرئيسية', 'من نحن', 'خدماتنا', 'مشاريعنا', 'تواصل معنا'],
};

test.describe('bilingual rendering', () => {
  test('English navigation labels', async ({ page }) => {
    test.skip(test.info().project.name !== 'desktop', 'desktop layout only');
    await page.goto('/en/');
    const nav = page.locator('nav[aria-label]').first();
    for (const label of NAV_LABELS.en) {
      await expect(nav.getByRole('link', { name: label, exact: true })).toBeVisible();
    }
  });

  test('Arabic navigation labels and RTL direction', async ({ page }) => {
    test.skip(test.info().project.name !== 'desktop', 'desktop layout only');
    await page.goto('/ar/');
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    const nav = page.locator('nav[aria-label]').first();
    for (const label of NAV_LABELS.ar) {
      await expect(nav.getByRole('link', { name: label, exact: true })).toBeVisible();
    }
  });

  test('Arabic home page headline is Arabic', async ({ page }) => {
    await page.goto('/ar/');
    const headline = await page.locator('h1').innerText();
    expect(arabicRe.test(headline), `headline should be Arabic: "${headline}"`).toBeTruthy();
  });

  test('every Arabic route has an Arabic h1', async ({ page }) => {
    for (const route of routes.filter((item) => item.lang === 'ar')) {
      await page.goto(route.path);
      const headline = await page.locator('h1').innerText();
      expect(arabicRe.test(headline), `${route.path} h1: "${headline}"`).toBeTruthy();
    }
  });

  test('all six service pages exist in both languages with translated titles', async ({ page }) => {
    for (const slug of SERVICES) {
      for (const lang of ['en', 'ar'] as const) {
        await page.goto(`/${lang}/services/${slug}/`);
        const headline = await page.locator('h1').innerText();
        expect(headline.trim().length).toBeGreaterThan(3);
        if (lang === 'ar') {
          expect(arabicRe.test(headline), `service ${slug} AR title`).toBeTruthy();
        }
      }
    }
  });

  test('all six project detail pages exist in both languages', async ({ page }) => {
    for (const slug of PROJECTS) {
      for (const lang of ['en', 'ar'] as const) {
        await page.goto(`/${lang}/projects/${slug}/`);
        const headline = await page.locator('h1').innerText();
        expect(headline.trim().length).toBeGreaterThan(3);
        if (lang === 'ar') {
          expect(arabicRe.test(headline), `project ${slug} AR title`).toBeTruthy();
        }
      }
    }
  });

  test('service cards on the Arabic index are translated', async ({ page }) => {
    await page.goto('/ar/services/');
    const cards = page.locator('.service-card__title');
    await expect(cards).toHaveCount(6);
    for (let index = 0; index < 6; index += 1) {
      const text = (await cards.nth(index).innerText()).trim();
      expect(text.length, `card ${index} title is empty`).toBeGreaterThan(2);
      expect(arabicRe.test(text), `card ${index} title is not Arabic: "${text}"`).toBeTruthy();
    }
  });

  test('language switch keeps the current page in the other locale', async ({ page }) => {
    await page.goto('/en/services/villas/');
    if (test.info().project.name === 'mobile') {
      await page.locator('[data-menu-toggle]').click();
      await page.locator('.mobile-menu .lang-switch').click();
    } else {
      await page.locator('.header__end .lang-switch').click();
    }
    await page.waitForURL('**/ar/services/villas/');
    expect(new URL(page.url()).pathname).toBe('/ar/services/villas/');
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

    if (test.info().project.name === 'mobile') {
      await page.locator('[data-menu-toggle]').click();
      await page.locator('.mobile-menu .lang-switch').click();
    } else {
      await page.locator('.header__end .lang-switch').click();
    }
    await page.waitForURL('**/en/services/villas/');
    expect(new URL(page.url()).pathname).toBe('/en/services/villas/');
  });

  test('no unresolved template or fallback markers in rendered pages', async ({ page }) => {
    const markers = ['undefined', 'NaN', '[object Object]', '⟪', 'TODO'];
    for (const route of routes) {
      await page.goto(route.path);
      const body = await page.locator('body').innerText();
      for (const marker of markers) {
        expect(body.includes(marker), `${route.path} contains "${marker}"`).toBeFalsy();
      }
    }
  });
});

