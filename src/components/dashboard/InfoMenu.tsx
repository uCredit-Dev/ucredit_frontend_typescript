import React, { useState } from "react";
import Distributions from "./right-column-info/Distributions";
import InfoCards from "./right-column-info/InfoCards";

const InfoMenu = () => {
  const [infoOpen, setInfoOpen] = useState(false);
  return (
    <div
      className="fixed right-0 flex flex-col justify-between w-8"
      style={{ height: "80vh" }}
    >
      <div className="my-auto transform -rotate-90">
        <button
          className="w-32 h-8 text-center bg-white focus:outline-none shadow transform hover:scale-110 transition duration-200 ease-in"
          onClick={() => {
            setInfoOpen(!infoOpen);
          }}
        >
          Plan Overview
        </button>
      </div>
      {infoOpen ? (
        <div className="absolute -left-96 top-20 ml-5 p-4 px-0 max-h-full bg-white bg-opacity-90 shadow overflow-y-scroll transform hover:scale-101 transition duration-200 ease-in">
          <InfoCards />
          <Distributions />
        </div>
      ) : null}
    </div>
  );
};

export default InfoMenu;
