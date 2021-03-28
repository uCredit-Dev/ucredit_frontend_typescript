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
  preReq: Course[];
};

// For User courses, which have extra ids with user-specific info and a single term/area that the user chose.
export type UserCourse = {
  title: string;
  term: SemesterType;
  number: String;
  department: String;
  tags: string[];
  area: string;
  credits: number;
  wi: boolean;
  taken: boolean;
  ratings: number[];
  distribution_ids: string;
  user_id: string;
};

export type Plan = {
  majors: String[];
  freshman: UserCourse[];
  sophomore: UserCourse[];
  junior: UserCourse[];
  senior: UserCourse[];
  distributions: Distribution[];
};

export type User = {
  _id: string; //JHED ID
  firstName: string;
  lastName: string;
  email: string;
  affiliation: string; //STUDENT, FACULTY or STAFF
  school: string;
  grade: string;
  plans: Plan[];
};

// Info for distribution bar.
export type Distribution = {
  _id: string;
  name: string;
  required: number;
  planned: number;
  current: number;
  satisfied: boolean;
  courses: Course[];
  userId: string;
};

export type YearType = 'Freshman' | 'Sophomore' | 'Junior' | 'Senior';

export type SemesterType = 'Fall' | 'Spring' | 'Summer' | 'Intersession';

export type FilterType =
  | 'credits'
  | 'distribution'
  | 'tags'
  | 'term'
  | 'department'
  | 'wi';
