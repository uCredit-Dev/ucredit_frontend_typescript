import React from "react";
import { useDispatch } from "react-redux";
import { updateAddingPrereq } from "../../slices/popupSlice";

/**
 * This is the confirmation popup that appears when users press the button to delete a plan.
 * It actually performs the deletion or cancels it.
 */
const AddingPrereqPopup = () => {
  const dispatch = useDispatch();
  return (
    <div className="absolute top-0">
      {/* Background Grey */}
      <div
        className="fixed z-40 left-0 top-0 m-0 w-full h-screen bg-black opacity-50"
        onClick={() => dispatch(updateAddingPrereq(false))}
      ></div>
    </div>
  );
};

export default AddingPrereqPopup;
