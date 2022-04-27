/**
 * Dashboard Tests: All tests related to the four-year planning dashboard.
 */
import { test } from '@playwright/test';
import { URL, TEST_ID } from './e2eFixtures';
import { AFTER_PLAN_CREATED } from './e2eFlows';
import { deleteUser } from './e2eUtils';

test.beforeEach(async ({ page }) => {
  await deleteUser(TEST_ID);
  await page.goto(URL);
});

test.describe('Adding course', async () => {
  test('Should be able to add to Freshman year', async ({ page }) => {
    await AFTER_PLAN_CREATED(page);
    // TODO
  });
});
