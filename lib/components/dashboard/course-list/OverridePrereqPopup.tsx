import React from 'react';
import { FC } from 'react';

/**
 * Popup for when user presses button to override prereq.
 * @prop courseName - name of the course you are overriding prereqs for
 * @prop cleanup - state resets and cleanups after updating prereq overrides
 * @prop save - saves the prereq overrides
 */
const OverridePrereqPopup: FC<{
  courseName: string;
  cleanup: () => void;
  save: () => void;
}> = ({ courseName, cleanup, save }) => {
  /**
   * Saves overriding prereqs, then cleans up state changes.
   */
  const onSaveClick = () => {
    save();
    cleanup();
  };
  return (
    <div className="absolute z-40 h-auto transform">
      <div className="p-3 w-full text-center font-bold bg-gray-50 rounded shadow">
        <h1>
          Override warning that prerequisites for {courseName} is not satisfied?
        </h1>
        <h1>Warning: cannot be undone.</h1>
      </div>
      <div className="flex justify-evenly p-2 pb-3 pt-5 w-96 bg-gray-50 rounded-b-lg shadow-md">
        <div
          className="mr-2 p-2 bg-red-300 rounded-lg transform hover:scale-105 transition duration-200 ease-in"
          onClick={cleanup}
        >
          Cancel
        </div>
        <div
          className="p-2 bg-primary rounded-lg transform hover:scale-105 transition duration-200 ease-in"
          onClick={onSaveClick}
        >
          Confirm
        </div>
      </div>
    </div>
  );
};

export default OverridePrereqPopup;
