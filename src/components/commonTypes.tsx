export type Restriction = {
  RestrictionName: string;
  Description: string;
};

// For SIS courses
export type Course = {
  title: string;
  number: string;
  areas: string;
  terms: SemesterType[];
  school: string;
  department: string;
  credits: string;
  wi: boolean;
  bio: string;
  tags: string[];
  preReq: any;
  restrictions: Restriction[];
};

// For User courses, which have extra ids with user-specific info and a single term/area that the user chose.
export type UserCourse = {
  _id: string;
  title: string;
  term: SemesterType;
  number: string;
  department: string;
  tags: string[];
  area: string;
  credits: number;
  wi: boolean;
  taken: boolean;
  ratings: number[];
  distribution_ids: string[];
  plan_id: string;
  user_id: string;
};

export type Plan = {
  _id: string;
  name: string;
  majors: string[];
  freshman: string[];
  sophomore: string[];
  junior: string[];
  senior: string[];
  distribution_ids: string[];
  user_id: string;
};

export type User = {
  _id: string; //JHED ID
  firstName: string;
  lastName: string;
  email: string;
  affiliation: string; //STUDENT, FACULTY or STAFF
  school: string;
  grade: string;
  plan_ids: string[];
};

// Info for distribution bar.
export type Distribution = {
  _id: string;
  name: string;
  required: number;
  planned: number;
  current: number;
  satisfied: boolean;
  courses: string[];
  user_id: string;
  plan_id: string;
};

export type YearType = "Freshman" | "Sophomore" | "Junior" | "Senior";

export type SemesterType = "fall" | "spring" | "summer" | "intersession";

export type FilterType =
  | "credits"
  | "distribution"
  | "tags"
  | "term"
  | "department"
  | "wi";

export type generalDistributionType =
  | "Total Credits"
  | "Basic Sciences (N)"
  | "General Electives"
  | "Humanities/Social Sciences (H)(S)"
  | "Mathematics (Q)"
  | "Writing Intensive (WI)";

export type Major = {
  name: string;
  generalDistributions: {
    name: string | generalDistributionType;
    required: number;
  }[];
  fineRequirements: [];
  restrictions: [];
};
