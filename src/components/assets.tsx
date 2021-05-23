import { Course } from "./commonTypes";
import { User } from "./commonTypes";

export const guestUser: User = {
  _id: "guestUser",
  name: "Guest User",
  email: "none",
  affiliation: "none",
  school: "none",
  grade: "none",
  plan_ids: [],
};

interface DistributionColors {
  total: string[];
  naturalSciences: string[];
  humanities: string[];
  computerScience: string[];
  mathematics: string[];
  general: string[];
}

const DistributionColorsArray: DistributionColors = {
  total: ["#001B87", "#30E7ED", "#0058B3"],
  naturalSciences: ["#26D701", "#95F985", "#4DED30"],
  humanities: ["#E56AB3", "#FCBCD7", "#EF87BE"],
  computerScience: ["#DC1C13", "#F1959B", "#EA4C46"],
  mathematics: ["orange", "yellow", "gold"],
  general: ["#00A6D7", "#86FAF2", "#30E7ED"],
};

export const getColors = function (distribution: string): string[] {
  if (distribution === "Total Credits") {
    return DistributionColorsArray.total;
  } else if (distribution === "Natural Sciences" || distribution === "N") {
    return DistributionColorsArray.naturalSciences;
  } else if (distribution === "Computer Science") {
    return DistributionColorsArray.computerScience;
  } else if (distribution === "Humanities" || distribution === "H") {
    return DistributionColorsArray.humanities;
  } else if (distribution === "Mathematics" || distribution === "Q") {
    return DistributionColorsArray.mathematics;
  } else if (distribution === "General Electives") {
    return ["#3168AF", "#3168AF", "#3168AF"];
  } else {
    return ["#3168AF", "#3168AF", "#3168AF"];
  }
};

export const getCourses = (courseIds: string[]): Course[] => {
  const retrieved: Course[] = [];
  courseIds.forEach((id) => {
    // retrieve courses
    // if (id === testCourseFall._id) {
    //   retrieved.push(testCourseFall);
    // } else if (id === testCourseSpring._id) {
    //   retrieved.push(testCourseSpring);
    // }
  });

  return retrieved;
};

