import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectPlanList,
  selectToken,
  updatePlanList,
} from '../../slices/userSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  selectPlan,
  updateSelectedPlan,
  selectSelectedMajor,
  updateSelectedMajor,
} from '../../slices/currentPlanSlice';
import { getAPI } from '../../resources/assets';
import { Plan } from '../../resources/commonTypes';
import {
  selectCourseToDelete,
  updateDeleteCourseStatus,
  updateCourseToDelete,
} from '../../slices/popupSlice';
import React from 'react';
import * as amplitude from '@amplitude/analytics-browser';

/**
 * This is the confirmation popup that appears when users press the button to delete a course.
 * It actually performs the deletion or cancels it.
 */
const DeleteCoursePopup: FC = () => {
  // Redux Setup
  const dispatch = useDispatch();
  const currentPlan = useSelector(selectPlan);
  const courseInfo = useSelector(selectCourseToDelete);
  const planList = useSelector(selectPlanList);
  const token = useSelector(selectToken);
  const newSelectedMajor = useSelector(selectSelectedMajor);

  /**
   * Popup for deleting current selected course.
   */
  const activateDeleteCourse = () => {
    if (currentPlan.years.length > 1 && courseInfo !== null) {
      fetch(getAPI(window) + '/courses/' + courseInfo.course._id, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }).then(() => {
        let newPlan: Plan;
        const years = [...currentPlan.years];
        currentPlan.years.forEach((planYear, index) => {
          if (planYear._id === courseInfo.course.year_id) {
            const courses = planYear.courses.filter(
              (yearCourse) => yearCourse._id !== courseInfo.course._id,
            );
            years[index] = { ...years[index], courses: courses };
          }
        });
        newPlan = { ...currentPlan, years: years };

        toast.error(courseInfo.course.title + ' deleted!', {
          toastId: 'course deleted',
        });
        dispatch(updateSelectedPlan(newPlan));
        if (newSelectedMajor) {
          dispatch(updateSelectedMajor(newSelectedMajor));
        }
        dispatch(
          updatePlanList(
            planList.map((plan) => {
              if (plan._id === newPlan._id) {
                return newPlan;
              } else return plan;
            }),
          ),
        );
        dispatch(updateDeleteCourseStatus(false));
        dispatch(updateCourseToDelete(null));
        amplitude.track('Confirmed Course Deletion');
      });
    } else {
      toast.error('Cannot delete last year!', {
        toastId: 'cannot delete last year',
      });
    }
  };

  // Cancels plan delete
  const cancel = () => {
    dispatch(updateDeleteCourseStatus(false));
    dispatch(updateCourseToDelete(null));
    amplitude.track('Declined Course Deletion');
  };

  return (
    <>
      <div className="absolute top-0">
        {/* Background Grey */}
        <div className="fixed z-30 left-0 top-0 m-0 w-full h-screen bg-black opacity-50"></div>

        {/* Actual popup */}
        <div
          className={
            'z-40 fixed flex flex-col bg-red-500 select-none rounded w-3/12 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 min-w-planAdd'
          }
        >
          <div className="px-4 py-2 text-white text-coursecard font-semibold select-none">
            Deleting Course!
          </div>
          {/* Search area */}
          <div className="w-full h-full text-coursecard">
            <div className="p-4 w-full h-auto bg-white rounded">
              <div className="flex flex-col items-center justify-center mb-4">
                <b className="flex flex-row mt-4 text-center font-semibold">
                  Are you sure you want to delete{' '}
                  {courseInfo !== null ? (
                    <div className="ml-1 text-red-600 font-bold">
                      {courseInfo.course.title}
                    </div>
                  ) : (
                    ' invalid course'
                  )}
                  ?
                </b>
                <div className="flex flex-row justify-center mb-4 mt-8 w-full">
                  <button
                    className="m-1 p-1 w-1/6 text-white bg-red-500 rounded focus:outline-none transform hover:scale-110 transition duration-200 ease-in"
                    onClick={activateDeleteCourse}
                  >
                    <b>Yes</b>
                  </button>
                  <button
                    className="m-1 ml-20 p-1 w-1/6 text-white bg-secondary rounded focus:outline-none transform hover:scale-110 transition duration-200 ease-in"
                    onClick={cancel}
                  >
                    <b>No</b>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteCoursePopup;
