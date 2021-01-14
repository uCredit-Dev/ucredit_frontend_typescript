import { Course, User } from './commonTypes';

export const testCourseFall: Course = {
  courseName: 'Full-stack Javascript',
  courseNumber: 'EN.601.280',
  designators: ['Computer Science'],
  credits: 3,
  description:
    'A full-stack JavaScript developer is a person who can build modern software applications using primarily the JavaScript programming language. Creating a modern software application involves integrating many technologies - from creating the user interface to saving information in a database and everything else in between and beyond. A full-stack developer is not an expert in everything. Rather, they are someone who is familiar with various (software application) frameworks and the ability to take a concept and turn it into a finished product. This course will teach you programming in JavaScript and introduce you to several JavaScript frameworks that would enable you to build modern web, cross-platform desktop, and native/hybrid mobile applications. A student who successfully completes this course will be on the expedited path to becoming a full-stack JavaScript developer.',
};

export const testCourseSpring: Course = {
  courseName: 'Phonology I',
  courseNumber: 'AS.050.325',
  designators: ['Natural Sciences'],
  credits: 3,
  description:
    'An introduction to the basic principles underlying the mental representation and manipulation of language sounds and their relation to human perception and vocal articulation: how units of sound are both decomposable into elementary features and combined to form larger structures like syllables and words. The role of rules and constraints in a formal theory of phonological competence and in accounting for the range of variation among the world’s languages. Also offered as AS.050.625.',
};

export const testUser: User = {
  firstName: 'Matthew',
  lastName: 'Liu',
  majors: [
    'Computer Science - Bachelors of Science',
    'Cognitive Science - Bachelors of Arts',
  ],
  year: 2023,
  fallCourses: [testCourseFall],
  springCourses: [testCourseSpring],
  winterCourses: [],
  summerCourses: [],
};
