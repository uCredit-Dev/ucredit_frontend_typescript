import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUser,
  selectUser,
  resetUser,
  updatePlanList,
  selectAllCourses,
  selectPlanList,
} from "../../slices/userSlice";
// import { ReactComponent as UserSvg } from "../../resources/svg/User.svg";
import { useHistory } from "react-router-dom";
import {
  resetCurrentPlan,
  selectCurrentPlanCourses,
  selectPlan,
  updateCurrentPlanCourses,
  updateImportingStatus,
  updateSelectedPlan,
} from "../../slices/currentPlanSlice";
import { api, guestUser } from "../../resources/assets";
import bird from "../../resources/images/logoDarker.png";
import axios from "axios";
import { Plan, User, UserCourse, Year } from "../../resources/commonTypes";
import { getMajorFromCommonName } from "../../resources/majors";
import { toast } from "react-toastify";
import {
  updateAddingPlanStatus,
  updateToAddName,
  updateToAddMajor,
  updateGeneratePlanAddStatus,
} from "../../slices/popupSlice";

type UserProps = {
  _id: string | null;
};

/**
 * User login/logout buttons.
 */
function UserSection({ _id }: UserProps) {
  // Redux setup
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const curPlan = useSelector(selectPlan);
  const currentCourses = useSelector(selectCurrentPlanCourses);
  const planList = useSelector(selectPlanList);
  const allCourses = useSelector(selectAllCourses);

  // Component state setup
  const [loginId, setLoginId] = useState(document.cookie.split("=")[1]);
  const [toAdd, setToAdd] = useState<Year[]>([]);
  const [shouldAdd, setShouldAdd] = useState<boolean>(false);
  let history = useHistory();

  var curCourses: UserCourse[] = [];

  useEffect(() => {
    if (
      shouldAdd &&
      user._id !== "noUser" &&
      curPlan._id !== "noPlan" &&
      allCourses.length > 0
    ) {
      addCourses(toAdd, curPlan);
      setShouldAdd(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldAdd, toAdd, user, curPlan, allCourses, currentCourses]);

  const addCourses = async (years: Year[], curPlan: Plan) => {
    for (const year of toAdd) {
      for (const course of year.courses) {
        curPlan = await addCourse(course, year, curPlan);
      }
    }
    dispatch(updateCurrentPlanCourses(curCourses));
    dispatch(updateSelectedPlan(curPlan));
    dispatch(updateImportingStatus(false));
    toast.success("Plan Imported!", {
      autoClose: 5000,
      closeOnClick: false,
    });
    dispatch(updateAddingPlanStatus(false));
  };

  const addCourse = async (
    id: string,
    year: Year,
    currentPlan: Plan
  ): Promise<Plan> => {
    var newPlan: Plan;
    const response = await axios.get(api + "/courses/" + id);
    var course: UserCourse = response.data.data;
    const addingYear: Year = year;
    const body = {
      user_id: user._id,
      year_id: addingYear !== null ? addingYear._id : "",
      plan_id: currentPlan._id,
      title: course.title,
      term: course.term,
      year: addingYear !== null ? addingYear.name : "",
      credits: course.credits,
      distribution_ids: currentPlan.distribution_ids,
      isPlaceholder: false,
      number: course.number,
      area: course.area,
      preReq: course.preReq,
      expireAt:
        user._id === "guestUser" ? Date.now() + 60 * 60 * 24 * 1000 : undefined,
    };
    const retrieved = await fetch(api + "/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await retrieved.json();
    if (data.errors === undefined) {
      var newUserCourse: UserCourse = { ...data.data };
      // updatePlanCourses(newUserCourse);
      curCourses = [...curCourses, newUserCourse];
      const allYears: Year[] = [...currentPlan.years];
      const newYears: Year[] = [];
      allYears.forEach((y) => {
        if (y._id === year._id) {
          const yCourses = [...y.courses, newUserCourse._id];
          newYears.push({ ...y, courses: yCourses });
        } else {
          newYears.push(y);
        }
      });
      newPlan = { ...currentPlan, years: newYears };
      dispatch(updateSelectedPlan(newPlan));
      const newPlanList = [...planList];
      for (let i = 0; i < planList.length; i++) {
        if (planList[i]._id === newPlan._id) {
          newPlanList[i] = newPlan;
        }
      }
      dispatch(updatePlanList(newPlanList));
      return newPlan;
    } else {
      console.log("Failed to add", data.errors);
    }
    return new Promise(() => newPlan);
  };

  // create a guest user
  const createUser = () =>
    new Promise<void>((resolve) => {
      dispatch(updateUser({ ...guestUser }));
      resolve();
    });

  // create a new plan
  const createPlan = (plan: Plan) =>
    new Promise<void>((resolve) => {
      dispatch(updateToAddName("Imported Plan"));
      dispatch(updateToAddMajor(getMajorFromCommonName(plan.majors[0])));
      dispatch(updateGeneratePlanAddStatus(true));
      resolve();
    });

  const login = (cookieVal: string) =>
    new Promise<void>((resolve) => {
      console.log("logging in", user);
      if (user._id === "noUser") {
        var curUser: User;
        // Retrieves user if user ID is "noUser", the initial user id state for userSlice.tsx.
        // Make call for backend
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
            console.log(retrievedUser);
            if (retrievedUser.errors === undefined) {
              dispatch(updateUser(retrievedUser.data));
              curUser = retrievedUser.data;
              getPlans(curUser);
              resolve();
            }
          })
          // .then(() => axios.get(api + '/plansByUser/' + curUser._id))
          // .then((plans) => {
          //   dispatch(updatePlanList(plans.data.data));
          //   resolve();
          // })
          .catch((err) => {
            console.log("ERROR IS: ", err);
          });
      } else {
        resolve();
      }
    });

  const getPlans = (curUser: User) =>
    new Promise<void>((resolve) =>
      axios
        .get(api + "/plansByUser/" + curUser._id)
        .then((retrieved) => {
          const retrievedPlans: Plan[] = retrieved.data.data;

          if (retrievedPlans.length > 0) {
            const totPlans: Plan[] = [];
            retrievedPlans.forEach((plan) => {
              axios
                .get(api + "/years/" + plan._id)
                .then((resp) => {
                  totPlans.push({ ...plan, years: resp.data.data });
                  if (totPlans.length === retrievedPlans.length) {
                    // Initial load, there is no current plan, so we set the current to be the first plan in the array.
                    dispatch(updatePlanList(totPlans));
                    dispatch(updateSelectedPlan(totPlans[0]));
                    resolve();
                  }
                })
                .catch((err) => console.log(err));
            });
          }
        })
        .catch((err) => {
          if (curUser._id === "guestUser") {
            console.log(
              "In guest user! This is expected as there are no users with this id."
            );
          } else {
            console.log(err);
          }
        })
    );

  // Useffect runs once on page load, calling to https://ucredit-api.herokuapp.com/api/retrieveUser to retrieve user data.
  // On successful retrieve, update redux with retrieved user,
  useEffect(() => {
    if (_id !== null) {
      toast.info("Importing Plan...", {
        autoClose: false,
        closeOnClick: false,
      });
      dispatch(updateImportingStatus(true));
      // means that the user entered a sharable link
      // first login with guest, then populate the plan with the information from the id
      history.push("/dashboard/asdfasdf");
      let plan: Plan;
      // Get the plan that we are importing, stored in plan
      axios
        .get(api + "/plans/" + _id)
        .then((planResponse) => {
          plan = planResponse.data.data;
          console.log("plan is ", plan);
          // get the years of that plan, stored in years
          axios
            .get(api + "/years/" + _id)
            .then((yearsResponse) => {
              let years: Year[] = yearsResponse.data.data;
              // check whether the user is logged in (whether a cookie exists)
              const cookieVal = document.cookie.split("=")[1];
              if (cookieVal === undefined) {
                // if not, create a user first, then add
                createUser().then(() => {
                  createPlan(plan).then(async () => {
                    console.log("created plan");
                    setToAdd(years);
                    setShouldAdd(true);
                  });
                });
              } else {
                // if so, login first, then add
                login(cookieVal).then(() => {
                  createPlan(plan).then(async () => {
                    console.log("created plan");
                    setToAdd(years);
                    setShouldAdd(true);
                  });
                });
              }
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          dispatch(updateImportingStatus(false));
          toast.error("Failed to Import", {
            autoClose: 5000,
            closeOnClick: false,
          });
          history.push("/login");
        });
    } else if (user._id === "noUser") {
      // Retrieves user if user ID is "noUser", the initial user id state for userSlice.tsx.
      // Make call for backend const cookieVals = document.cookie.split("=");
      const cookieVals = document.cookie.split("=");
      let cookieVal = "";
      cookieVals.forEach((val: string) => {
        if (val.length === 20) {
          cookieVal = val;
        }
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
            setLoginId(cookieVal);
          } else {
            console.log("errors are", retrievedUser.errors);
            history.push("/login");
          }
        })
        .catch((err) => {
          console.log("ERROR: ", err.message);
          history.push("/login");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document.cookie]);

  return (
    <div className="fixed z-20 p-3 px-6 w-full h-header bg-gradient-to-r shadow from-blue-500 to-green-400 select-none">
      <div className="flex flex-row items-center justify-end w-full h-full">
        {/* <div className="flex flex-row items-center justify-center mr-3 w-11 h-11 bg-white rounded-full"> */}
        {/* <UserSvg className="w-6 h-6 stroke-2" /> */}
        {/* </div> */}
        <div className="flex flex-row flex-grow items-center ml-5 text-white text-4xl italic font-bold">
          <img src={bird} alt="logo" className="mr-3 h-9"></img>
          <div>UCredit</div>
        </div>
        {window.innerWidth > 800 ? (
          <div className="mr-3 text-white font-semibold">
            Logged in as {user.name}!
          </div>
        ) : null}
        {user._id === "guestUser" ? (
          <a
            href="https://ucredit-api.herokuapp.com/api/login"
            className="flex flex-row items-center justify-center mr-3 w-24 h-9 bg-white rounded cursor-pointer select-none transform hover:scale-110 transition duration-200 ease-in"
          >
            Log In
          </a>
        ) : (
          <button
            onClick={() => {
              fetch(api + "/retrieveUser/" + loginId, {
                mode: "cors",
                method: "DELETE",
                credentials: "include",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              })
                .then(() => {
                  dispatch(resetUser());
                  dispatch(resetCurrentPlan());
                  history.push("/login");
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
            className="flex flex-row items-center justify-center w-24 h-9 bg-white rounded focus:outline-none cursor-pointer select-none transform hover:scale-110 transition duration-200 ease-in"
          >
            Log Out
          </button>
        )}
      </div>
    </div>
  );
}

export default UserSection;
