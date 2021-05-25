import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";
import DashboardEntry from "./DashboardEntry";
import bird from "./birdTempGif.gif";
import { withCookies, useCookies } from "react-cookie";
import { selectUser, updateUser } from "./slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
const api = "https://ucredit-api.herokuapp.com/api";

/* 
  Root app component.
*/
function App(props: any) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  // Component state setup
  const [cookies, setCookies] = useState(props.cookies);
  const [authCookies, setAuthCookie] = useCookies(["connect.sid"]);
  const [cookieUpdate, setCookieUpdate] = useState<boolean>(true);

  let history = useHistory();

  // Creates a cookie based on url.
  const createCookie = (token: string) => {
    if (!token.includes("dashboard")) {
      setAuthCookie("connect.sid", token);
      setCookies(props.cookies);
      setCookieUpdate(!cookieUpdate);
      history.push("/");
    }
  };

  const [welcomeScreen, setWelcomeScreen] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => setWelcomeScreen(false), 1500);
  }, []);

  // Useffect runs once on page load, calling to https://ucredit-api.herokuapp.com/api/retrieveUser to retrieve user data.
  // On successful retrieve, update redux with retrieved user,
  // NOTE: Currently, the user is set to the testUser object found in @src/testObjs.tsx, with a JHED of mliu78 (Matthew Liu)
  //            redux isn't being updated with retrieved user data, as login has issues.
  useEffect(() => {
    console.log("In usersection", cookies);
    if (user._id === "noUser") {
      // console.log("user section", cookies.get("connect.sid"));
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
          } else {
            // window.location.href = deploy;
            history.push("/");
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

  return (
    <>
      {welcomeScreen ? (
        <div className="absolute z-50 top-0 flex flex-col m-auto w-screen h-screen text-center text-center text-white bg-primary">
          Welcome logo animation (to be replaced)
          <img className="mt-auto mx-auto" src={bird} alt={"logoGif"}></img>
          <div className="mb-auto mx-auto w-full text-center text-9xl">
            UCredit
          </div>
        </div>
      ) : null}
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/">
          <DashboardEntry createCookie={createCookie} />
        </Route>
      </Switch>
    </>
  );
}

export default withCookies(App);
