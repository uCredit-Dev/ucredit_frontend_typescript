import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDistributions } from '../../../resources/assets';
import {
  Major,
  Plan, UserDistribution,
} from '../../../resources/commonTypes';
import {
  selectCurrentPlanCourses,
  selectDistributions,
  selectPlan,
  selectSelectedMajor,
  selectTotalCredits,
  updateDistributions,
  updateTotalCredits,
} from '../../../slices/currentPlanSlice';
import CourseBar from './CourseBar';

const DistributionBarsJSX: FC<{ selectedMajor: string }> = ({ selectedMajor }) => {
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
      let distributions = await getDistributions(currentPlan._id, selectedMajor); 
      dispatch(updateDistributions(distributions));
    }
    fetchData();
    // dispatch(updateTotalCredits(distributions.))
  }, [currentPlan._id, selectedMajor]);

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
    setCalculated(false);
    console.log(distributions);
    const distributionJSX = distributions.map((dist: UserDistribution, i: number) => {
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
    // distributionJSX.unshift(
    //   // TODO: replace with distributions from backend 
    //   <CourseBar
    //     distribution={{
    //       name: 'Total Credits',
    //       criteria: '',
    //       required_credits: major !== null ? major.total_degree_credit : 0,
    //       planned: totalCredits,
    //       description:
    //         major !== null
    //           ? 'This is the total amount of credits that is required for ' +
    //           major
    //           : '',
    //     }}
    //     completed={
    //       totalCredits >= (major !== null ? major.total_degree_credit : 0)
    //     }
    //     general={true}
    //     bgcolor=""
    //   />,
    // );
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
