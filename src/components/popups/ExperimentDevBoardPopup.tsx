import { useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  selectExperimentList,
  setExperimentPercentage,
  selectWhiteList,
  experiment,
} from '../../slices/experimentSlice';
import { ReactComponent as AdjustmentSvg } from '../../resources/svg/Adjustment.svg';
import { toast } from 'react-toastify';

const ExperimentDevBoardPopup: FC<{}> = () => {
  const [experimentDevBoardPopup, setExperimentDevBoardPopup] =
    useState<boolean>(false);
  //Retrieve all experiments from redux
  const allExperiments: Array<experiment> = useSelector(selectExperimentList);
  const whiteList = useSelector(selectWhiteList);
  const dispatch = useDispatch();
  console.log(whiteList);

  //Create state of this component with percentages that user has changed
  const LEN: number = allExperiments.length;
  const emptyPercentages: Array<string> = new Array(LEN).fill(''); //empty to represent that user did not change the input field
  const [inputPercentage, setInputPercentage] = useState<Array<string>>([
    ...emptyPercentages,
  ]);

  const updatePercentageArray = (index, event) => {
    const percent = event.target.value;
    inputPercentage[index] = percent;
    setInputPercentage([...inputPercentage]);
  };

  const handleSubmit = async () => {
    const experimentAPI =
      'https://ucredit-experiments-api.herokuapp.com/api/experiments/';
    const convertedPercentages: Array<number> = [];
    for (const userInput of inputPercentage) {
      const attemptConversion: number = Number(userInput);
      if (
        (isNaN(attemptConversion) && userInput !== '') ||
        attemptConversion < 0 ||
        attemptConversion > 100
      ) {
        toast.error(`"${userInput}" (and maybe others) is not valid number`, {
          autoClose: 5000,
          closeOnClick: false,
        });
        return;
      } else {
        convertedPercentages.push(attemptConversion);
      }
    }

    for (let i = 0; i < convertedPercentages.length; i++) {
      if (
        (convertedPercentages[i] !== 0 || inputPercentage[i] !== '') &&
        convertedPercentages[i] !== allExperiments[i].percentParticipating
      ) {
        console.log(`entered for ${allExperiments[i].name}`);
        dispatch(setExperimentPercentage([i, convertedPercentages[i]])); //Update redux too and backend
        axios
          .post(`${experimentAPI}${allExperiments[i].name}`, {
            percent_participating: convertedPercentages[i],
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
    toast.success(`Updated Percentages`, {
      autoClose: 5000,
      closeOnClick: false,
    });
    setExperimentDevBoardPopup(!experimentDevBoardPopup);
  };

  return (
    <>
      {whiteList.active ? (
        <div className="flex flex-row items-center ml-2 my-1 w-10 h-10 hover:underline hover:bg-green-300 border border-gray-300 rounded focus:outline-none shadow cursor-pointer transition duration-200 ease-in">
          <AdjustmentSvg
            onClick={() => setExperimentDevBoardPopup(!experimentDevBoardPopup)}
            data-tip={`Update Experiment Distributions!`}
            data-for="godTip"
            className="w-10 h-10 focus:outline-none"
          />
        </div>
      ) : null}
      {experimentDevBoardPopup ? (
        <div className="overflow-auto h-96 w-4/12 mx-auto p-6 border rounded-xl bg-blue-400 text-left right-0 -translate-y-56">
          <div className="font-mono text-black text-sm font-bold">
            <div>
              Disclaimer: Percents might change inaccurately because of the
              limited number of users in uCredit.
            </div>
            <div>
              Instructions: Input Percentages from 0 to 100 for any experiments
              you want to change, leave blank want to keep original.
            </div>
          </div>

          {/*Experiment inputs*/}
          <div className="flex flex-col space-y-16 font-mono text-bg">
            {allExperiments.map((oneExperiment, index) => {
              return (
                <div key={index}>
                  <div>{`${oneExperiment.name} (Current Percentage is ${oneExperiment.percentParticipating}%)`}</div>
                  <input
                    className="bg-white placeholder-gray-500 border"
                    placeholder={`${oneExperiment.percentParticipating}`}
                    onChange={(event) => updatePercentageArray(index, event)}
                  ></input>
                  <span>%</span>
                </div>
              );
            })}

            <div className="space-x-48">
              <button
                className="w-1/3 text-white font-bold py-2 px-4 rounded bg-blue-500 hover:bg-blue-700"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="w-1/3 text-white font-bold py-2 px-4 rounded bg-red-500 hover:bg-red-700"
                onClick={() => {
                  setExperimentDevBoardPopup(!experimentDevBoardPopup);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ExperimentDevBoardPopup;
