import {
  selectExperimentList,
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
  const dispatch = useDispatch();

  const handleExperimentToggle = (event: any) => {
    // dispatch(setExperimentStatus([event.target.value, !experimentList[event.target.value].active]))
    // debounce, useEffect cleanup

    dispatch(toggleExperimentStatus(event.target.value));
  };

  return (
    <>
      <div
        className={clsx(
          'flex flex-row items-center ml-2 my-1 w-10 h-10 hover:underline hover:bg-green-300 border border-gray-300 rounded focus:outline-none shadow cursor-pointer transition duration-200 ease-in',
          {
            'bg-blue-100': experimentList[2].active,
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
            // console.log(experiment)
            return (
              <button
                key={index}
                value={index}
                onClick={handleExperimentToggle}
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
