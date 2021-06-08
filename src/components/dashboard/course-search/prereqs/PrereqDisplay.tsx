// TODO: CONSIDER RENAMING THIS FILE TO GENERAL META DISPLAYS??

import clsx from "clsx";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateInspectedCourse,
  selectSemester,
  selectYear,
  updateSearchStack,
  selectVersion,
} from "../../../slices/searchSlice";
import {
  filterNNegatives,
  processPrereqs,
  checkPrereq,
} from "../../../resources/assets";
import CourseEvalSection from "../search-results/CourseEvalSection";
import PrereqDropdown from "./PrereqDropdown";
import { ReactComponent as CheckMark } from "../../../resources/svg/CheckMark.svg";
import { ReactComponent as DescriptionSvg } from "../../../resources/svg/Description.svg";
import { ReactComponent as MenuSvg } from "../../../resources/svg/Menu.svg";
import ReactTooltip from "react-tooltip";
import {
  selectCurrentPlanCourses,
  selectPlan,
} from "../../../slices/currentPlanSlice";
import { selectAllCourses } from "../../../slices/userSlice";

// Parsed prereq type
// satisfied: a boolean that tells whether the prereq should be marked with green (satisfied) or red (unsatisfied)
// jsx: the dropdown bullet containing the current prereq course pill as well as its subsequent prereqs.
type parsedPrereqs = {
  satisfied: boolean;
  jsx: JSX.Element;
};

/**
 * This is the bullet-list display of the prereqs for each course.
 * @returns
 */
