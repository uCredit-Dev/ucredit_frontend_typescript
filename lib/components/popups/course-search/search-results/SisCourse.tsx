import React, { FC, useEffect, useState } from 'react';
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
  updateInspectedCourse,
  updateCartAdd,
} from '../../../../slices/searchSlice';
import {
  Course,
  Plan,
  ReviewMode,
  SemesterType,
  Year,
} from '../../../../resources/commonTypes';
import {
  selectCourseToShow,
  selectShowCourseInfo,
  updateAddingPrereq,
  updateCourseToShow,
  updateShowCourseInfo,
  updateShowingCart,
} from '../../../../slices/popupSlice';
import { getAPI } from '../../../../resources/assets';
import { ChevronDownIcon, XIcon } from '@heroicons/react/outline';
import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
import {
  selectCartInvokedBySemester,
  selectReviewMode,
  selectToken,
} from '../../../../slices/userSlice';
import clsx from 'clsx';
import * as amplitude from '@amplitude/analytics-browser';

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
  addCourse: (plan?: Plan, year_id?: string, term?: string) => void;
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
  const reviewMode = useSelector(selectReviewMode);
  const token = useSelector(selectToken);
  const cartInvokedBySemester = useSelector(selectCartInvokedBySemester);

  const [versionIndex, updateVersionIndex] = useState<number>(0);
  const [year, setYear] = useState<string>(
    courseToShow ? courseToShow.year_id : searchYear,
  );
  const [sem, setSem] = useState<string>(
    courseToShow ? courseToShow.term : searchSemester.toLowerCase(),
  );
  const [ogSem, setOgSem] = useState<SemesterType | 'All'>('All');

  useEffect(() => {
    setOgSem(searchSemester);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (inspected !== 'None' && version !== 'None') {
      const index: number = inspected.terms.indexOf(
        JSON.stringify(version.term),
      );
      updateVersionIndex(index);
    }
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
    const value = JSON.parse(event.value);
    dispatch(
      updateSearchTime({
        searchSemester:
          value.semester.charAt(0).toUpperCase() + value.semester.slice(1),
        searchYear: value.year_id,
      }),
    );
    setYear(value.year_id);
    setSem(value.semester);
  };

  /**
   * Cleanup and opens adding prereqs
   */
  const addPrereq = () => {
    dispatch(updateShowingCart(false));
    dispatch(updateAddingPrereq(true));
    dispatch(updateCartAdd(true));
    cleanup();
  };

  const cleanup = () => {
    dispatch(updateCourseToShow(null));
    dispatch(updateShowCourseInfo(false));
  };

  /**
   * Clears inspected course
   */
  const clearInspected = () => {
    cleanup();
    dispatch(updateInspectedVersion('None'));
    dispatch(updateInspectedCourse('None'));
  };

  /**
   * Updates course by deleting old course and adding new.
   */
  const updateCourse = (): void => {
    if (courseToShow !== null) {
      fetch(getAPI(window) + '/courses/' + courseToShow._id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
      props.addCourse(newPlan, year, sem);
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
    searchStack.length !== 0 &&
    showCourseInfo &&
    reviewMode !== ReviewMode.View ? (
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
                  data-tooltip-id="godtip"
                  data-tooltip-html={`<p>This is the year you're selecting for.</p><p>The version you are viewing gives you a snapshot of the information of the course at a specific time to give you an understanding of the past and current states of the course. This is NOT to determine where on the plan you are adding the course.</p><p>NOTE: This could be different from the version of the course you are viewing.</p><p>(ie. Course Version "Spring, 2021" may not equal "Spring, Senior")</p>`}
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
              Count as
              <div className="flex-grow">
                <QuestionMarkCircleIcon
                  className="h-4 fill-gray"
                  data-tooltip-id="godtip"
                  data-tooltip-html={
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
        className={clsx(
          {
            'bg-slate-300 hover:bg-slate-300':
              cartInvokedBySemester && reviewMode === ReviewMode.View,
          },
          'w-auto h-10 p-2 mt-2 mx-auto text-white transition duration-200 ease-in transform rounded md:hover:bg-secondary md:bg-primary focus:outline-none hover:scale-105 bg-secondary',
        )}
        onClick={() => {
          if (props.cart) {
            addPrereq();
          } else {
            props.addCourse();
            amplitude.track('Added Course');
          }
        }}
        disabled={cartInvokedBySemester && reviewMode === ReviewMode.View}
      >
        Add Course
      </button>
    ) : (
      <button
        className={clsx(
          { 'bg-slate-300 hover:bg-slate-300': reviewMode === ReviewMode.View },
          'w-auto h-10 p-2 mt-2 text-white transition duration-200 ease-in transform rounded hover:bg-secondary bg-primary focus:outline-none hover:scale-105',
        )}
        onClick={updateCourse}
        disabled={reviewMode === ReviewMode.View}
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

  const getTerms = () => {
    if (inspected === 'None') {
      return [];
    }
    const offeredSemesters = [
      ...new Set(
        inspected!.terms.map((term) => {
          return term.split(' ')[0].toLowerCase();
        }),
      ),
    ];
    const terms: { year_id: string; semester?: string }[] = [];
    for (const year of currentPlan.years) {
      if (year.name !== 'AP/Transfer') {
        for (const semester of offeredSemesters) {
          terms.push({ year_id: year._id, semester: semester });
        }
      }
    }
    return terms;
  };

  const getTermString = (year_id: string, semester: string | undefined) => {
    const year = currentPlan.years.find((y) => y._id === year_id);
    return (year ? year.name : '') + (semester ? ' ' + semester : '');
  };

  return (
    <div className="flex flex-col h-full">
      {inspected !== 'None' && (
        <>
          <div className="w-full h-full px-5 pt-4 pb-5 overflow-y-auto text-base bg-white rounded-t select-text">
            <div className="flex flex-row w-full h-auto mb-1">
              {getPrevCourseButton()}
              <h1 className="flex flex-row w-full h-auto transition duration-200 ease-in transform hover:scale-105">
                <div className="w-full h-auto text-2xl font-bold">
                  {inspected.title}
                </div>
              </h1>
              {getAddPrereqButton()}
              <div
                className="ml-auto w-10 h-10 cursor-pointer transform hover:scale-105"
                onClick={clearInspected}
              >
                <XIcon />
              </div>
            </div>
            <div className="flex flex-row items-center font-semibold">
              <div className="flex flex-row">Term :</div>
              <Select
                className="ml-2 w-50"
                options={getTerms().map((term) => {
                  return {
                    label: getTermString(term.year_id, term.semester),
                    value: JSON.stringify(term),
                  };
                })}
                value={{
                  label: getTermString(year, sem),
                  value: JSON.stringify({ year_id: year, semester: sem }),
                }}
                onChange={(event) => handleTermSwitch(event)}
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
