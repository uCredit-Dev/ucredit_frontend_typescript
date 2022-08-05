import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Plan,
} from '../../../resources/commonTypes';
import {
  selectCurrentPlanCourses,
  selectDistributions,
  selectPlan,
  selectTotalCredits,
  updateTotalCredits,
} from '../../../slices/currentPlanSlice';
import CourseBar from './CourseBar';

const DistributionBarsJSX: FC<{ major: string }> = ({ major }) => {
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

  // Update total credits everytime courses change.
  useEffect(() => {
    let tot = 0;
    currentPlan.years.forEach((year) => {
      tot += year.courses.length;
    });
    updateTotalCredits(tot); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currPlanCourses]);  

  // Update displayed JSX every time distributions get updated.
  useEffect(() => {
    setCalculated(true);
    const distributionJSX = distributions.map((dist) => {
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
      }
    );
    distributionJSX.unshift(
      // TODO: replace with distributions from backend 
      <CourseBar
        distribution={{
          name: 'Total Credits',
          criteria: '',
          required_credits: majorObj !== null ? majorObj.total_degree_credit : 0,
          planned: totalCredits,
          description:
            major !== null
              ? 'This is the total amount of credits that is required for ' +
              major
              : '',
        }}
        completed={
          totalCredits >= (major !== null ? major.total_degree_credit : 0)
        }
        general={true}
        bgcolor=""
      />,
    );
    setDistributionBarsJSX(distributionJSX);
    setCalculated(false);
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
