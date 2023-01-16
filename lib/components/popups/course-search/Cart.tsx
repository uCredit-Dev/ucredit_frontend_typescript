import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CourseDisplay from './search-results/CourseDisplay';
import { EyeOffIcon } from '@heroicons/react/outline';
import ReactTooltip from 'react-tooltip';
import { SISRetrievedCourse } from '../../../resources/commonTypes';
import { updateInfoPopup, updateShowingCart } from '../../../slices/popupSlice';
import FineRequirementsList from './cart/FineRequirementsList';
import CartCourseList from './cart/CartCourseList';
import {
  selectCartAdd,
  selectPageIndex,
  updatePageCount,
  updatePageIndex,
  updateRetrievedCourses,
} from '../../../slices/searchSlice';
import axios from 'axios';
import { getAPI } from '../../../resources/assets';
import {
  selectCurrentPlanCourses,
  selectSelectedDistribution,
  selectSelectedFineReq,
} from '../../../slices/currentPlanSlice';

/**
 * Search component for when someone clicks a search action.
 */
const Cart: FC<{}> = () => {
  // Component states
  const [searchOpacity, setSearchOpacity] = useState<number>(100);
  const [searching, setSearching] = useState<boolean>(false);

  // FOR DUMMY FILTER TESTING TODO REMOVE
  // TODO : double check the initial state on this hook. do i even need this if stored in redux?
  const [cartFilter, setCartFilter] = useState<string>('');
  const [textFilterInputValue, setTextFilterInputValue] = useState<string>('');

  // Redux selectors and dispatch
  const dispatch = useDispatch();
  const dist = useSelector(selectSelectedDistribution);
  const fine = useSelector(selectSelectedFineReq);
  const currentPlanCourses = useSelector(selectCurrentPlanCourses);
  const cartAdd = useSelector(selectCartAdd);
  const pageIndex = useSelector(selectPageIndex);

  useEffect(() => {
    if (dist) {
      setCartFilter(dist.criteria);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dist, currentPlanCourses, cartAdd]);

  useEffect(() => {
    if (fine) {
      setCartFilter(fine.criteria);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fine, currentPlanCourses, cartAdd]);

  // Performing searching in useEffect so as to activate searching
  useEffect(() => {
    setSearching(true);
    dispatch(updatePageIndex(0));
    cartSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartFilter]);

  // Performing searching in useEffect so as to activate searching
  useEffect(() => {
    setSearching(true);
    cartSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex]);

  const cartSearch = () => {
    fineReqFind(cartFilter, pageIndex).then((courses: SISRetrievedCourse[]) => {
      if (!courses) {
        console.log('Course not found!');
      }
      dispatch(updateRetrievedCourses(courses));
      setSearching(false);
    });
  };

  const fineReqFind = (
    expr: string,
    page: number,
  ): Promise<SISRetrievedCourse[]> => {
    return new Promise(async (resolve) => {
      const retrieved: any = await axios
        .get(getAPI(window) + '/cartSearch', {
          params: { expr, page },
        })
        .catch(() => {
          return [];
        });
      dispatch(updatePageCount(retrieved.data.data.pagination.last));
      return resolve(retrieved.data.data.courses);
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
          {dist.name}
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
                searching={searching}
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
              <FineRequirementsList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
