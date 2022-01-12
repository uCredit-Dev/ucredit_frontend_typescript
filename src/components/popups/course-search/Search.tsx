import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectYear,
  selectSemester,
  updateSearchStatus,
} from '../../../slices/searchSlice';
import CourseDisplay from './search-results/CourseDisplay';
import Form from './query-components/Form';
import SearchList from './query-components/SearchList';
import { ReactComponent as HideSvg } from '../../../resources/svg/Hide.svg';
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
        className="fixed z-20 left-0 top-0 m-0 w-full h-screen bg-black transform transition duration-700 ease-in"
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
          'fixed flex flex-col bg-gradient-to-r shadow from-blue-500 to-green-400 select-none rounded z-20 w-9/12 tight:overflow-y-none h-5/6 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 tight:h-auto'
        }
        style={{ opacity: searchOpacity === 100 ? 1 : 0.1 }}
      >
        <div className="px-4 py-2 text-white text-coursecard font-normal select-none">
          Currently selecting for{' '}
          <span className="text-emphasis font-bold">{getYearName()}</span> year,{' '}
          <span className="text-emphasis font-bold">{searchSemester}</span>{' '}
          semester
        </div>
        <div className="flex tight:flex-col flex-row w-full tight:h-auto h-full tight:max-h-mobileSearch text-coursecard tight:overflow-y-scroll">
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
        </div>
      </div>
    </div>
  );
};

export default Search;
