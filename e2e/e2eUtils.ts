/**
 * Utils: Helper functions for E2E tests, related to Playwright or API calls.
 */
import { chromium, Page } from '@playwright/test';
import axios from 'axios';
import { URL, API_URL } from './e2eFixtures';

/**
 * Creates a completely new page in chromium with no shared context.
 * @param url The URL to visit
 * @returns The page object
 */
export const newPage = async (url = URL) => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(url);
  return page;
};

/**
 * Saves a screenshot to the screenshots folder.
 * @param page The page to take a screenshot of
 * @param name The name of the screenshot file
 */
export const screenshot = async (page: Page, name: string) => {
  await page.screenshot({ path: `./e2e/screenshots/${name}.png` });
}

/**
 * Backdoors and tries to delete a user to reset their state. 
 * @param user_id The user_id of the user to delete
 */
export const deleteUser = async (user_id) => {
  try {
    await axios.delete(`${API_URL}/api/user/${user_id}`);
  } catch (e) {
    // Do nothing
  }
};

/**
 * Backdoors and confirms a plan review for a reviewer without using email.
 * @param reviewer_id The reviewer_id of the reviewer to confirm
 */
export const confirmPlanReview = async (reviewer_id) => {
  await axios.post(`${API_URL}/api/backdoor/planReview/confirm`, {
    reviewer_id,
  });
};