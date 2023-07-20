import React, { useState, useEffect, FC } from 'react';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectSemester,
  selectYear,
  updateSearchStack,
  selectVersion,
  selectInspectedCourse,
} from '../../../../slices/searchSlice';
import {
  filterNNegatives,
  processPrereqs,
  checkPrereq,
} from '../../../../resources/assets';
import {
  selectCurrentPlanCourses,
  selectPlan,
} from '../../../../slices/currentPlanSlice';
import { selectCourseCache } from '../../../../slices/userSlice';
import { selectCourseToShow } from '../../../../slices/popupSlice';
import {
  SISRetrievedCourse,
  UserCourse,
  Year,
} from '../../../../resources/commonTypes';

const PostReqSection: FC = () => {
  const dispatch = useDispatch();
  const version = useSelector(selectVersion);
  const inspected = useSelector(selectInspectedCourse);
  const currPlanCourses = useSelector(selectCurrentPlanCourses);
  const semester = useSelector(selectSemester);
  const year = useSelector(selectYear);
  const currentPlan = useSelector(selectPlan);
  const courseCache = useSelector(selectCourseCache);
  const courseToShow = useSelector(selectCourseToShow);

  // Component states
  const [prereqDisplayMode, setPrereqDisplayMode] = useState(2);
  const [preReqDisplay, setPreReqDisplay] = useState<JSX.Element[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [hasPreReqs, setHasPreReqs] = useState<boolean>(false);
  const [NNegativePreReqs, setNNegativePreReqs] = useState<any[]>();  
  // This useEffect performs prereq retrieval every time a new course is displayed.
  useEffect(() => {
    // Reset state whenever new inspected course
    setPreReqDisplay([]);
    setLoaded(false);
    setHasPreReqs(false);

    // First get all valid preReqs (isNegative = true)
    let preReqs = filterNNegatives(version);
    setNNegativePreReqs(preReqs);
    // If there exists preReqs, we need to process and display them.
    if (version !== 'None' && preReqs.length > 0) {
      setHasPreReqs(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version, courseCache]);

  console.log("course" + " " + courseToShow?.number);
  console.log("course" + " " + courseToShow?.postReq);

  const hello =
        courseToShow?.postReq.map((course) => <div>{course.number} |  {course.title} | {course.credits}</div>)
    return (
        <div>
            <h1>Post-Requisites </h1>
            {hello}
        </div>
    )
}

export default PostReqSection;