import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Placeholder from './course-search/search-results/Placeholder';
import {
  Course,
  UserDistribution,
  Plan,
  SISRetrievedCourse,
  UserCourse,
  Year,
} from '../../resources/commonTypes';
import {
  selectCourseToShow,
  updateCourseToShow,
  updateShowCourseInfo,
} from '../../slices/popupSlice';
import {
  updateInspectedCourse,
  updatePlaceholder,
  updateInspectedVersion,
  selectPlaceholder,
  selectVersion,
  clearSearch,
} from '../../slices/searchSlice';
import {
  selectCourseCache,
  selectPlanList,
  selectUser,
  updatePlanList,
} from '../../slices/userSlice';
import {
  selectCurrentPlanCourses,
  selectDistributions,
  updateCurrentPlanCourses,
  updateDistributions,
  updateSelectedPlan,
} from '../../slices/currentPlanSlice';
import { toast } from 'react-toastify';
import { getAPI } from '../../resources/assets';
import SisCourse from './course-search/search-results/SisCourse';

/**
 * Course info popup that opens when user preses info button on course components
 */
const CourseDisplayPopup: FC = () => {
  // Redux Setup
  const dispatch = useDispatch();
  const courseToShow: UserCourse | null = useSelector(selectCourseToShow);
  const courseCache = useSelector(selectCourseCache);
  const placeholder = useSelector(selectPlaceholder);
  const user = useSelector(selectUser);
  const version = useSelector(selectVersion);
  const planList = useSelector(selectPlanList);
  const currentCourses = useSelector(selectCurrentPlanCourses);
  const distributions = useSelector(selectDistributions);

  const [inspectedArea, setInspectedArea] = useState<string>('None');

  useEffect(() => {
    if (courseToShow !== null) {
      let found = false;
      courseCache.forEach((c: SISRetrievedCourse) => {
        if (c.number === courseToShow.number) {
          c.versions.forEach((v: any, index: number) => {
            if (v.term === courseToShow.version) {
              const inspectedVersion: Course = {
                title: c.title,
                number: c.number,
                ...c.versions[index],
              };
              dispatch(updateInspectedCourse(c));
              dispatch(updateInspectedVersion(inspectedVersion));
              dispatch(updatePlaceholder(false));
              found = true;
            }
          });
        }
      });
      if (!found) {
        const placeholderCourse: Course = {
          title: courseToShow.title,
          number: courseToShow.number,
          areas: courseToShow.areas,
          term: courseToShow.version,
          school: 'none',
          department: 'none',
          credits: courseToShow.credits.toString(),
          wi: false,
          bio: 'This is a placeholder course',
          tags: [],
          preReq: [],
          restrictions: [],
          level: '',
          version: courseToShow.version,
        };

        dispatch(updatePlaceholder(true));
        dispatch(updateInspectedVersion(placeholderCourse));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Gets current year name.
  const getYear = (newPlan: Plan): Year | null => {
    let out: Year | null = null;
    if (courseToShow !== null) {
      newPlan.years.forEach((planYear) => {
        if (planYear._id === courseToShow.year_id) {
          out = planYear;
        }
      });
    }
    return out;
  };

  // Updates distribution bars upon successfully adding a course.
  const addCourse = (plan?: Plan): void => {
    if (version !== 'None' && courseToShow !== null && plan !== undefined) {
      const addingYear: Year | null = getYear(plan);
      const body = {
        user_id: user._id,
        year_id: courseToShow.year_id !== null ? courseToShow.year_id : '',
        plan_id: plan._id,
        title: version.title,
        year: addingYear !== null ? addingYear.name : '',
        term: courseToShow.term,
        credits: version.credits === '' ? 0 : version.credits,
        isPlaceholder: placeholder,
        number: version.number,
        areas: placeholder ? version.areas : inspectedArea,
        tags: version.tags, 
        department: version.department, 
        preReq: version.preReq,
        wi: version.wi,
        version: version.term,
        expireAt:
          user._id === 'guestUser'
            ? Date.now() + 60 * 60 * 24 * 1000
            : undefined,
      };
      fetch(getAPI(window) + '/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then((retrieved) => retrieved.json())
        .then(handlePostAddCourse(plan));
    }
  };

  // Handles post add course post response
  const handlePostAddCourse =
    (plan: Plan) =>
    (data): void => {
      let newUserCourse: UserCourse;
      if (data.errors === undefined && courseToShow !== null) {
        newUserCourse = { ...data.data };
        dispatch(updateCurrentPlanCourses([...currentCourses, newUserCourse]));
        const allYears: Year[] = [...plan.years];
        const newYears: Year[] = [];
        allYears.forEach(updateYears(newYears, newUserCourse));
        const newPlan: Plan = { ...plan, years: newYears };
        dispatch(updateSelectedPlan(newPlan));
        const newPlanList = [...planList];
        for (let i = 0; i < planList.length; i++) {
          if (planList[i]._id === newPlan._id) {
            newPlanList[i] = newPlan;
          }
        }
        distributions.forEach((dist: UserDistribution, i: number) => {
          if (data.data.distributions.includes(dist._id)) {
            distributions[i] = dist;
          }
        });
        dispatch(updateDistributions(distributions));
        dispatch(updatePlanList(newPlanList));
        dispatch(updateCourseToShow(null));
        dispatch(updateShowCourseInfo(false));
        dispatch(clearSearch());
        dispatch(updatePlaceholder(false));
        toast.success('Course updated!');
      } else {
        console.log('Failed to add', data.errors);
      }
    };

  // Helper method that updates the years array in the plan after adding course.
  const updateYears =
    (newYears: Year[], newUserCourse: UserCourse) =>
    (year: Year): void => {
      if (courseToShow !== null && year._id === courseToShow.year_id) {
        const yCourses = [...year.courses, newUserCourse];
        newYears.push({ ...year, courses: yCourses });
      } else {
        newYears.push(year);
      }
    };

  return (
    <div className="absolute top-0">
      {/* Background Grey */}
      <div
        className="fixed top-0 left-0 z-40 w-full h-screen m-0 bg-black opacity-50"
        onClick={() => {
          dispatch(updateCourseToShow(null));
          dispatch(updateShowCourseInfo(false));
        }}
      ></div>

      {/* Actual popup */}
      <div className="h-screen fixed z-40 left-1/2 flex flex-col min-w-planAdd h-3/4 bg-primary rounded select-none transform -translate-x-1/2 translate-y-12">
        <div className="px-4 py-2 text-white text-coursecard font-semibold select-none">
          Inspecting{' '}
          {courseToShow === null ? 'Invalid course' : courseToShow.title}
        </div>
        {placeholder ? (
          <div className="p-4 bg-gray-100 rounded min-w-[40rem] overflow-y-auto">
            <Placeholder addCourse={addCourse} />
          </div>
        ) : (
          <div className="h-full bg-gray-100 rounded min-w-[40rem]">
            <SisCourse
              addCourse={addCourse}
              setInspectedArea={setInspectedArea}
              inspectedArea={inspectedArea}
              cart={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDisplayPopup;
