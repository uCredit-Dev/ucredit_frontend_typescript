import React, { FC, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Plan } from './commonTypes';
import {
  updatePlanList,
  selectUser,
  selectPlanList,
  selectToken,
  updateGuestPlanIds,
  updateImportID,
} from '../slices/userSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  selectImportingStatus,
  updateSelectedPlan,
} from '../slices/currentPlanSlice';
import { getAPI } from './assets';
import { updateSearchTime } from '../slices/searchSlice';
import {
  selectToAddName,
  selectToAddMajors,
  selectGeneratePlanAddStatus,
  clearToAdd,
  updateGeneratePlanAddStatus,
} from '../slices/popupSlice';

/**
 * Reusable component that generates a new empty plan.
 */
const GenerateNewPlan: FC = () => {
  // Redux setup
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const planList = useSelector(selectPlanList);
  const toAddName = useSelector(selectToAddName);
  const toAddMajors = useSelector(selectToAddMajors);
  const importing = useSelector(selectImportingStatus);
  const generatePlanAddStatus = useSelector(selectGeneratePlanAddStatus);

  // UseEffect that generates a new plan everytime generateNew is true.
  useEffect(() => {
    if (!generatePlanAddStatus || toAddMajors.length === 0) return;
    const planBody = {
      name: 'Unnamed Plan',
      user_id: user._id,
      majors: toAddMajors.map((major) => major.degree_name),
      year: user.grade,
      expireAt: user._id === 'guestUser' ? Date.now() : undefined,
    };
    planBody.name = !importing ? toAddName : 'Imported ' + toAddName;
    dispatch(updateImportID(''));

    let newPlan: Plan;
    const getData = async () => {
      let response = await axios.post(getAPI(window) + '/plans', planBody, {
        headers: { Authorization: `Bearer ${token}` },
      });
      newPlan = response.data.data;
      dispatch(
        updateSearchTime({
          searchSemester: 'Fall',
          searchYear: newPlan.years[0]._id,
        }),
      );
      dispatch(updateSelectedPlan(newPlan));
      dispatch(updatePlanList([newPlan, ...planList]));
      if (!importing)
        toast.success(newPlan.name + ' created!', {
          toastId: 'plan created',
        });
      if (user._id === 'guestUser') {
        const planIdArray = [newPlan._id];
        dispatch(updateGuestPlanIds(planIdArray));
      }
      dispatch(clearToAdd());
      dispatch(updateGeneratePlanAddStatus(false));
    };
    getData().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generatePlanAddStatus]);
  return <div></div>;
};

export default GenerateNewPlan;
