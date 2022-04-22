import Dashboard from '../lib/components/dashboard/index';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateReviewMode } from '../lib/slices/userSlice';
import { useEffect, useState } from 'react';
import { Plan, ReviewMode, User } from '../lib/resources/commonTypes';
import { useRouter } from 'next/router';
import { userService } from '../lib/services';
import axios from 'axios';
import { getAPI } from '../lib/resources/assets';
import { selectPlan } from '../lib/slices/currentPlanSlice';

const Dash: React.FC = () => {
  const user: User = useSelector(selectUser);
  const router = useRouter();
  const curPlan = useSelector(selectPlan);
  const [plan, setPlan] = useState<Plan>(curPlan);
  const [mode, setMode] = useState<ReviewMode>(ReviewMode.View);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user._id === 'noUser') router.push('/login');
    const yearRange = localStorage.getItem('yearRange');
    if (!yearRange)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!router.query) {
      dispatch(updateReviewMode(ReviewMode.None));
      return;
    }
    setMode(router.query.mode as ReviewMode);
    dispatch(updateReviewMode(router.query.mode as ReviewMode));
    if (!router.query.plan) return;
    (async () => {
      try {
        const res = (await userService.getPlan(router.query.plan as string))
          .data;
        setPlan(res);
      } catch (e) {}
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  return (
    <>
      <Head>
        <title>My Plan</title>
      </Head>
      <Dashboard plan={plan} mode={mode} />
    </>
  );
};

export default Dash;
