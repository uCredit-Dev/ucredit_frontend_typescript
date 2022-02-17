import { FC } from 'react';
import parse from 'html-react-parser';
import clsx from 'clsx';
import { requirements } from '../../../dashboard/degree-info/distributionFunctions';

// TODO : documentation goes here
const FineRequirementListItem: FC<{
  itemRequirement: requirements;
  onClick: Function;
  selected?: boolean;
  id: number;
}> = (props) => {
  // Setup Redux

  const handleFineReqClick = () => {
    props.onClick(props.itemRequirement, props.id);
    console.log(props.itemRequirement);
  };

  return (
    <div
      className={clsx(
        props.selected ? 'bg-secondary bg-opacity-25' : 'bg-white',
        'mb-2 p-2 w-full h-auto rounded hover:shadow cursor-pointer transition duration-200 ease-in-out',
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
