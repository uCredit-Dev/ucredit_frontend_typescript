/**
 * Advising E2E Tests: All tests related to plan reviews and commenting.
 */

import { test, expect } from '@playwright/test';
import {
  URL,
  TEST_ID,
  PLAN_OVERVIEW,
  REVIEWER_ID,
  DASHBOARD_PAGE,
} from './e2eFixtures';
import {
  AFTER_PLAN_OVERVIEW_CLICKED,
  AFTER_REVIEWER_REQUESTED,
} from './e2eFlows';
import { confirmPlanReview, deleteUser, newPage } from './e2eUtils';

test.beforeEach(async ({ page }) => {
  await deleteUser(TEST_ID);
  await deleteUser(REVIEWER_ID);
  await page.goto(URL);
});

test.describe('Request Reviewer', async () => {
  test('Should be able to see plan overview', async ({ page }) => {
    await AFTER_PLAN_OVERVIEW_CLICKED(page);
    const { DEGREE_PROGRESS_SELECTOR } = PLAN_OVERVIEW;
    await expect(page.locator(DEGREE_PROGRESS_SELECTOR)).toBeVisible();
  });

  test('Should be able to search and add reviewer', async ({ page }) => {
    const reviewerPage = await newPage();
    await AFTER_REVIEWER_REQUESTED(page, reviewerPage);
    const { ADD_REVIEWER_SUCCEEDED_SELECTOR } = PLAN_OVERVIEW;
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
    const { ADVISING_BUTTON_SELECTOR } = DASHBOARD_PAGE;
    await page.locator(ADVISING_BUTTON_SELECTOR).click();
    await expect(page.locator(`text="${TEST_ID}"`)).toBeVisible();
  });
});
