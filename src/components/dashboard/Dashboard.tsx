import React from "react";
import Content from "./Content";
import UserSection from "../login/UserSection";

/**
 * The dashboard that displays the user's plan.
 */
const Dashboard = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="fixed z-20 p-3 medium:px-48 w-full h-header bg-primary shadow">
        <UserSection />
      </div>
      <Content />
    </div>
  );
};

export default Dashboard;
