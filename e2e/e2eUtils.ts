/**
 * Utils: Helper functions for E2E tests, related to Playwright or API calls.
 */
import { chromium, Page } from '@playwright/test';
import axios from 'axios';
import { URL, API_URL } from './e2eFixtures';

export const newPage = async (url = URL) => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(url);
  return page;
};

export const screenshot = async (page: Page, name: string) => {
  await page.screenshot({ path: `./e2e/screenshots/${name}.png` });
}

export const deleteUser = async (user_id) => {
  try {
    await axios.delete(`${API_URL}/api/user/${user_id}`);
  } catch (e) {
    // Do nothing
  }
};

export const confirmPlanReview = async (reviewer_id) => {
  await axios.post(`${API_URL}/api/backdoor/planReview/confirm`, {
    reviewer_id,
  });
};