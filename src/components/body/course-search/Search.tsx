import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSearchterm,
  selectYear,
  selectSemester,
  updateSearchStatus,
} from '../../slices/searchSlice';

const Search = () => {
  const [searchOpacity, setSearchOpacity] = useState<number>(100);
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchterm);
  const searchYear = useSelector(selectYear);
  const searchSemester = useSelector(selectSemester);
  return (
    <>
      <div
        className={`fixed bg-gray-500 bg-opacity-${
          searchOpacity === 100 ? 75 : 0
        }`}
        style={popupZoneStyle}
        onClick={() => {
          dispatch(updateSearchStatus(false));
        }}
      ></div>
      <div
        className={`fixed bg-red-200 rounded-xl p-8 md:p-0 opacity-${searchOpacity}`}
        style={searchBodyStyle}
      >
        Currently selecting for {searchSemester + ', ' + searchYear}
        <div>
          <form>
            <p>
              Course:
              <input
                type="text"
                placeholder={
                  'Enter in course title or number (ie. Physics, 601.280, etc.)'
                }
              ></input>
            </p>
            <label>
              Filters:
              <p>
                <select>
                  <option>None</option>
                </select>
              </p>
              <p>
                <select placeholder="None"></select>
              </p>
            </label>
          </form>
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
      </div>
    </>
  );
};

const popupZoneStyle = {
  width: '100%',
  height: '100%',
} as React.CSSProperties;

const searchBodyStyle = {
  top: '18%',
  left: '12.5%',
  width: '75%',
  height: '75%',
} as React.CSSProperties;

export default Search;
