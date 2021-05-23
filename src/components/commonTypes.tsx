import { all_majors, course_tags } from "./assets";

/* 
  File containing all the common types we use throughout the app.
*/

// Course restriction type. Has the restriction name as well as the description of the restriction.
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

// For course Evals
export type CourseEvals = {
  number: string;
  prof: string;
  rating: string;
  summary: string;
  term: string;
}

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
  year: string;
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
  name: string;
  email: string;
  affiliation: string; //STUDENT, FACULTY or STAFF
  school: string;
  grade: string;
  plan_ids: string[];
};

export type Filter = {
  area?: RegExp;
  tags?: TagType[];
  department?: RegExp;
  title?: RegExp;
  number?: RegExp;
  wi?: boolean;
  exception?: Filter;
};

// Info for distribution bar.
export type Distribution = {
  _id: string;
  name: string;
  required: number;
  filter: Filter;
  description?: string;
  planned: number;
  current: number;
  satisfied: boolean;
  courses: string[];
  user_id: string;
  plan_id: string;
};

export type YearType = "Freshman" | "Sophomore" | "Junior" | "Senior";

export type SemesterType = "fall" | "spring" | "summer" | "intersession";

// https://stackoverflow.com/questions/52085454/typescript-define-a-union-type-from-an-array-of-strings
export type DepartmentType = typeof all_majors[number];
export type TagType = typeof course_tags[number];

export type FilterType =
  | "credits"
  | "distribution"
  | "tags"
  | "term"
  | "department"
  | "wi";

export type AreaType = "N" | "S" | "H" | "W" | "E" | "Q";

export type Major = {
  name: string;
  department: string;
  distributions: {
    name: string;
    required: number;
    filter: Filter;
    description?: string;
  }[];
  requirements: {
    name: string;
    required: number;
    filter: Filter;
    description?: string;
    byCredit: boolean;
  }[];
};
