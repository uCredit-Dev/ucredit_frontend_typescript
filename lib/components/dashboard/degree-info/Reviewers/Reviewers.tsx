import { DotsVerticalIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import CurrentReviewers from './CurrentReviewers';
import ReviewersSearch from './ReviewersSearch';

const Reviewers = () => {
  const [addingReviewer, updateAddingReviewer] = useState(false);

  return (
    <div className="flex flex-col ml-1 mt-3 border-t">
      <div className="flex flex-row justify-between items-center pl-1 pb-1 mt-2 font-bold text-xl">
        <p>Reviewers</p>
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
