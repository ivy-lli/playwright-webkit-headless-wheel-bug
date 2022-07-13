import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto(`file://${testInfo.file}/../../src/test.html`);
});

test.describe('WebKit Headless wheel scroll bug', () => {
  test('should not scroll', async ({ page }) => {
    const scrollBox = page.locator('.scroll-box text tspan');
    await expect(scrollBox).toHaveText('Scrolled 0 pixels');

    await page.mouse.wheel(0, 100);
    await expect(scrollBox).toHaveText('Scrolled 0 pixels');
  });

  test('should scroll', async ({ page }) => {
    const scrollBox = page.locator('.scroll-box text tspan');
    await expect(scrollBox).toHaveText('Scrolled 0 pixels');

    await page.mouse.move(400, 400);
    await page.mouse.wheel(0, 100);
    await expect(scrollBox).toHaveText('Scrolled 100 pixels');
  });
});
