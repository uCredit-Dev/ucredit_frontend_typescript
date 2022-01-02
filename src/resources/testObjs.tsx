import {
  // Course,
  User,
  // Distribution,
  // Plan,
  // UserCourse,
  // Major,
  SISRetrievedCourse,
} from './commonTypes';

// IMPORTANT: All test objs may be inaccurate with new types

// export const testDistributionTot: Distribution = {
//   _id: "testDistribution0",
//   name: "Total Credits",
//   required: 127,
//   planned: 64,
//   current: 56,
//   satisfied: false,
//   courses: [],
//   filter: {},
//   user_id: "testUser1",
//   plan_id: "testPlan1",
// };

// export const testDistributionElec: Distribution = {
//   _id: "testDistribution3",
//   name: "General Electives",
//   required: 28,
//   planned: 18,
//   current: 10,
//   satisfied: false,
//   courses: [],
//   filter: {},
//   user_id: "testUser1",
//   plan_id: "testPlan1",
// };

// export const testDistributionCS: Distribution = {
//   _id: "testDistribution1",
//   name: "Computer Science",
//   required: 24,
//   planned: 18,
//   current: 15,
//   satisfied: false,
//   courses: [],
//   filter: {},
//   user_id: "testUser1",
//   plan_id: "testPlan1",
// };

// export const testDistributionMath: Distribution = {
//   _id: "testDistribution2",
//   name: "Mathematics",
//   required: 24,
//   planned: 12,
//   current: 8,
//   satisfied: false,
//   courses: [],
//   filter: {},
//   user_id: "testUser1",
//   plan_id: "testPlan1",
// };

// export const testDistributionNS: Distribution = {
//   _id: "testDistribution4",
//   name: "Natural Sciences",
//   required: 18,
//   planned: 12,
//   current: 8,
//   satisfied: false,
//   courses: [],
//   filter: {},
//   user_id: "testUser1",
//   plan_id: "testPlan1",
// };

// export const testDistributionHumanities: Distribution = {
//   _id: "testDistribution5",
//   name: "Humanities",
//   required: 16,
//   planned: 12,
//   current: 8,
//   satisfied: false,
//   courses: [],
//   filter: {},
//   user_id: "testUser1",
//   plan_id: "testPlan1",
// };

// export const testCourse1: Course = {
//   title: "Test course 1",
//   number: "EN.420.4204",
//   areas: "NS",
//   terms: ["Fall", "Spring"],
//   school: "Whiting School of Engineering",
//   department: "CS",
//   credits: "3",
//   wi: false,
//   bio: "Lorem ipsum. This is a test course.",
//   tags: ["TEST-COURSE"],
//   preReq: [],
//   restrictions: [],
// };

// export const testCourse2: Course = {
//   title: "Test course 2",
//   number: "EN.420.4205",
//   areas: "H",
//   terms: ["Spring"],
//   school: "KSAS",
//   department: "Biology",
//   credits: "2",
//   wi: true,
//   bio: "Lorem ipsum. This is another test course.",
//   tags: ["TEST-COURSE"],
//   preReq: [testCourse1],
//   restrictions: [],
// };

// export const userTestCourse1: UserCourse = {
//   _id: "userTestCourse1",
//   user_id: "mliu78",
//   plan_id: "testPlan1",
//   title: testCourse1.title,
//   term: "Fall",
//   number: testCourse1.number,
//   department: testCourse1.department,
//   tags: testCourse1.tags,
//   area: "N",
//   credits: parseInt(testCourse1.credits),
//   wi: testCourse1.wi,
//   taken: false,
//   ratings: [],
//   year: "Freshman",
//   distribution_ids: [testDistributionNS._id, testDistributionTot._id],
// };

// export const userTestCourse2: UserCourse = {
//   _id: "userTestCourse2",
//   title: testCourse2.title,
//   term: "Spring",
//   number: testCourse2.number,
//   department: testCourse2.department,
//   tags: testCourse2.tags,
//   area: "H",
//   credits: parseInt(testCourse2.credits),
//   wi: testCourse2.wi,
//   taken: false,
//   ratings: [],
//   plan_id: "testPlan1",
//   distribution_ids: [testDistributionHumanities._id, testDistributionTot._id],
//   user_id: "mliu78",
//   year: "Sophomore",
// };

