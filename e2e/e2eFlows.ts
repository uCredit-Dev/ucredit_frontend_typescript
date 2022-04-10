import { ADD_PLAN_MODAL, HOME_PAGE, LOGIN_PAGE, TEST_ID } from './e2eFixtures';

export const AFTER_LOGIN_PAGE = async (page) => {
  const { LOGIN_BUTTON_SELECTOR } = HOME_PAGE;
  await page.click(LOGIN_BUTTON_SELECTOR);
};

export const AFTER_LOGIN = async (page) => {
  await AFTER_LOGIN_PAGE(page);
  const {
    JHU_LOGIN_BUTTON_SELECTOR,
    LOGIN_INPUT_SELECTOR,
    CONFIRM_LOGIN_BUTTON_SELECTOR,
  } = LOGIN_PAGE;
  await page.click(JHU_LOGIN_BUTTON_SELECTOR);
  await page.type(LOGIN_INPUT_SELECTOR, TEST_ID);
  await page.click(CONFIRM_LOGIN_BUTTON_SELECTOR);
};

export const AFTER_PLAN_CREATED = async (page) => {
  await AFTER_LOGIN(page);
  const {
    SELECT_MAJOR_INPUT_SELECTOR,
    CS_BA_MAJOR_NAME,
    ADD_MAJOR_BUTTON_SELECTOR,
  } = ADD_PLAN_MODAL;
  await page.locator(SELECT_MAJOR_INPUT_SELECTOR).type(CS_BA_MAJOR_NAME);
  await page.locator(SELECT_MAJOR_INPUT_SELECTOR).press('Tab');
  await page.locator(ADD_MAJOR_BUTTON_SELECTOR).click();
};
