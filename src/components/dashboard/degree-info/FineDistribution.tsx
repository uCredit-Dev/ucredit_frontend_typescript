import clsx from "clsx";
import { useState, useEffect, FC } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as Check } from "../../../resources/svg/CheckMark.svg";
import { ReactComponent as X } from "../../../resources/svg/Close.svg";
import parse from "html-react-parser";
import {
  requirements,
  checkRequirementSatisfied,
} from "./distributionFunctions";
import { selectCurrentPlanCourses } from "../../../slices/currentPlanSlice";
import { selectCourseCache } from "../../../slices/userSlice";
import { getCourse } from "../../../resources/assets";
import DistributionPopup from "./DistributionPopup";

/**
 * Component that displays fine requirements of a specific distribution.
 * @prop dis - general distribution fine distribution is for.
 * @prop distributionOpen - whether this distribution bar is open or not.
 */
const FineDistribution: FC<{
  dis: requirements;
  distributionOpen: boolean;
  hidden: boolean;
}> = ({ dis, distributionOpen, hidden }) => {
  const [showDistrDesc, setShowDistrDesc] = useState<boolean>(false);
  const [displayAdd, setDisplayAdd] = useState(false);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [plannedCredits, setPlannedCredits] = useState(dis.fulfilled_credits);

  const courseCache = useSelector(selectCourseCache);
  const currPlanCourses = useSelector(selectCurrentPlanCourses);

  const closePopup = () => {
    setDisplayAdd(false);
  };

  const onSave = (s: string[]) => {
    setFlipped(s);
  };

  // Updates fine distribution progress
  useEffect(() => {
    let temp = dis.fulfilled_credits;
    currPlanCourses.forEach((course) => {
      getCourse(course.number, courseCache, currPlanCourses, -1).then(
        (courseObj) => {
          if (
            courseObj.resp != null &&
            checkRequirementSatisfied(dis, courseObj.resp)
          ) {
            if (flipped.includes(course.number)) {
              temp -= course.credits;
            }
          } else {
            if (flipped.includes(course.number)) {
              temp += course.credits;
            }
          }
        }
      );
    });
    setPlannedCredits(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currPlanCourses, dis.expr, flipped, dis.fulfilled_credits]);

  return (
    <div
      key={dis.name}
      className={clsx("flex justify-between w-full", {
        hidden: !distributionOpen || hidden,
      })}
    >
      <button
        onClick={() => {
          setShowDistrDesc(!showDistrDesc);
        }}
        className="flex mb-1 pr-2 w-full h-auto text-left focus:outline-none overflow-hidden transform hover:scale-101 transition duration-200 ease-in overflow-ellipsis"
      >
        <div>
          {plannedCredits >= dis.required_credits ? (
            <Check fill="green" />
          ) : (
            <X stroke="red" />
          )}
        </div>
        <div
          className={clsx("pr-2", {
            "overflow-y-hidden h-6 select-text": !showDistrDesc,
          })}
        >
          {parse(dis.name)}
        </div>
      </button>
      <div className="font-bold">
        {plannedCredits}/{dis.required_credits}
      </div>
      {/* <Add
        className="h-6 transform hover:scale-150 transition duration-200 ease-in"
        onClick={addToDistribution}
      /> */}
      {displayAdd ? (
        <DistributionPopup
          distribution={dis}
          cleanup={closePopup}
          save={onSave}
          flipped={flipped.slice()}
        />
      ) : null}
    </div>
  );
};

export default FineDistribution;
