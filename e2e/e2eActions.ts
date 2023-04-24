/**
 * Actions: User actions for E2E testing.
 */

import {
  ADD_COMMENT_MODAL,
  ADD_COURSE_MODAL,
  DASHBOARD,
  HAMBURGER_MENU,
  REVIEWER_DASHBOARD,
  TRACKER_MODAL,
} from './e2eFixtures';
import { Page, expect } from '@playwright/test';

/**
 * Adds a course to a dashboard.
 * @param page The page to add the course to.
 * @param name The name of the course to add
 * @param year The year to add it to, one of "Freshman", "Sophomore", "Junior", or "Senior"
 * @param semester The semester to add it to, one of "Fall", "Intersession", "Spring", or "Summer"
 * @precondition page must be on the dashboard
 * @postcondition page must be back on the dashboard with no modals open
 */
export const addCourse = async (
  page: Page,
  name: string,
  year: string,
  semester: string,
) => {
  const { addCourseButtonSelector } = DASHBOARD;
  const {
    COURSE_SEARCH_INPUT_SELECTOR,
    SEARCH_RESULT_SELECTOR,
    ADD_COURSE_BUTTON_SELECTOR,
    addCourseSucceededSelector,
  } = ADD_COURSE_MODAL;
  await page.locator(addCourseButtonSelector(year, semester)).click();
  await page.locator(COURSE_SEARCH_INPUT_SELECTOR).type(name);
  await page.locator(SEARCH_RESULT_SELECTOR).first().click();
  await page.locator(ADD_COURSE_BUTTON_SELECTOR).click();
  await expect(page.locator(addCourseSucceededSelector(name))).toBeVisible();
};

/**
 * Clicks on the comments for a year section.
 * @param page The page to click the year comment section on.
 * @param year The year to select, one of "Freshman", "Sophomore", "Junior", "Senior"
 */
export const clickYearComment = async (page: Page, year: string) => {
  const { yearHeaderSelector, ADD_COMMENT_BUTTON_SELECTOR } = DASHBOARD;
  await page.locator(yearHeaderSelector(year)).hover();
  await page.locator(ADD_COMMENT_BUTTON_SELECTOR).click();
};

/**
 * Adds a comment to a year section.
 * @param page The page to add the comment to.
 * @param year The year to add it to, one of "Freshman", "Sophomore", "Junior", "Senior"
 * @param content The content of the comment to add
 * @precondition page must be on the dashboard
 * @postcondition page must be back on the dashboard with no modals open
 */
export const addYearComment = async (
  page: Page,
  year: string,
  content: string,
  toReviewers: string[] = [],
) => {
  const { yearHeaderSelector } = DASHBOARD;
  const {
    COMMENT_INPUT_SELECTOR,
    SEND_BUTTON_SELECTOR,
    commentSelector,
    SELECT_REVIEWERS_INPUT_SELECTOR,
  } = ADD_COMMENT_MODAL;
  await clickYearComment(page, year);
  await page.locator(COMMENT_INPUT_SELECTOR).type(content);
  await page.locator(COMMENT_INPUT_SELECTOR).press('Tab');
  for (const reviewer of toReviewers) {
    await page.locator(SELECT_REVIEWERS_INPUT_SELECTOR).click();
    await page.locator(SELECT_REVIEWERS_INPUT_SELECTOR).type(reviewer);
    await page.locator(SELECT_REVIEWERS_INPUT_SELECTOR).press('Tab');
    await expect(page.locator(`text="${reviewer}"`)).toBeVisible();
  }
  await page.locator(SEND_BUTTON_SELECTOR).click();
  await expect(page.locator(commentSelector(content))).toBeVisible();
  await page.locator(yearHeaderSelector(year)).click();
};

/**
 * Visits the reviewer dashboard from the dashboard.
 * @param page The page to visit the reviewer dashboard
 * @precondition page must be on the dashboard
 * @postcondition page must be on the reviewer dashboard
 */
export const visitReviewerDashboard = async (page: Page) => {
  const { HAMBURGER_MENU_SELECTOR, REVIEWER_DASHBOARD_BUTTON_SELECTOR } =
    HAMBURGER_MENU;
  await page.locator(HAMBURGER_MENU_SELECTOR).click();
  await page.locator(REVIEWER_DASHBOARD_BUTTON_SELECTOR).click();
};

/**
 * Inspects the first plan that shows up in the reviewer dashboard.
 * @param page The page to inspect the plan with
 * @precondition page must be on the reviewer dashboard
 * @postcondition page must be on the dashboard (in reviewer mode)
 */
export const inspectPlan = async (page: Page) => {
  const { INSPECT_PLAN_BUTTON_SELECTOR } = REVIEWER_DASHBOARD;
  // Doesn't work with just click, but works with hover coming before.
  await page.locator(INSPECT_PLAN_BUTTON_SELECTOR).first().hover();
  await page.locator(INSPECT_PLAN_BUTTON_SELECTOR).first().click();
};

/**
 * Views the first plan summary that shows up in the reviewer dashboard.
 * @param page The page to view the plan summary with
 * @precondition page must be on the reviewer dashboard
 * @postcondition page must be showing the plan summary modal
 */
export const viewPlanSummary = async (page: Page) => {
  const { VIEW_SUMMARY_BUTTON_SELECTOR } = REVIEWER_DASHBOARD;
  await page.locator(VIEW_SUMMARY_BUTTON_SELECTOR).first().click();
};

/**
 * Click on tracker button to view degree progress.
 * @param page The page to view the plan summary with
 * @precondition page must be on dashboard
 * @postcondition page must be showing the degree progress
 */
export const clickTracker = async (page: Page) => {
  const { TRACKER_SELECTOR } = DASHBOARD;
  await page.locator(TRACKER_SELECTOR).click();
};

/**
 * Click on distribution to view its fine requirements.
 * @param page The page to view the fine requirements with
 * @precondition page must be on dashboard and degree progress must be showing
 * @postcondition page must be showing the cart with fine requirements
 */
export const clickDistributionBar = async (page: Page, distribution: string) => {
  const { distribution_selector } = TRACKER_MODAL; 
  await page.locator(distribution_selector(distribution)).click();
};