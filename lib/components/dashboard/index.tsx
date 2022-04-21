import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import UserSection from './UserSection';
import FeedbackPopup from '../popups/FeedbackPopup';
import FeedbackNotification from '../popups/FeedbackNotification';
import {
  selectImportingStatus,
  selectPlan,
  updateThreads,
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
import {
  selectLoginCheck,
  selectUser,
  udpateCommenters,
} from '../../slices/userSlice';
import axios from 'axios';
import { getAPI } from './../../resources/assets';
import Cart from '../popups/course-search/Cart';
import GenerateNewPlan from '../../resources/GenerateNewPlan';
import LoadingPage from '../LoadingPage';
import HandlePlanShareDummy from './HandlePlanShareDummy';
import HandleUserInfoSetupDummy from './HandleUserInfoSetupDummy';
import { DashboardMode, Plan, ReviewMode } from '../../resources/commonTypes';
import { userService } from '../../services';
import CommenterToggle from './CommenterToggle';

interface Props {
  plan: Plan;
  mode: ReviewMode;
}

/**
 * The dashboard that displays the user's plan.
 */
const Dashboard: React.FC<Props> = ({ plan, mode }) => {
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
  const dispatch = useDispatch();
  const currPlan = useSelector(selectPlan);

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

  const updateExperimentsForUser = useCallback(() => {
    axios
      .get(getAPI(window) + '/experiments/allExperiments')
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
  }, [dispatch, user._id]);

  useEffect(() => {
    updateExperimentsForUser();
  }, [experimentList.length, updateExperimentsForUser]);

  useEffect(() => {
    (async () => {
      const toGet = mode === ReviewMode.View ? plan : currPlan;
      if (toGet) {
        const res = await userService.getThreads(toGet._id);
        const commentersSet = new Set<string>();
        for (const thread of res.data) {
          const userId = thread.comments[0].commenter_id;
          commentersSet.add(JSON.stringify(userId));
        }
        const commentersArr = [...commentersSet].map((c) => JSON.parse(c));
        dispatch(udpateCommenters(commentersArr));
        dispatch(updateThreads(res.data));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan, mode, currPlan]);

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
          {showHeader && <UserSection mode={DashboardMode.Planning} />}
          <div className="flex-grow w-full">
            <div className="flex flex-col w-full">
              <div className="flex flex-row thin:flex-wrap-reverse mt-[5rem] w-full h-full">
                <div className="flex flex-col w-full">
                  {plan ? null : <ActionBar />}
                  <CommenterToggle />
                  <div className="px-[100px]">
                    <CourseList plan={plan} mode={mode} />
                  </div>
                </div>
              </div>
              <InfoMenu plan={plan} mode={mode} />
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
      <HandleUserInfoSetupDummy plan={plan} />
      <HandlePlanShareDummy />
    </>
  );
};

export default Dashboard;
