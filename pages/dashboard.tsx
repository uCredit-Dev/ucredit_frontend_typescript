import Dashboard from '../lib/components/dashboard/index';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPlanList,
  selectUser,
  updateReviewMode,
} from '../lib/slices/userSlice';
import React, { useEffect, useState } from 'react';
import { ReviewMode, User } from '../lib/resources/commonTypes';
import { useRouter } from 'next/router';
import { userService } from '../lib/services';
import axios from 'axios';
import { getAPI } from '../lib/resources/assets';
import {
  initialPlan,
  updateSelectedPlan,
} from '../lib/slices/currentPlanSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dash: React.FC = () => {
  const user: User = useSelector(selectUser);
  const router = useRouter();
  const planList = useSelector(selectPlanList);
  const [mode, setMode] = useState<ReviewMode>(ReviewMode.None);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user || user._id === 'noUser')
      router.push('/login' + router.asPath.substring(10));

    const yearRange = localStorage.getItem('yearRange');
    if (!yearRange) {
      axios
        .get(getAPI(window) + '/getYearRange')
        .then((res) => {
          const { min, max } = res.data.data;
          const yearRange = {
            min,
            max,
            expiry: new Date().getTime() + 1829800000,
          };
          localStorage.setItem('yearRange', JSON.stringify(yearRange));
        })
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!router.query || !router.query.mode) {
      if (planList.length > 0) {
        dispatch(updateSelectedPlan(planList[0]));
        dispatch(updateReviewMode(ReviewMode.Edit));
        setMode(ReviewMode.Edit);
        return;
      } else if (initialPlan._id !== 'noPlan' || user._id === 'guestUser') {
        dispatch(updateSelectedPlan(initialPlan));
        dispatch(updateReviewMode(ReviewMode.Edit));
        setMode(ReviewMode.Edit);
        return;
      }
    }
    (async () => {
      try {
        if (user._id === 'noUser') {
          return;
        }
        if (!router.query || !router.query.mode) {
          const plan = await userService.getPlan(user.plan_ids[0]);
          dispatch(updateSelectedPlan(plan.data));
          dispatch(updateReviewMode(ReviewMode.Edit));
          setMode(ReviewMode.Edit);
          return;
        }
        const res = await userService.getPlan(router.query.plan as string);
        if (Object.values(user.plan_ids).includes(res.data._id as string)) {
          setMode(ReviewMode.Edit);
          dispatch(updateReviewMode(ReviewMode.Edit));
          router.push('/dashboard');
          return;
        }
        const reviewers = (await userService.getPlanReviewers(res.data._id))
          .data[0];
        if (Object.values(reviewers.reviewer_id).includes(user._id)) {
          dispatch(updateSelectedPlan(res.data));
          dispatch(updateReviewMode(ReviewMode.View));
          setMode(ReviewMode.View);
          return;
        }
        if (router.query.plan) {
          router.push('/dashboard');
          toast.error('You do not have access to this plan!', {
            toastId: 'cannot access plan',
          });
        }
      } catch (e) {
        console.log(e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  return (
    <>
      <Head>
        <title>My Plan</title>
      </Head>
      {/* <Dashboard mode={ReviewMode.RoadMap} /> */}
      <Dashboard mode={mode} />
    </>
  );
};

export default Dash;