const PrereqDisplay = () => {
  // Redux Setup
  const dispatch = useDispatch();
  const version = useSelector(selectVersion);
  const currPlanCourses = useSelector(selectCurrentPlanCourses);
  const semester = useSelector(selectSemester);
  const year = useSelector(selectYear);
  const currentPlan = useSelector(selectPlan);
  const allCourses = useSelector(selectAllCourses);

  // Component states
  const [prereqDisplayMode, setPrereqDisplayMode] = useState(2);
  const [preReqDisplay, setPreReqDisplay] = useState<JSX.Element[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [hasPreReqs, setHasPreReqs] = useState<boolean>(false);
  const [NNegativePreReqs, setNNegativePreReqs] = useState<any[]>();
  const [displayPreReqsView, setdisplayPreReqsView] = useState<Number>(1);

  const display = async (preReqs: any[]) => {
    const prereqs = processPrereqs(preReqs, allCourses);
    afterGathering(prereqs.numNameList, prereqs.numList, prereqs.expr);
  };

  // This useEffect performs prereq retrieval every time a new course is displayed.
  useEffect(() => {
    // Reset displayView for prereqs
    setdisplayPreReqsView(1);
    // Reset state whenever new inspected course
    setPreReqDisplay([]);
    setLoaded(false);
    setHasPreReqs(false);

    // First get all valid preReqs (isNegative = true)
    let preReqs = filterNNegatives(version);
    setNNegativePreReqs(preReqs);

    // If there exists preReqs, we need to process and display them.
    if (version !== "None" && preReqs.length > 0) {
      setHasPreReqs(true);
      display(preReqs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version]);

  // This is that one open expression calculator leetcode problem.
  // We're basically modifying it and adapting it to parse through prereqs
  // Input param is the prereq expression to parse (ie. AS.110.202 AND (EN.550.310 OR EN.553.211 OR EN.553.310 OR EN.553.311 OR ((EN.550.420 OR EN.553.420) AND (EN.550.430 OR EN.553.430 OR EN.553.431)) OR EN.560.348) AND (AS.110.201 OR AS.110.212 OR EN.553.291) AND (EN.500.112 OR EN.500.113 OR EN.500.114 OR (EN.601.220 OR EN.600.120) OR AS.250.205 OR EN.580.200 OR (EN.600.107 OR EN.601.107)))
  // Output is an array of prereqs, which could be a single course number, an array of course numbers, or the word "OR". Any course not seperated by an "OR" is another prereq to fullfill.
  // This output can then be redisplayed as a nice bullet list.
  const createPrereqBulletList = (input: any): any => {
    const courseArr = [];
    for (let i = 0; i < input.length; i++) {
      if (input[i] === "AND") {
        // skip
      } else if (input[i] === "(") {
        // Adds in everything between this level's open and close parentheses

        // Keeps track of whether we have closed the original open parentheses
        const parenthesesStack = [input[i]];
        const subCourseArr = [];
        while (parenthesesStack.length > 0) {
          i++;
          if (input[i] === ")") {
            // If close, pop one from parentheses stack
            parenthesesStack.pop();
          } else if (input[i] === "(") {
            // if open, push open parentheses in
            parenthesesStack.push("(");
          }
          // If we're still in original parentheses, push it into sthe subArray
          if (parenthesesStack.length > 0) {
            subCourseArr.push(input[i]);
          }
        }

        // Recursively calls function on string inside of parentheses.
        courseArr.push(createPrereqBulletList(subCourseArr));
      } else {
        courseArr.push(input[i]);
      }
    }
    return courseArr;
  };

  // Function currying to produce a function that would update the store when clicking on prereqs
  const updateInspected = (courseNumber: string) => () => {
    allCourses.forEach((course) => {
      if (course.number === courseNumber) {
        if (version !== "None") {
          dispatch(updateSearchStack(course));
        }
        dispatch(updateInspectedCourse(course));
      }
    });
  };

  // Outputs the prereqs as components
  const preReqsToComponents = (inputs: any): JSX.Element[] => {
    let out: any[] = [];
    const orParsed = parsePrereqsOr(inputs, 0);
    const parsed: parsedPrereqs = getNonStringPrereq(orParsed);
    out.push(parsed.jsx);
    return out;
  };

  // Parses arrays into clickable prereq number links
  const getNonStringPrereq = (input: any): parsedPrereqs => {
    const element = input;
    if (typeof element === "string") {
      // If the element is a number
      const noCBrackets: string = element.substr(0, element.length - 3);
      const noCBracketsNum: string = element.substr(0, 10);
      const satisfied: boolean = checkPrereq(
        currPlanCourses,
        currentPlan,
        noCBracketsNum,
        year,
        semester
      );
      return {
        satisfied: satisfied,
        jsx: (
          <p className="w-full" key={noCBracketsNum}>
            <button
              className={clsx("mb-1 max-w-md text-sm font-medium truncate")}
              onClick={() => {
                updateInspected(noCBracketsNum)();
              }}
            >
              <div className="group flex flex-row w-auto h-auto transition duration-100 ease-in">
                {satisfied ? (
                  <CheckMark
                    className={clsx("mr-1 w-5 h-5", {
                      "text-green-700 group-hover:text-red-900": !satisfied,
                      "text-green-700 group-hover:text-green-900": satisfied,
                    })}
                  />
                ) : null}
                <div
                  className={clsx(
                    "border-b border-solid border-gray-300 transition duration-100 ease-in",
                    {
                      "text-green-700 hover:text-green-900 hover:border-green-900":
                        satisfied,
                      "hover:text-red-900 text-red-700 hover:border-red-900":
                        !satisfied,
                    }
                  )}
                >
                  {noCBrackets}
                </div>
              </div>
            </button>
          </p>
        ),
      };
    } else if (typeof element[0] === "number") {
      // If the element is a OR sequence (denoted by the depth number in the first index)
      const parsedSat: boolean = isSatisfied(element, true);
      return {
        satisfied: parsedSat,
        jsx: (
          <>
            <PrereqDropdown
              satisfied={parsedSat}
              text={"Any one course below"}
              element={element}
              getNonStringPrereq={getNonStringPrereq}
              or={true}
            />
          </>
        ),
      };
    } else if (typeof element === "object") {
      // If the element is a parentheses sequence
      if (element.length === 1) {
        const parsed: parsedPrereqs = getNonStringPrereq(element[0]);
        return {
          satisfied: parsed.satisfied,
          jsx: <p>{parsed.jsx}</p>,
        };
      } else {
        const parsedSat: boolean = isSatisfied(element, false);
        return {
          satisfied: parsedSat,
          jsx: (
            <>
              <PrereqDropdown
                satisfied={parsedSat}
                text={"All courses below"}
                element={element}
                getNonStringPrereq={getNonStringPrereq}
                or={false}
              />
            </>
          ),
        };
      }
    } else {
      return {
        satisfied: true,
        jsx: <></>,
      };
    }
  };

  const isSatisfied = (element: [], or: boolean): boolean => {
    let orAndSatisfied = false;

    element.forEach((el: any, index) => {
      if (typeof el !== "number") {
        const parsed: {
          satisfied: boolean;
          jsx: JSX.Element;
        } = getNonStringPrereq(el);

        // If it's not an or statement, the first course must be satisfied.
        if (index === 0) {
          orAndSatisfied = parsed.satisfied;
        }

        // If it's an or statement, only one course would need to be satisfied. Otherwise, every course would need to be satisfied.
        if (or && parsed.satisfied) {
          orAndSatisfied = true;
        } else if (!or && !parsed.satisfied) {
          orAndSatisfied = false;
        }
      }
    });
    return orAndSatisfied;
  };

  // Takes parsed prereq array and then parses this array again to make OR sequences
  const parsePrereqsOr = (input: any, depth: number): any => {
    const orParsed: any[] = [];

    // Group by ORs: Put elements connected by ORs as arrays starting with depth number (as an identifier). All other elements are treated as ands.
    // if OR, pop last element from orParsed. If it's a string, make a new array. If array, push the next element into this array. Put the array back into orParsed.
    // if not OR, push element into orParsed
    for (let i = 0; i < input.length; i++) {
      if (input[i] === "OR") {
        let el = orParsed.pop();
        let toAdd;
        // If the course or array of courses after the OR is a string, it must be a course number. Otherwise, it's a course array.
        if (typeof input[i + 1] === "string") {
          toAdd = input[i + 1];
        } else {
          toAdd = parsePrereqsOr(input[i + 1], depth);
        }

        // First element
        if (el === null) {
          orParsed.push(0);
          orParsed.push(toAdd);
        } else if (typeof el === "object" && typeof el[0] === "number") {
          // If past element was an array and we are in an or chain
          // The last element was an or sequence
          el.push(toAdd);
          orParsed.push(el);
        } else if (typeof el === "object" && typeof el[0] !== "number") {
          // The last element was a parentheses sequence
          // We need to parse the sequence and put that element back into our array
          el = parsePrereqsOr(input[i], depth);
          orParsed.push([el, toAdd]);
        } else {
          // Last element wasn't any type of sequence. Thus, a new OR sequence is made and pushed in.
          const orArray = [depth, el, toAdd];
          orParsed.push(orArray);
        }
        i++;
      } else if (typeof input[i] === "string") {
        // If number, just push in
        orParsed.push(input[i]);
      } else {
        // If not OR or a course number, must be a parentheses sequence. We will recursively call this function in this case.
        orParsed.push(...parsePrereqsOr(input[i], depth));
      }
    }
    return orParsed;
  };

  // Check if it's time to update the prereq section with components.
  const afterGathering = (
    numNameList: string[],
    numList: string[],
    expr: any
  ) => {
    numList = numList.sort((first: any, second: any) => {
      const sub1 = first.substr(0, 10);
      const sub2 = second.substr(0, 10);
      return sub1.localeCompare(sub2);
    });
    numNameList = numNameList.sort((a: any, b: any): any => {
      const sub1 = a.substr(0, 10);
      const sub2 = b.substr(0, 10);
      return sub1.localeCompare(sub2);
    });
    for (let i = 0; i < numList.length; i++) {
      expr = expr.replaceAll(
        numList[i],
        numNameList[i].substr(10, numNameList[i].length)
      );
    }
    expr = expr.split("^");
    const list = createPrereqBulletList(expr);
    setPreReqDisplay(preReqsToComponents(list));
    setLoaded(true);
  };

  const handlePrereqDisplayModeChange = (mode: number) => () => {
    setPrereqDisplayMode(mode);
  };

  const displayPreReqs = () => {
    return (
      <>
        <div className="flex flex-row mt-2">
          <ReactTooltip />
          <div
            className={clsx(
              "flex flex-row items-center justify-center mr-1 p-1 w-7 h-7 rounded cursor-pointer",
              {
                "bg-gray-200": prereqDisplayMode !== 1,
                "hover:bg-gray-200 transition duration-100 ease-in":
                  prereqDisplayMode === 1,
              }
            )}
            onClick={handlePrereqDisplayModeChange(2)}
            data-tip="bullet list"
          >
            <MenuSvg />
          </div>
          <div
            className={clsx(
              "flex flex-row items-center justify-center p-1 w-7 h-7 rounded cursor-pointer",
              {
                "bg-gray-200": prereqDisplayMode === 1,
                "hover:bg-gray-200 transition duration-100 ease-in":
                  prereqDisplayMode !== 1,
              }
            )}
            onClick={handlePrereqDisplayModeChange(1)}
            data-tip="description"
          >
            <DescriptionSvg className="w-5 h-5" />
          </div>
        </div>

        {!hasPreReqs ? (
          // <div className="font-normal">No Prereqs!</div>
          <div className="flex flex-col items-center justify-center w-full h-full font-normal">
            No Prerequisites!
          </div>
        ) : prereqDisplayMode === 1 ? (
          <>
            {NNegativePreReqs !== undefined && NNegativePreReqs.length > 0 ? (
              <div className="font-normal">
                {NNegativePreReqs[0].Description}
              </div>
            ) : (
              <div>Loading description...</div>
            )}
          </>
        ) : !loaded ? (
          "Loading Prereqs Status: loaded is " + loaded.toString()
        ) : (
          <p className="p-2 overflow-y-auto">{preReqDisplay}</p>
        )}
      </>
    );
  };

  return (
    <p className="w-full h-auto">
      <ReactTooltip />
      <div className="flex flex-row border-b-2">
        <button
          className={clsx(
            "mr-3 text-xl font-medium hover:border-b-2 border-secondary",
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
            "mr-3 text-xl font-medium hover:border-b-2 border-secondary",
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
      {displayPreReqsView === 1 ? displayPreReqs() : <CourseEvalSection />}
    </p>
  );
};

export default PrereqDisplay;
