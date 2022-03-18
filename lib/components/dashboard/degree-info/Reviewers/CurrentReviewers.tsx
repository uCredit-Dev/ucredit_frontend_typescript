import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { userService } from '../../../../services';
import { selectPlan } from '../../../../slices/currentPlanSlice';

const CurrentReviewers = () => {
  const currentPlan = useSelector(selectPlan);
  const [jsx, setJsx] = useState([]);

  useEffect(() => {
    (async () => {
      setJsx(await getElements(currentPlan.reviewers));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlan.reviewers]);

  const getSVG = (status: string) => {
    if (status === 'pending') {
      return (
        <img
          src={'svg/Check.svg'}
          alt="status"
          className="block h-4 m-auto mt-1 tooltip"
          data-tip="Pending"
        />
      );
    } else if (status === 'approved') {
      return (
        <img
          src={'svg/Checkmark.svg'}
          alt="status"
          className="tooltip"
          data-tip="Approved"
        />
      );
    }
  };

  const getElements = async (data: string[]) => {
    const elements = [];
    for (const reviewer_id of data) {
      const { _id, name } = (await userService.getUser(reviewer_id)).data[0];
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
            <div className="w-6 h-6">
              {
                getSVG('approved') // pending?
              }
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
