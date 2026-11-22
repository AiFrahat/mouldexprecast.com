import { test, expect } from '@playwright/test';

test.describe('contact page and enquiry form', () => {
  test('published contact details are rendered', async ({ page }) => {
    await page.goto('/en/contact/');
    const cards = page.locator('.contact-card');
    await expect(cards).toHaveCount(6);
    await expect(page.locator('.contact-card a[href="tel:+97144364243"]')).toBeVisible();
    await expect(page.locator('.contact-card a[href="tel:+971554373368"]')).toBeVisible();
    await expect(page.locator('.contact-card a[href="mailto:samy.mdxdxb@outlook.com"]')).toBeVisible();
    const body = await page.locator('body').innerText();
    expect(body).toContain('+971 4 447 0317');
    expect(body).toContain('393390');
  });

  test('form fields are labelled and required fields marked', async ({ page }) => {
    await page.goto('/en/contact/');
    const form = page.locator('form[data-contact-form]');
    await expect(form).toBeVisible();
    await expect(form.locator('label[for="contact-name"]')).toContainText('Full name');
    await expect(form.locator('label[for="contact-email"]')).toContainText('Email');
    await expect(form.locator('label[for="contact-message"]')).toContainText('Message');
    await expect(form.locator('#contact-name')).toHaveAttribute('required', '');
    await expect(form.locator('#contact-email')).toHaveAttribute('type', 'email');
    await expect(form.locator('#contact-message')).toHaveAttribute('required', '');
    const options = form.locator('select[name="service"] option');
    await expect(options).toHaveCount(7); // general enquiry + six services
  });

  test('submitting prepares a mailto draft with the entered details', async ({ page }) => {
    await page.goto('/en/contact/');
    const form = page.locator('form[data-contact-form]');
    await form.locator('#contact-name').fill('Test Engineer');
    await form.locator('#contact-company').fill('Test Contracting LLC');
    await form.locator('#contact-email').fill('engineer@example.com');
    await form.locator('#contact-phone').fill('+971 50 000 0000');
    await form.locator('select[name="service"]').selectOption('precast-claddings');
    await form.locator('#contact-message').fill('Precast cladding package for a 12-storey tower.');
    await page.evaluate(() => {
      const element = document.querySelector('form[data-contact-form]');
      element?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    });
    const mailto = await form.getAttribute('data-last-mailto');
    expect(mailto).toBeTruthy();
    expect(mailto).toContain('mailto:samy.mdxdxb@outlook.com');
    expect(mailto).toContain('Precast%20Claddings');
    expect(mailto).toContain('Test%20Engineer');
    expect(mailto).toContain('engineer%40example.com');
    expect(mailto).toContain('12-storey');
  });

  test('form defaults to a general enquiry', async ({ page }) => {
    await page.goto('/ar/contact/');
    const form = page.locator('form[data-contact-form]');
    await form.locator('#contact-name').fill('مهندس');
    await form.locator('#contact-email').fill('test@example.com');
    await form.locator('#contact-message').fill('نطاق أعمال بريكاست.');
    await page.evaluate(() => {
      const element = document.querySelector('form[data-contact-form]');
      element?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    });
    const mailto = await form.getAttribute('data-last-mailto');
    expect(mailto).toBeTruthy();
    expect(mailto).not.toContain('undefined');
  });

  test('contact page has no horizontal overflow on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 780 });
    await page.goto('/ar/contact/');
    const overflow = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
    }));
    expect(overflow.documentWidth).toBeLessThanOrEqual(overflow.viewportWidth + 1);
    await expect(page.locator('form[data-contact-form]')).toBeVisible();
  });
});
