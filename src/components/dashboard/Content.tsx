import React from "react";
import CourseList from "./course-list/CourseList";
import Search from "./course-search/Search";
import { selectSearchStatus } from "../../slices/searchSlice";
import {
  selectAddingPlanStatus,
  selectDeletePlanStatus,
  selectDeleteYearStatus,
} from "../../slices/userSlice";
import { useSelector } from "react-redux";
import InfoCards from "./right-column-info/InfoCards";
import DeletePlanPopup from "./DeletePlanPopup";
import Distributions from "./right-column-info/Distributions";
import PlanAdd from "./PlanAdd";
import DeleteYearPopup from "./DeleteYearPopup";

/**
 * Holds all dashboard components.
 */
function Content() {
  // Redux setup.
  const searching = useSelector(selectSearchStatus);
  const deletePlanStatus = useSelector(selectDeletePlanStatus);
  const addPlanStatus = useSelector(selectAddingPlanStatus);
  const deleteYearStatus = useSelector(selectDeleteYearStatus);

  return (
    <>
      <div className="flex flex-row thin:flex-wrap-reverse mt-content medium:px-48 h-full">
        <div className="flex-grow h-auto">
          <CourseList />
        </div>
        <div className="flex flex-col ml-auto mr-auto my-4 w-coursebars h-auto">
          <div className="hover:scale-101 ml-4 mr-4">
            <InfoCards />
          </div>
          <Distributions />
        </div>
      </div>
      {searching ? <Search /> : null}
      {deletePlanStatus ? <DeletePlanPopup /> : null}
      {addPlanStatus ? <PlanAdd /> : null}
      {deleteYearStatus ? <DeleteYearPopup /> : null}
    </>
  );
}

export default Content;
