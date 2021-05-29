//if byCredit == false, that means the required field is counted by course amount(i.e. number of courses)

import { Major } from "../../commonTypes";

//cs other courses: https://www.cs.jhu.edu/undergraduate-studies/academics/cs-other-courses/
const bsCS: Major = {
  name: "B.S. Computer Science",
  department: "EN Computer Science",
  distributions: [
    {
      name: "Total",
      required: 120,
      filter: {},
    },
    {
      name: "Computer Science",
      required: 40,
      filter: {
        number: /EN\.600\.[0-9]{3}|EN\.601\.[0-9]{3}|EN\.500\.11[2-4]/g
          .toString()
          .toString(), //"EN.601.***" or "EN.500.11*"
      },
    },
    {
      name: "Math",
      required: 16,
      filter: {
        department: /AS Mathematics|EN Applied Mathematics & Statistics/g
          .toString()
          .toString(),
        exception: {
          number: /EN\.553\.171/g.toString().toString(), //discrete math
        },
      },
    },
    {
      name: "Liberal Arts",
      required: 18,
      filter: {
        area: /H|S/g.toString().toString(),
      },
    },
    {
      name: "Electives",
      required: 120 - 40 - 16 - 8 - 18,
      filter: {},
    },
    {
      name: "Basic Science",
      required: 16,
      filter: {
        area: /N/g.toString().toString(), //"General Physics", "General Biology", "Introductory Chemistry"]
      },
      description:
        "Students must take two semesters of core science courses (any combination of Physics, Chemistry, Biology), with their associated labs, totaling at least 8 credits. These courses should be taken for a grade. However, AP credit is an acceptable substitute for these courses and labs.",
    },
  ],
  requirements: [
    {
      name: "Computer Science Upper",
      required: 16,
      byCredit: true,
      filter: {
        number: /EN\.601\.[3-9]{1}[0-9]{2}/g.toString().toString(), //"EN.601.3/4/5/6/7/8/9**"
      },
    },
    {
      name: "Computer Science Core",
      required: 6,
      byCredit: false,
      filter: {
        number:
          /EN\.500\.11[2-4]|EN\.601\.220|EN\.601\.226|EN\.601\.229|EN\.601\.230|EN\.601\.443|/g
            .toString()
            .toString(),
      },
    },
    {
      name: "Lab Sciences",
      required: 8,
      byCredit: false,
      filter: {
        title: /General Physics|General Biology|Introductory Chemistry/g
          .toString()
          .toString(), //"General Physics", "General Biology", "Introductory Chemistry"]
      },
      description:
        "Students must take two semesters of core science courses (any combination of Physics, Chemistry, Biology), with their associated labs, totaling at least 8 credits. These courses should be taken for a grade. However, AP credit is an acceptable substitute for these courses and labs.",
    },
    {
      name: "Math Requirement",
      required: 3,
      byCredit: false,
      filter: {
        number: /AS\.110\.10[8-9]|AS\.553\.3[0-9]{2}/g.toString().toString(), //"AS.110.108" or "AS.110.109" or "AS.553.3**"
      },
    },
    {
      name: "Writing Intensive",
      required: 2,
      byCredit: false,
      filter: {
        wi: true,
      },
    },
    {
      name: "Team",
      required: 1,
      byCredit: false,
      filter: {
        tags: ["CSCI-TEAM"],
      },
    },
    {
      name: "Areas",
      required: 2,
      byCredit: false,
      filter: {
        tags: ["CSCI-SYST", "CSCI-SOFT", "CSCI-APPL", "CSCI-RSNG"], //need refinement
      },
    },
    {
      name: "Ethics",
      required: 1,
      byCredit: false,
      filter: {
        tags: ["CSCI-ETHS"],
        number: /EN\.601\.104|EN\.660\.400|EN\.660\.406/g.toString().toString(), //"601.104" or "660.400" or "660.406"
      },
    },
  ],
};

