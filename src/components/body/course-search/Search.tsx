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
import { selectPlan } from "../../slices/currentPlanSlice";

/**
 * Search component for when someone clicks a search action.
 */
const Search = () => {
  // Component states
  const [searchOpacity, setSearchOpacity] = useState<number>(100);
  const [searching, setSearching] = useState<boolean>(false);

  // Redux selectors and dispatch
  const dispatch = useDispatch();
  const searchYear = useSelector(selectYear);
  const searchSemester = useSelector(selectSemester);
  const currentPlan = useSelector(selectPlan);

  // Gets specific year's name.
  const getYearName = (): string => {
    let name = "";
    currentPlan.years.forEach((year) => {
      if (year.year === searchYear) {
        name = year.name;
      }
    });
    return name;
  };

  return (
    <div className="absolute top-0">
      {/* Background Grey */}
      <div
        className="fixed z-20 left-0 top-0 m-0 w-full h-screen bg-black"
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
          "fixed flex flex-col bg-primary rounded z-20 w-9/12 h-5/6 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3"
        }
        style={{ opacity: searchOpacity === 100 ? 1 : 0.1 }}
      >
        <div className="px-4 py-2 text-white text-coursecard font-normal select-none">
          Currently selecting for{" "}
          <span className="text-emphasis font-bold">{getYearName()}</span> year,{" "}
          <span className="text-emphasis font-bold">{searchSemester}</span>{" "}
          semester
        </div>
        <div className="flex w-full h-full text-coursecard">
          <div
            className={
              "flex flex-col rounded-l bg-gray-200 w-4/12 h-full flex-none"
            }
          >
            <Form setSearching={setSearching} />
            <SearchList searching={searching} />
            <div
              className="flex flex-row items-center justify-center p-1 w-full h-8"
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