// export const testPlan1: Plan = {
//   _id: "testPlan1",
//   name: "testPlan1",
//   user_id: "mliu78",
//   majors: ["Computer Science"],
//   freshman: [userTestCourse1._id],
//   sophomore: [],
//   junior: [userTestCourse2._id],
//   senior: [],
//   distribution_ids: [
//     testDistributionTot._id,
//     testDistributionCS._id,
//     testDistributionElec._id,
//     testDistributionHumanities._id,
//     testDistributionMath._id,
//     testDistributionNS._id,
//   ],
// };

// export const testPlan2: Plan = {
//   _id: "testPlan2",
//   name: "testPlan2",
//   user_id: "mliu78",
//   majors: ["Computer Science"],
//   freshman: [],
//   sophomore: [userTestCourse1._id],
//   junior: [],
//   senior: [userTestCourse2._id],
//   distribution_ids: [
//     testDistributionTot._id,
//     testDistributionCS._id,
//     testDistributionElec._id,
//     testDistributionHumanities._id,
//     testDistributionMath._id,
//     testDistributionNS._id,
//   ],
// };

export const testUser: User = {
  _id: 'mliu78',
  name: 'Matthew Liu',
  email: 'mliu78@jhu.edu',
  affiliation: 'STUDENT',
  grade: 'AE UG Sophomore',
  school: 'Whiting School of Engineering',
  plan_ids: ['na'],
};

// export const testMajorDistributions = [
//   testDistributionTot,
//   testDistributionElec,
//   testDistributionCS,
//   testDistributionMath,
//   testDistributionNS,
//   testDistributionHumanities,
// ];

// export const testMajorCSOld: Major = {
//   name: "B.S. in Computer Science (old)",
//   generalDistributions: [
//     { name: "Total Credits", required: 126 },
//     { name: "Basic Sciences (N)", required: 16 },
//     { name: "General Electives", required: 26 },
//     { name: "Humanities/Social Sciences (H)(S)", required: 18 },
//     { name: "Mathematics (Q)", required: 24 },
//     { name: "Writing Intensive (WI)", required: 2 },
//     { name: "Computer Science", required: 42 },
//   ],
//   fineRequirements: [],
//   restrictions: [],
// };

