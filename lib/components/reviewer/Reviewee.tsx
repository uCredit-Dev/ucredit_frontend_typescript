import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import clsx from 'clsx';
import { EyeIcon, PencilAltIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import {
  Plan,
  ReviewRequestStatus,
  StatusPlan,
  User,
} from '../../resources/commonTypes';
import { Hoverable } from '../utils';
import { TooltipPrimary } from '../utils/TooltipPrimary';
import { fetchWrapper } from '../../utils';
import { getAPI } from '../../resources/assets';
import { useDispatch } from 'react-redux';
import {
  updateReviewedPlan,
  updateThreads,
} from '../../slices/currentPlanSlice';
import axios from 'axios';
import { statusReadable } from '../../../pages/reviewer';
import Dropdown from './Dropdown';
import { userService } from '../../services';

interface Props {
  userId: string;
  plans: StatusPlan[];
  reviewee: User;
  expanded?: boolean;
  setRefreshReviews: Dispatch<SetStateAction<boolean>>;
}

const Reviewee: React.FC<Props> = ({
  plans,
  reviewee,
  expanded = false,
  setRefreshReviews,
}) => {
  const [showPlans, setShowPlans] = useState(expanded);
  const [majors, setMajors] = useState<string[]>([]);
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    const set = new Set<string>();
    for (const p of plans) {
      for (const m of p.majors) set.add(m);
    }
    setMajors([...set]);
  }, [plans]);

  const handleViewPlan = async (e, plan: Plan) => {
    e.stopPropagation();
    const threads = await axios.get(
      `${getAPI(window)}/thread/getByPlan/${plan._id}`,
    );
    console.log(threads.data);
    dispatch(updateThreads(threads.data.data));
    dispatch(updateReviewedPlan(plan));
    router.push(`/dashboard?plan=${plan._id}&mode=view`);
  };

  const handleEditPlan = (e, plan: Plan) => {
    e.stopPropagation();
    router.push(`/dashboard?plan=${plan._id}&mode=edit`);
  };

  return (
    reviewee && (
      <div
        className="w-full p-3 bg-white border border-gray-300 rounded-md"
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
            <p key={m}>{m}</p>
          ))}
        </div>
        {showPlans && (
          <div className="divide-y">
            {plans.map((p) => {
              const { _id, name, status, review_id } = p;
              return (
                <div
                  key={_id}
                  className="flex items-center justify-between h-8 group"
                >
                  <div className="flex items-center gap-[6px]">
                    {status && (
                      <Hoverable
                        as={
                          <div
                            className={clsx(
                              'w-2 h-2 translate-y-[1.5px] rounded-full',
                              {
                                'bg-sky-400':
                                  status === ReviewRequestStatus.UnderReview,
                                'bg-emerald-400':
                                  status === ReviewRequestStatus.Approved,
                                'bg-red-400':
                                  status === ReviewRequestStatus.Rejected,
                              },
                            )}
                          />
                        }
                      >
                        {({ hovered }) =>
                          hovered && (
                            <TooltipPrimary width={140}>
                              {statusReadable[status]}
                            </TooltipPrimary>
                          )
                        }
                      </Hoverable>
                    )}
                    <p>{name}</p>
                  </div>
                  <div className="flex items-center gap-x-1">
                    <Dropdown
                      width={130}
                      options={[
                        {
                          label: 'Under Review',
                          content: <p className="text-sky-400">Under Review</p>,
                          cb: async () => {
                            if (status === ReviewRequestStatus.UnderReview)
                              return;
                            try {
                              await userService.changeReviewStatus(
                                review_id,
                                'UNDERREVIEW',
                              );
                              setRefreshReviews(true);
                              toast.success('Status changed to Under Review');
                            } catch (e) {}
                          },
                        },
                        {
                          label: 'Approved',
                          content: <p className="text-emerald-400">Approved</p>,
                          cb: async () => {
                            if (status === ReviewRequestStatus.Approved) return;
                            try {
                              await userService.changeReviewStatus(
                                review_id,
                                'APPROVED',
                              );
                              setRefreshReviews(true);
                              toast.success('Status changed to Approved');
                            } catch (e) {}
                          },
                        },
                        {
                          label: 'Rejected',
                          content: <p className="text-red-400">Rejected</p>,
                          cb: async () => {
                            if (status === ReviewRequestStatus.Rejected) return;
                            try {
                              await userService.changeReviewStatus(
                                review_id,
                                'REJECTED',
                              );
                              setRefreshReviews(true);
                              toast.success('Status changed to Rejected');
                            } catch (e) {}
                          },
                        },
                      ]}
                      _default={statusReadable[status]}
                    />
                    <Hoverable
                      as={
                        <div
                          className="flex items-center justify-center w-6 h-6 transition-colors duration-150 ease-in rounded-sm cursor-pointer hover:bg-gray-200"
                          onClick={(e) => handleViewPlan(e, p)}
                        >
                          <EyeIcon className="w-5 h-5" />
                        </div>
                      }
                    >
                      {({ hovered }) =>
                        hovered && (
                          <TooltipPrimary width={120}>
                            Inspect plan
                          </TooltipPrimary>
                        )
                      }
                    </Hoverable>
                    <Hoverable
                      as={
                        <div
                          className="flex items-center justify-center w-6 h-6 transition-colors duration-150 ease-in rounded-sm cursor-pointer hover:bg-gray-200"
                          onClick={(e) => handleEditPlan(e, p)}
                        >
                          <PencilAltIcon className="w-5 h-5" />
                        </div>
                      }
                    >
                      {({ hovered }) =>
                        hovered && (
                          <TooltipPrimary width={120}>Edit Plan</TooltipPrimary>
                        )
                      }
                    </Hoverable>
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
