import React, { useState } from "react";
import clsx from "clsx";

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
    console.log("many");
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
          console.log("and for ", el);
          orAndSatisfied = parsed.satisfied;
        }

        // If it's an or statement, only one course would need to be satisfied. Otherwise, every course would need to be satisfied.
        if (props.or && parsed.satisfied) {
          console.log("Truing for ", el);
          orAndSatisfied = true;
        } else if (!props.or && !parsed.satisfied) {
          orAndSatisfied = false;
        }

        // console.log(
        //   "el is ",
        //   el,
        //   " Or is ",
        //   props.or,
        //   " or and satisfied is ",
        //   orAndSatisfied
        // );

        if (
          index === props.element.length - 1 &&
          orAndSatisfied &&
          !trulySatisfied
        ) {
          console.log("Truing for ", el);
          updateSatisfied();
        }
        return (
          <p
            style={{
              marginLeft: "1rem",
            }}
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
