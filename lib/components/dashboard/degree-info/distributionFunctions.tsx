import { Course, Major } from '../../../resources/commonTypes';

export type requirements = {
  name: string;
  expr: string;
  required_credits: number;
  fulfilled_credits: number;
  // TODO: add taken credits
  taken_credits: number;
  description: string;
  double_count?: string[];
  pathing?: number;
  wi?: boolean;
};

/**
 * Checks if a course satisfies a distribution.
 * @param distribution - the distribution requirement for the major containing an expression, an array where every entry is a seperate parentheses, OR/AND, requirement, or type, name of a class, and all courses
 * @param course - course we're checking for prereq satisfaction
 * @returns whether the class satisifies the requirement
 */
export const checkRequirementSatisfied = (
  distribution: requirements,
  course: Course,
): boolean => {
  if (distribution.expr.length === 0) {
    // Return true if there is no expression.
    return true;
  }
  const boolExpr: string | void = getBoolExpr(distribution, course);
  if (boolExpr.length !== 0) {
    // evaluate the expression if it exists,
    //eslint-disable-next-line no-eval
    return eval(boolExpr);
  } else {
    return false;
  }
};

/**
 * Gets a boolean expression based on which courses in the prereq string are fulfilled.
 * @param distribution - the distribution of the major to be satisfied containing expr, an array of reqs for the distribution
 * @param course - course we're checkinng for satisfaction
 * @returns a boolean expression in a string that describes the satisfaction of the distribution
 */
export const getBoolExpr = (
  distribution: requirements,
  course: Course,
): string => {
  let boolExpr: string = '';
  let index: number = 0;
  let concat: string = '';
  const splitArr: string[] = splitRequirements(distribution.expr);
  if (course === null) {
    return concat;
  }
  while (index < splitArr.length) {
    if (splitArr[index] === '(') {
      concat = '(';
    } else if (splitArr[index] === ')') {
      concat = ')';
    } else if (splitArr[index] === 'OR') {
      concat = '||';
    } else if (splitArr[index] === 'AND') {
      concat = '&&';
    } else if (splitArr[index] === 'NOT') {
      concat = '&&!';
    } else {
      concat = handleTagType(splitArr, index, course);
    }
    if (index === 0 && concat === '&&!') {
      boolExpr = boolExpr.concat('true');
    }
    if (concat.length > 3) {
      index = index + 2;
    } else index++;
    boolExpr = boolExpr.concat(concat);
  }
  return boolExpr;
};

const handleTagType = (
  splitArr: string[],
  index: number,
  course: Course,
): string => {
  let updatedConcat: string;
  switch (splitArr[index + 1]) {
    case 'C': // Course Number
      updatedConcat = course.number.includes(splitArr[index]).toString();
      break;
    case 'T': // Tag
      updatedConcat = (
        course?.tags !== undefined && course.tags.includes(splitArr[index])
      ).toString();
      break;
    case 'D': // Department
      updatedConcat = (course.department === splitArr[index]).toString();
      break;
    case 'Y': // Year
      //TODO: implement for year.
      updatedConcat = 'false';
      break;
    case 'A': // Area
      updatedConcat = (
        course.areas !== undefined &&
        course.areas !== 'None' &&
        course.areas.includes(splitArr[index])
      ).toString();
      break;
    case 'N': // Name
      updatedConcat = course.title.includes(splitArr[index]).toString();
      break;
    case 'W': //Written intensive
      updatedConcat = course.wi.toString();
      break;
    case 'L': // Level
      updatedConcat = handleLCase(splitArr, index, course);
      break;
    default:
      updatedConcat = 'false';
  }
  return updatedConcat;
};

// Handles the L case in the getBoolExpr function
const handleLCase = (splitArr, index, course): string => {
  let updatedConcat: string = '';
  if (splitArr[index].includes('Upper')) {
    if (course.number[7] >= '3') {
      updatedConcat = 'true';
    } else {
      updatedConcat = 'false';
    }
  } else if (splitArr[index].includes('Lower')) {
    if (course.number[7] <= '2') {
      updatedConcat = 'false';
    } else {
      updatedConcat = 'true';
    }
  } else if (course.number[7] === splitArr[index][0]) {
    // For solely 100, 200, etc. levels
    updatedConcat = 'true';
  } else {
    updatedConcat = 'false';
  }
  return updatedConcat;
};

// args: expression for requirments
// returns: an array where each entry is one of a requirement (always followed by type of requirement), parentheses, OR/AND,
export const splitRequirements = (expr: string): string[] => {
  let out: string[] = [];
  let index = 0;
  while (index < expr.length) {
    let pair = getNextEntry(expr, index);
    out.push(pair[0]);
    index = pair[1];
  }
  return out;
};

// args: expr to parse, index that we are currently on
// returns: the next piece, along with the index of start of the next next piece
const getNextEntry = (expr: string, index: number): [string, number] => {
  if (expr[index] === '(') {
    return ['(', index + 1];
  } else if (expr[index] === ')') {
    return [')', index + 1];
  } else if (expr[index] === '[') {
    return [expr[index + 1], index + 3];
  } else if (expr[index] === '^') {
    if (expr[index + 1] === 'O') {
      return ['OR', index + 4];
    } else if (expr[index + 1] === 'A') {
      return ['AND', index + 5];
    } else {
      return ['NOT', index + 5];
    }
  }
  let out = expr[index];
  index++;
  while (index < expr.length) {
    if (
      expr[index] === '(' ||
      expr[index] === ')' ||
      expr[index] === '[' ||
      expr[index] === '^'
    ) {
      return [out, index];
    }
    out = out.concat(expr[index]);
    index++;
  }
  return [out, index];
};

// args: major
// returns:
//  An array where where each entry corresponds to a distribution (e.g. CS, Math, Science, Liberal Arts, WI)
//  Each entry contains an array with descriptions, exprsesion for requirements, and credit requirements
export const getRequirements = (major: Major) => {
  let out: [string, requirements[]][] = [];
  major.distributions.forEach((element) => {
    let allReq: requirements[] = [];
    let general: requirements = {
      name: element.name.toString(),
      expr: element.criteria.toString(),
      required_credits: element.required_credits,
      fulfilled_credits: 0,
      taken_credits: 0,
      description: element.description,
      pathing: element.pathing,
      double_count: element.double_count,
    };
    allReq.push(general);
    if (element.fine_requirements !== undefined) {
      element.fine_requirements.forEach((fine) => {
        allReq = [
          ...allReq,
          {
            name: fine.description.toString(),
            expr: fine.criteria.toString(),
            required_credits: fine.required_credits,
            fulfilled_credits: 0,
            taken_credits: 0,
            description: '',
            double_count: fine.double_count,
          },
        ];
      });
    }
    let curReq: [string, requirements[]] = [element.name.toString(), allReq];
    out = [...out, curReq];
  });
  return out;
};
