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
import { requirements } from "../../../dashboard/degree-info/distributionFunctions";

/**
 * A course card in the search list.
 * @prop course - the course being displayed.
 */

const FineRequirementListItem: FC<{
  itemRequirement: requirements,
  onClick: Function,
}> = (props) => {
  // Setup Redux
  const dispatch = useDispatch();
  const selectedCourse = useSelector(selectVersion);

  const handleCourseClick = () => {
    props.onClick(props.itemRequirement);
    console.log(props.itemRequirement);
  };

  return (
    <div
      className={clsx(
        {
          // removed selection logic for now. readd later?
        },
        "mb-2 p-2 w-full h-14 bg-white rounded hover:shadow cursor-pointer transition duration-200 ease-in-out"
      )}
      onClick={handleCourseClick}
    >
      <div className="flex flex-col justify-center w-full h-full">
        <div className="truncate">{props.itemRequirement.expr}</div> {/* ALL A BIG TODO: WIll have to format this later */}
        <div>
          {props.itemRequirement.fulfilled_credits} / {props.itemRequirement.required_credits}
        </div>
      </div>
    </div>
  );
};

export default FineRequirementListItem;