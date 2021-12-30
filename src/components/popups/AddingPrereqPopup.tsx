import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { updateAddingPrereq } from '../../slices/popupSlice';

/**
 * This is the confirmation popup that appears when users press the button to delete a plan.
 * It actually performs the deletion or cancels it.
 */
const AddingPrereqPopup: FC = () => {
  const dispatch = useDispatch();
  return (
    <>
      {/* Background Grey */}
      <div
        className="fixed left-0 top-0 m-0 w-full h-screen bg-black opacity-50 z-20"
        onClick={() => dispatch(updateAddingPrereq(false))}
      ></div>
    </>
  );
};

export default AddingPrereqPopup;
