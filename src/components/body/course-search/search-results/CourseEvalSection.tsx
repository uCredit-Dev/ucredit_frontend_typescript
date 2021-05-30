import React, { useState, useEffect } from "react";
import { Course, CourseEvals } from "../../../commonTypes";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  selectInspectedCourse,
} from "../../../slices/searchSlice";
import { number } from "prop-types";

const api = "https://ucredit-api.herokuapp.com/api";

// Displays course Evaluations based on inspected course
// Consider turning selected Course Evals, selected Course evals into an array to display multiple sim??
const CourseEvalSection = () => {

  const inspected = useSelector(selectInspectedCourse);
  // const [courseEvalView, setCourseEvalView] = useState<number>(0);
  const [selectedCourseEval, setSelectedCourseEval] = useState<number[]>([0]);
  
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
    // setCourseEvalView(0);
    setSelectedCourseEval([0]);
    setReviews([]);

    if (inspected !== "None" && inspected !== undefined) {
      // console.log(inspectedArea);
      // const inspected = inspectedArea.inspected;
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
    // Check if need to collapse
    if (selectedCourseEval.includes(revIndex)) {
      // selectedCourseEval.splice(revIndex);
      // setSelectedCourseEval(selectedCourseEval);
      setSelectedCourseEval([-1]);
      return;
    }
    // otherwise add to the list
    // selectedCourseEval.push(revIndex);
    // setSelectedCourseEval(selectedCourseEval);
    setSelectedCourseEval([revIndex]);
    if (courseReviews.length !== 0) {
      const chosenRev = courseReviews[revIndex];
      let courseEval: CourseEvals = {...initialCourseEval};
      // courseEval.number = inspected.number;
      courseEval.prof = chosenRev["i"];
      courseEval.rating = chosenRev["g"]; // random one
      courseEval.term = chosenRev["s"];
      courseEval.summary = chosenRev["c"];
      setEval(courseEval);
    }
  }

  // update every time inspected changes
  useEffect(getEvals, [inspected]);
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
      {/* <div>List of available reviews: </div> */}
      {courseReviews.map(({i, g, s}, index: number) => {
        return(
        <div>
        <button className="underline" onClick={() => {
          updateEvals(index)
        }}>
          {s} | {i} | {g} 
        </button>
        {selectedCourseEval.includes(index) ?
        (<>
        <div>Rating: {courseEvals.rating}</div>
        <div>Summary: {courseEvals.summary}</div>
        </>) : null
        }
      </div>
        )
        })}
      </div>
    )
  }

  return(displayEvals())
}

export default CourseEvalSection;
