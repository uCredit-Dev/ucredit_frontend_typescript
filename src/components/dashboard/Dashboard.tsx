import React from "react";
import Content from "./Content";
import UserSection from "../login/UserSection";

/**
 * The dashboard that displays the user's plan.
 */
const Dashboard = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="fixed z-20 p-3 px-6 w-full h-header bg-primary bg-gradient-to-r rounded shadow from-blue-500 to-green-400 select-none">
        <UserSection />
      </div>
      <Content />
    </div>
  );
};

export default Dashboard;
