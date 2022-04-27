/**
 * Landing Page Tests: All tests related to the landing page.
 */
import { URL, HOME_PAGE } from './e2eFixtures';
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
});

test.describe('Landing Page', () => {
  const { APP_NAME, LOGIN_BUTTON_SELECTOR } = HOME_PAGE;

  test(`should have ${APP_NAME} text`, async ({ page }) => {
    await expect(page.locator(`text=${APP_NAME}`).first()).toBeVisible();
  });

  test('should have Login button', async ({ page }) => {
    await expect(page.locator(LOGIN_BUTTON_SELECTOR)).toBeVisible();
  });
});
