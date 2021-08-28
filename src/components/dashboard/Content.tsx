import React from "react";
import CourseList from "./course-list/CourseList";
import Search from "../popups/course-search/Search";
import { selectSearchStatus } from "../../slices/searchSlice";
import { useSelector } from "react-redux";
import InfoCards from "./right-column-info/InfoCards";
import DeletePlanPopup from "../popups/DeletePlanPopup";
import Distributions from "./right-column-info/Distributions";
import PlanAdd from "../popups/PlanAdd";
import DeleteYearPopup from "../popups/DeleteYearPopup";
import PlanChoose from "./right-column-info/PlanChoose";
import InfoMenu from "./InfoMenu";
import { selectImportingStatus } from "../../slices/currentPlanSlice";
import DeleteCoursePopup from "../popups/DeleteCoursePopup";
import {
  selectDeletePlanStatus,
  selectAddingPlanStatus,
  selectDeleteYearStatus,
  selectCourseToDelete,
  selectShowCourseInfo,
  selectAddingPrereq,
} from "../../slices/popupSlice";
import CourseDisplayPopup from "../popups/CourseDisplayPopup";
import AddingPrereqPopup from "../popups/AddingPrereqPopup";

/**
 * Holds all dashboard components.
 */
function Content() {
  // Redux setup.
  const searchStatus = useSelector(selectSearchStatus);
  const deletePlanStatus = useSelector(selectDeletePlanStatus);
  const addPlanStatus = useSelector(selectAddingPlanStatus);
  const deleteYearStatus = useSelector(selectDeleteYearStatus);
  const deleteCourseStatus = useSelector(selectCourseToDelete);
  const importingStatus = useSelector(selectImportingStatus);
  const courseInfoStatus = useSelector(selectShowCourseInfo);
  const addingPrereqStatus = useSelector(selectAddingPrereq);

  return (
    <>
      <div className="flex flex-row flex-grow h-full">
        <div className="flex flex-row thin:flex-wrap-reverse mt-content medium:px-10 px-5 w-full h-full">
          <div className="flex flex-col flex-grow h-full">
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
        ) : window.innerWidth > 1600 && searchStatus ? (
          <div className="w-10">
            <InfoMenu />
          </div>
        ) : null}
      </div>
      {searchStatus ? <Search /> : null}
      {deletePlanStatus ? <DeletePlanPopup /> : null}
      {addPlanStatus && !importingStatus ? <PlanAdd /> : null}
      {deleteYearStatus ? <DeleteYearPopup /> : null}
      {deleteCourseStatus ? <DeleteCoursePopup /> : null}
      {courseInfoStatus ? <CourseDisplayPopup /> : null}
      {addingPrereqStatus ? <AddingPrereqPopup /> : null}
    </>
  );
}

export default Content;
