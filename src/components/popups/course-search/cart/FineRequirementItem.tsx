import { FC } from "react";
import { SISRetrievedCourse, Course } from "../../../../resources/commonTypes";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePlaceholder,
  selectVersion,
  updateInspectedCourse,
  updateInspectedVersion,
} from "../../../../slices/searchSlice";
import clsx from "clsx";
import { requirement } from "./dummies";

/**
 * A course card in the search list.
 * @prop course - the course being displayed.
 */

const FineRequirementListItem: FC<{
  itemRequirement: requirement,
  onClick: Function,
}> = (props) => {
  // Setup Redux
  const dispatch = useDispatch();
  const selectedCourse = useSelector(selectVersion);

  const handleCourseClick = () => {
    props.onClick(props.itemRequirement);
  };

  return (
    <div
      className={clsx(
        {
          
        },
        "mb-2 p-2 w-full h-14 bg-white rounded hover:shadow cursor-pointer transition duration-200 ease-in-out"
      )}
      onClick={handleCourseClick}
    >
      <div className="flex flex-col justify-center w-full h-full">
        <div className="truncate">{props.itemRequirement.title}</div>
        <div>
          {props.itemRequirement.description}
        </div>
      </div>
    </div>
  );
};

export default FineRequirementListItem;