import { BellIcon, TrashIcon } from '@heroicons/react/outline';
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ReviewRequestStatus } from '../../../../resources/commonTypes';
import { userService } from '../../../../services';
import { selectPlan } from '../../../../slices/currentPlanSlice';
import { selectToken } from '../../../../slices/userSlice';
import { toast } from 'react-toastify';
import { getAPI } from '../../../../resources/assets';
import clsx from 'clsx';

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
        Authorization: `Bearer ${token}`,
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
              toastId: 'plan sent',
            },
          );
        }
      })
      .catch((err) => {
        // Error in /changeStatus call
        toast.error('Plan failed to send to ' + toName + '.', {
          autoClose: 5000,
          closeOnClick: false,
          toastId: 'plan failed to send',
        });
      });
  };

  useEffect(() => {
    (async () => {
      const reviewers = (
        await userService.getPlanReviewers(currentPlan._id, token)
      ).data;
      const elements: JSX.Element[] = await getElements(reviewers);
      setReviewersJSX(elements);
      // dispatch(updateSelectedPlan({ ...currentPlan, reviewers: reviewers }));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userService.getPlanReviewers(currentPlan._id, token), currentPlan._id, token]);

  const removeReviewer = async (id) => {
    const reviewers = (
      await userService.getPlanReviewers(currentPlan._id, token)
    ).data;
    for (const { reviewer_id, _id } of reviewers) {
      if (reviewer_id._id === id) {
        await userService.removeReview(_id, token);
        toast.success('Reviewer removed', {
          toastId: 'reviewer removed',
        });
      }
    }
  };

  const makeOnClickHandler = (reviewee_name, email, name, review_id) => () =>
    sendEmail(name, review_id); // Saves temporal values

  const getElements = async (data: any[]) => {
    const elements: JSX.Element[] = [];
    for (const { reviewer_id, status, reviewee_id, _id } of data) {
      const reviewer = (await userService.getUser(reviewer_id._id, token))
        .data[0];
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
                data-tooltip-id="godtip"
                data-tooltip-content="This reviewer is requesting a review"
              />
            )}
          </div>
          <p className="pl-2 justify-start">{reviewer.name}</p>
          <div
            className={clsx('ml-auto text-sm', {
              'text-black': status === ReviewRequestStatus.Pending,
              'text-emerald-500': status === ReviewRequestStatus.Approved,
              'text-red-500': status === ReviewRequestStatus.Rejected,
              'text-sky-500': status === ReviewRequestStatus.UnderReview,
            })}
          >
            {status === ReviewRequestStatus.Pending
              ? 'Pending'
              : status === ReviewRequestStatus.Approved
              ? 'Approved'
              : status === ReviewRequestStatus.Rejected
              ? 'Rejected'
              : status === ReviewRequestStatus.UnderReview
              ? 'Reviewing'
              : null}
          </div>
          <button className="ml-1">
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
          <button onClick={() => removeReviewer(reviewer._id)}>
            <TrashIcon className="w-5 h-5 stroke-red-500" />
          </button>
        </div>,
      );
    }
    return elements;
  };

  return <div className="flex flex-col">{reviewersJSX}</div>;
};

export default CurrentReviewers;
