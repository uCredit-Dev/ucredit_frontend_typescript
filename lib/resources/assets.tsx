import axios from 'axios';
import { updateCourseCache, updateUnfoundNumbers } from '../slices/userSlice';
import {
  Course,
  User,
  Plan,
  SemesterType,
  UserCourse,
  SISRetrievedCourse,
  Year,
  SearchExtras,
} from './commonTypes';
import { store } from '../appStore/store';

export const getAPI = (window) =>
  window.location.href.includes('http://localhost:3000')
    ? 'http://localhost:4567/api'
    : window.location.href.includes('https://ucredit.me')
    ? 'https://ucredit-api.onrender.com/api'
    : 'https://ucredit-dev.onrender.com/api';

export const guestUser: User = {
  _id: 'guestUser',
  name: 'Guest User',
  email: 'none',
  affiliation: 'STUDENT',
  school: 'none',
  grade: 'AE UG Freshman',
  whitelisted_plan_ids: [],
  plan_ids: [],
};

export const getColors = function (
  distribution: string | undefined,
  writingIntensive: boolean,
): string {
  if (!distribution || distribution === 'None') {
    return '#F0F0F0';
  }
  if (writingIntensive) {
    return '#D0D0FF';
  }
  if (distribution === 'N') {
    return '#FFE0CB';
  } else if (distribution === 'S') {
    return '#FFF9A3';
  } else if (distribution === 'H') {
    return '#FFDBDB';
  } else if (distribution === 'Q') {
    return '#D1FFCD';
  } else {
    return '#83B9FF';
  }
};

export const getParams = (extras: SearchExtras) => ({
  page: extras.page,
  query: extras.query,
  department: extras.department,
  term: extras.term === 'All' ? '' : extras.term,
  year: extras.year === 'All' ? '' : extras.year,
  areas: extras.areas,
  credits: extras.credits,
  wi: extras.wi,
  tags: extras.tags,
  level: extras.levels,
});

