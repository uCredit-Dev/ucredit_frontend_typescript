import React, { useState, useEffect } from "react";
import { Course, CourseEvals } from "../../../commonTypes";
import axios from "axios";

const api = "https://ucredit-api.herokuapp.com/api";

// Displays course Evaluations based on inspected course
const CourseEvalSection = (inspectedArea: any) => {

  const [courseEvalView, setCourseEvalView] = useState<number>(0);
  
  let initialCourseEval: CourseEvals = {
    prof: "",
    number: "",
    rating: "",
    summary: "",
    term: ""
  };

  const [courseEvals, setEval] = useState(initialCourseEval);
  const [courseReviews, setReviews] = useState([]);

  const getEvals = () => {
    // reset the course evals view
    setEval(initialCourseEval);
    setCourseEvalView(0);
    setReviews([]);

    if (inspectedArea !== "None" && inspectedArea !== undefined) {
      // console.log(inspectedArea);
      const inspected = inspectedArea.inspected;
      // console.log(api + "/evals/" + inspected.number)
      axios.get(api + "/evals/" + inspected.number)
      .then((retrievedData) => {
        // console.log(retrievedData.data.data.rev)
        setReviews(retrievedData.data.data.rev)
      })
      .catch((err) => console.log(err, " - course likely does not exist"));
    }
  }

  const updateEvals = (revIndex: number) => {
    if (courseReviews.length !== 0) {
      const chosenRev = courseReviews[revIndex];
      let courseEval: CourseEvals = {...initialCourseEval};
      courseEval.number = inspectedArea.inspected.number;
      courseEval.prof = chosenRev["i"];
      courseEval.rating = chosenRev["g"]; // random one
      courseEval.term = chosenRev["s"];
      courseEval.summary = chosenRev["c"];
      setEval(courseEval);
    }
  }

  // update every time inspected changes
  useEffect(getEvals, [inspectedArea]);
  useEffect(() => {
    // default to latest
    updateEvals(0);
    // console.log("default", inspectedArea.inspected.number, courseEvals);
  }, [courseReviews])

  const displayEvals = () => {
    if (courseReviews.length === 0)
      return (<div>No reviews available!</div>)
    if (courseReviews.length === 1) 
      return (
        <>
        <div>{courseEvals.term} | {courseEvals.prof} | {courseEvals.rating}</div>
        <div>Summary: {courseEvals.summary}</div>
        </>
      )
    return (
      <div>
      <div>List of available reviews: </div>
      {courseReviews.map(({i, g, s}, index: number) => {
        return(
        <div>
        <button className="underline" onClick={() => {
          console.log(index)
          updateEvals(index)
        }}>
          {s} | {i} | {g} 
        </button>
        </div>
        )
        })}
      <div>Selected review: </div>
      <div>{courseEvals.term} | {courseEvals.prof} | {courseEvals.rating}</div>
      <div>Summary: {courseEvals.summary}</div>
      </div>
    )
  }

  return(
    courseEvalView === 0 ? (
    <button
      className="underline"
      onClick={() => {
        setCourseEvalView(1);
      }}
    >
      Show Course Evaluations
    </button>
  ) : (
    <>
    <button
      className="underline"
      onClick={() => {
        setCourseEvalView(0);
      }}
    >
      Hide Course Evaluations
    </button>
    {displayEvals()}
    </>
  )); 
}

export default CourseEvalSection;
