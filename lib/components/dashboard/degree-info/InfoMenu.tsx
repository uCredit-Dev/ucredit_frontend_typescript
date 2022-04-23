import { FC, useEffect, useState } from 'react';
import Distributions from './Distributions';
import CourseBar from './CourseBar';
import {
  checkRequirementSatisfied,
  getRequirements,
  requirements,
} from './distributionFunctions';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentPlanCourses,
  selectDistributions,
  selectPlan,
  updateDistributions,
} from '../../../slices/currentPlanSlice';
import { selectCourseCache } from '../../../slices/userSlice';
import { getCourse, getMajor } from '../../../resources/assets';
import {
  Course,
  Major,
  Plan,
  ReviewMode,
  UserCourse,
} from '../../../resources/commonTypes';
import { allMajors } from '../../../resources/majors';

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
  const [major, setMajor] = useState<Major | null>(null);

  // Update major when plan changes
  useEffect(() => {
    let firstMajor: string | undefined = currentPlan.majors[0];
    if (firstMajor === undefined) {
      return;
    }
    let majorObj: Major | undefined = getMajor(firstMajor);
    if (majorObj !== undefined) {
      setMajor(majorObj);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlan._id, currentPlan.majors, currPlanCourses]);

  /**
   * Callback used to change the major of degree progress when user has multiple majors
   * @param selected selected value from dropdown
   * @returns
   */
  const changeDisplayMajor = (selected: string) =>
    setMajor(
      allMajors.find((majorObj) => majorObj.degree_name === selected) || null,
    );

  return (
    <div className="z-50 flex flex-col justify-between w-10 bg-red-100 h-min w-96 right-0 fixed">
      <div className="drop-shadow-lg z-50 max-h-[80vh] bg-white bg-opacity-90 rounded  overflow-x-hidden overflow-y-auto w-full">
        {/* <InfoCards /> */}
        <div className="w-96 h-full">
          <Distributions
            major={major}
            userMajors={currentPlan.majors}
            changeDisplayMajor={changeDisplayMajor}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoMenu;
