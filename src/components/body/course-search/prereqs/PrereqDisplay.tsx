// CONSIDER RENAMING THIS FILE TO GENERAL META DISPLAYS??

import axios from "axios";
import clsx from "clsx";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateInspectedCourse,
  selectInspectedCourse,
  selectSemester,
  selectYear,
  updateSearchStack,
} from "../../../slices/searchSlice";
import CourseEvalSection from "../search-results/CourseEvalSection";
import PrereqDropdown from "./PrereqDropdown";
import { ReactComponent as CheckMark } from "../../../svg/CheckMark.svg";
import { ReactComponent as DescriptionSvg } from "../../../svg/Description.svg";
import { ReactComponent as MenuSvg } from "../../../svg/Menu.svg";
import ReactTooltip from "react-tooltip";
import { selectCurrentPlanCourses } from "../../../slices/currentPlanSlice";

const api = "https://ucredit-api.herokuapp.com/api";

// Parsed prereq type
// satisfied: a boolean that tells whether the prereq should be marked with green (satisfied) or red (unsatisfied)
// jsx: the dropdown bullet containing the current prereq course pill as well as its subsequent prereqs.
type parsedPrereqs = {
  satisfied: boolean;
  jsx: JSX.Element;
};

/* 
  This is the bullet-list display of the prereqs for each course.
*/
const PrereqDisplay = () => {
  // Redux Setup
  const dispatch = useDispatch();
  const inspected = useSelector(selectInspectedCourse);
  const currPlanCourses = useSelector(selectCurrentPlanCourses);
  const semester = useSelector(selectSemester);
  const year = useSelector(selectYear);

  // Component states
  const [prereqDisplayMode, setPrereqDisplayMode] = useState(2);
  const [preReqDisplay, setPreReqDisplay] = useState<JSX.Element[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [hasPreReqs, setHasPreReqs] = useState<boolean>(false);
  const [NNegativePreReqs, setNNegativePreReqs] = useState<any[]>();
  const [displayPreReqsView, setdisplayPreReqsView] = useState<Number>(1);

  // Parse preReq array to determine which are prereqs and which are coreq and other info. Actual Prereqs are denoted by isNegative = "N"
  // Returns non isNegative prereqs
  const filterNNegatives = (preReqs: any[]): any[] => {
    if (inspected !== "None") {
      preReqs = inspected.preReq.filter((section: any) => {
        return section.IsNegative === "N";
      });
    }
    setNNegativePreReqs(preReqs); // Continue only if}
    return preReqs;
  };

  // Takes in a unparsed array of preReqs.
  // Processes by checking if they're satisfied and turning them into jsx elements.
  // Displays them after.
  const processPrereqs = (preReqs: any[]) => {
    // Regex used to get an array of course numbers.
    const regex: RegExp = /[A-Z]{2}\.[0-9]{3}\.[0-9]{3}/g;
    const forwardSlashRegex: RegExp =
      /[A-Z]{2}\.[0-9]{3}\.[0-9]{3}\/[A-Z]{2}\.[0-9]{3}\.[0-9]{3}/g;

    let description: string = preReqs[0].Description;
    let expr: any = preReqs[0].Expression;

    // All courses that match the parttern of 'COURSE/COURSE' in description
    let forwardSlashCondition = [...description.matchAll(forwardSlashRegex)];

    // Checking for additional conditions only said in the description (ie. additional prereqs from description in CSF)
    forwardSlashCondition.forEach((condition: any) => {
      let newCourse = condition[0].substr(11, condition[0].length);
      let oldCourse = condition[0].substr(0, 10);
      if (expr.match(newCourse) === null) {
        // If our expression doesn't already have the course to the right of the '/', we append this course to the old course in the expression with an OR
        expr = expr.replaceAll(
          oldCourse + "[C]",
          oldCourse + "[C]^OR^" + newCourse + "[C]"
        );
      }
    });

    getEachCourseAndDisplay(expr, regex);
  };

  const getEachCourseAndDisplay = (expr: string, regex: RegExp) => {
    // Gets an array of all courses in expression.
    let match = expr.match(regex);
    let numList: RegExpMatchArray = [];
    let numNameList: any[] = []; // Contains the number with name of a course.
    let counter = 0; // Keeps track of how many courses have been processed. Cannot rely on indices as for loop executes asynchronously compared to axios. We need a variable syncronous to axios to determine when to load prereqs

    // If we were able to find course numbers in regex matches, update the numList to list of course numbers
    if (match) {
      numList = match;
    }

    // For the list of numbers, retrieve each course number, search for it and store the combined number + name into numNameList
    for (let n = 0; n < numList.length; n++) {
      let num = numList[n];
      axios
        .get(api + "/search", { params: { query: num } })
        // eslint-disable-next-line no-loop-func
        .then((retrieved) => {
          const retrievedCourse = retrieved.data.data;
          if (retrievedCourse.length === 1) {
            numNameList.push(num + num + " " + retrievedCourse[0].title); // num is added twice to distinquish which was the base course (refer to the case of EN.600 below) in the case that departments change numbers (600 to 601)
            counter++;
          } else {
            // TODO: Modularize this
            // In the case where the department changed some courses from 600 to 601
            if (num.match("EN.600") !== null) {
              num = num.replace("EN.600", "EN.601");
              axios
                .get(api + "/search", { params: { query: num } })
                // eslint-disable-next-line no-loop-func
                .then((retrieved601) => {
                  const retrievedCourse601 = retrieved601.data.data;
                  if (retrievedCourse601.length === 1) {
                    // Append original num to front for later sorting
                    numNameList.push(
                      numList[n] + num + " " + retrievedCourse601[0].title
                    );
                  } else {
                    numNameList.push(
                      numList[n] + numList[n] + " Older than 2 years old."
                    );
                  }
                  counter++;

                  afterGathering(counter, numNameList, numList, expr);
                })
                .catch((err) => {
                  console.log("couldnt find", err);
                });
            } else {
              numNameList.push(num + num + " Older than 2 years old.");
              counter++;
            }
          }
          afterGathering(counter, numNameList, numList, expr);
        })
        .catch((err) => {
          console.log("couldnt find", err);
        });
    }
  };

  // This useEffect performs prereq retrieval every time a new course is displayed.
  useEffect(() => {
    // Reset displayView for prereqs
    setdisplayPreReqsView(1);
    // Reset state whenever new inspected course
    setPreReqDisplay([]);
    let preReqs: any[] = [];
    setLoaded(false);
    setHasPreReqs(false);

    // First get all valid preReqs (isNegative = true)
    preReqs = filterNNegatives(preReqs);
    console.log(preReqs);

    // If there exists preReqs, we need to process and display them.
    if (inspected !== "None" && preReqs.length > 0) {
      setHasPreReqs(true);
      processPrereqs(preReqs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inspected]);

  // TODO: MODULARIZE THE BELOW FUNCTIONS SOMETIME.
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
    axios
      .get(api + "/search", { params: { query: courseNumber } })
      .then((retrieved) => {
        const retrievedCourse = retrieved.data.data;
        if (retrievedCourse.length === 1) {
          if (inspected !== "None") {
            dispatch(updateSearchStack(inspected));
          }
          dispatch(updateInspectedCourse(retrievedCourse[0]));
        } else {
          console.log("no such course exists in db");
        }
      })
      .catch((err) => {
        console.log("couldnt find", err);
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

  // TODO: Autogenerate time ranks based on year and semester
  const courseRank = new Map([
    ["fr,fa", 1],
    ["fr,sp", 3],
    ["fr,in", 2],
    ["fr,su", 4],
    ["so,fa", 5],
    ["so,in", 6],
    ["so,sp", 7],
    ["so,su", 8],
    ["ju,fa", 9],
    ["ju,in", 10],
    ["ju,sp", 11],
    ["ju,su", 12],
    ["se,fa", 13],
    ["se,in", 14],
    ["se,sp", 15],
    ["se,su", 16],
  ]);

  // Checks if prereq is satisfied by plan
  const checkPrereq = (number: string): boolean => {
    let satisfied: boolean = false;
    const currTimeVal = courseRank.get(
      (year.substr(0, 2) + "," + semester.substr(0, 2)).toLowerCase()
    );
    currPlanCourses.forEach((course) => {
      const courseTimeVal = courseRank.get(
        (
          course.year.substr(0, 2) +
          "," +
          course.term.substr(0, 2)
        ).toLowerCase()
      );
      if (
        course.number === number &&
        currTimeVal !== undefined &&
        courseTimeVal !== undefined &&
        currTimeVal > courseTimeVal
      ) {
        satisfied = true;
      }
    });
    return satisfied;
  };

  // Parses arrays into clickable prereq number links
  const getNonStringPrereq = (input: any): parsedPrereqs => {
    const element = input;
    if (typeof element === "string") {
      // If the element is a number
      const noCBrackets: string = element.substr(0, element.length - 3);
      const noCBracketsNum: string = element.substr(0, 10);
      const satisfied: boolean = checkPrereq(noCBracketsNum);
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
                satisfied={false}
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

  // Check it it's time to update the prereq section with components.
  const afterGathering = (
    counter: number,
    numNameList: string[],
    numList: string[],
    expr: any
  ) => {
    // Once counter counts that the amount of courses processed equals to the number list size, we can safely process prereq components and get component list.
    if (numList.length === numNameList.length && counter === numList.length) {
      // Allign num list and name list
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
    }
  };

  const handlePrereqDisplayModeChange = (mode: number) => () => {
    setPrereqDisplayMode(mode);
  };

  const displayPreReqs = () => {
    return (
      <>
        <div className="flex flex-row mt-2">
          <div
            className={clsx(
              "flex flex-row items-center justify-center mr-1 p-1 w-7 h-7 rounded cursor-pointer",
              {
                "bg-gray-200": prereqDisplayMode !== 1,
                "hover:bg-gray-200 transition duration-100 ease-in":
                  prereqDisplayMode === 1,
              }
            )}
            onClick={handlePrereqDisplayModeChange(1)}
            data-tip="description"
          >
            <DescriptionSvg className="w-5 h-5" />
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
            onClick={handlePrereqDisplayModeChange(2)}
            data-tip="bullet list"
          >
            <MenuSvg />
          </div>
        </div>

        {!hasPreReqs ? (
          // <div className="font-normal">No Prereqs!</div>
          <div className="flex flex-col items-center justify-center w-full h-full font-normal">
            No Prereqs!
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
      <div className="flex flex-row justify-between pb-1 border-b">
        <button
          className="text-xl font-medium"
          onClick={() => {
            setdisplayPreReqsView(1);
          }}
        >
          Prerequisites
        </button>
        <button
          className="text-xl font-medium"
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
