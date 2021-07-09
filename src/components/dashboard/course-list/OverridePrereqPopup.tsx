import React, { useState } from 'react';



type PopupType = {
  courseName: string;
  cleanup: () => void;
  save: () => void;
}

function OverridePrereqpopup({
  courseName,
  cleanup,
  save,
} : PopupType) {
  const onSaveClick = () => {
    save();
    cleanup();
  } 

  return (
  <div className="fixed inset-1/2 w-96 h-80 overflow-auto transform -translate-x-2/4 -translate-y-1/2 z-40">
    <div className="text-center font-bold bg-gray-50 shadow rounded-t-lg p-3">
      <h1>Override Warning that Prereqs for {courseName} is not satisfied?</h1>
      <h1>Warning: cannot be undone.</h1>
    </div>
    <div className="flex justify-evenly bg-gray-50 p-2 shadow-md rounded-b-lg pt-5 pb-3">
      <div className="bg-red-300 p-2 transform hover:scale-105 transition duration-200 ease-in rounded-lg" onClick={cleanup}>
        Cancel
      </div>
      <div className="bg-green-300 p-2 transform hover:scale-105 transition duration-200 ease-in rounded-lg" onClick={onSaveClick}>
        Confirm
      </div>
    </div>
  </div>)
}

export default OverridePrereqpopup;