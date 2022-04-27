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
  SELECT_MAJOR_INPUT_SELECTOR: 'id=react-select-7-input',
  CS_BA_MAJOR_NAME: 'B.A. Computer',
  ADD_MAJOR_BUTTON_SELECTOR: 'button:text("Add")',
};

export const DASHBOARD_PAGE = {
  DEFAULT_PLAN_NAME_SELECTOR: 'text=Unnamed Plan',
  LOGOUT_BUTTON_SELECTOR: 'button:text("Log Out")',
  PLAN_OVERVIEW_BUTTON_SELECTOR: 'button:text("Plan Overview")',
  ADVISING_BUTTON_SELECTOR: 'button:text("Advising")',
};

export const PLAN_OVERVIEW = {
  ADD_REVIEWER_ICON_SELECTOR: '.add-reviewer-button',
  DEGREE_PROGRESS_SELECTOR: 'text=Degree Progress',
  SEARCH_REVIEWER_INPUT_SELECTOR: 'input[placeholder="jsmith1 or John Smith"]',
  REVIEWER_RESULT_SELECTOR: `text=${REVIEWER_ID}`,
  ADD_REVIEWER_SUCCEEDED_SELECTOR: 'text="Reviewer requested"',
};
