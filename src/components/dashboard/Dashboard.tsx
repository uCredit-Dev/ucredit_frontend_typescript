import React from "react";
import Content from "./Content";
import UserSection from "../login/UserSection";

type DashboardProps = {
  _id: string | null;
};

/**
 * The dashboard that displays the user's plan.
 */
const Dashboard = ({ _id }: DashboardProps) => {
  return (
    <div className="flex flex-col w-full h-full">
      <UserSection _id={_id} />
      <Content />
    </div>
  );
};

export default Dashboard;
