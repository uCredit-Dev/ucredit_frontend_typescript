import { URL, HOME_PAGE, LOGIN_PAGE } from './e2eFixtures';
import { test, expect, Page } from '@playwright/test';

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

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    const { LOGIN_BUTTON_SELECTOR } = HOME_PAGE;
    await page.click(LOGIN_BUTTON_SELECTOR);
  });

  test('should show login page', async ({ page }) => {
    const { LOGIN_TEXT_SELECTOR } = LOGIN_PAGE;
    await expect(page.locator(LOGIN_TEXT_SELECTOR)).toBeVisible();
  });
});
