/**
 * Advising E2E Tests: All tests related to plan reviews and commenting.
 */

import { test, expect } from '@playwright/test';
import { addCourse } from './e2eActions';
import {
  URL,
  TEST_ID,
  REVIEWER_ID,
  PLAN_EDIT_MENU,
  HAMBURGER_MENU,
  REVIEWER_DASHBOARD,
  ADD_PLAN_MODAL,
  COURSE_NAMES,
} from './e2eFixtures';
import {
  AFTER_REVIEWER_REQUESTED,
  AFTER_VISITING_REVIEW_DASHBOARD,
} from './e2eFlows';
import { deleteUser, newPage } from './e2eUtils';

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
  test.beforeEach(async ({ page }) => {
    const revieweePage = await newPage();
    const { DATA_STRUCTURES } = COURSE_NAMES;
    await AFTER_VISITING_REVIEW_DASHBOARD(revieweePage, page);
    await addCourse(revieweePage, DATA_STRUCTURES, 'Freshman', 'Fall');
  });
  test('Should be able to see reviewee after accepting request', async ({
    page,
  }) => {
    await expect(page.locator(`text="${TEST_ID}"`)).toBeVisible();
  });

  test('Should be able to inspect reviewee plan', async ({ page }) => {
    const { INSPECT_PLAN_BUTTON_SELECTOR } = REVIEWER_DASHBOARD;
    const { DATA_STRUCTURES } = COURSE_NAMES;
    await page.locator(INSPECT_PLAN_BUTTON_SELECTOR).hover();
    await page.locator(INSPECT_PLAN_BUTTON_SELECTOR).click();
    await expect(page.locator(`text="${DATA_STRUCTURES}"`)).toBeVisible();
  });

  test('Should be able to view reviewee plan summary', async ({ page }) => {
    const { VIEW_SUMMARY_BUTTON_SELECTOR } = REVIEWER_DASHBOARD;
    const { CS_BA_MAJOR_NAME } = ADD_PLAN_MODAL;
    await page.locator(VIEW_SUMMARY_BUTTON_SELECTOR).click();
    await expect(page.locator(`text=${CS_BA_MAJOR_NAME}`)).toBeVisible();
  });
});
