import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAPI, guestUser } from '../../resources/assets';
import {
  Plan,
  SISRetrievedCourse,
  UserCourse,
  Year,
} from '../../resources/commonTypes';
import {
  selectCurrentPlanCourses,
  selectPlan,
  updateCurrentPlanCourses,
  updateImportingStatus,
  updateSelectedPlan,
} from '../../slices/currentPlanSlice';
import {
  updateToAddName,
  updateToAddMajors,
  updateGeneratePlanAddStatus,
  selectGeneratePlanAddStatus,
  updateAddingPlanStatus,
} from '../../slices/popupSlice';
import {
  updateUser,
  updatePlanList,
  updateCourseCache,
  selectImportID,
  selectPlanList,
  selectUser,
  selectToken,
} from '../../slices/userSlice';

const HandlePlanShareDummy = () => {
  const [cookies] = useCookies(['connect.sid']);
  const dispatch = useDispatch();
  const id = useSelector(selectImportID);

  const user = useSelector(selectUser);
  const currentPlan = useSelector(selectPlan);
  const generatePlanAddStatus = useSelector(selectGeneratePlanAddStatus);
  const currentCourses = useSelector(selectCurrentPlanCourses);
  const planList = useSelector(selectPlanList);
  const token = useSelector(selectToken);

  // Component state setup
  const [shouldAdd, setShouldAdd] = useState<boolean>(false);
  const [toAdd, setToAdd] = useState<Year[]>([]);
  const [cached, setCached] = useState<boolean>(false);

  useEffect(() => {
    if (id !== null) {
      handleExistingUser(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle the case where the user is already exists
  const handleExistingUser = async (id: string): Promise<void> => {
    const planResponse: any = await axios
      .get(getAPI(window) + '/plans/' + id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((e) => {
        dispatch(updateImportingStatus(false));
        toast.dismiss();
        toast.error(
          "Failed to Import. Please log in and try again or check your link... If that doesn't work. This is an issue on our end! Please report it in the feedback form and we will get to it asap!",
          {
            closeOnClick: false,
            autoClose: false,
            toastId: 'failed to import',
          },
        );
      });

    if (planResponse === undefined) return Promise.reject();
    let plan: Plan = planResponse.data.data;
    // get the years of that plan, stored in years
    const yearsResponse: any = await axios
      .get(getAPI(window) + '/years/' + id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((e) => {
        console.log('ERROR: ', e);
      });

    cache(id);
    let years = yearsResponse.data.data;
    // check whether the user is logged in (whether a cookie exists)
    let cookieVal = '';
    Object.entries(cookies).forEach((cookie: any) => {
      if (cookie[0] === '_hjid' || cookie[0] === 'connect.sid')
        cookieVal = cookie[1];
    });
    if (cookieVal === '') {
      // if not, create a user first, then add
      dispatch(updateToAddName(plan.name));
      dispatch(updateToAddMajors(plan.major_ids));
      setToAdd(years);
      dispatch(updateUser(guestUser));
      dispatch(updateGeneratePlanAddStatus(true));
      setShouldAdd(true);
    } else {
      // if so, login first, then add
      afterPromise(plan, years);
    }
  };

  const afterPromise = (plan: Plan, years: Year[]) => {
    dispatch(updateToAddName(plan.name));
    dispatch(updateToAddMajors(plan.major_ids));
    dispatch(updateGeneratePlanAddStatus(true));
    setToAdd(years);
    setShouldAdd(true);
  };

  /**
   * Caches all courses in plans
   * @param id - plan id
   */
  const cache = (id: string) => {
    axios
      .get(getAPI(window) + '/coursesByPlan/' + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const sisCourses: SISRetrievedCourse[] = response.data.data;
        dispatch(updateCourseCache(sisCourses));
      })
      .catch((err) => {
        console.log(err);
      });
    setCached(true);
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
    user._id,
    currentPlan._id,
    currentCourses,
    cached,
    generatePlanAddStatus,
  ]);

  /**
   * Deep copies sharer's plan into your own.
   */
  const addImportedYears = async (): Promise<void> => {
    let empty = true;
    let allYears: Year[] = [];

    if (toAdd.length === 0) {
      dispatch(updateImportingStatus(false));
      dispatch(updateAddingPlanStatus(false));
    }
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
        expireAt: user._id === 'guestUser' ? Date.now() : undefined,
      }; // add to end by default
      const postYearResp: any = await axios
        .post(getAPI(window) + '/years', body, {
          headers: { Authorization: `Bearer ${token}` },
        })
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
          await axios.delete(getAPI(window) + '/years/' + y._id, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }

        // Update plan with new years
        const changeYearOrderResp: any = await axios
          .patch(
            getAPI(window) + '/years/changeOrder',
            {
              plan_id: currentPlan._id,
              year_ids: [...allYears.map((y) => y._id)],
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          )
          .catch((err) => console.log(err));
        newUpdatedPlan = { ...changeYearOrderResp.data.data, years: allYears };
        dispatch(updateSelectedPlan(newUpdatedPlan));
        empty = await addImportedCourses(empty, newUpdatedPlan);
        if (empty) {
          dispatch(updateImportingStatus(false));
          dispatch(updateAddingPlanStatus(false));
        }
      }
    });
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
        if (empty) emptyClone = false;
        const courseResponse = await addCourse(
          course._id,
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
            courses: [...y.courses, cur],
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
        toastId: 'plan imported',
      });
      dispatch(updateAddingPlanStatus(false));
    }
  };

  /**
   * Overloaded function that adds courses from plan from shareable link.
   * @param courseId - course id to add
   * @param yearIndex - position of year in plan
   * @param plan - plan to add to
   * @returns a promise that resolves on successful deep copy of plan
   */
  const addCourse = async (
    courseId: string,
    yearIndex: number,
    plan: Plan,
  ): Promise<UserCourse> => {
    return new Promise((resolve) => {
      axios
        .get(getAPI(window) + '/courses/' + courseId)
        .then((response) => {
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
            isPlaceholder: false,
            number: course.number,
            areas: course.areas,
            tags: course.tags,
            department: course.department,
            preReq: course.preReq,
            level: course.level,
            version: course.version,
            wi: course.wi,
            expireAt: user._id === 'guestUser' ? Date.now() : undefined,
          };
          fetch(getAPI(window) + '/courses', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
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
        })
        .catch((err) =>
          console.log('error creating course while sharing', err),
        );
    });
  };

  return <></>;
};

export default HandlePlanShareDummy;
