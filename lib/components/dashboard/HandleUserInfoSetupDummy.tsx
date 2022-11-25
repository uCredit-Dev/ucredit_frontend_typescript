import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Plan, ReviewMode } from '../../resources/commonTypes';
import {
  selectImportingStatus,
  selectPlan,
  updateSelectedPlan,
} from '../../slices/currentPlanSlice';
import {
  selectReviewMode,
  selectToken,
  selectUser,
  updatePlanList,
} from '../../slices/userSlice';
import { getAPI } from '../../resources/assets';
import { updateAddingPlanStatus } from '../../slices/popupSlice';

/**
 * Handles dashboard user entry and login logic.
 */
const HandleUserInfoSetupDummy: React.FC = () => {
  // Redux setup
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const importing = useSelector(selectImportingStatus);
  const curPlan = useSelector(selectPlan);
  const reviewMode = useSelector(selectReviewMode);

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
      if (
        (curPlan._id === 'noPlan' ||
          (!importing && user._id === curPlan.user_id)) &&
        reviewMode !== ReviewMode.View
      ) {
        axios
          .get(getAPI(window) + '/plansByUser/' + user._id, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((retrieved) => processRetrievedPlans(retrieved.data.data))
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user._id, importing]);

  const processRetrievedPlans = async (retrievedPlans: any): Promise<void> => {
    if (retrievedPlans.length > 0) {
      // sort plans by ids if there is more than one plan
      retrievedPlans.sort((plan1: Plan, plan2: Plan) =>
        plan1._id.localeCompare(plan2._id),
      );
      dispatch(updatePlanList(retrievedPlans));
      if (!curPlan || curPlan._id === 'noPlan') {
        dispatch(updateSelectedPlan(retrievedPlans[0]));
      }
      toast('Retrieved ' + retrievedPlans.length + ' plans!', {
        toastId: 'retrieved plans',
      });
    }

    if (
      retrievedPlans.length === 0 &&
      user._id !== 'noUser' &&
      user._id !== 'guestUser'
    ) {
      // If no plans, automatically generate a new plan
      dispatch(updateAddingPlanStatus(true));
    } else {
      // If there is already a current plan, simply update the
      retrievedPlans.sort((plan1: Plan, plan2: Plan) =>
        plan1._id.localeCompare(plan2._id),
      );
      // Initial load, there is no current plan, so we set the current to be the first plan in the array.
      dispatch(updatePlanList(retrievedPlans));
    }
  };

  return <></>;
};

export default HandleUserInfoSetupDummy;
