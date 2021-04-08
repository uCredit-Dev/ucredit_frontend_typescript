import React, { useEffect, useState } from "react";
import { selectUser } from "../slices/userSlice";
import { useSelector } from "react-redux";
import { testUser } from "../testObjs";
import { useDispatch } from "react-redux";
import { updateUser } from "../slices/userSlice";
import { ReactComponent as UserSvg } from "../svg/user.svg";
const api = "https://ucredit-api.herokuapp.com/api";

function UserSection() {
  const dispatch = useDispatch();

  useEffect(() => {
    //retrieveUser();
    // fetch(api + '/login')
    //   .then((retrieved) => {
    //     // Redirect url?
    //     const url = retrieved.url;
    //     window.location.href = url; // redirect to sso login?
    //   })
    //   .catch((err) => console.log('ERROR: ', err.message));

    // axios
    //   .get(api + '/login')
    //   .then((retrievedUser) => {console.log('retrieved ', retrievedUser)})
    //   .catch((err) => console.log('ERROR: ', err.message));

    // Get test user
    dispatch(updateUser(testUser));
  });

  return (
    <div className="flex flex-row items-center justify-end w-full h-full">
      <div className="flex flex-row items-center justify-center mr-3 w-11 h-11 bg-white rounded-full">
        <UserSvg className="w-6 h-6 stroke-2" />
      </div>
      <a
        href="https://ucredit-api.herokuapp.com/api/login"
        className="flex flex-row items-center justify-center w-24 h-9 bg-white rounded-lg cursor-pointer select-none transform hover:translate-x-0.5 hover:translate-y-0.5 transition duration-200 ease-in"
      >
        Log In
      </a>
      <div className="flex flex-row items-center justify-center w-24 h-9 bg-white rounded-lg cursor-pointer select-none transform hover:translate-x-0.5 hover:translate-y-0.5 transition duration-200 ease-in">
        Log Out
      </div>
    </div>
  );
}

export default UserSection;
