/**
 * Dashboard Tests: All tests related to the four-year planning dashboard.
 */
import { test } from '@playwright/test';
import { addCourse, clickDistributionBar, clickTracker } from './e2eActions';
import { URL, TEST_ID, COURSE_NAMES, CS_DISTRIBUTION_NAMES, TRACKER_MODAL, CS_FINE_NAMES } from './e2eFixtures';
import { AFTER_PLAN_CREATED } from './e2eFlows';
import { deleteUser } from './e2eUtils';

test.beforeAll(async ({ page }) => {
  await deleteUser(TEST_ID);
  await page.goto(URL);
});

test.afterAll(async () => {
  await deleteUser(TEST_ID);
});

test.describe('Distributions', async () => {
  test('Should be able to see distributions after creating plan', async ({ page }) => {
    await AFTER_PLAN_CREATED(page); // create cs ba plan 
    await clickTracker(page);
    const {
      RELOAD_BUTTON_SELECTOR,
      TOTAL_CREDIT_SELECTOR
    } = TRACKER_MODAL; 
    // confirm reload button visible 
    expect(page.locator(RELOAD_BUTTON_SELECTOR).first()).toBeVisible();
    // confirm total credits visible 
    expect(page.locator(TOTAL_CREDIT_SELECTOR).first()).toBeVisible();
    // confirm all distributions are present 
    for (let name in CS_DISTRIBUTION_NAMES) {
      expect(page.locator(`text=${name}`).first()).toBeVisible();
    }
    // click 'CS Core' and expect 'Upper CS Electives' 
  }); 

  test('Should be able to see fine requirements after creating plan', async ({ page }) => {
    // confirm all fine requirements are present 
    const { COMPUTER_SCIENCE, MATHEMATICS, WRITING_INTEISIVE } = CS_DISTRIBUTION_NAMES;
    const { ETHICS, TEAM, UPPER, LOWER, CALC, WRITING } = CS_FINE_NAMES;
    // check computer science fine requirements 
    await clickTracker(page);
    await clickDistributionBar(page, COMPUTER_SCIENCE);
    expect(page.locator(`text=${ETHICS}`).first()).toBeVisible();
    expect(page.locator(`text=${TEAM}`).first()).toBeVisible();
    expect(page.locator(`text=${UPPER}`).first()).toBeVisible();
    expect(page.locator(`text=${LOWER}`).first()).toBeVisible();
    // check math fine requirements
    await clickTracker(page);
    await clickDistributionBar(page, MATHEMATICS); 
    expect(page.locator(`text=${CALC}`).first()).toBeVisible();
    // check writing intensive fine requirement
    await clickTracker(page);
    await clickDistributionBar(page, WRITING_INTEISIVE); 
    expect(page.locator(`text=${WRITING}`).first()).toBeVisible();
  }); 

  test('Should be able to see distributions update after adding course', async ({ page }) => {
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
    // expect total credits to update 
    // expect distributions to update 
    // expect fine requirements to update 
  }); 

  test('Should be able to see distributions after a reload', async ({ page }) => {
    // wait 5 seconds 
    // expect distribution bars to exist 
    // expect credits > 0 for dist / finereqs 
  }); 

  test('Should be able to see distributions after adding major', async ({ page }) => {
    // click major dropdown 
    // select molcell 
    // click tracker 
    // click major dropdown 
    // select molcell 
    // expect distributions / fine reqs to exist 
    // expect credits > 0 
  }); 

  test('Should be able to see distributions update after deleting course', async ({ page }) => {
    // delete course 
    // expect total credits to update 
    // expect dist to update 
    // expect fine req to update 
  }); 
});
