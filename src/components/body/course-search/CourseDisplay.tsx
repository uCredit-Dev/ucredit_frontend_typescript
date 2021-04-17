import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Distribution, UserCourse } from "../../commonTypes";
import {
  selectInspectedCourse,
  clearSearch,
  selectSemester,
  selectYear,
  selectPlaceholder,
  updatePlaceholder,
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

  // Adds course
  const addCourse = () => {
    // Take inspected, turn it into a user course, and add it to user courses
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

      updateDistributions(filteredDistribution);

      dispatch(clearSearch());
    }
  };

  const updateFilteredDistributions = (
    filteredDistribution: Distribution[],
    general: any,
    total: any,
    writtenIntensive: any
  ) => {
    if (inspected !== "None") {
      // determine which area course falls under
      // TODO: Try to automate this
      const areaToAdd =
        inspected.areas === "None" || inspected.areas === undefined
          ? []
          : inspected.areas.split("");

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
    }

    // If all areas are full and there is still more for general electives
    if (filteredDistribution.length === 0 && general !== null) {
      filteredDistribution.push(general);
    }

    if (total !== null) filteredDistribution.push(total);

    if (writtenIntensive !== null) filteredDistribution.push(writtenIntensive);
  };

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

  return (
    <div>
      {inspected === "None" ? (
        <div>No inspected Courses</div>
      ) : placeholder ? (
        <>
          <Placeholder addCourse={addCourse} />
        </>
      ) : (
        <div className="p-5 h-full overflow-scroll">
          <h1>{inspected.title}</h1>
          <h2>{inspected.number}</h2>
          <p>{inspected.credits} Credits</p>
          <h4>Areas: {inspected.areas}</h4>
          <h4>Department: {inspected.department}</h4>

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
          <p className="h-44 overflow-scroll">{inspected.bio}</p>
          <PrereqDisplay />
          <button className="bg-gray-300" onClick={addCourse}>
            Add Course
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseDisplay;
