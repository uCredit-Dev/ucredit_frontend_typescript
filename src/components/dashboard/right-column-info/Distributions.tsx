import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import { getMajor } from "../../../resources/assets";
import { Major } from "../../../resources/commonTypes";
import {
  selectCurrentPlanCourses,
  selectPlan,
  selectTotalCredits,
} from "../../../slices/currentPlanSlice";
import { selectCourseCache } from "../../../slices/userSlice";
import CourseBar from "./CourseBar";
import DegreeReqs from "./DegreeReqs";
import {
  updateFulfilled,
  requirements,
  getRequirements,
} from "./distributionFunctions";

/**
 * Area in the right hand plan information that shows various elements of degree progression.
 */
const Distributions: FC = () => {
  const totalCredits = useSelector(selectTotalCredits);
  const courseCache = useSelector(selectCourseCache);
  const currPlanCourses = useSelector(selectCurrentPlanCourses);
  const currentPlan = useSelector(selectPlan);

  // Component state setup.
  const [distributionOpen, setDistributionOpen] = useState<boolean>(true);
  const [displayGeneral] = useState<boolean>(true); // Sets all distributions for distribution bars.
  const [disclaimer, setDisclaimer] = useState<boolean>(false);
  const [major, setMajor] = useState<Major | null>(null);
  const [ping, setPing] = useState<boolean>(false);
  const [distributions, setDistributions] = useState<
    [string, requirements[]][]
  >([]);

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [displayGeneral]);

  // Gets distribution everytime a plan changes.
  useEffect(() => {
    const distr = getDistributions();
    if (distr && distr.length > 0) {
      updateFulfilled(
        distr,
        currPlanCourses,
        courseCache,
        setPing,
        ping,
        setDistributions
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [major, currPlanCourses]);

  /**
   * Gets all distributions associated with current plan
   * @returns an array of pairs for distributions and their requirements if distributions exist and null if they don't
   */
  const getDistributions = (): [string, requirements[]][] | null => {
    let major: string | undefined = currentPlan.majors[0];
    if (major === undefined) {
      return null;
    }
    let majorObj: Major | undefined = getMajor(major);
    if (majorObj === undefined) {
      return null;
    }
    setMajor(majorObj);
    let distr = getRequirements(majorObj);
    return distr;
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
          uCredit is currently implemented by hand to match as closely to
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
        general={true}
        pong={ping}
      />
      <DegreeReqs
        distributionOpen={distributionOpen}
        pong={ping}
        distributions={distributions}
      />
    </div>
  );
};

export default Distributions;
