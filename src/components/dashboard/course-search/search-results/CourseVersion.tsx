import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import { getColors } from "../../../../resources/assets";
import { selectVersion } from "../../../../slices/searchSlice";
import PrereqDisplay from "../prereqs/PrereqDisplay";

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

  // UseEffect runs when a new course is version.
  // It automatically updates the current area in the add course area selection to the first area in the course areas string.
  useEffect(() => {
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
  return (
    <>
      {version !== "None" ? (
        <>
          <div className="grid grid-cols-2 w-auto h-auto">
            <ReactTooltip />
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
                  className="flex items-center px-1 w-auto text-white font-semibold bg-secondary rounded select-none"
                  data-tip={version.credits + " credits"}
                >
                  {version.credits}
                </div>
              </div>
            </div>
            <div className="w-auto h-auto">
              <div className="flex flex-row items-center">
                <div className="mr-1 font-semibold">Areas:</div>
                {version.areas !== "None" ? (
                  version.areas.split("").map((area) => (
                    <div
                      className="flex flex-row items-center"
                      key={area + version.number}
                    >
                      <div
                        className="flex items-center px-1 w-auto text-white font-semibold rounded select-none"
                        style={{ backgroundColor: getColors(area)[0] }}
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
              <div className="flex flex-row">
                <span className="font-semibold">Tags: </span>
                <div className="flex flex-row ml-1">
                  {version.tags.map((tag, i) => (
                    <>
                      {i !== 0 ? ", " : null}
                      <div className="px-1 text-white font-semibold bg-primary rounded select-none">
                        {tag}
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-auto h-auto">
              <div>
                <span className="font-semibold">Restrictions: </span>
                {getRestrictions()}
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
                className="underline"
                onClick={() => {
                  setShowMore(1);
                }}
              >
                Show more...
              </button>
            ) : showMore === 1 ? (
              <button
                className="underline"
                onClick={() => {
                  setShowMore(0);
                }}
              >
                Show less...
              </button>
            ) : null}
            {/* <CourseEvalSection/> */}
            {/* <CourseEvalSection version={version}/> */}
          </div>
          <PrereqDisplay />
        </>
      ) : null}
    </>
  );
};

export default CourseVersion;
