import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserSection from '../../lib/components/dashboard/UserSection';
import { userService } from '../../lib/services';
import {
  selectReviewerPlans,
  selectUser,
  updateReviewerPlans,
} from '../../lib/slices/userSlice';

const Reviewer: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const reviewerPlans = useSelector(selectReviewerPlans);

  useEffect(() => {
    const { _id } = user;
    // console.log(user);
    if (_id === 'noUser' || _id === 'guestUser') {
      if (user._id === 'noUser') {
        router.push(`/login?referrer=reviewer`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    const { _id } = user;
    if (_id === 'noUser' || _id === 'guestUser') return;
    (async () => {
      const list = [];
      for (const planId of user.whitelisted_plan_ids) {
        const res = await userService.getPlan(planId);
        list.push(res.data);
      }
      dispatch(updateReviewerPlans(list));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div>
      <UserSection />
      <div className="flex flex-col items-center w-screen h-screen pt-20 bg-white divide-y">
        {reviewerPlans.map(({ _id, name, user_id }) => (
          <div key={_id} className="">
            <p>{name}</p>
            <p>{user_id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviewer;
