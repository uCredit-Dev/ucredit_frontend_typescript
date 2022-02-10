import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plan, Year } from '../../../resources/commonTypes';
import {
  updateYearToDelete,
  updateDeleteYearStatus,
} from '../../../slices/popupSlice';
import Select from 'react-select';
import {
  selectPlan,
  updateSelectedPlan,
} from '../../../slices/currentPlanSlice';
import axios from 'axios';
import { api } from '../../../resources/assets';
import { selectPlanList, updatePlanList } from '../../../slices/userSlice';
import { toast } from 'react-toastify';

type SemSelected = {
  fall: boolean;
  spring: boolean;
  intersession: boolean;
  summer: boolean;
};

// Static year option calculation
const date = new Date();
const yearOptions: { value: number; label: number }[] = [];
for (let i: number = date.getFullYear() - 4; i < date.getFullYear() + 9; i++) {
  yearOptions.push({ value: i, label: i });
}

const YearSettingsDropdown: FC<{
  setToShow: (value: SemSelected) => void;
  setEdittingName: (value: boolean) => void;
  setDisplay: (value: boolean) => void;
  year: Year;
  toShow: SemSelected;
  id: number;
}> = ({ setToShow, setEdittingName, setDisplay, year, toShow, id }) => {
  const dispatch = useDispatch();
  const currPlan = useSelector(selectPlan);
  const planList = useSelector(selectPlanList);

  const [semSelect, setSemSelect] = useState<boolean>(false);
  const [yearSelect, setYearSelect] = useState<boolean>(false);

  /**
   * Activates delete year popup.
   */
  const activateDeleteYearPopup = () => {
    dispatch(updateYearToDelete(year));
    dispatch(updateDeleteYearStatus(true));
  };

  const modifyFall = () => {
    setToShow({ ...toShow, fall: !toShow.fall });
  };

  const modifySpring = () => {
    setToShow({ ...toShow, spring: !toShow.spring });
  };

  const modifySummer = () => {
    setToShow({ ...toShow, summer: !toShow.summer });
  };

  const modifyIntersession = () => {
    setToShow({ ...toShow, intersession: !toShow.intersession });
  };

  const handleYearChange = (selectedYear: any) => {
    // Check for same year
    let exists = false;
    currPlan.years.forEach((y) => {
      if (y.year === selectedYear.value) {
        exists = true;
      }
    });

    // Change year
    if (!exists) {
      axios
        .patch(api + '/years/updateYear', {
          year_id: year._id,
          year: selectedYear.value,
        })
        .then((res) => {
          const newYear: Year = res.data.data;
          const newPlan: Plan = {
            ...currPlan,
            years: currPlan.years.map((y) => {
              if (y._id === newYear._id) {
                return newYear;
              } else {
                return y;
              }
            }),
          };
          dispatch(updateSelectedPlan(newPlan));
          dispatch(
            updatePlanList(
              planList.map((p, i) => {
                if (i === 0) {
                  return newPlan;
                } else {
                  return p;
                }
              }),
            ),
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error('Year already exists');
    }
  };

  // Gets which semesters to display.
  const getSemesters = (): JSX.Element => {
    if (semSelect)
      return (
        <div className="z-40 flex flex-col">
          <label>
            <input
              type="checkbox"
              name="Fall"
              className="ml-6 mr-2"
              onChange={modifyFall}
              checked={toShow.fall}
            />
            Fall
          </label>
          <label>
            <input
              type="checkbox"
              name="Spring"
              className="ml-6 mr-2"
              onChange={modifySpring}
              checked={toShow.spring}
            />
            Spring
          </label>
          <label>
            <input
              type="checkbox"
              name="Summer"
              className="ml-6 mr-2"
              onChange={modifySummer}
              checked={toShow.summer}
            />
            Summer
          </label>
          <label>
            <input
              type="checkbox"
              name="Intersession"
              className="ml-6 mr-2"
              onChange={modifyIntersession}
              checked={toShow.intersession}
            />
            Intersession
          </label>
        </div>
      );
    else return <></>;
  };

  return (
    <div className="relative left-full z-40">
      <div className="absolute z-40 flex flex-col w-40 text-black bg-gray-100 rounded shadow">
        <button
          onClick={() => {
            setEdittingName(true);
            setDisplay(false);
          }}
          className="hover:bg-gray-300 focus:outline-none"
        >
          Rename
        </button>

        <button
          className="hover:bg-gray-300 border-t border-gray-300 focus:outline-none"
          onClick={() => {
            setYearSelect(!semSelect);
          }}
        >
          Change Year
        </button>
        {yearSelect ? (
          <>
            <Select
              options={yearOptions}
              className="w-40 rounded outline-none"
              onChange={handleYearChange}
              value={{ label: year.year, value: year.year }}
            />
          </>
        ) : null}
        {id !== 0 ? (
          <>
            <button
              className="hover:bg-gray-300 border-t border-gray-300 focus:outline-none"
              onClick={() => {
                setSemSelect(!semSelect);
              }}
            >
              Select Terms
            </button>
            {getSemesters()}

            <button
              onClick={activateDeleteYearPopup}
              className="bg-red-100 hover:bg-red-300 border-t border-gray-300 focus:outline-none"
            >
              Remove
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default YearSettingsDropdown;
