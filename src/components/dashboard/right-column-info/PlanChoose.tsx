import { FC, useState } from "react";
import { Plan } from "../../../resources/commonTypes";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePlanList,
  selectUser,
  selectPlanList,
} from "../../../slices/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GenerateNewPlan from "../../../resources/GenerateNewPlan";
import {
  selectPlan,
  updateSelectedPlan,
} from "../../../slices/currentPlanSlice";
import { updateAddingPlanStatus } from "../../../slices/popupSlice";
import { ReactComponent as ArrowUp } from "../../../resources/svg/ArrowUp.svg";
import { ReactComponent as ArrowDown } from "../../../resources/svg/ArrowDown.svg";

/**
 * Dropdown for choosing a plan to display.
 */
const PlanChoose: FC = () => {
  // Redux setup
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentPlan = useSelector(selectPlan);
  const planList = useSelector(selectPlanList);

  // Component state setup
  const [dropdown, setDropdown] = useState<boolean>(false);

  // Handles plan change event.
  const handlePlanChange = (event: any) => {
    setDropdown(false);
    const selectedOption = event.target.value;
    const planListClone = [...planList];
    if (selectedOption === "new plan" && user._id !== "noUser") {
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

      toast(newSelected.name + " selected!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
      });
      dispatch(updateSelectedPlan(newSelected));
      dispatch(updatePlanList(planListClone));
    }
  };

  return (
    <>
      {/* dummy component to generate new plans */}
      <GenerateNewPlan />
      <div className="flex flex-col items-center mr-2 my-1">
        <button
          className="flex flex-row my-auto w-60 h-10 text-xl font-light border border-gray-300 rounded outline-none shadow"
          onClick={() => setDropdown(!dropdown)}
        >
          <div className="flex-grow my-auto">{currentPlan.name}</div>
          <div className="mr-1 my-auto">
            {dropdown ? <ArrowUp /> : <ArrowDown />}
          </div>
        </button>
        {dropdown ? (
          <div className="absolute z-40 flex flex-col mt-10 w-60 text-black bg-white rounded shadow">
            {planList.map((plan, index) => (
              <button
                key={index}
                value={plan._id}
                onClick={handlePlanChange}
                className="py-1 h-9 hover:bg-gray-200 border-t focus:outline-none transform"
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
      </div>
    </>
  );
};

export default PlanChoose;
