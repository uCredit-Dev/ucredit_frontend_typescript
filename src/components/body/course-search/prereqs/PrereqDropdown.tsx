import React, { useState } from "react";
import clsx from "clsx";

/* 
  This is one of the open-close prereq pill dropdowns.
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

  const updateSatisfied = () => {
    setTrulySatisfied(true);
  };

  const getChildPrereqs = () => {
    let orAndSatisfied = false;

    return props.element.map((el: any, index) => {
      if (typeof el !== "number") {
        const parsed: {
          satisfied: boolean;
          jsx: JSX.Element;
        } = props.getNonStringPrereq(el);

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
          updateSatisfied();
        }
        return (
          <p
            style={{
              marginLeft: "1rem",
            }}
            key={el}
          >
            {parsed.jsx}
          </p>
        );
      }
    });
  };

  return (
    <div>
      <button
        onClick={() => {
          setOpen(!open);
        }}
        className={clsx(
          "p-1 rounded",
          {
            "bg-green-100": trulySatisfied,
          },
          {
            "bg-red-100": !trulySatisfied,
          }
        )}
        style={{
          marginLeft: `1rem`,
        }}
      >
        {props.text}
      </button>
      {open ? getChildPrereqs() : null}
    </div>
  );
};

export default PrereqDropdown;
