import React, { FC, useEffect } from 'react';
import Distributions from './Distributions';
import { useSelector } from 'react-redux';
import {
  selectCurrentPlanCourses,
  selectPlan,
  selectSelectedMajor,
  updateSelectedMajor,
} from '../../../slices/currentPlanSlice';
import { Plan, ReviewMode } from '../../../resources/commonTypes';
import { useDispatch } from 'react-redux';

interface Props {
  mode: ReviewMode;
}

/**
 * Info menu shows degree plan and degree information.
 * Hidden on default.
 */
const InfoMenu: FC<Props> = () => {
  const currentPlan: Plan = useSelector(selectPlan);
  const currPlanCourses = useSelector(selectCurrentPlanCourses);
  const major_id = useSelector(selectSelectedMajor);
  const dispatch = useDispatch();

  // Update major when plan changes
  useEffect(() => {
    if (!major_id) {
      let firstMajor: string | undefined = currentPlan.major_ids[0];
      if (firstMajor === undefined) {
        return;
      }
      dispatch(updateSelectedMajor(firstMajor));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlan._id, currentPlan.major_ids]);

  /**
   * Callback used to change the major of degree progress when user has multiple majors
   * @param selected selected value from dropdown
   * @returns
   */
  const changeDisplayMajor = (selected: string) => {
    dispatch(updateSelectedMajor(selected));
  };
  return (
    <div className="z-[101] flex flex-col justify-between bg-red-100 h-min right-0 fixed top-0 right-0">
      <div className="drop-shadow-lg z-50 max-h-screen bg-white bg-opacity-90 rounded  overflow-x-hidden overflow-y-auto w-full">
        {/* <InfoCards /> */}
        <div className="w-[22.5vw] h-full">
          <Distributions
            userMajors={currentPlan.major_ids}
            changeDisplayMajor={changeDisplayMajor}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoMenu;
