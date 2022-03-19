import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  selectPlanList,
  selectReviewerPlanId,
  selectUser,
  updatePlanList,
  updateReviewerPlanID,
  updateUser,
} from '../../lib/slices/userSlice';
import 'react-toastify/dist/ReactToastify.css';
import { userService } from '../../lib/services';
import {
  selectPlan,
  updateSelectedPlan,
} from '../../lib/slices/currentPlanSlice';

// const { publicRuntimeConfig } = getConfig();
// const apiUrl = publicRuntimeConfig.apiUrl;
const apiUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4567/api'
    : 'https://ucredit-api.herokuapp.com/api';

const ReviewerAdd: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const planList = useSelector(selectPlanList);
  const plan = useSelector(selectPlan);
  const reviewerPlanId = useSelector(selectReviewerPlanId);

  useEffect(() => {
    const id = router.query.id && router.query.id[0];
    if (!id) return;
    dispatch(updateReviewerPlanID(id));
    const { _id } = user;
    if (_id === 'noUser' || _id === 'guestUser') {
      if (user._id === 'noUser' && reviewerPlanId) {
        router.push(`/login?referrer=reviewer-${id}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id, user, reviewerPlanId]);

  useEffect(() => {
    (async () => {
      try {
        if (user._id === 'noUser' || user._id === 'guestUser') return;
        const res = await userService.confirmReviewerPlan(
          reviewerPlanId,
          (status: number) => {
            if (status === 200) toast.success('Confirmed reviewer plan!');
            else toast.error('Failed');
          },
        );

        // const plan = res.data;
        // const updatedPlanList = [...planList, plan];
        // dispatch(updatePlanList(updatedPlanList));
        // dispatch(updateSelectedPlan(plan));
        // const updatedUser = (await userService.getUser(user._id)).data[0];
        // dispatch(updateUser(updatedUser));
        router.push('/reviewer');
      } catch (err) {
        router.push('/reviewer');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, router.query.id]);

  return <></>;
};

export default ReviewerAdd;
