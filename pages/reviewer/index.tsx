import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
import { Plan, User } from '../../lib/resources/commonTypes';

export type planUserTuple = {
  plan: Plan;
  user: User;
};

const Reviewer: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const reviewerPlans = useSelector(selectReviewerPlans);

  const [planUsers, setplanUsers] = useState<planUserTuple[]>([]);
  const [filtered, setFiltered] = useState<planUserTuple[]>([]);

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
        const res2 = await userService.getUser(data.user_id);
        const user2 = res2.data[0];
        setplanUsers([...planUsers, { plan: data, user: user2 }]);
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
        <Search plans={planUsers} setFiltered={setFiltered} />
      </div>
      <div className="flex flex-col items-center w-screen h-screen bg-[#eff2f5] md:px-[250px] gap-2 overflow-y-auto">
        {filtered.map((tuple) => (
          <Reviewee
            key={tuple.plan._id}
            userId={tuple.user._id}
            plans={[tuple.plan]}
            reviewee={tuple.user}
          />
        ))}
      </div>
    </div>
  );
};

export default Reviewer;
