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
    const timeoutId = setTimeout(() => {
      setDotNum(dotNum === 3 ? 0 : dotNum + 1);
    }, 500);
    return () => clearInterval(timeoutId);
  }, [dotNum]);

  const getLoadingText = () =>
    user._id === 'noUser'
      ? 'Loading'
      : generatePlanAddStatus
      ? 'Creating New Plan...'
      : importStatus
      ? 'Importing Plan'
      : 'Loading';

  return (
    <div className="z-[100] flex flex-col w-full h-screen bg-white">
      <div className="m-auto">
        <img src="/img/blue-jay-shake.gif" alt="loading..." />{' '}
        <div className="font-bold text-white bg-gray-800 rounded p-1 px-2 mt-2">
          {getLoadingText()}
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
