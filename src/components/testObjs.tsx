import { Course, User, Distribution } from './commonTypes';

export const testCourseFall: Course = {
  _id: 'testFall',
  title: 'Full-stack Javascript',
  number: 'EN.601.280',
  term: 'Fall',
  department: 'EN Computer Science',
  upperLevel: false,
  tags: [],
  area: 'E',
  taken: true,
  writingIntensive: false,
  ratings: [''],
  userId: 'testUser1',
  distributions: ['Computer Science'],
  credits: 3,
  description:
    'A full-stack JavaScript developer is a person who can build modern software applications using primarily the JavaScript programming language. Creating a modern software application involves integrating many technologies - from creating the user interface to saving information in a database and everything else in between and beyond. A full-stack developer is not an expert in everything. Rather, they are someone who is familiar with various (software application) frameworks and the ability to take a concept and turn it into a finished product. This course will teach you programming in JavaScript and introduce you to several JavaScript frameworks that would enable you to build modern web, cross-platform desktop, and native/hybrid mobile applications. A student who successfully completes this course will be on the expedited path to becoming a full-stack JavaScript developer.',
};

export const testCourseSpring: Course = {
  _id: 'testSpring',
  title: 'Phonology I',
  number: 'AS.050.325',
  term: 'Summer',
  department: 'AS Cognitive Science',
  upperLevel: true,
  tags: ['BEHB-SOCSCI', 'COGS-LING'],
  area: 'NS',
  taken: false,
  writingIntensive: false,
  ratings: [''],
  userId: 'testUser1',
  distributions: ['Natural Sciences'],
  credits: 3,
  description:
    'An introduction to the basic principles underlying the mental representation and manipulation of language sounds and their relation to human perception and vocal articulation: how units of sound are both decomposable into elementary features and combined to form larger structures like syllables and words. The role of rules and constraints in a formal theory of phonological competence and in accounting for the range of variation among the world’s languages. Also offered as AS.050.625.',
};

export const testDistributionTot: Distribution = {
  _id: 'testDistribution0',
  name: 'Total Credits',
  required: 127,
  planned: 64,
  current: 56,
  satisfied: false,
  courses: [testCourseFall, testCourseSpring],
  userId: 'testUser1',
};

export const testDistributionElec: Distribution = {
  _id: 'testDistribution3',
  name: 'General Electives',
  required: 28,
  planned: 18,
  current: 10,
  satisfied: false,
  courses: [],
  userId: 'testUser1',
};

export const testDistributionCS: Distribution = {
  _id: 'testDistribution1',
  name: 'Computer Science',
  required: 24,
  planned: 18,
  current: 15,
  satisfied: false,
  courses: [testCourseFall],
  userId: 'testUser1',
};

export const testDistributionMath: Distribution = {
  _id: 'testDistribution2',
  name: 'Mathematics',
  required: 24,
  planned: 12,
  current: 8,
  satisfied: false,
  courses: [],
  userId: 'testUser1',
};

export const testDistributionNS: Distribution = {
  _id: 'testDistribution4',
  name: 'Natural Sciences',
  required: 18,
  planned: 12,
  current: 8,
  satisfied: false,
  courses: [testCourseSpring],
  userId: 'testUser1',
};

export const testDistributionHumanities: Distribution = {
  _id: 'testDistribution5',
  name: 'Humanities',
  required: 16,
  planned: 12,
  current: 8,
  satisfied: false,
  courses: [],
  userId: 'testUser1',
};

export const testUser: User = {
  majors: [],
  freshman: [],
  sophomore: [],
  junior: [],
  senior: [],
  distributions: [],
  _id: 'mliu78',
  firstName: 'Matthew',
  lastName: 'Liu',
  email: 'mliu78@jhu.edu',
  affiliation: 'STUDENT',
  grade: 'AE UG Sophomore',
  school: 'Whiting School of Engineering',
};

export const testMajorDistributions = [
  testDistributionTot,
  testDistributionElec,
  testDistributionCS,
  testDistributionMath,
  testDistributionNS,
  testDistributionHumanities,
];
