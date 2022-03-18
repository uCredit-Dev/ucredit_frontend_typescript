import { FC, useEffect, useState } from 'react';
import Select from 'react-select';
import CourseVersion from './CourseVersion';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentPlanCourses,
  selectPlan,
  updateCurrentPlanCourses,
  updateSelectedPlan,
} from '../../../../slices/currentPlanSlice';
import {
  selectInspectedCourse,
  selectSemester,
  selectYear,
  selectSearchStack,
  popSearchStack,
  selectVersion,
  updateInspectedVersion,
  updateSearchTime,
  updateSearchFilters,
} from '../../../../slices/searchSlice';
import {
  Course,
  Plan,
  SemesterType,
  Year,
} from '../../../../resources/commonTypes';
import ReactTooltip from 'react-tooltip';
import {
  selectCourseToShow,
  selectShowCourseInfo,
  updateAddingPrereq,
  updateCourseToShow,
  updateShowCourseInfo,
  updateShowingCart,
} from '../../../../slices/popupSlice';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

/**
 * Displays a sis course when searching
 *
 * @prop inspectedArea - the area to add the course to
 * @prop setInspectedArea - sets the area to add the course to
 * @prop addCourse - adds course to plan.
 */
const SisCourse: FC<{
  inspectedArea: string;
  setInspectedArea: (area: string) => void;
  addCourse: (plan?: Plan) => void;
  cart: boolean;
}> = (props) => {
  // Redux Setup
  const dispatch = useDispatch();
  const inspected = useSelector(selectInspectedCourse);
  const version = useSelector(selectVersion);
  const currentPlan = useSelector(selectPlan);
  const searchYear = useSelector(selectYear);
  const searchSemester = useSelector(selectSemester);
  const searchStack = useSelector(selectSearchStack);
  const showCourseInfo = useSelector(selectShowCourseInfo);
  const courseToShow = useSelector(selectCourseToShow);
  const currentCourses = useSelector(selectCurrentPlanCourses);

  const [versionIndex, updateVersionIndex] = useState<number>(0);
  const [ogSem, setOgSem] = useState<SemesterType | 'All'>('All');

  useEffect(() => {
    setOgSem(searchSemester);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (inspected !== 'None' && version !== 'None') {
      const index: number = inspected.terms.indexOf(version.term.toString());
      updateVersionIndex(index);
    }
    ReactTooltip.rebuild();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version]);

  // Returns an array of select options for the distribution area users want to add the course to.
  const getInspectedAreas = () => {
    if (version !== 'None' && version.areas !== 'None') {
      const areaOptions = version.areas
        .split('')
        .map((area: string, i: number) => (
          <option key={version.number + area + i} value={area}>
            {area}
          </option>
        ));
      areaOptions.push(
        <option key="none" value={'None'}>
          None
        </option>,
      );
      return areaOptions;
    } else {
      return (
        <option key="none" value={'None'}>
          None
        </option>
      );
    }
  };

  // For changing the year to add course while in the search popout.
  const handleYearChange = (event: any): void => {
    const searchYearId = event.target.value;
    currentPlan.years.forEach((year) => {
      if (year._id === searchYearId) {
        dispatch(
          updateSearchTime({
            searchYear: event.target.value,
            searchSemester:
              year.year === currentPlan.years[0].year ? 'All' : ogSem,
          }),
        );
        dispatch(updateSearchFilters({ filter: 'year', value: year.year }));
        dispatch(
          updateSearchFilters({
            filter: 'term',
            value: year.year === currentPlan.years[0].year ? 'All' : ogSem,
          }),
        );
      }
    });
  };

  // Handles switching displayed term.
  const handleTermSwitch = (event: any): void => {
    if (inspected !== 'None') {
      inspected.versions.forEach((ver) => {
        if (ver.term === event.value) {
          const newInspected: Course = {
            title: inspected.title,
            number: inspected.number,
            ...ver,
          };
          dispatch(updateInspectedVersion(newInspected));
        }
      });
    }
  };

  /**
   * Cleanup and opens adding prereqs
   */
  const addPrereq = () => {
    dispatch(updateShowingCart(false));
    dispatch(updateCourseToShow(null));
    dispatch(updateShowCourseInfo(false));
    dispatch(updateAddingPrereq(true));
  };

  /**
   * Updates course by deleting old course and adding new.
   */
  const updateCourse = (): void => {
    if (courseToShow !== null) {
      fetch(publicRuntimeConfig.apiUrl + '/courses/' + courseToShow._id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((retrieved) => retrieved.json())
        .then(handleUpdate);
    }
  };

  const handleUpdate = (data) => {
    if (data.errors === undefined && courseToShow !== null) {
      const updated = currentCourses.filter((course) => {
        if (course._id === courseToShow._id) {
          return false;
        } else {
          return true;
        }
      });
      dispatch(updateCurrentPlanCourses(updated));
      const allYears: Year[] = [...currentPlan.years];
      const newYears: Year[] = [];
      allYears.forEach((y) => {
        const yCourses = y.courses.filter((course) => {
          if (course._id === courseToShow._id) {
            return false;
          } else {
            return true;
          }
        });
        newYears.push({ ...y, courses: yCourses });
      });
      const newPlan: Plan = { ...currentPlan, years: newYears };
      dispatch(updateSelectedPlan(newPlan));
      props.addCourse(newPlan);
    } else {
      console.log('ERROR: Failed to add', data.errors);
    }
  };

  // Handles displaying the back button to see previously clicked course
  const getPrevCourseButton = (): JSX.Element =>
    searchStack.length !== 0 ? (
      <button
        className="mt-1 transition duration-200 ease-in transform rotate-90 focus:outline-none hover:scale-125"
        onClick={() => {
          dispatch(popSearchStack());
        }}
      >
        <ChevronDownIcon />
      </button>
    ) : (
      <></>
    );

  // Handles displaying the add prereq button
  const getAddPrereqButton = (): JSX.Element =>
    searchStack.length !== 0 && showCourseInfo ? (
      <button
        className="p-1 px-2 ml-auto -mt-1 text-xl text-white transition duration-200 ease-in transform rounded hover:bg-secondary bg-primary focus:outline-none hover:scale-105"
        onClick={addPrereq}
      >
        Add Prereq
      </button>
    ) : (
      <></>
    );

  // Handles displaying the add course UI
  const getAddCourseUI = (): JSX.Element =>
    (showCourseInfo && searchStack.length === 0) || !showCourseInfo ? (
      <div className="relative bottom-0 flex flex-row items-center w-full h-20 px-4 py-2 bg-gray-100 rounded-b">
        <div className="flex flex-col justify-center flex-grow">
          <div className="mb-1 font-medium">Selecting for</div>
          <div className="flex flex-row tight:flex-col">
            <div className="flex flex-row items-center w-auto h-auto tight:ml-0 tight:mt-2">
              Year
              <div className="flex-grow">
                <QuestionMarkCircleIcon
                  className="h-4 fill-gray"
                  data-for="godTip"
                  data-tip={`<p>This is the year you're selecting for.</p><p>The version you are viewing gives you a snapshot of the information of the course at a specific time to give you an understanding of the past and current states of the course. This is NOT to determine where on the plan you are adding the course.</p><p>NOTE: This could be different from the version of the course you are viewing.</p><p>(ie. Course Version "Spring, 2021" may not equal "Spring, Senior")</p>`}
                />
              </div>
              <select
                className="ml-2 text-black rounded text-coursecard focus:outline-none"
                onChange={handleYearChange}
                value={searchYear}
              >
                {currentPlan.years.map((currPlanYear, i) => {
                  if (inspected !== 'None') {
                    for (let term of inspected.terms) {
                      if (
                        i === 0 ||
                        term ===
                          searchSemester +
                            ' ' +
                            (searchSemester === 'Spring' ||
                            searchSemester === 'Summer' ||
                            searchSemester === 'Intersession'
                              ? currPlanYear.year + 1
                              : currPlanYear.year
                            ).toString() ||
                        currPlanYear.year + 1 >= new Date().getFullYear() // Sloppy checking, fix
                      ) {
                        return (
                          <option
                            key={currPlanYear._id}
                            value={currPlanYear._id}
                          >
                            {currPlanYear.name}
                          </option>
                        );
                      }
                    }
                  }
                  return null;
                })}
              </select>
            </div>
            <div className="flex flex-row items-center w-auto h-auto ml-5 tight:ml-0 tight:mt-2">
              Area
              <div className="flex-grow">
                <QuestionMarkCircleIcon
                  className="h-4 fill-gray"
                  data-for="godTip"
                  data-tip={
                    '<p>Areas designate the specific subset a course belongs to. Each degree requires students to take a certain amount of credits or courses in a spcific area.</p><p>H - Humanities</p><p>S - Social Sciences</p><p>E - Engineering</p><p>N - Natural Sciences</p><p>Q - Quantitative</p>'
                  }
                />
              </div>
              :
              <select
                className="h-6 ml-2 rounded outline-none w-14"
                value={props.inspectedArea}
                onChange={(event) => props.setInspectedArea(event.target.value)}
              >
                {getInspectedAreas()}
              </select>
            </div>
          </div>
        </div>
        {getAddCourseButton()}
      </div>
    ) : (
      <></>
    );

  // Handles Add Course Button
  const getAddCourseButton = (): JSX.Element =>
    !showCourseInfo ? (
      <button
        className="w-auto h-10 p-2 mt-2 text-white transition duration-200 ease-in transform rounded hover:bg-secondary bg-primary focus:outline-none hover:scale-105"
        onClick={() => {
          if (props.cart) {
            addPrereq();
          } else props.addCourse();
        }}
      >
        Add Course
      </button>
    ) : (
      <button
        className="w-auto h-10 p-2 mt-2 text-white transition duration-200 ease-in transform rounded hover:bg-secondary bg-primary focus:outline-none hover:scale-105"
        onClick={updateCourse}
      >
        Update Course
      </button>
    );

  /**
   * Returns add course UI based on cart activation
   */
  const getAddCourseType = () => (
    <>
      {props.cart ? (
        <div className="relative bottom-0 flex flex-row items-center w-full h-20 px-4 py-2 bg-gray-100 rounded-b">
          {getAddCourseButton()}
        </div>
      ) : (
        getAddCourseUI()
      )}
    </>
  );

  return (
    <div className="flex flex-col h-full">
      {inspected !== 'None' && (
        <>
          <div className="w-full h-full px-5 pt-4 pb-5 overflow-y-auto text-base bg-white rounded-t select-text">
            <div className="flex flex-row w-full h-auto mb-1">
              {getPrevCourseButton()}
              <h1 className="flex flex-row w-auto h-auto transition duration-200 ease-in transform hover:scale-105">
                <div className="w-full h-auto text-2xl font-bold">
                  {inspected.title}
                </div>
              </h1>
              {getAddPrereqButton()}
            </div>
            <div className="flex flex-row items-center font-semibold">
              <div className="flex flex-row">
                Term
                <div className="flex-grow mt-1">
                  <QuestionMarkCircleIcon
                    className="h-4 fill-gray"
                    data-for="godTip"
                    data-tip={`<p>This is a specific snapshot of course information at a specific time in the past or present.</p><p>NOTE: This is NOT to determine where on the plan you are adding the course.</p><p>(ie. Course Version "Spring, 2021" may not equal "Spring, Senior")</p>`}
                  />
                </div>
                :
              </div>
              <Select
                className="ml-2 w-44"
                options={inspected.terms
                  .filter(
                    (term) =>
                      term
                        .toLowerCase()
                        .includes(searchSemester.toLowerCase()) ||
                      (courseToShow !== null &&
                        term
                          .toLowerCase()
                          .includes(courseToShow.term.toLowerCase())),
                  )
                  .map((term) => {
                    return { label: term, value: term };
                  })}
                value={{
                  label: inspected.terms[versionIndex],
                  value: inspected.terms[versionIndex],
                }}
                onChange={handleTermSwitch}
              />
            </div>
            <CourseVersion setInspectedArea={props.setInspectedArea} />
          </div>
          {getAddCourseType()}
        </>
      )}
    </div>
  );
};

export default SisCourse;
