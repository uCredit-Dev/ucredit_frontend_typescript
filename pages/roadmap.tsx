import React, { useState } from 'react';
import CommentIcon from '../lib/components/roadmap/commentEditor/CommentIcon';
import CommentEditor from '../lib/components/roadmap/commentEditor/Editor';
import Header from '../lib/components/roadmap/roadMapHeader';
import RoadMapComment from '../lib/components/roadmap/roadMapComment';
import Banner from '../lib/components/roadmap/roadMapBanner';

import { DashboardMode, ReviewMode } from '../lib/resources/commonTypes';
import { useDispatch, useSelector } from 'react-redux';
import CourseList from '../lib/components/dashboard/course-list/horizontal/CourseList';
import InfoMenu from '../lib/components/dashboard/degree-info/InfoMenu';
import {
  selectDeletePlanStatus,
  selectAddingPlanStatus,
  selectDeleteYearStatus,
  selectCourseToDelete,
  selectShowCourseInfo,
  selectAddingPrereq,
  selectShowingCart,
  selectInfoPopup,
} from '../lib/slices/popupSlice';
import { useCallback, useEffect } from 'react';
import {
  selectImportingStatus,
  selectPlan,
  updateThreads,
} from '../lib/slices/currentPlanSlice';
import {
  selectExperimentList,
  setExperiments,
  toggleExperimentStatus,
} from '../lib/slices/experimentSlice';
import { selectSearchStatus } from '../lib/slices/searchSlice';
import {
  selectLoginCheck,
  selectUser,
  updateCommenters,
} from '../lib/slices/userSlice';
import axios from 'axios';
import { getAPI } from '../lib/resources/assets';
import Cart from '../lib/components/popups/course-search/Cart';
import GenerateNewPlan from '../lib/resources/GenerateNewPlan';
import LoadingPage from '../lib/components/LoadingPage';
import HandlePlanShareDummy from '../lib/components/dashboard/HandlePlanShareDummy';
import HandleUserInfoSetupDummy from '../lib/components/dashboard/HandleUserInfoSetupDummy';
import { userService } from '../lib/services';
import HamburgerMenu from '../lib/components/dashboard/menus/HamburgerMenu';
import Notification from '../lib/components/dashboard/menus/Notification';
import PlanEditMenu from '../lib/components/dashboard/menus/PlanEditMenu';
import CommentsOverview from '../lib/components/dashboard/menus/comments/CommentsOverview';

interface Props {
  mode: ReviewMode;
}

const RoadMap: React.FC<Props> = ({ mode }) => {
  const infoPopup = useSelector(selectInfoPopup);
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
      if (currPlan && currPlan._id !== 'noPlan') {
        const res = await userService.getThreads(currPlan._id);
        dispatch(updateThreads(res.data));
        const commentersSet = new Set<string>();
        for (const thread of res.data) {
          for (const comment of thread.comments) {
            const userId = comment.commenter_id;
            commentersSet.add(JSON.stringify(userId));
          }
        }
        const commentersArr = [...commentersSet].map((c) => JSON.parse(c));
        dispatch(updateCommenters(commentersArr));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, currPlan._id]);



  const [editorPopup, setEditorPopup] = useState(false);
  const [comments, setComments] = useState<string[]>([]);

  const openEditor = () => {
    setEditorPopup(true);
  };

  const closeEditor = () => {
    setEditorPopup(false);
  };

  const addComments = (newComment: string) => {
    setComments([...comments, newComment]);
  };

  return (
    <>
    <div className="flex flex-col w-full h-full font-roadMapPage bg-white overflow-x-hidden">
      <Header/>
      <Banner/>
      <RoadMapComment/>


      <CommentIcon openEditor={openEditor}/>
      {editorPopup && <CommentEditor addComments={addComments} closeEditor={closeEditor}/>}

    </div>
      
    </>
  )

}



export default RoadMap;
