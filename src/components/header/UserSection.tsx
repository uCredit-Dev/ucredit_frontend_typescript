import React, { useState, useEffect } from "react";
import { testUser } from "../testObjs";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, selectUser } from "../slices/userSlice";
import { ReactComponent as UserSvg } from "../svg/User.svg";
import axios from "axios";
import { guestUser } from "../assets";
const api = "https://ucredit-api.herokuapp.com/api";

function UserSection() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  // Useffect runs once on page load, calling to https://ucredit-api.herokuapp.com/api/retrieveUser to retrieve user data.
  // On successful retrieve, update redux with retrieved user,
  // NOTE: Currently, the user is set to the testUser object found in @src/testObjs.tsx, with a JHED of mliu78 (Matthew Liu)
  //            redux isn't being updated with retrieved user data, as login has issues.
  useEffect(() => {
    // Retrieves user if user ID is "noUser", the initial user id state for userSlice.tsx.
    // Make call for backend
    fetch(api + "/retrieveUser", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Cache: "no-cache",
      },
    })
      .then((resp) => resp.json())
      .then((retrievedUser) => {
        console.log("retrieved ", retrievedUser);
        // dispatch(updateUser(retrievedUser.data));
        // setGuest(false);
        if (retrievedUser.errors.length > 0) {
          // Set user to guest user
          dispatch(updateUser(guestUser));
        }
      })
      .catch((err) => {
        // TODO: If there is no retrievedUser we could
        //    (A) redirect them to https://ucredit-api.herokuapp.com/api/login
        //    (B) load in a local guest user and wait for them to access https://ucredit-api.herokuapp.com/api/login
        //          by clicking the "Log In" button in the header.
        console.log("ERROR: ", err.message);
      });
    // axios
    //   .get(api + "/retrieveUser", { withCredentials: true })
    //   .then((resp) => console.log("resp ", resp));
  }, []);

  return (
    <div className='flex flex-row items-center justify-end w-full h-full'>
      <div className='flex flex-row items-center justify-center mr-3 w-11 h-11 bg-white rounded-full'>
        <UserSvg className='w-6 h-6 stroke-2' />
      </div>
      {user._id === "guestUser" ? (
        <a
          href='https://ucredit-api.herokuapp.com/api/login'
          className='flex flex-row items-center justify-center mr-3 w-24 h-9 bg-white rounded cursor-pointer select-none transform hover:translate-x-0.5 hover:translate-y-0.5 transition duration-200 ease-in'>
          Log In
        </a>
      ) : (
        <div className='flex flex-row items-center justify-center w-24 h-9 bg-white rounded cursor-pointer select-none transform hover:translate-x-0.5 hover:translate-y-0.5 transition duration-200 ease-in'>
          Log Out
        </div>
      )}
    </div>
  );
}

export default UserSection;
