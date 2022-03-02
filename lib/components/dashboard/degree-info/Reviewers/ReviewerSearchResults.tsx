import axios from 'axios';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../../../resources/assets';
import { User } from '../../../../resources/commonTypes';
import {
  selectPlan,
  updateSelectedPlan,
} from '../../../../slices/currentPlanSlice';
import { post } from '../../../../utils/fetchWrapper';

const ReviewersSearchResults: FC<{
  Users: any[];
}> = ({ Users }) => {
  const dispatch = useDispatch();
  const currentPlan = useSelector(selectPlan);

  const isReviewer = (id) => {
    return currentPlan.reviewers.includes(id);
  };

  const changeReviewer = async (id) => {
    const body = {
      plan_id: currentPlan._id,
      reviewer_id: id,
    };
    let plan;
    if (isReviewer(id)) {
      plan = await axios.delete(api + '/planReview/removeReviewer', {
        data: body,
      });
    } else {
      plan = await axios.post(api + '/planReview/addReviewer', body);
    }
    dispatch(
      updateSelectedPlan({
        ...currentPlan,
        reviewers: plan.data.data.reviewers,
      }),
    );
  };

  const getElements = (data: User[]) => {
    return data.map((element) => {
      return (
        <div
          className="flex flex-row hover:bg-sky-300 hover:hand hover:cursor-pointer"
          onClick={(e) => changeReviewer(element._id)}
        >
          {isReviewer(element._id) ? (
            <img
              src="svg/CheckMark.svg"
              alt="requesting review"
              className="w-6 mr-2 ml-2"
            />
          ) : (
            <div className="w-6 mr-2 ml-2" />
          )}
          <p>
            {element.name} - {element._id}
          </p>
        </div>
      );
    });
  };

  return <div className="border-t pb-2">{getElements(Users)}</div>;
};

export default ReviewersSearchResults;
