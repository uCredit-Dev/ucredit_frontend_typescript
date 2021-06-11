import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { ReactComponent as ChevronRight } from "../../../../resources/svg/ChevronRight.svg";
import { ReactComponent as ChevronDown } from "../../../../resources/svg/ChevronDown.svg";
import { ReactComponent as CheckMark } from "../../../../resources/svg/CheckMark.svg";

/**
 * This is one of the open-close prereq dropdowns.
 * @param text - the raw text of the dropdown
 * @param satisfied - whether the dropdown is satisfied
 * @param element - the parsed version of the raw text
 * @param getNonStringPrereq - function called to get a parsed prereq object
 * @param or - whether this dropdown is an or or and dropdown.
 */
const PrereqDropdown = (props: {
  text: string;
  satisfied: boolean;
  element: string[];
  getNonStringPrereq: Function;
  or: boolean;
}) => {
  const [open, setOpen] = useState<boolean>(true);
  const [trulySatisfied, setTrulySatisfied] = useState<boolean>(false);
  const [rootHovered, setRootHovered] = useState<boolean>(false);

  useEffect(() => {
    if (props.satisfied) {
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getChildPrereqs = () => {
    let orAndSatisfied = false;
    const alreadyDisplayed: React.Key[] = [];

    // eslint-disable-next-line array-callback-return
    return props.element.map((el: any, index) => {
      if (typeof el !== "number") {
        const parsed: {
          satisfied: boolean;
          jsx: JSX.Element;
        } = props.getNonStringPrereq(el);

        // If we already put this course in our prereqs, skip displaying it.
        if (
          parsed.jsx.key !== null &&
          alreadyDisplayed.includes(parsed.jsx.key)
        ) {
          // eslint-disable-next-line array-callback-return
          return;
        } else if (parsed.jsx.key !== null) {
          alreadyDisplayed.push(parsed.jsx.key);
        }

        // If it's not an or statement, the first course must be satisfied.
        if (index === 0) {
          orAndSatisfied = parsed.satisfied;
        }

        // If it's an or statement, only one course would need to be satisfied. Otherwise, every course would need to be satisfied.
        if (props.or && parsed.satisfied) {
          orAndSatisfied = true;
        } else if (!props.or && !parsed.satisfied) {
          orAndSatisfied = false;
        }

        // Updates satisfied condition if recursive depth first search prereq processing produces true.
        if (
          index === props.element.length - 1 &&
          orAndSatisfied &&
          !trulySatisfied
        ) {
          setTrulySatisfied(true);
        }
        return (
          <p className="ml-2" key={el}>
            {parsed.jsx}
          </p>
        );
      }
    });
  };

  return (
    <div
      onMouseEnter={() => {
        setRootHovered(true);
      }}
      onMouseLeave={() => {
        setRootHovered(false);
      }}
      className="hover:scale-101 transform transition duration-200 ease-in"
    >
      <button
        onClick={() => {
          setOpen(!open);
        }}
        className={clsx(
          "focus:outline-none transform hover:scale-105 transition transition duration-100 duration-200 ease-in ease-in",
          {
            "text-green-700 hover:text-green-900": props.satisfied,
            "text-red-700 hover:text-red-900": !props.satisfied,
          }
        )}
      >
        <div className="flex flex-row w-auto h-auto font-medium">
          {props.satisfied ? (
            <CheckMark
              className={clsx("mr-1 w-5 h-5", {
                "text-green-700 group-hover:text-red-900": !props.satisfied,
                "text-green-700 group-hover:text-green-900": props.satisfied,
              })}
            />
          ) : (
            <>
              {open ? (
                <ChevronDown className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </>
          )}

          <div className="text-sm">{props.text}</div>
        </div>
      </button>
      <div
        className={clsx("ml-2 border-l-2 border-opacity-50", {
          "border-green-200": props.satisfied && !rootHovered,
          "border-green-900": props.satisfied && rootHovered,
          "border-red-200 ": !props.satisfied && !rootHovered,
          "border-red-900 ": !props.satisfied && rootHovered,
        })}
      >
        {open ? getChildPrereqs() : null}
      </div>
    </div>
  );
};

export default PrereqDropdown;
