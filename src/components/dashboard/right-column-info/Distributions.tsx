import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMajor } from "../../../resources/assets";
import { Major } from "../../../resources/commonTypes";
import {
  selectCurrentPlanCourses,
  selectPlan,
} from "../../../slices/currentPlanSlice";
import DistributionBars from "./DistributionBars";

/**
 * Area in the right hand plan information that shows various elements of degree progression.
 */
const Distributions: FC = () => {
  const currentPlan = useSelector(selectPlan);
  const currPlanCourses = useSelector(selectCurrentPlanCourses);

  // Component state setup.
  const [distributionOpen, setDistributionOpen] = useState<boolean>(true);
  const [disclaimer, setDisclaimer] = useState<boolean>(false);
  const [major, setMajor] = useState<Major | null>(null);

  useEffect(() => {
    let major: string | undefined = currentPlan.majors[0];
    if (major === undefined) {
      return;
    }
    let majorObj: Major | undefined = getMajor(major);
    if (majorObj !== undefined) {
      setMajor(majorObj);
    }
  }, [currentPlan._id, currentPlan, currentPlan.majors, currPlanCourses]);

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
      <DistributionBars major={major} distributionOpen={distributionOpen} />
    </div>
  );
};

export default Distributions;
