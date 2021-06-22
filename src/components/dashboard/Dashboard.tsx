import React from "react";
import Content from "./Content";
import UserSection from "../login/UserSection";

/**
 * The dashboard that displays the user's plan.
 */
const Dashboard = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <UserSection />
      <Content />
    </div>
  );
};

export default Dashboard;
