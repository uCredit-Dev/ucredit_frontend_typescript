/**
 * Flows: Browser navigation for E2E testing.
 * All instances of `page` and `reviewerPage` should start at the home page.
 */
import { inspectPlan, visitReviewerDashboard } from './e2eActions';
import {
  ADD_PLAN_MODAL,
  HOME_PAGE,
  LOGIN_PAGE,
  REVIEWER_ID,
  TEST_ID,
  PLAN_EDIT_MENU,
} from './e2eFixtures';
import { confirmPlanReview } from './e2eUtils';

/**
 * Navigates to the login page.
 */
export const AFTER_LOGIN_PAGE = async (page) => {
  const { LOGIN_BUTTON_SELECTOR } = HOME_PAGE;
  await page.click(LOGIN_BUTTON_SELECTOR);
};

/**
 * Logs in with the given credentials.
 * @param loginId The user_id of the user to log in as.
 */
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

/**
 * Logs in and selects the CS BA major. The page should then be on the dashboard.
 * @param loginId The user_id of the user to log in as.
 */
export const AFTER_PLAN_CREATED = async (page, loginId = TEST_ID) => {
  await AFTER_LOGIN(page, loginId);
  const {
    SELECT_MAJOR_INPUT_SELECTOR,
    CS_BS_MAJOR_NAME,
    ADD_MAJOR_BUTTON_SELECTOR,
  } = ADD_PLAN_MODAL;
  await page.locator(SELECT_MAJOR_INPUT_SELECTOR).click();
  await page.locator(SELECT_MAJOR_INPUT_SELECTOR).type(CS_BS_MAJOR_NAME);
  await page.locator(SELECT_MAJOR_INPUT_SELECTOR).press('Tab');
  await page.locator(ADD_MAJOR_BUTTON_SELECTOR).click();
};

/**
 * Logs in as both the reviewee and reviewer; the reviewee then requests the reviewer to
 * review their plan. Both the reviewee and reviewer are left on the dashboard.
 * @param loginId The reviewee's user_id
 * @param reviewerId The reviewer's user_id
 */
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
    // ADD_REVIEWER_BUTTON_SELECTOR,
    SEARCH_REVIEWER_INPUT_SELECTOR,
    REVIEWER_RESULT_SELECTOR,
  } = PLAN_EDIT_MENU;
  await page.locator(PLAN_EDIT_MENU_SELECTOR).click();
  // await page.locator(ADD_REVIEWER_BUTTON_SELECTOR).click();
  await page.locator(SEARCH_REVIEWER_INPUT_SELECTOR).type(reviewerId);
  await page.locator(REVIEWER_RESULT_SELECTOR).click();

  // Return to dashboard
  await page.locator(PLAN_EDIT_MENU_SELECTOR).click();
};

/**
 * Upon requesting the reviewer, the reviewer visits the reviewer dashboard. The
 * reviewee is left on the dashboard while the reviewer is left on the reviewer dashboard.
 * @param loginId The reviewee's user_id
 * @param reviewerId The reviewer's user_id
 */
export const AFTER_VISITING_REVIEW_DASHBOARD = async (
  page,
  reviewerPage,
  loginId = TEST_ID,
  reviewerId = REVIEWER_ID,
) => {
  await AFTER_REVIEWER_REQUESTED(page, reviewerPage, loginId, reviewerId);
  await confirmPlanReview(REVIEWER_ID);
  await page.reload(); // Reviewer will not be recognized unless refreshed
  await visitReviewerDashboard(reviewerPage);
};

export const AFTER_INSPECTING_PLAN = async (
  page,
  reviewerPage,
  loginId = TEST_ID,
  reviewerId = REVIEWER_ID,
) => {
  await AFTER_VISITING_REVIEW_DASHBOARD(
    page,
    reviewerPage,
    loginId,
    reviewerId,
  );
  await inspectPlan(reviewerPage);
};
