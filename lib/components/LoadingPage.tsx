import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectImportingStatus } from '../slices/currentPlanSlice';
import { selectGeneratePlanAddStatus } from '../slices/popupSlice';
import { selectUser } from '../slices/userSlice';

const LoadingPage = () => {
  const user = useSelector(selectUser);
  const importStatus = useSelector(selectImportingStatus);
  const generatePlanAddStatus = useSelector(selectGeneratePlanAddStatus);
  const [dotNum, setDotNum] = useState<number>(0);
  useEffect(() => {
    const id = setTimeout(() => {
      setDotNum(dotNum === 3 ? 0 : dotNum + 1);
    }, 500);
    return () => {
      clearInterval(id);
    };
  }, [dotNum]);

  return (
    <div className="w-full h-screen bg-white flex flex-col">
      <div className="m-auto">
        <img src="/img/blue-jay-shake.gif" alt="loading..." />{' '}
        <div className="font-bold text-white bg-gray-800 rounded p-1 px-2 mt-2">
          {user._id === 'noUser'
            ? 'Logging in'
            : generatePlanAddStatus
            ? 'Creating New Plan...'
            : importStatus
            ? 'Importing Plan'
            : 'Loading'}
          {(() => {
            let string = '';
            for (let i = 0; i < dotNum; i++) string += '.';
            return string;
          })()}
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
