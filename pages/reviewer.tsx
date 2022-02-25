import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import getConfig from 'next/config';
import { selectUser, updateReviewerPlanID } from '../lib/slices/userSlice';
import { post } from '../lib/utils';
import 'react-toastify/dist/ReactToastify.css';

const { publicRuntimeConfig } = getConfig();
const apiUrl = publicRuntimeConfig.apiUrl;

const Reviewer: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    const { _id } = user;
    if (_id === 'noUser' || _id === 'guestUser') {
      if (user._id === 'noUser') {
        router.push('/dashboard?referrer=reviewer');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    (async () => {
      const id = router.query.id as string;
      dispatch(updateReviewerPlanID(id));
      // post(`${apiUrl}/planReview/addReviewer`, { id });
      try {
        if (user._id === 'noUser' || user._id === 'guestUser') return;
        post('http://localhost:4567/api/planReview/addReviewer', {
          plan_id: id,
          reviewer_id: user._id,
        });
      } catch (err) {
        console.log(err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id, user]);

  return <></>;
};

export default Reviewer;
