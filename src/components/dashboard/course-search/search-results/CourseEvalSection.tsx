import React, { useState, useEffect } from "react";
import { CourseEvals } from "../../../../resources/commonTypes";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectInspectedCourse } from "../../../../slices/searchSlice";
import CourseEvalCard from "./CourseEvalCard";
import clsx from "clsx";
import { api } from "../../../../resources/assets";

/**
 * Displays course Evaluations based on inspected course
 */
const CourseEvalSection = () => {
  let initialCourseEval: CourseEvals = {
    prof: "",
    number: "",
    rating: "",
    summary: "",
    term: "",
  };

  const inspected = useSelector(selectInspectedCourse);
  const [courseEvals, setEval] = useState(initialCourseEval);
  const [courseReviews, setReviews] = useState([]);
  const [selectedCourseEval, setSelectedCourseEval] = useState<number>(-1);

  // Gets all evaluations for a particular course.
  const getEvals = () => {
    // reset the course evals view
    setEval(initialCourseEval);
    setSelectedCourseEval(-1);
    setReviews([]);

    if (inspected !== "None" && inspected !== undefined) {
      axios
        .get(api + "/evals/" + inspected.number)
        .then((retrievedData) => {
          setReviews(retrievedData.data.data.rev);
        })
        .catch((err) => console.log(err, " - course likely does not exist"));
    }
  };

  // Updates the evaluations to a certain course evaluation.
  const updateEvals = (revIndex: number) => {
    // remove if already selected
    if (revIndex === selectedCourseEval) {
      setSelectedCourseEval(-1);
      return;
    }
    setSelectedCourseEval(revIndex);
    if (courseReviews.length !== 0) {
      const chosenRev = courseReviews[revIndex];
      let courseEval: CourseEvals = { ...initialCourseEval };
      courseEval.prof = chosenRev["i"];
      courseEval.rating = chosenRev["g"]; // random one
      courseEval.term = chosenRev["s"];
      courseEval.summary = chosenRev["c"];
      setEval(courseEval);
    }
  };

  // update every time inspected changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(getEvals, [inspected]);
  useEffect(() => {
    // default to latest
    updateEvals(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseReviews]);

  // Display component function.
  const displayEvals = () => {
    if (courseReviews.length === 0)
      return (
        <div className="flex flex-row justify-center mt-2">
          No reviews available!
        </div>
      );
    return (
      <div className="mt-2">
        {courseReviews.map(({ i, g, s }, index: number) => {
          return (
            <div>
              <button
                className={clsx(
                  "mb-2 border-b border-solid hover:border-black border-gray-300 transition duration-100 ease-in",
                  {
                    "border-gray-900": selectedCourseEval === index,
                  }
                )}
                onClick={() => {
                  updateEvals(index);
                }}
              >
                {s} | {i} | {g}
              </button>
              {selectedCourseEval === index ? (
                <CourseEvalCard
                  rating={courseEvals.rating}
                  summary={courseEvals.summary}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    );
  };

  return displayEvals();
};

export default CourseEvalSection;
