import { Course, SISRetrievedCourse } from "../../../../resources/commonTypes";
import { checkRequirementSatisfied, requirements } from "../../../dashboard/degree-info/distributionFunctions";

export const emptyRequirements: requirements = {
  name: "",
  expr: "",
  required_credits: 0,
  fulfilled_credits: 0,
  description: "",
};

// factory function for filtering, takes a requirement, returns a callback to filter acceptable courses.
export const filterBasedOnReq = (req: requirements) => {
  return (sisCourse: SISRetrievedCourse) => {
    let versions = sisCourse.versions;
    for (let i = 0; i < versions.length; i++) { // logic of this: goes through EVERY version of the coruse to find out ifit should displayitor not
        // actual course
      const newCourse: Course = { // double check this converstion
        title: sisCourse.title,
        number: sisCourse.number,
        ...sisCourse.versions[i],
      }
      if (checkRequirementSatisfied(req, newCourse)) return true;
    }
    return false;
  }
}