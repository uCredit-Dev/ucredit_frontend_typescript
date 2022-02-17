import { useSelector } from 'react-redux';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/outline';
import 'react-toastify/dist/ReactToastify.css';
import GenerateNewPlan from '../../../resources/GenerateNewPlan';
import { selectPlan } from '../../../slices/currentPlanSlice';

/**
 * Dropdown for choosing a plan to display.
 */
const PlanChoose: React.FC<{ dropdown: boolean; setDropdown: Function }> = ({
  dropdown,
  setDropdown,
}) => {
  // Redux setup
  const currentPlan = useSelector(selectPlan);

  return (
    <>
      {/* dummy component to generate new plans */}
      <GenerateNewPlan />
      <div className="flex flex-col items-center my-1 mr-2">
        <button
          className="flex flex-row h-10 my-auto text-xl font-light border border-gray-300 rounded shadow outline-none w-60"
          onClick={() => setDropdown(!dropdown)}
        >
          <div className="flex-grow w-full px-1 my-auto truncate overflow-ellipsis">
            {currentPlan.name}
          </div>
          <div className="my-auto mr-1">
            {dropdown ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </div>
        </button>
      </div>
    </>
  );
};

export default PlanChoose;
