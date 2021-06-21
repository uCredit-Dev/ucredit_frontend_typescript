import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, selectUser, resetUser } from "../../slices/userSlice";
// import { ReactComponent as UserSvg } from "../../resources/svg/User.svg";
import { useHistory } from "react-router-dom";
import { resetCurrentPlan } from "../../slices/currentPlanSlice";
import { api } from "../../resources/assets";
import bird from "../../resources/images/logo.png";

/**
 * User login/logout buttons.
 */
function UserSection() {
  // Redux setup
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  // Component state setup
  const [loginId, setLoginId] = useState(document.cookie.split("=")[1]);
  let history = useHistory();

  // Useffect runs once on page load, calling to https://ucredit-api.herokuapp.com/api/retrieveUser to retrieve user data.
  // On successful retrieve, update redux with retrieved user,
  useEffect(() => {
    if (user._id === "noUser") {
      // Retrieves user if user ID is "noUser", the initial user id state for userSlice.tsx.
      // Make call for backend const cookieVals = document.cookie.split("=");
      const cookieVals = document.cookie.split("=");
      let cookieVal = "";
      cookieVals.forEach((val: string) => {
        if (val.length === 20) {
          cookieVal = val;
        }
      });
      fetch(api + "/retrieveUser/" + cookieVal, {
        mode: "cors",
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((retrievedUser) => {
          if (retrievedUser.errors === undefined) {
            dispatch(updateUser(retrievedUser.data));
            setLoginId(cookieVal);
          } else {
            console.log("errors are", retrievedUser.errors);
            history.push("/login");
          }
        })
        .catch((err) => {
          console.log("ERROR: ", err.message);
          history.push("/login");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document.cookie]);

  return (
    <>
      <div className="flex flex-row items-center justify-end w-full h-full">
        {/* <div className="flex flex-row items-center justify-center mr-3 w-11 h-11 bg-white rounded-full"> */}
        {/* <UserSvg className="w-6 h-6 stroke-2" /> */}
        {/* </div> */}
        <div className="flex flex-row flex-grow items-center ml-5 text-white text-4xl italic font-bold">
          <img src={bird} alt="logo" className="mr-3 h-9"></img>
          <div>UCredit</div>
        </div>
        {window.innerWidth > 800 ? (
          <div className="mr-3 text-white font-semibold">
            Logged in as {user.name}!
          </div>
        ) : null}
        {user._id === "guestUser" ? (
          <a
            href="https://ucredit-api.herokuapp.com/api/login"
            className="flex flex-row items-center justify-center mr-3 w-24 h-9 bg-white rounded cursor-pointer select-none transform hover:scale-110 transition duration-200 ease-in"
          >
            Log In
          </a>
        ) : (
          <button
            onClick={() => {
              fetch(api + "/retrieveUser/" + loginId, {
                mode: "cors",
                method: "DELETE",
                credentials: "include",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              })
                .then(() => {
                  dispatch(resetUser());
                  dispatch(resetCurrentPlan());
                  history.push("/login");
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
            className="flex flex-row items-center justify-center w-24 h-9 bg-white rounded focus:outline-none cursor-pointer select-none transform hover:scale-110 transition duration-200 ease-in"
          >
            Log Out
          </button>
        )}
      </div>
    </>
  );
}

export default UserSection;
