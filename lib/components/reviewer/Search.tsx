import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import debounce from 'lodash.debounce';
import {
  RevieweePlans,
  ReviewRequestStatus,
} from '../../../lib/resources/commonTypes';
import Status from './Status';
import React from 'react';

const settings = [
  'Recently Updated',
  'First Name',
  'Last Name',
  'JHED',
  'Graduation Year',
];

const statusFilter = [
  ReviewRequestStatus.UnderReview,
  ReviewRequestStatus.Approved,
  ReviewRequestStatus.Rejected,
];

const years = {
  Freshman: 1,
  Sophomore: 2,
  Junior: 3,
  Senior: 4,
};

const Search: React.FC<{
  filtered: RevieweePlans[];
  setFiltered: Dispatch<SetStateAction<RevieweePlans[]>>;
}> = ({ filtered, setFiltered }) => {
  const [revieweePlans] = useState(filtered);
  const [searchState, updateSearchState] = useState('');
  const [displaySettings, setDisplaySettings] = useState(false);
  const [reversed, setReversed] = useState(false);
  const [searchSetting, setSearchSetting] = useState(settings[0]);

  const [selectedUnderReview, setSelectedUnderReview] = useState(true);
  const [selectedApproved, setSelectedApproved] = useState(true);
  const [selectedRejected, setSelectedRejected] = useState(true);

  const handleChange = (e) => {
    updateSearchState(e.target.value);
  };

  //Given a reviewee, returns time of last update of one of that reviewees plans, if that info is tracked
  const getLastUpdatedPlan= (a:RevieweePlans) => {
    let lastUpdatedPlan=a.plans[0];
    a.plans.forEach(d => {
      if(lastUpdatedPlan.updatedAt!==undefined && d.updatedAt!==undefined)
      {
        if(lastUpdatedPlan.updatedAt < d.updatedAt)
        {
          lastUpdatedPlan=d;
        }
      }
      else if(d.updatedAt!=null)
      {
        lastUpdatedPlan=d;
      }
    } );
    if(lastUpdatedPlan.updatedAt==null)
    {
      return "";
    }
    else
    {
      return lastUpdatedPlan.updatedAt.toLocaleString();
    }
  };

  const filter = () => {
    let filteredMap = new Map();
    for (const { reviewee, plans } of revieweePlans) {
      const revieweeString = JSON.stringify(reviewee);
      for (const plan of plans) {
        if (
          (plan._id.toLowerCase().includes(searchState.toLowerCase()) ||
            plan.name.toLowerCase().includes(searchState.toLowerCase()) ||
            reviewee.name.toLowerCase().includes(searchState.toLowerCase())) &&
          ((selectedUnderReview &&
            plan.status === ReviewRequestStatus.UnderReview) ||
            (selectedApproved &&
              plan.status === ReviewRequestStatus.Approved) ||
            (selectedRejected && plan.status === ReviewRequestStatus.Rejected))
        ) {
          const filteredPlans = filteredMap.get(revieweeString) || [];
          filteredMap.set(revieweeString, [...filteredPlans, plan]);
        }
      }
    }
    let filteredArray: RevieweePlans[] = [];
    for (const [k, v] of filteredMap)
      filteredArray.push({ reviewee: JSON.parse(k), plans: v });
    switch (searchSetting) {
      case 'Recently Updated':
        // TODO
        filteredArray.sort((a, b) => 
          -1*getLastUpdatedPlan(a).localeCompare(getLastUpdatedPlan(b)),
        );
        break;
      case 'First Name':
        filteredArray.sort((a, b) =>
          a.reviewee.name.localeCompare(b.reviewee.name),
        );
        break;
      case 'Last Name':
        filteredArray.sort((a, b) =>
          a.reviewee.name
            .split(' ')[1]
            .localeCompare(b.reviewee.name.split(' ')[1]),
        );
        break;
      case 'JHED':
        filteredArray.sort((a, b) =>
          a.reviewee._id.localeCompare(b.reviewee._id),
        );
        break;
      case 'Graduation Year':
        filteredArray.sort(
          (a, b) =>
            years[b.reviewee.grade.split(' ')[2]] -
            years[a.reviewee.grade.split(' ')[2]],
        );
        break;
      default:
    }
    if (reversed) filteredArray = filteredArray.reverse();
    setFiltered(filteredArray || []);
  };

  const debouncedFilter = debounce(filter, 500);

  useEffect(() => {
    debouncedFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchState, searchSetting, reversed]);

  useEffect(() => {
    debouncedFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUnderReview, selectedApproved, selectedRejected]);

  const getSVG = (setting: String) => {
    if (setting !== searchSetting) {
      return 'svg/Circle.svg';
    } else if (reversed) {
      return 'svg/ArrowUp.svg';
    } else {
      return 'svg/ArrowDown.svg';
    }
  };

  return (
    <div className="flex flex-row items-center">
      <input
        className="w-full h-8 px-2 bg-white border border-gray-300 rounded-md outline-none grow"
        placeholder="Search for a reviewee..."
        value={searchState}
        onChange={handleChange}
      />
      <div>
        <DotsVerticalIcon
          className="w-5 h-5 my-1 -ml-6 cursor-pointer"
          onClick={() => setDisplaySettings(!displaySettings)}
        />
        {displaySettings ? (
          <div className="absolute flex w-[350px] p-3 -translate-x-full translate-y-2 bg-white border rounded shadow z-[60]">
            <div className="flex flex-col items-start gap-1 w-[150px] flex-none">
              <div className="font-semibold">Sort By</div>
              {settings.map((setting) => (
                <div
                  key={setting}
                  className="flex gap-1 text-sm cursor-pointer"
                  onClick={() => {
                    if (setting === searchSetting) {
                      setReversed(!reversed);
                    }
                    setSearchSetting(setting);
                  }}
                >
                  <img
                    src={getSVG(setting)}
                    alt="status"
                    className="block w-3 h-3 m-auto tooltip"
                  />
                  <div>
                    <p>{setting}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-start gap-1 grow">
              <div className="font-semibold">Filter By</div>
              <div className="flex flex-wrap gap-1">
                {statusFilter.map((status) => (
                  <Status
                    key={status}
                    status={status}
                    selected={
                      status === ReviewRequestStatus.UnderReview
                        ? selectedUnderReview
                        : status === ReviewRequestStatus.Approved
                        ? selectedApproved
                        : selectedRejected
                    }
                    setSelected={
                      status === ReviewRequestStatus.UnderReview
                        ? setSelectedUnderReview
                        : status === ReviewRequestStatus.Approved
                        ? setSelectedApproved
                        : setSelectedRejected
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export { Search };
