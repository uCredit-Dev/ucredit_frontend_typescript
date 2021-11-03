import CourseBar from "./CourseBar";
import { FC, useEffect, useState } from "react";
import { Major } from "../../../resources/commonTypes";
import {
  selectCurrentPlanCourses,
  selectDistributions,
  selectTotalCredits,
  updateDistributions,
} from "../../../slices/currentPlanSlice";
import {
  updateFulfilled,
  requirements,
  getRequirements,
} from "./distributionFunctions";
import { useDispatch, useSelector } from "react-redux";
import { selectCourseCache } from "../../../slices/userSlice";
import clsx from "clsx";
import FineDistribution from "./FineDistribution";
import ReactTooltip from "react-tooltip";

/**
 * Distribution Bars in Components
 * @param major - major to display
 * @param distributionOpen - boolean to open or close distribution
 */
const DistributionBars: FC<{
  major: Major | null;
  distributionOpen: boolean;
}> = (props) => {
  const distributions = useSelector(selectDistributions);
  const dispatch = useDispatch();
  const totalCredits = useSelector(selectTotalCredits);
  const courseCache = useSelector(selectCourseCache);
  const currPlanCourses = useSelector(selectCurrentPlanCourses);

  const [showDistributions, setShowDistributions] = useState<boolean[]>(
    new Array(distributions.length)
  );

  /**
   * Changes whether fine distributions are hidden
   * @param i - the distribution's index amongst other distributions
   */
  const changeDistributionVisibility = (i: number) => {
    let showDistributionsCopy = showDistributions.slice();
    showDistributionsCopy[i] = !showDistributions[i];
    setShowDistributions(showDistributionsCopy);
  };

  // Gets distribution everytime a plan changes.
  useEffect(() => {
    const distr = getDistributions();
    if (distr && distr.length > 0) {
      updateFulfilled(distr, currPlanCourses, courseCache, setDistributions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.major, currPlanCourses]);

  const setDistributions = (distr: [string, requirements[]][]) => {
    dispatch(updateDistributions(distr));
  };

  /**
   * Gets all distributions associated with current plan
   * @returns an array of pairs for distributions and their requirements if distributions exist and null if they don't
   */
  const getDistributions = (): [string, requirements[]][] | null => {
    if (props.major) {
      let distr = getRequirements(props.major);
      return distr;
    }
    return null;
  };

  const [displayGeneral] = useState<boolean>(true); // Sets all distributions for distribution bars.
  useEffect(() => {
    ReactTooltip.rebuild();
  }, [displayGeneral, props.major]);

  const getDistributionText = (index: number): string =>
    showDistributions[index] === true
      ? "Hide Fine Requirements"
      : "Show Fine Requirements";

  return (
    <div>
      <CourseBar
        distribution={{
          name: "Total Credits",
          expr: "",
          required_credits:
            props.major !== null ? props.major.total_degree_credit : 0,
          fulfilled_credits: totalCredits,
          description:
            props.major !== null
              ? "This is the total amount of credits that is required for " +
                props.major.degree_name
              : "",
        }}
        general={true}
      />{" "}
      {distributions.map((pair, i) => {
        return (
          <div>
            {pair[1].map((dis, index) => {
              if (index === 0) {
                return (
                  <div
                    key={dis.name + index}
                    className={clsx({ hidden: !props.distributionOpen })}
                  >
                    <CourseBar distribution={dis} general={true} />
                  </div>
                );
              } else {
                return (
                  <div key={dis.name + index}>
                    <FineDistribution
                      dis={dis}
                      distributionOpen={props.distributionOpen}
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
                  { hidden: !props.distributionOpen }
                )}
              >
                {getDistributionText(i)}
              </button>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default DistributionBars;
