import React, { FC } from 'react';
import parse from 'html-react-parser';
import clsx from 'clsx';
import { requirements } from '../../../dashboard/degree-info/distributionFunctions';

/**
 * This component represents a single fine requirement item within the FineRequirementsList.
 * @prop itemRequirement - An object containing information about the fine requirement.
 * @prop onClick - A function to call when the fine requirement item is clicked, which will update the currently selected requirement.
 * @prop selected - Optional boolean indicating whether the fine requirement is currently selected.
 * @prop id - The ID of the fine requirement item.
 */
const FineRequirementListItem: FC<{
  itemRequirement: requirements;
  onClick: Function;
  selected?: boolean;
  id: number;
}> = (props) => {
  // Setup Redux

  const handleFineReqClick = () => {
    props.onClick(props.itemRequirement, props.id);
  };

  return (
    <div
      className={clsx(
        props.selected
          ? 'bg-secondary bg-opacity-25'
          : props.itemRequirement.required_credits > 0 &&
              props.itemRequirement.fulfilled_credits > 0 &&
              props.itemRequirement.fulfilled_credits >=
                props.itemRequirement.required_credits
            ? 'bg-green-100'
            : 'bg-white',
        'mb-2 p-2 w-full h-auto rounded cursor-pointer transition duration-200 ease-in-out',
      )}
      onClick={handleFineReqClick}
    >
      <div className="flex flex-col justify-center w-full h-full">
        <div className="break-normal">{parse(props.itemRequirement.name)}</div>{' '}
        {/* ALL A BIG TODO: WIll have to format this later */}
        <div className="">
          {props.itemRequirement.fulfilled_credits} /{' '}
          {props.itemRequirement.required_credits}
        </div>
      </div>
    </div>
  );
};

export default FineRequirementListItem;
