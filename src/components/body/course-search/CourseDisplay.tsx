import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Distribution, UserCourse } from "../../commonTypes";
import {
  selectInspectedCourse,
  updateInspectedCourse,
  clearSearch,
  selectSemester,
  selectYear,
} from "../../slices/searchSlice";
import {
  selectUser,
  selectPlan,
  selectPlanList,
  selectDistributions,
  updateSelectedPlan,
  updatePlanList,
} from "../../slices/userSlice";
const api = "https://ucredit-api.herokuapp.com/api";

// Displays course information once a user selects a course in the search list
const CourseDisplay = () => {
  // Redux Setup
  const inspected = useSelector(selectInspectedCourse);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const semester = useSelector(selectSemester);
  const year = useSelector(selectYear);
  const currentPlan = useSelector(selectPlan);
  const planList = useSelector(selectPlanList);
  const distributions = useSelector(selectDistributions);

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

  // Parses arrays into clickable prereq number links
  const getNonStringPrereq = (input: any): any => {
    const element = input;
    if (typeof element === "string") {
      // If the element is a number

      const noCBrackets: string = element.substr(0, element.length - 3);
      const noCBracketsNum: string = element.substr(0, 10);
      const buttonElement = (
        <button
          className="bg-gray-100"
          onClick={() => {
            updateInspected(noCBracketsNum)();
          }}
        >
          {noCBrackets}
        </button>
      );
      return <p>- {buttonElement}</p>;
    } else if (typeof element[0] === "number") {
      // If the element is a OR sequence (denoted by the depth number in the first index)
      return (
        <>
          <p style={{ marginLeft: `${element[0]}rem` }}>
            - 1 of any of the options below
          </p>
          {element.map((el: any) => (
            <p style={{ marginLeft: `${element[0] + 1}rem` }}>
              {getNonStringPrereq(el)}
            </p>
          ))}
        </>
      );
    } else if (typeof element === "object") {
      // If the element is a parentheses sequence
      if (element.length === 1) {
        return <p>{getNonStringPrereq(element[0])}</p>;
      } else {
        return (
          <>
            <p>- All of the below</p>
            {element.map((el: any) => (
              <p style={{ marginLeft: "1rem" }}>{getNonStringPrereq(el)}</p>
            ))}
          </>
        );
      }
    } else {
      return <div></div>;
    }
  };

  // Outputs the prereqs as components
  const preReqsToComponents = (inputs: any): JSX.Element[] => {
    let out: any[] = [];
    const orParsed = parsePrereqsOr(inputs, 0);
    out.push(getNonStringPrereq(orParsed));
    return out;
  };

  // Holds preReq Display as a state that updates every time inspected course changes.
  const [preReqDisplay, setPreReqDisplay] = useState<JSX.Element[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [hasPreReqs, setHasPreReqs] = useState<boolean>(false);
  const [NNegativePreReqs, setNNegativePreReqs] = useState<any[]>();

  useEffect(() => {
    // Reset state whenever new inspected course
    setPreReqDisplay([]);
    let preReqs: any[] = [];
    setLoaded(false);
    setHasPreReqs(false);
    // Parse preReq array to determine which are prereqs and which are coreq and other info. Actual Prereqs are denoted by isNegative = "N"
    if (inspected !== "None") {
      preReqs = inspected.preReq.filter((section: any) => {
        return section.IsNegative === "N";
      });
    }
    setNNegativePreReqs(preReqs);

    // Continue only if
    if (inspected !== "None" && preReqs.length > 0) {
      setHasPreReqs(true);

      // Regex used to get an array of course numbers.
      const regex: RegExp = /[A-Z]{2}\.[0-9]{3}\.[0-9]{3}/g;
      const forwardSlashRegex: RegExp = /[A-Z]{2}\.[0-9]{3}\.[0-9]{3}\/[A-Z]{2}\.[0-9]{3}\.[0-9]{3}/g;

      let description = preReqs[0].Description;
      let expr = preReqs[0].Expression;

      // All courses that match the parttern of 'COURSE/COURSE' in description
      let forwardSlashCondition = [...description.matchAll(forwardSlashRegex)];

      // Checking for additional conditions only said in the description (check CSF)
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

      // Gets an array of all courses in expression.
      let numList = expr.match(regex);

      let numNameList: any[] = []; // Contains the number with name of a course.
      let counter = 0; // Keeps track of how many courses have been processed. Cannot rely on indices as for loop executes asynchronously compared to axios. We need a variable syncronous to axios to determine when to load prereqs

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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inspected]);

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

  // Function currying to produce a function that would update the store when clicking on prereqs
  const updateInspected = (courseNumber: string) => () => {
    axios
      .get(api + "/search", { params: { query: courseNumber } })
      .then((retrieved) => {
        const retrievedCourse = retrieved.data.data;
        if (retrievedCourse.length === 1) {
          dispatch(updateInspectedCourse(retrievedCourse[0]));
        } else {
          console.log("no such course exists in db");
        }
      })
      .catch((err) => {
        console.log("couldnt find", err);
      });
  };

  // Adds course
  const addCourse = () => {
    // Take inspected, turn it into a user course, and add it to user courses
    if (inspected !== "None" && distributions.length !== 0) {
      let newUserCourse: UserCourse;
      let general = null;
      let total = null;
      let writtenIntensive = null;
      let filteredDistribution: Distribution[] = [];

      // determine which area course falls under
      // TODO: Try to automate this
      const areaToAdd =
        inspected.areas === "None" ? [] : inspected.areas.split("");
      distributions.forEach((distribution) => {
        if (distribution.name === "General Electives") {
          general = distribution;
        }

        if (distribution.name === "Total Credits") {
          total = distribution;
        }

        if (distribution.name === "Writing Intensive (WI)" && inspected.wi) {
          writtenIntensive = distribution;
        }
      });

      areaToAdd.forEach((area) => {
        distributions.forEach((distribution) => {
          if (
            filteredDistribution.length === 0 &&
            distribution.planned < distribution.required
          ) {
            if (
              (inspected.number.includes("EN.600") ||
                inspected.number.includes("EN.601") ||
                inspected.number.includes("EN.500")) &&
              distribution.name.includes("Computer Science")
            ) {
              filteredDistribution.push(distribution);
            } else if (area === "N" && distribution.name.includes("(N)")) {
              filteredDistribution.push(distribution);
            } else if (area === "S" && distribution.name.includes("(S)")) {
              filteredDistribution.push(distribution);
            } else if (area === "H" && distribution.name.includes("(H)")) {
              filteredDistribution.push(distribution);
            } else if (area === "Q" && distribution.name.includes("(Q)")) {
              filteredDistribution.push(distribution);
            }
          }
        });
      });

      // If all areas are full and there is still more for general electives
      if (filteredDistribution.length === 1 && general !== null) {
        filteredDistribution.push(general);
      }

      if (total !== null) filteredDistribution.push(total);

      if (writtenIntensive !== null)
        filteredDistribution.push(writtenIntensive);

      const body = {
        user_id: user._id,
        title: inspected.title,
        term: semester.toLowerCase(),
        year: year.toLowerCase(),
        credits: inspected.credits,
        distribution_ids: filteredDistribution.map((distr) => distr._id),
        plan_id: currentPlan._id,
        number: inspected.number,
      };

      fetch(api + "/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((retrieved) => {
        retrieved.json().then((data) => {
          newUserCourse = { ...data.data };
          const newPlan = { ...currentPlan };
          // Update distributions
          if (year === "Freshman") {
            newPlan.freshman = [...newPlan.freshman, newUserCourse._id];
          } else if (year === "Sophomore") {
            newPlan.sophomore = [...newPlan.sophomore, newUserCourse._id];
          } else if (year === "Junior") {
            newPlan.junior = [...newPlan.junior, newUserCourse._id];
          } else {
            newPlan.senior = [...newPlan.senior, newUserCourse._id];
          }
          dispatch(updateSelectedPlan(newPlan));
          const newPlanList = [...planList];
          for (let i = 0; i < planList.length; i++) {
            if (planList[i]._id === newPlan._id) {
              newPlanList[i] = newPlan;
            }
          }
          dispatch(updatePlanList(newPlanList));
        });
      });
      dispatch(clearSearch());
    }
  };
  const [prereqDisplayMode, setPrereqDisplayMode] = useState(2);

  const handlePrereqDisplayModeChange = (mode: number) => () => {
    setPrereqDisplayMode(mode);
  };

  return (
    <div>
      {inspected === "None" ? (
        <div>No inspected Courses</div>
      ) : (
        <div className="p-5">
          <p>{inspected.title}</p>
          <p>{inspected.number}</p>
          <p>{inspected.credits} Credits</p>
          <p>Areas: {inspected.areas}</p>
          <p>
            Restrictions:{" "}
            {inspected.restrictions.map((restriction) => (
              <div>{restriction.RestrictionName}</div>
            ))}
          </p>
          <p>
            {inspected.terms.map((term) => (
              <div>{term}</div>
            ))}
          </p>
          <p>{inspected.bio}</p>
          <p>
            <div className="border-b-2">
              <div>Prerequisites</div>{" "}
              <div>
                <button
                  className="bg-gray-100"
                  onClick={handlePrereqDisplayModeChange(1)}
                >
                  Description
                </button>
                <button
                  className="bg-gray-100"
                  onClick={handlePrereqDisplayModeChange(2)}
                >
                  Bullet List (in development)
                </button>
              </div>
            </div>
            {/* <p className="h-80 overflow-scroll">{getPreReqs()}</p> */}
            {!hasPreReqs ? (
              <div>No Prereqs!</div>
            ) : prereqDisplayMode === 1 ? (
              <>
                {NNegativePreReqs !== undefined &&
                NNegativePreReqs.length > 0 ? (
                  <div>{NNegativePreReqs[0].Description}</div>
                ) : (
                  <div>Loading description...</div>
                )}
              </>
            ) : !loaded ? (
              "Loading Prereqs Status: loaded is " + loaded.toString()
            ) : (
              <p className="h-80 overflow-scroll">{preReqDisplay}</p>
            )}
          </p>
          <button className="bg-gray-300" onClick={addCourse}>
            Add Course
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseDisplay;
