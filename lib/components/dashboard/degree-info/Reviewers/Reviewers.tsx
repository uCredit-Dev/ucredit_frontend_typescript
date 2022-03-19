import { DotsVerticalIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { getAPI } from '../../../../resources/assets';
import CurrentReviewers from './CurrentReviewers';
import ReviewersSearch from './ReviewersSearch';

const Reviewers = () => {
  const [addingReviewer, updateAddingReviewer] = useState(false);

  return (
    <div className="flex flex-col mt-3 border-t">
      <div className="flex flex-row justify-between items-center pb-1 mt-2 font-bold text-xl">
        <p>Reviewers</p>
        <DotsVerticalIcon
          className="h-6"
          onClick={() => updateAddingReviewer(!addingReviewer)}
        />
      </div>
      {getAPI(window).includes('localhost')
        ? '*It looks like you are in dev mode! You will only be able to add or move the following reviewers: freshmanDev, sophomoreDev, juniorDev, seniorDev'
        : null}
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