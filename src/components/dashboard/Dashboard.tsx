import React, { useState } from "react";
import Content from "./Content";
import UserSection from "../login/UserSection";
import FeedbackPopup from "../popups/FeedbackPopup";
import FeedbackNotification from "../popups/FeedbackNotification";

type DashboardProps = {
  _id: string | null;
};

/**
 * The dashboard that displays the user's plan.
 */
const Dashboard = ({ _id }: DashboardProps) => {
  const [showNotif, setShowNotif] = useState<boolean>(true);
  const [formPopup, setFormPopup] = useState<boolean>(false);
  return (
    <div className="flex flex-col w-full h-full min-h-screen">
      {formPopup ? <FeedbackPopup setFormPopup={setFormPopup} /> : null}
      {showNotif ? (
        <FeedbackNotification
          actionHandler={setFormPopup}
          notifHandler={setShowNotif}
        />
      ) : null}
      <UserSection _id={_id} />
      <div className="flex-grow">
        <Content />
      </div>
    </div>
  );
};

export default Dashboard;
