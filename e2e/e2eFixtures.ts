/**
 * Fixtures: Hard-coded data for tests.
 */
export const URL = 'http://localhost:3000';
export const API_URL = 'http://localhost:4567';
export const TEST_ID = 'TEST_DEV';
export const REVIEWER_ID = 'REVIEWER_DEV';

export const HOME_PAGE = {
  APP_NAME: 'uCredit',
  LOGIN_BUTTON_SELECTOR: 'button:text("Log in")',
};

export const LOGIN_PAGE = {
  JHU_LOGIN_BUTTON_SELECTOR: 'button:text("JHU Login")',
  LOGIN_INPUT_SELECTOR: 'input[placeholder="Enter a custom ID here"]',
  CONFIRM_LOGIN_BUTTON_SELECTOR: 'button:text("Login as custom user")',
};

export const ADD_PLAN_MODAL = {
  ADD_PLAN_MODAL_SELECTOR: 'text=Adding a new plan!',
  SELECT_MAJOR_INPUT_SELECTOR: '.select-major-input',
  CS_BA_MAJOR_NAME: 'B.A. Computer',
  ADD_MAJOR_BUTTON_SELECTOR: 'button:text("Add")',
};

export const DASHBOARD_PAGE = {
};

export const HAMBURGER_MENU = {
  HAMBURGER_MENU_SELECTOR: '.hamburger-menu',
  REVIEWER_DASHBOARD_BUTTON_SELECTOR: 'span:text("Reviewer Dashboard")',
  LOGOUT_BUTTON_SELECTOR: 'span:text("Sign Out")',
};

export const PLAN_EDIT_MENU = {
  PLAN_EDIT_MENU_SELECTOR: '.plan-edit-menu',
  DEFAULT_PLAN_NAME_SELECTOR: 'text="Unnamed Plan"',
  DEGREE_PROGRESS_SELECTOR: 'text="Degree Progress"',
  ADD_REVIEWER_BUTTON_SELECTOR: '.add-reviewer-button',
  SEARCH_REVIEWER_INPUT_SELECTOR: 'input[placeholder="jsmith1 or John Smith"]',
  REVIEWER_RESULT_SELECTOR: `text=${REVIEWER_ID}`,
  ADD_REVIEWER_SUCCEEDED_SELECTOR: 'text="Reviewer requested"',
}


export const DEGREE_PROGRESS = {
};
