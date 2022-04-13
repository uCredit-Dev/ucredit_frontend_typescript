import {
  URL,
  TEST_ID,
} from './e2eFixtures';
import { test, expect } from '@playwright/test';
import { deleteUser } from './e2eUtils';

test.beforeEach(async ({ page }) => {
  await deleteUser(TEST_ID);
  await page.goto(URL);
});

test.describe('Plan Overview', () => {
  test.beforeEach(async ({ page }) => {
  });

  test('should see plan overview', async ({ page }) => {
  });
});
