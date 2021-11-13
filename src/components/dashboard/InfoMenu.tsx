import { FC, useEffect, useState } from "react";
import Distributions from "./right-column-info/Distributions";
import clsx from "clsx";
import FineDistribution from "./right-column-info/FineDistribution";
import CourseBar from "./right-column-info/CourseBar";
import {
  getRequirements,
  requirements,
  updateFulfilled,
} from "./right-column-info/distributionFunctions";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentPlanCourses,
  selectDistributions,
  selectPlan,
  updateDistributionBarJSX,
  updateDistributions,
} from "../../slices/currentPlanSlice";
import { selectCourseCache } from "../../slices/userSlice";
import { getMajor } from "../../resources/assets";
import { Major } from "../../resources/commonTypes";

/**
 * Info menu shows degree plan and degree information.
 * Hidden on default.
 */
const InfoMenu: FC = () => {
  const dispatch = useDispatch();
  const distributions = useSelector(selectDistributions);
  const currentPlan = useSelector(selectPlan);
  const courseCache = useSelector(selectCourseCache);
  const currPlanCourses = useSelector(selectCurrentPlanCourses);

  const [infoOpen, setInfoOpen] = useState(false);
  const [showDistributions, setShowDistributions] = useState<boolean[]>(
    new Array(distributions.length)
  );
  const [distributionOpen, setDistributionOpen] = useState<boolean>(true);
  const [major, setMajor] = useState<Major | null>(null);

  // Update major when plan changes
  useEffect(() => {
    let firstMajor: string | undefined = currentPlan.majors[0];
    if (firstMajor === undefined) {
      return;
    }
    let majorObj: Major | undefined = getMajor(firstMajor);
    if (majorObj !== undefined) {
      setMajor(majorObj);
    }
  }, [currentPlan._id, currentPlan, currentPlan.majors, currPlanCourses]);

  // Gets distribution everytime a plan changes.
  useEffect(() => {
    const distr = getDistributions();
    if (distr && distr.length > 0) {
      updateFulfilled(distr, currPlanCourses, courseCache, setDistributions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [major, currPlanCourses]);

  const setDistributions = (distr: [string, requirements[]][]) => {
    dispatch(updateDistributions(distr));
  };

  /**
   * Gets all distributions associated with current plan
   * @returns an array of pairs for distributions and their requirements if distributions exist and null if they don't
   */
  const getDistributions = (): [string, requirements[]][] | null => {
    if (major) {
      let distr = getRequirements(major);
      return distr;
    }
    return null;
  };

  // Update displayed JSX every time distributions get updated.
  useEffect(() => {
    const distributionJSX = distributions.map(
      (pair: [string, requirements[]], i: number) => {
        return (
          <div key={pair[0] + pair[1] + i}>
            {pair[1].map((dis, index) => {
              if (index === 0) {
                return (
                  <div
                    key={dis.name + index + dis.expr}
                    className={clsx({ hidden: !distributionOpen })}
                  >
                    <CourseBar distribution={dis} general={true} />
                  </div>
                );
              } else {
                return (
                  <div key={dis.name + index + dis.expr}>
                    <FineDistribution
                      dis={dis}
                      distributionOpen={distributionOpen}
                      hidden={showDistributions[i] !== true}
                    />
                  </div>
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
                {getDistributionText(i)}
              </button>
            ) : null}
          </div>
        );
      }
    );
    dispatch(updateDistributionBarJSX(distributionJSX));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [distributions]);

  /**
   * Changes whether fine distributions are hidden
   * @param i - the distribution's index amongst other distributions
   */
  const changeDistributionVisibility = (i: number) => {
    let showDistributionsCopy = showDistributions.slice();
    showDistributionsCopy[i] = !showDistributions[i];
    setShowDistributions(showDistributionsCopy);
  };

  const getDistributionText = (index: number): string =>
    showDistributions[index] === true
      ? "Hide Fine Requirements"
      : "Show Fine Requirements";
  return (
    <div
      className="fixed z-50 right-0 flex flex-col justify-between mt-20 w-10"
      style={{ height: "76vh" }}
    >
      <div className="my-auto transform -rotate-90">
        <button
          className="w-32 h-10 text-center text-white font-bold hover:bg-blue-400 bg-green-400 bg-white rounded focus:outline-none shadow hover:scale-105 transition duration-200 ease-in"
          onClick={() => {
            setInfoOpen(!infoOpen);
          }}
        >
          Plan Overview
        </button>
      </div>
      {infoOpen ? (
        <div className="absolute z-50 right-14 top-8 ml-5 p-4 px-0 w-max max-h-full bg-white bg-opacity-90 rounded shadow overflow-y-scroll">
          {/* <InfoCards /> */}
          <Distributions
            major={major}
            setMajor={setMajor}
            distributionOpen={distributionOpen}
            setDistributionOpen={setDistributionOpen}
          />
        </div>
      ) : null}
    </div>
  );
};

export default InfoMenu;
