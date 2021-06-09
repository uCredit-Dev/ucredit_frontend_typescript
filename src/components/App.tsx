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
import { toast } from "react-toastify";

/**
 * Root app component, where it all begins...
 * @returns
 */
function App() {
  const dispatch = useDispatch();

  // Component state setup.
  const [welcomeScreen, setWelcomeScreen] = useState<boolean>(true);

  // Retrieves all database SIS courses.
  useEffect(() => {
    // Makes sure that welcome screen stays on for at least 1.5 seconds.
    let guard = false;
    toast.info("Loading resources...", {
      autoClose: false,
      closeOnClick: false,
    });
    setTimeout(() => {
      if (guard) {
        setWelcomeScreen(false);
        toast.dismiss();
        toast.success("SIS Courses Cached!");
      } else {
        guard = true;
      }
    }, 1500);

    axios
      .get(api + "/search/all", {
        params: {},
      })
      .then((courses: any) => {
        const retrieved = courses.data.data;
        dispatch(updateAllCourses(retrieved));
        if (guard) {
          setWelcomeScreen(false);
          toast.dismiss();
          toast.success("SIS Courses Cached!");
        } else {
          guard = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
    </>
  );
}

export default App;