//https://engineering.jhu.edu/chembe/undergraduate-studies/undergraduate-degree-program/requirements/
const bsChemBE: Major = {
  name: "BS Chemical and Biomolecular Engingeering",
  department: "EN Chemical & Biomolecular Engineering",
  distributions: [
    {
      name: "Total",
      required: 128,
      filter: {},
    },
    {
      name: "Basic Science",
      required: 17,
      filter: {
        title:
          /General Physics|General Biology|Introductory Chemistry/g.toString(), //"General Physics", "General Biology", "Introductory Chemistry"]
      },
    },
    {
      name: "Mathematics",
      required: 16,
      filter: {
        department:
          /AS Mathematics|EN Applied Mathematics & Statistics/g.toString(),
      },
    },
    {
      name: "Advanced Chemistry/Biology",
      required: 16,
      filter: {
        number:
          /(?=.*EN\.030\.205)(?=.*EN\.020\.305)(?=.*EN\.030\.307)(?=.*EN\.030\.452).*/g.toString(),
      },
    },
    {
      name: "Humanities and Social Sciences",
      required: 18,
      filter: {
        area: /H|S/g.toString(),
      },
    },
    {
      name: "Chemical Engineering Core",
      required: 39,
      filter: {
        number:
          /(?=.*EN\.540\.101)(?=.*EN\.540\.202)(?=.*EN\.540\.203)(?=.*EN\.540\.301)(?=.*EN\.540\.303)(?=.*EN\.540\.304)(?=.*EN\.540\.305)(?=.*EN\.540\.306)(?=.*EN\.540\.311)(?=.*EN\.540\.314)(?=.*EN\.540\.315)(?=.*EN\.540\.409)(?=.*EN\.540\.490).*/g.toString(),
      },
    },
    {
      name: "Engineering Elective Courses",
      required: 6,
      filter: {
        area: /E/g.toString(),
      },
    },
    {
      name: "Undesignated Electives",
      required: 13,
      filter: {},
    },
  ],
  requirements: [
    {
      name: "Basic Science",
      required: 7,
      byCredit: false,
      filter: {
        number:
          /(?=.*EN\.030\.101)(?=.*EN\.030\.102)(?=.*EN\.030\.105)(?=.*EN\.030\.106)(?=.*EN\.171\.101)(?=.*EN\.171\.102)(?=.*EN\.173\.111).*/g.toString(),
      },
    },
    {
      name: "Mathematics",
      required: 4,
      byCredit: false,
      filter: {
        number:
          /(?=.*EN\.110\.108)(?=.*EN\.110\.109)(?=.*EN\.110\.202)(?=.*EN\.110\.302).*/g.toString(),
      },
    },
    {
      name: "Advanced Chemistry/Biology",
      required: 4,
      byCredit: false,
      filter: {
        number:
          /(?=.*EN\.030\.205)(?=.*EN\.020\.305)(?=.*EN\.030\.307)(?=.*EN\.030\.452).*/g.toString(),
      },
    },
    // FIX must be six courses that are at least 3 credits each
    {
      name: "Humanities and Social Sciences",
      required: 1,
      byCredit: false,
      filter: {
        number: /EN\.661\.315/g.toString(),
      },
    },
  ],
};

