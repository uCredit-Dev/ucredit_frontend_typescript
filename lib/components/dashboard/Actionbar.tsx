import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getAPI } from '../../resources/assets';
import { ReviewMode, Year, Plan } from '../../resources/commonTypes';
import { allMajors } from '../../resources/majors';
import Tooltip from '@mui/material/Tooltip';
import {
  selectPlan,
  updateSelectedPlan,
  updateCurrentPlanCourses,
} from '../../slices/currentPlanSlice';
import {
  updateAddingPlanStatus,
  updateDeletePlanStatus,
} from '../../slices/popupSlice';
import {
  selectPlanList,
  selectUser,
  selectReviewMode,
  updatePlanList,
} from '../../slices/userSlice';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { TrashIcon } from '@heroicons/react/outline';
import { PlusIcon } from '@heroicons/react/solid';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Menu from '@mui/material/Menu';
import Reviewers from './menus/reviewers/Reviewers';
import PersonIcon from '@mui/icons-material/Person';

const majorOptions = allMajors.map((major) => ({
  abbrev: major.abbrev,
  name: major.degree_name,
}));

const Actionbar: FC<{ mode: ReviewMode }> = ({ mode }) => {
  const planList = useSelector(selectPlanList);
  const currentPlan = useSelector(selectPlan);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const reviewMode = useSelector(selectReviewMode);
  const [planName, setPlanName] = useState<string>(currentPlan.name);
  const [editName, setEditName] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
        toast.success('Plan name changed to ' + planName + '!', {
          toastId: 'plan name changed',
        });
        setEditName(false);
        dispatch(updatePlanList(newPlanList));
      })
      .catch((err) => console.log(err));
  };

  const handlePlanChange = (event, newValue) => {
    if (!newValue.value || !newValue.value.name) return;
    if (newValue.label === 'Create New Plan' && user._id !== 'noUser') {
      dispatch(updateAddingPlanStatus(true));
    } else {
      toast(newValue.value.name + ' selected!');
      if (currentPlan._id !== newValue.value._id)
        dispatch(updateCurrentPlanCourses([]));
      dispatch(updateSelectedPlan(newValue.value));
    }
  };

  /**
   * Updates temporary plan name and notifies useffect on state change to update db plan name with debounce.
   * @param event
   */
  const handlePlanNameChange = (event) => {
    setPlanName(event.target.value);
    setEditName(true);
  };

  const handleMajorChange = (event, newValues) => {
    if (newValues.length === 0) {
      toast.error('You must have at least one major!', {
        toastId: 'one major',
      });
      return;
    }

    const newMajors = newValues.map((option) => option.label);
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

  const getCurrentMajors = (): { label: string; value: string }[] => {
    const currentMajorOptions: { label: string; value: string }[] = [];
    majorOptions.forEach((major, i) => {
      if (currentPlan.majors.includes(major.name))
        currentMajorOptions.push({ label: major.name, value: major.abbrev });
    });
    return currentMajorOptions;
  };

  const getLimitText = (): string => {
    let outString = '';
    const currMajors = getCurrentMajors();

    currMajors.forEach((major, i) => {
      if (i < 2) {
        outString += major.value;
        if (i < currMajors.length - 1) outString += ', ';
      }
    });
    outString += currMajors.length > 2 ? ` +${currMajors.length - 2} more` : '';
    return outString;
  };

  // Activates delete plan popup.
  const activateDeletePlan = (): void => {
    dispatch(updateDeletePlanStatus(true));
  };

  /**
   * Handles when button for shareable link is clicked.
   */
  const onShareClick = (): void => {
    const shareableURL =
      window.location.origin + '/share?_id=' + currentPlan._id;
    navigator.clipboard.writeText(shareableURL).then(() => {
      navigator.clipboard.writeText(shareableURL).then(() => {
        toast.info('Share link copied to Clipboard!', {
          toastId: 'share link copied',
        });
      });
    });
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
          toast.success('New Year added!', {
            toastId: 'new year added',
          });
        })
        .catch((err) => console.log(err));
    } else {
      toast.error("Can't add more than 8 years!", {
        toastId: 'too many years',
      });
    }
  };
  return (
    // TODO: flex-wrap on mobile, scroll on desktop
    <div className="flex flex-row flex-wrap">
      {reviewMode === ReviewMode.Edit && (
        <>
          <Fab
            color="inherit"
            aria-label="edit"
            onClick={() => setOpenEdit(true)}
            size="small"
            sx={{
              mr: 1,
              my: 1,
              bgcolor: '#C6E8FF',
              boxShadow: 'none',
              zIndex: 1,
            }}
          >
            <EditIcon />
          </Fab>
          <Dialog
            open={openEdit}
            onClose={() => setOpenEdit(false)}
            closeAfterTransition={false}
          >
            <DialogTitle>Edit Plan Name</DialogTitle>
            <TextField
              id="outlined-basic"
              label="Plan Name"
              variant="outlined"
              className="m-4"
              onChange={handlePlanNameChange}
              value={planName}
            />
          </Dialog>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={[
              { value: currentPlan, label: 'Create New Plan' },
              ...planList
                .filter((plan) => plan._id !== currentPlan._id)
                .map((plan) => ({ value: plan, label: plan.name })),
            ]}
            sx={{ width: 280, mr: 1, my: 1 }}
            renderInput={(params) => (
              <TextField {...params} label="Select/Create Plan" />
            )}
            onChange={handlePlanChange}
            value={{
              label: currentPlan.name,
              value: currentPlan,
            }}
            size="small"
            isOptionEqualToValue={(o1, o2) => {
              if (!o1.value || !o2.value || !o1.value.name || !o2.value.name)
                return true;
              else return o1.value._id === o2.value._id;
            }}
          />
          <Autocomplete
            disablePortal
            multiple
            id="combo-box-demo"
            options={majorOptions.map((option, i) => ({
              label: option.name,
              value: option.abbrev,
            }))}
            sx={{ width: 'auto', maxWidth: 400, mr: 1, my: 1 }}
            renderInput={(params) => (
              <TextField {...params} label="Update Degrees" />
            )}
            onChange={handleMajorChange}
            value={getCurrentMajors()}
            size="small"
            limitTags={0}
            isOptionEqualToValue={(o1, o2) => o1.label === o2.label}
            disableCloseOnSelect
            getLimitTagsText={() => (
              <div className="text-sm text-ellipsis whitespace-nowrap w-min">
                {getLimitText()}
              </div>
            )}
          />
        </>
      )}
      {reviewMode === ReviewMode.Edit && (
        <>
          <Button
            onClick={() => addNewYear(false)}
            sx={{ height: '2.5rem', mr: 1, my: 1 }}
            variant="outlined"
            color="success"
          >
            <PlusIcon className="w-5 h-5 mb-0.5 focus:outline-none" />
            <div className="w-full ml-1">{' Add Year'}</div>
          </Button>
          <div>
            <Button
              onClick={handleClick}
              variant="outlined"
              sx={{ height: '2.5rem', mr: 1, my: 1 }}
              color="info"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 transition duration-200 ease-in transform hover:scale-110 mb-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              <div className="ml-1">Share</div>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              sx={{ px: 1 }}
            >
              <Reviewers />
              <Tooltip
                title="Click to get a shareable link to your plan."
                placement="left"
                arrow
              >
                <Button
                  onClick={onShareClick}
                  variant="outlined"
                  sx={{ width: '10rem', height: '2rem', mx: 1, my: 1 }}
                  color="info"
                >
                  <div className="ml-1">Copy Plan Link</div>
                </Button>
              </Tooltip>
            </Menu>
          </div>
          <Button
            onClick={activateDeletePlan}
            variant="outlined"
            color="error"
            sx={{ height: '2.5rem', mr: 1, my: 1 }}
          >
            <TrashIcon className="w-5 mb-0.5 transition duration-200 ease-in transform cursor-pointer select-none stroke-2 hover:scale-110" />{' '}
          </Button>
        </>
      )}
    </div>
  );
};

export default Actionbar;
