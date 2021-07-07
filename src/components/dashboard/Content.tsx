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
import PlanChoose from "./right-column-info/PlanChoose";
import InfoMenu from "./InfoMenu";

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
      {addPlanStatus ? <PlanAdd /> : null}
      {deleteYearStatus ? <DeleteYearPopup /> : null}
    </>
  );
}

export default Content;
