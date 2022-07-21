import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Laptop: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-row bg-sky-100 items-stretch w-full">
        <div className="mx-24 my-9 text-left">
          <div className="text-3xl sm: md:text- lg: xl: xxxl: ">
            The Best Plan for CS majors (plan name)
          </div>
          <div className="text-sm mt-2 sm: md: lg: xl: ">by uCredit</div>
          <div className="text-sm mb-4 sm: md: lg: xl: ">uploaded on 2022-07-20</div>
          <div className="text-sm sm: md: lg: xl: ">
            description of the plan. like pros and cons, explanantion for each
            semester etc... can be a loooong description there’s plenty of space
            here
          </div>
        </div>
      </div>
    </>
  );
};

const Banner: React.FC = () => {
  return (
    <>
      <Laptop />
    </>
  );
};

export default Banner;
