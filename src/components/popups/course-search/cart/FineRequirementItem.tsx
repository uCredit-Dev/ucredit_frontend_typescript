import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import parse from 'html-react-parser';
import clsx from 'clsx';
import { requirements } from '../../../dashboard/degree-info/distributionFunctions';
import { emptyRequirements } from './dummies';

/**
 * A course card in the search list.
 * @prop course - the course being displayed.
 */

const FineRequirementListItem: FC<{
  itemRequirement: requirements,
  onClick: Function,
  selected?: boolean,
  id: number,
}> = (props) => {
  // Setup Redux
  const dispatch = useDispatch();

  const handleCourseClick = () => {
    props.onClick(props.itemRequirement, props.id);
    console.log(props.itemRequirement);
  };

  return (
    <div
      className={clsx(
        props.selected ? "bg-secondary bg-opacity-25" : "bg-white",
        "mb-2 p-2 w-full h-auto rounded hover:shadow cursor-pointer transition duration-200 ease-in-out"
      )}
      onClick={handleCourseClick}
    >
      <div className="flex flex-col justify-center w-full h-full">
        <div className="break-normal">
          {parse(props.itemRequirement.name)}
        </div> {/* ALL A BIG TODO: WIll have to format this later */}
        <div className="">
          {props.itemRequirement.fulfilled_credits} / {props.itemRequirement.required_credits}
        </div>
      </div>
    </div>
  );
};

// For fine requirements with pathing options, provides a dropdown menu
// TODO : not in use yet. Where should the dropdown menu be? Selectable from the coures bars?
export const FineRequirementListFocusItem: FC<{ // TODO : fix exports from default to two files
  focusRequirements: requirements[],
  onClick: Function,
}> = (props) => {
  // Setup Redux
  const [selectedFocusRequirement, setSelectedFocusRequirement] = useState<requirements>(emptyRequirements);

  const handleCourseClick = () => {
    props.onClick(selectedFocusRequirement);
    console.log(selectedFocusRequirement);
  };

  return (
    <div
      className={clsx(
        {
          // TODO : selection logic
        },
        "mb-2 p-2 w-full h-auto bg-white rounded hover:shadow cursor-pointer transition duration-200 ease-in-out"
      )}
      onClick={handleCourseClick}
    >
      <div className="flex flex-col justify-center w-full h-full">
        <div className="break-normal">
          {/* {props.itemRequirement.expr} */}
          {parse(selectedFocusRequirement.name)}
        </div> {/* ALL A BIG TODO: WIll have to format this later */}

        <div>
          {selectedFocusRequirement.fulfilled_credits} / {selectedFocusRequirement.required_credits}
        </div>
      </div>
    </div>
  );
};

export default FineRequirementListItem;