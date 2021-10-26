import { useEffect, FC, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Plan, User, UserCourse, Year } from "../../resources/commonTypes";
import {
  selectCurrentPlanCourses,
  selectPlan,
  updateCurrentPlanCourses,
  updateImportingStatus,
  updateSelectedPlan,
} from "../../slices/currentPlanSlice";
import {
  selectPlanList,
  selectUser,
  updateCourseCache,
  updatePlanList,
  updateUser,
} from "../../slices/userSlice";
import { api, guestUser } from "../../resources/assets";
import {
  selectGeneratePlanAddStatus,
  updateAddingPlanStatus,
  updateGeneratePlanAddStatus,
  updateToAddMajor,
  updateToAddName,
} from "../../slices/popupSlice";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router";
import { getMajorFromCommonName } from "../../resources/majors";

/**
 * Handles dashboard user entry and login logic.
 */
const HandleUserEntryDummy: FC<{ setLoginId: Function; _id: string | null }> =
  ({ setLoginId, _id }) => {
    // Redux setup
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const currentPlan = useSelector(selectPlan);
    const curPlan = useSelector(selectPlan);
    const generatePlanAddStatus = useSelector(selectGeneratePlanAddStatus);
    const currentCourses = useSelector(selectCurrentPlanCourses);
    const planList = useSelector(selectPlanList);

    // Component state setup
    const [toAdd, setToAdd] = useState<Year[]>([]);
    const [shouldAdd, setShouldAdd] = useState<boolean>(false);
    const [cached, setCached] = useState<boolean>(false);
    const [cookies] = useCookies(["connect.sid"]);
    let history = useHistory();

    // Adds a new plan every time a new guest user is created and they don't have a a plan.
    useEffect(() => {
      if (user.plan_ids.length === 0 && user._id === "guestUser") {
        // Post req body for a new plan
        dispatch(updateAddingPlanStatus(true));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user._id]);

    // Gets all users's plans and updates state everytime a new user is chosen.
    useEffect(() => {
      if (user._id !== "noUser" && user._id !== "guestUser") {
        axios
          .get(api + "/plansByUser/" + user._id)
          .then((retrieved) => {
            const retrievedPlans: Plan[] = retrieved.data.data;
            if (retrievedPlans.length > 0) {
              // sort plans by ids if there is more than one plan
              retrievedPlans.sort((plan1: Plan, plan2: Plan) =>
                plan1._id.localeCompare(plan2._id)
              );
            }

            if (currentPlan._id !== "noPlan") {
              // Swap first plan in the list with the current plan.
              retrievedPlans.forEach((plan: Plan, index) => {
                if (plan._id === currentPlan._id) {
                  const temp = retrievedPlans[0];
                  retrievedPlans[0] = currentPlan;
                  retrievedPlans[index] = temp;
                }
              });
            }

            if (retrievedPlans.length > 0 && currentPlan._id === "noPlan") {
              const totPlans: Plan[] = [];
              retrievedPlans.forEach((plan) => {
                axios
                  .get(api + "/years/" + plan._id)
                  .then((resp) => {
                    // Update Years if they are part of old plan schemas.
                    const years: Year[] = resp.data.data;
                    const initialYearVal: number = getStartYear(user.grade);
                    const processedYears: Year[] = years.map(
                      (year: Year, i: number) => {
                        if (year.year < 100) {
                          year.year = initialYearVal + i;
                        }
                        return year;
                      }
                    );

                    totPlans.push({ ...plan, years: processedYears });
                    if (totPlans.length === retrievedPlans.length) {
                      // Initial load, there is no current plan, so we set the current to be the first plan in the array.
                      dispatch(updatePlanList(totPlans));
                      dispatch(updateSelectedPlan(totPlans[0]));
                    }
                  })
                  .catch((err) => console.log(err));
              });

              toast("Retrieved " + retrievedPlans.length + " plans!");
            } else if (
              retrievedPlans.length === 0 &&
              user._id !== "noUser" &&
              user._id !== "guestUser"
            ) {
              // If no plans, automatically generate a new plan
              dispatch(updateAddingPlanStatus(true));
            } else {
              // If there is already a current plan, simply update the plan list.
              const totPlans: Plan[] = [];
              retrievedPlans.forEach((plan) => {
                axios
                  .get(api + "/years/" + plan._id)
                  .then((resp) => {
                    totPlans.push({ ...plan, years: resp.data.data });
                    if (totPlans.length === retrievedPlans.length) {
                      // Initial load, there is no current plan, so we set the current to be the first plan in the array.
                      dispatch(updatePlanList(retrievedPlans));
                    }
                  })
                  .catch((err) => console.log(err));
              });
            }
          })
          .catch((err) => {
            if (user._id === "guestUser") {
              console.log(
                "In guest user! This is expected as there are no users with this id."
              );
            } else {
              console.log(err);
            }
          });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user._id]);

    const getStartYear = (year: string): number => {
      if (year.includes("Sophomore")) {
        return new Date().getFullYear() - 1;
      } else if (year.includes("Junior")) {
        return new Date().getFullYear() - 2;
      } else if (year.includes("Senior")) {
        return new Date().getFullYear() - 3;
      } else if (year.includes("Fifth year")) {
        return new Date().getFullYear() - 4;
      } else {
        return new Date().getFullYear();
      }
    };

    // Imports or creates new plan.
    useEffect(() => {
      if (
        shouldAdd &&
        user._id !== "noUser" &&
        curPlan._id !== "noPlan" &&
        cached &&
        !generatePlanAddStatus
      ) {
        addCourses();
        setShouldAdd(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      shouldAdd,
      toAdd,
      user,
      curPlan,
      currentCourses,
      cached,
      generatePlanAddStatus,
    ]);

    /**
     * Caches all courses in plans
     * @param years - an array of years of the plan
     */
    const cache = (years: Year[]) => {
      let total = 0;
      let cum = 0;
      years.forEach((y) => {
        y.courses.forEach((c) => {
          total++;
          axios
            .get("https://ucredit-dev.herokuapp.com/api/search", {
              params: { query: c },
            })
            .then((retrieved) => {
              dispatch(updateCourseCache([retrieved.data.data]));
              cum++;
              if (cum === total) {
                setCached(true);
              }
            });
        });
      });
    };

    /**
     * Deep copies sharer's plan into your own.
     */
    const addCourses = async () => {
      let added: UserCourse[] = [];
      let total = 0;
      let empty = true;
      for (const year of toAdd) {
        for (const course of year.courses) {
          total++;
          empty = false;
          // eslint-disable-next-line no-loop-func
          addCourse(course, toAdd.indexOf(year)).then((curCourse) => {
            added.push(curCourse);
            if (added.length === total) {
              let allYears: Year[] = [...curPlan.years];
              let newYears: Year[] = [];
              for (let y of allYears) {
                newYears.push({ ...y });
              }
              for (let cur of added) {
                const nextYears: Year[] = [];
                for (let y of newYears) {
                  if (cur.year_id === y._id) {
                    nextYears.push({ ...y, courses: [...y.courses, cur._id] });
                  } else {
                    nextYears.push(y);
                  }
                }
                newYears = nextYears;
              }
              let newPlan: Plan = { ...curPlan, years: newYears };
              const newPlanList = [...planList];
              for (let i = 0; i < planList.length; i++) {
                if (planList[i]._id === newPlan._id) {
                  newPlanList[i] = newPlan;
                }
              }
              dispatch(updatePlanList(newPlanList));
              dispatch(updateCurrentPlanCourses(added));
              dispatch(updateSelectedPlan(newPlan));
              dispatch(updateImportingStatus(false));
              toast.dismiss();
              toast.success("Plan Imported!", {
                autoClose: 5000,
                closeOnClick: false,
              });
              dispatch(updateAddingPlanStatus(false));
            }
          });
        }
      }
      if (empty) {
        dispatch(updateImportingStatus(false));
        dispatch(updateAddingPlanStatus(false));
      }
    };

    /**
     * Overloaded function that adds courses from plan from shareable link.
     * @param id - plan id of sharer's plan
     * @param yearIndex - position of year in plan
     * @returns a promise that resolves on successful deep copy of plan
     */
    const addCourse = async (
      id: string,
      yearIndex: number
    ): Promise<UserCourse> => {
      return new Promise((resolve) => {
        axios.get(api + "/courses/" + id).then((response) => {
          let course: UserCourse = response.data.data;
          const addingYear: Year = curPlan.years[yearIndex];
          const body = {
            user_id: user._id,
            year_id: addingYear !== null ? addingYear._id : "",
            plan_id: curPlan._id,
            title: course.title,
            term: course.term,
            year: addingYear !== null ? addingYear.name : "",
            credits: course.credits,
            distribution_ids: curPlan.distribution_ids,
            isPlaceholder: false,
            number: course.number,
            area: course.area,
            preReq: course.preReq,
            expireAt:
              user._id === "guestUser"
                ? Date.now() + 60 * 60 * 24 * 1000
                : undefined,
          };
          fetch(api + "/courses", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }).then((retrieved) => {
            retrieved.json().then((data) => {
              if (data.errors === undefined) {
                let newUserCourse: UserCourse = { ...data.data };
                return resolve(newUserCourse);
              } else {
                console.log("Failed to add", data.errors);
              }
            });
          });
        });
      });
    };

    /**
     * Attempts to log in user
     * @param cookieVal - value of stored login session hash
     * @returns a promises that resolves on success or failure in logging in
     */
    const login = (cookieVal: string) =>
      new Promise<void>((resolve) => {
        if (user._id === "noUser") {
          let curUser: User;
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
              if (retrievedUser.errors === undefined) {
                dispatch(updateUser(retrievedUser.data));
                curUser = retrievedUser.data;
                getPlans(curUser).then(() => {
                  resolve();
                });
              } else {
                console.log("ERROR: Couldn't log in with " + cookieVal);
                history.push("/login");
              }
            })
            .catch((err) => {
              console.log("ERROR with cookieVal " + cookieVal + " is ", err);
              if (_id === null) {
                history.push("/login");
              }
            });
        } else {
          resolve();
        }
      });

    /**
     * Gets all plans from current user.
     * @param curUser - current user
     * @returns a promise that resolves once plans are finished fetching
     */
    const getPlans = (curUser: User) =>
      new Promise<void>((resolve) =>
        axios.get(api + "/plansByUser/" + curUser._id).then((retrieved) => {
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
        history.push("/dashboard");
        let plan: Plan;
        // Get the plan that we are importing, stored in plan
        axios
          .get(api + "/plans/" + _id)
          .then((planResponse) => {
            plan = planResponse.data.data;
            // get the years of that plan, stored in years
            axios
              .get(api + "/years/" + _id)
              .then((yearsResponse) => {
                let years: Year[] = yearsResponse.data.data;
                cache(years);
                // check whether the user is logged in (whether a cookie exists)
                let cookieVal = "";
                Object.entries(cookies).forEach((cookie: any) => {
                  if (cookie[0] === "_hjid" || cookie[0] === "connect.sid")
                    cookieVal = cookie[1];
                });
                if (cookieVal === "") {
                  // if not, create a user first, then add
                  dispatch(updateUser({ ...guestUser }));
                  dispatch(updateToAddName(plan.name));
                  dispatch(
                    updateToAddMajor(getMajorFromCommonName(plan.majors[0]))
                  );
                  dispatch(updateGeneratePlanAddStatus(true));
                  setToAdd(years);
                  setShouldAdd(true);
                } else {
                  // if so, login first, then add
                  login(cookieVal).then(() => {
                    dispatch(updateToAddName(plan.name));
                    dispatch(
                      updateToAddMajor(getMajorFromCommonName(plan.majors[0]))
                    );
                    dispatch(updateGeneratePlanAddStatus(true));
                    setToAdd(years);
                    setShouldAdd(true);
                  });
                }
              })
              .catch((e) => {
                console.log("ERROR: ", e);
              });
          })
          .catch((e) => {
            dispatch(updateImportingStatus(false));
            toast.dismiss();
            toast.error(
              "Failed to Import. Please log in and try again... If that doesn't work. This is an issue on our end! Please report it in the feedback form and we will get to it asap!",
              {
                closeOnClick: false,
                autoClose: false,
              }
            );
            history.push("/login");
          });
      } else if (user._id === "noUser") {
        // Retrieves user if user ID is "noUser", the initial user id state for userSlice.tsx.
        // Make call for backend const cookieVals = document.cookie.split("=");
        let cookieVal = "";
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
              setLoginId(cookieVal);
            } else {
              console.log("ERROR: ", retrievedUser.errors);
              history.push("/login");
            }
          });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [document.cookie]);
    return <></>;
  };

export default HandleUserEntryDummy;
