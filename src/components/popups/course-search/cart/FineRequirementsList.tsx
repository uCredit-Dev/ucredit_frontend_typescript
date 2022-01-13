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
import { requirements } from "../../../dashboard/degree-info/distributionFunctions";

/* 
  List of searched courses.
*/
const FineRequirementsList: FC<{ searching: boolean, selectRequirement: Function, selectedDistribution: [string, requirements[]] }> = (props) => {
  // Component state setup.
  const [hideResults, setHideResults] = useState<boolean>(false);

  const [selectedListItem, setSelectedListItem] = useState<number>(-1);

  // Redux setup
  const courses = useSelector(selectRetrievedCourses);
  const placeholder = useSelector(selectPlaceholder);
  const searchFilters = useSelector(selectSearchFilters);
  const dispatch = useDispatch();

  const selectRequirement = (requirement: requirements, i: number) => {
    props.selectRequirement(requirement);
    setSelectedListItem(i);
    console.log(i);
  }

  const getRequirements = () => {
    // dummy requirements. Figure outthe structure of actual distributions later

    // // if the distribution is pathing, show a dropdown menu rather than a single list?
    // if (props.selectedDistribution[1][0].pathing) {
    //   return <FineReuqi
    // }
    return props.selectedDistribution[1].map((requirement, i) => {
      if (i == 0) return <></> // TODO : better key
      return <FineRequirementListItem id={i} itemRequirement={requirement} onClick={selectRequirement} selected={i === selectedListItem} />
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
            <div className="y-full flex flex-col w-full">
              {/* This is where list items go */}
              {getRequirements()}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FineRequirementsList;
