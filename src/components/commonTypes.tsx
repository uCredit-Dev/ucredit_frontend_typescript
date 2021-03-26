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

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  affiliation: string;
  grade: string;
  school: string;
  freshman: string[];
  sophomore: string[];
  junior: string[];
  senior: string[];
  distributions: [];
  majors: string[];
};

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

export type SemesterType = 'Fall' | 'Spring' | 'Summer' | 'Winter';
