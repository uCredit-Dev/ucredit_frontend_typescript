/**
 * Fixtures: Hard-coded data for tests.
 */
// export const URL = 'https://ucredit-frontend-typescript-local.vercel.app';
export const URL = 'https://ucredit-distributions-demo.vercel.app';
export const API_URL = 'https://ucredit-dev.onrender.com';
export const TEST_ID = 'TEST_DEV';
export const REVIEWER_ID = 'REVIEWER_DEV';
export const COURSE_NAMES = {
  DATA_STRUCTURES: 'Data Structures',
  INTERMEDIATE_PROGRAMMING: 'Intermediate Programming',
  DISCRETE_MATHEMATICS: 'Discrete Mathematics',
  HONORS_LINEAR_ALGEBRA: 'Honors Linear Algebra',
};
export const CS_DISTRIBUTION_NAMES = {
  COMPUTER_SCIENCE: 'Computer Science',
  CLASSIFICATIONS: 'Computer Science Classifications',
  MATHEMATICS: 'Mathematics',
  MATHEMATICS_ELECTIVES: 'Mathematics Electives',
  BASIC_SCIENCES: 'Basic Sciences',
  HUMANITIES_SOCIAL_SCIENCES: 'Humanities/Social Sciences',
  WRITING_INTEISIVE: 'Writing Intensive',
  ELECTIVES: 'Electives',
};
export const CS_FINE_NAMES = {
  ETHICS: "Computer Ethics", 
  TEAM: 'Team Requirement',
  UPPER: 'Upper Level CS Credits',
  LOWER: 'Lower Level Undergraduate', 
  CALC: 'Calculus I',
  WRITING: 'Writing-Focused WI',
}

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
  CS_BS_MAJOR_NAME: 'B.S. Computer Science',
  ADD_MAJOR_BUTTON_SELECTOR: 'button:text("Add")',
};

export const DASHBOARD = {
  RETRIEVED_PLANS_SELECTOR: 'text=/Retrieved [0-9]+ plans!/',
  /**
   * Generates the selector for the header of year sections.
   * @param year The year to select, one of "Freshman", "Sophomore", "Junior", "Senior"
   * @returns The selector for the year's header.
   */
  yearHeaderSelector: (year: string) => `text="${year}"`,
  ADD_COMMENT_BUTTON_SELECTOR: '.add-comment-button',
  /**
   * Generates the selector for buttons that add courses to the plan.
   * @param year The year to select, one of "Freshman", "Sophomore", "Junior", "Senior"
   * @param semester The semester to select, one of "Fall", "Intersession", "Spring", "Summer"
   * @returns The selector for the button that adds a course for the year and semester
   */
  addCourseButtonSelector: (year: string, semester: string) =>
    `.add-course-button-${year}-${semester}`,
  TRACKER_SELECTOR: 'text="Tracker"',
};

export const ADD_COURSE_MODAL = {
  COURSE_SEARCH_INPUT_SELECTOR: 'input[placeholder="Course title or number"]',
  ADD_COURSE_BUTTON_SELECTOR: 'button:text("Add Course")',
  SEARCH_RESULT_SELECTOR: '.search-result',
  /**
   * Generates the selector for the toast message that appears after adding a course.
   * @param name The name of the course to add
   * @returns The selector for the toast message after adding a course with the name
   */
  addCourseSucceededSelector: (name: string) => `text="${name} added!"`,
};

export const ADD_COMMENT_MODAL = {
  COMMENT_INPUT_SELECTOR: 'textarea[placeholder="Add a reply..."]',
  SEND_BUTTON_SELECTOR: 'text="Send"',
  commentSelector: (content: string) => `p:text("${content}")`,
  SELECT_REVIEWERS_INPUT_SELECTOR: '.select-reviewers-input',
};

export const HAMBURGER_MENU = {
  HAMBURGER_MENU_SELECTOR: '.hamburger-menu',
  REVIEWER_DASHBOARD_BUTTON_SELECTOR: 'span:text("Reviewer Dashboard")',
  LOGOUT_BUTTON_SELECTOR: 'span:text("Sign Out")',
};

export const PLAN_EDIT_MENU = {
  PLAN_EDIT_MENU_SELECTOR: '.plan-edit-menu',
  DEFAULT_PLAN_NAME_SELECTOR: 'text="Unnamed Plan"',
  ADD_REVIEWER_BUTTON_SELECTOR: '.add-reviewer-button',
  SEARCH_REVIEWER_INPUT_SELECTOR: 'input[placeholder="jsmith1 or John Smith"]',
  REVIEWER_RESULT_SELECTOR: `text=${REVIEWER_ID}`,
  ADD_REVIEWER_SUCCEEDED_SELECTOR: 'text="Reviewer requested"',
};

export const TRACKER_MODAL = {
  RELOAD_BUTTON_SELECTOR: '.reload-button',
  TOTAL_CREDIT_SELECTOR: '.total',
  MAJOR_OPTIONS_SELECTOR: '.major-select',
  distribution_selector: (name: string) => `.${name}`,
};

export const REVIEWER_DASHBOARD = {
  INSPECT_PLAN_BUTTON_SELECTOR: '.inspect-plan-button',
  VIEW_SUMMARY_BUTTON_SELECTOR: '.view-summary-button',
};

export const PLAN_SUMMARY_MODAL = {
  CLOSE_BUTTON_SELECTOR: 'button:text("Close")',
};

