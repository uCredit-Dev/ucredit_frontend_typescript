import { Course, User, Distribution } from './commonTypes';

// IMPORTANT: All test objs may be inaccurate with new types

export const testDistributionTot: Distribution = {
  _id: 'testDistribution0',
  name: 'Total Credits',
  required: 127,
  planned: 64,
  current: 56,
  satisfied: false,
  courses: [],
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
  courses: [],
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
  courses: [],
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

export const testCourse1: Course = {
  title: 'Test course 1',
  number: 'EN.420.4204',
  areas: 'NS',
  terms: ['Fall', 'Spring'],
  school: 'Whiting School of Engineering',
  department: 'CS',
  credits: '3',
  wi: false,
  bio: 'Lorem ipsum. This is a test course.',
  tags: ['TEST-COURSE'],
  preReq: [],
};

export const testCourse2: Course = {
  title: 'Test course 2',
  number: 'EN.420.4205',
  areas: 'H',
  terms: ['Spring'],
  school: 'KSAS',
  department: 'Biology',
  credits: '2',
  wi: true,
  bio: 'Lorem ipsum. This is another test course.',
  tags: ['TEST-COURSE'],
  preReq: [testCourse1],
};
