import clsx from "clsx";
import React, { useState } from "react";

const InfoCard: React.FC<any> = () => {
  const [selectPlanDown, setSelectPlanDown] = useState<boolean>(false);

  return (
    <div className='flex flex-row justify-between mb-8 mx-8 p-6 w-full h-24 border-2 border-solid rounded-xl shadow-lg'>
      <div className='text-myplan flex flex-row items-center justify-center w-auto h-full'>
        My Plan
      </div>
      <div className='text-infocard flex flex-row items-center justify-center w-auto h-full'>
        Name: Your Name
      </div>
      <div className='text-infocard flex flex-row items-center justify-center w-auto h-full'>
        Majors: Computer Science B.S., Psychology
      </div>
      <div
        className={clsx(
          "text-infocard bg-secondary flex flex-row items-center justify-center px-8 py-4 w-auto h-full text-white rounded-xl cursor-pointer select-none",
          { "ring-2 ring-green-200": selectPlanDown }
        )}
        onMouseDown={() => setSelectPlanDown(true)}
        onMouseUp={() => setSelectPlanDown(false)}>
        Select Plan
      </div>
    </div>
  );
};

export default InfoCard;
