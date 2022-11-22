import React from 'react';
import { FC } from 'react';

const ExperimentNumber: FC<{
  displayedNumber: number;
  setDisplayedNumber: Function;
  crement: number;
  setCrement: Function;
}> = ({ displayedNumber, setDisplayedNumber, crement, setCrement }) => {
  return (
    <>
      <div
        className="flex flex-row py-1.5 justify-center ml-2 my-1 w-10 h-10 hover:bg-green-300 border border-gray-300 rounded focus:outline-none shadow cursor-pointer transition duration-200 ease-in"
        onClick={() => setDisplayedNumber(displayedNumber + crement)}
      >
        <div>{displayedNumber}</div>
      </div>
    </>
  );
};

export default ExperimentNumber;
