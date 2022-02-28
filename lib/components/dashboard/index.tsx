import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import UserSection from './UserSection';
import FeedbackPopup from '../popups/FeedbackPopup';
import FeedbackNotification from '../popups/FeedbackNotification';
import {
  selectImportingStatus,
  selectPlan,
} from '../../slices/currentPlanSlice';
import {
  selectDeletePlanStatus,
  selectAddingPlanStatus,
  selectDeleteYearStatus,
  selectCourseToDelete,
  selectShowCourseInfo,
  selectAddingPrereq,
  selectShowingCart,
} from '../../slices/popupSlice';
import {
  selectExperimentList,
  setExperiments,
  toggleExperimentStatus,
} from '../../slices/experimentSlice';
import { selectSearchStatus } from '../../slices/searchSlice';
import AddingPrereqPopup from '../popups/AddingPrereqPopup';
import Search from '../popups/course-search/Search';
import CourseDisplayPopup from '../popups/CourseDisplayPopup';
import DeleteCoursePopup from '../popups/DeleteCoursePopup';
import DeletePlanPopup from '../popups/DeletePlanPopup';
import DeleteYearPopup from '../popups/DeleteYearPopup';
import PlanAdd from '../popups/PlanAdd';
import CourseList from './course-list/horizontal/CourseList';
import InfoMenu from './InfoMenu';
import ActionBar from './degree-info/ActionBar';
import { selectLoginCheck, selectUser } from '../../slices/userSlice';
import ShareLinksPopup from './degree-info/ShareLinksPopup';
import axios from 'axios';
import { api } from './../../resources/assets';
import Cart from '../popups/course-search/Cart';
import getConfig from 'next/config';
import GenerateNewPlan from '../../resources/GenerateNewPlan';
import LoadingPage from '../LoadingPage';
import HandlePlanShareDummy from './HandlePlanShareDummy';
import HandleUserInfoSetupDummy from './HandleUserInfoSetupDummy';

const { publicRuntimeConfig } = getConfig();
const baseUrl = publicRuntimeConfig.baseUrl;

/**
 * The dashboard that displays the user's plan.
 */
const Dashboard: React.FC = () => {
  // Redux setup.
  const user = useSelector(selectUser);
  const currentPlan = useSelector(selectPlan);
  const loginCheck = useSelector(selectLoginCheck);
  const searchStatus = useSelector(selectSearchStatus);
  const deletePlanStatus = useSelector(selectDeletePlanStatus);
  const addPlanStatus = useSelector(selectAddingPlanStatus);
  const deleteYearStatus = useSelector(selectDeleteYearStatus);
  const deleteCourseStatus = useSelector(selectCourseToDelete);
  const importingStatus = useSelector(selectImportingStatus);
  const courseInfoStatus = useSelector(selectShowCourseInfo);
  const addingPrereqStatus = useSelector(selectAddingPrereq);
  const cartStatus = useSelector(selectShowingCart);
  const experimentList = useSelector(selectExperimentList);
  const dispatch = useDispatch();

  // State Setup
  const [showNotif, setShowNotif] = useState<boolean>(true);
  const [formPopup, setFormPopup] = useState<boolean>(false);
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const [shareableURL, setShareableURL] = useState<string>('');

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
    setShareableURL(baseUrl + '/share?_id=' + currentPlan._id);
  };

  const updateExperimentsForUser = () => {
    axios
      .get(`${api}/experiments/allExperiments`)
      .then(async (experimentListResponse) => {
        const experiments = experimentListResponse.data.data;
        dispatch(setExperiments(experiments));
        for (const experiment of experiments) {
          if (experiment.active.includes(user._id)) {
            dispatch(toggleExperimentStatus(experiment._id));
          }
        }
      })
      .catch((errAllExperiments) => {
        console.log(errAllExperiments);
      });
  };

  if (experimentList.length === 0) {
    updateExperimentsForUser();
  }

  return (
    <>
      {!loginCheck || importingStatus ? (
        <LoadingPage />
      ) : (
        <div className="flex flex-col w-full h-full min-h-screen bg-white">
          {formPopup && <FeedbackPopup setFormPopup={setFormPopup} />}
          {showNotif && (
            <FeedbackNotification
              actionHandler={setFormPopup}
              notifHandler={setShowNotif}
            />
          )}
          {showHeader && <UserSection />}
          <div className="flex-grow w-full">
            <div className="flex flex-col w-full">
              <div className="flex flex-row thin:flex-wrap-reverse mt-[5rem] w-full h-full">
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
                    <ActionBar onShareClick={onShareClick} />
                    <CourseList />
                  </div>
                </div>
              </div>
              <InfoMenu />
            </div>
            {/* Global popups */}
            {addingPrereqStatus && <AddingPrereqPopup />}
            {searchStatus && <Search />}
            {deletePlanStatus && <DeletePlanPopup />}
            {addPlanStatus && !importingStatus && <PlanAdd />}
            {deleteYearStatus && <DeleteYearPopup />}
            {deleteCourseStatus && <DeleteCoursePopup />}
            {courseInfoStatus && <CourseDisplayPopup />}
            {cartStatus && <Cart allCourses={[]} />}{' '}
          </div>
        </div>
      )}
      <GenerateNewPlan />
      <HandleUserInfoSetupDummy />
      <HandlePlanShareDummy />
    </>
  );
};

export default Dashboard;
