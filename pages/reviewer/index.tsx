import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserSection from '../../lib/components/dashboard/UserSection';
import { userService } from '../../lib/services';
import { selectUser } from '../../lib/slices/userSlice';
import { Reviewee, Search } from '../../lib/components/reviewer';
import {
  DashboardMode,
  Plan,
  RevieweePlans,
  ReviewRequestStatus,
  User,
} from '../../lib/resources/commonTypes';

export type planUserTuple = {
  plan: Plan;
  user: User;
};

const Reviewer: React.FC = () => {
  const router = useRouter();
  const user = useSelector(selectUser);
  const [filtered, setFiltered] = useState<RevieweePlans[]>([]);
  const [foundPlan, setFoundPlan] = useState(false);

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
      const reviews = (await userService.getReviewerPlans(user._id)).data;
      for (const { plan_id, reviewee_id, status } of reviews) {
        if (status === ReviewRequestStatus.Pending) continue;
        const plan = (await userService.getPlan(plan_id)).data;
        const reviewee = (await userService.getUser(reviewee_id._id)).data[0];
        const revieweeString = JSON.stringify(reviewee);
        const plans = plansByUser.get(revieweeString) || [];
        plansByUser.set(revieweeString, [...plans, plan]);
      }
      const revieweePlansArr = [];
      for (const [k, v] of plansByUser) {
        revieweePlansArr.push({ reviewee: JSON.parse(k), plans: v });
      }
      setFiltered(revieweePlansArr);
      setFoundPlan(revieweePlansArr.length > 0);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div>
      <UserSection mode={DashboardMode.Advising} />
      <div className="pt-24 text-black bg-[#eff2f5] font-bold text-xl md:px-[250px] pb-4">
        Reviewees
      </div>
      {foundPlan && (
        <div className="md:px-[250px] bg-[#eff2f5] pb-3 w-screen">
          <Search revieweePlans={filtered} setFiltered={setFiltered} />
        </div>
      )}
      <div className="flex flex-col items-center w-screen h-screen bg-[#eff2f5] md:px-[250px] gap-2 overflow-y-auto">
        {filtered.map((tuple, index) => (
          <Reviewee
            key={tuple.reviewee._id}
            userId={tuple.reviewee._id}
            plans={tuple.plans}
            reviewee={tuple.reviewee}
            expanded={index === 0}
          />
        ))}
      </div>
    </div>
  );
};

export default Reviewer;
