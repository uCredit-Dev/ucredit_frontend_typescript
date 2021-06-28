import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import { getMajor } from "../../../resources/assets";
import {
  selectPlan,
  selectCurrentPlanCourses,
} from "../../../slices/currentPlanSlice";
import { selectAllCourses } from "../../../slices/userSlice";
import CourseBar from "./CourseBar";
import {
  requirements,
  updateFulfilled,
  getRequirements,
} from "./distributionFunctions";
import { ReactComponent as Check } from "../../../resources/svg/CheckMark.svg"
import { ReactComponent as X } from "../../../resources/svg/Close.svg"

const Distributions = () => {
  const currentPlan = useSelector(selectPlan);
  const allCourses = useSelector(selectAllCourses);
  const currPlanCourses = useSelector(selectCurrentPlanCourses);

  // Component state setup.
  const [distributions, setDistributions] = useState<
    [string, requirements[]][]
  >([]);
  const [distributionOpen, setDistributionOpen] = useState<boolean>(true);
  const [displayGeneral, setDisplayGeneral] = useState<boolean>(true); // Sets all distributions for distribution bars.
  const [showDistributions, setShowDistributions] = useState<boolean[]>(new Array(distributions.length));
  // Gets distribution everytime a plan changes.
  useEffect(() => {
    const distr = getDistributions();
    if (distr !== null) {
      updateFulfilled(distr, currPlanCourses, allCourses, currPlanCourses);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currPlanCourses, allCourses]);

  const getDistributions = () => {
    let major = currentPlan.majors[0];
    if (major === undefined) {
      return null;
    }
    let majorObj = getMajor(major);
    if (majorObj === undefined) {
      return null;
    }
    let distr = getRequirements(majorObj);
    setDistributions(distr);
    return distr;
  };

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [displayGeneral, distributions]);

  const changeDistributionVisibility = (i : number) => {
    let showDistributionsCopy = showDistributions.slice();
    showDistributionsCopy[i] = !showDistributions[i];
    setShowDistributions(showDistributionsCopy);
  }

  return (
    <div className="flex-none ml-4 mr-4 p-6 w-coursebars h-auto bg-white rounded shadow">
      <div className="flex flex-row mb-3 w-full">
        <div className="self-start text-xl font-medium">
          Overall Distribution
        </div>
        <div className="relative flex-grow">
          <button
            className="absolute bottom-0 right-0 underline focus:outline-none transform hover:scale-110 transition duration-200 ease-in"
            onClick={() => {
              setDistributionOpen(!distributionOpen);
            }}
          >
            {distributionOpen ? "Hide" : "Show"}
          </button>
        </div>
      </div>
      {distributions.map((pair, i) => {
        return (
          <div>
            {pair[1].map((dis, index) => {
              if (index === 0) {
                return (
                  <div key={dis.name} className={clsx({"hidden" : !distributionOpen})}>
                    <CourseBar
                      maxCredits={dis.required_credits}
                      plannedCredits={dis.fulfilled_credits}
                      currentCredits={dis.required_credits}
                      section={dis.name}
                      general={true}
                    />
                  </div>
                );
              } else {
                return showDistributions[i] === true ? (
                  <div key={dis.name} className={clsx("flex justify-between", {"hidden" : !distributionOpen})}>
                    <div className="flex mb-1 whitespace-nowrap overflow-hidden overflow-ellipsis pr-2 w-full">
                      <div>
                        {dis.fulfilled_credits >= dis.required_credits ? <Check fill="green"/> : <X stroke="red"/>}
                      </div>
                      <p className="whitespace-nowrap overflow-hidden overflow-ellipsis pr-2">{dis.name}</p>
                    </div>
                    <p className="font-bold">{dis.fulfilled_credits}/{dis.required_credits}</p>
                  </div> 
                ) : null
              }
            })}
            <button
              onClick={() => {changeDistributionVisibility(i)}}
              className={clsx("focus:outline-none transform hover:scale-110 transition duration-200 ease-in underline", {"hidden" : !distributionOpen})}
            >
              {showDistributions[i] === true ? "Show Less" : "Show More"}
            </button>
          </div>
        )
      })}
    </div>
  );
};

export default Distributions;
