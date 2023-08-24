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
  PostReq,
} from '../../../../resources/commonTypes';
import { inspect } from 'util';

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

  enum Terms {
    fall = 0,
    intersession = 1,
    spring = 2,
    summer = 3,
    error = 4,
  }
  const convertTermToInt = (term: string): Terms => {
    if (term === 'fall') {
      return Terms.fall;
    } else if (term === 'intersession') {
      return Terms.intersession;
    } else if (term === 'spring') {
      return Terms.spring;
    } else if (term === 'summer') {
      return Terms.summer;
    }
    return Terms.error;
  };

  /**
   * Parses through the currentPlan years and returns year object corresponding to the year of the prereq or the year the current popup corresponds to.
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
      return (
        convertTermToInt(prereqCourseTerm.toLowerCase()) <=
        convertTermToInt(currentCourseTerm.toLowerCase())
      );
    }
    return false;
  };

  const [hasPostReqs, setHasPostReqs] = useState<boolean>(false);

  const [satisfiedPostReqs, setHasSatisfiedPostReqs] = useState<PostReq[]>([]);
  const [unsatisfiedPostReqs, setHasUnsatisfiedPostReqs] = useState<PostReq[]>(
    [],
  );
  const tempSatisfiedPostReqs: PostReq[] = [];
  const tempUnsatisfiedPostReqs: PostReq[] = [];
  // const [sat, setSat] = useState<boolean>(true);

  useEffect(() => {
    setHasPostReqs(false);

    let postReqs = inspected !== 'None' ? inspected.versions[0].postReq : [];

    postReqs.forEach((course, index) => {
      getCourse(course.number, courseCache, currPlanCourses, index);
      if (checkIfSatisfied(course)) {
        tempSatisfiedPostReqs.push(course);
      } else {
        tempUnsatisfiedPostReqs.push(course);
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

  //preReqs is of the form (AS.050.111[C]^OR^(^AS.050.112[C]^AND^AS.050.113^)^)
  function checkIfSatisfied(course) {
    try {
      let str = course.preReqs;
      if (course.preReqs.length === 0) {
        return false;
      }
      //separates preReqs into components by using '^' as a delimiter.
      let fullArray = str.split('^', 100);

      let ind = fullArray.indexOf(')');
      let elements = ind;
      //repeats loops until you run out of ending parenthesis.
      while (ind !== -1) {
        //removes 5 items prior to end paranthesis of one of the following two forms:
        // Case 1:    [(, CourseNum, operation, CourseNum, )]
        // Case 2:    [previousOperation, CourseNum, operation, CourseNum, )]
        elements = fullArray.splice(ind - 4, 5);

        // isCourseBeforeOther(courseNum) returns true/false if that course has already been taken/not taken.
        // Thus, replacedElement simply becomes the result of CourseNum boolean operation CourseNum
        let replacedElement = '';
        if (elements[2] === 'AND') {
          replacedElement =
            isCourseBeforeOther(elements[1]) &&
            isCourseBeforeOther(elements[3]);
        } else {
          replacedElement =
            isCourseBeforeOther(elements[1]) ||
            isCourseBeforeOther(elements[3]);
          // fullArray.splice(
          //   ind - 4,
          //   0,
          //   isCourseBeforeOther(elements[1]) ||
          //     isCourseBeforeOther(elements[3]),
          // );
        }
        //if this is case 1, replace the entire expression with true or false.
        if (elements[0] === '(') {
          fullArray.splice(ind - 4, 0, replacedElement);
          //if this is case 2, replace just the courseNum, operation, and second course Num with true or false.
        } else {
          fullArray.splice(ind - 4, 0, elements[0], replacedElement, ')');
        }
        ind = fullArray.indexOf(')');
      }
      //Now repeats to resolve all of the AND operations left, as we know there are no more
      // paranthesis.
      ind = fullArray.indexOf('AND');
      while (ind !== -1) {
        elements = fullArray.splice(ind - 1, 3);
        fullArray.splice(
          ind - 1,
          0,
          isCourseBeforeOther(elements[0]) && isCourseBeforeOther(elements[2]),
        );
        ind = fullArray.indexOf('AND');
      }
      //Now repeats until all of the OR operations are resolved.
      ind = fullArray.indexOf('OR');
      while (ind !== -1) {
        elements = fullArray.splice(ind - 1, 3);
        fullArray.splice(
          ind - 1,
          0,
          isCourseBeforeOther(elements[0]) || isCourseBeforeOther(elements[2]),
        );
        ind = fullArray.indexOf('OR');
      }
      return isCourseBeforeOther(fullArray[0]);
    } catch (exception) {
      return false;
    }
  }

  //returns true if preReq course is found in plan, and occurs before or during current semester and year
  //note, this assumes the currently clicked course is taken if it's in the plan.
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
        <div
          className="flex justify-center items-center w-7 h-7 text-sm font-semibold text-black transition duration-200 ease-in transform rounded-full bg-gray-200 hover:scale-110"
          data-tooltip-content={`Green: Satisfied all prerequisites. Orange: Not all prerequisites satisfied.`}
          data-tooltip-id="godtip"
        >
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
