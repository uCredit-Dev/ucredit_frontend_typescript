import React, { useState } from 'react';
import { ExclamationIcon } from '@heroicons/react/outline';
import CurrentReviewers from './CurrentReviewers';
import ReviewersSearch from './ReviewersSearch';
import { Hoverable, TooltipPrimary } from '../../../utils';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';

const Reviewers = () => {
  const [addingReviewer, updateAddingReviewer] = useState<Boolean>(false);
  const [reviewersJSX, setReviewersJSX] = useState<JSX.Element[]>([]);

  return (
    <div className="flex flex-col min-w-[16rem] mx-2">
      <div className="flex flex-row items-center justify-between pb-1 text-xl cursor-pointer rounded p-2">
        <div className="flex items-center gap-1">
          <Tooltip
            title="Click on Edit button to add or remove reviewers."
            placement="left"
            arrow
          >
            <p className="flex flex-row h-full">Add Reviewer</p>
          </Tooltip>
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
          onClick={() => updateAddingReviewer(!addingReviewer)}
        >
          {addingReviewer ? 'View' : 'Edit'}
        </div>
      </div>
      <Divider />
      {addingReviewer ? (
        <div className="pt-2">
          <ReviewersSearch />
        </div>
      ) : (
        <div className="px-2">
          <CurrentReviewers
            reviewersJSX={reviewersJSX}
            setReviewersJSX={setReviewersJSX}
          />
        </div>
      )}
    </div>
  );
};

export default Reviewers;
