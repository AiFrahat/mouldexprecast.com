import { test, expect } from '@playwright/test';

test.describe('projects', () => {
  test('reference table lists 17 published projects', async ({ page }) => {
    await page.goto('/en/projects/');
    const rows = page.locator('[data-reference-table] tbody tr');
    await expect(rows).toHaveCount(17);
    await expect(page.locator('[data-filter-count]')).toHaveText('17');
  });

  test('filters narrow the reference table and update the count', async ({ page }) => {
    await page.goto('/en/projects/');
    const rows = page.locator('[data-reference-table] tbody tr:visible');
    const filter = (label: string) => page.locator('.filter-chip', { hasText: label });

    await filter('Claddings').click();
    await expect(page.locator('[data-filter-count]')).toHaveText('5');
    await expect(rows).toHaveCount(5);
    await expect(filter('Claddings')).toHaveAttribute('aria-pressed', 'true');

    await filter('Boundary walls').click();
    await expect(page.locator('[data-filter-count]')).toHaveText('3');
    await expect(rows).toHaveCount(3);

    await filter('Staircases and structures').click();
    await expect(page.locator('[data-filter-count]')).toHaveText('5');

    await filter('Villas').click();
    await expect(page.locator('[data-filter-count]')).toHaveText('1');

    await filter('Hollow core slabs').click();
    await expect(page.locator('[data-filter-count]')).toHaveText('1');

    await filter('All projects').click();
    await expect(page.locator('[data-filter-count]')).toHaveText('17');
    await expect(rows).toHaveCount(17);
  });

  test('six project detail pages are linked from the projects index', async ({ page }) => {
    await page.goto('/en/projects/');
    const cards = page.locator('.project-card');
    await expect(cards).toHaveCount(6);
    const hrefs = await cards.locator('a.project-card__arrow').evaluateAll((nodes) =>
      nodes.map((node) => node.getAttribute('href')),
    );
    expect(hrefs).toHaveLength(6);
    for (const href of hrefs) {
      expect(href).toMatch(/^\/en\/projects\/[a-z0-9-]+\/$/);
    }
  });

  test('Madinat Jumeirah Living detail page shows the published facts', async ({ page }) => {
    await page.goto('/en/projects/madinat-jumeirah-living-phase-4/');
    await expect(page.locator('h1')).toContainText('Madinat Jumeirah Living');
    const facts = page.locator('.service-aside .facts');
    await expect(facts).toContainText('Madinat Jumeirah Living');
    await expect(facts).toContainText('Next Engineering Consultants');
    await expect(facts).toContainText('Al Sahel Contracting Co. LLC');
    await expect(facts).toContainText('Completed');
    await expect(facts).toContainText('Dubai, United Arab Emirates');
    await expect(page.locator('.check-list li').first()).toBeVisible();
  });

  test('projects without published client data do not invent one', async ({ page }) => {
    await page.goto('/en/projects/al-kharafi/');
    const facts = page.locator('.service-aside .facts');
    await expect(facts).toContainText('Dubai, United Arab Emirates');
    await expect(facts).not.toContainText('Client');
    await expect(facts).not.toContainText('Consultant');
    await expect(facts).not.toContainText('Main contractor');
  });

  test('project detail links to its service and back to the index', async ({ page }) => {
    await page.goto('/en/projects/beachgate-by-address/');
    await expect(page.locator('a.related-service[href="/en/services/load-bearing-structures/"]')).toBeVisible();
    await page.locator('.link-arrow[href="/en/projects/"]').first().click();
    await page.waitForURL('**/en/projects/');
  });

  test('Arabic project index uses translated categories', async ({ page }) => {
    await page.goto('/ar/projects/');
    const chips = page.locator('.filter-chip');
    await expect(chips).toHaveCount(7);
    const labels = await chips.allInnerTexts();
    for (const label of labels) {
      expect(label.trim().length).toBeGreaterThan(1);
    }
    expect(labels.join(' ')).toMatch(/[\u0600-\u06FF]/);
  });
});

