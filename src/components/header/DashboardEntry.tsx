import React from "react";
import { useHistory } from "react-router-dom";
import { guestUser } from "../assets";
import { updateUser } from "../slices/userSlice";

const DashboardEntry = () => {
  let history = useHistory();

  const handleGuest = () => {
    dispatch(updateUser(guestUser));
    history.push("/dashboard");
  };

  return (
    <div className="flex w-screen h-screen bg-primary">
      <div className="flex flex-col mx-auto my-auto w-1/4 h-1/2 bg-gray-200 rounded">
        <a
          href="https://ucredit-api.herokuapp.com/api/login"
          className="flex flex-row items-center justify-center mt-auto mx-auto w-24 h-9 bg-secondary rounded cursor-pointer select-none transform hover:translate-x-0.5 hover:translate-y-0.5 transition duration-200 ease-in"
        >
          Log In
        </a>
        <button
          className="h-15 flex flex-row items-center justify-center mb-auto mt-20 mx-auto w-24 bg-secondary rounded cursor-pointer select-none transform hover:translate-x-0.5 hover:translate-y-0.5 transition duration-200 ease-in"
          onClick={handleGuest}
        >
          Continue as guest
        </button>
      </div>
    </div>
  );
};

export default DashboardEntry;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
