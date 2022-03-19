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
import { DashboardMode } from '../../lib/types';
import { Reviewee, Search } from '../../lib/components/reviewer';

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
      const plansByUser = new Map();
      const reviews = await userService.getReviewerPlans(user._id);
      for (const planId of user.whitelisted_plan_ids) {
        const res = await userService.getPlan(planId);
        const data = res.data;
        const user = data.user_id;
        const plans = plansByUser.get(user) || [];
        plansByUser.set(user, [...plans, data]);
      }
      dispatch(updateReviewerPlans([...plansByUser]));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div>
      <UserSection mode={DashboardMode.Advising} />
      <div className="pt-24 text-black bg-[#eff2f5] font-bold text-xl md:px-[250px] pb-4">
        Reviewees
      </div>
      <div className="md:px-[250px] bg-[#eff2f5] pb-3 w-screen">
        <Search />
      </div>
      <div className="flex flex-col items-center w-screen h-screen bg-[#eff2f5] md:px-[250px] gap-2 overflow-y-auto">
        {reviewerPlans.map((plans) => (
          <Reviewee key={plans[0]} userId={plans[0]} plans={plans[1]} />
        ))}
      </div>
    </div>
  );
};

export default Reviewer;
