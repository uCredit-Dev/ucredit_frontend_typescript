import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectUser,
  selectPlanList,
  updatePlanList,
} from '../../slices/userSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { selectPlan, updateSelectedPlan } from '../../slices/currentPlanSlice';
import { getAPI } from '../../resources/assets';
import { updateDeletePlanStatus } from '../../slices/popupSlice';

/**
 * This is the confirmation popup that appears when users press the button to delete a plan.
 * It actually performs the deletion or cancels it.
 */
const DeletePlanPopup: FC = () => {
  // Redux Setup
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentPlan = useSelector(selectPlan);
  const planList = useSelector(selectPlanList);

  /**
   * Deletes current plan.
   */
  const deleteCurrentPlan = () => {
    // delete plan from db
    // update plan array
    // If plan list has more than one plan, delete. Otherwise, don't.
    if (planList.length > 1 && user._id !== 'noUser') {
      fetch(getAPI(window) + '/plans/' + currentPlan._id, {
        method: 'DELETE',
      })
        .then(() => {
          toast.error(currentPlan.name + ' deleted!');
          let updatedList = [...planList];
          updatedList = updatedList.filter((plan) => {
            return plan._id !== currentPlan._id;
          });
          dispatch(updateSelectedPlan(updatedList[0]));
          dispatch(updatePlanList(updatedList));
          dispatch(updateDeletePlanStatus(false));
        })
        .catch((err) => console.log(err));
    } else {
      toast.error('Cannot delete last plan!');
    }
  };

  // Cancels plan delete
  const cancel = () => {
    dispatch(updateDeletePlanStatus(false));
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
            Deleting Plan!
          </div>
          {/* Search area */}
          <div className="w-full h-full text-coursecard">
            <div className="p-4 w-full h-auto bg-white rounded">
              <div className="flex flex-col items-center justify-center mb-4">
                <b className="flex flex-row mt-4 text-center font-semibold">
                  Are you sure you want to delete
                  <div className="ml-1 text-red-600 font-bold">
                    {currentPlan.name}
                  </div>
                  ?
                </b>
                <div className="flex flex-row justify-center mb-4 mt-8 w-full">
                  <button
                    className="m-1 p-1 w-1/6 text-white bg-red-500 rounded focus:outline-none transform hover:scale-110 transition duration-200 ease-in"
                    onClick={deleteCurrentPlan}
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
        <div
          className={
            'fixed flex flex-col bg-white rounded z-20 top-1/3 left-1/2 transform -translate-x-1/2 p-5'
          }
        ></div>
      </div>
    </>
  );
};

export default DeletePlanPopup;
