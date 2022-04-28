/**
 * Flows: Browser navigation for E2E testing.
 */
import {
  ADD_PLAN_MODAL,
  DASHBOARD_PAGE,
  HOME_PAGE,
  LOGIN_PAGE,
  REVIEWER_ID,
  TEST_ID,
  PLAN_EDIT_MENU,
} from './e2eFixtures';

export const AFTER_LOGIN_PAGE = async (page) => {
  const { LOGIN_BUTTON_SELECTOR } = HOME_PAGE;
  await page.click(LOGIN_BUTTON_SELECTOR);
};

export const AFTER_LOGIN = async (page, loginId) => {
  await AFTER_LOGIN_PAGE(page);
  const {
    JHU_LOGIN_BUTTON_SELECTOR,
    LOGIN_INPUT_SELECTOR,
    CONFIRM_LOGIN_BUTTON_SELECTOR,
  } = LOGIN_PAGE;
  await page.click(JHU_LOGIN_BUTTON_SELECTOR);
  await page.type(LOGIN_INPUT_SELECTOR, loginId);
  await page.click(CONFIRM_LOGIN_BUTTON_SELECTOR);
};

export const AFTER_PLAN_CREATED = async (page, loginId = TEST_ID) => {
  await AFTER_LOGIN(page, loginId);
  const {
    SELECT_MAJOR_INPUT_SELECTOR,
    CS_BA_MAJOR_NAME,
    ADD_MAJOR_BUTTON_SELECTOR,
  } = ADD_PLAN_MODAL;
  await page.locator(SELECT_MAJOR_INPUT_SELECTOR).click();
  await page.locator(SELECT_MAJOR_INPUT_SELECTOR).type(CS_BA_MAJOR_NAME);
  await page.locator(SELECT_MAJOR_INPUT_SELECTOR).press('Tab');
  await page.locator(ADD_MAJOR_BUTTON_SELECTOR).click();
};

export const AFTER_REVIEWER_REQUESTED = async (
  page,
  reviewerPage,
  loginId = TEST_ID,
  reviewerId = REVIEWER_ID,
) => {
  await AFTER_PLAN_CREATED(reviewerPage, reviewerId);
  await AFTER_PLAN_CREATED(page, loginId);
  const {
    PLAN_EDIT_MENU_SELECTOR,
    ADD_REVIEWER_BUTTON_SELECTOR,
    SEARCH_REVIEWER_INPUT_SELECTOR,
    REVIEWER_RESULT_SELECTOR,
  } = PLAN_EDIT_MENU;
  await page.locator(PLAN_EDIT_MENU_SELECTOR).click();
  await page.locator(ADD_REVIEWER_BUTTON_SELECTOR).click();
  await page.locator(SEARCH_REVIEWER_INPUT_SELECTOR).type(reviewerId);
  await page.locator(REVIEWER_RESULT_SELECTOR).click();

  // Return to dashboard
  await page.locator(PLAN_EDIT_MENU_SELECTOR).click();
  return reviewerPage;
};
