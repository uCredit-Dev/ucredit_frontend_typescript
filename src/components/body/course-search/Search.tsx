import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SemesterType, YearType } from '../../commonTypes';
import {
  selectYear,
  selectSemester,
  updateSearchStatus,
  updateSearchTime,
} from '../../slices/searchSlice';
import CourseDisplay from './CourseDisplay';
import Form from './Form';
import SearchList from './SearchList';

const years: YearType[] = ['Freshman', 'Sophomore', 'Junior', 'Senior'];
const semester: SemesterType[] = ['Fall', 'Spring', 'Summer', 'Winter'];

// Search component when someone clicks a search action.
const Search = () => {
  // Controls opacity
  const [searchOpacity, setSearchOpacity] = useState<number>(100);

  // Redux selectors and dispatch
  const dispatch = useDispatch();
  const searchYear = useSelector(selectYear);
  const searchSemester = useSelector(selectSemester);

  // For changing the year to add course while in the search popout.
  const handleYearChange = (event: any) => {
    dispatch(
      updateSearchTime({
        searchYear: event.target.value,
        searchSemester: searchSemester,
      })
    );
  };

  // For changing the semester to add course while in the search popout.
  const handleSemesterChange = (event: any) => {
    dispatch(
      updateSearchTime({
        searchYear: searchYear,
        searchSemester: event.target.value,
      })
    );
  };

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
        <div>
          Currently selecting for{' '}
          <select onChange={handleYearChange} defaultValue={searchYear}>
            {years.map((year) => (
              <option value={year}>{year}</option>
            ))}
          </select>{' '}
          year,
          <select onChange={handleSemesterChange} defaultValue={searchSemester}>
            {semester.map((semester) => (
              <option value={semester}>{semester}</option>
            ))}
          </select>{' '}
          semester
        </div>
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
