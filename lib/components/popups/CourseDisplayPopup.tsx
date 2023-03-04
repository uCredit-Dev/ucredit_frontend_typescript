import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Placeholder from './course-search/search-results/Placeholder';
import {
  Course,
  Plan,
  SISRetrievedCourse,
  UserCourse,
  Year,
} from '../../resources/commonTypes';
import {
  selectCourseToShow,
  updateCourseToShow,
  updateShowCourseInfo,
} from '../../slices/popupSlice';
import {
  updateInspectedCourse,
  updatePlaceholder,
  updateInspectedVersion,
  selectPlaceholder,
  selectVersion,
  clearSearch,
} from '../../slices/searchSlice';
import {
  selectCourseCache,
  selectPlanList,
  selectToken,
  selectUser,
  updatePlanList,
} from '../../slices/userSlice';
import {
  selectCurrentPlanCourses,
  updateCurrentPlanCourses,
  updateSelectedPlan,
} from '../../slices/currentPlanSlice';
import { toast } from 'react-toastify';
import { getAPI } from '../../resources/assets';
import SisCourse from './course-search/search-results/SisCourse';

/**
 * Course info popup that opens when user preses info button on course components
 */
const CourseDisplayPopup: FC = () => {
  // Redux Setup
  const dispatch = useDispatch();
  const courseToShow: UserCourse | null = useSelector(selectCourseToShow);
  const courseCache = useSelector(selectCourseCache);
  const placeholder = useSelector(selectPlaceholder);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const version = useSelector(selectVersion);
  const planList = useSelector(selectPlanList);
  const currentCourses = useSelector(selectCurrentPlanCourses);

  const [inspectedArea, setInspectedArea] = useState<string>('None');

  useEffect(() => {
    if (courseToShow !== null) {
      let found = false;
      courseCache.forEach((c: SISRetrievedCourse) => {
        if (c.number === courseToShow.number) {
          c.versions.forEach((v: any, index: number) => {
            if (
              v.term.toLowerCase().includes(courseToShow.version.toLowerCase())
            ) {
              const inspectedVersion: Course = {
                title: c.title,
                number: c.number,
                ...c.versions[index],
              };
              dispatch(updateInspectedCourse(c));
              dispatch(updateInspectedVersion(inspectedVersion));
              dispatch(updatePlaceholder(false));
              found = true;
            }
          });
          // If version is not found and the course is already searched, we just display the latest version of this semester.
          if (!found) {
            const semester = courseToShow.version.split(' ')[0];
            c.versions.forEach((v: any, index: number) => {
              if (v.term.includes(semester) && !found) {
                const inspectedVersion: Course = {
                  title: c.title,
                  number: c.number,
                  ...c.versions[index],
                };
                dispatch(updateInspectedCourse(c));
                dispatch(updateInspectedVersion(inspectedVersion));
                dispatch(updatePlaceholder(false));
                found = true;
              }
            });
          }
        }
      });
      if (!found) {
        const placeholderCourse: Course = {
          title: courseToShow.title,
          number: courseToShow.number,
          areas: courseToShow.area,
          term: courseToShow.version,
          school: 'none',
          department: courseToShow.department
            ? courseToShow.department
            : 'none',
          credits: courseToShow.credits.toString(),
          wi: courseToShow.wi,
          bio: 'This is a placeholder course',
          tags: courseToShow.tags,
          preReq: [],
          restrictions: [],
          level: courseToShow.level,
          version: courseToShow.version,
        };

        dispatch(updatePlaceholder(true));
        dispatch(updateInspectedVersion(placeholderCourse));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Gets current year name.
  const getYear = (newPlan: Plan): Year | null => {
    let out: Year | null = null;
    if (courseToShow !== null) {
      newPlan.years.forEach((planYear) => {
        if (planYear._id === courseToShow.year_id) {
          out = planYear;
        }
      });
    }
    return out;
  };

  // Updates distribution bars upon successfully adding a course.
  const addCourse = (plan?: Plan): void => {
    if (version !== 'None' && courseToShow !== null && plan !== undefined) {
      const addingYear: Year | null = getYear(plan);
      const body = {
        user_id: user._id,
        year_id: courseToShow.year_id !== null ? courseToShow.year_id : '',
        plan_id: plan._id,
        title: version.title,
        year: addingYear !== null ? addingYear.name : '',
        term: courseToShow.term,
        credits: version.credits === '' ? 0 : version.credits,
        distribution_ids: plan.distribution_ids,
        isPlaceholder: placeholder,
        number: version.number,
        area: placeholder ? version.areas : inspectedArea,
        department: version.department,
        tags: version.tags,
        preReq: version.preReq,
        wi: version.wi,
        version: version.term,
        level: version.level,
        expireAt: user._id === 'guestUser' ? Date.now() : undefined,
      };
      fetch(getAPI(window) + '/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })
        .then((retrieved) => retrieved.json())
        .then(handlePostAddCourse(plan));
    }
  };

  // Handles post add course post response
  const handlePostAddCourse =
    (plan: Plan) =>
    (data): void => {
      let newUserCourse: UserCourse;
      if (data.errors === undefined && courseToShow !== null) {
        newUserCourse = { ...data.data };
        dispatch(updateCurrentPlanCourses([...currentCourses, newUserCourse]));
        const allYears: Year[] = [...plan.years];
        const newYears: Year[] = [];
        allYears.forEach(updateYears(newYears, newUserCourse));
        const newPlan: Plan = { ...plan, years: newYears };
        dispatch(updateSelectedPlan(newPlan));
        const newPlanList = [...planList];
        for (let i = 0; i < planList.length; i++) {
          if (planList[i]._id === newPlan._id) {
            newPlanList[i] = newPlan;
          }
        }
        dispatch(updatePlanList(newPlanList));
        dispatch(updateCourseToShow(null));
        dispatch(updateShowCourseInfo(false));
        dispatch(clearSearch());
        dispatch(updatePlaceholder(false));
        toast.success('Course updated!', {
          toastId: 'course updated',
        });
      } else {
        console.log('Failed to add', data.errors);
      }
    };

  // Helper method that updates the years array in the plan after adding course.
  const updateYears =
    (newYears: Year[], newUserCourse: UserCourse) =>
    (year: Year): void => {
      if (courseToShow !== null && year._id === courseToShow.year_id) {
        const yCourses = [...year.courses, newUserCourse];
        newYears.push({ ...year, courses: yCourses });
      } else {
        newYears.push(year);
      }
    };

  return (
    <div className="absolute top-0">
      {/* Background Grey */}
      <div
        className="fixed top-0 left-0 z-40 w-full h-screen m-0 bg-black opacity-50"
        onClick={() => {
          dispatch(updateCourseToShow(null));
          dispatch(updateShowCourseInfo(false));
        }}
      ></div>

      {/* Actual popup */}
      <div className="h-screen fixed z-40 left-1/2 flex flex-col min-w-planAdd h-3/4 bg-primary rounded select-none transform -translate-x-1/2 translate-y-12">
        <div className="px-4 py-2 text-white text-coursecard font-semibold select-none">
          Inspecting{' '}
          {courseToShow === null ? 'Invalid course' : courseToShow.title}
        </div>
        {placeholder ? (
          <div className="p-4 bg-gray-100 rounded min-w-[40rem] overflow-y-auto">
            <Placeholder addCourse={addCourse} />
          </div>
        ) : (
          <div className="h-full bg-gray-100 rounded min-w-[40rem]">
            <SisCourse
              addCourse={addCourse}
              setInspectedArea={setInspectedArea}
              inspectedArea={inspectedArea}
              cart={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDisplayPopup;
