import {
  Course,
  User,
  Plan,
  YearType,
  SemesterType,
  UserCourse,
} from "./commonTypes";
import axios from "axios";
import React from "react";

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
export const filterNNegatives = (inspected: Course | "None"): any[] => {
  let preReqs: any[] = [];
  if (inspected !== "None" && inspected !== undefined) {
    preReqs = inspected.preReq.filter((section: any) => {
      return section.IsNegative === "N";
    });
  }
  //console.log(preReqs);
  return preReqs;
};

// Takes in a unparsed array of preReqs.
// Processes by checking if they're satisfied and turning them into jsx elements.
// Returns an object contating the course numbers
// as well as the names associated with each course number
// expr is the input expression for the prereqs, regex is the regex to parse
// numList is a list of the numbers in the expr
export const processPrereqs = async (
  preReqs: any[]
): Promise<prereqCourses> => {
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

  let obj = await getCourses(expr, regex);
  return obj;
};

export interface prereqCourses {
  numNameList: any[];
  numList: RegExpMatchArray;
  expr: String;
}

// Returns an object contating the course numbers
// as well as the names associated with each course number
// expr is the input expression for the prereqs, regex is the regex to parse
// numList is a list of the numbers in the expr
// numNameList is the list of the numbers and associated course names
const getCourses = async (
  expr: string,
  regex: RegExp
): Promise<prereqCourses> => {
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
        //console.log(retrievedCourse);
        if (retrievedCourse.length > 0) {
          numNameList[n] = num + num + " " + retrievedCourse[0].title; // num is added twice to distinquish which was the base course (refer to the case of EN.600 below) in the case that departments change numbers (600 to 601)
          counter++;
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
            numNameList[n] =
              numList[n] + num + " " + retrievedCourse601[0].title;
          }
          counter++;
        })
        .catch((err) => {
          console.log("couldnt find", err);
        });
      promises.push(what);
    }
    promises.push(next);
  }
  return Promise.all(promises).then(() => {
    for (let n = 0; n < numList.length; n++) {
      if (numNameList[n] === undefined) {
        //console.log(n);
        numNameList[n] =
          numList[n] +
          numList[n] +
          " Has not been offered in the past 2 years.";
      }
    }
    let out = {
      numNameList: numNameList,
      numList: numList,
      expr: expr,
    };
    return out;
  });
};

// TODO: Autogenerate time ranks based on year and semester
const courseRank = new Map([
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

export const getCourse = async (courseNumber: String): Promise<Course> => {
  const retrieved = await axios.get(api + "/search", {
    params: { query: courseNumber },
  });
  return retrieved.data.data[0];
};

// Checks the prereqs for a given course is satisifed
export const checkAllPrereqs = async (
  plan: UserCourse[],
  number: String,
  year: YearType,
  semester: SemesterType
): Promise<boolean> => {
  const out = getCourse(number)
    .then((course) => {
      let filtered = filterNNegatives(course);
      if (filtered.length === 0) {
        const empty: prereqCourses = {
          numList: [],
          numNameList: [],
          expr: "",
        };
        return empty;
      }
      return processPrereqs(filtered);
    })
    .then((processed) => {
      if (processed.numList.length === 0) {
        return true;
      }
      let split = process(processed);
      let list = createPrereqBulletList(split);
      let orParsed = parsePrereqsOr(list, 0);
      return getNonStringPrereq(plan, orParsed, year, semester).satisfied;
    });
  return out;
};

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
    //console.log(i);
    expr = expr.replaceAll(
      numList[i],
      numNameList[i].substr(10, numNameList[i].length)
    );
    //console.log(i);
  }
  const out = expr.split("^");
  return out;
};

type parsedPrereqs = {
  satisfied: boolean;
  jsx: JSX.Element;
};

const getNonStringPrereq = (
  currPlanCourses: UserCourse[],
  input: any,
  year: YearType,
  semester: SemesterType
): parsedPrereqs => {
  const element = input;
  if (typeof element === "string") {
    // If the element is a number
    const noCBrackets: string = element.substr(0, element.length - 3);
    const noCBracketsNum: string = element.substr(0, 10);
    const satisfied: boolean = checkPrereq(
      currPlanCourses,
      noCBracketsNum,
      year,
      semester
    );
    return {
      satisfied: satisfied,
      jsx: <div></div>,
    };
  } else if (typeof element[0] === "number") {
    // If the element is a OR sequence (denoted by the depth number in the first index)
    const parsedSat: boolean = isSatisfied(
      element,
      true,
      currPlanCourses,
      year,
      semester
    );
    return {
      satisfied: parsedSat,
      jsx: <div></div>,
    };
  } else if (typeof element === "object") {
    // If the element is a parentheses sequence
    if (element.length === 1) {
      const parsed: parsedPrereqs = getNonStringPrereq(
        currPlanCourses,
        element[0],
        year,
        semester
      );
      return {
        satisfied: parsed.satisfied,
        jsx: <p>{parsed.jsx}</p>,
      };
    } else {
      const parsedSat: boolean = isSatisfied(
        element,
        false,
        currPlanCourses,
        year,
        semester
      );
      return {
        satisfied: parsedSat,
        jsx: <div></div>,
      };
    }
  } else {
    return {
      satisfied: true,
      jsx: <></>,
    };
  }
};

const isSatisfied = (
  element: [],
  or: boolean,
  currPlanCourses: UserCourse[],
  year: YearType,
  semester: SemesterType
): boolean => {
  let orAndSatisfied = false;

  element.forEach((el: any, index) => {
    if (typeof el !== "number") {
      const parsed: {
        satisfied: boolean;
        jsx: JSX.Element;
      } = getNonStringPrereq(currPlanCourses, el, year, semester);

      // If it's not an or statement, the first course must be satisfied.
      if (index === 0) {
        orAndSatisfied = parsed.satisfied;
      }

      // If it's an or statement, only one course would need to be satisfied. Otherwise, every course would need to be satisfied.
      if (or && parsed.satisfied) {
        orAndSatisfied = true;
      } else if (!or && !parsed.satisfied) {
        orAndSatisfied = false;
      }
    }
  });
  return orAndSatisfied;
};

const createPrereqBulletList = (input: any): any => {
  const courseArr = [];
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "AND") {
      // skip
    } else if (input[i] === "(") {
      // Adds in everything between this level's open and close parentheses

      // Keeps track of whether we have closed the original open parentheses
      const parenthesesStack = [input[i]];
      const subCourseArr = [];
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
  plan: UserCourse[],
  preReqNumber: string,
  year: YearType,
  semester: SemesterType
): boolean => {
  let satisfied: boolean = false;
  const currTimeVal = courseRank.get(
    (year.substr(0, 2) + "," + semester.substr(0, 2)).toLowerCase()
  );
  plan.forEach((course) => {
    const courseTimeVal = courseRank.get(
      (course.year.substr(0, 2) + "," + course.term.substr(0, 2)).toLowerCase()
    );
    //console.log(course);
    if (
      course.number === preReqNumber &&
      currTimeVal !== undefined &&
      courseTimeVal !== undefined &&
      currTimeVal > courseTimeVal
    ) {
      satisfied = true;
    }
  });
  return satisfied;
};
