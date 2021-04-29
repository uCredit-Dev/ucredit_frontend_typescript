import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Distribution,
  FilterType,
  SemesterType,
  UserCourse,
  YearType,
} from "../../commonTypes";
import {
  selectInspectedCourse,
  clearSearch,
  selectSemester,
  selectYear,
  selectPlaceholder,
  updatePlaceholder,
  updateSearchTime,
  updateSearchFilters,
  updateInspectedCourse,
} from "../../slices/searchSlice";
import {
  selectUser,
  selectPlan,
  selectPlanList,
  selectDistributions,
  updateSelectedPlan,
  updatePlanList,
} from "../../slices/userSlice";
import Placeholder from "./Placeholder";
import PrereqDisplay from "./PrereqDisplay";
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
    if (inspected !== "None" && inspected.areas !== "None") {
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
      const areaOptions = inspected.areas
        .split("")
        .map((area) => <option value={area}>{area}</option>);
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
      const restrictions = inspected.restrictions.map((restriction) => (
        <div className="font-normal">{restriction.RestrictionName}</div>
      ));
      if (restrictions.length !== 0) {
        return restrictions;
      } else {
        return <div className="ml-5 font-normal">No Restrictions!</div>;
      }
    }
  };

  const bioElRef = useRef<HTMLParagraphElement>(null);
  const [showMore, setShowMore] = useState<number>(2);
  useEffect(() => {
    let hasOverflowingChildren = false;
    if (bioElRef.current !== null) {
      console.log("element is ", bioElRef.current);
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
    <div className="flex flex-col p-5 w-full bg-gray-200">
      {inspected === "None" ? (
        <div className="flex flex-col items-center justify-center w-full h-full font-normal">
          No selected course!
        </div>
      ) : placeholder ? (
        <>
          <Placeholder addCourse={addCourse} />
        </>
      ) : (
        <>
          <div
            className="p-5 pt-4 w-full text-base font-medium bg-white rounded overflow-y-auto"
            style={{
              height: "90%",
            }}
          >
            <div className="flex flex-row mb-1">
              <h1 className="flex-grow text-2xl font-bold">
                {inspected.title}
              </h1>
              <button className="mr-5 text-2xl" onClick={clearInspected}>
                X
              </button>
            </div>
            <div className="flex flex-row">
              <div className="w-3/6">
                <h2>{inspected.number}</h2>
                <p>{inspected.credits} Credits</p>
                <h4 className="flex flex-row">
                  Areas: <div className="font-normal">{inspected.areas}</div>
                </h4>
                <h4>
                  Department:{" "}
                  <div className="font-normal">{inspected.department}</div>
                </h4>
              </div>
              <div className="w-3/6">
                <p>
                  Offered in:
                  {inspected.terms.map((term) => (
                    <div className="ml-5 font-normal">{term}</div>
                  ))}
                </p>
                <p>Restrictions: {getRestrictions()}</p>
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
                      <option key={year} value={year}>
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
                      <option key={term} value={term}>
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
    </div>
  );
};

export default CourseDisplay;
