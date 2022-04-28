/**
 * Dashboard Tests: All tests related to the four-year planning dashboard.
 */
import { test } from '@playwright/test';
import { addCourse } from './e2eActions';
import { URL, TEST_ID, COURSE_NAMES } from './e2eFixtures';
import { AFTER_PLAN_CREATED } from './e2eFlows';
import { deleteUser } from './e2eUtils';

test.beforeEach(async ({ page }) => {
  await deleteUser(TEST_ID);
  await page.goto(URL);
});

test.describe('Adding course', async () => {
  test('Should be able to add courses to Freshman year', async ({ page }) => {
    await AFTER_PLAN_CREATED(page);
    const {
      DATA_STRUCTURES,
      INTERMEDIATE_PROGRAMMING,
      DISCRETE_MATHEMATICS,
      HONORS_LINEAR_ALGEBRA,
    } = COURSE_NAMES;
    await addCourse(page, DATA_STRUCTURES, 'Freshman', 'Fall');
    await addCourse(page, INTERMEDIATE_PROGRAMMING, 'Freshman', 'Fall');
    await addCourse(page, DISCRETE_MATHEMATICS, 'Freshman', 'Fall');
    await addCourse(page, HONORS_LINEAR_ALGEBRA, 'Freshman', 'Fall');
  });
});
