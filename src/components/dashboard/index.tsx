import { FC, useEffect, useState } from 'react';
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
import { selectExperimentList } from '../../slices/experimentSlice';
import { selectSearchStatus } from '../../slices/searchSlice';
import AddingPrereqPopup from '../popups/AddingPrereqPopup';
import Search from '../popups/course-search/Search';
import CourseDisplayPopup from '../popups/CourseDisplayPopup';
import DeleteCoursePopup from '../popups/DeleteCoursePopup';
import DeletePlanPopup from '../popups/DeletePlanPopup';
import DeleteYearPopup from '../popups/DeleteYearPopup';
import ExperimentPopup from '../popups/ExperimentPopup';
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
import axios from 'axios';

/**
 * The dashboard that displays the user's plan.
 */
const Dashboard: FC<{ id: string | null }> = ({ id }) => {
  // Redux setup.
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const planList = useSelector(selectPlanList);
  const currentPlan = useSelector(selectPlan);
  const searchStatus = useSelector(selectSearchStatus);
  const deletePlanStatus = useSelector(selectDeletePlanStatus);
  const addPlanStatus = useSelector(selectAddingPlanStatus);
  const deleteYearStatus = useSelector(selectDeleteYearStatus);
  const deleteCourseStatus = useSelector(selectCourseToDelete);
  const importingStatus = useSelector(selectImportingStatus);
  const courseInfoStatus = useSelector(selectShowCourseInfo);
  const addingPrereqStatus = useSelector(selectAddingPrereq);
  const experimentList = useSelector(selectExperimentList);

  // State Setup
  const [showNotif, setShowNotif] = useState<boolean>(true);
  const [formPopup, setFormPopup] = useState<boolean>(false);
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [experimentPopup, setExperimentPopup] = useState<boolean>(false);
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

  useEffect(() => {
    if (!experimentPopup) {
      const experimentAPI =
        'https://ucredit-experiments-api.herokuapp.com/api/experiments/';
      experimentList.forEach((experiment) => {
        const command = experiment.active ? 'add/' : 'delete/';
        axios
          .put(`${experimentAPI}${command}${experiment.name}`, {
            user_id: user._id,
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    }
  }, [experimentList, experimentPopup, user._id]);

  useScrollPosition(({ prevPos, currPos }) => {
    if (currPos.y > -14) {
      setShowHeader(true);
    } else if (currPos.y > -120) {
      setShowHeader(false);
    }
  });

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
                {
                  <>
                    <div className="flex flex-row">
                      <ExperimentPopup
                        experimentPopup={experimentPopup}
                        setExperimentPopup={setExperimentPopup}
                      />
                      <ExperimentDevBoardPopup />
                    </div>
                  </>
                }
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
      </div>
    </div>
  );
};

export default Dashboard;
