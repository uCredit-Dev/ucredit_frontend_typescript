import { CheckIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { ReviewRequestStatus } from '../../../../resources/commonTypes';
import { userService } from '../../../../services';
import {
  selectPlan,
  updateSelectedPlan,
} from '../../../../slices/currentPlanSlice';

const CurrentReviewers = () => {
  const dispatch = useDispatch();
  const currentPlan = useSelector(selectPlan);
  const [jsx, setJsx] = useState([]);

  useEffect(() => {
    (async () => {
      const reviewers = (await userService.getPlanReviewers(currentPlan._id))
        .data;
      setJsx(await getElements(reviewers));
      // dispatch(updateSelectedPlan({ ...currentPlan, reviewers: reviewers }));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlan.reviewers]);

  const getSVG = (status: string) => {
    if (status === ReviewRequestStatus.Pending) {
      return (
        <div
          className="w-3 h-3 bg-black rounded-full tooltip"
          data-tip="Pending"
        />
      );
    } else if (status === ReviewRequestStatus.Approved) {
      return <CheckIcon className="w-5 h-5 tooltip" data-tip="Accepted" />;
    }
  };

  const getElements = async (data: any[]) => {
    const elements = [];
    for (const { reviewer_id, status } of data) {
      const { _id, name } = (await userService.getUser(reviewer_id._id))
        .data[0];
      elements.push(
        <div
          className="flex flex-row items-center justify-between pt-2"
          key={_id}
        >
          <p>{name}</p>
          <div className="flex flex-row">
            {false && ( // requesting
              <img
                src="svg/CircularArrow.svg"
                alt="requesting review"
                className="h-3 w-3 mt-1.5 mr-1 tooltip"
                data-tip="This reviewer is requesting a review"
              />
            )}
            <div className="flex items-center justify-center w-6 h-6">
              {getSVG(status)}
            </div>
          </div>
        </div>,
      );
    }
    return elements;
  };

  return (
    <div className="flex flex-col border-b">
      {jsx}
      <ReactTooltip delayShow={200} />
    </div>
  );
};

export default CurrentReviewers;