//https://e-catalogue.jhu.edu/engineering/full-time-residential-programs/degree-programs/applied-mathematics-statistics/applied-mathematics-statistics-bs/#requirementstext
const bsAMS: Major = {
  name: "Applied Mathematics and Statistics, Bachelor of Science",
  department: "EN Computer Science",
  distributions: [
    {
      name: "Total",
      required: 120,
      filter: {},
    },
  ],
  requirements: [
    {
      name: "Calculus I, II, and III",
      required: 3,
      byCredit: false,
      filter: {
        number:
          /(?=.*AS\.110\.108)(?=.*AS\.110\.109|AS\.110\.113)(?=.*AS\.110\.202|AS\.110\.211).*/g.toString(),
      },
    },
    {
      name: "Linear Algebra",
      required: 1,
      byCredit: false,
      filter: {
        number: /AS\.110\.201|AS\.110\.212|EN\.553\.291/g.toString(),
      },
    },
    {
      name: "Differencial Equations",
      required: 1,
      byCredit: false,
      filter: {
        number: /AS\.110\.302|EN\.553\.391|EN\.553\.473/g.toString(),
      },
    },
    {
      name: "Computer Languages and Programming",
      required: 1,
      byCredit: false,
      filter: {
        //check if the notation does what you want
        number:
          /EN\.500\.11[2-4]|AS\.250\.205|EN\.553\.281|EN\.580\.244|EN\.601\.220/g.toString(),
      },
    },
    {
      name: "Numerical Linear Algebra",
      required: 1,
      byCredit: false,
      filter: {
        number: /EN\.553\.385/g.toString(),
      },
    },
    {
      name: "Discrete Mathematics",
      required: 2,
      byCredit: false,
      filter: {
        number:
          /EN\.553\.171|EN\.553\.172|EN\.553\.371|EN\.553\.471|EN\.553\.472/g.toString(),
      },
    },
    {
      name: "Probability and Statistics",
      required: 2,
      byCredit: false,
      filter: {
        number:
          /(?=.*EN\.553\.420)(?=.*EN\.553\.430|EN\.553\.431).*/g.toString(),
      },
    },
    {
      name: "Optimization",
      required: 1,
      byCredit: false,
      filter: {
        number: /EN\.553\.361/g.toString(),
      },
    },
    //take a look at the catagories
    {
      name: "Area of Focus",
      required: 2,
      byCredit: false,
      sameCategory: true,
      filter: {
        number: [
          /AS\.110\.405|AS\.110\.445|EN\.553\.426|EN\.553\.427|EN\.553\.433|EN\.553\.492/g.toString(),
          /AS\.110\.445|EN\.553\.400|EN\.553\.413|EN\.553\.414|EN\.553\.416|EN\.553\.417|EN\.553\.432|EN\.553\.433|EN\.553\.492/g.toString(),
          /AS\.110\.445|EN\.553\.400|EN\.553\.413|EN\.553\.414|EN\.553\.416|EN\.553\.417|EN\.553\.432|EN\.553\.433|EN\.553\.436|EN\.553\.439|EN\.553\.450/g.toString(),
          /EN\.553\.362|EN\.553\.400|EN\.553\.453|EN\.553\.463|EN\.553\.465|EN\.553\.467/g.toString(),
          /AS\.110\.401|EN\.553\.371|EN\.553\.463|EN\.553\.471|EN\.553\.472/g.toString(),
          /EN\.553\.427|EN\.553\.428|EN\.553\.441|EN\.553\.442|EN\.553\.444|EN\.553\.445|EN\.553\.447|EN\.553\.448|EN\.553\.449|EN\.553\.488/g.toString(),
          /(?=.*EN\.553\.481)(?=.*AS\.110\.445|EN\.553\.433|EN\.553\.467|EN\.553\.493).*/g.toString(),
        ],
      },
    },
    {
      name: "Scientific Computing",
      required: 1,
      byCredit: false,
      filter: {
        number:
          /AS\.110\.445|EN\.553\.400|EN\.553\.413|EN\.553\.416|EN\.553\.417|EN\.553\.432|EN\.553\.433|EN\.553\.436|EN\.553\.443|EN\.553\.450|EN\.553\.463|EN\.553\.467|EN\.553\.481|EN\.553\.488|EN\.553\.493|EN\.553\.494|EN\.601\.433|EN\.601\.475|EN\.601\.482/g.toString(),
      },
    },
    {
      name: "Natural Sciences",
      required: 12,
      byCredit: true,
      filter: {
        area: /N/g.toString(),
      },
    },
    {
      name: "Quantitative Studies",
      required: 40,
      byCredit: true,
      filter: {
        area: /Q/g.toString(),
      },
    },
  ],
};

