import { useEffect, useState } from 'react';
import clsx from 'clsx';
import {
  CheckIcon,
  EyeIcon,
  PencilAltIcon,
  XIcon,
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import {
  Plan,
  ReviewRequestStatus,
  StatusPlan,
  User,
} from '../../resources/commonTypes';
import { Hoverable } from '../utils';
import { TooltipPrimary } from '../utils/TooltipPrimary';
import { statusReadable } from '../../../pages/reviewer';
import Dropdown from './Dropdown';

interface Props {
  userId: string;
  plans: StatusPlan[];
  reviewee: User;
  expanded?: boolean;
}

const Reviewee: React.FC<Props> = ({ plans, reviewee, expanded = false }) => {
  const [showPlans, setShowPlans] = useState(expanded);
  const [majors, setMajors] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const set = new Set<string>();
    for (const p of plans) {
      for (const m of p.majors) set.add(m);
    }
    setMajors([...set]);
  }, [plans]);

  const handleViewPlan = (e, plan: Plan) => {
    e.stopPropagation();
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
              const { _id, name, status } = p;
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
                      options={[
                        {
                          label: 'Under Review',
                          cb: () => console.log('under review'),
                        },
                        {
                          label: 'Approved',
                          cb: () => console.log('approved'),
                        },
                      ]}
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
