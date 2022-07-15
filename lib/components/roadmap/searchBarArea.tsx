import { useDispatch } from 'react-redux';
import { RiMapPin2Fill } from 'react-icons/ri';
import {
  updateSearchText,
  toggleMobileAdvSearch,
  selectMobileAdvSearch,
} from '../../slices/roadmapSearchSlice';
import SearchBar from './searchBar';
import { useSelector } from 'react-redux';
import React from 'react';

const SearchBarArea: React.FC = () => {
  const mobileAdvSearch = useSelector(selectMobileAdvSearch);

  const advToolsClass = () => {
    if (mobileAdvSearch) {
      return '';
    } else {
      return 'hidden';
    }
  };

  const oppositeAdvToolsClass = () => {
    if (mobileAdvSearch) {
      return 'hidden';
    } else {
      return '';
    }
  };

  const mainSearchBarPlaceholder = () => {
    if (mobileAdvSearch) {
      return 'Search Keywords';
    } else {
      return 'Search';
    }
  };

  const dispatch = useDispatch();

  const onSearchInput = (evt: any) => {
    dispatch(updateSearchText(evt.target.value));
  };

  const onAdvSearchToggle = (evt: any) => {
    dispatch(toggleMobileAdvSearch());
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-60
    md:bg-roadmap-pattern bg-white"
    >
      <div className="flex flex-row">
        <RiMapPin2Fill size={36} color="#94B6CC" className="hidden md:block" />
        <h2
          className={`text-blue-900 text-4xl pl-2 md:block
        ${oppositeAdvToolsClass()}`}
        >
          uCredit Road Map
        </h2>
      </div>
      <div className="sticky top-20 w-5/6 md:w-1/2">
        <SearchBar
          iconSize={28}
          onInputProp={onSearchInput}
          placeHolder={mainSearchBarPlaceholder()}
          heightClass="h-10 md:h-12"
          iconPosition="left-2 md:left-3"
        />
        <div className="md:hidden">
          <button
            className={`text-center underline text-blue-600
          w-full md:hidden mb-4 ${oppositeAdvToolsClass()}`}
            onClick={onAdvSearchToggle}
          >
            Show advanced search tools
          </button>
          <div className={`${advToolsClass()}`}>
            <SearchBar
              iconSize={28}
              placeHolder="Search Tags"
              heightClass="h-10 md"
              iconPosition="left-2"
              onInputProp={onSearchInput}
            />
            <SearchBar
              iconSize={28}
              placeHolder="Search Majors"
              heightClass="h-10 md"
              iconPosition="left-2"
              onInputProp={onSearchInput}
            />
            <div>
              <p className="relative left-2 inline-block">
                <input type="checkbox" className="mr-2" />
                My favorites only
              </p>
              <button
                className="text-center underline text-gray-500
              md:hidden float-right"
                onClick={onAdvSearchToggle}
              >
                Collapse
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBarArea;
