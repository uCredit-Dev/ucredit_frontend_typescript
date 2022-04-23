import { useState } from 'react';
import { DotsVerticalIcon, ExclamationIcon } from '@heroicons/react/outline';
import CurrentReviewers from './CurrentReviewers';
import ReviewersSearch from './ReviewersSearch';
import { Hoverable, TooltipPrimary } from '../../../utils';
import clsx from 'clsx';

const Reviewers = () => {
  const [addingReviewer, updateAddingReviewer] = useState<Boolean>(false);
  const [show, setShow] = useState<Boolean>(false);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between pb-1 text-xl cursor-pointer  hover:bg-gray-100 rounded p-2">
        <div className="flex items-center gap-1" onClick={() => setShow(!show)}>
          <p className="flex flex-row">
            <svg
              className={clsx('w-6 h-6 mt-1 rotate-180', {
                'rotate-0': show,
              })}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            Reviewers
          </p>
          {process.env.NODE_ENV === 'development' && (
            <Hoverable
              as={
                <ExclamationIcon className="text-red-400 w-5 h-5 translate-y-[1.5px]" />
              }
            >
              {({ hovered }) => {
                return (
                  hovered && (
                    <TooltipPrimary width={300}>
                      It looks like you are in dev mode! You will only be able
                      to add or move the following reviewers: freshmanDev,
                      sophomoreDev, juniorDev, seniorDev
                    </TooltipPrimary>
                  )
                );
              }}
            </Hoverable>
          )}
        </div>
        <DotsVerticalIcon
          className="h-6"
          onClick={() => {
            updateAddingReviewer(!addingReviewer);
            setShow(true);
          }}
        />
      </div>
      {show && (
        <>
          {addingReviewer ? (
            <div className="pt-2">
              <ReviewersSearch />
            </div>
          ) : (
            <CurrentReviewers />
          )}
        </>
      )}
    </div>
  );
};

export default Reviewers;
