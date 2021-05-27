import { 
  Course,
  User,
  Plan,
  YearType,
  SemesterType,
  UserCourse,
} from "./commonTypes";
import axios from "axios";

export const api = "https://ucredit-api.herokuapp.com/api";

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

  // Parse preReq array to determine which are prereqs and which are coreq and other info. Actual Prereqs are denoted by isNegative = "N"
  // Returns non isNegative prereqs
  export const filterNNegatives = (inspected: Course | "None", preReqs: any[]): any[] => {
    if (inspected !== "None") {
      preReqs = inspected.preReq.filter((section: any) => {
        return section.IsNegative === "N";
      });
    }
    return preReqs;
  };

  // Takes in a unparsed array of preReqs.
  // Processes by checking if they're satisfied and turning them into jsx elements.
  export const processPrereqs = async (preReqs: any[]): Promise<prereqCourses> => {
    // Regex used to get an array of course numbers.
    const regex: RegExp = /[A-Z]{2}\.[0-9]{3}\.[0-9]{3}/g;
    const forwardSlashRegex: RegExp =
      /[A-Z]{2}\.[0-9]{3}\.[0-9]{3}\/[A-Z]{2}\.[0-9]{3}\.[0-9]{3}/g;

    let description: string = preReqs[0].Description;
    let expr: any = preReqs[0].Expression;

    // All courses that match the parttern of 'COURSE/COURSE' in description
    let forwardSlashCondition = [...description.matchAll(forwardSlashRegex)];

    // Checking for additional conditions only said in the description (ie. additional prereqs from description in CSF)
    forwardSlashCondition.forEach((condition: any) => {
      let newCourse = condition[0].substr(11, condition[0].length);
      let oldCourse = condition[0].substr(0, 10);
      if (expr.match(newCourse) === null) {
        // If our expression doesn't already have the course to the right of the '/', we append this course to the old course in the expression with an OR
        expr = expr.replaceAll(
          oldCourse + "[C]",
          oldCourse + "[C]^OR^" + newCourse + "[C]"
        );
      }
    });

    let obj = await getEachCourse(expr, regex);
    return obj;
  };

  export interface prereqCourses {
    counter: number,
    numNameList: any[],
    numList: RegExpMatchArray,
    expr: String,
  }

  export const getEachCourse = async (expr: string, regex: RegExp): Promise<prereqCourses> => {
    // Gets an array of all courses in expression.
    let match = expr.match(regex);
    let numList: RegExpMatchArray = [];
    let numNameList: any[] = []; // Contains the number with name of a course.
    let counter = 0; // Keeps track of how many courses have been processed. Cannot rely on indices as for loop executes asynchronously compared to axios. We need a variable syncronous to axios to determine when to load prereqs

    // If we were able to find course numbers in regex matches, update the numList to list of course numbers
    if (match) {
      numList = match;
    }

    //let out:prereqCourses[] = [];
    let promises = [];

    // For the list of numbers, retrieve each course number, search for it and store the combined number + name into numNameList
    for (let n = 0; n < numList.length; n++) {
      let num = numList[n];
      const next = axios
        .get(api + "/search", { params: { query: num } })
        // eslint-disable-next-line no-loop-func
        .then((retrieved) => {
          const retrievedCourse = retrieved.data.data;
          if (retrievedCourse.length === 1) {
            numNameList[n] = (num + num + " " + retrievedCourse[0].title); // num is added twice to distinquish which was the base course (refer to the case of EN.600 below) in the case that departments change numbers (600 to 601)
            console.log(n, numNameList[n]);
            counter++;
          } else {
            
          }
        })
        .catch((err) => {
          console.log("couldnt find", err);
        });
      if (num.match("EN.600") !== null) {
        num = num.replace("EN.600", "EN.601");
        const what = axios
          .get(api + "/search", { params: { query: num } })
          // eslint-disable-next-line no-loop-func
          .then((retrieved601) => {
            const retrievedCourse601 = retrieved601.data.data;
            if (retrievedCourse601.length === 1) {
              // Append original num to front for later sorting
              numNameList[n] = (
                numList[n] + num + " " + retrievedCourse601[0].title
              );
              console.log("lmao", n, numNameList[n]);
            } else {
              
            }
            counter++;
          })
          .then(() => {
            let temp = {
              counter: counter,
              numNameList: numNameList,
              numList: numList,
              expr: expr,
            }
            //out.push(temp);
          })
          .catch((err) => {
            console.log("couldnt find", err);
          });
        promises.push(what);
        } else {
          // numNameList[n] = (num + num + " Older than 2 years old.");
          // console.log("xd", n, numNameList[n]);
          // counter++;
        }
      promises.push(next);
    }
    return Promise.all(promises).then(() => {
      for (let n = 0; n < numList.length; n++) {
        console.log("loop", n, numNameList[n]);
        if (numNameList[n] === undefined) {
          numNameList[n] = (
            numList[n] + numList[n] + " Older than 2 years old."
          );
          console.log("xd", n, numNameList[n]);
        }
      }

      let out = {
        counter: counter,
        numNameList: numNameList,
        numList: numList,
        expr: expr
      }
      return out;
    });
  };

  // TODO: Autogenerate time ranks based on year and semester
  export const courseRank = new Map([
    ["fr,fa", 1],
    ["fr,sp", 3],
    ["fr,in", 2],
    ["fr,su", 4],
    ["so,fa", 5],
    ["so,in", 6],
    ["so,sp", 7],
    ["so,su", 8],
    ["ju,fa", 9],
    ["ju,in", 10],
    ["ju,sp", 11],
    ["ju,su", 12],
    ["se,fa", 13],
    ["se,in", 14],
    ["se,sp", 15],
    ["se,su", 16],
  ]);

  // Checks if prereq is satisfied by plan
  export const checkPrereq = (plan: UserCourse[], number: string, year: YearType, semester: SemesterType): boolean => {
    let satisfied: boolean = false;
    const currTimeVal = courseRank.get(
      (year.substr(0, 2) + "," + semester.substr(0, 2)).toLowerCase()
    );
    plan.forEach((course) => {
      const courseTimeVal = courseRank.get(
        (
          course.year.substr(0, 2) +
          "," +
          course.term.substr(0, 2)
        ).toLowerCase()
      );
      console.log(courseTimeVal);
      if (
        course.number === number &&
        currTimeVal !== undefined &&
        courseTimeVal !== undefined &&
        currTimeVal > courseTimeVal
      ) {
        satisfied = true;
      }
    });
    return satisfied;
  };