export const testMajorCSNew = {
  name: 'B.S. Computer Science',
  department: 'EN Computer Science',
  distributions: [
    {
      name: 'Total',
      required: 120,
      filter: {},
    },
    {
      name: 'Computer Science',
      required: 40,
      filter: {
        number:
          /EN\.600\.[0-9]{3}|EN\.601\.[0-9]{3}|EN\.500\.11[2-4]/g.toString(), //"EN.601.***" or "EN.500.11*"
      },
    },
    {
      name: 'Math',
      required: 16,
      filter: {
        department:
          /AS Mathematics|EN Applied Mathematics & Statistics/g.toString(),
        exception: {
          number: /EN\.553\.171/g.toString(), //discrete math
        },
      },
    },
    {
      name: 'Liberal Arts',
      required: 18,
      filter: {
        area: /H|S/g.toString(),
      },
    },
    {
      name: 'Electives',
      required: 120 - 40 - 16 - 8 - 18,
      filter: {},
    },
    {
      name: 'Basic Science',
      required: 16,
      filter: {
        area: /N/g.toString(), //"General Physics", "General Biology", "Introductory Chemistry"]
      },
      description:
        'Students must take two semesters of core science courses (any combination of Physics, Chemistry, Biology), with their associated labs, totaling at least 8 credits. These courses should be taken for a grade. However, AP credit is an acceptable substitute for these courses and labs.',
    },
  ],
  requirements: [
    {
      name: 'Computer Science Upper',
      required: 16,
      byCredit: true,
      filter: {
        number: /EN\.601\.[3-9]{1}[0-9]{2}/g.toString(), //"EN.601.3/4/5/6/7/8/9**"
      },
    },
    {
      name: 'Computer Science Core',
      required: 6,
      byCredit: false,
      filter: {
        number:
          /EN\.500\.11[2-4]|EN\.601\.220|EN\.601\.226|EN\.601\.229|EN\.601\.230|EN\.601\.443|/g.toString(),
      },
    },
    {
      name: 'Lab Sciences',
      required: 8,
      byCredit: false,
      filter: {
        title:
          /General Physics|General Biology|Introductory Chemistry/g.toString(), //"General Physics", "General Biology", "Introductory Chemistry"]
      },
      description:
        'Students must take two semesters of core science courses (any combination of Physics, Chemistry, Biology), with their associated labs, totaling at least 8 credits. These courses should be taken for a grade. However, AP credit is an acceptable substitute for these courses and labs.',
    },
    {
      name: 'Math Requirement',
      required: 3,
      byCredit: false,
      filter: {
        number: /AS\.110\.10[8-9]|AS\.553\.3[0-9]{2}/g.toString(), //"AS.110.108" or "AS.110.109" or "AS.553.3**"
      },
    },
    {
      name: 'Writing Intensive',
      required: 2,
      byCredit: false,
      filter: {
        wi: true,
      },
    },
    {
      name: 'Team',
      required: 1,
      byCredit: false,
      filter: {
        tags: ['CSCI-TEAM'],
      },
    },
    {
      name: 'Areas',
      required: 2,
      byCredit: false,
      filter: {
        tags: ['CSCI-SYST', 'CSCI-SOFT', 'CSCI-APPL', 'CSCI-RSNG'], //need refinement
      },
    },
    {
      name: 'Ethics',
      required: 1,
      byCredit: false,
      filter: {
        tags: ['CSCI-ETHS'],
        number: /EN\.601\.104|EN\.660\.400|EN\.660\.406/g.toString(), //"601.104" or "660.400" or "660.406"
      },
    },
  ],
};

export const testMajorArray = [testMajorCSNew, testMajorCSNew, testMajorCSNew];

// : Major = {
//   name: "B.S. in Computer Science (new)",
//   generalDistributions: [
//     { name: "Total Credits", required: 120 },
//     { name: "Basic Sciences (N)", required: 8 },
//     { name: "General Electives", required: 120 - 8 - 18 - 16 - 40 },
//     { name: "Humanities/Social Sciences (H)(S)", required: 18 },
//     { name: "Mathematics (Q)", required: 16 },
//     { name: "Writing Intensive (WI)", required: 2 },
//     { name: "Computer Science", required: 40 },
//   ],
//   fineRequirements: [],
//   restrictions: [],
// };

export const testSISRetrievedCourse: SISRetrievedCourse = {
  title: 'test',
  number: 'testCourse',
  terms: ['Fall 2019, Fall 2020, Fall 2021'],
  versions: [
    {
      areas: 'NS',
      term: 'Fall 2019',
      school: 'Test school',
      department: 'EN CS',
      credits: '3',
      wi: false,
      bio: 'This is a test course',
      level: 'lower',
      tags: ['CSCI-SOFT'],
      preReq: [],
      coReq: [],
      restrictions: [],
    },
    {
      areas: 'E',
      term: 'Fall 2020',
      school: 'Test school',
      department: 'EN CS',
      credits: '3',
      wi: false,
      bio: 'This is a test course',
      level: 'lower',
      tags: ['CSCI-SOFT'],
      preReq: [],
      coReq: [],
      restrictions: [],
    },
    {
      areas: 'H',
      term: 'Fall 2021',
      school: 'Test school',
      department: 'EN CS',
      credits: '3',
      wi: false,
      bio: 'This is a test course',
      level: 'lower',
      tags: ['CSCI-SOFT'],
      preReq: [],
      coReq: [],
      restrictions: [],
    },
  ],
};
