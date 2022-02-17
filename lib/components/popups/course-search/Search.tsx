import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EyeOffIcon } from '@heroicons/react/outline';
import {
  selectYear,
  selectSemester,
  updateSearchStatus,
} from '../../../slices/searchSlice';
import CourseDisplay from './search-results/CourseDisplay';
import Form from './query-components/Form';
import SearchList from './query-components/SearchList';
import { selectPlan } from '../../../slices/currentPlanSlice';
import ReactTooltip from 'react-tooltip';
import { Year } from '../../../resources/commonTypes';

/**
 * Search component for when someone clicks a search action.
 */
const Search: FC = () => {
  // Component states
  const [searchOpacity, setSearchOpacity] = useState<number>(100);
  const [searching, setSearching] = useState<boolean>(false);

  // Redux selectors and dispatch
  const dispatch = useDispatch();
  const searchYear = useSelector(selectYear);
  const searchSemester = useSelector(selectSemester);
  const currentPlan = useSelector(selectPlan);

  /**
   * Gets specific year's name.
   * @returns the year's name
   */
  const getYearName = (): string => {
    let name = '';
    currentPlan.years.forEach((year: Year, index: number) => {
      if (year._id === searchYear) {
        name = year.name;
      }
    });
    return name;
  };

  return (
    <div className="absolute top-0">
      {/* Background Grey */}
      <div
        className="fixed top-0 left-0 z-30 w-full h-screen m-0 transition duration-700 ease-in transform bg-black"
        style={{
          opacity: searchOpacity === 100 ? 0.5 : 0,
        }}
        onClick={() => {
          dispatch(updateSearchStatus(false));
        }}
      ></div>

      {/* Search area */}
      <div
        className={
          'fixed flex flex-col bg-gradient-to-r shadow from-blue-500 to-green-400 select-none rounded z-30 w-9/12 tight:overflow-y-none h-5/6 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 tight:h-auto'
        }
        style={{ opacity: searchOpacity === 100 ? 1 : 0.1 }}
      >
        <div className="px-4 py-2 font-normal text-white select-none text-coursecard">
          Currently selecting for{' '}
          <span className="font-bold text-emphasis">{getYearName()}</span> year,{' '}
          <span className="font-bold text-emphasis">{searchSemester}</span>{' '}
          semester
        </div>
        <div className="flex flex-row w-full h-full tight:flex-col tight:h-auto tight:max-h-mobileSearch text-coursecard tight:overflow-y-scroll">
          <div
            className={
              'flex flex-col rounded-l bg-gray-200 flex-none border-r-2 tight:border-0 border-gray-300 tight:w-auto w-80'
            }
          >
            <div className="h-full overflow-y-auto">
              <Form setSearching={setSearching} />
              <SearchList searching={searching} />
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
          <CourseDisplay />
        </div>
      </div>
    </div>
  );
};

export default Search;