// On SIS, scrape the majors using the console, check Notion for more info
export const AS_deps = [
  'AS Agora Institute',
  'AS Anthropology',
  'AS Archaeology',
  'AS Art',
  'AS Behavioral Biology',
  'AS Biology',
  'AS Biophysics',
  'AS Center for Africana Studies',
  'AS Center for Language Education',
  'AS Chemistry',
  'AS Classics',
  'AS Cognitive Science',
  'AS Comparative Thought and Literature',
  "AS Dean's Teaching Fellowship Courses",
  'AS Earth & Planetary Sciences',
  'AS East Asian Studies',
  'AS Economics',
  'AS English',
  'AS Film and Media Studies',
  'AS First Year Seminars',
  'AS Freshman Seminars',
  'AS German & Romance Languages & Literatures',
  'AS History',
  'AS History of Art',
  'AS History of Science, Medicine, and Technology',
  'AS Humanities Center',
  'AS Interdepartmental',
  'AS International Studies',
  'AS Islamic Studies',
  'AS Jewish Studies Program',
  'AS Mathematics',
  'AS Medical Tutorials',
  'AS Medicine, Science and the Humanities',
  'AS Military Science',
  'AS Modern Languages and Literatures',
  'AS Music',
  'AS Near Eastern Studies',
  'AS Neuroscience',
  'AS Non-Departmental',
  'AS Philosophy',
  'AS Physics & Astronomy',
  'AS Political Science',
  'AS Program in Latin American Studies',
  'AS Program in Museums and Society',
  'AS Psychological & Brain Sciences',
  'AS Public Health Studies',
  'AS Public Policy',
  'AS Religion',
  'AS Reserved Registrar',
  'AS Sociology',
  'AS Study of Women, Gender, & Sexuality',
  'AS Summer and Intersession Programs',
  'AS Theatre Arts & Studies',
  'AS Writing Seminars',
];
export const WSE_deps = [
  'EN Applied Mathematics & Statistics',
  'EN Biomedical Engineering',
  'EN Center for Leadership Education',
  'EN Chemical & Biomolecular Engineering',
  'EN Civil Engineering',
  'EN Computer Science',
  'EN Doctor of Engineering',
  'EN Electrical & Computer Engineering',
  'EN Engineering Management',
  'EN Entrepreneurship and Management',
  'EN Environmental Health and Engineering',
  'EN General Engineering',
  'EN Geography & Environmental Engineering',
  'EN Information Security Institute',
  'EN Institute for NanoBio Technology',
  'EN Materials Science & Engineering',
  'EN Mechanical Engineering',
  'EN Professional Communication',
  'EN Reserved Registrar',
  'EN Robotics',
];
export const all_deps = [...AS_deps, ...WSE_deps];
export const course_tags = [
  'AFRS-AFAMER',
  'AFRS-DIASPO',
  'AFRS-URBAN',
  'ARCH-ARCH',
  'ARCH-RELATE',
  'BEHB-BIOBEH',
  'BEHB-SOCSCI',
  'BIOL-UL',
  'BME-BDS',
  'BME-CM',
  'BMED-BDS',
  'BMED–BDS',
  'BMED–BII',
  'BMED-CB',
  'BMED-CM',
  'BMED–CM',
  'BMED-CTE',
  'BMED-DSGN',
  'BMED-GSB',
  'BMED–GSB',
  'BMED-IMD',
  'BMED-IMG',
  'BMED-IMMU',
  'BMED-NE',
  'BMED–NE',
  'BMED–RIE',
  'BMED-SB',
  'BMED-SIMN',
  'BMED-TCTE',
  'BME-GSB',
  'BME-RIE',
  'CHBE-ACBE',
  'CHBE-BIOE',
  'CHBE-ENEL',
  'CHBE-IN',
  'CLE-ENTR',
  'CLE-LEAD',
  'CLE-MCOMM',
  'CLE-MMGMT',
  'COGS-COGPSY',
  'COGS-COMPCG',
  'COGS-LING',
  'COGS-NEURO',
  'COGS-PHLMND',
  'CSC-CE',
  'CSCI-APPL',
  'CSCI-ETHS',
  'CSCI-OTHER',
  'CSCI-RSNG',
  'CSCI-SOFT',
  'CSCI-SYST',
  'CSCI-TEAM',
  'CSCI-THRY',
  'ENGL-GLOBAL',
  'ENGL-LEC',
  'ENGL-PR1800',
  'ENVS-MAJOR',
  'ENVS-MINOR',
  'FILM-CRITST',
  'FILM-PROD',
  'FILM-SCRWRT',
  'GECS-SCI',
  'GECS-SOCSCI',
  'GRAD-CAMS',
  'GRLL-ENGL',
  'GRLL-FREN',
  'GRLL-GERM',
  'GRLL-ITAL',
  'GRLL-SPAN',
  'HART-ANC',
  'HART-MED',
  'HART-MODERN',
  'HART-NW',
  'HART-RENBAR',
  'HART-RENEM',
  'HART-THRY',
  'HIST-AFRICA',
  'HIST-ASIA',
  'HIST-EUROPE',
  'HIST-LATAM',
  'HIST-MIDEST',
  'HIST-US',
  'INST-AP',
  'INST-CP',
  'INST-ECON',
  'INST-GLOBAL',
  'INST-IR',
  'INST-NWHIST',
  'INST-PT',
  'ISLM-ISLMST',
  'MLL-ENGL',
  'MLL-FREN',
  'MLL-GERM',
  'MSCH-HUM',
  'NEAS-ARTARC',
  'NEAS-HISCUL',
  'NEUR-CG',
  'NEUR-CM',
  'NEUR-CP',
  'NEUR-ST',
  'PHIL-ANCIEN',
  'PHIL-BIOETH',
  'PHIL-ETHICS',
  'PHIL-LOGSCI',
  'PHIL-MIND',
  'PHIL-MODERN',
  'PHIL-SEM',
  'PMUS-INTRO',
  'PMUS-PRAC',
  'POLI-AP',
  'POLI-CP',
  'POLI-IR',
  'POLI-PT',
  'POLI-RSCH',
  'PSYC-SEM',
  'SPOL-UL',
  'THEA-DRAMA',
  'WRIT-FICT',
  'WRIT-GNRL',
  'WRIT-POET',
];

