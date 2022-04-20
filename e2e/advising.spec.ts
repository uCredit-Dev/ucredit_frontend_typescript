/**
 * Advising E2E Tests: All tests related to plan reviews and commenting.
 */


import { test, expect } from '@playwright/test';
import { URL, TEST_ID, PLAN_OVERVIEW, REVIEWER_ID } from './e2eFixtures';
import {
  AFTER_PLAN_OVERVIEW_CLICKED,
  AFTER_REVIEWER_REQUESTED,
} from './e2eFlows';
import { deleteUser } from './e2eUtils';

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

  test('Should be able to search for reviewers', async ({ page }) => {
    await AFTER_REVIEWER_REQUESTED(page, TEST_ID, REVIEWER_ID);
    const { ADD_REVIEWER_SUCCEEDED_SELECTOR } = PLAN_OVERVIEW;
    await expect(page.locator(ADD_REVIEWER_SUCCEEDED_SELECTOR)).toBeVisible();
  });
});
