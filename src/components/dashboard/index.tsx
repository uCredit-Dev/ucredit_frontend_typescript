import { FC, useState } from 'react';
import UserSection from './UserSection';
import FeedbackPopup from '../popups/FeedbackPopup';
import FeedbackNotification from '../popups/FeedbackNotification';
import HandleUserEntryDummy from './HandleUserEntryDummy';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectImportingStatus,
  selectPlan,
  updateCurrentPlanCourses,
  updateSelectedPlan,
} from '../../slices/currentPlanSlice';
import {
  selectDeletePlanStatus,
  selectAddingPlanStatus,
  selectDeleteYearStatus,
  selectCourseToDelete,
  selectShowCourseInfo,
  selectAddingPrereq,
  updateAddingPlanStatus,
} from '../../slices/popupSlice';
import {
  selectExperimentList,
  setExperimentStatus,
  toggleExperimentStatus,
} from '../../slices/experimentSlice';
import { selectSearchStatus } from '../../slices/searchSlice';
import AddingPrereqPopup from '../popups/AddingPrereqPopup';
import Search from '../popups/course-search/Search';
import CourseDisplayPopup from '../popups/CourseDisplayPopup';
import DeleteCoursePopup from '../popups/DeleteCoursePopup';
import DeletePlanPopup from '../popups/DeletePlanPopup';
import DeleteYearPopup from '../popups/DeleteYearPopup';
import ExperimentDevBoardPopup from '../popups/ExperimentDevBoardPopup';
import PlanAdd from '../popups/PlanAdd';
import CourseList from './course-list/CourseList';
import InfoMenu from './InfoMenu';
import ActionBar from './degree-info/ActionBar';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { toast } from 'react-toastify';
import { Plan } from '../../resources/commonTypes';
import {
  selectUser,
  selectPlanList,
  updatePlanList,
} from '../../slices/userSlice';
import ShareLinksPopup from './degree-info/ShareLinksPopup';
import clsx from 'clsx';

/**
 * The dashboard that displays the user's plan.
 */
const Dashboard: FC<{ id: string | null }> = ({ id }) => {
  // Redux setup.
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const planList = useSelector(selectPlanList);
  const experimentList = useSelector(selectExperimentList);
  const currentPlan = useSelector(selectPlan);
  const searchStatus = useSelector(selectSearchStatus);
  const deletePlanStatus = useSelector(selectDeletePlanStatus);
  const addPlanStatus = useSelector(selectAddingPlanStatus);
  const deleteYearStatus = useSelector(selectDeleteYearStatus);
  const deleteCourseStatus = useSelector(selectCourseToDelete);
  const importingStatus = useSelector(selectImportingStatus);
  const courseInfoStatus = useSelector(selectShowCourseInfo);
  const addingPrereqStatus = useSelector(selectAddingPrereq);

  // State Setup
  const [showNotif, setShowNotif] = useState<boolean>(true);
  const [formPopup, setFormPopup] = useState<boolean>(false);
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [experimentPopup, setExperimentPopup] = useState<boolean>(false);
  const [experimentDevBoardPopup, setExperimentDevBoardPopup] =
    useState<boolean>(false);
  const [shareableURL, setShareableURL] = useState<string>('');

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
      dispatch(updateSelectedPlan(newSelected));
      dispatch(updateCurrentPlanCourses([]));
      dispatch(updatePlanList(planListClone));
    }
  };

  useScrollPosition(({ prevPos, currPos }) => {
    if (currPos.y > -14) {
      setShowHeader(true);
    } else if (currPos.y > -120) {
      setShowHeader(false);
    }
  });

  // Handles experiment toggle
  const handleExperimentToggle = (event: any) => {
    // dispatch(setExperimentStatus([event.target.value, !experimentList[event.target.value].active]))
    // debounce, useEffect cleanup
    dispatch(toggleExperimentStatus(event.target.value));
    console.log(event.target.value, experimentList);
  };

  /**
   * Handles when button for shareable link is clicked.
   */
  const onShareClick = (): void => {
    if (shareableURL !== '') {
      setShareableURL('');
      return;
    }
    setShareableURL(
      (window.location.href.includes('localhost')
        ? 'localhost:3000'
        : 'https://ucredit.me') +
        '/share?_id=' +
        currentPlan._id,
    );
  };

  return (
    <div className="flex flex-col w-full h-full min-h-screen">
      <HandleUserEntryDummy id={id} />
      {formPopup ? <FeedbackPopup setFormPopup={setFormPopup} /> : null}
      {showNotif ? (
        <FeedbackNotification
          actionHandler={setFormPopup}
          notifHandler={setShowNotif}
        />
      ) : null}
      {showHeader ? <UserSection /> : null}
      <div className="flex-grow w-full">
        <div className="flex flex-col w-full">
          <div className="flex flex-row thin:flex-wrap-reverse mt-content w-full h-full">
            <div className="flex flex-col w-full">
              <div className="mx-auto">
                {shareableURL === '' ? null : (
                  <div className="absolute right-24">
                    <ShareLinksPopup
                      link={shareableURL}
                      setURL={onShareClick}
                    />
                  </div>
                )}
                <ActionBar
                  dropdown={dropdown}
                  setDropdown={setDropdown}
                  experimentPopup={experimentPopup}
                  setExperimentPopup={setExperimentPopup}
                  experimentDevBoardPopup={experimentDevBoardPopup}
                  setExperimentDevBoardPopup={setExperimentDevBoardPopup}
                  onShareClick={onShareClick}
                />
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
                {experimentPopup ? (
                  <div className="relative z-50 flex flex-col right-0 justify-between place-items-start translate-x-full bg-white h-32 w-40 box-content h-100 w-100 p-2 border-4">
                    Experiments
                    {experimentList.map((experiment, index) => {
                      console.log(experiment);
                      return (
                        <button
                          key={index}
                          value={index}
                          onClick={handleExperimentToggle}
                          className={clsx(
                            'relative flex hover:bg-gray-400 border border-gray-300 rounded focus:outline-none shadow cursor-pointer transition duration-200 ease-in',
                            {
                              'bg-white': !experiment.active,
                              'bg-green-100': experiment.active,
                            },
                          )}
                        >
                          {'  ' + experiment.name + '  '}
                        </button>
                      );
                    })}
                  </div>
                ) : null}
                <CourseList />
              </div>
            </div>
          </div>
          <InfoMenu />
        </div>

        {/* Global popups */}
        {addingPrereqStatus ? <AddingPrereqPopup /> : null}
        {searchStatus ? <Search /> : null}
        {deletePlanStatus ? <DeletePlanPopup /> : null}
        {addPlanStatus && !importingStatus ? <PlanAdd /> : null}
        {deleteYearStatus ? <DeleteYearPopup /> : null}
        {deleteCourseStatus ? <DeleteCoursePopup /> : null}
        {courseInfoStatus ? <CourseDisplayPopup /> : null}
        {experimentDevBoardPopup ? (
          <ExperimentDevBoardPopup
            experimentDevBoardPopup={experimentDevBoardPopup}
            setExperimentDevBoardPopup={setExperimentDevBoardPopup}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;