/**
 * Parse preReq array to determine which are prereqs and which are coreq and other info.
 * Actual Prereqs are denoted by isNegative = "N"
 * @param inspected - the course
 * @returns array with valid prereqs
 */
export const filterNNegatives = (inspected: Course | 'None'): any[] => {
  let preReqs: any[] = [];
  if (inspected !== 'None' && inspected !== undefined) {
    preReqs = inspected.preReq.filter((section: any) => {
      return section.IsNegative === 'N';
    });
  }
  return preReqs;
};

/**
 * Gets the login cookie value.
 * @param cookies - the cookies in the site currently
 * @returns cookieVal - the value of the login cookie
 */
export const getLoginCookieVal = (cookies: { [x: string]: any }): string => {
  let cookieVal = '';
  // Retrieves user if user ID is "noUser", the initial user id state for userSlice.tsx.
  // Make call for backend
  Object.entries(cookies).forEach((cookie: any) => {
    if (cookie[0] === '_hjid' || cookie[0] === 'connect.sid')
      cookieVal = cookie[1];
  });
  return cookieVal;
};

/**
 * Takes in a unparsed array of preReqs.
 * Processes by checking if they're satisfied and turning them into jsx elements.
 * @param preReqs - the unparsed preReqs
 * @param courseCache - the course Cache
 * @param planCourses - the courses in the user's plan
 * @returns an Object containing the course numbers and names associated with each course number
 */
export const processPrereqs = async (
  preReqs: any[],
  courseCache: SISRetrievedCourse[],
  planCourses: UserCourse[],
): Promise<PrereqCourses> => {
  // Regex used to get an array of course numbers.
  const regex: RegExp = /[A-Z]{2}\.\d{3}\.\d{3}/g;
  const forwardSlashRegex: RegExp =
    /[A-Z]{2}\.\d{3}\.\d{3}\/[A-Z]{2}\.\d{3}\.\d{3}/g; // e.g. EN.XXX.XXX/EN.XXX.XXX
  const forwardSlashRegex2: RegExp = /[A-Z]{2}\.\d{3}\.\d{3}\/\d{3}\.\d{3}/g; // e.g. EN.XXX.XXX/XXX.XXX
  const forwardSlashRegex3: RegExp = /[A-Z]{2}\.\d{3}\/\d{3}\.\d{3}/g; // e.g. EN.XXX/XXX.XXX

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
        oldCourse + '[C]',
        oldCourse + '[C]^OR^' + newCourse + '[C]',
      );
    }
  });

  forwardSlashCondition2.forEach((condition: any) => {
    let firstCourse = condition[0].substr(0, 10);
    let secondCourse = condition[0].substr(0, 3) + condition[0].substr(11);
    if (expr.match(secondCourse) === null) {
      // If our expression doesn't already have the course to the right of the '/', we append this course to the old course in the expression with an OR
      expr = expr.replaceAll(
        firstCourse + '[C]',
        firstCourse + '[C]^OR^' + secondCourse + '[C]',
      );
    }
  });

  forwardSlashCondition3.forEach((condition: any) => {
    let firstCourse = condition[0].substr(0, 6) + condition[0].substr(10, 13);
    let secondCourse = condition[0].substr(0, 3) + condition[0].substr(7, 13);
    if (expr.match(secondCourse) === null) {
      // If our expression doesn't already have the course to the right of the '/', we append this course to the old course in the expression with an OR
      expr = expr.replaceAll(
        firstCourse + '[C]',
        firstCourse + '[C]^OR^' + secondCourse + '[C]',
      );
    }
  });

  return new Promise((resolve) => {
    getCourses(expr, regex, courseCache, planCourses).then((c) => {
      return resolve(c);
    });
  });
};

export interface PrereqCourses {
  numNameList: any[];
  numList: RegExpMatchArray;
  expr: string;
}

/**
 * parses the prereq expr to get the course numbers and names of them
 * @param expr - prereq expression
 * @param regex - regex for course numbers
 * @param courseCache - course cache
 * @param planCourses - user's plan's courses
 * @returns an object containing the course numbers and names associated with each course number
 */
