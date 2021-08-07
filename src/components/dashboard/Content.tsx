import React, { useEffect } from "react";
import CourseList from "./course-list/CourseList";
import Search from "../popups/course-search/Search";
import { selectSearchStatus } from "../../slices/searchSlice";
import { useSelector } from "react-redux";
import InfoCards from "./right-column-info/InfoCards";
import DeletePlanPopup from "../popups/DeletePlanPopup";
import Distributions from "./right-column-info/Distributions";
import PlanAdd from "./PlanAdd";
import DeleteYearPopup from "../popups/DeleteYearPopup";
import PlanChoose from "./right-column-info/PlanChoose";
import InfoMenu from "./InfoMenu";
import {
  selectDeletePlanStatus,
  selectAddingPlanStatus,
  selectDeleteYearStatus,
  selectCourseToDelete,
  selectImportingStatus,
} from "../../slices/currentPlanSlice";
import DeleteCoursePopup from "../popups/DeleteCoursePopup";

/**
 * Holds all dashboard components.
 */
function Content() {
  // Redux setup.
  const searching = useSelector(selectSearchStatus);
  const deletePlanStatus = useSelector(selectDeletePlanStatus);
  const addPlanStatus = useSelector(selectAddingPlanStatus);
  const deleteYearStatus = useSelector(selectDeleteYearStatus);
  const deleteCourseStatus = useSelector(selectCourseToDelete);
  const importingStatus = useSelector(selectImportingStatus);

  return (
    // <div className="flex flex-row flex-wrap-reverse mt-content medium:px-48 h-full">
    <>
      <div className="flex flex-row">
        <div className="flex flex-row thin:flex-wrap-reverse mt-content medium:px-10 px-5 w-full h-full">
          <div className="flex flex-col flex-grow h-auto">
            <PlanChoose />
            <CourseList />
          </div>

          {window.innerWidth > 1600 ? (
            <div className="flex flex-col flex-wrap ml-auto mr-16 w-coursebars h-auto">
              <InfoCards />
              <Distributions />
            </div>
          ) : null}
        </div>
        {window.innerWidth <= 1600 ? (
          <div className="w-10">
            <InfoMenu />
          </div>
        ) : null}
      </div>
      {searching ? <Search /> : null}
      {deletePlanStatus ? <DeletePlanPopup /> : null}
      {addPlanStatus && !importingStatus ? <PlanAdd /> : null}
      {deleteYearStatus ? <DeleteYearPopup /> : null}
      {deleteCourseStatus ? <DeleteCoursePopup /> : null}
    </>
  );
}

export default Content;
