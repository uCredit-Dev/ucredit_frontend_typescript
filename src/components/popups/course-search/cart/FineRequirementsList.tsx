import { useState, useEffect, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPlaceholder,
  selectRetrievedCourses,
  selectSearchFilters,
  updateInspectedVersion,
  updatePlaceholder,
} from "../../../../slices/searchSlice";
import CourseCard from "../query-components/CourseCard";
import ReactPaginate from "react-paginate";
import { ReactComponent as PlaceholderFilledSvg } from "../../../../resources/svg/PlaceholderFilled.svg";
import { ReactComponent as PlaceholderEmptySvg } from "../../../../resources/svg/PlaceholderEmpty.svg";
import { ReactComponent as Question } from "../../../../resources/svg/Question.svg";
import { Course, SISRetrievedCourse } from "../../../../resources/commonTypes";
import ReactTooltip from "react-tooltip";
import loading from "../../../../resources/images/loading.gif";
import FineRequirementListItem from "./FineRequirementItem";
import { testRequirements } from "./dummies";

/* 
  List of searched courses.
*/
const FineRequirementsList: FC<{ searching: boolean, updateDummyFilterText: Function }> = (props) => {
  // Component state setup.
  const [pageNum, setPageNum] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);
  const [hideResults, setHideResults] = useState<boolean>(false);
  const [filteredCourses, setFilteredCourses] = useState<SISRetrievedCourse[]>(
    []
  );

  // Redux setup
  const courses = useSelector(selectRetrievedCourses);
  const placeholder = useSelector(selectPlaceholder);
  const searchFilters = useSelector(selectSearchFilters);
  const dispatch = useDispatch();

  const getRequirements = () => {
    // dummy requirements. Figure outthe structure of actual distributions later
    let requirements = testRequirements; // static import
    return requirements.map((requirement) => {
      return <FineRequirementListItem itemRequirement={requirement} onClick={props.updateDummyFilterText}/>
    });
  }

  return (
    <>
      <div
        className="flex flex-row items-center justify-between mb-3 px-5 py-2 w-full h-12 bg-gray-200 border-b border-gray-400"
        data-tip="Hide Search Results"
      >
        <div className="flex flex-row">
          <div className="text-lg font-semibold">Fine Requirements List</div>{" "}
          {window.innerWidth < 800 ? (
            <button
              className="ml-2 focus:outline-none"
              onClick={() => {
                setHideResults(!hideResults);
              }}
            >
              {!hideResults ? "Hide Results" : "Show Results"}
            </button>
          ) : null}
        </div>
      </div>
      {!hideResults || window.innerWidth > 700 ? (
        <div className="py px-5 w-full bg-gray-200 select-none">
          <div className="w-full h-full">
            {true ? ( // fix this later, should be false when there are no results
              <>
                <div className="y-full flex flex-col w-full">
                  {/* This is where list items go */}
                  {getRequirements()}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center mt-24 w-full">
                {props.searching ? (
                  <img src={loading} alt="Searching..." className="h-10"></img>
                ) : (
                  <div className="text-center text-gray-400 text-lg">
                    No requirements.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FineRequirementsList;
