import React, { useState } from 'react';
import { ExclamationIcon } from '@heroicons/react/outline';
import CurrentReviewers from './CurrentReviewers';
import ReviewersSearch from './ReviewersSearch';
import { Hoverable, TooltipPrimary } from '../../../utils';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import { Typography } from '@mui/material';

const Reviewers = () => {
  const [reviewersJSX, setReviewersJSX] = useState<JSX.Element[]>([]);

  return (
    <div className="flex flex-col min-w-[28rem] mx-2">
      <div className="flex flex-row items-center justify-between pb-1 text-xl cursor-pointer rounded p-5">
        <div className="flex items-center gap-1">
          <p className="flex flex-row h-full">Share Your Plan</p>
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
      </div>
      <div className="pt-2">
        <ReviewersSearch />
      </div>
      <div className="px-5">
        <CurrentReviewers
          reviewersJSX={reviewersJSX}
          setReviewersJSX={setReviewersJSX}
        />
      </div>
      <Divider>OR</Divider>
    </div>
  );
};

export default Reviewers;
