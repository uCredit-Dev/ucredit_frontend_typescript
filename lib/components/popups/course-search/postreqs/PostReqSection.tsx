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
  getCourse,
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

    // This useEffect performs prereq retrieval every time a new course is displayed.
    useEffect(() => {
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [version, courseCache]);

  // Component states
  //const [postReqDisplay, setPostReqDisplay] = useState<JSX.Element[]>([]);
  //const [loaded, setLoaded] = useState<boolean>(false);
  const [hasPostReqs, setHasPostReqs] = useState<boolean>(false);
  const postReqsWithSatisfied = [];
  const postReqsWithoutSatisfied = [];


  const getYearById = (toShow: UserCourse | null): Year => {
    const yearToGet: string = toShow ? toShow.year_id : year;
    for (const yearObj of currentPlan.years) {
      if (yearObj._id === yearToGet) {
        return yearObj;
      }
    }
    return currentPlan.years[currentPlan.years.length - 1];
  };

  console.log(semester);


  useEffect(() => {
    // Reset state whenever new inspected course
    //setPostReqDisplay([]);
    //setLoaded(false);
    setHasPostReqs(false);

    let postReqs = inspected.versions[0].postReq;

    console.log(postReqs);
    let realPostReqs = postReqs.map((course) => {
      console.log("hello");
      getCourse(course.number, courseCache, currPlanCourses);
      let satisfied=false;
      if(course.title.length > "10")
      {
        postReqsWithSatisfied.push({
          ...course,
          satisfied: true,
        });
      }
      else {
        postReqsWithoutSatisfied.push({
          ...course,
          satisfied: false,
        });
      }
      console.log("postreq satisfied: " + postReqsWithSatisfied);
      console.log("postreq not satisfied: " + postReqsWithoutSatisfied);
      });
    // If there exists preReqs, we need to process and display them.
    if (version !== 'None' && postReqs.length > 0) {
      setHasPostReqs(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version, courseCache]);


  //console.log(courseCache)
  //console.log(courseToShow);
  const updateInspected =
    (courseNumber: string): (() => void) =>
    (): void => {
      console.log("clicked")
      courseCache.forEach((course: SISRetrievedCourse) => {
        if (
          course.number === courseNumber &&
          inspected !== 'None' &&
          version !== 'None'
        ) {
          dispatch(
            updateSearchStack({
              new: course,
              oldSIS: inspected,
              oldV: version,
            }),
          );
        }
      });
    };
  // const hello =
  //       courseToShow?.postReq.map((course) => <div>{course.number} |  {course.title} | {course.credits}</div>)
  const hello =
        postReqsWithSatisfied.map((course) => <button onClick={() => updateInspected(course.number)()}

        >{course.number} |  {course.title} | {course.credits}</button>);
  const hello2 =
        postReqsWithoutSatisfied.map((course) => <button onClick={() => updateInspected(course.number)()}

        >{course.number} |  {course.title} | {course.credits}</button>);
        
  const hello4 =
  inspected.versions[0].postReq.map((course, index) => 
    <div key={index} className="courseItem" style={{borderBottom: '1px solid #ccc', margin: '5px 0'}}>
      <button className="flex justify-between" onClick={() => updateInspected(course.number)()}>
        <div className="flex-grow">{course.number} {course.title}</div>
        <div className="w-5 ml-2 items-center font-semibold text-white transition duration-200 ease-in transform rounded select-none bg-primary hover:scale-110" 
            data-tooltip-content={`${course.credits} credits`} 
            data-tooltip-id="godtip">{course.credits}</div>
      </button>
    </div>
  );

  const hello3 = <div> This course has no post-reqs </div>;
    return (
        <div>
            {hasPostReqs ? hello4 : hello3}

        </div>
    )
}

export default PostReqSection;