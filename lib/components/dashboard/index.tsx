import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { toast } from 'react-toastify';
import UserSection from './UserSection';
import FeedbackPopup from '../popups/FeedbackPopup';
import FeedbackNotification from '../popups/FeedbackNotification';
import HandleUserEntryDummy from './HandleUserEntryDummy';
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
  selectExperimentIDs,
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
import { Plan } from '../../resources/commonTypes';
import {
  selectUser,
  selectPlanList,
  updatePlanList,
} from '../../slices/userSlice';
import ShareLinksPopup from './degree-info/ShareLinksPopup';
import axios from 'axios';
import Dropdown from '../popups/Dropdown';
// import ExperimentNumber from '../popups/ExperimentNumber';
import { api } from './../../resources/assets';
import Cart from '../popups/course-search/Cart';

/**
 * The dashboard that displays the user's plan.
 */
const Dashboard: React.FC<{ id: string | null }> = ({ id }) => {
  // Redux setup.
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
  const cartStatus = useSelector(selectShowingCart);
  const experimentList = useSelector(selectExperimentList);
  const experimentIDs = useSelector(selectExperimentIDs);
  // const blueButton = useSelector(selectBlueButton);
  const dispatch = useDispatch();

  // State Setup
  const [showNotif, setShowNotif] = useState<boolean>(true);
  const [formPopup, setFormPopup] = useState<boolean>(false);
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [experimentPopup] = useState<boolean>(false);
  const [shareableURL, setShareableURL] = useState<string>('');
  // const [displayedNumber, setDisplayedNumber] = useState<number>(3);
  // const [crement, setCrement] = useState<number>(0);

  // useEffect(() => {
  //   if (blueButton !== null) {
  //     setCrement(blueButton.active ? 1 : -1);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [experimentList.length > 0 ? blueButton : null]);

  useEffect(() => {
    if (!experimentPopup && experimentList.length > 0) {
      axios
        .get(`${api}/experiments/allExperiments`)
        .then(function (resp) {
          const importedExperimentList = resp.data.data;
          for (const experiment of experimentList) {
            const currentActive = experiment.active;
            const importedActive = importedExperimentList[
              experimentIDs.indexOf(experiment._id)
            ].active.includes(user._id);

            if (currentActive === importedActive) continue;

            const command = experiment.active ? 'add/' : 'delete/';
            axios
              .put(`${api}/experiments/${command}${experiment.name}`, {
                user_id: user._id,
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experimentPopup]);

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
    <div className="flex flex-col w-full h-full min-h-screen bg-white">
      <HandleUserEntryDummy id={id} />
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
                <Dropdown
                  dropdown={dropdown}
                  planList={planList}
                  setDropdown={setDropdown}
                  user={user}
                  currentPlan={currentPlan}
                />
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
  );
};

export default Dashboard;
