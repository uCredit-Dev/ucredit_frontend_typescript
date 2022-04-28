/**
 * Advising E2E Tests: All tests related to plan reviews and commenting.
 */

import { test, expect } from '@playwright/test';
import {
  URL,
  TEST_ID,
  REVIEWER_ID,
  DASHBOARD_PAGE,
  PLAN_EDIT_MENU,
  HAMBURGER_MENU,
} from './e2eFixtures';
import { AFTER_REVIEWER_REQUESTED } from './e2eFlows';
import { confirmPlanReview, deleteUser, newPage } from './e2eUtils';

test.beforeEach(async ({ page }) => {
  await deleteUser(TEST_ID);
  await deleteUser(REVIEWER_ID);
  await page.goto(URL);
});

test.describe('Request Reviewer', async () => {
  test('Should be able to search and add reviewer', async ({ page }) => {
    const reviewerPage = await newPage();
    await AFTER_REVIEWER_REQUESTED(page, reviewerPage);
    const { ADD_REVIEWER_SUCCEEDED_SELECTOR } = PLAN_EDIT_MENU;
    await expect(page.locator(ADD_REVIEWER_SUCCEEDED_SELECTOR)).toBeVisible();
  });
});

test.describe('Reviewer Flow', async () => {
  test('Should be able to see reviewee after accepting request', async ({
    page,
  }) => {
    const revieweePage = await newPage();
    await AFTER_REVIEWER_REQUESTED(revieweePage, page);
    await confirmPlanReview(REVIEWER_ID);
    const { HAMBURGER_MENU_SELECTOR, REVIEWER_DASHBOARD_BUTTON_SELECTOR } =
      HAMBURGER_MENU;
    await page.locator(HAMBURGER_MENU_SELECTOR).click();
    await page.locator(REVIEWER_DASHBOARD_BUTTON_SELECTOR).click();
    await expect(page.locator(`text="${TEST_ID}"`)).toBeVisible();
  });
});
