import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, selectUser } from "../slices/userSlice";
import { ReactComponent as UserSvg } from "../svg/User.svg";
import { withCookies, useCookies } from "react-cookie";
import { guestUser } from "../assets";
import useUnload from "./useUnload";

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
  const [authCookies, setAuthCookie] = useCookies(["connect.sid"]);

  // on unload, attempts to cleanup guest user plans.
  useUnload((e: any) => {
    e.preventDefault();
    console.log("unloading");
    if (user._id === "guestUser") {
      user.plan_ids.forEach((planId) => {
        // delete plan from db
        // update plan array
        fetch(api + "/plans/" + planId, {
          method: "DELETE",
        })
          .then(() => {
            console.log("deleted planId");
          })
          .catch((err) => console.log(err));
      });
    }
    e.returnValue = "Are you sure you don't want to save guest courses?";
  });

  // Creates a cookie based on url.
  const createCookie = () => {
    const currentURL = window.location.href;
    let token = "";
    if (currentURL.includes(deploy)) {
      token = currentURL.substr(
        deploy.length,
        currentURL.length - deploy.length
      );
      console.log("token is " + token);
    } else {
      token = currentURL.substr(dev.length, currentURL.length - dev.length);
      console.log("token is " + token);
    }

    setAuthCookie("connect.sid", token);
    setCookies(props.cookies);
  };

  // Useffect runs once on page load, calling to https://ucredit-api.herokuapp.com/api/retrieveUser to retrieve user data.
  // On successful retrieve, update redux with retrieved user
  // On fail, guest user is used.
  useEffect(() => {
    console.log("cookei is ", cookies.get("connect.sid"));
    if (cookies.get("connect.sid") !== undefined) {
      console.log("in nonUndefined");
      fetch(api + "/retrieveUser/" + cookies.get("connect.sid"), {
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
          if (retrievedUser.errors !== undefined) {
            createCookie();
          }
        })
        .catch(() => {
          createCookie();
        });
    } else {
      createCookie();
    }
  }, [window.location.href]);

  // Useffect runs once on page load, calling to https://ucredit-api.herokuapp.com/api/retrieveUser to retrieve user data.
  // On successful retrieve, update redux with retrieved user,
  // NOTE: Currently, the user is set to the testUser object found in @src/testObjs.tsx, with a JHED of mliu78 (Matthew Liu)
  //            redux isn't being updated with retrieved user data, as login has issues.
  useEffect(() => {
    if (user._id === "noUser") {
      // Retrieves user if user ID is "noUser", the initial user id state for userSlice.tsx.
      // Make call for backend
      console.log("connect.sid=" + cookies.get("connect.sid"));
      fetch(api + "/retrieveUser/" + cookies.get("connect.sid"), {
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
          console.log("retrieved ", retrievedUser);
          dispatch(
            updateUser(retrievedUser.data) // Fix issue of infinite loop
          );
          // setGuest(false);
          if (retrievedUser.errors !== undefined) {
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
          dispatch(updateUser(guestUser));
        });
    }
    // dispatch(updateUser(testUser));
  }, [authCookies]);

  return (
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
        <div className="flex flex-row items-center justify-center w-24 h-9 bg-white rounded cursor-pointer select-none transform hover:translate-x-0.5 hover:translate-y-0.5 transition duration-200 ease-in">
          Log Out
        </div>
      )}
    </div>
  );
}

export default withCookies(UserSection);
