import clsx from "clsx";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as Check } from "../../../resources/svg/CheckMark.svg";
import { ReactComponent as X } from "../../../resources/svg/Close.svg";
import {
  requirements,
  checkRequirementSatisfied,
  splitRequirements,
} from "./distributionFunctions";
import { selectCurrentPlanCourses } from "../../../slices/currentPlanSlice";
import { selectCourseCache } from "../../../slices/userSlice";
import { getCourse } from "../../../resources/assets";
import DistributionPopup from "./DistributionPopup";
import ReactHtmlParser from "react-html-parser";

type FineDistributionProps = {
  dis: requirements;
  distributionOpen: Boolean;
  hidden: Boolean;
};

/**
 * Component that displays fine requirements of a specific distribution.
 *
 * @prop dis - general distribution fine distribution is for.
 * @prop distributionOpen - whether this distribution bar is open or not.
 */
const FineDistribution = ({
  dis,
  distributionOpen,
  hidden,
}: FineDistributionProps) => {
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

  useEffect(() => {
    var temp = dis.fulfilled_credits;
    currPlanCourses.forEach((course) => {
      getCourse(course.number, courseCache, currPlanCourses).then((courseObj) => {
        if (
          courseObj != null &&
          checkRequirementSatisfied(splitRequirements(dis.expr), courseObj)
        ) {
          if (flipped.includes(course.number)) {
            temp -= course.credits;
          }
        } else {
          if (flipped.includes(course.number)) {
            temp += course.credits;
          }
        }
      })
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
        <p
          className={clsx("pr-2", {
            "overflow-y-hidden h-6 select-text": !showDistrDesc,
          })}
        >
          {ReactHtmlParser(dis.name)}
        </p>
      </button>
      <p className="font-bold">
        {plannedCredits}/{dis.required_credits}
      </p>
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
