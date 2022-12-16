import React, { useState, useEffect, FC } from 'react';
import {
  Course,
  Plan,
  ReviewMode,
  Year,
} from '../../../../resources/commonTypes';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateInspectedVersion,
  selectPlaceholder,
  selectVersion,
  updateInspectedCourse,
  updatePlaceholder,
  selectSearchStatus,
} from '../../../../slices/searchSlice';
import Select from 'react-select';
import { all_deps, getAPI, course_tags } from '../../../../resources/assets';
import {
  selectCourseToShow,
  updateCourseToShow,
  updateShowCourseInfo,
} from '../../../../slices/popupSlice';
import {
  selectCurrentPlanCourses,
  selectPlan,
  updateCurrentPlanCourses,
  updateSelectedPlan,
} from '../../../../slices/currentPlanSlice';
import ReactTooltip from 'react-tooltip';
import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
import { XIcon } from '@heroicons/react/outline';
import { selectReviewMode } from '../../../../slices/userSlice';
import clsx from 'clsx';
import { toast } from 'react-toastify';

const departmentFilters = ['none', ...all_deps];
const tagFilters = ['none', ...course_tags];

/**
 * Page for adding a placeholder
 * @prop addCourse - a function that adds the placeholder to the plan.
 */
const Placeholder: FC<{ addCourse: (plan?: Plan) => void }> = (props) => {
  // Redux Setup
  const inspectedVersion = useSelector(selectVersion);
  const courseToShow = useSelector(selectCourseToShow);
  const placeholder = useSelector(selectPlaceholder);
  const searchStatus = useSelector(selectSearchStatus);
  const currentCourses = useSelector(selectCurrentPlanCourses);
  const currentPlan = useSelector(selectPlan);
  const dispatch = useDispatch();

  // Component state setup.
  const [placeholderTitle, setPlaceholderTitle] =
    useState<string>('placeholder');
  const [placeholderArea, setPlaceholderArea] = useState<string>('none');
  const [placeholderCredits, setPlaceholderCredits] = useState<string>('0');
  const [placeholderNumber, setPlaceholderNumber] = useState<string>('');
  const [placeholderDepartment, setPlaceholderDepartment] =
    useState<string>('none');
  const [placeholderTag, setPlaceholderTag] = useState<string>('none');
  const [placeholderWI, setPlaceholderWI] = useState<boolean>(false);
  const [placeholderLevel, setPlaceholderLevel] = useState<string>('none');

  const reviewMode = useSelector(selectReviewMode);

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  // Updates placeholder information everytime inspected course changes.
  useEffect(() => {
    if (placeholder && inspectedVersion !== 'None') {
      setPlaceholderArea(inspectedVersion.areas);
      setPlaceholderTitle(inspectedVersion.title);
      setPlaceholderCredits(inspectedVersion.credits);
      setPlaceholderNumber(inspectedVersion.number);
      setPlaceholderDepartment(inspectedVersion.department);
      setPlaceholderTag(inspectedVersion.tags[0]);
      setPlaceholderWI(inspectedVersion.wi);
      setPlaceholderLevel(
        inspectedVersion.level ? inspectedVersion.level : 'none',
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inspectedVersion]);

  // On placeholder title change
  const onPTChange = (event: any) => {
    const title = event.target.value;
    setPlaceholderTitle(title);
    if (inspectedVersion !== 'None') {
      const inspCopy: Course = { ...inspectedVersion, title: title };
      dispatch(updateInspectedVersion(inspCopy));
    }
  };

  // On placeholder area change
  const onPAChange = (event: any) => {
    const area = event.value;
    setPlaceholderArea(area);
    if (inspectedVersion !== 'None') {
      const inspectedCourseCopy: Course = { ...inspectedVersion, areas: area };
      dispatch(updateInspectedVersion(inspectedCourseCopy));
    }
  };

  // On placeholder credits change
  const onPCChange = (event: any) => {
    const cred = event.value;
    setPlaceholderCredits(cred);
    if (inspectedVersion !== 'None') {
      const inspCopy: Course = { ...inspectedVersion, credits: cred };
      dispatch(updateInspectedVersion(inspCopy));
    }
  };

  // On placeholder number change
  const onPNChange = (event: any) => {
    const num = event.target.value;
    setPlaceholderNumber(num);
    if (inspectedVersion !== 'None') {
      const inspCopy: Course = { ...inspectedVersion, number: num };
      dispatch(updateInspectedVersion(inspCopy));
    }
  };

  // On placeholder department change
  const onPDChange = (event: any) => {
    const dep = event.value;
    setPlaceholderDepartment(dep);
    if (inspectedVersion !== 'None') {
      const inspCopy: Course = { ...inspectedVersion, department: dep };
      console.log(inspCopy, 3);
      dispatch(updateInspectedVersion(inspCopy));
    }
  };

  // On placeholder tag change
  const onPTagChange = (event: any) => {
    const tag = event.value;
    setPlaceholderTag(tag);
    if (inspectedVersion !== 'None') {
      const inspCopy: Course = {
        ...inspectedVersion,
        // tags: [...inspectedVersion.tags, tag],
        tags: [tag],
      };
      dispatch(updateInspectedVersion(inspCopy));
    }
  };

  // On placeholder tag change
  const onWIChange = (event: any) => {
    const wi = event.value;
    setPlaceholderWI(wi);
    if (inspectedVersion !== 'None') {
      const inspCopy: Course = {
        ...inspectedVersion,
        wi: wi,
      };
      dispatch(updateInspectedVersion(inspCopy));
    }
  };

  // On placeholder tag change
  const onLevelChange = (event: any) => {
    const level = event.value;
    setPlaceholderLevel(level);
    if (inspectedVersion !== 'None') {
      const inspCopy: Course = {
        ...inspectedVersion,
        level: level === 'none' ? '' : level,
      };
      dispatch(updateInspectedVersion(inspCopy));
    }
  };

  // Clears inspected course.
  const clearInspected = (): void => {
    dispatch(updatePlaceholder(false));
    dispatch(updateCourseToShow(null));
    dispatch(updateShowCourseInfo(false));
    dispatch(updateInspectedCourse('None'));
    dispatch(updateInspectedVersion('None'));
  };

  /**
   * Updates course by deleting old version and posting new.
   */
  const updateCourse = (): void => {
    if (courseToShow !== null) {
      fetch(getAPI(window) + '/courses/' + courseToShow._id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((retrieved) => {
        retrieved.json().then(handleUpdateResponse);
      });
    }
  };

  const handleUpdateResponse = (data: any): void => {
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
          if (course === courseToShow) {
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

  return (
    <div className="flex flex-col h-full py-4 pl-8 font-medium bg-gray-100">
      <div className="flex flex-row items-center w-full">
        <div className="mr-auto text-2xl">Add a placeholder</div>
        <button
          className="pl-16 mr-10 text-2xl transition duration-200 ease-in transform focus:outline-none hover:scale-110"
          onClick={clearInspected}
        >
          <XIcon className="stroke-2 w-7 h-7" />
        </button>
      </div>
      <div className="flex flex-col flex-wrap pb-5 min-h-[20rem] h-full">
        <div className="flex flex-col w-2/6 mt-3">
          Title
          <input
            className="p-1 mt-1 focus:outline-none"
            onChange={onPTChange}
            value={placeholderTitle}
          ></input>
        </div>
        <div className="flex flex-col w-2/6 mt-2">
          Number
          <input
            className="p-1 mt-1 focus:outline-none"
            onChange={onPNChange}
            value={placeholderNumber}
          ></input>
        </div>
        <div className="flex flex-col w-56 mt-2">
          Department
          <Select
            options={[
              ...departmentFilters.map((department) => ({
                value: department,
                label: department,
              })),
            ]}
            className="mt-1"
            onChange={onPDChange}
            value={{
              value: placeholderDepartment,
              label: placeholderDepartment,
            }}
          />
        </div>
        <div className="flex flex-col w-1/6 mt-2">
          <div className="flex flex-row">
            Tag
            <div className="flex-grow">
              <QuestionMarkCircleIcon
                className="h-4 fill-gray"
                data-for="godTip"
                data-tip={
                  '<p>Many degree and a few courses require students to complete a specific amount of courses under a certain tag.</p><p>These usually come in the form of 3-4 letters designating department (ie. CSC = Computer Science) followed by 2+ letters signalling the specific subgroup designation within the department (ie. SOFT = Software).</p>'
                }
              />
            </div>
          </div>
          <Select
            options={[
              ...tagFilters.map((tag: any) => ({ label: tag, value: tag })),
            ]}
            className="w-40 mt-1 rounded outline-none"
            onChange={onPTagChange}
            value={{
              value: placeholderTag,
              label: placeholderTag,
            }}
          />
        </div>
        <div className="flex flex-col w-20 mt-2">
          Credits
          <Select
            onChange={onPCChange}
            options={[
              '0',
              '0.5',
              '1',
              '1.5',
              '2',
              '2.5',
              '3',
              '3.5',
              '4',
              '4.5',
              '5',
              '5.5',
              '6',
              '6.5',
              '7',
              '7.5',
              '8',
            ].map((cred: any) => ({ label: cred, value: cred }))}
            className="mt-1"
            value={{
              label: placeholderCredits,
              value: placeholderCredits,
            }}
          />
        </div>
        <div className="flex flex-col w-1/6 mt-2">
          <div className="flex flex-row">
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
          </div>
          <Select
            options={['None', 'N', 'S', 'H', 'E', 'Q'].map((area: any) => ({
              label: area,
              value: area,
            }))}
            className="w-40 mt-1 rounded outline-none"
            onChange={onPAChange}
            value={{ label: placeholderArea, value: placeholderArea }}
          />
          <div className="w-40 mt-1">Writing Intensive</div>
          <Select
            options={[true, false].map((option: boolean) => ({
              label: option ? 'Yes' : 'No',
              value: option,
            }))}
            className="w-40 mt-1 rounded outline-none"
            onChange={onWIChange}
            value={{
              label: placeholderWI ? 'Yes' : 'No',
              value: placeholderWI,
            }}
          />
          <div className="w-40 mt-1">Level</div>
          <Select
            options={[
              'Lower Level Undergraduate',
              'Upper Level Undergraduate',
              'none',
            ].map((option: string) => ({
              label: option,
              value: option,
            }))}
            className="w-40 mt-1 rounded outline-none"
            onChange={onLevelChange}
            value={{
              label: placeholderLevel,
              value: placeholderLevel,
            }}
          />
        </div>
      </div>
      {searchStatus ? (
        <button
          className={clsx(
            {
              'bg-slate-300 hover:bg-slate-300': reviewMode === ReviewMode.View,
            },
            'p-1 mr-0 text-white transition duration-200 ease-in transform rounded w-28 hover:bg-secondary bg-primary focus:outline-none hover:scale-105',
          )}
          onClick={() => {
            if (
              !placeholderTitle ||
              !placeholderNumber ||
              !placeholderCredits ||
              !placeholderArea ||
              !placeholderLevel
            ) {
              toast.error('You cannot leave fields empty!');
            } else if (placeholderLevel === 'none') {
              toast.error('Please specify Level!');
            } else {
              props.addCourse();
            }
          }}
          disabled={reviewMode === ReviewMode.View}
        >
          Add Course
        </button>
      ) : (
        <button
          className={clsx(
            { 'bg-slate-300': reviewMode === ReviewMode.View },
            'p-1 mr-0 text-white transition duration-200 ease-in transform rounded w-28 bg-secondary focus:outline-none hover:scale-105',
          )}
          onClick={updateCourse}
          disabled={reviewMode === ReviewMode.View}
        >
          Update Course
        </button>
      )}
    </div>
  );
};

export default Placeholder;
