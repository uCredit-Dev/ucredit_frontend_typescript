import { FC } from 'react';
import { Plan, User } from '../../resources/commonTypes';
import { useDispatch } from 'react-redux';
import { updateAddingPlanStatus } from '../../slices/popupSlice';
import { toast } from 'react-toastify';
import {
  updateCurrentPlanCourses,
  updateSelectedPlan,
} from '../../slices/currentPlanSlice';
import { updatePlanList } from '../../slices/userSlice';

const Dropdown: FC<{
  dropdown: boolean;
  planList: Plan[];
  setDropdown: Function;
  user: User;
  currentPlan: Plan;
}> = ({ dropdown, planList, setDropdown, user, currentPlan }) => {
  const dispatch = useDispatch();

  // Handles plan change event.
  const handlePlanChange = (event: any) => {
    setDropdown(false);
    const selectedOption = event.target.value;
    const planListClone = [...planList];
    if (selectedOption === 'new plan' && user._id !== 'noUser') {
      dispatch(updateAddingPlanStatus(true));
    } else {
      let newSelected: Plan = currentPlan;
      planList.forEach((plan, index) => {
        if (plan._id === selectedOption) {
          newSelected = plan;
          planListClone.splice(index, 1);
          planListClone.splice(0, 0, newSelected);
        }
      });

      toast(newSelected.name + ' selected!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
      });
      if (currentPlan._id !== newSelected._id)
        dispatch(updateCurrentPlanCourses([]));
      dispatch(updateSelectedPlan(newSelected));
      dispatch(updatePlanList(planListClone));
    }
  };

  return (
    <>
      {dropdown ? (
        <div className="absolute z-30 flex flex-col -mt-2 ml-2 w-60 text-black bg-white rounded shadow">
          {planList.map((plan, index) => (
            <button
              key={index}
              value={plan._id}
              onClick={handlePlanChange}
              className="px-1 py-1 h-9 hover:bg-gray-200 border-t focus:outline-none transform overflow-ellipsis truncate"
            >
              {plan.name}
            </button>
          ))}
          <button
            value="new plan"
            onClick={handlePlanChange}
            className="py-1 hover:bg-gray-200 border-t focus:outline-none"
          >
            Create a plan +
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Dropdown;
