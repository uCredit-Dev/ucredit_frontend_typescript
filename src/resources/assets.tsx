import axios from "axios";
import { updateCourseCache, updateUnfoundNumbers } from "../slices/userSlice";
import {
  Course,
  User,
  Plan,
  SemesterType,
  UserCourse,
  SISRetrievedCourse,
  Year,
} from "./commonTypes";
import { allMajors } from "./majors";
import { store } from "../appStore/store";

export const api = window.location.href.includes("local")
  ? "https://ucredit-dev.herokuapp.com/api"
  : "https://ucredit-api.herokuapp.com/api";

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

// export const getCourses = (courseIds: string[]): Course[] => {
//   const retrieved: Course[] = [];
//   courseIds.forEach((id) => {
//     // retrieve courses
//     // if (id === testCourseFall._id) {
//     //   retrieved.push(testCourseFall);
//     // } else if (id === testCourseSpring._id) {
//     //   retrieved.push(testCourseSpring);
//     // }
//   });

//   return retrieved;
// };

// On SIS, scrape the majors using the console, check Notion for more info
export const AS_deps = [
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
export const WSE_deps = [
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
export const all_deps = [...AS_deps, ...WSE_deps];
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
export const filterNNegatives = (inspected: Course | "None"): any[] => {
  let preReqs: any[] = [];
  if (inspected !== "None" && inspected !== undefined) {
    preReqs = inspected.preReq.filter((section: any) => {
      return section.IsNegative === "N";
    });
  }
  return preReqs;
};

// Takes in a unparsed array of preReqs.
// Processes by checking if they're satisfied and turning them into jsx elements.
// Returns an object containg the course numbers
// as well as the names associated with each course number
// expr is the input expression for the prereqs, regex is the regex to parse
// numList is a list of the numbers in the expr
export const processPrereqs = async (
  preReqs: any[],
  courseCache: SISRetrievedCourse[],
  planCourses: UserCourse[]
): Promise<prereqCourses> => {
  // Regex used to get an array of course numbers.
  const regex: RegExp = /[A-Z]{2}\.[0-9]{3}\.[0-9]{3}/g;
  const forwardSlashRegex: RegExp =
    /[A-Z]{2}\.[0-9]{3}\.[0-9]{3}\/[A-Z]{2}\.[0-9]{3}\.[0-9]{3}/g; // e.g. EN.XXX.XXX/EN.XXX.XXX
  const forwardSlashRegex2: RegExp =
    /[A-Z]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{3}\.[0-9]{3}/g; // e.g. EN.XXX.XXX/XXX.XXX
  const forwardSlashRegex3: RegExp = /[A-Z]{2}\.[0-9]{3}\/[0-9]{3}\.[0-9]{3}/g; // e.g. EN.XXX/XXX.XXX

  let description: string = preReqs[0].Description;
  let expr: any = preReqs[0].Expression;

  // All courses that match the parttern of 'COURSE/COURSE' in description
  let forwardSlashCondition = [...description.matchAll(forwardSlashRegex)];
  let forwardSlashCondition2 = [...description.matchAll(forwardSlashRegex2)];
  let forwardSlashCondition3 = [...description.matchAll(forwardSlashRegex3)];
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

  forwardSlashCondition2.forEach((condition: any) => {
    let firstCourse = condition[0].substr(0, 10);
    let secondCourse = condition[0].substr(0, 3) + condition[0].substr(11);
    if (expr.match(secondCourse) === null) {
      // If our expression doesn't already have the course to the right of the '/', we append this course to the old course in the expression with an OR
      expr = expr.replaceAll(
        firstCourse + "[C]",
        firstCourse + "[C]^OR^" + secondCourse + "[C]"
      );
    }
  });

  forwardSlashCondition3.forEach((condition: any) => {
    let firstCourse = condition[0].substr(0, 6) + condition[0].substr(10, 13);
    let secondCourse = condition[0].substr(0, 3) + condition[0].substr(7, 13);
    if (expr.match(secondCourse) === null) {
      // If our expression doesn't already have the course to the right of the '/', we append this course to the old course in the expression with an OR
      expr = expr.replaceAll(
        firstCourse + "[C]",
        firstCourse + "[C]^OR^" + secondCourse + "[C]"
      );
    }
  });

  return new Promise((resolve) => {
    getCourses(expr, regex, courseCache, planCourses).then((c) => {
      return resolve(c);
    });
  });
};

export interface prereqCourses {
  numNameList: any[];
  numList: RegExpMatchArray;
  expr: String;
}

// Returns an object containg the course numbers
// as well as the names associated with each course number
// expr is the input expression for the prereqs, regex is the regex to parse
// numList is a list of the numbers in the expr
// numNameList is the list of the numbers and associated course names
export const getCourses = (
  expr: string,
  regex: RegExp,
  courseCache: SISRetrievedCourse[],
  planCourses: UserCourse[]
): Promise<prereqCourses> => {
  return new Promise((resolve) => {
    // Gets an array of all courses in expression.
    let match = expr.match(regex);
    let numList: RegExpMatchArray = [];
    let numNameList: any[] = []; // Contains the number with name of a course.

    // If we were able to find course numbers in regex matches, update the numList to list of course numbers
    if (match) {
      numList = match;
    }

    // For the list of numbers, retrieve each course number, search for it and store the combined number + name into numNameList
    let retrieved = 0;
    for (let n = 0; n < numList.length; n++) {
      let num = numList[n];
      // eslint-disable-next-line no-loop-func
      getCourse(num, courseCache, planCourses).then((retrievedCourse) => {
        if (retrievedCourse !== null) {
          retrieved++;
          numNameList[n] = num + num + " " + retrievedCourse.title;
          // num is added twice to distinquish which was the base course (refer to the case of EN.600 below) in the case that departments change numbers (600 to 601)
        }
        if (num.match("EN.600") !== null) {
          num = num.replace("EN.600", "EN.601");
          getCourse(num, courseCache, planCourses).then(
            (retrievedCourse601) => {
              if (retrievedCourse601 !== null) {
                retrieved++;
                // Append original num to front for later sorting
                numNameList[n] =
                  numList[n] + num + " " + retrievedCourse601.title;
              }
              if (numNameList[n] == null) {
                retrieved++;
                numNameList[n] =
                  numList[n] +
                  numList[n] +
                  " Has not been offered in the past 4 years or listed on SIS. Please click on the Prerequisites Description tab for full description.";
              }
              if (retrieved === numList.length) {
                let out = {
                  numNameList: numNameList,
                  numList: numList,
                  expr: expr,
                };
                return resolve(out);
              }
            }
          );
        } else {
          if (numNameList[n] == null) {
            retrieved++;
            numNameList[n] =
              numList[n] +
              numList[n] +
              " Has not been offered in the past 4 years or listed on SIS. Please click on the Prerequisites Description tab for full description.";
          }
          if (retrieved === numList.length) {
            let out = {
              numNameList: numNameList,
              numList: numList,
              expr: expr,
            };
            return resolve(out);
          }
        }
      });
    }
  });
};

/**
 *
 * @param courseNumber
 * @param courseCache
 * @param allPlanCourses
 * @returns
 */
export const getCourse = async (
  courseNumber: string,
  courseCache: SISRetrievedCourse[],
  allPlanCourses: UserCourse[]
): Promise<Course | null> => {
  return new Promise((resolve) => {
    let out: Course | null = null;
    let userC: UserCourse | null = null;

    for (let c of allPlanCourses) {
      if (c.number === courseNumber) {
        userC = c;
      }
    }

    // check the cache
    for (let element of courseCache) {
      if (element.number === courseNumber) {
        out = {
          ...element,
          ...element.versions[0],
        };
        return resolve(out);
      }
    }

    if (out === null) {
      if (store.getState().user.unfoundNumbers.includes(courseNumber)) {
        return resolve(null);
      }
    }
    // Then pull from db.
    if (out === null) {
      axios
        .get("https://ucredit-dev.herokuapp.com/api/search", {
          params: { query: courseNumber },
        })
        .then((courses) => {
          let retrieved: SISRetrievedCourse = courses.data.data[0];
          if (retrieved === undefined) {
            store.dispatch(updateUnfoundNumbers(courseNumber));
            return resolve(null);
          }
          let versionIndex = 0;
          retrieved.versions.forEach((element, index) => {
            if (userC === null) return;
            if (element.term === userC.term) {
              versionIndex = index;
            }
          });
          //console.log(retrieved);
          store.dispatch(updateCourseCache([retrieved]));
          out = {
            ...retrieved,
            ...retrieved.versions[versionIndex],
          };
          if (out !== null) {
            return resolve(out);
          }
        })
        .catch((err) => console.log(err));
    }
    if (out !== null) return resolve(out);
  });
};

// Checks the prereqs for a given course is satisifed

const process = (input: prereqCourses) => {
  let numList = input.numList;
  let numNameList = input.numNameList;
  let expr: any = input.expr;
  numList = numList.sort((first: any, second: any) => {
    const sub1 = first.substr(0, 10);
    const sub2 = second.substr(0, 10);
    return sub1.localeCompare(sub2);
  });
  numNameList = numNameList.sort((a: any, b: any): any => {
    const sub1 = a.substr(0, 10);
    const sub2 = b.substr(0, 10);
    return sub1.localeCompare(sub2);
  });
  for (let i = 0; i < numList.length; i++) {
    expr = expr.replaceAll(
      numList[i],
      numNameList[i].substr(10, numNameList[i].length)
    );
  }
  const out = expr.split("^");
  return out;
};

const getNonStringPrereq = (
  currPlanCourses: UserCourse[],
  plan: Plan,
  input: any,
  year: number,
  semester: SemesterType
): boolean => {
  const element = input;
  if (typeof element === "string") {
    // If the element is a number
    // const noCBrackets: string = element.substr(0, element.length - 3);
    const noCBracketsNum: string = element.substr(0, 10);
    if (plan.years[year]) {
      const satisfied: boolean = checkPrereq(
        currPlanCourses,
        plan,
        noCBracketsNum,
        plan.years[year]._id,
        semester
      );
      return satisfied;
    } else {
      return false;
    }
  } else if (typeof element[0] === "number") {
    // If the element is a OR sequence (denoted by the depth number in the first index)
    const parsedSat: boolean = isSatisfied(
      element,
      plan,
      true,
      currPlanCourses,
      year,
      semester
    );
    return parsedSat;
  } else if (typeof element === "object") {
    // If the element is a parentheses sequence
    if (element.length === 1) {
      return getNonStringPrereq(
        currPlanCourses,
        plan,
        element[0],
        year,
        semester
      );
    } else {
      const parsedSat: boolean = isSatisfied(
        element,
        plan,
        false,
        currPlanCourses,
        year,
        semester
      );
      return parsedSat;
    }
  } else {
    return true;
  }
};

const isSatisfied = (
  element: [],
  plan: Plan,
  or: boolean,
  currPlanCourses: UserCourse[],
  year: number,
  semester: SemesterType
): boolean => {
  let orAndSatisfied = false;

  element.forEach((el: any, index) => {
    if (typeof el !== "number") {
      const satisfied = getNonStringPrereq(
        currPlanCourses,
        plan,
        el,
        year,
        semester
      );

      // If it's not an or statement, the first course must be satisfied.
      if (index === 0) {
        orAndSatisfied = satisfied;
      }

      // If it's an or statement, only one course would need to be satisfied. Otherwise, every course would need to be satisfied.
      if (or && satisfied) {
        orAndSatisfied = true;
      } else if (!or && !satisfied) {
        orAndSatisfied = false;
      }
    }
  });
  return orAndSatisfied;
};

const createPrereqBulletList = (input: string[]): string[] => {
  const courseArr: any[] = [];
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "AND") {
      // skip
    } else if (input[i] === "(") {
      // Adds in everything between this level's open and close parentheses

      // Keeps track of whether we have closed the original open parentheses
      const parenthesesStack = [input[i]];
      const subCourseArr: string[] = [];
      while (parenthesesStack.length > 0) {
        i++;
        if (input[i] === ")") {
          // If close, pop one from parentheses stack
          parenthesesStack.pop();
        } else if (input[i] === "(") {
          // if open, push open parentheses in
          parenthesesStack.push("(");
        }
        // If we're still in original parentheses, push it into sthe subArray
        if (parenthesesStack.length > 0) {
          subCourseArr.push(input[i]);
        }
      }

      // Recursively calls function on string inside of parentheses.
      courseArr.push(createPrereqBulletList(subCourseArr));
    } else {
      courseArr.push(input[i]);
    }
  }
  return courseArr;
};

