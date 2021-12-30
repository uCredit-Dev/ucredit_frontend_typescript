import { FC, useEffect, useState } from 'react';
import Distributions from './degree-info/Distributions';
import clsx from 'clsx';
import FineDistribution from './degree-info/FineDistribution';
import CourseBar from './degree-info/CourseBar';
import {
  checkRequirementSatisfied,
  getRequirements,
  requirements,
} from './degree-info/distributionFunctions';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentPlanCourses,
  selectDistributions,
  selectPlan,
  updateDistributions,
} from '../../slices/currentPlanSlice';
import { selectCourseCache } from '../../slices/userSlice';
import { getCourse, getMajor } from '../../resources/assets';
import { Course, Major, Plan, UserCourse } from '../../resources/commonTypes';

/**
 * Info menu shows degree plan and degree information.
 * Hidden on default.
 */
const InfoMenu: FC = () => {
  const dispatch = useDispatch();
  const distributions = useSelector(selectDistributions);
  const currentPlan: Plan = useSelector(selectPlan);
  const courseCache = useSelector(selectCourseCache);
  const currPlanCourses = useSelector(selectCurrentPlanCourses);

  const [infoOpen, setInfoOpen] = useState(false);
  const [showDistributions, setShowDistributions] = useState<boolean[]>(
    new Array(distributions.length),
  );
  const [distributionOpen, setDistributionOpen] = useState<boolean>(true);
  const [calculated, setCalculated] = useState<boolean>(false);
  const [major, setMajor] = useState<Major | null>(null);
  const [distributionBarsJSX, setDistributionBarsJSX] = useState<JSX.Element[]>(
    [],
  );
  const [retrievedDistributions, setDistributions] = useState<{
    plan: Plan;
    distr: [string, requirements[]][];
  }>({ plan: currentPlan, distr: [] });

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
  }, [currentPlan._id, currentPlan, currentPlan.majors, currPlanCourses]);

  // Gets distribution everytime a plan changes.
  useEffect(() => {
    const distr = getDistributions();
    if (distr && distr.length > 0) {
      let tot = 0;
      currentPlan.years.forEach((year) => {
        tot += year.courses.length;
      });
      updateFulfilled(
        currentPlan,
        distr,
        tot === currPlanCourses.length ? currPlanCourses : [],
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [major, currPlanCourses]);

  useEffect(() => {
    setCalculated(true);
    if (currentPlan._id === retrievedDistributions.plan._id) {
      dispatch(updateDistributions(retrievedDistributions.distr));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retrievedDistributions]);

  /**
   * Gets all distributions associated with current plan
   * @returns an array of pairs for distributions and their requirements if distributions exist and null if they don't
   */
  const getDistributions = (): [string, requirements[]][] | null => {
    if (major) {
      return getRequirements(major);
    }
    return null;
  };

  // Update displayed JSX every time distributions get updated.
  useEffect(() => {
    const distributionJSX = distributions.map(
      (pair: [string, requirements[]], i: number) => {
        return (
          <div key={pair[0] + pair[1] + i}>
            {pair[1].map((dis, index) => {
              if (index === 0) {
                return (
                  <div
                    key={dis.name + index + dis.expr}
                    className={clsx({ hidden: !distributionOpen })}
                  >
                    <CourseBar distribution={dis} general={true} />
                  </div>
                );
              } else {
                return (
                  <div key={dis.name + index + dis.expr}>
                    <FineDistribution
                      dis={dis}
                      distributionOpen={distributionOpen}
                      hidden={showDistributions[i] !== true}
                    />
                  </div>
                );
              }
            })}
            {pair[1].length > 1 ? (
              <button
                onClick={() => {
                  changeDistributionVisibility(i);
                }}
                className={clsx(
                  'mb-2 underline text-sm focus:outline-none transform hover:scale-101 transition duration-200 ease-in',
                  { hidden: !distributionOpen },
                )}
              >
                {getDistributionText(i)}
              </button>
            ) : null}
          </div>
        );
      },
    );
    setDistributionBarsJSX(distributionJSX);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [distributions, distributionOpen, showDistributions]);

  /**
   * args: an array containing focus areas and their associated requirements, and all courses
   * updates the requirements obj so that the fulfilled credits accurately reflects the plan
   * @param requirements - an array of requirement pairs
   * @param courses
   * @param courseCache - cached courses
   * @param currPlanCourses - courses in current plan
   */
  const updateFulfilled = async (
    updatingPlan: Plan,
    reqs: [string, requirements[]][],
    courses: UserCourse[],
  ) => {
    setDistributions({ plan: updatingPlan, distr: reqs });
    let reqCopy: [string, requirements[]][] = copyReqs(reqs);
    let count: number = 0;
    const checked: Course[] = [];
    const coursesCopy = [...courses];
    coursesCopy.sort((c1: UserCourse, c2: UserCourse) => {
      const c1Split = c1.number.split('.');
      const c2Split = c2.number.split('.');
      const c1LastNum = c1Split[c1Split.length - 1];
      const c2LastNum = c2Split[c2Split.length - 1];
      if (c1LastNum === '' && c1Split.length === 1) {
        return -1;
      } else if (c2LastNum === '' && c2Split.length === 1) {
        return 1;
      } else {
        return parseInt(c1LastNum) - parseInt(c2LastNum);
      }
    });
    for (let course of coursesCopy) {
      setCalculated(false);
      const courseObj = await getCourse(
        course.number,
        courseCache,
        courses,
        -1,
      );
      let counted: boolean = false;
      if (courseObj.resp !== null) {
        checked.forEach((c) => {
          if (courseObj.resp !== null && c.number === courseObj.resp.number)
            counted = true;
        });
        checked.push(courseObj.resp);
      }
      const localReqCopy: [string, requirements[]][] = copyReqs(reqCopy);
      if (!counted) updateReqs(localReqCopy, courseObj.resp);
      reqCopy = localReqCopy;
      count++;
      if (count === courses.length) {
        setDistributions({ plan: updatingPlan, distr: reqCopy });
      }
    }
  };

  const updateReqs = (reqs: [string, requirements[]][], courseObj) => {
    let inNonExclusive: boolean = false;
    // Exclusive check
    reqs.forEach((reqGroup, i) =>
      reqGroup[1].forEach((req: requirements, j: number) => {
        if (
          courseObj !== null &&
          checkRequirementSatisfied(req, courseObj) &&
          (req.exclusive === undefined || !req.exclusive) &&
          req.fulfilled_credits < req.required_credits
        ) {
          reqs[i][1][j].fulfilled_credits += parseInt(courseObj.credits);
          if (j !== 0) inNonExclusive = true;
        }
      }),
    );
    reqs.forEach((reqGroup, i) =>
      reqGroup[1].forEach((req: requirements, j: number) => {
        if (
          courseObj !== null &&
          checkRequirementSatisfied(req, courseObj) &&
          req.exclusive &&
          req.fulfilled_credits < req.required_credits &&
          !inNonExclusive
        ) {
          reqs[i][1][j].fulfilled_credits += parseInt(courseObj.credits);
        }
      }),
    );
  };

  const copyReqs = (reqs) => {
    const reqCopy: [string, requirements[]][] = [];
    reqs.forEach((reqGroup) => {
      const reqGroupCopy: any = [];
      reqGroup[1].forEach((req) => reqGroupCopy.push({ ...req }));
      reqCopy.push([reqGroup[0], reqGroupCopy]);
    });
    return reqCopy;
  };

  /**
   * Changes whether fine distributions are hidden
   * @param i - the distribution's index amongst other distributions
   */
  const changeDistributionVisibility = (i: number) => {
    let showDistributionsCopy = showDistributions.slice();
    showDistributionsCopy[i] = !showDistributions[i];
    setShowDistributions(showDistributionsCopy);
  };

  const getDistributionText = (index: number): string =>
    showDistributions[index] === true
      ? 'Hide Fine Requirements'
      : 'Show Fine Requirements';
  return (
    <div
      className="fixed z-30 right-0 flex flex-col justify-between mt-4 w-10"
      style={{ height: '90vh' }}
    >
      <div className="my-auto transform -rotate-90">
        <button
          className="w-32 h-10 text-center text-white font-bold hover:bg-blue-400 bg-green-400 rounded focus:outline-none shadow hover:scale-105 transition duration-200 ease-in drop-shadow-xl"
          onClick={() => {
            setInfoOpen(!infoOpen);
          }}
        >
          Plan Overview
        </button>
      </div>
      {infoOpen ? (
        <div className="absolute z-50 right-14 top-8 ml-5 p-4 px-0 w-max max-h-full bg-white bg-opacity-90 rounded shadow overflow-y-scroll">
          {/* <InfoCards /> */}
          {(() => {
            if (calculated) {
              return (
                <Distributions
                  major={major}
                  distributionOpen={distributionOpen}
                  setDistributionOpen={setDistributionOpen}
                  distributionBarsJSX={distributionBarsJSX}
                />
              );
            } else
              return <b className="m-10 h-80">Loading degree progress...</b>;
          })()}
        </div>
      ) : null}
    </div>
  );
};

export default InfoMenu;