export const getCourses = (
  expr: string,
  regex: RegExp,
  courseCache: SISRetrievedCourse[],
  planCourses: UserCourse[],
): Promise<PrereqCourses> => {
  return new Promise(async (resolve) => {
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
      const retrievedCourse = await getCourse(num, courseCache, planCourses, n);
      const outIndex = retrievedCourse.index;
      let outNum = numList[outIndex];
      if (retrievedCourse.resp !== null) {
        retrieved++;
        numNameList[outIndex] =
          outNum + outNum + ' ' + retrievedCourse.resp.title;
        // num is added twice to distinquish which was the base course (refer to the case of EN.600 below) in the case that departments change numbers (600 to 601)
      }
      if (
        retrievedCourse.resp === null &&
        (outNum.match('EN.600') !== null || outNum.match('EN.550') !== null)
      ) {
        if (outNum.match('EN.600') !== null)
          outNum = outNum.replace('EN.600', 'EN.601');
        else if (outNum.match('EN.550') !== null)
          outNum = outNum.replace('EN.550', 'EN.553');
        const retrievedCourseDepChange = await getCourse(
          outNum,
          courseCache,
          planCourses,
          retrievedCourse.index,
        );
        const inIndex = retrievedCourseDepChange.index;
        if (retrievedCourseDepChange.resp !== null) {
          retrieved++;
          // Append original num to front for later sorting.
          numNameList[inIndex] =
            outNum + outNum + ' ' + retrievedCourseDepChange.resp.title;
        } else if (numNameList[inIndex] == null) {
          retrieved++;
          numNameList[inIndex] =
            numList[inIndex] +
            numList[inIndex] +
            ' Has not been offered in the past 4 years or listed on SIS. Please click on the Prerequisites Description tab for full description.';
        }
        if (retrieved === numList.length) {
          let out = {
            numNameList: numNameList,
            numList: numList,
            expr: expr,
          };
          return resolve(out);
        }
      } else {
        if (numNameList[outIndex] == null) {
          retrieved++;
          numNameList[outIndex] =
            numList[outIndex] +
            numList[outIndex] +
            ' Has not been offered in the past 4 years or listed on SIS. Please click on the Prerequisites Description tab for full description.';
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
    }
  });
};

/**
 * returns a 'Course' object with info.
 * If the course is in the course cache, returns it
 * else fetches the course info from the backend
 * @param courseNumber - course number
 * @param courseCache - course cache
 * @param allPlanCourses - courses from user's plan
 * @returns
 */
export const getCourse = async (
  courseNumber: string,
  courseCache: SISRetrievedCourse[],
  allPlanCourses: UserCourse[],
  indexNum: number,
): Promise<{ index: number; resp: Course | null }> =>
  new Promise(async (resolve) => {
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
        return resolve({ index: indexNum, resp: out });
      }
    }

    if (out === null) {
      if (store.getState().user.unfoundNumbers.includes(courseNumber)) {
        return resolve({ index: indexNum, resp: null });
      }
    }
    // Then pull from db.
    return resolve(await backendSearch(courseNumber, indexNum, userC));
  });

const backendSearch = async (
  courseNumber: string,
  indexNum: number,
  userC: UserCourse | null,
): Promise<{ index: number; resp: Course | null }> =>
  new Promise(async (resolve) => {
    const res: any = await axios
      .get(getAPI(window) + `/searchNumber/${courseNumber}`)
      .catch((err) => console.log(err));
    if (res === undefined) return Promise.reject();
    let retrieved: SISRetrievedCourse = res.data.data;
    if (retrieved === undefined) {
      store.dispatch(updateUnfoundNumbers(courseNumber));
      return resolve({ index: indexNum, resp: null });
    }
    let versionIndex = 0;
    retrieved.versions.forEach((element, index) => {
      if (userC === null) return;
      if (element.term === userC.term) {
        versionIndex = index;
      }
    });
    const cache: SISRetrievedCourse[] = [];
    cache.push(retrieved);
    store.dispatch(updateCourseCache(cache));
    resolve({
      index: indexNum,
      resp: {
        ...retrieved,
        ...retrieved.versions[versionIndex],
      },
    });
  });

