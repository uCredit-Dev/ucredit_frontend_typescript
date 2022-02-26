import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Plan, Year } from '../../resources/commonTypes';
import { selectPlan, updateSelectedPlan } from '../../slices/currentPlanSlice';
import { selectUser, updatePlanList } from '../../slices/userSlice';
import { api } from '../../resources/assets';
import { updateAddingPlanStatus } from '../../slices/popupSlice';

/**
 * Handles dashboard user entry and login logic.
 * TODO: Gracefully handle axios error cases (what happens when axios fails?), clean up extra years that are not being trash collected right now on import, and modularize this component!
 */
const HandleUserInfoSetupDummy: React.FC = () => {
  // Redux setup
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentPlan = useSelector(selectPlan);

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

  return <></>;
};

export default HandleUserInfoSetupDummy;
