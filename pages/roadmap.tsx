import React from 'react';
import Header from '../lib/components/roadmap/Header';
import RoadMapComment from '../lib/components/roadmap/comments/RoadMapComment';
import Banner from '../lib/components/roadmap/Banner';
import { ReviewMode } from '../lib/resources/commonTypes';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { selectPlan, updateThreads } from '../lib/slices/currentPlanSlice';
import {
  selectExperimentList,
  setExperiments,
  toggleExperimentStatus,
} from '../lib/slices/experimentSlice';
import { selectUser, updateCommenters } from '../lib/slices/userSlice';
import axios from 'axios';
import { getAPI } from '../lib/resources/assets';
import { userService } from '../lib/services';

interface Props {
  mode: ReviewMode;
}

const RoadMap: React.FC<Props> = ({ mode }) => {
  const user = useSelector(selectUser);
  const experimentList = useSelector(selectExperimentList);
  const dispatch = useDispatch();
  const currPlan = useSelector(selectPlan);

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

  return (
    <>
      <div className="flex flex-col w-full h-full font-roadMapPage bg-white">
        <Header />
        <Banner />
        <RoadMapComment />
      </div>
    </>
  );
};

export default RoadMap;