/**
 * replaces the prereq expression with the course names
 * and splits it
 * @param input - the array of numbers, course names, and prereq expr
 * @returns an array with the names split
 */
const process = (input: PrereqCourses) => {
  let numList = input.numList;
  let numNameList = input.numNameList;
  let expr: any = input.expr;
  for (let i = 0; i < numList.length; i++) {
    expr = expr.replaceAll(
      numList[i],
      numNameList[i].substr(10, numNameList[i].length),
    );
  }
  return expr.split('^');
};

/**
 * parses input so that we can check whether the prereq is satisfied
 * @param currPlanCourses - courses in the user's plan
 * @param plan - user's plan
 * @param input - the input prereq, either a string, number, or object
 * @param year - the year of the course
 * @param semester - the semseter of the course
 * @returns whether the prereq is satisfied
 */
const getNonStringPrereq = (
  currPlanCourses: UserCourse[],
  plan: Plan,
  input: any,
  year: Year,
  semester: SemesterType,
): boolean => {
  const element = input;
  if (typeof element === 'string') {
    // If the element is a number
    // const noCBrackets: string = element.substr(0, element.length - 3);
    const noCBracketsNum: string = element.substr(0, 10);
    const satisfied: boolean = checkPrereq(
      currPlanCourses,
      plan,
      noCBracketsNum,
      year,
      semester,
    );
    return satisfied;
  } else if (typeof element[0] === 'number') {
    // If the element is a OR sequence (denoted by the depth number in the first index)
    const parsedSat: boolean = isSatisfied(
      element,
      plan,
      true,
      currPlanCourses,
      year,
      semester,
    );
    return parsedSat;
  } else if (typeof element === 'object') {
    // If the element is a parentheses sequence
    if (element.length === 1) {
      return getNonStringPrereq(
        currPlanCourses,
        plan,
        element[0],
        year,
        semester,
      );
    } else {
      const parsedSat: boolean = isSatisfied(
        element,
        plan,
        false,
        currPlanCourses,
        year,
        semester,
      );
      return parsedSat;
    }
  } else {
    return true;
  }
};

/**
 * returns whether a prereq statement is satifies
 * @param element - array of prereqs
 * @param plan - user's plan
 * @param or - whether the statement is an or or and
 * @param currPlanCourses - courses in user's plan
 * @param year - year of course
 * @param semester - semeseter of course
 * @returns whether the prereq statement is satified
 */
