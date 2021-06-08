import {
  Course,
  Major,
  UserCourse,
  SISRetrievedCourse,
} from "../../resources/commonTypes";
import { getCourse } from "../../resources/assets";

// args: an array containing focus areas and their associated requirements, and all courses
// updates the requirements obj so that the fulfilled credits accurately reflects the plan
export const updateFulfilled = (
  requirements: [string, requirements[]][],
  courses: UserCourse[],
  allCourses: SISRetrievedCourse[]
) => {
  courses.forEach((course) => {
    const courseObj = getCourse(course.number, allCourses, "Any", "Any");
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
          requirement.fulfilled_credits += parseInt(courseObj.credits);
        }
      }
    }
  });
};

// args: array where every entry is a seperate parentheses, OR/AND, requirement, or type, name of a class, and all courses
// returns: whether the class satisifies the requirement
const checkRequirementSatisfied = (
  splitArr: string[],
  course: Course
): boolean => {
  let boolExpr = "";
  let index = 0;
  if (course === null) {
    return false;
  }
  let concat;
  while (index < splitArr.length) {
    if (splitArr[index] === "(") {
      concat = "(";
    } else if (splitArr[index] === ")") {
      concat = ")";
    } else if (splitArr[index] === "OR") {
      concat = "||";
    } else if (splitArr[index] === "AND") {
      concat = "&&";
    } else if (splitArr[index + 1] === "C") {
      if (splitArr[index] === course.number) {
        concat = "true";
      } else {
        concat = "false";
      }
    } else if (splitArr[index + 1] === "T") {
      if (course?.tags !== undefined && course.tags.includes(splitArr[index])) {
        concat = "true";
      } else {
        concat = "false";
      }
    } else if (splitArr[index + 1] === "D") {
      if (course.department === splitArr[index]) {
        concat = "true";
      } else {
        concat = "false";
      }
    } else if (splitArr[index + 1] === "Y") {
      //TODO: implement for year.
      concat = "false";
    } else {
      concat = "false";
    }
    concat.length > 2 ? (index = index + 2) : index++;
    boolExpr = boolExpr.concat(concat);
  }
  // eslint-disable-next-line no-eval
  return eval(boolExpr);
};

// args: expression for requirments
// returns: an array where each entry is one of a requirement (always followed by type of requirement), parentheses, OR/AND,
const splitRequirements = (expr: string): string[] => {
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
    } else {
      return ["AND", index + 5];
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

export type requirements = {
  name: string;
  expr: string;
  required_credits: number;
  fulfilled_credits: number;
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
      name: "General " + element.name.toString(),
      expr: element.criteria.toString(),
      required_credits: element.required_credits,
      fulfilled_credits: 0,
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
          },
        ];
      });
    }
    let curReq: [string, requirements[]] = [element.name.toString(), allReq];
    out = [...out, curReq];
  });
  return out;
};
