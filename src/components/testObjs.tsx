import { Course, User, Distribution, Plan, UserCourse } from "./commonTypes";

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
  terms: ["Fall", "Spring"],
  school: "Whiting School of Engineering",
  department: "CS",
  credits: "3",
  wi: false,
  bio: "Lorem ipsum. This is a test course.",
  tags: ["TEST-COURSE"],
  preReq: [],
};

export const testCourse2: Course = {
  title: "Test course 2",
  number: "EN.420.4205",
  areas: "H",
  terms: ["Spring"],
  school: "KSAS",
  department: "Biology",
  credits: "2",
  wi: true,
  bio: "Lorem ipsum. This is another test course.",
  tags: ["TEST-COURSE"],
  preReq: [testCourse1],
};

export const userTestCourse1: UserCourse = {
  _id: "userTestCourse1",
  user_id: "mliu78",
  plan_id: "testPlan1",
  title: testCourse1.title,
  term: "Fall",
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
  term: "Spring",
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
  plan_ids: [
    "606227a6eaa338000422e874",
    "60622885eaa338000422e875",
    "606228ebeaa338000422e876",
    "6062293beaa338000422e877",
    "6062299feaa338000422e878",
    "606229bbeaa338000422e879",
    "606229c2eaa338000422e87a",
    "60622adceaa338000422e87b",
    "60622b95eaa338000422e87c",
    "60622b9ceaa338000422e87d",
  ],
};

export const testMajorDistributions = [
  testDistributionTot,
  testDistributionElec,
  testDistributionCS,
  testDistributionMath,
  testDistributionNS,
  testDistributionHumanities,
];
