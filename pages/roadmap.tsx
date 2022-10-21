import React from 'react';
import Header from '../lib/components/roadmap/Header';
import RoadmapComment from '../lib/components/roadmap/comments/RoadmapComment';
import Banner from '../lib/components/roadmap/Banner';
import { ReviewMode } from '../lib/resources/commonTypes';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import {
  selectPlan,
  updateSelectedPlan,
  updateThreads,
} from '../lib/slices/currentPlanSlice';
import {
  selectExperimentList,
  setExperiments,
  toggleExperimentStatus,
} from '../lib/slices/experimentSlice';
import { selectToken, selectUser, updateCommenters } from '../lib/slices/userSlice';
import axios from 'axios';
import { getAPI } from '../lib/resources/assets';
import { userService } from '../lib/services';
// import CourseList from './plancourseList';
import CourseList from '../lib/components/dashboard/course-list/CourseList';

interface Props {
  mode: ReviewMode;
}

const RoadMap: React.FC<Props> = ({ mode }) => {
  const user = useSelector(selectUser);
  const experimentList = useSelector(selectExperimentList);
  const token = useSelector(selectToken);
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
    // hard code the roadmap  plan
    userService.getPlan('61cd005a4ec21b0004c2a758', token).then((res) => {
      // console.log('res', res);
      dispatch(updateSelectedPlan(res.data));
    });

    (async () => {
      if (currPlan && currPlan._id !== 'noPlan') {
        const res = await userService.getThreads(currPlan._id, token, false, null);
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
        <div className="mx-32 pt-[3%] ">
          {/* <Actionbar mode={mode} /> */}

          <CourseList mode={ReviewMode.RoadMap} />
        </div>

        <RoadmapComment />
      </div>
    </>
  );
};

export default RoadMap;
