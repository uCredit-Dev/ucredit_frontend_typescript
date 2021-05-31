import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { guestUser } from "./assets";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, selectUser } from "./slices/userSlice";
import { withCookies, useCookies } from "react-cookie";
import bg from "./images/bg.png";
import placeholder from "./images/placeholder_logo.png";

const api = "https://ucredit-api.herokuapp.com/api";
const deploy = "https://ucredit.herokuapp.com/";
const dev = "http://localhost:3000/";

const DashboardEntry = (props: any) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  // Component state setup
  const [cookies, setCookies] = useState(props.cookies);
  const [authCookies, setAuthCookie] = useCookies(["connect.sid"]);
  const [cookieUpdate, setCookieUpdate] = useState<boolean>(true);

  let history = useHistory();
  let location = useLocation();

  // Creates a cookie based on url.
  const createCookie = (token: string) => {
    if (!token.includes("dashboard")) {
      setAuthCookie("connect.sid", token, { path: "/" });
      setCookies(props.cookies);
      setCookieUpdate(!cookieUpdate);
      history.push("/");
    }
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
    if (token.length > 0) {
      fetch(api + "/retrieveUser/" + token, {
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
            createCookie(token);
          } else {
            history.push("/");
          }
        })
        .catch(() => {
          history.push("/");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Useffect runs once on page load, calling to https://ucredit-api.herokuapp.com/api/retrieveUser to retrieve user data.
  // On successful retrieve, update redux with retrieved user,
  // NOTE: Currently, the user is set to the testUser object found in @src/testObjs.tsx, with a JHED of mliu78 (Matthew Liu)
  //            redux isn't being updated with retrieved user data, as login has issues.
  useEffect(() => {
    if (user._id === "noUser") {
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
          if (retrievedUser.errors === undefined) {
            dispatch(
              updateUser(retrievedUser.data) // TODO: Fix issue of infinite loop
            );
            history.push("/dashboard");
          }
        })
        .catch((err) => {
          // TODO: If there is no retrievedUser we could
          //    (A) redirect them to https://ucredit-api.herokuapp.com/api/login
          //    (B) load in a local guest user and wait for them to access https://ucredit-api.herokuapp.com/api/login
          //          by clicking the "Log In" button in the header.
          console.log("ERROR: ", err.message);
          history.push("/");
          // dispatch(updateUser(guestUser));
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies, authCookies]);

  const handleGuest = () => {
    dispatch(updateUser(guestUser));
    history.push("/dashboard");
  };

  return (
    <div
      className="flex w-screen h-screen"
      style={{
        backgroundImage: "url(" + bg + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "top",
      }}
    >
      <div
        className="min-w-1/4 flex flex-col mx-auto my-auto p-14 text-white text-lg font-bold rounded"
        style={{ backgroundColor: "#00316F" }}
      >
        <div className="flex flex-row items-center justify-center mt-auto w-full text-3xl">
          <img src={placeholder} alt="logo" className="h-14" />
          <div>uCredit</div>
        </div>
        <div className="mb-14 mt-8 mx-auto w-full text-center text-4xl">
          Streamlined Degree Planning.
        </div>
        <a
          href="https://ucredit-api.herokuapp.com/api/login"
          className="flex flex-row items-center justify-center mx-auto w-64 h-12 font-semibold tracking-widest bg-secondary rounded-full cursor-pointer select-none transform hover:translate-x-0.5 hover:translate-y-0.5 transition duration-200 ease-in"
        >
          JHU SSO Login
        </a>
        <button
          className="flex flex-row items-center justify-center mb-auto mt-5 mx-auto w-64 h-12 font-semibold tracking-widest bg-secondary rounded-full cursor-pointer select-none transform hover:translate-x-0.5 hover:translate-y-0.5 transition duration-200 ease-in"
          onClick={handleGuest}
        >
          Continue as guest
        </button>
      </div>
    </div>
  );
};

export default withCookies(DashboardEntry);
