import React, { FC } from 'react';
import parse from 'html-react-parser';
import clsx from 'clsx';
import { UserFineReq } from '../../../../resources/commonTypes';

// TODO : documentation goes here
const FineRequirementListItem: FC<{
  itemRequirement: UserFineReq;
  onClick: Function;
  selected?: boolean;
}> = ({ itemRequirement, onClick, selected }) => {
  // Setup Redux

  const handleFineReqClick = () => {
    onClick(itemRequirement);
  };

  return (
    <div
      className={clsx(
        selected ? 'bg-secondary bg-opacity-25' : 'bg-white',
        'mb-2 p-2 w-full h-auto rounded cursor-pointer transition duration-200 ease-in-out',
        {
          'bg-green-100': itemRequirement.satisfied,
        },
      )}
      onClick={handleFineReqClick}
    >
      <div className="flex flex-col justify-center w-full h-full">
        <div className="break-normal">{parse(itemRequirement.description)}</div>{' '}
        {/* ALL A BIG TODO: WIll have to format this later */}
        <div className="">
          {itemRequirement.planned} / {itemRequirement.required_credits}
        </div>
      </div>
    </div>
  );
};

export default FineRequirementListItem;
