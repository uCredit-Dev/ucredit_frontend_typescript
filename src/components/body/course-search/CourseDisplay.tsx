import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Course, UserCourse } from "../../commonTypes";
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
  updateSelectedPlan,
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

  // Function to return a list of clickable prereqs
  const getPreReqs = () =>
    inspected !== "None" && inspected.preReq.length > 0
      ? inspected.preReq.map(
          (prereq: { title: string; number: string; credits: string }) => (
            <button
              key={prereq.number}
              className="bg-gray-400"
              onClick={updateInspected(prereq)}
            >
              {prereq.number}
            </button>
          )
        )
      : "No Prereqs!";

  // Function currying to produce a function that would update the store when clicking on prereqs
  const updateInspected = (prereq: {
    title: string;
    number: string;
    credits: string;
  }) => () => {
    axios
      .get(api + "/search", { params: { number: prereq.number } })
      .then((retrieved) => {
        const retrievedCourse = retrieved.data.data;
        dispatch(updateInspectedCourse(retrievedCourse));
      });
  };

  // Adds course
  const addCourse = () => {
    // Take inspected, turn it into a user course, and add it to user courses
    if (inspected !== "None") {
      let newUserCourse: UserCourse;
      const body = {
        user_id: user._id,
        title: inspected.title,
        term: semester.toLowerCase(),
        year: year.toLowerCase(),
        credits: inspected.credits,
        distribution_ids: [],
        plan_id: currentPlan._id,
      };

      fetch(api + "/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((retrieved) => {
        retrieved.json().then((data) => {
          console.log("retrievedJson is ", data);
          newUserCourse = { ...data.data };
          const newPlan = { ...currentPlan };
          console.log(newPlan);
          console.log(newUserCourse);
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
        });
      });
      dispatch(clearSearch());
    }
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
            {inspected.terms.map((term) => (
              <div>{term}</div>
            ))}
          </p>
          <p>{inspected.bio}</p>
          <p>
            <p className="border-b-2">Prerequisites</p> <p>{getPreReqs()}</p>
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
