import { FC } from 'react';
import { User } from '../../../../resources/commonTypes';

const ReviewersSearchResults: FC<{
  Users: any[];
}> = ({ Users }) => {
  const isReviewer = (data) => {
    return true;
  };

  const changeReviewer = (data) => {
    console.log('TODO!!');
  };

  const getElements = (data: User[]) => {
    return data.map((element) => {
      return (
        <div
          className="flex flex-row hover:bg-sky-300 hover:hand hover:cursor-pointer"
          onClick={(e) => changeReviewer(element)}
        >
          {isReviewer(element) && (
            <img
              src="svg/CheckMark.svg"
              alt="requesting review"
              className="w-6 mr-2 ml-2"
            />
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
