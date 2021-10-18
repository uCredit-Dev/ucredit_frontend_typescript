import { FC } from "react";

/**
 * Popup for when user presses button to override prereq.
 * @prop courseName - name of the course you are overriding prereqs for
 * @prop cleanup - state resets and cleanups after updating prereq overrides
 * @prop save - saves the prereq overrides
 */
const OverridePrereqpopup: FC<{
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
    <div className="fixed z-40 inset-1/2 w-96 h-80 overflow-auto transform -translate-x-2/4 -translate-y-1/2">
      <div className="p-3 text-center font-bold bg-gray-50 rounded-t-lg shadow">
        <h1>
          Override warning that prerequisites for {courseName} is not satisfied?
        </h1>
        <h1>Warning: cannot be undone.</h1>
      </div>
      <div className="flex justify-evenly p-2 pb-3 pt-5 bg-gray-50 rounded-b-lg shadow-md">
        <div
          className="p-2 bg-red-300 rounded-lg transform hover:scale-105 transition duration-200 ease-in"
          onClick={cleanup}
        >
          Cancel
        </div>
        <div
          className="p-2 bg-green-300 rounded-lg transform hover:scale-105 transition duration-200 ease-in"
          onClick={onSaveClick}
        >
          Confirm
        </div>
      </div>
    </div>
  );
};

export default OverridePrereqpopup;
