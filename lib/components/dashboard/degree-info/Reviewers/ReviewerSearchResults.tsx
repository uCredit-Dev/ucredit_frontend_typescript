import axios from 'axios';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../../../resources/assets';
import { User } from '../../../../resources/commonTypes';
import {
  selectPlan,
  updateSelectedPlan,
} from '../../../../slices/currentPlanSlice';
import emailjs from 'emailjs-com';
import { userService } from '../../../../services';
import { selectUser } from '../../../../slices/userSlice';
emailjs.init('user_7Cn3A3FQW9PTxExf6Npel');

const ReviewersSearchResults: FC<{
  Users: any[];
}> = ({ Users }) => {
  const dispatch = useDispatch();
  const currentPlan = useSelector(selectPlan);
  const currentUser = useSelector(selectUser);

  const isReviewer = (id) => {
    return currentPlan.reviewers.includes(id);
  };

  const isPending = (id) => {
    return false;
    return !(
      id === 'sophomoreDev' ||
      id === 'freshmanDev' ||
      id === 'juniorDev' ||
      id === 'seniorDev'
    );
  };

  const changeReviewer = async (user: User) => {
    if (isReviewer(user._id)) userService.removeReview(currentPlan._id);
    else {
      if (!isPending(user._id)) {
        console.log(currentPlan);
        const review = (
          await userService.requestReviewerPlan(
            currentPlan._id,
            user._id,
            currentUser._id,
          )
        ).data;
        emailjs.send('service_czbc7ct', 'template_9g4knbk', {
          from_name: currentPlan.name,
          to_jhed: user._id,
          to_name: user._id, // replace with name
          to_email: user.email,
          url: `http://localhost:3000/reviewer/${review._id}`, // TODO
        });
      } else {
        // TODO
      }
    }
    // dispatch(
    //   updateSelectedPlan({
    //     ...currentPlan,
    //     reviewers: plan.data.data.reviewers,
    //   }),
    // );
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
              className="w-6 ml-2 mr-2"
            />
          ) : (
            <div className="w-6 ml-2 mr-2" />
          )}
          <p>
            {element.name} - {element._id}
          </p>
        </div>
      );
    });
  };

  return <div className="pb-2 border-t">{getElements(Users)}</div>;
};

export default ReviewersSearchResults;
