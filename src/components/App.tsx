import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import DashboardEntry from "./DashboardEntry";
import bird from "./birdTempGif.gif";
//import { Counter } from '../redux_sample/Counter';

/* 
  Root app component.
*/
function App() {
  const [welcomeScreen, setWelcomeScreen] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => setWelcomeScreen(false), 1500);
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
