export type Course = {
  courseName: string;
  courseNumber: string;
  designators: string[];
  credits: number;
  description: string;
};

export type User = {
  firstName: string;
  lastName: string;
  majors: string[];
  year: number;
  fallCourses: Course[];
  springCourses: Course[];
  winterCourses: Course[];
  summerCourses: Course[];
};
