import {
  URL,
  TEST_ID,
  HOME_PAGE,
  LOGIN_PAGE,
  DASHBOARD_PAGE,
} from './e2eFixtures';
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

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    const { LOGIN_BUTTON_SELECTOR } = HOME_PAGE;
    await page.click(LOGIN_BUTTON_SELECTOR);
  });

  test('should show jhu login button', async ({ page }) => {
    const { JHU_LOGIN_BUTTON_SELECTOR } = LOGIN_PAGE;
    await expect(page.locator(JHU_LOGIN_BUTTON_SELECTOR)).toBeVisible();
  });

  const login = async (page) => {
    const {
      JHU_LOGIN_BUTTON_SELECTOR,
      LOGIN_INPUT_SELECTOR,
      CONFIRM_LOGIN_BUTTON_SELECTOR,
    } = LOGIN_PAGE;
    await page.click(JHU_LOGIN_BUTTON_SELECTOR);
    await page.type(LOGIN_INPUT_SELECTOR, TEST_ID);
    await page.click(CONFIRM_LOGIN_BUTTON_SELECTOR);
  };

  test('should be able to login', async ({ page }) => {
    await login(page);
    await expect(page.locator(`text=${TEST_ID}`)).toBeVisible();
  });

  test('should be able to logout after logging in', async ({ page }) => {
    await login(page);
    const { LOGOUT_BUTTON_SELECTOR } = DASHBOARD_PAGE;
    const { JHU_LOGIN_BUTTON_SELECTOR } = LOGIN_PAGE;

    await page.click(LOGOUT_BUTTON_SELECTOR);
    await expect(page.locator(JHU_LOGIN_BUTTON_SELECTOR)).toBeVisible();
  });
});
