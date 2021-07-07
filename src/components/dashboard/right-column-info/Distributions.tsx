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
import FineDistribution from "./FineDistribution";

const Distributions = () => {
  const currentPlan = useSelector(selectPlan);
  const allCourses = useSelector(selectAllCourses);
  const currPlanCourses = useSelector(selectCurrentPlanCourses);

  // Component state setup.
  const [distributions, setDistributions] = useState<
    [string, requirements[]][]
  >([]);
  const [distributionOpen, setDistributionOpen] = useState<boolean>(true);
  const [displayGeneral] = useState<boolean>(true); // Sets all distributions for distribution bars.
  const [showDistributions, setShowDistributions] = useState<boolean[]>(
    new Array(distributions.length)
  );

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

  const changeDistributionVisibility = (i: number) => {
    let showDistributionsCopy = showDistributions.slice();
    showDistributionsCopy[i] = !showDistributions[i];
    setShowDistributions(showDistributionsCopy);
  };

  return (
    <div className="flex-none mx-4 p-6 w-96 h-auto bg-white rounded shadow">
      <div className="flex flex-row mb-3 w-full">
        <div className="self-start text-2xl font-medium">Degree Progress</div>
        <div className="relative flex-grow">
          <button
            className="absolute bottom-1 right-0 underline focus:outline-none transform hover:scale-110 transition duration-200 ease-in"
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
                  <div
                    key={dis.name}
                    className={clsx({ hidden: !distributionOpen })}
                  >
                    <CourseBar
                      distribution={dis}
                      general={true}
                      description={dis.description}
                    />
                  </div>
                );
              } else {
                return (
                  <FineDistribution
                    dis={dis}
                    distributionOpen={distributionOpen}
                    hidden={showDistributions[i] !== true}
                  />
                );
              }
            })}
            {pair[1].length > 1 ? (
              <button
                onClick={() => {
                  changeDistributionVisibility(i);
                }}
                className={clsx(
                  "mb-2 underline text-sm focus:outline-none transform hover:scale-101 transition duration-200 ease-in",
                  { hidden: !distributionOpen }
                )}
              >
                {showDistributions[i] === true
                  ? "Hide Fine Requirements"
                  : "Show Fine Requirements"}
              </button>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default Distributions;
