import { XIcon } from '@heroicons/react/solid';
import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { allMajors } from '../../../resources/majors';
import { selectSelectedMajor } from '../../../slices/currentPlanSlice';
import { updateInfoPopup } from '../../../slices/popupSlice';
import DistributionBarsJSX from './DistributionBarsJSX';

/**
 * Area in the right hand plan information that shows various elements of degree progression.
 */
const Distributions: FC<{
  userMajors: string[];
  changeDisplayMajor: Function;
}> = ({ userMajors, changeDisplayMajor }) => {
  // Component state setup.
  const [disclaimer, setDisclaimer] = useState<boolean>(true);
  const dispatch = useDispatch();
  const major = useSelector(selectSelectedMajor);

  const majorOptions = userMajors.map((m, index) => ({
    value: index,
    label: m,
  }));

  const getHref = (): string => {
    return major !== null ? major.url : '';
  };

  return (
    <div className="z-50 flex-none p-6 w-96 h-auto bg-white rounded">
      <div className="flex flex-row mb-3 w-full">
        <div className="self-start text-2xl font-medium">Degree Progress</div>
        {/* Degree Progress */}
        <div
          className="h-6 w-6 m-auto mr-0 cursor-pointer"
          onClick={() => dispatch(updateInfoPopup(false))}
        >
          <XIcon />
        </div>
      </div>
      {userMajors.length > 1 && (
        <Select
          options={majorOptions}
          value={majorOptions.find(({ label }) => label === major?.degree_name)}
          onChange={(event) => {
            changeDisplayMajor(event?.label);
          }}
          placeholder="Select Majors"
          className="z-50 w-full"
          hideSelectedOptions
        />
      )}
      <DistributionBarsJSX major={major ? major : allMajors[0]} />
      {disclaimer && (
        <div
          id="dropdown-cta"
          className="p-4 mt-6 bg-blue-50 rounded-lg"
          role="alert"
        >
          <div className="flex items-center mb-3">
            <span className="bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
              Beta
            </span>
            <button
              type="button"
              className="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 inline-flex h-6 w-6"
              data-collapse-toggle="dropdown-cta"
              aria-label="Close"
              onClick={() => setDisclaimer(false)}
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div>
            <p>
              This feature is still being refined. Please report any issues in
              the feedback form.
            </p>
          </div>
          <div className="text-sm mt-4">
            Please double check with the{' '}
            <a
              href={getHref()}
              className="text-blue-900 underline hover:text-blue-800"
              target="_blank"
              rel="noreferrer"
            >
              official advising manual
            </a>{' '}
            and the{' '}
            <a
              href="https://sis.jhu.edu/sswf/"
              className="text-blue-900 underline hover:text-blue-800"
              target="_blank"
              rel="noreferrer"
            >
              SIS degree audit
            </a>
            .
          </div>
        </div>
      )}
    </div>
  );
};

export default Distributions;
