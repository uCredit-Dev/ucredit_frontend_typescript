import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Distribution,
  FilterType,
  SemesterType,
  UserCourse,
  YearType,
} from "../../../commonTypes";
import {
  selectInspectedCourse,
  clearSearch,
  popSearchStack,
  selectSemester,
  selectYear,
  selectPlaceholder,
  selectSearchStack,
  updatePlaceholder,
  updateSearchTime,
  updateSearchFilters,
  updateInspectedCourse,
} from "../../../slices/searchSlice";
import {
  selectUser,
  selectPlan,
  selectPlanList,
  selectDistributions,
  updateSelectedPlan,
  updatePlanList,
} from "../../../slices/userSlice";
import Placeholder from "./Placeholder";
import PrereqDisplay from "../prereqs/PrereqDisplay";
import { ReactComponent as CloseSvg } from "../../../svg/Close.svg";
import ReactTooltip from "react-tooltip";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getColors } from "../../../assets";

const api = "https://ucredit-api.herokuapp.com/api";

const termFilters: (SemesterType | "None")[] = [
  "None",
  "fall",
  "spring",
  "intersession",
  "summer",
];

const years: YearType[] = ["Freshman", "Sophomore", "Junior", "Senior"];

// TODO: MODULARIZE
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
  const placeholder = useSelector(selectPlaceholder);
  const [inspectedArea, setInspectedArea] = useState("None");
  const searchYear = useSelector(selectYear);
  const searchSemester = useSelector(selectSemester);
  const searchStack = useSelector(selectSearchStack);

  // Adds course
  const addCourse = () => {
    // Adds course, updates user frontend distributions display, and clears search states.
    if (inspected !== "None" && distributions.length !== 0) {
      let general = null;
      let total = null;
      let writtenIntensive = null;
      let filteredDistribution: Distribution[] = [];
      dispatch(updatePlaceholder(false));

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

      updateFilteredDistributions(
        filteredDistribution,
        general,
        total,
        writtenIntensive
      );

      // Posts to add course route and then updates distribution.
      updateDistributions(filteredDistribution);
      toast.success(inspected.title + " added!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Clears search state.
      dispatch(clearSearch());
    }
  };

  // Determines which distributions should the course that has just been added falls under.
  const updateFilteredDistributions = (
    filteredDistribution: Distribution[],
    general: any,
    total: any,
    writtenIntensive: any
  ) => {
    if (inspected !== "None") {
      // determine which area course falls under
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
          } else if (
            inspectedArea === "N" &&
            distribution.name.includes("(N)")
          ) {
            filteredDistribution.push(distribution);
          } else if (
            inspectedArea === "S" &&
            distribution.name.includes("(S)")
          ) {
            filteredDistribution.push(distribution);
          } else if (
            inspectedArea === "H" &&
            distribution.name.includes("(H)")
          ) {
            filteredDistribution.push(distribution);
          } else if (
            inspectedArea === "Q" &&
            distribution.name.includes("(Q)")
          ) {
            filteredDistribution.push(distribution);
          }
        }
      });
    }

    // If all areas are full and there is still more for general electives
    if (filteredDistribution.length === 0 && general !== null) {
      filteredDistribution.push(general);
    }

    if (total !== null) filteredDistribution.push(total);

    if (writtenIntensive !== null) filteredDistribution.push(writtenIntensive);
  };

  // Updates distribution bars upon successfully adding a course.
  const updateDistributions = (filteredDistribution: Distribution[]) => {
    let newUserCourse: UserCourse;
    if (inspected !== "None") {
      const body = {
        user_id: user._id,
        title: inspected.title,
        term: semester.toLowerCase(),
        year: year.toLowerCase(),
        credits: inspected.credits,
        distribution_ids: filteredDistribution.map((distr) => distr._id),
        plan_id: currentPlan._id,
        number: inspected.number,
        area: inspectedArea,
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
    }
  };

  // UseEffect runs when a new course is inspected.
  // It automatically updates the current area in the add course area selection to the first area in the course areas string.
  useEffect(() => {
    setShowMore(2);
    if (
      inspected !== "None" &&
      inspected.areas !== "None" &&
      inspected.areas !== undefined
    ) {
      const firstArea = inspected.areas.charAt(0);
      if (
        firstArea === "N" ||
        firstArea === "S" ||
        firstArea === "H" ||
        firstArea === "Q" ||
        firstArea === "E"
      ) {
        setInspectedArea(firstArea);
      }
    } else {
      setInspectedArea("None");
    }
  }, [inspected]);

  // Returns an array of select options for the distribution area users want to add the course to.
  const getInspectedAreas = () => {
    if (inspected !== "None" && inspected.areas !== "None") {
      const areaOptions = inspected.areas.split("").map((area) => (
        <option key={inspected.number + area} value={area}>
          {area}
        </option>
      ));
      areaOptions.push(<option value={"None"}>None</option>);
      return areaOptions;
    } else {
      return <option value={"None"}>None</option>;
    }
  };

  // Update searching for a certain term.
  const handleTermFilterChange = (event: any): void => {
    const params: { filter: FilterType; value: any } = {
      filter: "term",
      value: event.target.value,
    };
    dispatch(
      updateSearchTime({ searchSemester: event.target.value, searchYear: year })
    );
    dispatch(updateSearchFilters(params));
  };

  const getRestrictions = () => {
    if (inspected !== "None") {
      const restrictions = inspected.restrictions.map(
        (restriction) => restriction.RestrictionName
      );
      if (restrictions.length !== 0) {
        return restrictions;
      } else {
        return "No Restrictions!";
      }
    }
  };

  const bioElRef = useRef<HTMLParagraphElement>(null);
  const [showMore, setShowMore] = useState<number>(2);
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
  }, [showMore, bioElRef, inspected]);

  // For changing the year to add course while in the search popout.
  const handleYearChange = (event: any) => {
    dispatch(
      updateSearchTime({
        searchYear: event.target.value,
        searchSemester: searchSemester,
      })
    );
  };

  const clearInspected = () => {
    dispatch(updateInspectedCourse("None"));
  };

  return (
    <div className="flex flex-col p-5 w-full bg-gray-200 rounded-r">
      {inspected === "None" ? (
        <div className="flex flex-col items-center justify-center w-full h-full font-normal">
          No selected course!
        </div>
      ) : placeholder ? (
        <Placeholder addCourse={addCourse} />
      ) : (
        <>
          <ReactTooltip />
          <div className="pb-5 pt-4 px-5 w-full h-full text-base bg-white rounded overflow-y-auto">
            {searchStack.length !== 0 ? (
              <button
                onClick={() => {
                  dispatch(popSearchStack());
                }}
              >
                Back
              </button>
            ) : null}
            <div className="flex flex-row justify-between mb-1 w-full h-auto">
              <h1 className="flex flex-row w-auto h-auto">
                <div className="w-full h-auto text-2xl font-bold">
                  {inspected.title}
                </div>
                <div className="flex flex-row items-center ml-2.5 mr-2">
                  <div
                    className="flex items-center px-1 w-auto h-5 text-white font-semibold bg-secondary rounded select-none"
                    data-tip={inspected.credits + " credits"}
                  >
                    {inspected.credits}
                  </div>
                </div>
              </h1>
              <button className="text-2xl" onClick={clearInspected}>
                <CloseSvg className="w-7 h-7 stroke-2" />
              </button>
            </div>
            <div className="grid grid-cols-2 w-auto h-auto">
              <div className="w-auto h-auto">
                <div>{inspected.number}</div>
                <div className="flex flex-row">
                  Areas:{" "}
                  {inspected.areas.split("").map((area) => (
                    <div
                      className="flex flex-row items-center"
                      key={area + inspected.number}
                    >
                      <div
                        className="flex items-center px-1 w-auto h-5 text-white font-semibold rounded select-none"
                        style={{ backgroundColor: getColors(area)[0] }}
                      >
                        {area !== "None" ? area : "N/A"}
                      </div>
                    </div>
                  ))}
                </div>
                <div>Department: {inspected.department}</div>
              </div>
              <div className="w-auto h-auto">
                <div>
                  Offered in:{" "}
                  {inspected.terms.map((term, index) => {
                    return index === inspected.terms.length - 1
                      ? term
                      : term + ", ";
                  })}
                </div>
                <div>Restrictions: {getRestrictions()}</div>
              </div>
            </div>

            <div className="mb-3 mt-3">
              <p
                className="font-normal overflow-y-hidden"
                style={{ maxHeight: showMore === 1 ? "100%" : "6rem" }}
                ref={bioElRef}
              >
                {inspected.bio}
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
            </div>
            <PrereqDisplay />
          </div>
          <div className="flex flex-row flex-grow items-center mt-2">
            <div className="flex flex-col flex-grow justify-center">
              <div className="mb-1 font-medium">Selecting for</div>
              <div className="flex flex-row">
                <div className="flex flex-row items-center w-auto h-auto">
                  Year:
                  <select
                    className="ml-2 text-black text-coursecard rounded"
                    onChange={handleYearChange}
                    defaultValue={searchYear}
                  >
                    {years.map((year) => (
                      <option key={year + inspected.number} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-row items-center ml-5 w-auto h-auto">
                  Term:
                  <select
                    className="ml-2 h-6 rounded outline-none"
                    onChange={handleTermFilterChange}
                    defaultValue={semester}
                  >
                    {termFilters.map((term) => (
                      <option key={term + inspected.number} value={term}>
                        {term}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-row flex-grow items-center ml-5 w-auto h-auto">
                  Area:
                  <select
                    className="ml-2 w-14 h-6 rounded outline-none"
                    value={inspectedArea}
                    onChange={(event) => setInspectedArea(event.target.value)}
                  >
                    {getInspectedAreas()}
                  </select>
                </div>
              </div>
            </div>
            <button
              className="mt-2 p-2 w-1/6 h-10 text-white bg-primary rounded"
              onClick={addCourse}
            >
              Add Course
            </button>
          </div>
        </>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default CourseDisplay;
