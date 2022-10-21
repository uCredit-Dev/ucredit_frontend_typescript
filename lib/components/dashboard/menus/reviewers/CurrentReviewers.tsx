import { CheckIcon, BellIcon } from '@heroicons/react/outline';
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { ReviewRequestStatus } from '../../../../resources/commonTypes';
import { userService } from '../../../../services';
import { selectPlan } from '../../../../slices/currentPlanSlice';
import { toast } from 'react-toastify';
import { getAPI } from '../../../../resources/assets';
import clsx from 'clsx';
import { selectToken } from '../../../../slices/userSlice';

const CurrentReviewers: FC<{
  reviewersJSX: JSX.Element[];
  setReviewersJSX: (newJSX: JSX.Element[]) => void;
}> = ({ reviewersJSX, setReviewersJSX }) => {
  const currentPlan = useSelector(selectPlan);
  const token = useSelector(selectToken);

  const sendEmail = (toName, reviewID) => {
    const body = {
      review_id: reviewID,
      status: 'UNDERREVIEW',
    };

    fetch(getAPI(window) + '/planReview/changeStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success(
            'Plan successfully sent to ' + toName + ' for review!',
            {
              autoClose: 5000,
              closeOnClick: false,
            },
          );
        }
      })
      .catch((err) => {
        // Error in /changeStatus call
        toast.error('Plan failed to send to ' + toName + '.', {
          autoClose: 5000,
          closeOnClick: false,
        });
      });
  };

  useEffect(() => {
    (async () => {
      const reviewers = (await userService.getPlanReviewers(currentPlan._id, token))
        .data;
      const elements: JSX.Element[] = await getElements(reviewers);
      setReviewersJSX(elements);
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
    } else if (status !== ReviewRequestStatus.Pending) {
      return <CheckIcon className="w-5 h-5 tooltip" data-tip="Accepted" />;
    }
  };

  const makeOnClickHandler = (reviewee_name, email, name, review_id) => () =>
    sendEmail(name, review_id); // Saves temporal values

  const getElements = async (data: any[]) => {
    const elements: JSX.Element[] = [];
    for (const { reviewer_id, status, reviewee_id, _id } of data) {
      const reviewer = (await userService.getUser(reviewer_id._id, token)).data[0];
      const reviewee = (await userService.getUser(reviewee_id, token)).data[0];
      elements.push(
        <div
          className="flex flex-row items-center space-between pt-2"
          key={reviewer._id}
        >
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
          <p className="pl-2 justify-start">{reviewer.name}</p>
          {status !== ReviewRequestStatus.Pending && (
            <div
              className={clsx('ml-1 text-sm', {
                'text-sky-500': status === ReviewRequestStatus.UnderReview,
                'text-emerald-500': status === ReviewRequestStatus.Approved,
                'text-red-500': status === ReviewRequestStatus.Rejected,
              })}
            >
              {status === ReviewRequestStatus.Approved
                ? 'Approved'
                : status === ReviewRequestStatus.Rejected
                ? 'Rejected'
                : status === ReviewRequestStatus.UnderReview
                ? 'Reviewing'
                : null}
            </div>
          )}
          {status !== 'PENDING' ? (
            <button className="ml-auto">
              <BellIcon
                className="h-5"
                onClick={makeOnClickHandler(
                  reviewee.name,
                  reviewer.email,
                  reviewer.name,
                  _id,
                )}
              ></BellIcon>
            </button>
          ) : null}
        </div>,
      );
    }
    return elements;
  };

  return (
    <div className="flex flex-col">
      {reviewersJSX}
      <ReactTooltip delayShow={200} />
    </div>
  );
};

export default CurrentReviewers;
