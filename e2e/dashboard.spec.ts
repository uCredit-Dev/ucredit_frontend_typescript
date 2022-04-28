/**
 * Dashboard Tests: All tests related to the four-year planning dashboard.
 */
import { test } from '@playwright/test';
import { addCourse } from './e2eActions';
import { URL, TEST_ID } from './e2eFixtures';
import { AFTER_PLAN_CREATED } from './e2eFlows';
import { deleteUser } from './e2eUtils';

test.beforeEach(async ({ page }) => {
  await deleteUser(TEST_ID);
  await page.goto(URL);
});

test.describe('Adding course', async () => {
  test('Should be able to add courses to Freshman year', async ({ page }) => {
    await AFTER_PLAN_CREATED(page);
    await addCourse(page, 'Data Structures', 'Freshman', 'Fall');
    await addCourse(page, 'Intermediate Programming', 'Freshman', 'Fall');
    await addCourse(page, 'Discrete Mathematics', 'Freshman', 'Fall');
    await addCourse(page, 'Honors Linear Algebra', 'Freshman', 'Fall');
  });
});