// Takes parsed prereq array and then parses this array again to make OR sequences
const parsePrereqsOr = (input: any, depth: number): any => {
  const orParsed: any[] = [];
  // Group by ORs: Put elements connected by ORs as arrays starting with depth number (as an identifier). All other elements are treated as ands.
  // if OR, pop last element from orParsed. If it's a string, make a new array. If array, push the next element into this array. Put the array back into orParsed.
  // if not OR, push element into orParsed
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "OR") {
      let el = orParsed.pop();
      let toAdd;
      // If the course or array of courses after the OR is a string, it must be a course number. Otherwise, it's a course array.
      if (typeof input[i + 1] === "string") {
        toAdd = input[i + 1];
      } else {
        toAdd = parsePrereqsOr(input[i + 1], depth);
      }

      // First element
      if (el === null) {
        orParsed.push(0);
        orParsed.push(toAdd);
      } else if (typeof el === "object" && typeof el[0] === "number") {
        // If past element was an array and we are in an or chain
        // The last element was an or sequence
        el.push(toAdd);
        orParsed.push(el);
      } else if (typeof el === "object" && typeof el[0] !== "number") {
        // The last element was a parentheses sequence
        // We need to parse the sequence and put that element back into our array
        el = parsePrereqsOr(input[i], depth);
        orParsed.push([el, toAdd]);
      } else {
        // Last element wasn't any type of sequence. Thus, a new OR sequence is made and pushed in.
        const orArray = [depth, el, toAdd];
        orParsed.push(orArray);
      }
      i++;
    } else if (typeof input[i] === "string") {
      // If number, just push in
      orParsed.push(input[i]);
    } else {
      // If not OR or a course number, must be a parentheses sequence. We will recursively call this function in this case.
      orParsed.push(...parsePrereqsOr(input[i], depth));
    }
  }
  return orParsed;
};

