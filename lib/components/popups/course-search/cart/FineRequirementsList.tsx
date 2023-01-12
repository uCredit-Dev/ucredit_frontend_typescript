import React, { useState, FC } from 'react';
import FineRequirementListItem from './FineRequirementItem';
import {
  UserDistribution,
  UserFineReq,
} from '../../../../resources/commonTypes';

const FineRequirementsList: FC<{
  searching: boolean;
  selectRequirement: Function;
  selectedDistribution: UserDistribution;
}> = (props) => {
  // Component state setup.
  const [hideResults, setHideResults] = useState<boolean>(false);
  const [selectedListItem, setSelectedListItem] = useState<string>('');

  const selectRequirement = (requirement: UserFineReq, i: number) => {
    props.selectRequirement(requirement);
    setSelectedListItem(requirement._id);
  };

  const getRequirements = () => {
    return props.selectedDistribution.fineReq_ids.map((fine) => {
      return (
        <div key={fine._id}>
          <FineRequirementListItem
            id={fine._id}
            itemRequirement={fine}
            onClick={selectRequirement}
            selected={fine._id === selectedListItem}
          />
        </div>
      );
    });
  };

  /**
   * Returns results button text
   */
  const getResultsButtonText = () => (
    <>{!hideResults ? 'Hide Results' : 'Show Results'}</>
  );

  return (
    <>
      <div
        className="flex flex-row items-center justify-between mb-3 px-5 py-2 w-full h-12 bg-gray-200 border-b border-gray-400"
        data-tip="Hide Search Results"
      >
        <div className="flex flex-row">
          <div className="text-lg font-semibold">Fine Requirements List</div>{' '}
          {window.innerWidth < 800 && (
            <button
              className="ml-2 focus:outline-none"
              onClick={() => setHideResults(!hideResults)}
            >
              {getResultsButtonText()}
            </button>
          )}
        </div>
      </div>
      {(!hideResults || window.innerWidth > 700) && (
        <div className="py px-5 w-full bg-gray-200 select-none">
          <div className="w-full h-full">
            <div className="y-full flex flex-col w-full">
              {/* This is where list items go */}
              {getRequirements()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FineRequirementsList;
