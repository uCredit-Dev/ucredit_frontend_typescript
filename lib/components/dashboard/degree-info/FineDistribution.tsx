import clsx from 'clsx';
import { useState, useEffect, FC } from 'react';
import { useSelector } from 'react-redux';
import { CheckIcon, XIcon } from '@heroicons/react/outline';
import parse from 'html-react-parser';
import {
  requirements,
  checkRequirementSatisfied,
} from './distributionFunctions';
import { selectCurrentPlanCourses } from '../../../slices/currentPlanSlice';
import { selectCourseCache } from '../../../slices/userSlice';
import { getCourse } from '../../../resources/assets';

/**
 * Component that displays fine requirements of a specific distribution.
 * @prop dis - general distribution fine distribution is for.
 * @prop distributionOpen - whether this distribution bar is open or not.
 */
const FineDistribution: FC<{
  dis: requirements;
  openSignal: boolean;
}> = ({ dis, openSignal }) => {
  const [showDistrDesc, setShowDistrDesc] = useState<boolean>(true);
  const [plannedCredits, setPlannedCredits] = useState(dis.fulfilled_credits);
  const [firstRender, setFirstRender] = useState(true);

  const courseCache = useSelector(selectCourseCache);
  const currPlanCourses = useSelector(selectCurrentPlanCourses);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
    } else {
      setShowDistrDesc(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openSignal]);

  // Updates fine distribution progress
  useEffect(() => {
    let temp = dis.fulfilled_credits;
    currPlanCourses.forEach((course) => {
      getCourse(course.number, courseCache, currPlanCourses, -1).then(
        (courseObj) => {
          if (
            courseObj.resp != null &&
            checkRequirementSatisfied(dis, courseObj.resp)
          ) {
            temp -= course.credits;
          } else {
            temp += course.credits;
          }
        },
      );
    });
    setPlannedCredits(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currPlanCourses, dis.expr, dis.fulfilled_credits]);

  return (
    <div key={dis.name} className={clsx('flex justify-between w-full')}>
      <button
        onClick={() => setShowDistrDesc(!showDistrDesc)}
        className="flex w-full h-auto pr-2 mb-1 overflow-hidden text-left transition duration-200 ease-in transform focus:outline-none hover:scale-101 overflow-ellipsis"
      >
        <div>
          {plannedCredits >= dis.required_credits ? (
            <CheckIcon fill="green" />
          ) : (
            <XIcon stroke="red" />
          )}
        </div>
        <div
          className={clsx('pr-2', {
            'overflow-y-hidden h-6 select-text': !showDistrDesc,
          })}
        >
          {parse(dis.name)}
        </div>
      </button>
      <div className="font-bold">
        {plannedCredits}/{dis.required_credits}
      </div>
    </div>
  );
};

export default FineDistribution;
