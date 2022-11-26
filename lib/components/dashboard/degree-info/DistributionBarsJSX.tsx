import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDistributions } from '../../../resources/assets';
import { Plan, UserCourse, UserDistribution, Year } from '../../../resources/commonTypes';
import { allMajors } from '../../../resources/majors';
import {
  selectCurrentPlanCourses,
  selectDistributions,
  selectPlan,
  selectTotalCredits,
  updateDistributions,
  updateTotalCredits,
} from '../../../slices/currentPlanSlice';
import CourseBar from './CourseBar';

const DistributionBarsJSX: FC<{ selectedMajor: string }> = ({
  selectedMajor,
}) => {
  const dispatch = useDispatch();
  const distributions = useSelector(selectDistributions);
  const currentPlan: Plan = useSelector(selectPlan);
  const currPlanCourses = useSelector(selectCurrentPlanCourses);
  const totalCredits = useSelector(selectTotalCredits);
  const [calculated, setCalculated] = useState<boolean>(false);
  const [distributionBarsJSX, setDistributionBarsJSX] = useState<JSX.Element[]>(
    [],
  );
  const [showDistributions] = useState<boolean[]>(
    new Array(distributions.length),
  );

  // at first load
  useEffect(() => {
    async function fetchData() {
      let distributions = await getDistributions(
        currentPlan._id,
        selectedMajor,
      );
      dispatch(updateDistributions(distributions));
    }
    fetchData();
    // dispatch(updateTotalCredits(distributions.))
  }, [currentPlan._id, selectedMajor, currPlanCourses, dispatch]);

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
    const distributionJSX = distributions.map(
      (dist: UserDistribution, i: number) => {
        return (
          <div key={dist._id}>
            <div key={dist.name + 0 + dist._id}>
              <CourseBar
                distribution={dist}
                general={true}
                bgcolor={'skyblue'}
              />
            </div>
          </div>
        );
      },
    );
    distributionJSX.unshift(
      <div key={'total'}>
        <div key={'total' + 0 + 'total'}>
          <CourseBar
            distribution={{
              name: 'Total Credits',
              required_credits: allMajors[selectedMajor].total_degree_credit, 
              planned: totalCredits,
              description:
                selectedMajor !== null
                  ? 'This is the total amount of credits that is required for ' +
                  selectedMajor
                  : '',
              satisfied: totalCredits >= allMajors[selectedMajor].total_degree_credit, 
            }}
            general={true}
            bgcolor={""}
          />
        </div>
      </div>,
    );
    setDistributionBarsJSX(distributionJSX);
    setCalculated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [distributions, showDistributions]);

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
