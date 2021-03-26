import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectYear,
  selectSemester,
  updateSearchStatus,
} from '../../slices/searchSlice';
import CourseDisplay from './CourseDisplay';
import Form from './Form';
import SearchList from './SearchList';

// Search component when someone clicks a search action.
const Search = () => {
  // Controls opacity
  const [searchOpacity, setSearchOpacity] = useState<number>(100);

  // Redux selectors and dispatch
  const dispatch = useDispatch();
  const searchYear = useSelector(selectYear);
  const searchSemester = useSelector(selectSemester);

  return (
    <>
      {/* Search area */}
      <div
        className={`fixed bg-gray-500`}
        style={{
          ...popupZoneStyle,
          opacity: searchOpacity === 100 ? 75 / 100 : 0,
        }}
        onClick={() => {
          dispatch(updateSearchStatus(false));
        }}
      ></div>

      {/* Background Grey */}
      <div
        className={`flex fixed bg-red-200 rounded-xl p-8 md:p-0`}
        style={{ ...searchBodyStyle, opacity: searchOpacity / 100 }}
      >
        Currently selecting for {searchYear + ' ' + searchSemester}
        <div className={`flex flex-1 bg-white rounded-xl p-8 md:p-0`}>
          <div
            className={'flex flex-col rounded-xl  bg-gray-200'}
            style={{ width: '40%', height: '100%' }}
          >
            <Form />
            <SearchList />
            <button
              onMouseEnter={() => {
                setSearchOpacity(50);
              }}
              onMouseLeave={() => {
                setSearchOpacity(100);
              }}
            >
              Hide search
            </button>
          </div>
          <CourseDisplay />
        </div>
      </div>
    </>
  );
};

const popupZoneStyle = {
  position: 'fixed',
  width: '100%',
  height: '100%',
} as React.CSSProperties;

const searchBodyStyle = {
  top: '18%',
  left: '12.5%',
  width: '75%',
  height: '75%',
  flexDirection: 'column',
} as React.CSSProperties;

export default Search;
