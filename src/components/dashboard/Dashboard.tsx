import { FC, useState } from "react";
import UserSection from "./UserSection";
import FeedbackPopup from "../popups/FeedbackPopup";
import FeedbackNotification from "../popups/FeedbackNotification";
import HandleUserEntryDummy from "./HandleUserEntryDummy";
import { useSelector } from "react-redux";
import { selectImportingStatus } from "../../slices/currentPlanSlice";
import {
  selectDeletePlanStatus,
  selectAddingPlanStatus,
  selectDeleteYearStatus,
  selectCourseToDelete,
  selectShowCourseInfo,
  selectAddingPrereq,
} from "../../slices/popupSlice";
import { selectSearchStatus } from "../../slices/searchSlice";
import clsx from "clsx";
import AddingPrereqPopup from "../popups/AddingPrereqPopup";
import Search from "../popups/course-search/Search";
import CourseDisplayPopup from "../popups/CourseDisplayPopup";
import DeleteCoursePopup from "../popups/DeleteCoursePopup";
import DeletePlanPopup from "../popups/DeletePlanPopup";
import DeleteYearPopup from "../popups/DeleteYearPopup";
import PlanAdd from "../popups/PlanAdd";
import CourseList from "./course-list/CourseList";
import InfoMenu from "./InfoMenu";
import ActionBar from "./right-column-info/ActionBar";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";

/**
 * The dashboard that displays the user's plan.
 */
const Dashboard: FC<{ _id: string | null }> = ({ _id }) => {
  // Redux setup.
  const searchStatus = useSelector(selectSearchStatus);
  const deletePlanStatus = useSelector(selectDeletePlanStatus);
  const addPlanStatus = useSelector(selectAddingPlanStatus);
  const deleteYearStatus = useSelector(selectDeleteYearStatus);
  const deleteCourseStatus = useSelector(selectCourseToDelete);
  const importingStatus = useSelector(selectImportingStatus);
  const courseInfoStatus = useSelector(selectShowCourseInfo);
  const addingPrereqStatus = useSelector(selectAddingPrereq);

  // State Setup
  const [showNotif, setShowNotif] = useState<boolean>(true);
  const [formPopup, setFormPopup] = useState<boolean>(false);
  const [loginId, setLoginId] = useState<string>(document.cookie.split("=")[1]);
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const [showActionBar, setShowActionBar] = useState<boolean>(true);
  const [showMoveUp, setMoveUp] = useState<boolean>(false);

  useScrollPosition(({ prevPos, currPos }) => {
    console.log(currPos.y);
    if (currPos.y > -14) {
      setMoveUp(false);
      setShowActionBar(true);
      setShowHeader(true);
    } else if (currPos.y > -120) {
      setShowHeader(false);
      setShowActionBar(true);
      setMoveUp(true);
    } else setShowActionBar(false);
  });
  return (
    <div className="flex flex-col w-full h-full min-h-screen">
      <HandleUserEntryDummy setLoginId={setLoginId} _id={_id} />
      {formPopup ? <FeedbackPopup setFormPopup={setFormPopup} /> : null}
      {showNotif ? (
        <FeedbackNotification
          actionHandler={setFormPopup}
          notifHandler={setShowNotif}
        />
      ) : null}
      {showHeader ? <UserSection loginId={loginId} /> : null}
      <div className="flex-grow">
        <div className="flex flex-col flex-grow h-full">
          {/* <ActionBar /> */}
          <div className="flex flex-row thin:flex-wrap-reverse mt-content medium:px-10 px-5 w-full h-full">
            <div className="flex flex-col w-full h-full">
              <CourseList />
            </div>
          </div>
          <InfoMenu />
          {showActionBar ? (
            <div
              className={clsx("fixed mt-1 medium:px-10 px-5 w-screen", {
                "mt-20": !showMoveUp,
              })}
            >
              <ActionBar />
            </div>
          ) : null}
        </div>

        {/* Global popups */}
        {searchStatus ? <Search /> : null}
        {deletePlanStatus ? <DeletePlanPopup /> : null}
        {addPlanStatus && !importingStatus ? <PlanAdd /> : null}
        {deleteYearStatus ? <DeleteYearPopup /> : null}
        {deleteCourseStatus ? <DeleteCoursePopup /> : null}
        {courseInfoStatus ? <CourseDisplayPopup /> : null}
        {addingPrereqStatus ? <AddingPrereqPopup /> : null}
      </div>
    </div>
  );
};

export default Dashboard;