//https://econ.jhu.edu/undergraduate/major-requirements/
const baEconomics: Major = {
  name: "B.A. Economics",
  department: "AS Economics",
  distributions: [
    {
      name: "Total",
      required: 120,
      filter: {},
    },
  ],
  requirements: [
    {
      name: "Elements of Macro and Micro",
      required: 2,
      byCredit: false,
      filter: {
        number: /(?=.*AS\.180\.101)(?=.*AS\.180\.102).*/g.toString(),
      },
    },
    {
      name: "Intermediate Micro and Macro",
      required: 2,
      byCredit: false,
      filter: {
        number: /(?=.*AS\.180\.301)(?=.*AS\.180\.401)|AS\.180\.302/g.toString(),
      },
    },
    {
      name: "Economics",
      required: 1,
      byCredit: false,
      filter: {
        number: /AS\.180\.334|AS\.180\.434/g.toString(),
      },
    },
    {
      //fix
      name: "Three elective courses at either the 200 or 300 level",
      required: 3,
      byCredit: false,
      filter: {
        number: /AS/g.toString(),
      },
    },
    {
      //fix
      name: "Two elective courses at the 300 level",
      required: 2,
      byCredit: false,
      filter: {
        tags: [],
      },
    },
    {
      name: "One semester of calculus",
      required: 1,
      byCredit: false,
      filter: {
        number: /AS\.110\.106|AS\.110\.108|AS\.110\.113/g.toString(),
      },
    },
    {
      name: "One semester of statistics",
      required: 1,
      byCredit: false,
      filter: {
        number:
          /AS\.280\.345|EN\.553\.111|EN\.553\.112|EN\.553\.113|EN\.553\.211|EN\.553\.310|EN\.553\.311|EN\.553\.420|EN\.553\.430|EN\.553\.435|EN\.560\.348|EN\.560\.435/g.toString(),
      },
    },
  ],
};

//https://www.bme.jhu.edu/academics/undergraduate/undergraduate-degree-requirements/
const bsBME: Major = {
  name: "B.A. Pyschological and Brain Studies",
  department: "EN Computer Science",
  distributions: [
    {
      name: "Total",
      required: 120,
      filter: {},
    },
    {
      name: "Basic Sciences",
      required: 18,
      filter: {
        title:
          /General Physics|General Biology|Introductory Chemistry/g.toString(), //"General Physics", "General Biology", "Introductory Chemistry"]
      },
    },
    {
      name: "Mathematics",
      required: 20,
      filter: {
        department:
          /AS Mathematics|EN Applied Mathematics & Statistics/g.toString(),
        exception: {
          number: /EN\.553\.171/g.toString(), //discrete math
        },
      },
    },
    {
      name: "Humanities and Social Sciences",
      required: 18,
      filter: {
        area: /H|S/g.toString(),
      },
    },
    {
      name: "Biomedical Core Knowledge",
      required: 33,
      filter: {},
    },
    {
      name: "Focus Area",
      required: 21,
      filter: {},
    },
    {
      name: "Design",
      required: 6,
      filter: {},
    },
    {
      name: "Computer Programming",
      required: 3,
      filter: {
        number:
          /EN\.600\.[0-9]{3}|EN\.601\.[0-9]{3}|EN\.500\.11[2-4]/g.toString(), //"EN.601.***" or "EN.500.11*"
      },
    },
    {
      name: "Free Electives",
      required: 10,
      filter: {},
    },
  ],
  requirements: [],
};

//https://krieger.jhu.edu/internationalstudies/undergraduate/requirements/
const baIS = {
  name: "B.A. International Studies",
  department: "AS International Studies",
  distributions: [
    {
      name: "Total",
      required: 120,
      filter: {},
    },
    {
      name: "Political Science Requirements",
      required: 18,
      filter: {
        tags: /INST-IR|INST-CP|INST-AP|INST-PT/g.toString(),
        //also try to catch
      },
    },
  ],
  requirments: [],
};

export const allMajors: Major[] = [bsCS, bsChemBE, bsAMS, baEconomics, bsBME];
