import {
  selectExperimentList,
  selectExperimentIDs,
  toggleExperimentStatus,
} from '../../slices/experimentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as BeakerSvg } from '../../resources/svg/Beaker.svg';
import clsx from 'clsx';
import { FC } from 'react';

const ExperimentPopup: FC<{
  experimentPopup: boolean;
  setExperimentPopup: Function;
}> = ({ experimentPopup, setExperimentPopup }) => {
  const experimentList = useSelector(selectExperimentList);
  const experimentIDs = useSelector(selectExperimentIDs);
  const greenButtonID = '61e0b1d5648bba005539dde0';
  const greenButtonIdx = experimentIDs.indexOf(greenButtonID);
  const greenButton =
    experimentList.length > 0 && greenButtonIdx !== -1
      ? experimentList[experimentIDs.indexOf(greenButtonID)]
      : null;
  const dispatch = useDispatch();

  const handleExperimentToggle = (experimentID: string) => {
    // dispatch(setExperimentStatus([event.target.value, !experimentList[event.target.value].active]))
    // debounce, useEffect cleanup

    dispatch(toggleExperimentStatus(experimentID));
  };

  return (
    <>
      <div
        className={clsx(
          'flex flex-row items-center ml-2 my-1 w-10 h-10 hover:underline hover:bg-green-300 border border-gray-300 rounded focus:outline-none shadow cursor-pointer transition duration-200 ease-in',
          {
            'bg-green-100': greenButton !== null ? greenButton.active : false,
          },
        )}
      >
        <BeakerSvg
          onClick={() => setExperimentPopup(!experimentPopup)}
          data-tip={`View/Toggle Experiments!`}
          data-for="godTip"
          className="w-10 h-10 focus:outline-none"
        />
      </div>
      {experimentPopup ? (
        <div className="fixed z-50 bottom-24 right-3 justify-between place-items-start bg-white box-content p-2 border-4">
          Experiments
          {experimentList.map((experiment, index) => {
            return (
              <button
                key={index}
                value={experiment.name}
                onClick={() => {
                  handleExperimentToggle(experiment._id);
                }}
                className={clsx(
                  'relative flex hover:bg-gray-400 border border-gray-300 rounded focus:outline-none shadow cursor-pointer transition duration-200 ease-in',
                  {
                    'bg-white': !experiment.active,
                    'bg-green-100': experiment.active,
                  },
                )}
              >
                {experiment.name}
              </button>
            );
          })}
        </div>
      ) : null}
    </>
  );
};

export default ExperimentPopup;
