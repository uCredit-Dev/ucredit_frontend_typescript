import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectExperimentList,
  selectWhiteList,
  setExperimentPercentage,
} from '../../slices/experimentSlice';

const ExperimentDevBoardPopup: FC = () => {
  //Place holder, will actually make menu later
  const allExperiments = useSelector(selectExperimentList);
  return (
    <>
      <div className="overflow-auto h-96 w-96 mx-auto p-6 border rounded-xl bg-blue-400 text-left right-0 -translate-y-56">
        <div className="font-mono text-black text-sm font-bold">
          Disclaimer: Percents might change inaccurately because of the limited
          number of users in uCredit
        </div>
        <div className="flex flex-col space-y-24 font-mono text-bg">
          {allExperiments.map((experiment, index) => {
            return (
              <div key={index}>
                <div>{`${experiment.name} (Current Percentage is ${experiment.percentParticipating}%)`}</div>
                <input className="bg-white placeholder-gray-500 border" placeholder={`${experiment.percentParticipating}`}></input>
                <span>%</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ExperimentDevBoardPopup;
