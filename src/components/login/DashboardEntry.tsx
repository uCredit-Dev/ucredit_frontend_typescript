import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { api, guestUser } from "../../resources/assets";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, selectUser } from "../../slices/userSlice";
import { useCookies } from "react-cookie";
import samplePlan from "../../resources/images/samplePlan.png";
import logo from "../../resources/images/logoDarker.png";

const deploy = "https://ucredit.herokuapp.com/login/";
const dev = "http://localhost:3000/login/";

/**
 * The login page, designed after the Spotify login page..
 * @param cookies contains the various resources provided by the wrapper component of react-cookie
 */
const DashboardEntry = () => {
  // Redux setup.
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [authCookies, setAuthCookie] = useCookies(["connect.sid"]);
  const [cookies] = useCookies(["connect.sid"]);

  // React router state setup.
  let history = useHistory();
  let location = useLocation();

  // Creates a cookie based on url.
  const createCookie = (token: string) => {
    if (!token.includes("dashboard")) {
      setAuthCookie("connect.sid", token, { path: "/" });
      history.push("/login");
    }
  };

  // Gets cookie token from url.
  const getToken = (): string => {
    const currentURL: string = window.location.href;
    let token: string = "";
    if (!currentURL.includes("localhost")) {
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
            history.push("/login");
          }
        })
        .catch(() => {
          history.push("/login");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Useffect runs once on page load, calling to https://ucredit-api.herokuapp.com/api/retrieveUser to retrieve user data.
  // On successful retrieve, update redux with retrieved user,
  // NOTE: Currently, the user is set to the testUser object found in @src/testObjs.tsx, with a JHED of mliu78 (Matthew Liu)
  //            redux isn't being updated with retrieved user data, as login has issues.
  useEffect(() => {
    let cookieVal = "";
    if (user._id === "noUser") {
      // Retrieves user if user ID is "noUser", the initial user id state for userSlice.tsx.
      // Make call for backend
      Object.entries(cookies).forEach((cookie: any) => {
        if (cookie[0] === "_hjid" || cookie[0] === "connect.sid")
          cookieVal = cookie[1];
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
            history.push("/dashboard");
          }
        })
        .catch((err) => {
          console.log("ERROR IS: ", err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authCookies]);

  // Handles if the user is invalid.
  const handleGuest = () => {
    dispatch(updateUser(guestUser));
    history.push("/dashboard");
  };

  return (
    <>
      <div
        className="absolute flex w-screen h-screen"
        style={{
          backgroundImage:
            "url(" +
            samplePlan +
            "), linear-gradient(205deg, rgba(52, 211, 153), rgba(59, 130, 246))",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          // backgroundColor: "black",
          backgroundBlendMode: "lighten",
          filter: "blur(9px) hue-rotate(340deg)",
          zIndex: 0,
        }}
      ></div>
      <div className="absolute flex w-full h-full">
        <div className="flex flex-col mx-auto mx-auto my-auto p-14 text-white text-lg font-bold bg-gradient-to-b rounded shadow from-blue-500 to-green-400">
          <div className="flex flex-row items-center justify-center mt-auto pr-2 w-full text-3xl">
            <img src={logo} alt="logo" className="mr-2 h-16" />
            <div>uCredit</div>
          </div>
          <div className="mb-14 mt-8 mx-auto w-full text-center text-4xl">
            Streamlined Degree Planning.
          </div>
          <a
            href="https://ucredit-api.herokuapp.com/api/login"
            className="flex flex-row items-center justify-center mx-auto w-64 h-12 font-semibold tracking-widest bg-primary rounded-full shadow cursor-pointer select-none transform hover:scale-105 transition duration-200 ease-in"
          >
            JHU SSO Login
          </a>
          <button
            className="flex flex-row items-center justify-center mb-auto mt-5 mx-auto w-64 h-12 font-semibold tracking-widest bg-primary rounded-full focus:outline-none shadow cursor-pointer select-none transform hover:scale-105 transition duration-200 ease-in"
            onClick={handleGuest}
          >
            Continue as guest
          </button>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default DashboardEntry;
