import axios from "axios";
import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useLocation } from "react-router-dom";
import { api } from "./../resources/assets";
import Dashboard from "./dashboard/Dashboard";
import DashboardEntry from "./login/DashboardEntry";
import { selectCourseCache, selectUser, updateAllCoursesCached, updateCourseCache, updateRetrievedAll } from "../slices/userSlice";
import LandingPage from "./landing-page/LandingPage";
import { toast, ToastContainer } from "react-toastify";
import ReactTooltip from "react-tooltip";
import { SISRetrievedCourse, UserCourse } from "../resources/commonTypes";
// import bird from "./../resources/images/birdTempGif.gif";
import logoLine from "../resources/images/line-art/logo_line_lighter.png";
import { selectImportingStatus, selectPlan } from "../slices/currentPlanSlice";

/**
 * Root app component, where it all begins...
 * @returns
 */
function App() {
  const dispatch = useDispatch();
  const importing = useSelector(selectImportingStatus);
  const user = useSelector(selectUser);
  const curPlan = useSelector(selectPlan);
  const courseCache = useSelector(selectCourseCache);

  // Component state setup.
  const [welcomeScreen, setWelcomeScreen] = useState<boolean>(true);
  const [forceClose, setForceClose] = useState<boolean>(false);

  const retrieveData = (counter: number, retrieved: SISRetrievedCourse[]) => {
    axios
      .get(api + "/search/skip/" + counter + "?mod=" + 450)
      .then((courses: any) => {
        if (courses.data.data.length > 0) {
          retrieveData(counter + 1, [...retrieved, ...courses.data.data]);
        } else {
          toast.dismiss();
          toast.success("SIS Courses Cached!");
          setWelcomeScreen(false);
          dispatch(updateAllCoursesCached(retrieved));
          dispatch(updateRetrievedAll(true));
        }
      })
      .catch((err) => {
        retrieveData(counter, retrieved);
        console.log("err is ", err.message);
      });
    }

  const retrieveAllCourses = () => {  
    axios
      .get(api + "/search/all", {
        params: {},
      })
      .then((courses: any) => {
        const retrieved = courses.data.data;
        dispatch(updateAllCoursesCached(retrieved));
        dispatch(updateRetrievedAll(true));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    retrieveData(0, []);
  }, []);

  useEffect(() => {
    if (user._id !== "noUser") {
      setWelcomeScreen(false);
      // TODO: SOMETHING IDK
    }
  }, [user])

  useEffect(() => {
    if (courseCache.length === 0 && curPlan._id !== "noPlan") {
      let total = 0;
      let cum = 0;
      let SISCourses: SISRetrievedCourse[] = [];
      axios.get(api + '/coursesByPlan/' + curPlan._id).then((response) => {
        response.data.data.forEach((c: UserCourse) => {
          total++;
          axios.get("https://ucredit-dev.herokuapp.com/api/search", {
            params: { query: c.number },
            // eslint-disable-next-line no-loop-func
            }).then((retrieved) => {
              let SISRetrieved : SISRetrievedCourse = retrieved.data.data[0]; 
              cum++;
              SISCourses.push(SISRetrieved);
              if (cum === total) {
                dispatch(updateCourseCache([...SISCourses]));
              }
            })
          })
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curPlan])

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const _id = useQuery().get("_id");

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
      {(welcomeScreen || importing) && !forceClose ? (
        <div className="fixed z-40 flex flex-col m-auto w-screen h-screen text-center text-center text-white bg-blue-900">
          <img
            className="mt-auto mx-auto w-1/6"
            src={logoLine}
            alt={"logo line art"}
          ></img>
          <div className="mb-auto mt-4 mx-auto w-full text-center text-5xl italic font-thin select-none">
            uCredit
          </div>
          <button
            onClick={() => {
              setForceClose(true);
            }}
            data-tip="Tap to dismiss loading screen. Resource loading will still be
              performed in the background."
            data-for="godTip"
            className="mb-3 focus:outline-none"
          >
            Dismiss Loading Screen
          </button>
        </div>
      ) : null}
      <Switch>
        <Route path="/dashboard">
          <Dashboard _id={null} />
        </Route>
        <Route path="/login">
          <DashboardEntry />
        </Route>
        <Route path="/share">
          <Dashboard _id={_id} />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
      <ToastContainer
        position="bottom-left"
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