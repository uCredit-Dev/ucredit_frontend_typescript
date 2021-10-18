import { FC, useState } from "react";
import FineDistribution from "./FineDistribution";
import clsx from "clsx";
import { requirements } from "./distributionFunctions";
import CourseBar from "./CourseBar";

const DegreeReqs: FC<{
  distributionOpen: boolean;
  pong: boolean;
  distributions: [string, requirements[]][];
}> = ({ distributionOpen, pong, distributions }) => {
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
  return (
    <div>
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
                    <CourseBar distribution={dis} general={true} pong={pong} />
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

export default DegreeReqs;
