import React, { useState, useEffect, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectSemester,
  selectYear,
  updateSearchStack,
  selectVersion,
  selectInspectedCourse,
} from '../../../../slices/searchSlice';
import { getCourse, getCourseYear } from '../../../../resources/assets';
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

  const convertTermToInt = (term: string): number => {
    if (term === 'fall') {
      return 0;
    } else if (term === 'intersession') {
      return 2;
    } else if (term === 'spring') {
      return 3;
    } else if (term === 'summer') {
      return 4;
    }
    return 5;
  };

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

  const currentSemester = courseToShow
    ? courseToShow.term.toLowerCase()
    : semester.toLowerCase();
  const currentYear = getYearById(courseToShow).year;

  const compareDates = (
    currentCourseTerm: string,
    currentCourseYear: number,
    prereqCourseTerm: string,
    preReqCourseYear: number | undefined,
  ) => {
    if (preReqCourseYear || 10 < currentCourseYear) {
      return true;
    } else if (preReqCourseYear === currentCourseYear) {
      if (
        convertTermToInt(prereqCourseTerm) <=
        convertTermToInt(currentCourseTerm)
      ) {
        return true;
      }
      return false;
    }
    return false;
  };

  const [hasPostReqs, setHasPostReqs] = useState<boolean>(false);

  const [satisfiedPostReqs, setHasSatisfiedPostReqs] = useState<any[]>([]);
  const [unsatisfiedPostReqs, setHasUnsatisfiedPostReqs] = useState<any[]>([]);
  const tempSatisfiedPostReqs: any[] = [];
  const tempUnsatisfiedPostReqs: any[] = [];
  // const [sat, setSat] = useState<boolean>(true);

  useEffect(() => {
    setHasPostReqs(false);

    let postReqs = inspected.versions[0].postReq;

    postReqs.map((course, index) => {
      getCourse(course.number, courseCache, currPlanCourses, index);
      if (checkIfSatisfied(course)) {
        tempSatisfiedPostReqs.push({
          ...course,
        });
      } else {
        tempUnsatisfiedPostReqs.push({
          ...course,
        });
      }
      return null;
    });
    setHasSatisfiedPostReqs(tempSatisfiedPostReqs);
    setHasUnsatisfiedPostReqs(tempUnsatisfiedPostReqs);
    if (version !== 'None' && postReqs.length > 0) {
      setHasPostReqs(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version, courseCache]);

  function checkIfSatisfied(course) {
    try {
      var str = course.preReqs;
      if (course.preReqs.length === 0) {
        return false;
      }
      var fullArray = str.split('^', 100);
      var ind = fullArray.indexOf(')');
      console.log(fullArray);
      var elements = ind;
      while (ind !== -1) {
        elements = fullArray.splice(ind - 4, 5);
        if (elements[2] === 'AND') {
          fullArray.splice(
            ind - 4,
            0,
            isCourseBeforeOther(elements[1]) &&
              isCourseBeforeOther(elements[3]),
          );
        } else {
          fullArray.splice(
            ind - 4,
            0,
            isCourseBeforeOther(elements[1]) ||
              isCourseBeforeOther(elements[3]),
          );
        }
        ind = fullArray.indexOf(')');
        console.log(fullArray);
      }
      ind = fullArray.indexOf('AND');
      while (ind !== -1) {
        elements = fullArray.splice(ind - 1, 3);
        fullArray.splice(
          ind - 1,
          0,
          isCourseBeforeOther(elements[0]) && isCourseBeforeOther(elements[2]),
        );
        ind = fullArray.indexOf('AND');
        console.log(fullArray);
      }

      ind = fullArray.indexOf('OR');
      while (ind !== -1) {
        elements = fullArray.splice(ind - 1, 3);
        fullArray.splice(
          ind - 1,
          0,
          isCourseBeforeOther(elements[0]) || isCourseBeforeOther(elements[2]),
        );
        ind = fullArray.indexOf('OR');
        console.log(fullArray);
      }
      console.log(fullArray);
      return isCourseBeforeOther(fullArray[0]);
    } catch (exception) {
      return false;
    }
  }

  //returns true if preReq course is found in plan, and occurs before or during current semester and year
  //note, this assumes the current popUp course is taken if its not been added yet!
  function isCourseBeforeOther(preReqCourseString) {
    if (preReqCourseString === true || preReqCourseString === false) {
      return preReqCourseString;
    }
    for (let course of currPlanCourses) {
      if (
        course.number ===
        preReqCourseString.substring(0, preReqCourseString.length - 3)
      ) {
        const retrievedYear = getCourseYear(currentPlan, course)?.year;
        const retrievedSemester = course.term;
        //in case course is in plan twice, only return true if its definitely found before.
        if (
          compareDates(
            currentSemester,
            currentYear,
            retrievedSemester,
            retrievedYear,
          )
        ) {
          // if(prereqInPastOrCurrent(course, currYear , semester, currentPlan) === true)
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

  const satisfiedPostReqsComponents = satisfiedPostReqs.map((course, index) => (
    <div
      key={index}
      className="courseItem"
      style={{ borderBottom: '1px solid #ccc', margin: '5px 0' }}
    >
      <button
        className="flex justify-between text-green-700 hover:text-green-900 hover:border-green-900"
        onClick={() => updateInspected(course.number)()}
      >
        <div className="flex-grow">
          {course.number} {course.title}
        </div>
        <div
          className="w-5 ml-2 mb-1 items-center font-semibold text-white transition duration-200 ease-in transform rounded select-none bg-primary hover:scale-110"
          data-tooltip-content={`${course.credits} credits`}
          data-tooltip-id="godtip"
        >
          {course.credits}
        </div>
      </button>
    </div>
  ));

  const unsatisfiedPostReqsComponents = unsatisfiedPostReqs.map(
    (course, index) => (
      <div
        key={index}
        className="courseItem"
        style={{ borderBottom: '1px solid #ccc', margin: '5px 0' }}
      >
        <button
          className="flex justify-between hover:text-red-900 text-red-700 hover:border-red-900"
          onClick={() => updateInspected(course.number)()}
        >
          <div className="flex-grow">
            {course.number} {course.title}
          </div>
          <div
            className="w-5 ml-2 mb-1 items-center font-semibold text-white transition duration-200 ease-in transform rounded select-none bg-primary hover:scale-110"
            data-tooltip-content={`${course.credits} credits`}
            data-tooltip-id="godtip"
          >
            {course.credits}
          </div>
        </button>
      </div>
    ),
  );

  const noPostReqs = <div> This course has no post-reqs </div>;
  // const message = sat
  //   ? 'Currently Displaying satisfied postreqs, click to display unsatisfied postreqs'
  //   : 'Currently Displaying unsatisfied postreqs, click to display satisfied postreqs';

  return (
    <div className="relative">
      <div className="absolute top-0 right-0">
        <div className="flex justify-center items-center w-7 h-7 text-sm font-semibold text-black transition duration-200 ease-in transform rounded-full bg-gray-200 hover:scale-110" 
            data-tooltip-content={`Green: Satisfied all prerequisites. Orange: Not all prerequisites satisfied.`} 
            data-tooltip-id="godtip">
          ?
        </div>
      </div>
      {/* <button onClick={() => setSat(!sat)}>{message}</button> */}
      {/* {hasPostReqs ? sat ? satisfiedPostReqsComponents: unsatisfiedPostReqsComponents : noPostReqs} */}
      
      {hasPostReqs
        ? [satisfiedPostReqsComponents, unsatisfiedPostReqsComponents]
        : noPostReqs}
    </div>
  );
};

export default PostReqSection;
import React, { useState, useEffect, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectSemester,
  selectYear,
  updateSearchStack,
  selectVersion,
  selectInspectedCourse,
} from '../../../../slices/searchSlice';
import { getCourse, getCourseYear } from '../../../../resources/assets';
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

  const convertTermToInt = (term: string): number => {
    if (term === 'fall') {
      return 0;
    } else if (term === 'intersession') {
      return 2;
    } else if (term === 'spring') {
      return 3;
    } else if (term === 'summer') {
      return 4;
    }
    return 5;
  };

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

  const currentSemester = courseToShow
    ? courseToShow.term.toLowerCase()
    : semester.toLowerCase();
  const currentYear = getYearById(courseToShow).year;

  const compareDates = (
    currentCourseTerm: string,
    currentCourseYear: number,
    prereqCourseTerm: string,
    preReqCourseYear: number | undefined,
  ) => {
    if (preReqCourseYear || 10 < currentCourseYear) {
      return true;
    } else if (preReqCourseYear === currentCourseYear) {
      if (
        convertTermToInt(prereqCourseTerm) <=
        convertTermToInt(currentCourseTerm)
      ) {
        return true;
      }
      return false;
    }
    return false;
  };

  const [hasPostReqs, setHasPostReqs] = useState<boolean>(false);

  const [satisfiedPostReqs, setHasSatisfiedPostReqs] = useState<any[]>([]);
  const [unsatisfiedPostReqs, setHasUnsatisfiedPostReqs] = useState<any[]>([]);
  const tempSatisfiedPostReqs: any[] = [];
  const tempUnsatisfiedPostReqs: any[] = [];
  // const [sat, setSat] = useState<boolean>(true);

  useEffect(() => {
    setHasPostReqs(false);

    let postReqs = inspected.versions[0].postReq;

    postReqs.map((course, index) => {
      getCourse(course.number, courseCache, currPlanCourses, index);
      if (checkIfSatisfied(course)) {
        tempSatisfiedPostReqs.push({
          ...course,
        });
      } else {
        tempUnsatisfiedPostReqs.push({
          ...course,
        });
      }
      return null;
    });
    setHasSatisfiedPostReqs(tempSatisfiedPostReqs);
    setHasUnsatisfiedPostReqs(tempUnsatisfiedPostReqs);
    if (version !== 'None' && postReqs.length > 0) {
      setHasPostReqs(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version, courseCache]);

  function checkIfSatisfied(course) {
    try {
      var str = course.preReqs;
      if (course.preReqs.length === 0) {
        return false;
      }
      var fullArray = str.split('^', 100);
      var ind = fullArray.indexOf(')');
      console.log(fullArray);
      var elements = ind;
      while (ind !== -1) {
        elements = fullArray.splice(ind - 4, 5);
        if (elements[2] === 'AND') {
          fullArray.splice(
            ind - 4,
            0,
            isCourseBeforeOther(elements[1]) &&
              isCourseBeforeOther(elements[3]),
          );
        } else {
          fullArray.splice(
            ind - 4,
            0,
            isCourseBeforeOther(elements[1]) ||
              isCourseBeforeOther(elements[3]),
          );
        }
        ind = fullArray.indexOf(')');
        console.log(fullArray);
      }
      ind = fullArray.indexOf('AND');
      while (ind !== -1) {
        elements = fullArray.splice(ind - 1, 3);
        fullArray.splice(
          ind - 1,
          0,
          isCourseBeforeOther(elements[0]) && isCourseBeforeOther(elements[2]),
        );
        ind = fullArray.indexOf('AND');
        console.log(fullArray);
      }

      ind = fullArray.indexOf('OR');
      while (ind !== -1) {
        elements = fullArray.splice(ind - 1, 3);
        fullArray.splice(
          ind - 1,
          0,
          isCourseBeforeOther(elements[0]) || isCourseBeforeOther(elements[2]),
        );
        ind = fullArray.indexOf('OR');
        console.log(fullArray);
      }
      console.log(fullArray);
      return isCourseBeforeOther(fullArray[0]);
    } catch (exception) {
      return false;
    }
  }

  //returns true if preReq course is found in plan, and occurs before or during current semester and year
  //note, this assumes the current popUp course is taken if its not been added yet!
  function isCourseBeforeOther(preReqCourseString) {
    if (preReqCourseString === true || preReqCourseString === false) {
      return preReqCourseString;
    }
    for (let course of currPlanCourses) {
      if (
        course.number ===
        preReqCourseString.substring(0, preReqCourseString.length - 3)
      ) {
        const retrievedYear = getCourseYear(currentPlan, course)?.year;
        const retrievedSemester = course.term;
        //in case course is in plan twice, only return true if its definitely found before.
        if (
          compareDates(
            currentSemester,
            currentYear,
            retrievedSemester,
            retrievedYear,
          )
        ) {
          // if(prereqInPastOrCurrent(course, currYear , semester, currentPlan) === true)
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

  const satisfiedPostReqsComponents = satisfiedPostReqs.map((course, index) => (
    <div
      key={index}
      className="courseItem"
      style={{ borderBottom: '1px solid #ccc', margin: '5px 0' }}
    >
      <button
        className="flex justify-between text-green-700 hover:text-green-900 hover:border-green-900"
        onClick={() => updateInspected(course.number)()}
      >
        <div className="flex-grow">
          {course.number} {course.title}
        </div>
        <div
          className="w-5 ml-2 items-center font-semibold text-white transition duration-200 ease-in transform rounded select-none bg-primary hover:scale-110"
          data-tooltip-content={`${course.credits} credits`}
          data-tooltip-id="godtip"
        >
          {course.credits}
        </div>
      </button>
    </div>
  ));

  const unsatisfiedPostReqsComponents = unsatisfiedPostReqs.map(
    (course, index) => (
      <div
        key={index}
        className="courseItem"
        style={{ borderBottom: '1px solid #ccc', margin: '5px 0' }}
      >
        <button
          className="flex justify-between hover:text-red-900 text-red-700 hover:border-red-900"
          onClick={() => updateInspected(course.number)()}
        >
          <div className="flex-grow">
            {course.number} {course.title}
          </div>
          <div
            className="w-5 ml-2 items-center font-semibold text-white transition duration-200 ease-in transform rounded select-none bg-primary hover:scale-110"
            data-tooltip-content={`${course.credits} credits`}
            data-tooltip-id="godtip"
          >
            {course.credits}
          </div>
        </button>
      </div>
    ),
  );

  const noPostReqs = <div> This course has no post-reqs </div>;
  // const message = sat
  //   ? 'Currently Displaying satisfied postreqs, click to display unsatisfied postreqs'
  //   : 'Currently Displaying unsatisfied postreqs, click to display satisfied postreqs';

  return (
    <div>
      {/* <button onClick={() => setSat(!sat)}>{message}</button> */}
      {/* {hasPostReqs ? sat ? satisfiedPostReqsComponents: unsatisfiedPostReqsComponents : noPostReqs} */}
      {hasPostReqs
        ? [satisfiedPostReqsComponents, unsatisfiedPostReqsComponents]
        : noPostReqs}
    </div>
  );
};

export default PostReqSection;
