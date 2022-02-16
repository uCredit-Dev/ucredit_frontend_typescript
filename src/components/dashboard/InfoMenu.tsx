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
  updateSelectedPlan,
} from '../../slices/currentPlanSlice';
import {
  selectCourseCache,
  selectPlanList,
  updatePlanList,
} from '../../slices/userSlice';
import { api, getCourse, getMajor } from '../../resources/assets';
import { Course, Major, Plan, UserCourse } from '../../resources/commonTypes';
import { allMajors } from '../../resources/majors';
import Select, {
  components,
  MultiValueProps,
  StylesConfig,
} from 'react-select';
import axios from 'axios';
import { toast } from 'react-toastify';

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
  const planList = useSelector(selectPlanList);

  const [infoOpen, setInfoOpen] = useState(false);
  const [showDistributions, setShowDistributions] = useState<boolean[]>(
    new Array(distributions.length),
  );
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

  const handleMajorChange = (event: any) => {
    if (event.length === 0) {
      toast.error('You must have at least one major!');
      return;
    }
    const body = {
      plan_id: currentPlan._id,
      majors: event.map((option) => option.label),
    };
    axios
      .patch(api + '/plans/update', body)
      .then(({ data }) => {
        const newUpdatedPlan = { ...currentPlan, majors: data.data.majors };
        dispatch(updateSelectedPlan(newUpdatedPlan));
        let newPlanList = [...planList];
        for (let i = 0; i < planList.length; i++) {
          if (newPlanList[i]._id === currentPlan._id) {
            newPlanList[i] = { ...newUpdatedPlan };
          }
        }
        dispatch(updatePlanList(newPlanList));
      })
      .catch((err) => console.log(err));
  };

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

  /**
   * Callback used to change the major of degree progress when user has multiple majors
   * @param selected selected value from dropdown
   * @returns
   */
  const changeDisplayMajor = (selected: string) =>
    setMajor(
      allMajors.find((majorObj) => majorObj.degree_name === selected) || null,
    );

  const majorOptions = allMajors.map((m, index) => ({
    value: index,
    label: m.degree_name,
  }));

  // Update displayed JSX every time distributions get updated.
  useEffect(() => {
    const distributionJSX = distributions.map(
      (pair: [string, requirements[]], i: number) => {
        return (
          <div key={pair[0] + pair[1] + i}>
            {pair[1].map((dis, index) => {
              if (index === 0) {
                return (
                  <div key={dis.name + index + dis.expr}>
                    <CourseBar distribution={dis} general={true} />
                  </div>
                );
              } else {
                return (
                  <div key={dis.name + index + dis.expr}>
                    <FineDistribution
                      dis={dis}
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
                )}
              >
                {/* {getDistributionText(i)} MI changed*/}
              </button>
            ) : null}
          </div>
        );
      },
    );
    setDistributionBarsJSX(distributionJSX);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [distributions, showDistributions]);

  /**
   * args: an array containing focus areas and their associated requirements, and all courses
   * updates the requirements obj so that the fulfilled credits accurately reflects the plan
   * @param requirements - an array of requirement pairs
   * @param courses
   * @param courseCache - cached courses
   * @param currPlanCourses - courses in current plan
   */
  const updateFulfilled = (
    updatingPlan: Plan,
    reqs: [string, requirements[]][],
    courses: UserCourse[],
  ) => {
    setDistributions({ plan: updatingPlan, distr: reqs });
    const coursesCopy: UserCourse[] = [...courses];
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
    processCoursesCopy(courses, coursesCopy, reqs, updatingPlan);
  };

  const processCoursesCopy = async (
    courses: UserCourse[],
    coursesCopy: UserCourse[],
    reqs: [string, requirements[]][],
    updatingPlan: Plan,
  ) => {
    let reqCopy: [string, requirements[]][] = copyReqs(reqs);
    let count: number = 0;
    const checked: Course[] = [];
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
    // Exclusive check:
    // If the requirement is exclusive, this means that if a course fulfills the requirement,
    // it cannot fulfill any other requirements. Alternatively, if a course fulfills any other requirement, it cannot fulfill this one.
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
    // Pathing check
    reqs.forEach((reqGroup: [string, requirements[]]) =>
      reqGroup[1].forEach((req: requirements) => {
        processReq(req, reqGroup);
      }),
    );
  };

  const processReq = (
    req: requirements,
    reqGroup: [string, requirements[]],
  ) => {
    if (req.pathing) {
      let [requirement, ...focus_areas] = reqGroup[1];
      for (let focus_area of focus_areas) {
        if (focus_area.fulfilled_credits >= focus_area.required_credits) {
          reqGroup[1] = [requirement, focus_area];
        }
      }
    }
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

  const MultiValue = (
    props: MultiValueProps<typeof majorOptions[number], true>,
  ) => {
    const currMajor = allMajors.find(
      (majorObj) => majorObj.degree_name === props.data.label,
    );
    const typeIndicator = currMajor?.degree_name
      .toLocaleLowerCase()
      .includes('minor')
      ? 'm'
      : 'M';

    return (
      <components.MultiValue {...props}>
        {typeIndicator + ' | ' + currMajor?.degree_name.slice(5)}
      </components.MultiValue>
    );
  };

  const DropdownIndicator = () => {
    return <components.DownChevron style={{ color: '#b3b3b3' }} />;
  };

  const customStyles: StylesConfig<typeof majorOptions[number], true> = {
    control: (provided, state) => ({
      ...provided,
      borderColor: '#508aca',
      color: 'white',
      boxShadow: 'none',
      '&:hover': {
        borderColor: 'white',
        cursor: 'pointer',
      },
      background: '#508aca',
    }),
    multiValue: (provided) => {
      const maxWidth = '19rem';
      return {
        ...provided,
        maxWidth,
        color: 'white',
        background: '#508aca',
      };
    },
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'white',
      fontSize: '1rem',
    }),
    multiValueRemove: (styles, state) => {
      console.log(styles);
      return {
        ...styles,
        color: '#508aca',
        borderRadius: '10%',
        width: '1.5rem',
        height: '1.5rem',
        marginTop: 'auto',
        marginBottom: 'auto',
        backgroundColor: '#508aca',
        ':hover': {
          backgroundColor: 'red',
          color: 'white',
        },
      };
    },
    indicatorSeparator: (provided, state) => ({
      display: 'none',
      ...provided,
    }),
  };

  return (
    <div className="fixed z-40 right-0 flex flex-col justify-between mt-8 w-10 h-[72.5%] min-h-[40vh]">
      <div className="my-auto transform -rotate-90">
        <button
          className="w-32 h-10 text-center text-white font-bold hover:bg-secondary bg-primary rounded focus:outline-none shadow hover:scale-105 transition duration-200 ease-in drop-shadow-xl"
          onClick={() => {
            setInfoOpen(!infoOpen);
          }}
        >
          Plan Overview
        </button>
      </div>
      {infoOpen ? (
        <div className="absolute z-50 right-14 top-5 ml-5 p-4 px-0 w-max max-h-full bg-white bg-opacity-90 rounded shadow overflow-y-scroll">
          <div className="z-50 flex-none mx-4 p-6 w-96 h-auto bg-white rounded shadow">
            <div className="self-start text-2xl font-medium">
              {currentPlan.name}
            </div>
            <Select
              isMulti
              components={{ MultiValue, DropdownIndicator }}
              isClearable={false}
              options={majorOptions}
              value={majorOptions.filter((m) =>
                currentPlan.majors.includes(m.label),
              )}
              onChange={handleMajorChange}
              placeholder="Change Major"
              name="majorChange"
              inputId="majorChange"
              styles={customStyles}
              className="z-50"
              hideSelectedOptions={false}
            />
            {/* <InfoCards /> */}
            {(() => {
              if (calculated) {
                return (
                  <Distributions
                    major={major}
                    userMajors={currentPlan.majors}
                    changeDisplayMajor={changeDisplayMajor}
                    distributionBarsJSX={distributionBarsJSX}
                  />
                );
              } else
                return <b className="m-10 h-80">Loading degree progress...</b>;
            })()}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default InfoMenu;
