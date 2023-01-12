import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CourseDisplay from './search-results/CourseDisplay';
import { EyeOffIcon } from '@heroicons/react/outline';
import ReactTooltip from 'react-tooltip';
import {
  Course,
  SearchExtras,
  SISRetrievedCourse,
} from '../../../resources/commonTypes';
import { updateInfoPopup, updateShowingCart } from '../../../slices/popupSlice';
import FineRequirementsList from './cart/FineRequirementsList';
import CartCourseList from './cart/CartCourseList';
import { emptyRequirements } from './cart/dummies';
import {
  checkRequirementSatisfied,
  requirements,
  splitRequirements,
} from '../../dashboard/degree-info/distributionFunctions';
import {
  selectCartAdd,
  updateRetrievedCourses,
} from '../../../slices/searchSlice';
import axios from 'axios';
import { getAPI, getParams } from '../../../resources/assets';
import {
  selectCurrentPlanCourses,
  selectSelectedDistribution,
} from '../../../slices/currentPlanSlice';

/**
 * Search component for when someone clicks a search action.
 */
const Cart: FC<{ allCourses: SISRetrievedCourse[] }> = (props) => {
  // Component states
  const [searchOpacity, setSearchOpacity] = useState<number>(100);
  const [searching, setSearching] = useState<boolean>(false);

  // FOR DUMMY FILTER TESTING TODO REMOVE
  // TODO : double check the initial state on this hook. do i even need this if stored in redux?
  const [selectedRequirement, setSelectedRequirement] =
    useState<requirements>(emptyRequirements);
  const [textFilterInputValue, setTextFilterInputValue] = useState<string>('');

  // Redux selectors and dispatch
  const dispatch = useDispatch();
  const distrs = useSelector(selectSelectedDistribution);
  const currentPlanCourses = useSelector(selectCurrentPlanCourses);
  const cartAdd = useSelector(selectCartAdd);

  useEffect(() => {
    if (distrs) {
      const req: requirements = {
        name: distrs.name,
        description: distrs.description,
        expr: distrs.criteria,
        required_credits: distrs.required_credits,
        fulfilled_credits: distrs.planned,
        double_count: distrs.double_count,
        pathing: distrs.pathing,
        wi: distrs.wi,
      };
      setSelectedRequirement(req);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [distrs, currentPlanCourses, cartAdd]);

  // Performing searching in useEffect so as to activate searching
  useEffect(() => {
    setSearching(true);
    updateSelectedRequirement();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRequirement]);

  const updateSelectedRequirement = () => {
    // setLocalRetrievedCourses([]);
    // dispatch(updateRetrievedCourses([]));
    // will find based on selected requirement
    // concern with selecting multiple requirements in a row? how will promises be handled correctly?
    // probably simlar to how seraches are ended prematurely. anyways, just want ot see if this works.

    let splitRequirement = splitRequirements(selectedRequirement.expr);

    // issue here will be making sure to reject all these promises once the component unmounts!!!
    // getall extras
    let allExtras: SearchExtras[] = [];
    let index = 0;
    let ignores = ['(', ')', 'OR', 'AND', 'NOT'];
    while (index < splitRequirement.length) {
      if (!ignores.includes(splitRequirement[index])) {
        allExtras.push(
          generateExtrasFromSplitRequirement(splitRequirement, index),
        );
        index += 2;
      } else {
        index += 1;
      }
    }
    let courses: SISRetrievedCourse[] = [];
    setSearching(false);
    allExtras.forEach(async (extra) => {
      const found = await fineReqFind(extra);
      if (!found) {
        console.log('Course not found!');
      }
      courses = [...courses, ...found[0]];
      courses = courses.filter((sisCourse) => {
        const version = sisCourse.versions[0];
        const course: Course = {
          title: sisCourse.title,
          number: sisCourse.number,
          areas: version.areas,
          term: version.term,
          school: version.school,
          department: version.department,
          credits: version.credits,
          wi: version.wi,
          bio: version.bio,
          tags: version.tags,
          preReq: version.preReq,
          restrictions: version.restrictions,
          level: version.level,
        };
        return checkRequirementSatisfied(selectedRequirement, course);
      });
      dispatch(updateRetrievedCourses(courses));
    });
  };

  const generateExtrasFromSplitRequirement = (
    splitArr: string[],
    index: number,
  ): SearchExtras => {
    let extras: SearchExtras = {
      page: null,
      query: '',
      credits: null,
      areas: null,
      wi: null,
      term: 'All',
      year: 'All',
      department: null,
      tags: null,
      levels: null,
    };
    switch (splitArr[index + 1]) {
      case 'C': // Course Number
        // is there a way to search by course number?
        extras.query = splitArr[index];
        break;
      case 'T': // Tag
        extras.tags = splitArr[index];
        break;
      case 'D': // Department
        extras.department = splitArr[index];
        break;
      case 'A': // Area
        break;
      case 'N': // Name
        extras.query = splitArr[index];
        break;
      case 'W': //Written intensive
        extras.wi = true; // does this work?
        break;
      case 'L': // Level
        // TODO : figure out levels ? factor from distrubitionFunctions.tsx
        // also why is distributionFunctions a tsx file....
        // updatedConcat = handleLCase(splitArr, index, course);
        extras.levels = splitArr[index];
        break;
      default:
        extras.query = splitArr[index];
    }
    return extras;
  };

  const fineReqFind = (
    extras: SearchExtras,
  ): Promise<[SISRetrievedCourse[], number[]]> => {
    return new Promise(async (resolve) => {
      const retrieved: any = await axios
        .get(getAPI(window) + '/cartSearch', {
          params: getParams(extras),
        })
        .catch(() => {
          return [[], []];
        });
      return resolve([retrieved.data.data, []]);
    });
  };

  // for text filter
  const updateTextFilterInputValue = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTextFilterInputValue(e.target.value);
  };

  useEffect(() => {
    ReactTooltip.rebuild();
    ReactTooltip.hide();
  });

  return (
    <div className="absolute top-0 ">
      {/* Background Grey */}
      <div
        className="fixed top-0 left-0 z-40 w-full h-screen m-0 transition duration-700 ease-in transform bg-black "
        style={{
          opacity: searchOpacity === 100 ? 0.5 : 0,
        }}
        onClick={() => {
          dispatch(updateShowingCart(false));
          dispatch(updateInfoPopup(true));
        }}
      ></div>

      {/* Search area */}
      <div
        className={
          'fixed flex flex-col bg-primary select-none rounded z-40 lg:w-[70rem] w-[85%] tight:overflow-y-none h-5/6 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 tight:h-auto overflow-hidden'
        }
        style={{ opacity: searchOpacity === 100 ? 1 : 0.1 }}
      >
        <div className="px-4 py-2 text-white select-none text-coursecard font-large">
          {distrs.name}
          {/** This is the popup header. */}
        </div>
        <div className="flex flex-row w-full h-full tight:flex-col tight:h-auto tight:max-h-mobileSearch text-coursecard tight:overflow-y-scroll overflow-hidden">
          <div
            className={
              'flex flex-col rounded-l bg-gray-200 flex-none border-r-2 tight:border-0 border-gray-300 tight:w-auto w-80'
            }
          >
            <div className="h-full overflow-y-auto">
              <div className="w-full h-auto px-5 pt-3 border-b border-gray-400 select-none text-coursecard">
                <div className="flex flex-row h-auto flex-full">
                  <input
                    autoFocus
                    className="mb-2 mr-2 px-1 w-full h-6 rounded outline-none width-[100%]"
                    type="text"
                    placeholder={'Filter courses by keyword'}
                    value={textFilterInputValue}
                    onChange={updateTextFilterInputValue}
                  />
                </div>
              </div>
              <CartCourseList
                allCourses={props.allCourses} //remove this later
                searching={searching}
                selectedRequirement={selectedRequirement}
                textFilter={textFilterInputValue.toLowerCase()}
              />
            </div>
            <div className="h-full md:h-[0px] overflow-y-auto w-full md:invisible bg-gray-200">
              <CourseDisplay cart={true} />
            </div>
            <div
              className="flex flex-row items-center justify-center w-full h-8 p-1 transition duration-200 ease-in transform hover:scale-125"
              onMouseEnter={() => setSearchOpacity(50)}
              onMouseLeave={() => setSearchOpacity(100)}
              onMouseOver={() => ReactTooltip.rebuild()}
              data-tip="Hide search"
              data-for="godTip"
            >
              <EyeOffIcon className="w-6 h-6 text-gray-500 stroke-2" />
            </div>
          </div>
          <div className="md:h-full h-[0px] overflow-y-auto w-full invisible md:visible bg-gray-200">
            <CourseDisplay cart={true} />
          </div>
          {/** */}

          <div
            className={
              // todo: check styles?
              'flex flex-col rounded-l bg-gray-200 flex-none border-l-2 tight:border-0 border-gray-300 tight:w-auto w-80'
            }
          >
            <div className="h-full overflow-y-auto">
              {/* This is where the courses would go (the left column) */}
              <FineRequirementsList
                searching={false}
                selectRequirement={setSelectedRequirement}
                selectedDistribution={distrs}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
