import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../lib/components/dashboard/Header';
import { userService } from '../../lib/services';
import { selectUser } from '../../lib/slices/userSlice';
import { Reviewee, Search } from '../../lib/components/reviewer';
import {
  DashboardMode,
  RevieweePlans,
  ReviewRequestStatus,
} from '../../lib/resources/commonTypes';
import HamburgerMenu from '../../lib/components/dashboard/menus/HamburgerMenu';
import Notification from '../../lib/components/dashboard/menus/Notification';

export const statusReadable = {
  [ReviewRequestStatus.UnderReview]: 'Under Review',
  [ReviewRequestStatus.Approved]: 'Approved',
  [ReviewRequestStatus.Rejected]: 'Rejected',
};

const Reviewer: React.FC = () => {
  const router = useRouter();
  const user = useSelector(selectUser);
  const [filtered, setFiltered] = useState<RevieweePlans[]>([]);
  const [foundPlan, setFoundPlan] = useState(false);
  const [refreshReviews, setRefreshReviews] = useState(false);

  useEffect(() => {
    const { _id } = user;
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
      for (const { _id, plan_id, reviewee_id, status } of reviews) {
        if (status === ReviewRequestStatus.Pending) continue;
        const plansResp = await userService.getPlan(plan_id);
        const plan = {
          ...plansResp.data,
          status,
          review_id: _id,
        };
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
      setRefreshReviews(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, refreshReviews]);

  return (
    <div>
      <Header />
      <div className="pt-24 text-black bg-[#eff2f5] font-bold text-xl md:px-[250px] pb-4">
        Reviewees
      </div>
      {foundPlan && (
        <div className="md:px-[250px] bg-[#eff2f5] pb-3 w-full">
          <Search filtered={filtered} setFiltered={setFiltered} />
        </div>
      )}
      <div className="flex flex-col items-center w-full h-screen bg-[#eff2f5] md:px-[250px] gap-2 overflow-y-auto">
        {filtered.map((tuple, index) => (
          <Reviewee
            key={tuple.reviewee._id}
            userId={tuple.reviewee._id}
            plans={tuple.plans}
            reviewee={tuple.reviewee}
            expanded={index === 0}
            setRefreshReviews={setRefreshReviews}
          />
        ))}
      </div>
      <HamburgerMenu mode={DashboardMode.Reviewer} />
      <Notification userID={user._id} />
    </div>
  );
};

export default Reviewer;
