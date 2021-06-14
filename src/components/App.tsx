import axios from "axios";
import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { api } from "./../resources/assets";
import Dashboard from "./dashboard/Dashboard";
import DashboardEntry from "./login/DashboardEntry";
import bird from "./../resources/images/birdTempGif.gif";
import { updateAllCourses } from "../slices/userSlice";
import LandingPage from "./landing-page/LandingPage";
import { toast, ToastContainer } from "react-toastify";
import ReactTooltip from "react-tooltip";

/**
 * Root app component, where it all begins...
 * @returns
 */
function App() {
  const dispatch = useDispatch();

  // Component state setup.
  const [welcomeScreen, setWelcomeScreen] = useState<boolean>(true);

  const retrieveData = () => {
    axios
      .get(api + "/search/all", {
        params: {},
      })
      .then((courses: any) => {
        const retrieved = courses.data.data;
        dispatch(updateAllCourses(retrieved));
        toast.dismiss();
        toast.success("SIS Courses Cached!");
        setWelcomeScreen(false);
      })
      .catch((err) => {
        retrieveData();
        console.log(err);
      });
  };

  // Retrieves all database SIS courses.
  useEffect(() => {
    if (
      !window.location.href.includes("https") &&
      !window.location.href.includes("localhost")
    ) {
      window.location.href =
        "https://" +
        window.location.href.substr(7, window.location.href.length);
    }

    toast.info("Loading resources...", {
      autoClose: false,
      closeOnClick: false,
    });

    retrieveData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  return (
    <>
      <ReactTooltip
        id="godTip"
        html={true}
        className="max-w-sm"
        place="top"
        effect="solid"
      />
      {welcomeScreen ? (
        <div className="fixed z-50 flex flex-col m-auto w-screen h-screen text-center text-center text-white bg-primary">
          Welcome logo animation (to be replaced)
          <button
            onClick={() => {
              setWelcomeScreen(false);
            }}
          >
            Click here to dismiss loading screen (resource loading will still be
            performed in the background)
          </button>
          <img className="mt-auto mx-auto" src={bird} alt={"logoGif"}></img>
          <div className="mb-auto mx-auto w-full text-center text-8xl">
            UCredit - Loading resources...
          </div>
        </div>
      ) : null}
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/login">
          <DashboardEntry />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
