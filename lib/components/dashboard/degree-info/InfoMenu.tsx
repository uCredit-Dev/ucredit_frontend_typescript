import { FC, useEffect } from 'react';
import Distributions from './Distributions';
import { useSelector } from 'react-redux';
import {
  selectCurrentPlanCourses,
  selectPlan,
  selectSelectedMajor,
  updateSelectedMajor,
} from '../../../slices/currentPlanSlice';
import { getMajor } from '../../../resources/assets';
import { Major, Plan, ReviewMode } from '../../../resources/commonTypes';
import { allMajors } from '../../../resources/majors';
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
  const major = useSelector(selectSelectedMajor);
  const dispatch = useDispatch();

  // Update major when plan changes
  useEffect(() => {
    if (!major) {
      let firstMajor: string | undefined = currentPlan.majors[0];
      if (firstMajor === undefined) {
        return;
      }
      let majorObj: Major | undefined = getMajor(firstMajor);
      if (majorObj) {
        dispatch(updateSelectedMajor(majorObj));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlan._id, currentPlan.majors, currPlanCourses]);

  /**
   * Callback used to change the major of degree progress when user has multiple majors
   * @param selected selected value from dropdown
   * @returns
   */
  const changeDisplayMajor = (selected: string) => {
    const newMajor = allMajors.find(
      (majorObj) => majorObj.degree_name === selected,
    );
    dispatch(updateSelectedMajor(newMajor ? newMajor : allMajors[0]));
  };
  return (
    <div className="z-[60] flex flex-col justify-between w-10 bg-red-100 h-min w-96 right-0 fixed mt-14">
      <div className="drop-shadow-lg z-50 max-h-[80vh] bg-white bg-opacity-90 rounded  overflow-x-hidden overflow-y-auto w-full">
        {/* <InfoCards /> */}
        <div className="w-96 h-full">
          <Distributions
            userMajors={currentPlan.majors}
            changeDisplayMajor={changeDisplayMajor}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoMenu;
