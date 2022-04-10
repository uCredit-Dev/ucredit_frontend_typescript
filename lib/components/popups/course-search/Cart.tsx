import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CourseDisplay from './search-results/CourseDisplay';
import { EyeOffIcon } from '@heroicons/react/outline';
import ReactTooltip from 'react-tooltip';
import {
  SearchExtras,
  SISRetrievedCourse,
} from '../../../resources/commonTypes';
import {
  selectSelectedDistribution,
  updateShowingCart,
} from '../../../slices/popupSlice';
import FineRequirementsList from './cart/FineRequirementsList';
import CartCourseList from './cart/CartCourseList';
import { emptyRequirements } from './cart/dummies';
import {
  requirements,
  splitRequirements,
} from '../../dashboard/degree-info/distributionFunctions';
import { updateRetrievedCourses } from '../../../slices/searchSlice';
import axios from 'axios';
import { getAPI } from '../../../resources/assets';

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

  useEffect(() => {
    if (distrs[1] && distrs[1].length > 0) {
      setSelectedRequirement(distrs[1][0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [distrs]);

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
      dispatch(updateRetrievedCourses(courses));
    });
  };

  const generateExtrasFromSplitRequirement = (
    splitArr: string[],
    index: number,
  ): SearchExtras => {
    let extras: SearchExtras = {
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
        extras.query = 'djaskdlfjaslkdfjsaodkfjasoidf jasdkflajsdlfksa';
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
      // let courses: SISRetrievedCourse[] = [...courseCache]; // how actively is this cache updated?
      // if (!retrievedAll) { // how often is this filter used?
      const retrieved: any = await axios
        .get(getAPI(window) + '/search', {
          params: getParams(extras),
        })
        .catch(() => {
          return [[], []];
        });
      let SISRetrieved: SISRetrievedCourse[] = processedRetrievedData(
        retrieved.data.data,
        extras,
      );
      return resolve([SISRetrieved, []]);
      // } else {
      //   const filterProcessing = filterCourses(extras, courses);
      //   if (filterProcessing) return filterProcessing;
      //   return resolve([courses, []]);
      // }
    });
  };

  const processedRetrievedData = (
    data: SISRetrievedCourse[],
    extras: SearchExtras,
  ): SISRetrievedCourse[] => {
    let SISRetrieved: SISRetrievedCourse[] = data;
    if (extras.areas === 'N')
      // TODO: backend searches for courses with "None" area. Fix this.
      SISRetrieved = SISRetrieved.filter((course) => {
        for (let version of course.versions) {
          if (version.areas === 'N') return true;
        }
        return false;
      });
    // need some logic here to make sure all the courses are finished being found? since we're running
    // multiple finds.
    // if (
    //   extras.query.length <= minLength ||
    //   searchTerm.length - extras.query.length >= 2
    // ) {
    //   props.setSearching(false);
    // }
    return SISRetrieved;
  };

  // TODO : this is copied from Form.tsx. refactor inthe future
  const getParams = (extras: SearchExtras) => ({
    query: extras.query,
    department: extras.department,
    term: extras.term === 'All' ? '' : extras.term,
    areas: extras.areas,
    credits: extras.credits,
    wi: extras.wi,
    tags: extras.tags,
    level: extras.levels,
  });

  // for text filter
  const updateTextFilterInputValue = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTextFilterInputValue(e.target.value);
  };

  return (
    <div className="absolute top-0">
      {/* Background Grey */}
      <div
        className="fixed top-0 left-0 z-40 w-full h-screen m-0 transition duration-700 ease-in transform bg-black"
        style={{
          opacity: searchOpacity === 100 ? 0.5 : 0,
        }}
        onClick={() => dispatch(updateShowingCart(false))}
      ></div>

      {/* Search area */}
      <div
        className={
          'fixed flex flex-col bg-primary select-none rounded z-40 w-9/12 tight:overflow-y-none h-5/6 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 tight:h-auto'
        }
        style={{ opacity: searchOpacity === 100 ? 1 : 0.1 }}
      >
        <div className="px-4 py-2 text-white select-none text-coursecard font-large">
          {distrs[0]}
          {/** This is the popup header. */}
        </div>
        <div className="flex flex-row w-full h-full tight:flex-col tight:h-auto tight:max-h-mobileSearch text-coursecard tight:overflow-y-scroll">
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
          <div className="min-h-80">
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
