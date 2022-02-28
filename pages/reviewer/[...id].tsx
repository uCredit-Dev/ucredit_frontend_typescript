import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// import getConfig from 'next/config';
import {
  selectReviewerPlanId,
  selectUser,
  updateReviewerPlanID,
} from '../../lib/slices/userSlice';
import { post } from '../../lib/utils';
import 'react-toastify/dist/ReactToastify.css';

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
  const reviewerPlanId = useSelector(selectReviewerPlanId);

  useEffect(() => {
    const id = router.query.id && router.query.id[0];
    if (!id) return;
    dispatch(updateReviewerPlanID(id));
    const { _id } = user;
    if (_id === 'noUser' || _id === 'guestUser') {
      if (user._id === 'noUser') {
        router.push(`/login?referrer=reviewer-${id}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, router.query.id]);

  useEffect(() => {
    (async () => {
      try {
        if (user._id === 'noUser' || user._id === 'guestUser') return;
        const res = await post(`${apiUrl}/planReview/addReviewer`, {
          plan_id: reviewerPlanId,
          reviewer_id: user._id,
        });
        if (res.status === 400)
          toast.error('Reviewer already added for this plan');
        else if (res.status === 200) toast.success('Imported reviewer plan!');
        else toast.error('Invalid link');
        router.push('/reviewer');
      } catch (err) {
        console.log(err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return <></>;
};

export default ReviewerAdd;
