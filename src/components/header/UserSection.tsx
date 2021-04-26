import React, { useState, useEffect } from "react";
import { testUser } from "../testObjs";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, selectUser } from "../slices/userSlice";
import { ReactComponent as UserSvg } from "../svg/user.svg";
import cookie, { withCookies, useCookies, Cookies } from "react-cookie";
import { guestUser } from "../assets";
import axiosCookieJarSupport from "axios-cookiejar-support";
import axios from "axios";
import tough from "tough-cookie";
axiosCookieJarSupport(axios);

const cookieJar = new tough.CookieJar();
const api = "https://ucredit-api.herokuapp.com/api";
const deploy = "https://ucredit.herokuapp.com/";
const dev = "http://localhost:3000/";

function UserSection(props: any) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [cookies, setCookies] = useState(props.cookies);
  const [authCookies, setAuthCookie] = useCookies(["connect.sid"]);

  // Useffect runs once on page load, calling to https://ucredit-api.herokuapp.com/api/retrieveUser to retrieve user data.
  // On successful retrieve, update redux with retrieved user,
  // NOTE: Currently, the user is set to the testUser object found in @src/testObjs.tsx, with a JHED of mliu78 (Matthew Liu)
  //            redux isn't being updated with retrieved user data, as login has issues.
  useEffect(() => {
    const currentURL = window.location.href;
    let token;
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

    // cookie.save("connect.sid", true, {path:"/"});

    setAuthCookie("connect.sid", token);
    setCookies(props.cookies);
  }, [cookies, props.cookies, window.location.href]);

  // Useffect runs once on page load, calling to https://ucredit-api.herokuapp.com/api/retrieveUser to retrieve user data.
  // On successful retrieve, update redux with retrieved user,
  // NOTE: Currently, the user is set to the testUser object found in @src/testObjs.tsx, with a JHED of mliu78 (Matthew Liu)
  //            redux isn't being updated with retrieved user data, as login has issues.
  useEffect(() => {
    // Retrieves user if user ID is "noUser", the initial user id state for userSlice.tsx.
    // Make call for backend
    console.log("connect.sid=" + cookies.get("connect.sid"));
    fetch(api + "/retrieveUser", {
      mode: "cors",
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Cache: "no-cache",
        Cookie: "connect.sid=" + cookies.get("connect.sid"),
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
        dispatch(updateUser(guestUser));
      });
    // axios
    //   .get(api + "/retrieveUser", {
    //     withCredentials: true,
    //     headers: { jar: cookieJar, withCredentials: true },
    //   })
    //   .then((retrievedUser: any) => {
    //     console.log("retrieved ", retrievedUser);
    //     // dispatch(updateUser(retrievedUser.data));
    //     // setGuest(false);
    //     // if (retrievedUser.errors.length > 0) {
    //     // Set user to guest user
    //     dispatch(updateUser(guestUser));
    //     // }
    //   })
    //   .catch((err: any) => {
    //     // TODO: If there is no retrievedUser we could
    //     //    (A) redirect them to https://ucredit-api.herokuapp.com/api/login
    //     //    (B) load in a local guest user and wait for them to access https://ucredit-api.herokuapp.com/api/login
    //     //          by clicking the "Log In" button in the header.
    //     console.log("ERROR: ", err);
    //     dispatch(updateUser(guestUser));
    //   });

    // dispatch(updateUser(testUser));
  }, [authCookies]);

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

export default withCookies(UserSection);
