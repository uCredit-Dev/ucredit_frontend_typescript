import { useSelector } from 'react-redux';
import React, { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import { XIcon } from '@heroicons/react/outline';
import { toast } from 'react-toastify';
import { ReviewRequestStatus, User } from '../../../../resources/commonTypes';
import { selectPlan } from '../../../../slices/currentPlanSlice';
import { userService } from '../../../../services';
import { selectToken, selectUser } from '../../../../slices/userSlice';
import * as amplitude from '@amplitude/analytics-browser';

const ReviewerSearchResults: FC<{
  users: User[];
}> = ({ users }) => {
  const currentPlan = useSelector(selectPlan);
  const currentUser = useSelector(selectUser);
  const token = useSelector(selectToken);
  const [planReviewers, setPlanReviewers] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const reviewers = (
        await userService.getPlanReviewers(currentPlan._id, token)
      ).data;
      setPlanReviewers(reviewers);
    })();
  }, [currentPlan._id, token]);

  const isReviewer = (id: string) => {
    for (const { reviewer_id, _id } of planReviewers) {
      if (reviewer_id._id === id) return _id;
    }
    return '';
  };

  const isPending = (id: string) => {
    for (const { reviewer_id, status } of planReviewers) {
      if (reviewer_id._id === id) return status === ReviewRequestStatus.Pending;
    }
    return false;
  };

  const changeReviewer = async (user: User) => {
    const reviewId = isReviewer(user._id);
    if (reviewId) {
      await userService.removeReview(reviewId, token);
      toast.success('Reviewer removed', {
        toastId: 'reviewer removed',
      });
    } else {
      if (!isPending(user._id)) {
        await userService.requestReviewerPlan(
          currentPlan._id,
          user._id,
          currentUser._id,
          token,
        );
        toast.success('Reviewer requested', {
          toastId: 'reviewer requested',
        });
        amplitude.track('Requested Reviewer');
      } else
        toast.error('You have already requested a review from this reviewer', {
          toastId: 'reviewer already requested',
        });
    }
  };

  const getElements = (users: User[]) => {
    return users.map((user) => {
      return (
        <div
          className="flex items-center px-2 hover:bg-sky-300 hover:cursor-pointer"
          onClick={() => changeReviewer(user)}
          key={user._id}
        >
          <XIcon
            className={clsx('w-[1.25rem] my-auto', {
              'opacity-0': !isReviewer(user._id),
            })}
          />
          <p>
            {user.name} - {user._id}
          </p>
        </div>
      );
    });
  };

  return <div>{getElements(users)}</div>;
};

export default ReviewerSearchResults;
