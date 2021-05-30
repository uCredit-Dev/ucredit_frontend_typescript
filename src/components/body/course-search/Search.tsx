import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectYear,
  selectSemester,
  updateSearchStatus,
} from "../../slices/searchSlice";
import CourseDisplay from "./search-results/CourseDisplay";
import Form from "./query-components/Form";
import SearchList from "./query-components/SearchList";
import { ReactComponent as HideSvg } from "../../svg/Hide.svg";

/* 
  Search component when someone clicks a search action./* 
*/
const Search = () => {
  // Controls opacity
  const [searchOpacity, setSearchOpacity] = useState<number>(100);

  // Redux selectors and dispatch
  const dispatch = useDispatch();
  const searchYear = useSelector(selectYear);
  const searchSemester = useSelector(selectSemester);

  return (
    <div className="absolute top-0">
      {/* Background Grey */}
      <div
        className="fixed top-0 left-0 z-20 w-full h-screen m-0 bg-black"
        style={{
          opacity: searchOpacity === 100 ? 0.5 : 0,
        }}
        onClick={() => {
          dispatch(updateSearchStatus(false));
        }}
      ></div>

      {/* Search area */}
      {/* {"flex fixed bg-red-200 rounded-xl p-8 md:p-0 z-20"} */}
      <div
        className={
          "fixed flex flex-col bg-primary rounded z-20 w-9/12 h-5/6 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3"
        }
        style={{ opacity: searchOpacity === 100 ? 1 : 0.1 }}
      >
        <div className="px-4 py-2 font-normal text-white select-none text-coursecard">
          Currently selecting for{" "}
          <span className="font-bold text-emphasis">{searchYear}</span> year,{" "}
          <span className="font-bold text-emphasis">{searchSemester}</span>{" "}
          semester
        </div>
        <div className="flex w-full h-full text-coursecard">
          <div
            className={
              "flex flex-col rounded-l bg-gray-200 w-4/12 h-full flex-none"
            }
          >
            <Form />
            <SearchList />
            <div
              className="flex flex-row items-center justify-center w-full h-8 p-1"
              onMouseEnter={() => setSearchOpacity(50)}
              onMouseLeave={() => setSearchOpacity(100)}
              data-tip="Hide search"
            >
              <HideSvg className="w-6 h-6 stroke-2" />
            </div>
          </div>
          <CourseDisplay />
        </div>
      </div>
    </div>
  );
};

export default Search;
