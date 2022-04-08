import {
  URL,
  API_URL,
  TEST_ID,
  HOME_PAGE,
  LOGIN_PAGE,
  ADD_PLAN_MODAL,
  DASHBOARD_PAGE,
} from './e2eFixtures';
import { test, expect } from '@playwright/test';
import axios from 'axios';

const deleteUser = async () => {
  try {
    await axios.delete(`${API_URL}/api/user/${TEST_ID}`);
  } catch (e) {
    // Do nothing
  }
};

test.beforeEach(async ({ page }) => {
  await deleteUser();
  await page.goto(URL);
});

export const after_login_page = async (page) => {
  const { LOGIN_BUTTON_SELECTOR } = HOME_PAGE;
  await page.click(LOGIN_BUTTON_SELECTOR);
};

export const after_login = async (page) => {
  await after_login_page(page);
  const {
    JHU_LOGIN_BUTTON_SELECTOR,
    LOGIN_INPUT_SELECTOR,
    CONFIRM_LOGIN_BUTTON_SELECTOR,
  } = LOGIN_PAGE;
  await page.click(JHU_LOGIN_BUTTON_SELECTOR);
  await page.type(LOGIN_INPUT_SELECTOR, TEST_ID);
  await page.click(CONFIRM_LOGIN_BUTTON_SELECTOR);
};

export const after_plan_created = async (page) => {
  await after_login(page);
  const {
    SELECT_MAJOR_INPUT_SELECTOR,
    CS_BA_MAJOR_NAME,
    ADD_MAJOR_BUTTON_SELECTOR,
  } = ADD_PLAN_MODAL;
  await page.locator(SELECT_MAJOR_INPUT_SELECTOR).type(CS_BA_MAJOR_NAME);
  await page.locator(SELECT_MAJOR_INPUT_SELECTOR).press('Tab');
  await page.locator(ADD_MAJOR_BUTTON_SELECTOR).click();
};

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await after_login_page(page);
  });

  test('should show jhu login button', async ({ page }) => {
    const { JHU_LOGIN_BUTTON_SELECTOR } = LOGIN_PAGE;
    await expect(page.locator(JHU_LOGIN_BUTTON_SELECTOR)).toBeVisible();
  });
});

test.describe('Logging In', () => {
  test.beforeEach(async ({ page }) => {
    await after_login(page);
  });

  test('should be able to login', async ({ page }) => {
    const { ADD_PLAN_MODAL_SELECTOR } = ADD_PLAN_MODAL;
    await expect(page.locator(ADD_PLAN_MODAL_SELECTOR)).toBeVisible();
  });
});

test.describe('Post-Login', () => {
  test.beforeEach(async ({ page }) => {
    await after_plan_created(page);
  });

  test('should be able to add the CS BA major', async ({ page }) => {
    const { DEFAULT_PLAN_NAME_SELECTOR } = DASHBOARD_PAGE;
    await expect(
      page.locator(DEFAULT_PLAN_NAME_SELECTOR).first(),
    ).toBeVisible();
  });

  test('should be able to logout after logging in', async ({ page }) => {
    const { LOGOUT_BUTTON_SELECTOR } = DASHBOARD_PAGE;
    const { JHU_LOGIN_BUTTON_SELECTOR } = LOGIN_PAGE;
    await page.click(LOGOUT_BUTTON_SELECTOR);
    await expect(page.locator(JHU_LOGIN_BUTTON_SELECTOR)).toBeVisible();
  });
});
