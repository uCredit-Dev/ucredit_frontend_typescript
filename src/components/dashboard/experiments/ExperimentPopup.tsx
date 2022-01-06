import axios from 'axios';
import { FC } from 'react';
//import { selectBlueButton } from '../../../slices/experimentSlice';
import { useSelector } from 'react-redux';
//import { experiment, selectExperiments } from '../../../slices/experimentSlice';
import { ReactComponent as Beaker } from '../../../resources/svg/Beaker.svg'

// import { toast } from 'react-toastify';

const ExperimentPopup: FC<{ experimentPopup: boolean}> = ({
  experimentPopup,
}) => {
  // const experiments = useSelector(selectExperiments);
  // z-40 fixed flex flex-col shadow rounded z-20 h-4/5 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3"
  /*
        <div className="relative h-32 w-32 box-content h-100 w-100 p-2 border-4"> 
          <div className="p-3 text-center font-bold bg-gray-50 rounded-t-lg shadow">
            Hello
          </div>

  */
  
  return (
    <>
      <Beaker/>
      { experimentPopup ? 
        <div
          className="z-50 absolute flex flex-col justify-between place-items-end translate-x-full bg-white h-32 w-32 box-content h-100 w-100 p-2 border-4"
        >
          <label className="custom-label flex mt-2 ml-3">
            <span className="select-none">Experiment1  </span>
            <div
              className="relative flex justify-end w-6 h-6 bg-white hover:bg-gray-400 border border-gray-300 rounded focus:outline-none shadow cursor-pointer transition duration-200 ease-in"
              onClick={() => console.log('1')}
            />
          </label>
          <label className="custom-label flex mt-2 ml-3">
            <span className="select-none">Experiment2  </span>
            <div
              className="relative flex justify-end w-6 h-6 bg-white hover:bg-gray-400 border border-gray-300 rounded focus:outline-none shadow cursor-pointer transition duration-200 ease-in"
              onClick={() => console.log('2')}
            />
          </label>
          <label className="custom-label flex mt-2 ml-3">
            <span className="select-none">Experiment3  </span>
            <div
              className="relative flex justify-end w-6 h-6 bg-white hover:bg-gray-400 border border-gray-300 rounded focus:outline-none shadow cursor-pointer transition duration-200 ease-in"
              onClick={() => console.log('3')}
            />
          </label>
        </div>
        : null
      }
    </>
  );
};

export default ExperimentPopup;