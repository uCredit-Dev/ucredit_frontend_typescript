/**
 * Actions: User actions for E2E testing.
 */

import { ADD_COURSE_MODAL, DASHBOARD } from './e2eFixtures';
import { Page, expect } from '@playwright/test';

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
