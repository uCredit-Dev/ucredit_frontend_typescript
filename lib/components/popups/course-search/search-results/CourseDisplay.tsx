import React, { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Plan, UserCourse, Year } from '../../../../resources/commonTypes';
import {
  clearSearch,
  selectSemester,
  selectYear,
  selectPlaceholder,
  updatePlaceholder,
  selectVersion,
} from '../../../../slices/searchSlice';
import {
  selectUser,
  selectPlanList,
  updatePlanList,
  selectToken,
} from '../../../../slices/userSlice';
import Placeholder from './Placeholder';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  selectCurrentPlanCourses,
  selectPlan,
  selectTotalCredits,
  updateCurrentPlanCourses,
  updateSelectedPlan,
  updateTotalCredits,
} from '../../../../slices/currentPlanSlice';
import { getAPI } from '../../../../resources/assets';
import SisCourse from './SisCourse';
import { updateShowingCart } from '../../../../slices/popupSlice';

/**
 * Displays course information once a user selects a course in the search list
 */
const CourseDisplay: FC<{ cart: boolean }> = ({ cart }) => {
  // Redux Setup
  const dispatch = useDispatch();
  const version = useSelector(selectVersion);
  const user = useSelector(selectUser);
  const semester = useSelector(selectSemester);
  const year = useSelector(selectYear);
  const currentPlan = useSelector(selectPlan);
  const planList = useSelector(selectPlanList);
  const placeholder = useSelector(selectPlaceholder);
  const currentCourses = useSelector(selectCurrentPlanCourses);
  const totalCredits = useSelector(selectTotalCredits);
  const token = useSelector(selectToken);

  // component state setup
  const [inspectedArea, setInspectedArea] = useState<string>('None');

  /**
   * Adds course
   */
  const addCourse = (): void => {
    // Adds course, updates user frontend distributions display, and clears search states.
    if (version !== 'None') {
      // Posts to add course route and then updates distribution.
      updateDistributions();

      // Clears search state.
      dispatch(clearSearch());
      dispatch(updateShowingCart(false));
      dispatch(updatePlaceholder(false));
    }
  };

  /**
   * Gets current year.
   * @returns current year object if found, null if not.
   */
  const getYear = (): Year | null => {
    let out: Year | null = null;
    currentPlan.years.forEach((currPlanYear) => {
      if (currPlanYear._id === year) {
        out = currPlanYear;
      }
    });
    return out;
  };

  /**
   * Updates distribution bars upon successfully adding a course.
   * TODO: Move this to assets and modularize
   */
  const updateDistributions = async () => {
    let newUserCourse: UserCourse;
    if (version === 'None') return;
    const addingYear: Year | null = getYear();

    const body = {
      user_id: user._id,
      year_id: addingYear !== null ? addingYear._id : '',
      plan_id: currentPlan._id,
      title: version.title,
      term: semester === 'All' ? 'fall' : semester.toLowerCase(),
      year: addingYear !== null ? addingYear.name : '',
      credits: version.credits === '' ? 0 : version.credits,
      distribution_ids: currentPlan.distribution_ids,
      isPlaceholder: placeholder,
      number: version.number,
      area: version.areas,
      department: version.department,
      tags: version.tags,
      preReq: version.preReq,
      wi: version.wi,
      version: version.term,
      level: version.level,
      expireAt: user._id === 'guestUser' ? Date.now() : undefined,
    };

    let retrieved = await fetch(getAPI(window) + '/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    let data = await retrieved.json();

    if (data.errors !== undefined) {
      console.log('Failed to add', data.errors);
      data.errors.forEach((error) => {
        if (error.status == 400) {
          toast.error(error.detail);
        }
      });
      return;
    }

    newUserCourse = { ...data.data };

    dispatch(updateCurrentPlanCourses([...currentCourses, newUserCourse]));
    const allYears: Year[] = [...currentPlan.years];
    const newYears: Year[] = [];
    allYears.forEach((y) => {
      if (y._id === year) {
        const yCourses = [...y.courses, newUserCourse];
        newYears.push({ ...y, courses: yCourses });
      } else {
        newYears.push(y);
      }
    });
    const newPlan: Plan = { ...currentPlan, years: newYears };
    dispatch(updateSelectedPlan(newPlan));
    const newPlanList = [...planList];
    for (let i = 0; i < planList.length; i++) {
      if (planList[i]._id === newPlan._id) {
        newPlanList[i] = newPlan;
      }
    }
    dispatch(updatePlanList(newPlanList));
    dispatch(updateTotalCredits(totalCredits + newUserCourse.credits));
    toast.success(version.title + ' added!', {
      toastId: 'title added',
    });
  };

  if (version === 'None') {
    return (
      <div className="flex flex-col px-5 py-2 w-full h-full bg-gray-200 rounded-r overflow-y-auto">
        <div className="flex flex-col items-center justify-center w-full h-full font-normal">
          No selected course!
        </div>
      </div>
    );
  } else if (placeholder) {
    return (
      <div className="flex flex-col p-5 w-full bg-gray-200 rounded-r overflow-y-auto thin:min-h-40">
        <Placeholder addCourse={addCourse} />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col p-5 w-full bg-gray-200 rounded-r overflow-y-auto thin:min-h-40">
        <SisCourse
          inspectedArea={inspectedArea}
          setInspectedArea={setInspectedArea}
          addCourse={addCourse}
          cart={cart}
        />
      </div>
    );
  }
};
export default CourseDisplay;
