/**
 * Login Tests: All tests related to authentication/login flow.
 */
import {
  URL,
  LOGIN_PAGE,
  ADD_PLAN_MODAL,
  TEST_ID,
  PLAN_EDIT_MENU,
  HAMBURGER_MENU,
} from './e2eFixtures';
import { test, expect } from '@playwright/test';
import { AFTER_LOGIN, AFTER_LOGIN_PAGE, AFTER_PLAN_CREATED } from './e2eFlows';
import { deleteUser } from './e2eUtils';

test.beforeEach(async ({ page }) => {
  await deleteUser(TEST_ID);
  await page.goto(URL);
});

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await AFTER_LOGIN_PAGE(page);
  });

  test('should show jhu login button', async ({ page }) => {
    const { JHU_LOGIN_BUTTON_SELECTOR } = LOGIN_PAGE;
    await expect(page.locator(JHU_LOGIN_BUTTON_SELECTOR)).toBeVisible();
  });
});

test.describe('Logging In', () => {
  test.beforeEach(async ({ page }) => {
    await AFTER_LOGIN(page, TEST_ID);
  });

  test('should be able to login', async ({ page }) => {
    const { ADD_PLAN_MODAL_SELECTOR } = ADD_PLAN_MODAL;
    await expect(page.locator(ADD_PLAN_MODAL_SELECTOR)).toBeVisible();
  });
});

test.describe('Post-Login', () => {
  test.beforeEach(async ({ page }) => {
    await AFTER_PLAN_CREATED(page);
  });

  test('should be able to add the CS BA major', async ({ page }) => {
    const { PLAN_EDIT_MENU_SELECTOR, DEFAULT_PLAN_NAME_SELECTOR } =
      PLAN_EDIT_MENU;
    await page.locator(PLAN_EDIT_MENU_SELECTOR).click();
    await expect(
      page.locator(DEFAULT_PLAN_NAME_SELECTOR).first(),
    ).toBeVisible();
  });

  test('should be able to logout after logging in', async ({ page }) => {
    const { LOGOUT_BUTTON_SELECTOR, HAMBURGER_MENU_SELECTOR } = HAMBURGER_MENU;
    const { JHU_LOGIN_BUTTON_SELECTOR } = LOGIN_PAGE;
    await page.locator(HAMBURGER_MENU_SELECTOR).click();
    await page.click(LOGOUT_BUTTON_SELECTOR);
    await expect(page.locator(JHU_LOGIN_BUTTON_SELECTOR)).toBeVisible();
  });
});
