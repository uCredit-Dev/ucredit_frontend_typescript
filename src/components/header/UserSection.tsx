import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, selectUser } from "../slices/userSlice";
import { ReactComponent as UserSvg } from "../svg/User.svg";
import { withCookies, useCookies } from "react-cookie";
import { guestUser } from "../assets";
import { useHistory } from "react-router-dom";

const api = "https://ucredit-api.herokuapp.com/api";
const deploy = "https://ucredit.herokuapp.com/";
const dev = "http://localhost:3000/";

/* 
  User login/logout buttons.
*/
function UserSection(props: any) {
  // Redux setup
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  // Component state setup
  const [cookies, setCookies] = useState(props.cookies);

  return (
    <>
      <div className="flex flex-row items-center justify-end w-full h-full">
        <div className="flex flex-row items-center justify-center mr-3 w-11 h-11 bg-white rounded-full">
          <UserSvg className="w-6 h-6 stroke-2" />
        </div>
        {user._id === "guestUser" ? (
          <a
            href="https://ucredit-api.herokuapp.com/api/login"
            className="flex flex-row items-center justify-center mr-3 w-24 h-9 bg-white rounded cursor-pointer select-none transform hover:translate-x-0.5 hover:translate-y-0.5 transition duration-200 ease-in"
          >
            Log In
          </a>
        ) : (
          <button
            onClick={() => {
              fetch(api + "/retrieveUser/" + cookies.get("connect.sid"), {
                mode: "cors",
                method: "DELETE",
                credentials: "include",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              })
                .then(() => dispatch(updateUser(guestUser)))
                .catch((err) => {
                  console.log(err);
                });
            }}
            className="flex flex-row items-center justify-center w-24 h-9 bg-white rounded cursor-pointer select-none transform hover:translate-x-0.5 hover:translate-y-0.5 transition duration-200 ease-in"
          >
            Log Out
          </button>
        )}
      </div>
    </>
  );
}

export default withCookies(UserSection);
