/**
 * Advising E2E Tests: All tests related to plan reviews and commenting.
 */

import { test, expect } from '@playwright/test';
import {
  addCourse,
  addYearComment,
  clickYearComment,
  inspectPlan,
  viewPlanSummary,
} from './e2eActions';
import {
  URL,
  TEST_ID,
  REVIEWER_ID,
  // PLAN_EDIT_MENU,
  ADD_PLAN_MODAL,
  COURSE_NAMES,
  ADD_COMMENT_MODAL,
} from './e2eFixtures';
import {
  AFTER_INSPECTING_PLAN,
  AFTER_REVIEWER_REQUESTED,
  AFTER_VISITING_REVIEW_DASHBOARD,
} from './e2eFlows';
import { deleteUser, newPage } from './e2eUtils';

test.beforeEach(async ({ page }) => {
  await deleteUser(TEST_ID);
  await deleteUser(REVIEWER_ID);
  await page.goto(URL);
});

// TODO: Below tests break after some frontend updates
test.describe('Request Reviewer', async () => {
  test('Should be able to search and add reviewer', async ({ page }) => {
    const reviewerPage = await newPage();
    await AFTER_REVIEWER_REQUESTED(page, reviewerPage);
    // const { ADD_REVIEWER_SUCCEEDED_SELECTOR } = PLAN_EDIT_MENU;
    // await expect(page.locator(ADD_REVIEWER_SUCCEEDED_SELECTOR)).toBeVisible();
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
    const { DATA_STRUCTURES } = COURSE_NAMES;
    await inspectPlan(page);
    await expect(page.locator(`text="${DATA_STRUCTURES}"`)).toBeVisible();
  });

  test('Should be able to view reviewee plan summary', async ({ page }) => {
    const { CS_BA_MAJOR_NAME } = ADD_PLAN_MODAL;
    await viewPlanSummary(page);
    await expect(page.locator(`text=${CS_BA_MAJOR_NAME}`)).toBeVisible();
  });
});

const comment = 'This is a comment';
test.describe('Reviewee/Reviewer Commenting', async () => {
  test('Should be able to add a comment as a reviewer', async ({ page }) => {
    const revieweePage = await newPage();
    await AFTER_INSPECTING_PLAN(revieweePage, page);
    await addYearComment(page, 'Freshman', comment);
  });

  test('Should be able to see comment as reviewee', async ({ page }) => {
    const reviewerPage = await newPage();
    const { commentSelector } = ADD_COMMENT_MODAL;
    await AFTER_INSPECTING_PLAN(page, reviewerPage);
    await addYearComment(reviewerPage, 'Freshman', comment);
    await page.reload(); // Have to reload to see comment.
    await clickYearComment(page, 'Freshman');
    await expect(page.locator(commentSelector(comment))).toBeVisible();
  });

  test('Should be able to add a comment to self as a reviewee', async ({
    page,
  }) => {
    const reviewerPage = await newPage();
    await AFTER_VISITING_REVIEW_DASHBOARD(page, reviewerPage);
    await addYearComment(page, 'Freshman', comment);
  });

  test('Should be able to add a comment visible to reviewer as a reviewee', async ({
    page,
  }) => {
    const reviewerPage = await newPage();
    await AFTER_VISITING_REVIEW_DASHBOARD(page, reviewerPage);
    await addYearComment(page, 'Freshman', comment, [REVIEWER_ID]);
  });

  test('Should be able to see comment as reviewer after reviewee adds comment', async ({
    page,
  }) => {
    const revieweePage = await newPage();
    await AFTER_VISITING_REVIEW_DASHBOARD(revieweePage, page);
    const { commentSelector } = ADD_COMMENT_MODAL;
    await addYearComment(revieweePage, 'Freshman', comment, [REVIEWER_ID]);
    await inspectPlan(page);
    await clickYearComment(page, 'Freshman');
    await expect(page.locator(commentSelector(comment))).toBeVisible();
  });
});
