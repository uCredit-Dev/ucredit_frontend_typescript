import { Selectable, SelectableOptions } from '@robertz65/lyte';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { components, MultiValueProps, StylesConfig } from 'react-select';
import { toast } from 'react-toastify';
import { getAPI } from '../../resources/assets';
import { ReviewMode, Year, Plan } from '../../resources/commonTypes';
import { allMajors } from '../../resources/majors';
import {
  selectPlan,
  updateSelectedPlan,
  updateCurrentPlanCourses,
} from '../../slices/currentPlanSlice';
import {
  selectInfoPopup,
  updateAddingPlanStatus,
  updateDeletePlanStatus,
} from '../../slices/popupSlice';
import { selectSearchStatus } from '../../slices/searchSlice';
import {
  selectPlanList,
  selectUser,
  selectReviewMode,
  updatePlanList,
} from '../../slices/userSlice';

const majorOptions = allMajors.map((major, index) => ({
  value: index,
  label: major.degree_name,
}));

const Actionbar: FC<{ mode: ReviewMode }> = ({ mode }) => {
  const planList = useSelector(selectPlanList);
  const currentPlan = useSelector(selectPlan);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const infoPopup = useSelector(selectInfoPopup);
  const reviewMode = useSelector(selectReviewMode);
  const [planName, setPlanName] = useState<string>(currentPlan.name);
  const [editName, setEditName] = useState<boolean>(false);
  const [openEditArea, setOpenEditArea] = useState<boolean>(false);
  const [shareableURL, setShareableURL] = useState<string>('');
  const searchStatus = useSelector(selectSearchStatus);

  // Only edits name if editName is true. If true, calls debounce update function
  useEffect(() => {
    if (editName) {
      const update = setTimeout(updateName, 1000);
      return () => clearTimeout(update);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planName]);

  // Updates current plan every time current plan changes
  useEffect((): void => {
    setPlanName(currentPlan.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlan._id]);

  const updateName = (): void => {
    const body = {
      plan_id: currentPlan._id,
      majors: currentPlan.majors,
      name: planName,
    };
    fetch(getAPI(window) + '/plans/update', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(() => {
        const newUpdatedPlan = { ...currentPlan, name: planName };
        dispatch(updateSelectedPlan(newUpdatedPlan));
        let newPlanList = [...planList];
        for (let i = 0; i < planList.length; i++) {
          if (newPlanList[i]._id === currentPlan._id) {
            newPlanList[i] = { ...newUpdatedPlan };
          }
        }
        toast.success('Plan name changed to ' + planName + '!');
        setEditName(false);
        dispatch(updatePlanList(newPlanList));
      })
      .catch((err) => console.log(err));
  };

  const handlePlanChange = (values) => {
    const selected = values[0];
    if (selected.label === 'Create New Plan' && user._id !== 'noUser') {
      dispatch(updateAddingPlanStatus(true));
    } else {
      toast(selected.value + ' selected!');

      if (currentPlan._id !== selected.content._id)
        dispatch(updateCurrentPlanCourses([]));
      dispatch(updateSelectedPlan(selected.content));
    }
  };

  /**
   * Updates temporary plan name and notifies useffect on state change to update db plan name with debounce.
   * @param event
   */
  const handlePlanNameChange = (event: any): void => {
    setPlanName(event.target.value);
    setEditName(true);
  };

  /**
   * Limit the max width of multi-select labels
   */
  const customStyles: StylesConfig<typeof majorOptions[number], true> = {
    multiValue: (provided) => {
      const maxWidth = '17rem';
      return { ...provided, maxWidth };
    },
  };

  const handleMajorChange = (event: any) => {
    if (event.length === 0) {
      toast.error('You must have at least one major!');
      return;
    }
    const newMajors = event.map((option) => option.label);
    const body = {
      plan_id: currentPlan._id,
      majors: newMajors,
    };
    axios
      .patch(getAPI(window) + '/plans/update', body)
      .then(() => {
        const newUpdatedPlan = { ...currentPlan, majors: newMajors };
        dispatch(updateSelectedPlan(newUpdatedPlan));
        let newPlanList = [...planList];
        for (let i = 0; i < planList.length; i++) {
          if (newPlanList[i]._id === currentPlan._id) {
            newPlanList[i] = { ...newUpdatedPlan };
          }
        }
        dispatch(updatePlanList(newPlanList));
      })
      .catch((err) => console.log(err));
  };

  /**
   * Show major multi-select's displayed major name to abbreviations (B.S. Computer Science => B.S. CS)
   * if user selected more than one major
   */
  const MultiValue = (
    props: MultiValueProps<typeof majorOptions[number], true>,
  ) => {
    const major = allMajors.find(
      (majorObj) => majorObj.degree_name === props.data.label,
    );
    // @ts-ignore
    const showAsAbbrev = props.selectProps.value.length > 1;
    return (
      <components.MultiValue {...props}>
        {showAsAbbrev ? major?.abbrev : major?.degree_name}
      </components.MultiValue>
    );
  };

  // Activates delete plan popup.
  const activateDeletePlan = (): void => {
    dispatch(updateDeletePlanStatus(true));
  };

  /**
   * Handles when button for shareable link is clicked.
   */
  const onShareClick = (): void => {
    if (shareableURL !== '') {
      setShareableURL('');
      return;
    }
    setShareableURL(window.location.origin + '/share?_id=' + currentPlan._id);
  };

  /**
   * Adds a new year, if preUni is true, add to the start of the plan, otherwise add to the end
   * @param preUniversity - whether the new year is a pre uni year
   */
  const addNewYear = (preUniversity: boolean): void => {
    if (currentPlan.years.length < 8) {
      const newYear: Year = {
        name: 'New Year',
        _id: '',
        plan_id: currentPlan._id,
        user_id: user._id,
        courses: [],
        year: currentPlan.years[currentPlan.years.length - 1].year + 1,
      };

      const body = {
        ...newYear,
        preUniversity: preUniversity,
        expireAt:
          user._id === 'guestUser'
            ? Date.now() + 60 * 60 * 24 * 1000
            : undefined,
      }; // add to end by default
      axios
        .post(getAPI(window) + '/years', body)
        .then((response: any) => {
          const updatedPlanList: Plan[] = [...planList];
          updatedPlanList[0] = {
            ...currentPlan,
            years: [...currentPlan.years, { ...response.data.data }],
          };
          dispatch(updateSelectedPlan(updatedPlanList[0]));
          dispatch(updatePlanList(updatedPlanList));
          toast.success('New Year added!');
        })
        .catch((err) => console.log(err));
    } else {
      toast.error("Can't add more than 8 years!");
    }
  };
  return (
    <div className="flex flex-row mb-2">
      <Selectable
        width={180}
        options={[
          { content: 'Create New Plan', label: '' },
          ...planList
            .filter((plan) => plan._id !== currentPlan._id)
            .map((plan) => ({ content: plan.name, label: plan._id })),
        ]}
        defaultValue={currentPlan._id}
        onChange={handlePlanChange}
        className="mr-2 thin:mx-auto text-lg font-light"
      />
      <div className="flex flex-row items-end bg-white border border-gray-300 rounded h-10 mr-2">
        <div className="m-auto ml-2 mr-0 text-xl">✎</div>
        <input
          value={planName}
          className=" my-0.5 px-1 h-8 text-gray-800 text-lg outline-none w-full"
          onChange={handlePlanNameChange}
        />
      </div>
    </div>
  );
};

export default Actionbar;