const isSatisfied = (
  element: [],
  plan: Plan,
  or: boolean,
  currPlanCourses: UserCourse[],
  year: Year,
  semester: SemesterType,
): boolean => {
  let orAndSatisfied = false;

  element.forEach((el: any, index) => {
    if (typeof el !== 'number') {
      const satisfied = getNonStringPrereq(
        currPlanCourses,
        plan,
        el,
        year,
        semester,
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

/**
 * separates input into nested array
 * @param input - the prereqs with parentheses as depth designators
 * @returns a nested array with prereqs
 */

const createPrereqBulletList = (input: string[]): string[] => {
  const courseArr: any[] = [];
  for (let i = 0; i < input.length; i++) {
    if (input[i] === 'AND') {
      // skip
    } else if (input[i] === '(') {
      // Adds in everything between this level's open and close parentheses

      // Keeps track of whether we have closed the original open parentheses
      const parenthesesStack = [input[i]];
      const subCourseArr: string[] = [];
      while (parenthesesStack.length > 0) {
        i++;
        processParenthesisStack(input, i, parenthesesStack, subCourseArr);
      }

      // Recursively calls function on string inside of parentheses.
      courseArr.push(createPrereqBulletList(subCourseArr));
    } else {
      courseArr.push(input[i]);
    }
  }
  return courseArr;
};

/**
 * Helper method to process parentheses stack
 * @param input - prereq input array
 * @param i - index of input array
 * @param parenthesesStack  - stack of parentheses we are in
 * @param subCourseArr - array of courses in the current level of the prereq
 */
const processParenthesisStack = (
  input: string[],
  i: number,
  parenthesesStack: string[],
  subCourseArr: string[],
) => {
  if (input[i] === ')') {
    // If close, pop one from parentheses stack
    parenthesesStack.pop();
  } else if (input[i] === '(') {
    // if open, push open parentheses in
    parenthesesStack.push('(');
  }
  // If we're still in original parentheses, push it into sthe subArray
  if (parenthesesStack.length > 0) {
    subCourseArr.push(input[i]);
  }
};

// Takes parsed prereq array and then parses this array again to make OR sequences
const parsePrereqsOr = (input: any, depth: number): any => {
  const orParsed: any[] = [];
  let skip: boolean = false;
  // Group by ORs: Put elements connected by ORs as arrays starting with depth number (as an identifier). All other elements are treated as ands.
  // if OR, pop last element from orParsed. If it's a string, make a new array. If array, push the next element into this array. Put the array back into orParsed.
  // if not OR, push element into orParsed
  for (let i = 0; i < input.length; i++) {
    if (skip) {
      skip = false;
      continue;
    }
    if (input[i] === 'OR') {
      processOrCase(orParsed, input, depth, i);
      skip = true;
    } else if (typeof input[i] === 'string') {
      // If number, just push in
      orParsed.push(input[i]);
    } else {
      // If not OR or a course number, must be a parentheses sequence. We will recursively call this function in this case.
      orParsed.push(...parsePrereqsOr(input[i], depth));
    }
  }
  return orParsed;
};

/**
 * Helper method to process OR case
 * @param orParsed - parsed or criteria array
 * @param input - input array
 * @param depth - depth of parentheses we are in
 * @param i - index of input array
 */
const processOrCase = (
  orParsed: any[],
  input: any[],
  depth: number,
  i: number,
) => {
  let el = orParsed.pop();
  let toAdd;
  // If the course or array of courses after the OR is a string, it must be a course number. Otherwise, it's a course array.
  if (typeof input[i + 1] === 'string') {
    toAdd = input[i + 1];
  } else {
    toAdd = parsePrereqsOr(input[i + 1], depth);
  }

  // First element
  if (el === null) {
    orParsed.push(0);
    orParsed.push(toAdd);
  } else if (typeof el === 'object' && typeof el[0] === 'number') {
    // If past element was an array and we are in an or chain
    // The last element was an or sequence
    el.push(toAdd);
    orParsed.push(el);
  } else if (typeof el === 'object' && typeof el[0] !== 'number') {
    // The last element was a parentheses sequence
    // We need to parse the sequence and put that element back into our array
    el = parsePrereqsOr(input[i], depth);
    orParsed.push([el, toAdd]);
  } else {
    // Last element wasn't any type of sequence. Thus, a new OR sequence is made and pushed in.
    const orArray = [depth, el, toAdd];
    orParsed.push(orArray);
  }
};

/**
 * Checks if a prereq is satisfied by plan
 * @param courses - user's courses
 * @param plan - user's plan
 * @param preReqNumber - prereq number
 * @param year - year of course
 * @param semester -semseter of course
 * @returns whether the prereq is satisfied by the plan
 */
export const checkPrereq = (
  courses: UserCourse[],
  plan: Plan,
  preReqNumber: string,
  year: Year,
  semester: SemesterType,
): boolean => {
  for (let course of courses) {
    if (
      (course.number === preReqNumber ||
        checkOldPrereqNumbers(course.number, preReqNumber)) &&
      prereqInPast(course, year, semester, plan)
    )
      return true;
  }
  return false;
};

const checkOldPrereqNumbers = (
  courseNumber: string | undefined,
  preReqNumber: string | undefined,
): boolean => {
  if (!courseNumber || !preReqNumber) return false;
  const courseNumberArray = courseNumber.split('.');
  const preReqNumberArray = preReqNumber.split('.');
  if (
    (courseNumberArray.length === 3 &&
      preReqNumberArray.length === 3 &&
      courseNumberArray[0] === preReqNumberArray[0] &&
      (preReqNumberArray[1] === '553' || preReqNumberArray[1] === '550') &&
      (courseNumberArray[1] === '553' || courseNumberArray[1] === '550')) ||
    ((preReqNumberArray[1] === '600' || preReqNumberArray[1] === '601') &&
      (courseNumberArray[1] === '600' || courseNumberArray[1] === '601'))
  ) {
    return courseNumberArray[2] === preReqNumberArray[2];
  }
  return false;
};

const semesters: string[] = ['fall', 'intersession', 'spring', 'summer'];

/**
 * Check's whether prereq is satisfied by the course in the past
 * @param course - the course
 * @param year - the year of the course we are checking (not course)
 * @param semester - semester of the course we are checking (not course)
 * @param plan - user's plan
 * @returns - whether the course is in the past
 */
const prereqInPast = (
  course: UserCourse,
  year: Year,
  semester: SemesterType,
  plan: Plan,
): boolean => {
  const retrievedYear = getCourseYear(plan, course);
  if (retrievedYear !== null) {
    if (
      retrievedYear.year < year.year ||
      (year.year === retrievedYear.year && checkSemester(semester, course.term))
    ) {
      return true;
    } else if (retrievedYear.year > year.year) {
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

/**
 * @param semester - semester to check against
 * @param courseSemester - semester of course
 */
const checkSemester = (
  semester: SemesterType,
  courseSemester: SemesterType,
): boolean => {
  const uppercaseConverted =
    courseSemester.charAt(0).toUpperCase() + courseSemester.slice(1);
  if (
    uppercaseConverted === 'Fall' ||
    uppercaseConverted === 'Spring' ||
    uppercaseConverted === 'Summer' ||
    uppercaseConverted === 'Intersession'
  ) {
    courseSemester = uppercaseConverted;
  }

  if (courseSemester === 'Fall') {
    return semester !== 'Fall';
  } else if (courseSemester === 'Spring') {
    return semester !== 'Spring' && semester !== 'Fall';
  } else if (courseSemester === 'Intersession') {
    return (
      semester !== 'Intersession' &&
      semester !== 'Spring' &&
      semester !== 'Fall'
    );
  }
  return false;
};

/**
 * @param plan the user's plan
 * @param course the course we are interested in
 * @returns the year of the course
 */
function getCourseYear(plan: Plan, course: UserCourse): Year | null {
  let year: Year | null = null;
  plan.years.forEach((currPlanYear) => {
    if (currPlanYear._id === course.year_id) {
      year = currPlanYear;
    }
  });
  return year;
}

/**
 * @param currCourses - user's courses
 * @param plan - user's plan
 * @param number - number of the course we are checking the prereqs
 * @param year - year of the course
 * @param semester -semester of the course
 * @param courseCache - course cache
 * @returns - whether the prereqs are all staisfied
 */
export const checkAllPrereqs = (
  currCourses: UserCourse[],
  plan: Plan,
  number: string,
  year: Year,
  semester: SemesterType,
  courseCache: SISRetrievedCourse[],
): Promise<boolean> => {
  return new Promise((resolve) => {
    getCourse(number, courseCache, currCourses, -1).then((course) => {
      if (course.resp !== null) {
        let filtered = filterNNegatives(course.resp);
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
                year,
                semester,
              );
              return resolve(bool);
            },
          );
        }
      } else {
        return resolve(false);
      }
    });
  });
};

export function getMajor(name: string): any {
  let majorObj = null;
  axios.get(getAPI(window) + '/majors/' + name).then((resp) => {
    if (resp === null) {
      throw Error('Major not found');
    }
    majorObj = resp.data.data;
  });
  return majorObj;
}

export async function getDistribution(distribution_id: string, token: string) {
  const res = await axios.get(
    getAPI(window) + `/distributions/${distribution_id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data.data;
}

export async function getDistributions(
  plan_id: string,
  major_id: string,
  token: string,
) {
  const res = await axios.get(getAPI(window) + '/distributionsByPlan/', {
    params: { plan_id, major_id },
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
}
