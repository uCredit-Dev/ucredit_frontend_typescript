import React from "react";

const InfoCard: React.FC<any> = () => {
  return (
    <div className="flex flex-row justify-between mb-8 mx-8 p-6 w-full h-24 border-2 border-solid rounded-xl shadow-xl">
      <div className="text-myplan flex flex-row items-center justify-center w-auto h-full">
        My Plan
      </div>
      <div className="text-infocard flex flex-row items-center justify-center w-auto h-full">
        Name: Your Name
      </div>
      <div className="text-infocard flex flex-row items-center justify-center w-auto h-full">
        Majors: Computer Science B.S., Psychology
      </div>
      <div className="text-infocard bg-green-selectplan flex flex-row items-center justify-center px-8 py-4 w-auto h-full text-white rounded-xl">
        Select Plan
      </div>
    </div>
  );
};

export default InfoCard;
