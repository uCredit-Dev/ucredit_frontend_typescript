import { FC } from "react";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import GenerateNewPlan from "../../../resources/GenerateNewPlan";
import { selectPlan } from "../../../slices/currentPlanSlice";
import { ReactComponent as ArrowUp } from "../../../resources/svg/ArrowUp.svg";
import { ReactComponent as ArrowDown } from "../../../resources/svg/ArrowDown.svg";

/**
 * Dropdown for choosing a plan to display.
 */
const PlanChoose: FC<{ dropdown: boolean; setDropdown: Function }> = ({
  dropdown,
  setDropdown,
}) => {
  // Redux setup
  const currentPlan = useSelector(selectPlan);

  return (
    <>
      {/* dummy component to generate new plans */}
      <GenerateNewPlan />
      <div className="flex flex-col items-center mr-2 my-1">
        <button
          className="flex flex-row my-auto w-60 h-10 text-xl font-light border border-gray-300 rounded outline-none shadow"
          onClick={() => setDropdown(!dropdown)}
        >
          <div className="flex-grow my-auto px-1 w-full overflow-ellipsis truncate">
            {currentPlan.name}
          </div>
          <div className="mr-1 my-auto">
            {dropdown ? <ArrowUp /> : <ArrowDown />}
          </div>
        </button>
      </div>
    </>
  );
};

export default PlanChoose;
