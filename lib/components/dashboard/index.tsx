import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import UserSection from './UserSection';
import FeedbackPopup from '../popups/FeedbackPopup';
import FeedbackNotification from '../popups/FeedbackNotification';
import { selectImportingStatus } from '../../slices/currentPlanSlice';
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
  // selectExperimentIDs,
  setExperiments,
  toggleExperimentStatus,
  // selectBlueButton,
} from '../../slices/experimentSlice';
import { selectSearchStatus } from '../../slices/searchSlice';
import AddingPrereqPopup from '../popups/AddingPrereqPopup';
import Search from '../popups/course-search/Search';
import CourseDisplayPopup from '../popups/CourseDisplayPopup';
import DeleteCoursePopup from '../popups/DeleteCoursePopup';
import DeletePlanPopup from '../popups/DeletePlanPopup';
import DeleteYearPopup from '../popups/DeleteYearPopup';
// import ExperimentPopup from '../popups/ExperimentPopup';
// import ExperimentDevBoardPopup from '../popups/ExperimentDevBoardPopup';
import PlanAdd from '../popups/PlanAdd';
import CourseList from './course-list/horizontal/CourseList';
import InfoMenu from './InfoMenu';
import ActionBar from './degree-info/ActionBar';
import { selectLoginCheck, selectUser } from '../../slices/userSlice';
import axios from 'axios';
// import ExperimentNumber from '../popups/ExperimentNumber';
import { api } from './../../resources/assets';
import Cart from '../popups/course-search/Cart';
import GenerateNewPlan from '../../resources/GenerateNewPlan';
import LoadingPage from '../LoadingPage';
import HandlePlanShareDummy from './HandlePlanShareDummy';
import HandleUserInfoSetupDummy from './HandleUserInfoSetupDummy';

/**
 * The dashboard that displays the user's plan.
 */
const Dashboard: React.FC = () => {
  // Redux setup.
  const user = useSelector(selectUser);
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
  // const experimentIDs = useSelector(selectExperimentIDs);
  // const blueButton = useSelector(selectBlueButton);
  const dispatch = useDispatch();

  // State Setup
  const [showNotif, setShowNotif] = useState<boolean>(true);
  const [formPopup, setFormPopup] = useState<boolean>(false);
  const [showHeader, setShowHeader] = useState<boolean>(true);
  // const [experimentPopup] = useState<boolean>(false);
  // const [displayedNumber, setDisplayedNumber] = useState<number>(3);
  // const [crement, setCrement] = useState<number>(0);

  // useEffect(() => {
  //   if (blueButton !== null) {
  //     setCrement(blueButton.active ? 1 : -1);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [experimentList.length > 0 ? blueButton : null]);

  // useEffect(() => {
  //   if (!experimentPopup && experimentList.length > 0) {
  //     axios
  //       .get(`${api}/experiments/allExperiments`)
  //       .then(function (resp) {
  //         const importedExperimentList = resp.data.data;
  //         for (const experiment of experimentList) {
  //           const currentActive = experiment.active;
  //           const importedActive = importedExperimentList[
  //             experimentIDs.indexOf(experiment._id)
  //           ].active.includes(user._id);

  //           if (currentActive === importedActive) continue;

  //           const command = experiment.active ? 'add/' : 'delete/';
  //           axios
  //             .put(`${api}/experiments/${command}${experiment.name}`, {
  //               user_id: user._id,
  //             })
  //             .catch(function (error) {
  //               console.log(error);
  //             });
  //         }
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [experimentPopup]);

  useScrollPosition(({ prevPos, currPos }) => {
    if (currPos.y > -14) {
      setShowHeader(true);
    } else if (currPos.y > -120) {
      setShowHeader(false);
    }
  });

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
          {/* Commented out right now because needs polishing */}
          {/* {
        <div className="fixed z-40 flex flex-row select-none bottom-11 right-2">
          <ExperimentDevBoardPopup />
          <ExperimentPopup
            experimentPopup={experimentPopup}
            setExperimentPopup={setExperimentPopup}
          />
          <ExperimentNumber
            displayedNumber={displayedNumber}
            setDisplayedNumber={setDisplayedNumber}
            crement={crement}
            setCrement={setCrement}
          />
        </div>
      } */}
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
              <div className="flex flex-row thin:flex-wrap-reverse mt-[5rem] w-full h-full">
                <div className="flex flex-col w-full">
                  <div className="mx-auto">
                    <ActionBar />
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
            {cartStatus ? <Cart allCourses={[]} /> : null}{' '}
            {/** TODO : remove allCourses props */}
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
