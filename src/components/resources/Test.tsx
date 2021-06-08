import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { allMajors } from "../dashboard/majors/majors";
import { DistributionObj, Major } from "./commonTypes";

import { processPrereqs, getCourse } from "./assets";
import { selectAllCourses } from "../slices/userSlice";
import { Course, Plan } from "./commonTypes";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
//import { getRequirements, splitRequirements } from './body/right-column-info/distributionFunctions'

const bsCS = allMajors[1];

const Test = () => {
  const allCourses = useSelector(selectAllCourses);
  useEffect(() => {
    // const requirements = getRequirements(bsCS);
    // const processed = splitRequirements("AS.070.295[C]^OR^AS.190.108[C]^OR^AS.190.111[C]^OR^(AS.230.150[C]^AND^(Fall 2019[Y]^OR^Fall 2018[Y]))");
    // //const works = checkRequirementSatisfied(processed, "AS.190.108", allCourses);
    // console.log(requirements);
  });

  return <div></div>;
};

export default Test;
