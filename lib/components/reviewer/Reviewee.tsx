import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { EyeIcon, PencilAltIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Plan, User } from '../../resources/commonTypes';
import { userService } from '../../services';
import { updateSelectedPlan } from '../../slices/currentPlanSlice';

interface Props {
  userId: string;
  plans: Plan[];
}

const Reviewee: React.FC<Props> = ({ userId, plans }) => {
  const [reviewee, setReviewee] = useState<User>(null);
  const [showPlans, setShowPlans] = useState(false);
  const [majors, setMajors] = useState<string[]>([]);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await userService.getUser(userId);
      const user = res.data[0];
      setReviewee(user);
    })();
  }, [userId]);

  useEffect(() => {
    const set = new Set<string>();
    for (const p of plans) {
      for (const m of p.majors) set.add(m);
    }
    setMajors([...set]);
  }, [plans]);

  const handleViewPlan = (e, plan: Plan) => {
    e.stopPropagation();
    console.log(plan);
    dispatch(updateSelectedPlan(plan));
    router.push('/dashboard');
  };

  const handleEditPlan = (e, plan: Plan) => {
    e.stopPropagation();
  };

  return (
    reviewee && (
      <div
        className="w-full p-3 bg-white border border-gray-300 rounded-md cursor-pointer"
        onClick={() => setShowPlans((showPlans) => !showPlans)}
      >
        <div className="flex justify-between mb-2">
          <div>
            <p className="font-semibold">{reviewee.name}</p>
            <p>{reviewee.email}</p>
          </div>
          <p className="flex items-center">{reviewee.grade}</p>
        </div>
        <div className={clsx('text-sm', { 'mb-2': showPlans })}>
          {majors.map((m) => (
            <p>{m}</p>
          ))}
        </div>
        {showPlans && (
          <div className="divide-y">
            {plans.map((p) => {
              const { _id, name } = p;
              return (
                <div
                  key={_id}
                  className="flex items-center justify-between h-8 group"
                >
                  <p>{name}</p>
                  <div className="items-center hidden gap-x-1 group-hover:flex">
                    <div
                      className="flex items-center justify-center w-6 h-6 transition-colors duration-150 ease-in rounded-sm hover:bg-gray-200"
                      onClick={(e) => handleViewPlan(e, p)}
                    >
                      <EyeIcon className="w-5 h-5" />
                    </div>
                    <div
                      className="flex items-center justify-center w-6 h-6 transition-colors duration-150 ease-in rounded-sm hover:bg-gray-200"
                      onClick={(e) => handleEditPlan(e, p)}
                    >
                      <PencilAltIcon className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    )
  );
};

export { Reviewee };
