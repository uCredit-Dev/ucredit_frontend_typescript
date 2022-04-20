import { ClipboardListIcon } from '@heroicons/react/outline';
import { Plan, ReviewMode} from '../../resources/commonTypes';
import { FC, useState } from 'react';
import YearComponent from '../dashboard/course-list/horizontal/YearComponent';
import InfoMenu from '../dashboard/InfoMenu';

const handleViewSummary = (plan: Plan) => {
  // console.log("You pressed the button!");
  console.log(plan);
  console.log(plan.years[1].courses);
  console.log(plan.years[1])
};

const PlanSummary: FC<{
  plan: Plan
}> = ({ plan }) => {
  const [notifState, setNotifState] = useState(false);
  const [draggable, setDraggable] = useState<boolean>(true);
  return (
    <div>
      <InfoMenu plan={plan} mode={ReviewMode.View}/>
      <button className="flex items-center justify-center w-6 h-6 transition-colors duration-150 ease-in rounded-sm cursor-pointer hover:bg-gray-200" 
        onClick={((e) => { 
          e.stopPropagation()
          handleViewSummary(plan); 
          setNotifState(!notifState)})}
      >
        <ClipboardListIcon className="w-5 h-5"></ClipboardListIcon>
      </button>
      {notifState ? (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              {/* <YearComponent id={4} year={plan.years[1]} courses={plan.years[1].courses} setDraggable={setDraggable} mode={ReviewMode.View}></YearComponent> */}
              <InfoMenu plan={plan} mode={ReviewMode.View}/>
              <p className="text-sm text-gray-500">Sample text.</p>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">Reject</button>
              <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">Accept</button>
              <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Close</button>
            </div>
          </div>
        </div>
        </div>
      ) : null}
    </div>
  );
};

export default PlanSummary;
