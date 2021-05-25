import * as React from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import Dashboard from "./Dashboard";
import DashboardEntry from "./header/DashboardEntry";
//import { Counter } from '../redux_sample/Counter';

/* 
  Root app component.
*/
function App() {
  return (
    <>
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
