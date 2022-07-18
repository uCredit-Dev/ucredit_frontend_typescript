import React, { useState } from 'react';
import { ExclamationIcon } from '@heroicons/react/outline';
import CurrentReviewers from './CurrentReviewers';
import ReviewersSearch from './ReviewersSearch';
import { Hoverable, TooltipPrimary } from '../../../utils';
import clsx from 'clsx';

const Reviewers = () => {
  const [addingReviewer, updateAddingReviewer] = useState<Boolean>(false);
  const [show, setShow] = useState<Boolean>(false);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between pb-1 text-xl cursor-pointer rounded p-2">
        <div className="flex items-center gap-1" onClick={() => setShow(!show)}>
          <p className="flex flex-row h-full">
            <svg
              className={clsx('w-6 h-6 rotate-180 my-auto', {
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
              as={<ExclamationIcon className="text-red-400 w-5 h-5 relative" />}
            >
              {({ hovered }) => {
                return (
                  <>
                    {hovered && (
                      <div className="absolute -left-[108rem] -top-[6rem]">
                        <TooltipPrimary width={200}>
                          It looks like you are in dev mode! You will only be
                          able to add or move the following reviewers:
                          freshmanDev, sophomoreDev, juniorDev, seniorDev
                        </TooltipPrimary>
                      </div>
                    )}
                  </>
                );
              }}
            </Hoverable>
          )}
        </div>
        <div
          className="text-sm add-reviewer-button mr-1 underline"
          onClick={() => {
            updateAddingReviewer(!addingReviewer);
            setShow(true);
          }}
        >
          {addingReviewer ? 'View' : 'Edit'}
        </div>
      </div>
      {show && (
        <>
          {addingReviewer ? (
            <div className="pt-2">
              <ReviewersSearch />
            </div>
          ) : (
            <div className="px-2">
              <CurrentReviewers />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Reviewers;
