import { useState } from 'react';
import { DotsVerticalIcon, ExclamationIcon } from '@heroicons/react/outline';
import CurrentReviewers from './CurrentReviewers';
import ReviewersSearch from './ReviewersSearch';
import { Hoverable } from '../../../utils/hoverable';

const Reviewers = () => {
  const [addingReviewer, updateAddingReviewer] = useState(false);

  return (
    <div className="flex flex-col mt-3 border-t">
      <div className="flex flex-row items-center justify-between pb-1 mt-2 text-xl font-bold">
        <div className="flex items-center gap-1">
          <p>Reviewers</p>
          {process.env.NODE_ENV === 'development' && (
            <Hoverable
              as={
                <ExclamationIcon className="text-red-400 w-5 h-5 translate-y-[1.5px]" />
              }
            >
              {({ hovered }) =>
                hovered && (
                  <div className="w-[300px] px-2 py-1 text-sm font-normal bg-white/90 border rounded-md shadow-md border-slate-200">
                    It looks like you are in dev mode! You will only be able to
                    add or move the following reviewers: freshmanDev,
                    sophomoreDev, juniorDev, seniorDev
                  </div>
                )
              }
            </Hoverable>
          )}
        </div>
        <DotsVerticalIcon
          className="h-6"
          onClick={() => updateAddingReviewer(!addingReviewer)}
        />
      </div>
      {addingReviewer ? (
        <div className="pt-2">
          <ReviewersSearch />
        </div>
      ) : (
        <CurrentReviewers />
      )}
    </div>
  );
};

export default Reviewers;
