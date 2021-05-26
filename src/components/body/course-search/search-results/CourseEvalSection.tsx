import React, { useState, useEffect } from "react";
import { CourseEvals } from "../../../commonTypes";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectInspectedCourse } from "../../../slices/searchSlice";

const api = "https://ucredit-api.herokuapp.com/api";

// Displays course Evaluations based on inspected course
// const CourseEvalSection = (inspectedArea: any) => {
const CourseEvalSection = () => {
  const inspected = useSelector(selectInspectedCourse);
  // const [courseEvalView, setCourseEvalView] = useState<number>(0);
  const [selectedCourseEval, setSelectedCourseEval] = useState<number>(0);

  let initialCourseEval: CourseEvals = {
    prof: "",
    number: "",
    rating: "",
    summary: "",
    term: "",
  };

  const [courseEvals, setEval] = useState(initialCourseEval);
  const [courseReviews, setReviews] = useState([]);

  const getEvals = () => {
    // reset the course evals view
    setEval(initialCourseEval);
    // setCourseEvalView(0);
    setSelectedCourseEval(0);
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

  const updateEvals = (revIndex: number) => {
    setSelectedCourseEval(revIndex);
    if (courseReviews.length !== 0) {
      const chosenRev = courseReviews[revIndex];
      let courseEval: CourseEvals = { ...initialCourseEval };
      // courseEval.number = inspected.number;
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

  const displayEvals = () => {
    if (courseReviews.length === 0) return <div>No reviews available!</div>;
    if (courseReviews.length === 1)
      return (
        <>
          <div>
            {courseEvals.term} | {courseEvals.prof} | {courseEvals.rating}
          </div>
          <div>Summary: {courseEvals.summary}</div>
        </>
      );
    return (
      <div>
        {/* <div>List of available reviews: </div> */}
        {courseReviews.map(({ i, g, s }, index: number) => {
          return (
            <div>
              <button
                className="underline"
                onClick={() => {
                  updateEvals(index);
                }}
              >
                {s} | {i} | {g}
              </button>
              {selectedCourseEval === index ? (
                <>
                  {/* <div>{courseEvals.term} | {courseEvals.prof} | {courseEvals.rating}</div> */}
                  <div>Rating: {courseEvals.rating}</div>
                  <div>Summary: {courseEvals.summary}</div>
                </>
              ) : null}
            </div>
          );
        })}
        {/* <div>Selected review: </div> */}
      </div>
    );
  };

  return displayEvals();
  // return(
  //   courseEvalView === 0 ? (
  //   <button
  //     className="underline"
  //     onClick={() => {
  //       setCourseEvalView(1);
  //     }}
  //   >
  //     Show Course Evaluations
  //   </button>
  // ) : (
  //   <>
  //   <button
  //     className="underline"
  //     onClick={() => {
  //       setCourseEvalView(0);
  //     }}
  //   >
  //     Hide Course Evaluations
  //   </button>
  //   {displayEvals()}
  //   </>
  // ));
};

export default CourseEvalSection;
