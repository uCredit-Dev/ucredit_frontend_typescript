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
  const [welcomeScreen, setWelcomeScreen] = useState<boolean>(true);
  // Makes sure that the welcome screen displays for at least a set amount of time.
  const [minTimerGuard, setMinTimerGuard] = useState<boolean>(false);

  const checkWelcomeScreenState = () => {
    if (minTimerGuard) {
      setWelcomeScreen(false);
    } else {
      setMinTimerGuard(true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      checkWelcomeScreenState();
    }, 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minTimerGuard]);

  useEffect(() => {
    axios
      .get(api + "/search", {
        params: {},
      })
      .then((courses: any) => {
        dispatch(updateAllCourses(courses.data.data));
        checkWelcomeScreenState();
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
