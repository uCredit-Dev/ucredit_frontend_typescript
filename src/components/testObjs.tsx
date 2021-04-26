import {
  Course,
  User,
  Distribution,
  Plan,
  UserCourse,
  Major,
} from "./commonTypes";

// IMPORTANT: All test objs may be inaccurate with new types

export const testDistributionTot: Distribution = {
  _id: "testDistribution0",
  name: "Total Credits",
  required: 127,
  planned: 64,
  current: 56,
  satisfied: false,
  courses: [],
  user_id: "testUser1",
  plan_id: "testPlan1",
};

export const testDistributionElec: Distribution = {
  _id: "testDistribution3",
  name: "General Electives",
  required: 28,
  planned: 18,
  current: 10,
  satisfied: false,
  courses: [],
  user_id: "testUser1",
  plan_id: "testPlan1",
};

export const testDistributionCS: Distribution = {
  _id: "testDistribution1",
  name: "Computer Science",
  required: 24,
  planned: 18,
  current: 15,
  satisfied: false,
  courses: [],
  user_id: "testUser1",
  plan_id: "testPlan1",
};

export const testDistributionMath: Distribution = {
  _id: "testDistribution2",
  name: "Mathematics",
  required: 24,
  planned: 12,
  current: 8,
  satisfied: false,
  courses: [],
  user_id: "testUser1",
  plan_id: "testPlan1",
};

export const testDistributionNS: Distribution = {
  _id: "testDistribution4",
  name: "Natural Sciences",
  required: 18,
  planned: 12,
  current: 8,
  satisfied: false,
  courses: [],
  user_id: "testUser1",
  plan_id: "testPlan1",
};

export const testDistributionHumanities: Distribution = {
  _id: "testDistribution5",
  name: "Humanities",
  required: 16,
  planned: 12,
  current: 8,
  satisfied: false,
  courses: [],
  user_id: "testUser1",
  plan_id: "testPlan1",
};

export const testCourse1: Course = {
  title: "Test course 1",
  number: "EN.420.4204",
  areas: "NS",
  terms: ["fall", "spring"],
  school: "Whiting School of Engineering",
  department: "CS",
  credits: "3",
  wi: false,
  bio: "Lorem ipsum. This is a test course.",
  tags: ["TEST-COURSE"],
  preReq: [],
  restrictions: [],
};

export const testCourse2: Course = {
  title: "Test course 2",
  number: "EN.420.4205",
  areas: "H",
  terms: ["spring"],
  school: "KSAS",
  department: "Biology",
  credits: "2",
  wi: true,
  bio: "Lorem ipsum. This is another test course.",
  tags: ["TEST-COURSE"],
  preReq: [testCourse1],
  restrictions: [],
};

export const userTestCourse1: UserCourse = {
  _id: "userTestCourse1",
  user_id: "mliu78",
  plan_id: "testPlan1",
  title: testCourse1.title,
  term: "fall",
  number: testCourse1.number,
  department: testCourse1.department,
  tags: testCourse1.tags,
  area: "N",
  credits: parseInt(testCourse1.credits),
  wi: testCourse1.wi,
  taken: false,
  ratings: [],
  distribution_ids: [testDistributionNS._id, testDistributionTot._id],
};

export const userTestCourse2: UserCourse = {
  _id: "userTestCourse2",
  title: testCourse2.title,
  term: "spring",
  number: testCourse2.number,
  department: testCourse2.department,
  tags: testCourse2.tags,
  area: "H",
  credits: parseInt(testCourse2.credits),
  wi: testCourse2.wi,
  taken: false,
  ratings: [],
  plan_id: "testPlan1",
  distribution_ids: [testDistributionHumanities._id, testDistributionTot._id],
  user_id: "mliu78",
};

export const testPlan1: Plan = {
  _id: "testPlan1",
  name: "testPlan1",
  user_id: "mliu78",
  majors: ["Computer Science"],
  freshman: [userTestCourse1._id],
  sophomore: [],
  junior: [userTestCourse2._id],
  senior: [],
  distribution_ids: [
    testDistributionTot._id,
    testDistributionCS._id,
    testDistributionElec._id,
    testDistributionHumanities._id,
    testDistributionMath._id,
    testDistributionNS._id,
  ],
};

export const testPlan2: Plan = {
  _id: "testPlan2",
  name: "testPlan2",
  user_id: "mliu78",
  majors: ["Computer Science"],
  freshman: [],
  sophomore: [userTestCourse1._id],
  junior: [],
  senior: [userTestCourse2._id],
  distribution_ids: [
    testDistributionTot._id,
    testDistributionCS._id,
    testDistributionElec._id,
    testDistributionHumanities._id,
    testDistributionMath._id,
    testDistributionNS._id,
  ],
};

export const testUser: User = {
  _id: "mliu78",
  firstName: "Matthew",
  lastName: "Liu",
  email: "mliu78@jhu.edu",
  affiliation: "STUDENT",
  grade: "AE UG Sophomore",
  school: "Whiting School of Engineering",
  plan_ids: ["na"],
};

export const testMajorDistributions = [
  testDistributionTot,
  testDistributionElec,
  testDistributionCS,
  testDistributionMath,
  testDistributionNS,
  testDistributionHumanities,
];

export const testMajorCSOld: Major = {
  name: "B.S. in Computer Science (old)",
  generalDistributions: [
    { name: "Total Credits", required: 126 },
    { name: "Basic Sciences (N)", required: 16 },
    { name: "General Electives", required: 26 },
    { name: "Humanities/Social Sciences (H)(S)", required: 18 },
    { name: "Mathematics (Q)", required: 24 },
    { name: "Writing Intensive (WI)", required: 2 },
    { name: "Computer Science", required: 42 },
  ],
  fineRequirements: [],
  restrictions: [],
};

export const testMajorCSNew: Major = {
  name: "B.S. in Computer Science (new)",
  generalDistributions: [
    { name: "Total Credits", required: 120 },
    { name: "Basic Sciences (N)", required: 8 },
    { name: "General Electives", required: 120 - 8 - 18 - 16 - 40 },
    { name: "Humanities/Social Sciences (H)(S)", required: 18 },
    { name: "Mathematics (Q)", required: 16 },
    { name: "Writing Intensive (WI)", required: 2 },
    { name: "Computer Science", required: 40 },
  ],
  fineRequirements: [],
  restrictions: [],
};
