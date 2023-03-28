import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { selectPlan, updateSelectedPlan } from '../../slices/currentPlanSlice';
import { getAPI } from '../../resources/assets';
import {
  selectYearToDelete,
  updateYearToDelete,
  updateDeleteYearStatus,
} from '../../slices/popupSlice';
import { selectToken } from '../../slices/userSlice';
import { userService } from '../../../lib/services';

/**
 * This is the confirmation popup that appears when users press the button to delete a plan.
 * It actually performs the deletion or cancels it.
 */
const DeleteYearPopup: FC = () => {
  // Redux Setup
  const dispatch = useDispatch();
  const currentPlan = useSelector(selectPlan);
  const token = useSelector(selectToken);
  const year = useSelector(selectYearToDelete);

  /**
   * Popup for deleting current plan.
   */
  // Delete the selected year
  const activateDeleteYear = async () => {
    console.log(year);

    if (currentPlan.years.length > 1 && year !== null) {
      fetch(getAPI(window) + '/years/' + year._id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          const newYearArray = [...currentPlan.years].filter(
            (yr) => yr._id !== year._id,
          );
          const newUpdatedPlan = { ...currentPlan, years: newYearArray };
          dispatch(updateSelectedPlan(newUpdatedPlan));
          dispatch(updateYearToDelete(null));
          dispatch(updateDeleteYearStatus(false));
          toast.error('Deleted ' + year.name + '!', {
            toastId: 'delete year',
          });
        })
        .catch((err) => console.log(err));

      const threads = await userService.getThreads(
        currentPlan._id,
        token,
        false,
        null,
      );
      for (let thread of threads.data.data) {
        console.log(thread.location_id);
        // comments on course ??? get course -> check year_id

        if (thread.location_id.substring(0, 24) === year._id) {
          for (let comment of thread.comments) {
            console.log(comment);
            // await userService.removeComment(comment._id, token);
          }
        }

        // if (thread.location_type === 'Course')
        // use thread.location_id to search for course
        // check if course.year_id matches year._id

        if (thread.location_type === 'Course') {
          const course = await userService.getCourse(thread.location_id, token);
          console.log(course);
          // if (=== year._id) {
          for (let comment of thread.comments) {
            console.log(comment);
            // await userService.removeComment(comment._id, token);
          }
          // }
        }
      }
    } else {
      toast.error('Cannot delete last year!', {
        toastId: 'cannot delete last year',
      });
    }
  };

  // Cancels plan delete
  const cancel = () => {
    dispatch(updateDeleteYearStatus(false));
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
            Deleting Year!
          </div>
          {/* Search area */}
          <div className="w-full h-full text-coursecard">
            <div className="p-4 w-full h-auto bg-white rounded">
              <div className="flex flex-col items-center justify-center mb-4">
                <b className="flex flex-row mt-4 text-center font-semibold">
                  Are you sure you want to delete{' '}
                  {year !== null ? (
                    <div className="ml-1 text-red-600 font-bold">
                      {year.name}
                    </div>
                  ) : (
                    ' invalid year'
                  )}
                  ?
                </b>
                <div className="flex flex-row justify-center mb-4 mt-8 w-full">
                  <button
                    className="m-1 p-1 w-1/6 text-white bg-red-500 rounded focus:outline-none transform hover:scale-110 transition duration-200 ease-in"
                    onClick={activateDeleteYear}
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

export default DeleteYearPopup;
