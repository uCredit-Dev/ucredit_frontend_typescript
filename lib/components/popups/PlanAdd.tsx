import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { selectPlanList } from '../../slices/userSlice';
import { allMajors } from '../../resources/majors';
import Select from 'react-select';
import {
  selectToAddName,
  selectToAddMajors,
  updateAddingPlanStatus,
  updateGeneratePlanAddStatus,
  updateToAddName,
  updateToAddMajors,
} from '../../slices/popupSlice';
import { Major } from '../../resources/commonTypes';

const majorOptions = [
  ...allMajors.map((major, index) => ({
    value: index,
    label: major.degree_name,
  })),
];

/**
 * Popup for adding a new plan.
 * TODO: Implement all commented code features
 * @prop setGenerateNew - signals the generateNewPlan component to generate a new plan.
 * */
const PlanAdd: FC = () => {
  // Redux setup
  const dispatch = useDispatch();
  const toAddName = useSelector(selectToAddName);
  const toAddMajors = useSelector(selectToAddMajors);
  const planList = useSelector(selectPlanList);

  /**
   * Handles the user's intention to create a new plan.
   */
  const createNewPlan = () => {
    if (toAddMajors.length === 0) {
      toast.error('Please choose a valid major!');
    } else {
      // TODO: resolve confusing naming; generatePlanAddStatus signals generateNewPlan to generate a new plan, updateAdding signals planAdd to pop up
      dispatch(updateAddingPlanStatus(false));
      dispatch(updateGeneratePlanAddStatus(true));
    }
  };

  // Handles new plan name change.
  const handleNameChange = (event: any) => {
    dispatch(updateToAddName(event.target.value));
  };

  // Handles user's intention to cancel creating a new plan.
  const handleCancel = () => {
    if (planList.length === 0) {
      toast.error('Please create at least one plan to continue!');
    } else {
      dispatch(updateAddingPlanStatus(false));
    }
  };

  // Handles changing the major of the new plan.
  const handleMajorChange = (event: any) => {
    const selectedMajors: Major[] = [];
    event.forEach(({ value }) => {
      selectedMajors.push(allMajors[value]);
    });
    dispatch(updateToAddMajors(selectedMajors));
  };

  return (
    <div className="absolute top-0">
      {/* Background Grey */}
      <div className="fixed z-40 left-0 top-0 m-0 w-full h-screen bg-black opacity-50"></div>

      {/* Popup */}
      <div
        className={
          'z-40 fixed flex flex-col bg-primary shadow select-none rounded h-auto w-3/12 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 min-w-planAdd'
        }
      >
        <div className="px-4 py-2 text-white text-coursecard select-none">
          Adding a new plan!
        </div>
        {/* Search area */}
        <div className="w-full h-full text-coursecard">
          <div className="p-8 w-full h-auto bg-gray-200 rounded">
            <div className="flex flex-row mb-4">
              <input
                autoFocus
                className="flex-none mr-8 px-2 w-full h-selectbox rounded focus:outline-none"
                type="text"
                placeholder="Plan Name"
                defaultValue={toAddName}
                onChange={handleNameChange}
              />
            </div>
            <div className="z-40 flex flex-row justify-between mb-4">
              <Select
                isMulti
                options={majorOptions}
                onChange={handleMajorChange}
                placeholder="Select Majors"
                className="z-50 w-full"
              />
            </div>
            <div className="flex flex-row justify-end">
              <button
                className="z-30 p-2 w-16 h-10 text-white hover:bg-secondary bg-primary rounded focus:outline-none transform hover:scale-105 transition duration-200 ease-in"
                onClick={createNewPlan}
              >
                Add
              </button>
              {planList.length > 0 ? (
                <button
                  className="z-30 ml-4 p-2 w-16 h-10 text-black bg-white border border-solid border-secondary rounded focus:outline-none transform hover:scale-105 transition duration-200 ease-in"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanAdd;
