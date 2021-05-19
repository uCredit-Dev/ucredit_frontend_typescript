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
  const [cookieUpdate, setCookieUpdate] = useState<boolean>(true);

  // on unload, attempts to cleanup guest user plans.
  useUnload((e: any) => {
    e.preventDefault();
    if (user._id === "guestUser") {
      user.plan_ids.forEach((planId) => {
        // delete plan from db
        // update plan array
        fetch(api + "/plans/" + planId, {
          method: "DELETE",
        }).catch((err) => console.log(err));
      });
    }
    e.returnValue = "Are you sure you don't want to save guest courses?";
  });

  // Creates a cookie based on url.
  const createCookie = (token: string) => {
    setAuthCookie("connect.sid", token);
    setCookies(props.cookies);
    setCookieUpdate(!cookieUpdate);
    window.location.href = deploy;
  };

  // Gets cookie token from url.
  const getToken = (): string => {
    const currentURL: string = window.location.href;
    let token: string = "";
    if (currentURL.includes(deploy)) {
      token = currentURL.substr(
        deploy.length,
        currentURL.length - deploy.length
      );
    } else {
      token = currentURL.substr(dev.length, currentURL.length - dev.length);
    }
    return token;
  };

  // Useffect runs once on page load, calling to https://ucredit-api.herokuapp.com/api/retrieveUser to retrieve user data.
  // On successful retrieve, update redux with retrieved user
  // On fail, guest user is used.
  useEffect(() => {
    const token: string = getToken();
    if (cookies.get("connect.sid") !== undefined && token.length > 0) {
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
            createCookie(token);
          }
        })
        .catch(() => {
          createCookie(token);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.href]);

  // Useffect runs once on page load, calling to https://ucredit-api.herokuapp.com/api/retrieveUser to retrieve user data.
  // On successful retrieve, update redux with retrieved user,
  // NOTE: Currently, the user is set to the testUser object found in @src/testObjs.tsx, with a JHED of mliu78 (Matthew Liu)
  //            redux isn't being updated with retrieved user data, as login has issues.
  useEffect(() => {
    const token: string = getToken();
    if (user._id === "noUser" && token.length === 0) {
      // Retrieves user if user ID is "noUser", the initial user id state for userSlice.tsx.
      // Make call for backend
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
          dispatch(
            updateUser(retrievedUser.data) // TODO: Fix issue of infinite loop
          );
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies, authCookies]);

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
