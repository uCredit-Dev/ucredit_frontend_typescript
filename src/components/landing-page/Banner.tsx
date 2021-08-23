import React, { FC } from "react";
import { ReactComponent as SemesterlySvg } from "../../resources/svg/Semesterly.svg";

const Banner: FC = () => {
  return (
    <>
      <div className='w-full h-64 p-4 bg-gray-200'>
        <div className='text-xl font-light'>
          Your Academic Planning Made Simple
        </div>
        <div className='w-3/4 font-light'>
          A student-centric application packed with features like prereq checks,
          degree trackers, and beautiful UI that is easily shareable and
          acessible.
        </div>
      </div>
      <div className='flex items-center justify-end mt-2 mr-2 text-gray-600'>
        Partnered with Semesterly
        <SemesterlySvg className='w-8 h-8 ml-1' />
      </div>
    </>
  );
};

export default Banner;
