import {
  Course,
  Major,
  UserCourse,
  SISRetrievedCourse,
} from "../../../resources/commonTypes";
import { getCourse } from "../../../resources/assets";

export type requirements = {
  name: string;
  expr: string;
  required_credits: number;
  fulfilled_credits: number;
  description: string;
  wi?: boolean;
};

/**
 * args: an array containing focus areas and their associated requirements, and all courses
 * updates the requirements obj so that the fulfilled credits accurately reflects the plan
 * @param requirements - an array of requirement pairs
 * @param courses
 * @param courseCache - cached courses
 * @param currPlanCourses - courses in current plan
 */
export const updateFulfilled = (
  requirements: [string, requirements[]][],
  courses: UserCourse[],
  courseCache: SISRetrievedCourse[],
  currPlanCourses: UserCourse[]
) => {
  courses.forEach((course) => {
    getCourse(course.number, courseCache, currPlanCourses).then((courseObj) => {
      if (courseObj === null || courseObj === undefined) {
        return;
      }
      for (let i = 0; i < requirements.length; i++) {
        for (let j = 0; j < requirements[i][1].length; j++) {
          let requirement = requirements[i][1][j];
          if (
            checkRequirementSatisfied(
              splitRequirements(requirement.expr),
              courseObj
            )
          ) {
            requirement.fulfilled_credits += parseFloat(courseObj.credits);
          }
        }
      }
    });
  });
};

/**
 * Checks if a course satisfies a distribution.
 * @param splitArr - array where every entry is a seperate parentheses, OR/AND, requirement, or type, name of a class, and all courses
 * @param course - course we're checking for prereq satisfaction
 * @returns whether the class satisifies the requirement
 */
export const checkRequirementSatisfied = (
  splitArr: string[],
  course: Course
): boolean => {
  const boolExpr: string | void = getBoolExpr(splitArr, course);
  if (boolExpr.length !== 0) {
    //eslint-disable-next-line no-eval
    return eval(boolExpr);
  } else {
    return false;
  }
};

/**
 * Gets a boolean expression based on which courses in the prereq string are fulfilled.
 * @param splitArr - an array of reqs for the distribution
 * @param course - course we're checkinng for satisfaction
 * @returns a boolean expression in a string that describes the satisfaction of the distribution
 */
export const getBoolExpr = (splitArr: string[], course: Course): string => {
  let boolExpr: string = "";
  let index: number = 0;
  let concat: string;
  if (course === null) {
    return "";
  }
  while (index < splitArr.length) {
    if (splitArr[index] === "(") {
      concat = "(";
    } else if (splitArr[index] === ")") {
      concat = ")";
    } else if (splitArr[index] === "OR") {
      concat = "||";
    } else if (splitArr[index] === "AND") {
      concat = "&&";
    } else if (splitArr[index] === "NOT") {
      concat = "&&!";
    } else {
      switch (splitArr[index + 1]) {
        case "C": // Course Number
          if (splitArr[index] === course.number) {
            concat = "true";
          } else {
            concat = "false";
          }
          break;
        case "T": // Tag
          if (
            course?.tags !== undefined &&
            course.tags.includes(splitArr[index])
          ) {
            concat = "true";
          } else {
            concat = "false";
          }
          break;
        case "D": // Department
          if (course.department === splitArr[index]) {
            concat = "true";
          } else {
            concat = "false";
          }
          break;
        case "Y": // Year
          //TODO: implement for year.
          concat = "false";
          break;
        case "A": // Area
          if (
            course.areas !== "None" &&
            course.areas.includes(splitArr[index])
          ) {
            concat = "true";
          } else {
            concat = "false";
          }
          break;
        case "N": // Name
          if (course.title.includes(splitArr[index])) {
            concat = "true";
          } else {
            concat = "false";
          }
          break;
        case "W": //Written intensive
          if (course.wi) {
            concat = "true";
          } else {
            concat = "false";
          }
          break;
        case "L": // Level
          if (splitArr[index].includes("Upper")) {
            if (course.number[7] >= "3") {
              concat = "true";
            } else {
              concat = "false";
            }
          } else if (splitArr[index].includes("Lower")) {
            if (course.number[7] <= "2") {
              concat = "false";
            } else {
              concat = "true";
            }
          } else if (course.number[7] === splitArr[index][0]) {
            // For solely 100, 200, etc. levels
            concat = "true";
          } else {
            concat = "false";
          }
          break;
        default:
          concat = "false";
      }
    }
    concat.length > 3 ? (index = index + 2) : index++;
    boolExpr = boolExpr.concat(concat); // Causing issues with biology major.
  }
  return boolExpr;
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
  if (expr[index] === "(") {
    return ["(", index + 1];
  } else if (expr[index] === ")") {
    return [")", index + 1];
  } else if (expr[index] === "[") {
    return [expr[index + 1], index + 3];
  } else if (expr[index] === "^") {
    if (expr[index + 1] === "O") {
      return ["OR", index + 4];
    } else if (expr[index + 1] === "A") {
      return ["AND", index + 5];
    } else {
      return ["NOT", index + 5];
    }
  }
  let out = expr[index];
  index++;
  while (index < expr.length) {
    if (
      expr[index] === "(" ||
      expr[index] === ")" ||
      expr[index] === "[" ||
      expr[index] === "^"
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
      //name: "General " + element.name.toString(),
      name: element.name.toString(),
      expr: element.criteria.toString(),
      required_credits: element.required_credits,
      fulfilled_credits: 0,
      description: element.description,
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
            description: "",
          },
        ];
      });
    }
    let curReq: [string, requirements[]] = [element.name.toString(), allReq];
    out = [...out, curReq];
  });
  return out;
};
