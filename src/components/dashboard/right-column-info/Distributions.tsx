import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import { getMajor } from "../../../resources/assets";
import { Major } from "../../../resources/commonTypes";
import {
  selectPlan,
  selectCurrentPlanCourses,
  selectTotalCredits,
} from "../../../slices/currentPlanSlice";
import { selectCourseCache } from "../../../slices/userSlice";
import CourseBar from "./CourseBar";
import {
  requirements,
  updateFulfilled,
  getRequirements,
} from "./distributionFunctions";
import FineDistribution from "./FineDistribution";

const Distributions = () => {
  const currentPlan = useSelector(selectPlan);
  const courseCache = useSelector(selectCourseCache);
  const currPlanCourses = useSelector(selectCurrentPlanCourses);
  const totalCredits = useSelector(selectTotalCredits);

  // Component state setup.
  const [distributions, setDistributions] = useState<
    [string, requirements[]][]
  >([]);
  const [distributionOpen, setDistributionOpen] = useState<boolean>(true);
  const [displayGeneral] = useState<boolean>(true); // Sets all distributions for distribution bars.
  const [showDistributions, setShowDistributions] = useState<boolean[]>(
    new Array(distributions.length)
  );
  const [major, setMajor] = useState<Major | null>(null);
  const [disclaimer, setDisclaimer] = useState<boolean>(false);

  // Gets distribution everytime a plan changes.
  useEffect(() => {
    const distr = getDistributions();
    if (distr !== null) {
      updateFulfilled(distr, currPlanCourses, courseCache, currPlanCourses);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currPlanCourses]);

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [displayGeneral, distributions]);

  const getDistributions = () => {
    let major = currentPlan.majors[0];
    if (major === undefined) {
      return null;
    }
    let majorObj = getMajor(major);
    if (majorObj === undefined) {
      return null;
    }
    setMajor(majorObj);
    let distr = getRequirements(majorObj);
    setDistributions(distr);
    return distr;
  };

  const changeDistributionVisibility = (i: number) => {
    let showDistributionsCopy = showDistributions.slice();
    showDistributionsCopy[i] = !showDistributions[i];
    setShowDistributions(showDistributionsCopy);
  };

  return (
    <div className="flex-none mx-4 p-6 w-96 h-auto bg-white rounded shadow">
      <div className="flex flex-row mb-3 w-full">
        <div className="self-start text-2xl font-medium">Degree Progress</div>
        <button
          className="ml-1 mt-1 w-24 h-6 text-center bg-red-100 rounded"
          onClick={() => setDisclaimer(!disclaimer)}
        >
          Please read
        </button>
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
      {disclaimer ? (
        <div>
          <b> This feature is still being refined. </b> Degree criteria on
          uCredit iscurrently implemented by hand to match as closely to
          university requirements as possible. However, there may be some
          inconsistencies. Please use the
          <a
            href={major !== null ? major.url : ""}
            className="mx-1 text-blue-400"
            target="_blank"
            rel="noreferrer"
          >
            official undergraduate advising manual
          </a>
          and the{" "}
          <a
            href="https://sis.jhu.edu/sswf/"
            className="text-blue-400"
            target="_blank"
            rel="noreferrer"
          >
            SIS degree audit
          </a>{" "}
          to double check that your degree is being correctly tracked. Please
          report any issues in the feedback form.
        </div>
      ) : null}
      <CourseBar
        distribution={{
          name: "Total Credits",
          expr: "",
          required_credits: major !== null ? major.total_degree_credit : 0,
          fulfilled_credits: totalCredits,
          description:
            major !== null
              ? "This is the total amount of credits that is required for " +
                major.degree_name
              : "",
        }}
        total={true}
        general={true}
        description={
          major !== null
            ? "This is the total amount of credits that is required for " +
              major.degree_name +
              "."
            : ""
        }
      />
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
                      total={false}
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
