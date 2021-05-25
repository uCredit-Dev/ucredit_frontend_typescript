import React from "react";
import Header from "./header/Header";
import Content from "./body/Content";
import { ToastContainer } from "react-toastify";

const Dashboard = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <Header />
      <Content />

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Dashboard;
