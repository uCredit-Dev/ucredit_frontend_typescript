import clsx from "clsx";
import { useState, useEffect, FC } from "react";
import { useSelector } from "react-redux";
import { selectCurrentPlanCourses } from "../../../slices/currentPlanSlice";
import { requirements } from "./distributionFunctions";
import { ReactComponent as CheckSvg } from "../../../resources/svg/Check.svg";
import DistributionPopup from "./DistributionPopup";

/**
 * A distribution bar.
 * @prop distribution - the distribution the bar refers to
 * @prop general - if this is a general distribution
 * @prop description - this is the description of the distribution
 * @prop total - whether this is a course bar tracking the total amount of credits
 */
const CourseBar: FC<{
  distribution: requirements;
  general: boolean;
  description: string;
  total: boolean;
}> = ({ distribution, general, description, total }) => {
  const [displayAdd, setDisplayAdd] = useState(false);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [plannedCredits, setPlannedCredits] = useState(
    distribution.fulfilled_credits
  );

  const currPlanCourses = useSelector(selectCurrentPlanCourses);
  const maxCredits = distribution.required_credits;
  const section = distribution.name;

  const remainingCredits =
    plannedCredits <= maxCredits ? maxCredits - plannedCredits : 0;

  // Decides how filled the credit bar is.
  useEffect(() => {
    let temp = distribution.fulfilled_credits;
    setPlannedCredits(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currPlanCourses,
    distribution.expr,
    flipped,
    distribution.fulfilled_credits,
  ]);

  const tooltip =
    `<div style="overflow: wrap; margin-bottom: 1rem;">${section}</div>` +
    `<div style="margin-bottom: 1rem;">${description}</div>` +
    `<div style='width: 90px; height: auto;'><div style='width: 100%; display: flex; flex-direction: row; justify-content: space-between;'>` +
    `<div>Planned</div><div>${plannedCredits}</div></div><div style='display: flex; flex-direction: row; justify-content: space-between;'>${
      remainingCredits !== 0
        ? `<div>Remaining</div><div>${remainingCredits}</div></div>`
        : `<div style="width: 100%; height: auto; display: flex; flex-direction: row; justify-content: center">Completed!</div>`
    }</div>`;

  const closePopup = () => {
    setDisplayAdd(false);
  };

  const onSave = (s: string[]) => {
    setFlipped(s);
  };

  return (
    <>
      {displayAdd ? (
        <DistributionPopup
          distribution={distribution}
          cleanup={closePopup}
          save={onSave}
          flipped={flipped.slice()}
        />
      ) : null}
      <div
        className={clsx(
          "text mb-1 whitespace-nowrap overflow-hidden overflow-ellipsis",
          {
            "font-bold": general,
          }
        )}
        key={section}
      >
        {section}
      </div>
      <div
        className="relative flex flex-row w-full h-6 bg-gray-200 rounded transform hover:scale-101 transition duration-200 ease-in"
        data-tip={tooltip}
        data-for="godTip"
      >
        <div
          className="relative flex flex-row mb-2 w-full h-6 bg-gray-200 rounded transform hover:scale-105 transition duration-200 ease-in"
          data-tip={tooltip}
          data-for="godTip"
        >
          <div
            className="h-full bg-blue-300 rounded"
            style={{
              width: `${
                plannedCredits <= maxCredits
                  ? (plannedCredits / maxCredits) * 100 + "%"
                  : "100%"
              }`,
            }}
          />
          {remainingCredits === 0 ? (
            <CheckSvg className="absolute left-1/2 top-1/2 w-5 h-5 text-white stroke-2 transform -translate-x-1/2 -translate-y-1/2" />
          ) : null}
        </div>
        {/* <Add
          className="h-6 transform hover:scale-150 transition duration-200 ease-in"
          onClick={addToDistribution}
        /> */}
      </div>
    </>
  );
};

export default CourseBar;
