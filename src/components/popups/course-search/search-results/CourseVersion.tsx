import clsx from "clsx";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import { getColors } from "../../../../resources/assets";
import { selectVersion } from "../../../../slices/searchSlice";
import PrereqDisplay from "../prereqs/PrereqDisplay";
import CourseEvalSection from "./CourseEvalSection";
import { ReactComponent as Question } from "../../../../resources/svg/Question.svg";

/**
 * A component showing the specific version of the course at a particular semester/year
 * @param props - setInspected area is a function that sets the area to add this prospective course to.
 */
const CourseVersion = (props: { setInspectedArea: Function }) => {
  // Redux Setup
  const version = useSelector(selectVersion);

  // component state setup
  const bioElRef = useRef<HTMLParagraphElement>(null);
  const [showMore, setShowMore] = useState<number>(2);
  const [displayPreReqsView, setdisplayPreReqsView] = useState<Number>(1);

  // UseEffect runs when a new course is version.
  // It automatically updates the current area in the add course area selection to the first area in the course areas string.
  useEffect(() => {
    // Reset displayView for prereqs
    setdisplayPreReqsView(1);
    setShowMore(2);
    if (
      version !== "None" &&
      version.areas !== "None" &&
      version.areas !== undefined
    ) {
      const firstArea = version.areas.charAt(0);
      if (
        firstArea === "N" ||
        firstArea === "S" ||
        firstArea === "H" ||
        firstArea === "Q" ||
        firstArea === "E"
      ) {
        props.setInspectedArea(firstArea);
      }
    } else {
      props.setInspectedArea("None");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version]);

  // Everytime the inspected course changes or someone presses show more, update description height.
  useEffect(() => {
    let hasOverflowingChildren = false;
    if (bioElRef.current !== null) {
      const bioEl: HTMLParagraphElement = bioElRef.current;
      hasOverflowingChildren =
        bioEl.offsetHeight < bioEl.scrollHeight ||
        bioEl.offsetWidth < bioEl.scrollWidth;
    }
    if (hasOverflowingChildren && showMore === 2) {
      setShowMore(0);
    }
  }, [showMore, bioElRef, version]);

  // Gets course restrictions
  const getRestrictions = () => {
    if (version !== "None") {
      const restrictions = version.restrictions.map(
        (restriction) => restriction.RestrictionName
      );
      if (restrictions.length !== 0) {
        return restrictions;
      } else {
        return "No Restrictions!";
      }
    }
  };

  const getAreaName = (area: string): string => {
    if (area === "N") {
      return "Natural Sciences";
    } else if (area === "E") {
      return "Engineering";
    } else if (area === "S") {
      return "Social Sciences";
    } else if (area === "H") {
      return "Humanities";
    } else if (area === "Q") {
      return "Quantitative";
    } else {
      return "None";
    }
  };

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [displayPreReqsView]);

  return (
    <>
      {version !== "None" ? (
        <>
          <div className="tight:flex grid tight:flex-col grid-cols-2 w-auto h-auto">
            <div className="w-auto h-auto">
              <div className="flex flex-row items-center">
                <div className="mr-1 font-semibold">Number: </div>
                {version.number}
              </div>
            </div>
            <div className="w-auto h-auto">
              <div className="flex flex-row items-center">
                <div className="mr-1 font-semibold">Credit: </div>
                <div
                  className="flex items-center px-1 w-auto text-white font-semibold bg-secondary rounded select-none transform hover:scale-110 transition duration-200 ease-in"
                  data-tip={version.credits + " credits"}
                  data-for="godTip"
                >
                  {version.credits}
                </div>
              </div>
            </div>
            <div className="w-auto h-auto">
              <div className="flex flex-row items-center">
                <div className="flex flex-row mr-1 font-semibold">
                  Areas
                  <div className="flex-grow mt-1">
                    <Question
                      className="h-4"
                      data-for="godTip"
                      data-tip={
                        "<p>Areas designate the specific subset a course belongs to. Each degree requires students to take a certain amount of credits or courses in a spcific area.</p><p>H - Humanities</p><p>S - Social Sciences</p><p>E - Engineering</p><p>N - Natural Sciences</p><p>Q - Quantitative</p>"
                      }
                    />
                  </div>
                  :
                </div>
                {version.areas !== "None" ? (
                  version.areas.split("").map((area) => (
                    <div
                      className="flex flex-row items-center transform hover:scale-110 transition duration-200 ease-in"
                      key={area + version.number}
                    >
                      <div
                        className="flex items-center px-1 w-auto text-white font-semibold rounded select-none"
                        style={{ backgroundColor: getColors(area)[0] }}
                        data-tip={getAreaName(area)}
                        data-for="godTip"
                      >
                        {area}
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    className="flex items-center px-1 w-auto text-white font-semibold rounded select-none"
                    style={{ backgroundColor: getColors(version.areas)[0] }}
                  >
                    None
                  </div>
                )}
              </div>
              <div>
                <span className="font-semibold">Department: </span>
                {version.department}
              </div>
              <div className="flex flex-row w-full h-auto">
                <span className="flex flex-row font-semibold">
                  Tags
                  <div className="flex-grow mt-1">
                    <Question
                      className="h-4"
                      data-for="godTip"
                      data-tip={
                        "<p>Many degree and a few courses require students to complete a specific amount of courses under a certain tag.</p><p>These usually come in the form of 3-4 letters designating department (ie. CSC = Computer Science) followed by 2+ letters signalling the specific subgroup designation within the department (ie. SOFT = Software).</p>"
                      }
                    />
                  </div>
                  :{" "}
                </span>
                <div className="flex flex-row flex-wrap ml-1">
                  {version.tags.length === 0 ? (
                    "No tags!"
                  ) : (
                    <>
                      {version.tags.map((tag, i) => (
                        <>
                          {i !== 0 ? ", " : null}
                          <div className="mt-1 px-1 w-max text-white font-semibold bg-blue-500 rounded transform hover:scale-101 transition duration-200 ease-in">
                            {tag}
                          </div>
                        </>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="w-auto h-auto">
              <div>
                <span className="font-semibold">Restrictions: </span>
                {getRestrictions()}
              </div>
              <div className="w-auto h-auto">
                <div>
                  <span className="font-semibold">Level: </span>
                  {version.level}
                </div>
              </div>
              <div className="w-auto h-auto">
                <div>
                  <span className="font-semibold">Writing Intensive: </span>
                  {version.wi ? "Yes" : "No"}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-3 mt-3">
            <p
              className="font-normal overflow-y-hidden"
              style={{ maxHeight: showMore === 1 ? "100%" : "6rem" }}
              ref={bioElRef}
            >
              {version.bio}
            </p>

            {showMore === 0 ? (
              <button
                className="underline focus:outline-none transform"
                onClick={() => {
                  setShowMore(1);
                }}
              >
                Show more...
              </button>
            ) : showMore === 1 ? (
              <button
                className="underline focus:outline-none transform"
                onClick={() => {
                  setShowMore(0);
                }}
              >
                Show less...
              </button>
            ) : null}
          </div>
          <div className="flex flex-row border-b-2">
            <button
              className={clsx(
                "mr-3 text-xl font-medium hover:border-b-2 border-secondary focus:outline-none",
                {
                  "border-b-2 -mb-0.5": displayPreReqsView === 1,
                  "hover:-mb-0.5": displayPreReqsView !== 1,
                }
              )}
              onClick={() => {
                setdisplayPreReqsView(1);
              }}
            >
              Prerequisites
            </button>
            <button
              className={clsx(
                "mr-3 text-xl font-medium hover:border-b-2 border-secondary focus:outline-none",
                {
                  "border-b-2 -mb-0.5": displayPreReqsView === 0,
                  "hover:-mb-0.5": displayPreReqsView !== 0,
                }
              )}
              onClick={() => {
                setdisplayPreReqsView(0);
              }}
            >
              Course Evaluation
            </button>{" "}
          </div>
          {displayPreReqsView === 1 ? <PrereqDisplay /> : <CourseEvalSection />}
        </>
      ) : null}
    </>
  );
};

export default CourseVersion;
