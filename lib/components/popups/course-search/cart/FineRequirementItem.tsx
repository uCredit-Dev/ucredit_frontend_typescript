import { FC } from 'react';
import parse from 'html-react-parser';
import clsx from 'clsx';
import { FineReq } from '../../../../resources/commonTypes';

// TODO : documentation goes here
const FineRequirementListItem: FC<{
  itemRequirement: FineReq;
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
        props.selected ? 'bg-secondary bg-opacity-25' : 'bg-white',
        'mb-2 p-2 w-full h-auto rounded cursor-pointer transition duration-200 ease-in-out',
        {
          'bg-green-100': props.itemRequirement.satisfied,
        },
      )}
      onClick={handleFineReqClick}
    >
      <div className="flex flex-col justify-center w-full h-full">
        <div className="break-normal">{parse(props.itemRequirement.description)}</div>{' '}
        {/* ALL A BIG TODO: WIll have to format this later */}
        <div className="">
          {props.itemRequirement.planned} /{' '}
          {props.itemRequirement.required_credits}
        </div>
      </div>
    </div>
  );
};

export default FineRequirementListItem;
