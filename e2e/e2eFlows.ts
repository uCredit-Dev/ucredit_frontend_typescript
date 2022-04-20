/**
 * Flows: Browser navigation for E2E testing.
 */
import {
  ADD_PLAN_MODAL,
  DASHBOARD_PAGE,
  HOME_PAGE,
  LOGIN_PAGE,
  PLAN_OVERVIEW,
  TEST_ID,
} from './e2eFixtures';
import { newPage } from './e2eUtils';

export const AFTER_LOGIN_PAGE = async (page) => {
  const { LOGIN_BUTTON_SELECTOR } = HOME_PAGE;
  await page.click(LOGIN_BUTTON_SELECTOR);
};

export const AFTER_LOGIN = async (page, loginId = null) => {
  await AFTER_LOGIN_PAGE(page);
  const {
    JHU_LOGIN_BUTTON_SELECTOR,
    LOGIN_INPUT_SELECTOR,
    CONFIRM_LOGIN_BUTTON_SELECTOR,
  } = LOGIN_PAGE;
  await page.click(JHU_LOGIN_BUTTON_SELECTOR);
  await page.type(LOGIN_INPUT_SELECTOR, loginId ? loginId : TEST_ID);
  await page.click(CONFIRM_LOGIN_BUTTON_SELECTOR);
};

export const AFTER_PLAN_CREATED = async (page, loginId = null) => {
  await AFTER_LOGIN(page, loginId);
  const {
    SELECT_MAJOR_INPUT_SELECTOR,
    CS_BA_MAJOR_NAME,
    ADD_MAJOR_BUTTON_SELECTOR,
  } = ADD_PLAN_MODAL;
  await page.locator(SELECT_MAJOR_INPUT_SELECTOR).type(CS_BA_MAJOR_NAME);
  await page.locator(SELECT_MAJOR_INPUT_SELECTOR).press('Tab');
  await page.locator(ADD_MAJOR_BUTTON_SELECTOR).click();
};

export const AFTER_PLAN_OVERVIEW_CLICKED = async (page, loginId = null) => {
  await AFTER_PLAN_CREATED(page, loginId);
  const { PLAN_OVERVIEW_BUTTON_SELECTOR } = DASHBOARD_PAGE;
  await page.locator(PLAN_OVERVIEW_BUTTON_SELECTOR).click();
};

export const AFTER_REVIEWER_REQUESTED = async (
  page,
  loginId = null,
  reviewerId = null,
) => {
  const reviewerPage = await newPage();
  await AFTER_PLAN_OVERVIEW_CLICKED(reviewerPage, reviewerId);

  await AFTER_PLAN_OVERVIEW_CLICKED(page, loginId);
  const {
    ADD_REVIEWER_ICON_SELECTOR,
    SEARCH_REVIEWER_INPUT_SELECTOR,
    REVIEWER_RESULT_SELECTOR,
  } = PLAN_OVERVIEW;
  await page.locator(ADD_REVIEWER_ICON_SELECTOR).click();
  await page.locator(SEARCH_REVIEWER_INPUT_SELECTOR).type(reviewerId);
  await page.locator(REVIEWER_RESULT_SELECTOR).click();

  // Return to dashboard
  const { PLAN_OVERVIEW_BUTTON_SELECTOR } = DASHBOARD_PAGE;
  await page.locator(PLAN_OVERVIEW_BUTTON_SELECTOR).click();
};
