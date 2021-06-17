import { all_majors, course_tags } from "./assets";

/* 
  File containing all the common types we use throughout the app.
*/

// Course restriction type. Has the restriction name as well as the description of the restriction.
export type Restriction = {
  RestrictionName: string;
  Description: string;
};

// For inspected SIS courses
export type Course = {
  title: string;
  number: string;
  areas: string;
  term: String;
  school: string;
  department: string;
  credits: string;
  wi: boolean;
  bio: string;
  tags: string[];
  preReq: string[];
  restrictions: Restriction[];
};

export type SISRetrievedCourse = {
  title: string;
  number: string;
  terms: string[];
  versions: {
    areas: string;
    term: string;
    school: string;
    department: string;
    credits: string;
    wi: boolean;
    bio: string;
    level: string;
    tags: string[];
    preReq: string[];
    coReq: string[];
    restrictions: any[];
  }[];
};

// For course Evals
export type CourseEvals = {
  number: string;
  prof: string;
  rating: string;
  summary: string;
  term: string;
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
  year_id: string;
  year: string;
  preReq: string;
};

export type Year = {
  _id: string;
  name: string;
  year: number;
  courses: string[];
  plan_id: any;
  user_id: string;
};

export type Plan = {
  _id: string;
  name: string;
  majors: string[];
  distribution_ids: string[];
  user_id: string;
  numYears: number;
  years: Year[];
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
  area?: string;
  tags?: TagType[];
  department?: string;
  title?: string;
  number?: string | string[];
  wi?: boolean;
  exception?: Filter;
};

// Info for distribution bar.
export type Distribution = {
  _id: string;
  name: string;
  required_credits: number;
  min_credits_per_course: number;
  description: string;
  criteria: string;
  fine_requirements?: FineReq[];
  user_select?: boolean;
  double_count?: boolean;
  exception?: string;
  planned_credits: number;
  courses: string[];
  user_id: string;
  plan_id: string;
};

// export type YearType = "Freshman" | "Sophomore" | "Junior" | "Senior";

export type SemesterType = "Fall" | "Spring" | "Summer" | "Intersession";

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

export type FineReq = {
  required_credits: number;
  description: string;
  criteria: string;
  exclusive?: boolean;
};

export type DistributionObj = {
  name: string;
  required_credits: number;
  min_credits_per_course: number;
  description: string;
  criteria: string;
  fine_requirements?: FineReq[];
  user_select?: boolean;
  double_count?: boolean;
  exception?: string;
};

export type Major = {
  degree_name: string;
  department: string;
  total_degree_credit: number;
  wi_credit: number;
  distributions: DistributionObj[];
};

export type DroppableType = {
  year: string;
  semester: SemesterType;
  courses: UserCourse[];
};
