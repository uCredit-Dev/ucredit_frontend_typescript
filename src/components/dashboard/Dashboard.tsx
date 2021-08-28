import React, { useState } from "react";
import Content from "./Content";
import UserSection from "../login/UserSection";
import { ReactComponent as CloseSVG } from "../../resources/svg/Close.svg";

type DashboardProps = {
  _id: string | null;
};

/**
 * The dashboard that displays the user's plan.
 */
const Dashboard = ({ _id }: DashboardProps) => {
  const [showNotif, setShowNotif] = useState<boolean>(true);
  return (
    <div className="flex flex-col w-full h-full min-h-screen">
      {showNotif ? (
        <div
          className="absolute z-40 top-0 flex flex-row pl-16 py-2 w-full font-bold bg-green-400 cursor-pointer"
          onClick={() => setShowNotif(false)}
        >
          <div className="flex-grow">
            We use your feedback to improve your planning experience! Please
            fill out{" "}
            <a
              className="text-white"
              href={
                "https://docs.google.com/forms/d/e/1FAIpQLScPqfcEEYkH-8j3raR1jKmbh-Qc7NyEaajXItlLKLjiUzS-hg/viewform?usp=sf_link"
              }
            >
              this feedback form
            </a>
            !
          </div>
          <div className="mr-5">
            <CloseSVG />
          </div>
        </div>
      ) : null}
      <UserSection _id={_id} />
      <div className="flex-grow">
        <Content />
      </div>
    </div>
  );
};

export default Dashboard;
