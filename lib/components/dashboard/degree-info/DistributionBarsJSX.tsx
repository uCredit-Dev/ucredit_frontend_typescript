import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDistributions } from '../../../resources/assets';
import {
  Plan,
  UserCourse,
  UserDistribution,
  Year,
} from '../../../resources/commonTypes';
import { majorInfos } from '../../../resources/majors';
import {
  selectCurrentPlanCourses,
  selectDistributions,
  selectPlan,
  selectTotalCredits,
  updateDistributions,
  updateTotalCredits,
} from '../../../slices/currentPlanSlice';
import { selectToken } from '../../../slices/userSlice';
import CourseBar from './CourseBar';

const DistributionBarsJSX: FC<{
  selectedMajor: string;
  calculated: boolean;
  setCalculated: Function;
}> = ({ selectedMajor, calculated, setCalculated }) => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const distributions = useSelector(selectDistributions);
  const currentPlan: Plan = useSelector(selectPlan);
  const currPlanCourses = useSelector(selectCurrentPlanCourses);
  const totalCredits = useSelector(selectTotalCredits);
  const [distributionBarsJSX, setDistributionBarsJSX] = useState<JSX.Element[]>(
    [],
  );

  // at first load
  useEffect(() => {
    setCalculated(false);
    getDistributions(currentPlan._id, selectedMajor, token).then((dist) => {
      dispatch(updateDistributions(dist));
      setCalculated(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlan._id, selectedMajor, currPlanCourses, token]);

  // Update total credits everytime courses change.
  useEffect(() => {
    let newTotalCredits = 0;
    currentPlan.years.forEach((year: Year, yearIndex: number) => {
      year.courses.forEach((course: UserCourse) => {
        if (course._id === 'invalid_course') return;
        newTotalCredits += course.credits;
      });
      dispatch(updateTotalCredits(newTotalCredits));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currPlanCourses]);

  // Update displayed JSX every time distributions get updated.
  useEffect(() => {
    setCalculated(false);
    const distributionJSX = distributions.map((dist: UserDistribution) => {
      return (
        <div key={dist._id} id={dist.name}>
          <CourseBar distribution={dist} general={true} bgcolor={'skyblue'} />
        </div>
      );
    });
    distributionJSX.unshift(
      <div id="total" key={'total'}>
        <CourseBar
          distribution={{
            name: 'Total Credits',
            required_credits: majorInfos[selectedMajor].total_degree_credit,
            planned: totalCredits,
            description:
              selectedMajor !== null
                ? 'This is the total amount of credits that is required for ' +
                  selectedMajor
                : '',
            satisfied:
              totalCredits >= majorInfos[selectedMajor].total_degree_credit,
          }}
          general={true}
          bgcolor={''}
        />
      </div>,
    );
    setDistributionBarsJSX(distributionJSX);
    setCalculated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [distributions]);

  return (
    <div>
      {calculated ? (
        <>{distributionBarsJSX}</>
      ) : (
        <b className="m-10 h-full w-96 bg-blue-100">
          Loading degree progress...
        </b>
      )}
    </div>
  );
};

export default DistributionBarsJSX;
