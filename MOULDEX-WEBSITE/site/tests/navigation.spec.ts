import { test, expect } from '@playwright/test';

test.describe('navigation and interactions', () => {
  test('desktop header navigation links resolve', async ({ page }) => {
    test.skip(test.info().project.name !== 'desktop', 'desktop layout only');
    await page.goto('/en/');
    const nav = page.locator('nav[aria-label]').first();
    await expect(nav.getByRole('link', { name: 'About', exact: true })).toHaveAttribute(
      'href',
      '/en/about/',
    );
    await expect(nav.getByRole('link', { name: 'Projects', exact: true })).toHaveAttribute(
      'href',
      '/en/projects/',
    );
    await nav.getByRole('link', { name: 'About', exact: true }).click();
    await page.waitForURL('**/en/about/');
    await expect(page.locator('nav[aria-label]').first().locator('[aria-current="page"]')).toContainText(
      'About',
    );
  });

  test('services dropdown appears on hover and keyboard focus', async ({ page }) => {
    test.skip(test.info().project.name !== 'desktop', 'desktop layout only');
    await page.goto('/en/');
    const item = page.locator('.nav__item--has-menu');
    const menu = item.locator('.nav__menu');
    await expect(menu).toBeHidden();

    await item.hover();
    await expect(menu).toBeVisible();
    await expect(menu.locator('a')).toHaveCount(7); // six services + all services

    await page.mouse.move(0, 0);
    await item.locator('.nav__link').focus();
    await expect(menu).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(menu.locator('a').first()).toBeFocused();
  });

  test('mobile menu opens, traps focus and closes with Escape', async ({ page }) => {
    test.skip(test.info().project.name !== 'mobile', 'mobile layout only');
    await page.goto('/en/');
    const toggle = page.locator('[data-menu-toggle]');
    const menu = page.locator('[data-mobile-menu]');
    await expect(toggle).toBeVisible();
    await expect(menu).toBeHidden();

    await toggle.click();
    await expect(menu).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe('hidden');

    // focus is moved inside the dialog
    await expect
      .poll(
        () =>
          page.evaluate(() => {
            const dialog = document.querySelector('[data-mobile-menu]');
            return Boolean(dialog && dialog.contains(document.activeElement));
          }),
        { timeout: 5_000 },
      )
      .toBe(true);

    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toBeFocused();
  });

  test('mobile menu navigates to a service page', async ({ page }) => {
    test.skip(test.info().project.name !== 'mobile', 'mobile layout only');
    await page.goto('/en/');
    await page.locator('[data-menu-toggle]').click();
    await page.locator('[data-mobile-menu] a[href="/en/services/villas/"]').first().click();
    await page.waitForURL('**/en/services/villas/');
    await expect(page.locator('h1')).toContainText('Villas');
  });

  test('skip link moves focus to main content', async ({ page }) => {
    await page.goto('/en/');
    await page.keyboard.press('Tab');
    const skip = page.locator('.skip-link');
    await expect(skip).toBeFocused();
    await page.keyboard.press('Enter');
    const activeId = await page.evaluate(() => document.activeElement?.id);
    expect(activeId).toBe('main');
  });

  test('breadcrumbs link back to the parent section', async ({ page }) => {
    await page.goto('/en/services/precast-claddings/');
    const crumbs = page.locator('nav[aria-label] .breadcrumbs, .breadcrumbs');
    await expect(crumbs.locator('a[href="/en/"]')).toBeVisible();
    await expect(crumbs.locator('a[href="/en/services/"]')).toBeVisible();
    await expect(crumbs.locator('[aria-current="page"]')).toContainText('Precast Claddings');
    await crumbs.locator('a[href="/en/services/"]').click();
    await page.waitForURL('**/en/services/');
  });

  test('footer contact links use tel and mailto', async ({ page }) => {
    await page.goto('/en/');
    const footer = page.locator('.site-footer');
    await expect(footer.locator('a[href^="tel:+97144364243"]')).toBeVisible();
    await expect(footer.locator('a[href^="mailto:samy.mdxdxb@outlook.com"]')).toBeVisible();
  });

  test('language switch is present and labelled', async ({ page }) => {
    test.skip(test.info().project.name !== 'desktop', 'desktop layout only');
    await page.goto('/en/');
    const switcher = page.locator('.header__end .lang-switch');
    await expect(switcher).toHaveAttribute('hreflang', 'ar');
    await expect(switcher).toHaveAttribute('lang', 'ar');
    await expect(switcher.locator('span')).toHaveText('العربية');
  });
});