// Checks if a prereq is satisfied by plan
// plan is the user's plan
// number is the course number of a prereq
// year, semseter are the year and semester of the prereq
export const checkPrereq = (
  courses: UserCourse[],
  plan: Plan,
  preReqNumber: string,
  year: string,
  semester: SemesterType
): boolean => {
  let satisfied: boolean = false;
  const yearObj = getYearFromId(year, plan);
  courses.forEach((course) => {
    if (
      course.number === preReqNumber &&
      yearObj !== null &&
      prereqInPast(course, getYearIndex(yearObj, plan), semester, plan)
    ) {
      satisfied = true;
    }
  });
  return satisfied;
};

const getYearFromId = (id: string, plan: Plan): Year | null => {
  let year: Year | null = null;

  plan.years.forEach((y: Year, i: number) => {
    if (id === y._id) {
      year = y;
    }
  });

  return year;
};

const semesters: String[] = ["fall", "intersession", "spring", "summer"];

const getYearIndex = (year: Year, plan: Plan): number => {
  let index: number = 0;
  plan.years.forEach((y: Year, i: number) => {
    if (y._id === year._id) {
      index = i;
    }
  });
  return index;
};

const prereqInPast = (
  course: UserCourse,
  year: number,
  semester: SemesterType,
  plan: Plan
): boolean => {
  const retrievedYear = getCourseYear(plan, course);
  if (retrievedYear !== null) {
    const courseYearRank: number = getYearIndex(retrievedYear, plan);
    if (courseYearRank < year) {
      return true;
    } else if (courseYearRank > year) {
      return false;
    } else {
      return (
        semesters.indexOf(course.term) <
        semesters.indexOf(semester.toLowerCase())
      );
    }
  } else {
    return false;
  }
};

