import axios from "axios";
import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import DashboardEntry from "./DashboardEntry";
import bird from "./images/birdTempGif.gif";
import { updateAllCourses } from "./slices/userSlice";
//import { Counter } from '../redux_sample/Counter';

const api = "https://ucredit-api.herokuapp.com/api";

/* 
  Root app component.
*/
function App() {
  const dispatch = useDispatch();

  // Component state setup.
  const [welcomeScreen, setWelcomeScreen] = useState<boolean>(true);

  // Retrieves all database SIS courses.
  useEffect(() => {
    // Makes sure that welcome screen stays on for at least 1.5 seconds.
    let guard = false;
    setTimeout(() => {
      if (guard) {
        setWelcomeScreen(false);
      } else {
        guard = true;
      }
    }, 1500);

    axios
      .get(api + "/search", {
        params: {},
      })
      .then((courses: any) => {
        dispatch(updateAllCourses(courses.data.data));
        if (guard) {
          setWelcomeScreen(false);
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
          <DashboardEntry />
        </Route>
      </Switch>
    </>
  );
}

export default App;
