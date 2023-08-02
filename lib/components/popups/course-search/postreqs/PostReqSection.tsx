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
  prereqInPast
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



  /**
   * Parses through the currentPlan years and returns year object corresponding to the year of the prereq or the current year if not found
   * @param toShow - course to find year of
   *  @returns year object
   */
  const getYearById = (toShow: UserCourse | null): Year => {
    const yearToGet: string = toShow ? toShow.year_id : year;
    for (const yearObj of currentPlan.years) {
      if (yearObj._id === yearToGet) {
        return yearObj;
      }
    }
    return currentPlan.years[currentPlan.years.length - 1];
  };

  const currYear = getYearById(courseToShow);
  const currSemester: string =
  courseToShow !== null
    ? courseToShow.term.charAt(0).toUpperCase() +
      courseToShow.term.slice(1)
    : semester;
    // This useEffect performs prereq retrieval every time a new course is displayed.
    useEffect(() => {
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [version, courseCache]);

  // Component states
  //const [postReqDisplay, setPostReqDisplay] = useState<JSX.Element[]>([]);
  //const [loaded, setLoaded] = useState<boolean>(false);
  const [hasPostReqs, setHasPostReqs] = useState<boolean>(false);
  // const postReqsWithSatisfied = [];
  // const postReqsWithoutSatisfied = [];
  const [postReqsWithSatisfied, setHasPostReqsWithSatisfied] = useState<any[]>([]);
  const [postReqsWithoutSatisfied, setHasPostReqsWithoutSatisfied] = useState<any[]>([]);
  const postReqsWithSatisfied1: any[] = [];
  const postReqsWithoutSatisfied1: any[] = [];

  //console.log(currYear.year);


  useEffect(() => {
    // Reset state whenever new inspected course
    //setPostReqDisplay([]);
    //setLoaded(false);
    setHasPostReqs(false);

    let postReqs = inspected.versions[0].postReq;


    postReqs.map((course) => {
      getCourse(course.number, courseCache, currPlanCourses);
      let satisfied=false;
      if(checkIfSatisfied(course))
      {
        postReqsWithSatisfied1.push({
          ...course,
          satisfied: true,
        });
      }
      else {
        postReqsWithoutSatisfied1.push({
          ...course,
          satisfied: false,
        });
      }
      //console.log(postReqsWithSatisfied);
      });
    setHasPostReqsWithSatisfied(postReqsWithSatisfied1);
    setHasPostReqsWithoutSatisfied(postReqsWithoutSatisfied1);
    // If there exists preReqs, we need to process and display them.
    if (version !== 'None' && postReqs.length > 0) {
      setHasPostReqs(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version, courseCache]);

  function checkIfSatisfied(course) {
    try {
      var str=course.preReqs;
      if(course.preReqs.length === 0) {
        return false;
      }
      var fullArray= str.split("^", 100);
      var ind=fullArray.indexOf(")");
      while(ind !== -1)
      {
        
        var elements = fullArray.splice(ind-4, 5);
        if(elements[2]==="AND")
        {
          fullArray.splice(ind-4, 0, isCourseBeforeOther(elements[1]) && isCourseBeforeOther(elements[3]));
        }
        else
        {
          fullArray.splice(ind-4, 0, isCourseBeforeOther(elements[1]) || isCourseBeforeOther(elements[3]));
        }
        ind=fullArray.indexOf(")");
      }
      ind=fullArray.indexOf("AND");
      while(ind !== -1)
      {
        var elements = fullArray.splice(ind-1, 3);
        fullArray.splice(ind-1, 0, isCourseBeforeOther(elements[0]) && isCourseBeforeOther(elements[2]));
        ind=fullArray.indexOf("AND");
      }

      ind=fullArray.indexOf("OR");
      while(ind !== -1)
      {
        var elements = fullArray.splice(ind-1, 3);
        fullArray.splice(ind-1, 0, isCourseBeforeOther(elements[0]) || isCourseBeforeOther(elements[2]));
        var ind=fullArray.indexOf("OR");
      }
      return isCourseBeforeOther(fullArray[0]);
    } catch (exception)
    {
      return false;
    }

  }

  //returns true if preReq course is found in plan, and occurs before current semester and year
  //note, this assumes the current popUp course is not taken yet if its not been added yet!
  function isCourseBeforeOther(preReqCourseString) {
    if(preReqCourseString === true || preReqCourseString === false)
    {
      return preReqCourseString;
    }
    for(let course of currPlanCourses)
    {
      if(course.number === preReqCourseString.substring(0,preReqCourseString.length-3))
      {
        //in case course is in plan twice, only retun true if its definitely found before.
        if(prereqInPast(course, currYear, semester, currentPlan) === true)
        {
          return true;
        }
      }
    }
    return false;
  }


  

  const updateInspected =
    (courseNumber: string): (() => void) =>
    (): void => {
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

  const hello =
  postReqsWithSatisfied.map((course, index) => 
    <div key={index} className="courseItem" style={{borderBottom: '1px solid #ccc', margin: '5px 0', }}>
      <button className="flex justify-between text-green-200" onClick={() => updateInspected(course.number)()}>
        <div className="flex-grow">{course.number} {course.title}</div>
        <div className="w-5 ml-2 items-center font-semibold text-white transition duration-200 ease-in transform rounded select-none bg-primary hover:scale-110" 
            data-tooltip-content={`${course.credits} credits`} 
            data-tooltip-id="godtip">{course.credits}</div>
      </button>
    </div>
  );

  const hello2 =
  postReqsWithoutSatisfied.map((course, index) => 
    <div key={index} className="courseItem" style={{borderBottom: '1px solid #ccc', margin: '5px 0'}}>
      <button className="flex justify-between text-orange-200" onClick={() => updateInspected(course.number)()}>
        <div className="flex-grow">{course.number} {course.title}</div>
        <div className="w-5 ml-2 items-center font-semibold text-white transition duration-200 ease-in transform rounded select-none bg-primary hover:scale-110" 
            data-tooltip-content={`${course.credits} credits`} 
            data-tooltip-id="godtip">{course.credits}</div>
      </button>
    </div>
  );

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
            {hasPostReqs ? [hello, hello2] : hello3}

        </div>
    )
}

export default PostReqSection;