function getCourseYear(plan: Plan, course: UserCourse): Year | null {
  let year: Year | null = null;
  plan.years.forEach((currPlanYear) => {
    if (currPlanYear._id === course.year_id) {
      year = currPlanYear;
    }
  });
  return year;
}

export const checkAllPrereqs = (
  currCourses: UserCourse[],
  plan: Plan,
  number: string,
  year: Year,
  semester: SemesterType,
  courseCache: SISRetrievedCourse[]
): Promise<boolean> => {
  return new Promise((resolve) => {
    getCourse(number, courseCache, currCourses).then((course) => {
      if (course !== null) {
        let filtered = filterNNegatives(course);
        if (filtered.length === 0) {
          return resolve(true);
        } else {
          processPrereqs(filtered, courseCache, currCourses).then(
            (processed) => {
              if (processed.numList.length === 0) {
                return resolve(true);
              }
              let split = process(processed);
              let list = createPrereqBulletList(split);
              let orParsed = parsePrereqsOr(list, 0);
              let bool = getNonStringPrereq(
                currCourses,
                plan,
                orParsed,
                getYearIndex(year, plan),
                semester
              );
              return resolve(bool);
            }
          );
        }
      } else {
        return resolve(false);
      }
    });
  });
};

export const getMajor = (major: string) => {
  for (let i = 0; i < allMajors.length; i++) {
    if (allMajors[i].degree_name === major) {
      return allMajors[i];
    }
  }
};
