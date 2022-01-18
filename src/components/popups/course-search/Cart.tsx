import React, { FC, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CourseDisplay from './search-results/CourseDisplay';
import { ReactComponent as HideSvg } from '../../../resources/svg/Hide.svg';
import ReactTooltip from 'react-tooltip';
import { SISRetrievedCourse } from '../../../resources/commonTypes';
import { selectSelectedDistribution, updateShowingCart } from '../../../slices/popupSlice';
import FineRequirementsList from './cart/FineRequirementsList';
import CartCourseList from './cart/CartCourseList';
import { emptyRequirements } from './cart/dummies';
import { requirements } from '../../dashboard/degree-info/distributionFunctions';

/**
 * Search component for when someone clicks a search action.
 */
const Cart: FC<{ allCourses: SISRetrievedCourse[] }> = (props) => {
  // Component states
  const [searchOpacity, setSearchOpacity] = useState<number>(100);

  // FOR DUMMY FILTER TESTING TODO REMOVE
  // TODO : double check the initial state on this hook. do i even need this if stored in redux?
  const [selectedRequirement, setSelectedRequirement] = useState<requirements>(emptyRequirements);
  const [textFilterInputValue, setTextFilterInputValue] = useState<string>("");

  // Redux selectors and dispatch
  const dispatch = useDispatch();
  const distrs = useSelector(selectSelectedDistribution);
  const updateSelectedRequirement = (newRequirement: requirements) => { 
    setSelectedRequirement(newRequirement);
  }
  const updateTextFilterInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextFilterInputValue(e.target.value);
  }

  return (
    <div className="absolute top-0">
      {/* Background Grey */}
      <div
        className="fixed z-40 left-0 top-0 m-0 w-full h-screen bg-black transform transition duration-700 ease-in"
        style={{
          opacity: searchOpacity === 100 ? 0.5 : 0,
        }}
        onClick={() => { // clicking off, should reset all things
          // TODO: make sure proper things rae reset
          dispatch(updateShowingCart(false));
        }}
      ></div>

      {/* Search area */}
      <div
        className={
          "fixed flex flex-col bg-gradient-to-r shadow from-blue-500 to-green-400 select-none rounded z-40 w-9/12 tight:overflow-y-none h-5/6 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 tight:h-auto"
        }
        style={{ opacity: searchOpacity === 100 ? 1 : 0.1 }}
      >
        <div className="px-4 py-2 text-white text-coursecard font-large select-none">
          {distrs[0]}
          {/** This is the popup header. */}
        </div>
        <div className="flex tight:flex-col flex-row w-full tight:h-auto h-full tight:max-h-mobileSearch text-coursecard tight:overflow-y-scroll">
          <div
            className={
              "flex flex-col rounded-l bg-gray-200 flex-none border-r-2 tight:border-0 border-gray-300 tight:w-auto w-80"
            }
          >
            <div className="h-full overflow-y-auto">
              <div className="pt-3 px-5 w-full h-auto text-coursecard border-b border-gray-400 select-none">
                <div className="flex-full flex flex-row h-auto">
                  <input
                    autoFocus
                    className="mb-2 mr-2 px-1 w-full h-6 rounded outline-none width-[100%]"
                    type="text"
                    placeholder={'Filter courses by keyword'}
                    defaultValue={textFilterInputValue}
                    value={textFilterInputValue}
                    onChange={updateTextFilterInputValue}
                  />
                </div>
              </div>
              <CartCourseList
                allCourses={props.allCourses} //remove this later
                searching={false}
                selectedRequirement={selectedRequirement}
                textFilter={textFilterInputValue.toLowerCase()}
              />
            </div>

            <div
              className="flex flex-row items-center justify-center p-1 w-full h-8 transform hover:scale-125 transition duration-200 ease-in"
              onMouseEnter={() => setSearchOpacity(50)}
              onMouseLeave={() => setSearchOpacity(100)}
              onMouseOver={() => ReactTooltip.rebuild()}
              data-tip="Hide search"
              data-for="godTip"
            >
              <HideSvg className="w-6 h-6 text-gray-500 stroke-2" />
            </div>
          </div>
          <CourseDisplay />
          {/** */}
          <div
            className={ // todo: check styles?
              "flex flex-col rounded-l bg-gray-200 flex-none border-l-2 tight:border-0 border-gray-300 tight:w-auto w-80"
            }
          >
            <div className="h-full overflow-y-auto">
              {/* This is where the courses would go (the left column) */}
              <FineRequirementsList
                searching={false}
                selectRequirement={updateSelectedRequirement}
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
