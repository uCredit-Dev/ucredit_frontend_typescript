export type Course = {
  _id: string;
  title: string;
  number: string;
  term: SemesterType;
  department: string;
  upperLevel: boolean;
  tags: string[];
  area: string;
  taken: boolean;
  writingIntensive: boolean;
  ratings: string[];
  userId: string;
  distributions: string[];
  credits: number;
  description: string;
};

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  majors: string[];
  year: number;
  freshmanCourses: string[];
  sophomoreCourses: string[];
  juniorCourses: string[];
  seniorCourses: string[];
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

export type SemesterType = 'Fall' | 'Spring' | 'Summer' | 'Winter';
