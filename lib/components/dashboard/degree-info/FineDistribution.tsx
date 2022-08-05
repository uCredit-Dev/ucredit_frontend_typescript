import clsx from 'clsx';
import { useState, useEffect, FC } from 'react';
import { useSelector } from 'react-redux';
import { CheckIcon, XIcon } from '@heroicons/react/outline';
import parse from 'html-react-parser';
import { UserFineReq } from '../../../resources/commonTypes';

/**
 * Component that displays fine requirements of a specific distribution.
 * @prop dis - general distribution fine distribution is for.
 * @prop distributionOpen - whether this distribution bar is open or not.
 */
const FineDistribution: FC<{
  dis: UserFineReq;
  openSignal: boolean;
}> = ({ dis, openSignal }) => {
  const [showDistrDesc, setShowDistrDesc] = useState<boolean>(true);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
    } else {
      setShowDistrDesc(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openSignal]);

  return (
    <div key={dis.description} className={clsx('flex justify-between w-full')}>
      <button
        onClick={() => setShowDistrDesc(!showDistrDesc)}
        className="flex w-full h-auto pr-2 mb-1 overflow-hidden text-left transition duration-200 ease-in transform focus:outline-none hover:scale-101 overflow-ellipsis"
      >
        <div>
          {plannedCredits >= dis.required_credits ? (
            <CheckIcon fill="green" />
          ) : (
            <XIcon stroke="red" />
          )}
        </div>
        <div
          className={clsx('pr-2', {
            'overflow-y-hidden h-6 select-text': !showDistrDesc,
          })}
        >
          {parse(dis.description)}
        </div>
      </button>
      <div className="font-bold">
        {dis.planned}/{dis.required_credits}
      </div>
    </div>
  );
};

export default FineDistribution;
