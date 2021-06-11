import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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

  // Gets distribution everytime a plan changes.
  useEffect(() => {
    const distr = getDistributions();
    if (distr !== null) {
      updateFulfilled(distr, currPlanCourses, allCourses, currPlanCourses);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currPlanCourses.length, allCourses.length, currentPlan._id]);

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
  return (
    <div className="flex-none ml-4 mr-4 p-6 h-auto bg-white rounded shadow transform hover:scale-101 transition duration-200 ease-in">
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
      <div className="flex flex-row justify-evenly my-4">
        <button
          onClick={() => setDisplayGeneral(true)}
          className={clsx(
            "focus:outline-none transform hover:scale-110 transition duration-200 ease-in",
            {
              underline: displayGeneral,
            }
          )}
        >
          General
        </button>
        <button
          onClick={() => setDisplayGeneral(false)}
          className={clsx(
            "focus:outline-none transform hover:scale-110 transition duration-200 ease-in",
            {
              underline: !displayGeneral,
            }
          )}
        >
          Fine
        </button>
      </div>
      {distributionOpen
        ? distributions.map((pair) => {
            if (displayGeneral) {
              const dis = pair[1][0];
              return (
                <div key={dis.name}>
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
              let general = "";
              return pair[1].map((dis, index) => {
                if (index === 0) {
                  general = dis.name;
                  return <></>;
                }
                return (
                  <div key={dis.name}>
                    <div className="font-bold">
                      {index === 1 ? general : null}
                    </div>
                    <CourseBar
                      maxCredits={dis.required_credits}
                      plannedCredits={dis.fulfilled_credits}
                      currentCredits={dis.required_credits}
                      section={dis.name}
                      general={false}
                    />
                  </div>
                );
              });
            }
          })
        : null}
    </div>
  );
};

export default Distributions;
