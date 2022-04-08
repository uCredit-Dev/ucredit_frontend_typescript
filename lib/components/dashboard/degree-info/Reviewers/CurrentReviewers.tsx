import { CheckIcon, BellIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { ReviewRequestStatus } from '../../../../resources/commonTypes';
import { userService } from '../../../../services';
import { selectPlan } from '../../../../slices/currentPlanSlice';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
import { getAPI } from '../../../../resources/assets';

const CurrentReviewers = () => {
  const currentPlan = useSelector(selectPlan);
  const [jsx, setJsx] = useState([]);

  const sendEmail = (fromName, toEmail, toName, reviewID) => {
    var form = {
      from_name: fromName,
      to_email: toEmail,
      to_name: toName,
    };

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
          // Status successfully changed to UNDERREVIEW
          emailjs
            .send(
              'service_cami1cj',
              'template_kilkjhv',
              form,
              'OYZ6l2hEt-shlZ7K1',
            )
            .then((result) => {
              toast.success(
                'Plan successfully sent to ' + toName + ' for review!',
                {
                  autoClose: 5000,
                  closeOnClick: false,
                },
              );
            });
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
      const reviewers = (await userService.getPlanReviewers(currentPlan._id))
        .data;
      setJsx(await getElements(reviewers));
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
    } else if (
      status === ReviewRequestStatus.Accepted ||
      status === ReviewRequestStatus.UnderReview
    ) {
      return <CheckIcon className="w-5 h-5 tooltip" data-tip="Accepted" />;
    }
  };

  const makeOnClickHandler = (reviewee_name, email, name, review_id) => () =>
    sendEmail(reviewee_name, email, name, review_id); // Saves temporal values

  const getElements = async (data: any[]) => {
    const elements = [];
    for (const { reviewer_id, status, reviewee_id, _id } of data) {
      const reviewer = (await userService.getUser(reviewer_id._id)).data[0];
      const reviewee = (await userService.getUser(reviewee_id)).data[0];
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
          <button className="ml-auto">
            {' '}
            <BellIcon
              className="h-5"
              onClick={makeOnClickHandler(
                reviewee.name,
                reviewer.email,
                reviewer.name,
                _id,
              )}
            >
              {' '}
            </BellIcon>{' '}
          </button>
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
