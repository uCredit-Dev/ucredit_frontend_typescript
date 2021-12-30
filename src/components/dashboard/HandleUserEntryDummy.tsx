import { useEffect, FC, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Plan, User, UserCourse, Year } from '../../resources/commonTypes';
import {
  selectCurrentPlanCourses,
  selectPlan,
  updateCurrentPlanCourses,
  updateImportingStatus,
  updateSelectedPlan,
} from '../../slices/currentPlanSlice';
import {
  selectPlanList,
  selectUser,
  updateCourseCache,
  updatePlanList,
  updateUser,
} from '../../slices/userSlice';
import { api, guestUser } from '../../resources/assets';
import {
  selectGeneratePlanAddStatus,
  updateAddingPlanStatus,
  updateGeneratePlanAddStatus,
  updateToAddMajor,
  updateToAddName,
} from '../../slices/popupSlice';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { getMajorFromCommonName } from '../../resources/majors';

/**
 * Handles dashboard user entry and login logic.
 * TODO: Gracefully handle axios error cases (what happens when axios fails?), clean up extra years that are not being trash collected right now on import, and modularize this component!
 */
const HandleUserEntryDummy: FC<{
  id: string | null;
}> = ({ id }) => {
  // Redux setup
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentPlan = useSelector(selectPlan);
  const generatePlanAddStatus = useSelector(selectGeneratePlanAddStatus);
  const currentCourses = useSelector(selectCurrentPlanCourses);
  const planList = useSelector(selectPlanList);

  // Component state setup
  const [toAdd, setToAdd] = useState<Year[]>([]);
  const [shouldAdd, setShouldAdd] = useState<boolean>(false);
  const [cached, setCached] = useState<boolean>(false);
  const [cookies] = useCookies(['connect.sid']);
  let navigate = useNavigate();

  // Adds a new plan every time a new guest user is created and they don't have a a plan.
  useEffect(() => {
    if (user && user.plan_ids.length === 0 && user._id === 'guestUser') {
      // Post req body for a new plan
      dispatch(updateAddingPlanStatus(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user._id]);

  // Gets all users's plans and updates state everytime a new user is chosen.
  useEffect(() => {
    if (user._id !== 'noUser' && user._id !== 'guestUser') {
      axios
        .get(api + '/plansByUser/' + user._id)
        .then((retrieved) => {
          processRetrievedPlans(retrieved.data.data);
        })
        .catch((err) => {
          if (user._id === 'guestUser') {
            console.log(
              'In guest user! This is expected as there are no users with this id.',
            );
          } else {
            console.log('ERROR:', err);
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user._id]);

  const processRetrievedPlans = async (retrievedData: any): Promise<void> => {
    const retrievedPlans: Plan[] = retrievedData;
    if (retrievedPlans.length > 0) {
      // sort plans by ids if there is more than one plan
      retrievedPlans.sort((plan1: Plan, plan2: Plan) =>
        plan1._id.localeCompare(plan2._id),
      );
    }

    if (currentPlan._id !== 'noPlan') {
      // Swap first plan in the list with the current plan.
      retrievedPlans.forEach((plan: Plan, index) => {
        if (plan._id === currentPlan._id) {
          const temp = retrievedPlans[0];
          retrievedPlans[0] = currentPlan;
          retrievedPlans[index] = temp;
        }
      });
    }

    if (retrievedPlans.length > 0 && currentPlan._id === 'noPlan') {
      let totPlans: Plan[] = [];
      retrievedPlans.forEach(async (plan) => {
        totPlans = await processYears(plan, totPlans, retrievedPlans);
      });
      toast('Retrieved ' + retrievedPlans.length + ' plans!');
    } else if (
      retrievedPlans.length === 0 &&
      user._id !== 'noUser' &&
      user._id !== 'guestUser'
    ) {
      // If no plans, automatically generate a new plan
      dispatch(updateAddingPlanStatus(true));
    } else {
      // If there is already a current plan, simply update the plan list.
      let totPlans: Plan[] = [];
      retrievedPlans.forEach(async (plan) => {
        const resp: any = await axios
          .get(api + '/years/' + plan._id)
          .catch((err) => console.log(err));
        totPlans.push({ ...plan, years: resp.data.data });
        totPlans.sort((plan1: Plan, plan2: Plan) =>
          plan1._id.localeCompare(plan2._id),
        );
        if (totPlans.length === retrievedPlans.length) {
          // Initial load, there is no current plan, so we set the current to be the first plan in the array.
          dispatch(updatePlanList(totPlans));
        }
      });
    }
  };

  // Processes the years of a plan and adds them to the total plans array.
  const processYears = async (
    plan: Plan,
    totPlans: Plan[],
    retrievedPlans,
  ): Promise<Plan[]> => {
    const resp: any = await axios
      .get(api + '/years/' + plan._id)
      .catch((err) => console.log(err));

    // Update Years if they are part of old plan schemas.
    const years: Year[] = resp.data.data;
    const initialYearVal: number = getStartYear(user.grade);
    const processedYears: Year[] = years.map((year: Year, i: number) => {
      if (year.year === undefined || year.year < 100) {
        return {
          ...year,
          year: initialYearVal + i,
        };
      }
      return year;
    });

    totPlans.push({ ...plan, years: processedYears });
    if (totPlans.length === retrievedPlans.length) {
      // Initial load, there is no current plan, so we set the current to be the first plan in the array.
      totPlans.sort((plan1: Plan, plan2: Plan) =>
        plan1._id.localeCompare(plan2._id),
      );
      dispatch(updatePlanList(totPlans));
      dispatch(updateSelectedPlan(totPlans[0]));
    }
    return Promise.resolve(totPlans);
  };

  // Gets the start year of the user's grade.
  const getStartYear = (year: string): number => {
    if (year.includes('Sophomore')) {
      return new Date().getFullYear() - 1;
    } else if (year.includes('Junior')) {
      return new Date().getFullYear() - 2;
    } else if (year.includes('Senior')) {
      return new Date().getFullYear() - 3;
    } else if (year.includes('Fifth year')) {
      return new Date().getFullYear() - 4;
    } else {
      return new Date().getFullYear();
    }
  };

  // Imports or creates new plan.
  useEffect(() => {
    if (
      shouldAdd &&
      user._id !== 'noUser' &&
      currentPlan._id !== 'noPlan' &&
      cached &&
      !generatePlanAddStatus
    ) {
      addImportedYears();
      setShouldAdd(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    shouldAdd,
    toAdd,
    user,
    currentPlan,
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
          .get('https://ucredit-dev.herokuapp.com/api/search', {
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
  const addImportedYears = async (): Promise<void> => {
    let empty = true;
    let allYears: Year[] = [];

    // Check for extraneous years
    toAdd.forEach(async (year, i) => {
      const yearBody: Year = {
        name: year.name,
        _id: '',
        plan_id: currentPlan._id,
        user_id: user._id,
        courses: [],
        year: year.year,
      };

      const body = {
        ...yearBody,
        preUniversity: false,
        expireAt:
          user._id === 'guestUser'
            ? Date.now() + 60 * 60 * 24 * 1000
            : undefined,
      }; // add to end by default
      const postYearResp: any = await axios
        .post(api + '/years', body)
        .catch((err) => console.log(err));
      const newYear: Year = { ...postYearResp.data.data };
      allYears = [...allYears, newYear];
      let newUpdatedPlan: Plan = {
        ...currentPlan,
      };
      if (allYears.length === toAdd.length) {
        allYears.sort((y1, y2) => y1.year - y2.year);

        // Deletes unused autogenerated years
        for (let y of currentPlan.years) {
          await axios.delete(api + '/years/' + y._id);
        }

        // Update plan with new years
        const changeYearOrderResp: any = await axios
          .patch(api + '/years/changeOrder', {
            plan_id: currentPlan._id,
            year_ids: [...allYears.map((y) => y._id)],
          })
          .catch((err) => console.log(err));
        newUpdatedPlan = { ...changeYearOrderResp.data.data, years: allYears };
        dispatch(updateSelectedPlan(newUpdatedPlan));
        await addImportedCourses(empty, newUpdatedPlan);
      }
    });

    if (empty) {
      dispatch(updateImportingStatus(false));
      dispatch(updateAddingPlanStatus(false));
    }
  };

  // Adds courses from imported plan.
  const addImportedCourses = async (
    empty: boolean,
    newUpdatedPlan: Plan,
  ): Promise<boolean> => {
    let added: UserCourse[] = [];
    let total: number = 0;
    let emptyClone: boolean = empty;
    toAdd.forEach((year: Year) => {
      total += year.courses.length;
    });

    for (const yearIt of toAdd) {
      for (const course of yearIt.courses) {
        emptyClone = false;
        const courseResponse = await addCourse(
          course,
          toAdd.indexOf(yearIt),
          newUpdatedPlan,
        );
        added = [...added, courseResponse];
        handleFinishAdding(newUpdatedPlan, added, total);
      }
    }
    return emptyClone;
  };

  // Handles updating plan when imported courses are finished adding.
  const handleFinishAdding = (
    newUpdatedPlan: Plan,
    added: UserCourse[],
    total: number,
  ) => {
    let allYearsClone: Year[] = [...newUpdatedPlan.years];
    let newYears: Year[] = [];
    for (let y of allYearsClone) {
      newYears.push({ ...y });
    }
    for (let cur of added) {
      const nextYears: Year[] = [];
      for (let y of newYears) {
        if (cur.year_id === y._id) {
          nextYears.push({
            ...y,
            courses: [...y.courses, cur._id],
          });
        } else {
          nextYears.push(y);
        }
      }
      newYears = nextYears;
    }
    let newPlan: Plan = {
      ...newUpdatedPlan,
      years: newYears,
    };
    const newPlanList = [...planList];
    for (let it = 0; it < planList.length; it++) {
      if (planList[it]._id === newPlan._id) {
        newPlanList[it] = newPlan;
      }
    }
    newPlanList.sort((p1: Plan, p2: Plan) => p1._id.localeCompare(p2._id));
    dispatch(updatePlanList(newPlanList));
    dispatch(updateCurrentPlanCourses(added));
    dispatch(updateSelectedPlan(newPlan));
    if (total === added.length) {
      dispatch(updateImportingStatus(false));
      toast.dismiss();
      toast.success('Plan Imported!', {
        autoClose: 5000,
        closeOnClick: false,
      });
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
    courseId: string,
    yearIndex: number,
    plan: Plan,
  ): Promise<UserCourse> => {
    return new Promise((resolve) => {
      axios.get(api + '/courses/' + courseId).then((response) => {
        let course: UserCourse = response.data.data;
        const addingYear: Year = plan.years[yearIndex];

        const body = {
          user_id: user._id,
          year_id: addingYear._id,
          plan_id: currentPlan._id,
          title: course.title,
          term: course.term,
          year: addingYear.name,
          credits: course.credits,
          distribution_ids: currentPlan.distribution_ids,
          isPlaceholder: false,
          number: course.number,
          area: course.area,
          preReq: course.preReq,
          expireAt:
            user._id === 'guestUser'
              ? Date.now() + 60 * 60 * 24 * 1000
              : undefined,
        };
        fetch(api + '/courses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })
          .then((retrieved) => retrieved.json())
          .then((data) => {
            if (data.errors === undefined) {
              let newUserCourse: UserCourse = { ...data.data };
              return resolve(newUserCourse);
            } else {
              console.log('Failed to add', data.errors);
            }
          });
      });
    });
  };

  const afterPromise = (plan: Plan, years: Year[]) => {
    dispatch(updateToAddName(plan.name));
    dispatch(updateToAddMajor(getMajorFromCommonName(plan.majors[0])));
    dispatch(updateGeneratePlanAddStatus(true));
    setToAdd(years);
    setShouldAdd(true);
  };

  /**
   * Attempts to log in user
   * @param cookieVal - value of stored login session hash
   * @returns a promises that resolves on success or failure in logging in
   */
  const login = (cookieVal: string, plan, years) => {
    if (user._id === 'noUser') {
      let curUser: User;
      // Retrieves user if user ID is "noUser", the initial user id state for userSlice.tsx.
      // Make call for backend
      fetch(api + '/retrieveUser/' + cookieVal, {
        mode: 'cors',
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((resp) => resp.json())
        .then((retrievedUser) => {
          if (retrievedUser.errors === undefined) {
            dispatch(updateUser(retrievedUser.data));
            curUser = retrievedUser.data;
            getPlans(curUser).then(() => {
              afterPromise(plan, years);
            });
          } else if (id === null) {
            console.log("ERROR: Couldn't log in with " + cookieVal);
            navigate('/login');
          } else {
            console.log("ERROR: Couldn't log in with " + cookieVal);
            dispatch(updateUser(guestUser));
            afterPromise(plan, years);
          }
        })
        .catch((err) => {
          console.log('ERROR with cookieVal ' + cookieVal + ' is ', err);
          afterPromise(plan, years);
          if (id === null) {
            navigate('/login');
          }
        });
    } else {
      afterPromise(plan, years);
    }
  };

  /**
   * Gets all plans from current user.
   * @param curUser - current user
   * @returns a promise that resolves once plans are finished fetching
   */
  const getPlans = (curUser: User) =>
    new Promise<void>((resolve) =>
      axios.get(api + '/plansByUser/' + curUser._id).then((retrieved) => {
        const retrievedPlans: Plan[] = retrieved.data.data;
        if (retrievedPlans.length > 0) {
          const totPlans: Plan[] = [];
          retrievedPlans.forEach((plan) => {
            axios
              .get(api + '/years/' + plan._id)
              .then((resp) => {
                totPlans.push({ ...plan, years: resp.data.data });
                if (totPlans.length === retrievedPlans.length) {
                  // Initial load, there is no current plan, so we set the current to be the first plan in the array.
                  totPlans.sort((p1: Plan, p2: Plan) =>
                    p1._id.localeCompare(p2._id),
                  );
                  dispatch(updatePlanList(totPlans));
                  dispatch(updateSelectedPlan(totPlans[0]));
                  resolve();
                }
              })
              .catch((err) => console.log(err));
          });
        }
      }),
    );

  // Useffect runs once on page load, calling to https://ucredit-api.herokuapp.com/api/retrieveUser to retrieve user data.
  // On successful retrieve, update redux with retrieved user,
  useEffect(() => {
    if (id !== null) {
      // Retrieves user if user ID is "noUser", the initial user id state for userSlice.tsx.
      // Make call for backend const cookieVals = document.cookie.split("=");
      let cookieVal = '';
      Object.entries(cookies).forEach((cookie: any) => {
        if (cookie[0] === '_hjid' || cookie[0] === 'connect.sid')
          cookieVal = cookie[1];
      });
      axios
        .get(api + '/retrieveUser/' + cookieVal, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((retrievedUser) => {
          toast.info('Importing Plan...', {
            autoClose: false,
            closeOnClick: false,
          });
          dispatch(updateUser(retrievedUser.data.data));

          // // means that the user entered a sharable link
          // // first login with guest, then populate the plan with the information from the id
          navigate('/dashboard');
          dispatch(updateImportingStatus(true));
          // Get the plan that we are importing, stored in plan
          handleExistingUser();
        })
        .catch((err) => {
          toast.info('Importing Plan...', {
            autoClose: false,
            closeOnClick: false,
          });
          dispatch(updateUser(guestUser));
          dispatch(updateImportingStatus(true));
          // means that the user entered a sharable link
          // first login with guest, then populate the plan with the information from the id
          navigate('/dashboard');
          // Get the plan that we are importing, stored in plan
          handleExistingUser();
        });
    } else if (user._id === 'noUser') {
      // Retrieves user if user ID is "noUser", the initial user id state for userSlice.tsx.
      // Make call for backend const cookieVals = document.cookie.split("=");
      let cookieVal = '';
      Object.entries(cookies).forEach((cookie: any) => {
        if (cookie[0] === '_hjid' || cookie[0] === 'connect.sid')
          cookieVal = cookie[1];
      });
      axios
        .get(api + '/retrieveUser/' + cookieVal, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((retrievedUser) => {
          dispatch(updateUser(retrievedUser.data.data));
        })
        .catch((err) => {
          console.log('ERROR: ', err);
          navigate('/login');
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document.cookie]);

  // Handle the case where the user is already exists
  const handleExistingUser = async (): Promise<void> => {
    const planResponse: any = await axios
      .get(api + '/plans/' + id)
      .catch((e) => {
        dispatch(updateImportingStatus(false));
        toast.dismiss();
        toast.error(
          "Failed to Import. Please log in and try again... If that doesn't work. This is an issue on our end! Please report it in the feedback form and we will get to it asap!",
          {
            closeOnClick: false,
            autoClose: false,
          },
        );
        navigate('/login');
      });

    let plan: Plan = planResponse.data.data;
    // get the years of that plan, stored in years
    const yearsResponse: any = await axios
      .get(api + '/years/' + id)
      .catch((e) => {
        console.log('ERROR: ', e);
      });
    let years = yearsResponse.data.data;
    cache(years);
    // check whether the user is logged in (whether a cookie exists)
    let cookieVal = '';
    Object.entries(cookies).forEach((cookie: any) => {
      if (cookie[0] === '_hjid' || cookie[0] === 'connect.sid')
        cookieVal = cookie[1];
    });
    if (cookieVal === '') {
      // if not, create a user first, then add
      dispatch(updateToAddName(plan.name));
      dispatch(updateToAddMajor(getMajorFromCommonName(plan.majors[0])));
      setToAdd(years);
      dispatch(updateUser(guestUser));
      dispatch(updateGeneratePlanAddStatus(true));
      setShouldAdd(true);
    } else {
      // if so, login first, then add
      login(cookieVal, plan, years);
    }
  };

  return <></>;
};

export default HandleUserEntryDummy;
