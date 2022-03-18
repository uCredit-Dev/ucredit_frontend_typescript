import axios from 'axios';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAPI } from '../../../../resources/assets';
import { User } from '../../../../resources/commonTypes';
import {
  selectPlan,
  updateSelectedPlan,
} from '../../../../slices/currentPlanSlice';
import emailjs from 'emailjs-com';
emailjs.init('user_7Cn3A3FQW9PTxExf6Npel');

const ReviewersSearchResults: FC<{
  Users: any[];
}> = ({ Users }) => {
  const dispatch = useDispatch();
  const currentPlan = useSelector(selectPlan);

  const isReviewer = (id) => {
    return currentPlan.reviewers.includes(id);
  };

  const isPending = (id) => {
    return !(
      id === 'sophomoreDev' ||
      id === 'freshmanDev' ||
      id === 'juniorDev' ||
      id === 'seniorDev'
    );
  };

  const changeReviewer = async (user: User) => {
    const body = {
      plan_id: currentPlan._id,
      reviewer_id: user._id,
    };
    let plan;
    if (isReviewer(user._id)) {
      plan = await axios.delete(getAPI(window) + '/planReview/removeReviewer', {
        data: body,
      });
    } else {
      if (!isPending(user._id)) {
        plan = await axios.post(
          getAPI(window) + '/planReview/addReviewer',
          body,
        );
        emailjs.send('service_czbc7ct', 'template_9g4knbk', {
          from_name: currentPlan.name,
          to_jhed: user._id,
          to_name: user._id, // replace with name
          to_email: user.email,
          url: 'https://google.com', // TODO
        });
      } else {
        // TODO
      }
    }
    dispatch(
      updateSelectedPlan({
        ...currentPlan,
        reviewers: plan.data.data.reviewers,
      }),
    );
  };

  const getElements = (data: User[]) => {
    console.log(data);
    return data.map((element) => {
      return (
        <div
          className="flex flex-row hover:bg-sky-300 hover:hand hover:cursor-pointer"
          onClick={(e) => changeReviewer(element)}
          key={element._id}
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
