import { FC, useEffect, useState } from 'react';
import UserSection from './UserSection';
import FeedbackPopup from '../popups/FeedbackPopup';
import FeedbackNotification from '../popups/FeedbackNotification';
import HandleUserEntryDummy from './HandleUserEntryDummy';
import { useDispatch, useSelector } from 'react-redux';
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
} from '../../slices/popupSlice';
import {
  selectExperimentList,
  selectExperimentIDs,
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
import ExperimentPopup from '../popups/ExperimentPopup';
import ExperimentDevBoardPopup from '../popups/ExperimentDevBoardPopup';
import PlanAdd from '../popups/PlanAdd';
import CourseList from './course-list/CourseList';
import InfoMenu from './InfoMenu';
import ActionBar from './degree-info/ActionBar';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { selectUser, selectPlanList } from '../../slices/userSlice';
import ShareLinksPopup from './degree-info/ShareLinksPopup';
import axios from 'axios';
import Dropdown from '../popups/Dropdown';
import ExperimentNumber from '../popups/ExperimentNumber';

/**
 * The dashboard that displays the user's plan.
 */
const Dashboard: FC<{ id: string | null }> = ({ id }) => {
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
  const experimentList = useSelector(selectExperimentList);
  const experimentIDs = useSelector(selectExperimentIDs);
  const dispatch = useDispatch();

  // State Setup
  const [showNotif, setShowNotif] = useState<boolean>(true);
  const [formPopup, setFormPopup] = useState<boolean>(false);
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [experimentPopup, setExperimentPopup] = useState<boolean>(false);
  const [shareableURL, setShareableURL] = useState<string>('');
  const [displayedNumber, setDisplayedNumber] = useState<number>(3);
  const [crement, setCrement] = useState<number>(0);

  const blueButtonID = '61e606029d072ea10d4a92c2';
  const blueButtonIdx = experimentIDs.indexOf(blueButtonID);
  const blueButton =
    experimentList.length > 0 && blueButtonIdx !== -1
      ? experimentList[experimentIDs.indexOf(blueButtonID)]
      : null;

  useEffect(() => {
    if (blueButton !== null) {
      setCrement(blueButton.active ? 1 : -1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experimentList.length > 0 ? blueButton : null]);

  useEffect(() => {
    if (!experimentPopup && experimentList.length > 0) {
      const allExperimentsAPI =
        'https://ucredit-experiments-api.herokuapp.com/api/experiments/allExperiments';
      const experimentAPI =
        'https://ucredit-experiments-api.herokuapp.com/api/experiments/';

      axios
        .get(`${allExperimentsAPI}`)
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
              .put(`${experimentAPI}${command}${experiment.name}`, {
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

  const updateExperimentsForUser = async () => {
    // use api from assets.tsx, move experiments and make a new route instead

    const experimentAPI =
      'https://ucredit-experiments-api.herokuapp.com/api/experiments/allExperiments';

    try {
      const experimentListResponse = await axios.get(`${experimentAPI}`); // getting experiment list
      const experiments = experimentListResponse.data.data;
      dispatch(setExperiments(experiments));

      for (const experiment of experiments) {
        if (experiment.active.includes(user._id)) {
          dispatch(toggleExperimentStatus(experiment._id));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (experimentList.length === 0) {
    updateExperimentsForUser();
  }

  return (
    <div className="flex flex-col w-full h-full min-h-screen">
      <HandleUserEntryDummy id={id} />
      {
        <div className="fixed flex flex-row z-40 bottom-11 right-2 flex flex-row select-none">
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
      }
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
      </div>
    </div>
  );
};

export default Dashboard;
