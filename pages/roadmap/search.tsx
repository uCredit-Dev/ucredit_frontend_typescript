import SearchHeader from '../../lib/components/roadmap/search/SearchHeader';
import SearchDetailPane from '../../lib/components/roadmap/search/SearchDetailPane';
import SearchResultCard from '../../lib/components/roadmap/search/SearchResultCard';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Router } from 'express';
import { Hoverable } from '../../lib/components/utils';
import { TooltipPrimary } from '../../lib/components/utils/TooltipPrimary';
import { userService } from '../../lib/services';
import {
  Plan,
  ReviewRequestStatus,
  StatusPlan,
  User,
  UserCourse,
} from '../../lib/resources/commonTypes';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectPlan, updateThreads } from '../../lib/slices/currentPlanSlice';



interface Props {
  plans: StatusPlan[];
  expanded?: boolean;
}

const RoadmapSearch: React.FC<Props> = ({
  plans,
  expanded = false,

}) => {
  const [showPlans, setShowPlans] = useState(expanded);
  const router = useRouter();
  const handleViewPlan = async (e, plan: Plan) => {
    e.stopPropagation();
    // hardcoded for now
    const planID = "61ccac7bfd08a30004b0417c";
    router.push(`/dashboard?plan=${planID}&mode=roadmap`);
    //router.push(`/dashboard?plan=${plan._id}&mode=roadmap`);
    //router.push('/dashboard&mode=roadmap');
  };
  
  const currPlan = useSelector(selectPlan);

  return (
    
    <>

      <SearchHeader />
      <div className="flex flex-col md:flex-row bg-white">
        <div className="hidden md:block basis-2/5">
          <div className="sticky top-44">
            <SearchDetailPane />
          </div>
        </div>

        {showPlans && (
          <div className="">
            {plans.map((p, i) => {
              const { _id, name, status, review_id } = p;
              return (
                <div key={_id}>

                  <Hoverable
                    as={
                      <div
                        className="transition-colors duration-150 ease-in rounded-sm cursor-pointer inspect-plan-button"
                        onClick={(e) => handleViewPlan(e, p)}
                      >
                        <SearchResultCard />
                      </div>
                    }
                  >
                    {({ hovered }) => (
                      <>
                        {hovered && (
                          <TooltipPrimary width={120}>
                            Inspect plan
                          </TooltipPrimary>
                        )}
                      </>
                    )}
                  </Hoverable>
                </div>
              );
            })}
          </div>
        )}

        <Hoverable
          as={
            <div
              className="transition-colors duration-150 ease-in rounded-sm cursor-pointer inspect-plan-button"
              onClick={(e) => handleViewPlan(e, currPlan)}
            >
              <SearchResultCard />
            </div>
          }
        >
          {({ hovered }) => (
            <>
              {hovered && (
                <TooltipPrimary width={120}>
                  Inspect plan
                </TooltipPrimary>
              )}
            </>
          )}
        </Hoverable>
      </div>
    </>
  );
};

export default RoadmapSearch;
