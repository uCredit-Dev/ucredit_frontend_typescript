import { useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  selectExperimentList,
  setExperiments,
  toggleExperimentStatus,
  selectWhiteList,
  selectExperimentNames,
  experiment,
} from '../../slices/experimentSlice';
import { selectUser } from '../../slices/userSlice';
import { ReactComponent as AdjustmentSvg } from '../../resources/svg/Adjustment.svg';
import { ReactComponent as DeleteExperimentSvg } from '../../resources/svg/DeleteExperiment.svg';
import { ReactComponent as AddExperimentSvg } from '../../resources/svg/AddExperiment.svg';
import { toast } from 'react-toastify';

const ExperimentDevBoardPopup: FC<{}> = () => {
  //Retrieve all experiments from redux
  const allExperiments: Array<experiment> = useSelector(selectExperimentList);
  const whiteList = useSelector(selectWhiteList);
  const allExperimentNames = useSelector(selectExperimentNames);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  //Create state of this component with percentages that user has changed
  const LEN: number = allExperiments.length;
  const emptyArray: Array<string> = new Array(LEN).fill(''); //empty to represent that user did not change the input field
  const [inputPercentages, setInputPercentages] = useState<Array<string>>([
    ...emptyArray,
  ]);

  const [experimentDevBoardPopup, setExperimentDevBoardPopup] =
    useState<boolean>(false);
  const [deleteExperimentPopup, setDeleteExperimentPopup] =
    useState<boolean>(false);
  const [addExperimentPopup, setAddExperimentPopup] = useState<boolean>(false);
  //Used when changing name of old experiments
  const [inputNames, setInputNames] = useState<Array<string>>([...emptyArray]);
  //Used when making a new experiment
  const [inputName, setInputName] = useState<string>('');
  //Used to store the experiment to delete
  const [nameExperimentToDelete, setNameExperimentToDelete] =
    useState<string>('');

  const experimentAPI =
    'https://ucredit-experiments-api.herokuapp.com/api/experiments/';

  const updatePercentageArray = (index, event) => {
    const percent = event.target.value;
    inputPercentages[index] = percent;
    setInputPercentages([...inputPercentages]);
  };

  const updateNameArray = (index, event) => {
    const name = event.target.value;
    inputNames[index] = name;
    setInputNames([...inputNames]);
  };

  const handlePercentageChange = async () => {
    const convertedPercentages: Array<number> = [];
    //Attempt to convert all percentages
    for (const userInput of inputPercentages) {
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
        return false;
      } else {
        convertedPercentages.push(attemptConversion);
      }
    }

    //Make the post and update backend
    for (let i = 0; i < convertedPercentages.length; i++) {
      if (
        (convertedPercentages[i] !== 0 || inputPercentages[i] !== '') &&
        convertedPercentages[i] !== allExperiments[i].percentParticipating
      ) {
        await axios
          .post(`${experimentAPI}${allExperiments[i].name}`, {
            percent_participating: convertedPercentages[i],
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
    return true;
  };

  const handleNameChange = async () => {
    const lowerCasedNames = allExperimentNames.map((name) =>
      name.toLowerCase(),
    );
    for (let i = 0; i < inputNames.length; i++) {
      if (inputNames[i] !== '' && inputNames[i] !== undefined) {
        if (lowerCasedNames.includes(inputNames[i].toLowerCase())) {
          toast.error(
            `"${inputNames[i]}" name is already in use (the check is not case sensitive)`,
            {
              autoClose: 5000,
              closeOnClick: false,
            },
          );
          return false;
        }
        await axios
          .put(`${experimentAPI}changeName/${allExperiments[i].name}`, {
            new_name: inputNames[i],
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
    return true;
  };

  const updateExperimentRedux = async () => {
    try {
      const experimentListResponse = await axios.get(
        `${experimentAPI}allExperiments`,
      ); // getting experiment list
      const experiments = experimentListResponse.data.data;
      
      dispatch(setExperiments(experiments));

      for (const oneExperiment of experiments) {
        if (oneExperiment.active.includes(user._id)) {
          dispatch(toggleExperimentStatus(oneExperiment.experimentName));
        }
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitForOldExperiments = async () => {
    let success = await handlePercentageChange();
    if (!success) {
      return;
    }
    success = await handleNameChange();
    if (!success) {
      return;
    }
    await updateExperimentRedux();

    toast.success(`Updated Experiments`, {
      autoClose: 5000,
      closeOnClick: false,
    });
    setInputPercentages([...emptyArray]);
    setInputNames([...emptyArray]);
    setExperimentDevBoardPopup(!experimentDevBoardPopup);
  };

  const handleSubmitForAddExperiment = async () => {
    const lowerCasedNames = allExperimentNames.map((name) =>
      name.toLowerCase(),
    );
    if (lowerCasedNames.includes(inputName.toLowerCase())) {
      toast.error(
        `"${inputName}" name is already in use (the check is not case sensitive)`,
        {
          autoClose: 5000,
          closeOnClick: false,
        },
      );
      return;
    }
    await axios
      .post(`${experimentAPI}${inputName}`, {
        percent_participating: 0,
      })
      .catch(function (error) {
        console.log(error);
      });
    await updateExperimentRedux();
    toast.success(`Added Experiment ${inputName}`, {
      autoClose: 5000,
      closeOnClick: false,
    });
    setInputName('');
    setAddExperimentPopup(!addExperimentPopup);
  };

  const handleSubmitForDeleteExperiment = async () => {
    await axios
      .delete(`${experimentAPI}${nameExperimentToDelete}`)
      .catch(function (error) {
        console.log(error);
      });
    await updateExperimentRedux();
    toast.success(`Deleted Experiment`, {
      autoClose: 5000,
      closeOnClick: false,
    });
    setNameExperimentToDelete('');
    setDeleteExperimentPopup(!deleteExperimentPopup);
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
        <>
          {/* Background Grey */}
          <div className="fixed z-30 left-0 top-0 m-0 w-full h-screen bg-black opacity-50"></div>
          {/*Actual Popup*/}
          <div className="overflow-auto z-40 fixed flex flex-col w-3/6 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 shadow bg-green-400 p-4">
            {/*Instructions*/}
            <div className="border-solid border-4 bg-blue-400 p-6 space-y-6">
              <div className="font-mono text-black text-bg p-2">
                <div className="p-2">
                  <p className="font-bold">Disclaimer:</p> Percents might change
                  inaccurately because of the limited number of users in
                  uCredit.
                </div>
                <div className="p-2">
                  <p className="font-bold">Instructions:</p> Input Percentages
                  from 0 to 100 for any experiments you want to change, leave
                  blank want to keep original.
                </div>
                <div className="flex flex-row">
                  <div className="translate-x-2 translate-y-1 font-bold">
                    Add an Experiment:
                  </div>
                  <div className="translate-x-6 items-center hover:underline hover:bg-green-400 focus:outline-none shadow cursor-pointer transition duration-200 ease-in">
                    <AddExperimentSvg
                      onClick={() => {
                        setAddExperimentPopup(!addExperimentPopup);
                        setExperimentDevBoardPopup(!experimentDevBoardPopup);
                      }}
                      data-tip={`Add a New Experiment!`}
                      data-for="godTip"
                      className="w-8 h-8 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/*Experiment inputs*/}
              <div className="flex flex-col space-y-6 font-mono text-bg">
                {allExperiments.map((oneExperiment, index) => {
                  return (
                    <div key={index}>
                      <div className="flex flex-row -translate-x-2">
                        <div className="-translate-y-2 items-center hover:underline hover:bg-red-700 focus:outline-none shadow cursor-pointer transition duration-200 ease-in">
                          <DeleteExperimentSvg
                            onClick={() => {
                              setNameExperimentToDelete(oneExperiment.name);
                              setDeleteExperimentPopup(!deleteExperimentPopup);
                              setExperimentDevBoardPopup(
                                !experimentDevBoardPopup,
                              );
                            }}
                            data-tip={`Delete This Experiment!`}
                            data-for="godTip"
                            className="w-10 h-10 focus:outline-none"
                          />
                        </div>
                        <span className="font-bold">{oneExperiment.name}</span>
                        {` (Current Percentage is ${oneExperiment.percentParticipating}%)`}
                      </div>
                      <div>
                        <input
                          className="bg-white placeholder-gray-500 border"
                          placeholder={`${oneExperiment.name}`}
                          onChange={(event) => updateNameArray(index, event)}
                        ></input>
                      </div>
                      <div className="my-4">
                        <input
                          className="bg-white placeholder-gray-500 border"
                          placeholder={`${oneExperiment.percentParticipating}`}
                          onChange={(event) =>
                            updatePercentageArray(index, event)
                          }
                        ></input>
                        <span>%</span>
                      </div>
                    </div>
                  );
                })}

                <div className="space-x-48">
                  <button
                    className="w-1/3 text-white font-bold py-2 px-4 rounded bg-blue-500 hover:bg-blue-700"
                    onClick={handleSubmitForOldExperiments}
                  >
                    Submit
                  </button>
                  <button
                    className="w-1/3 text-white font-bold py-2 px-4 rounded bg-red-500 hover:bg-red-700 translate-x-20"
                    onClick={() => {
                      setInputPercentages([...emptyArray]);
                      setInputNames([...emptyArray]);
                      setExperimentDevBoardPopup(!experimentDevBoardPopup);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {/*Add Popup */}
      {addExperimentPopup ? (
        <>
          <div className="absolute top-0">
            {/* Background Grey */}
            <div className="fixed z-30 left-0 top-0 m-0 w-full h-screen bg-black opacity-50"></div>

            {/* Actual popup */}
            <div className="z-40 fixed flex flex-col w-3/6 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 shadow bg-green-400 p-4">
              {/*Instructions*/}
              <div className="border-solid border-4 bg-blue-400 p-6 space-y-6">
                <div className="font-mono text-black text-bg p-2">
                  <div className="p-2">
                    <p className="font-bold">Instructions:</p> Input the name of
                    the new experiment
                  </div>
                </div>
                <div>
                  <input
                    className="bg-white placeholder-gray-500 border"
                    onChange={(event) => {
                      setInputName(event.target.value);
                    }}
                  ></input>
                </div>
                <div className="space-x-48">
                  <button
                    className="w-1/3 text-white font-bold py-2 px-4 rounded bg-blue-500 hover:bg-blue-700"
                    onClick={handleSubmitForAddExperiment}
                  >
                    Submit
                  </button>
                  <button
                    className="w-1/3 text-white font-bold py-2 px-4 rounded bg-red-500 hover:bg-red-700 translate-x-20"
                    onClick={() => {
                      setInputName('');
                      setAddExperimentPopup(!addExperimentPopup);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {/*Delete Popup*/}
      {deleteExperimentPopup ? (
        <>
          <div className="absolute top-0">
            {/* Background Grey */}
            <div className="fixed z-30 left-0 top-0 m-0 w-full h-screen bg-black opacity-50"></div>

            {/* Actual popup */}
            <div
              className={
                'z-40 fixed flex flex-col bg-red-500 select-none rounded w-3/12 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 min-w-planAdd shadow'
              }
            >
              <div className="px-4 py-2 text-white text-coursecard font-semibold select-none">
                Deleting Experiment!
              </div>
              {/* Search area */}
              <div className="w-full h-full text-coursecard">
                <div className="p-4 w-full h-auto bg-gray-200 rounded">
                  <div className="flex flex-col items-center justify-center mb-4">
                    <b className="flex flex-row mt-4 text-center font-semibold">
                      Are you sure you want to delete
                      <div className="ml-1 text-red-600 font-bold">
                        {nameExperimentToDelete}
                      </div>
                      ?
                    </b>
                    <div className="flex flex-row justify-center mb-4 mt-8 w-full">
                      <button
                        className="m-1 p-1 w-1/6 text-white bg-red-500 rounded focus:outline-none shadow transform hover:scale-110 transition duration-200 ease-in"
                        onClick={handleSubmitForDeleteExperiment}
                      >
                        <b>Yes</b>
                      </button>
                      <button
                        className="m-1 ml-20 p-1 w-1/6 text-white bg-secondary rounded focus:outline-none shadow transform hover:scale-110 transition duration-200 ease-in"
                        onClick={() => {
                          setDeleteExperimentPopup(!deleteExperimentPopup);
                        }}
                      >
                        <b>No</b>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default ExperimentDevBoardPopup;