// On SIS, scrape the majors using the console, check Notion for more info
export const AS_majors = [
  "AS Agora Institute",
  "AS Anthropology",
  "AS Archaeology",
  "AS Art",
  "AS Behavioral Biology",
  "AS Biology",
  "AS Biophysics",
  "AS Center for Africana Studies",
  "AS Center for Language Education",
  "AS Chemistry",
  "AS Classics",
  "AS Cognitive Science",
  "AS Comparative Thought and Literature",
  "AS Dean's Teaching Fellowship Courses",
  "AS Earth & Planetary Sciences",
  "AS East Asian Studies",
  "AS Economics",
  "AS English",
  "AS Film and Media Studies",
  "AS First Year Seminars",
  "AS Freshman Seminars",
  "AS German & Romance Languages & Literatures",
  "AS History",
  "AS History of Art",
  "AS History of Science, Medicine, and Technology",
  "AS Humanities Center",
  "AS Interdepartmental",
  "AS International Studies",
  "AS Islamic Studies",
  "AS Jewish Studies Program",
  "AS Mathematics",
  "AS Medical Tutorials",
  "AS Medicine, Science and the Humanities",
  "AS Military Science",
  "AS Modern Languages and Literatures",
  "AS Music",
  "AS Near Eastern Studies",
  "AS Neuroscience",
  "AS Non-Departmental",
  "AS Philosophy",
  "AS Physics & Astronomy",
  "AS Political Science",
  "AS Program in Latin American Studies",
  "AS Program in Museums and Society",
  "AS Psychological & Brain Sciences",
  "AS Public Health Studies",
  "AS Public Policy",
  "AS Religion",
  "AS Reserved Registrar",
  "AS Sociology",
  "AS Study of Women, Gender, & Sexuality",
  "AS Summer and Intersession Programs",
  "AS Theatre Arts & Studies",
  "AS Writing Seminars",
];
export const WSE_majors = [
  "EN Applied Mathematics & Statistics",
  "EN Biomedical Engineering",
  "EN Center for Leadership Education",
  "EN Chemical & Biomolecular Engineering",
  "EN Civil Engineering",
  "EN Computer Science",
  "EN Doctor of Engineering",
  "EN Electrical & Computer Engineering",
  "EN Engineering Management",
  "EN Entrepreneurship and Management",
  "EN Environmental Health and Engineering",
  "EN General Engineering",
  "EN Geography & Environmental Engineering",
  "EN Information Security Institute",
  "EN Institute for NanoBio Technology",
  "EN Materials Science & Engineering",
  "EN Mechanical Engineering",
  "EN Professional Communication",
  "EN Reserved Registrar",
  "EN Robotics",
];
export const all_majors = [...AS_majors, ...WSE_majors];
export const course_tags = [
  "AFRS-AFAMER",
  "AFRS-DIASPO",
  "AFRS-URBAN",
  "ARCH-ARCH",
  "ARCH-RELATE",
  "BEHB-BIOBEH",
  "BEHB-SOCSCI",
  "BIOL-UL",
  "BME-BDS",
  "BME-CM",
  "BMED-BDS",
  "BMED–BDS",
  "BMED–BII",
  "BMED-CB",
  "BMED-CM",
  "BMED–CM",
  "BMED-CTE",
  "BMED-DSGN",
  "BMED-GSB",
  "BMED–GSB",
  "BMED-IMD",
  "BMED-IMG",
  "BMED-IMMU",
  "BMED-NE",
  "BMED–NE",
  "BMED–RIE",
  "BMED-SB",
  "BMED-SIMN",
  "BMED-TCTE",
  "BME-GSB",
  "BME-RIE",
  "CHBE-ACBE",
  "CHBE-BIOE",
  "CHBE-ENEL",
  "CHBE-IN",
  "CLE-ENTR",
  "CLE-LEAD",
  "CLE-MCOMM",
  "CLE-MMGMT",
  "COGS-COGPSY",
  "COGS-COMPCG",
  "COGS-LING",
  "COGS-NEURO",
  "COGS-PHLMND",
  "CSC-CE",
  "CSCI-APPL",
  "CSCI-ETHS",
  "CSCI-OTHER",
  "CSCI-RSNG",
  "CSCI-SOFT",
  "CSCI-SYST",
  "CSCI-TEAM",
  "CSCI-THRY",
  "ENGL-GLOBAL",
  "ENGL-LEC",
  "ENGL-PR1800",
  "ENVS-MAJOR",
  "ENVS-MINOR",
  "FILM-CRITST",
  "FILM-PROD",
  "FILM-SCRWRT",
  "GECS-SCI",
  "GECS-SOCSCI",
  "GRAD-CAMS",
  "GRLL-ENGL",
  "GRLL-FREN",
  "GRLL-GERM",
  "GRLL-ITAL",
  "GRLL-SPAN",
  "HART-ANC",
  "HART-MED",
  "HART-MODERN",
  "HART-NW",
  "HART-RENBAR",
  "HART-RENEM",
  "HART-THRY",
  "HIST-AFRICA",
  "HIST-ASIA",
  "HIST-EUROPE",
  "HIST-LATAM",
  "HIST-MIDEST",
  "HIST-US",
  "INST-AP",
  "INST-CP",
  "INST-ECON",
  "INST-GLOBAL",
  "INST-IR",
  "INST-NWHIST",
  "INST-PT",
  "ISLM-ISLMST",
  "MLL-ENGL",
  "MLL-FREN",
  "MLL-GERM",
  "MSCH-HUM",
  "NEAS-ARTARC",
  "NEAS-HISCUL",
  "NEUR-CG",
  "NEUR-CM",
  "NEUR-CP",
  "NEUR-ST",
  "PHIL-ANCIEN",
  "PHIL-BIOETH",
  "PHIL-ETHICS",
  "PHIL-LOGSCI",
  "PHIL-MIND",
  "PHIL-MODERN",
  "PHIL-SEM",
  "PMUS-INTRO",
  "PMUS-PRAC",
  "POLI-AP",
  "POLI-CP",
  "POLI-IR",
  "POLI-PT",
  "POLI-RSCH",
  "PSYC-SEM",
  "SPOL-UL",
  "THEA-DRAMA",
  "WRIT-FICT",
  "WRIT-GNRL",
  "WRIT-POET",
];
