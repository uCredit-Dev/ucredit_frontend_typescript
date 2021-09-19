import React, { useState } from "react";
import Distributions from "./right-column-info/Distributions";
import InfoCards from "./right-column-info/InfoCards";

/**
 * Info menu shows degree plan and degree information.
 * Hidden on default.
 */
const InfoMenu = () => {
  const [infoOpen, setInfoOpen] = useState(false);
  return (
    <div
      className="fixed z-50 right-0 flex flex-col justify-between w-10"
      style={{ height: "76vh" }}
    >
      <div className="my-auto transform -rotate-90">
        <button
          className="w-32 h-10 text-center text-white font-bold hover:bg-blue-400 bg-green-400 bg-white rounded focus:outline-none shadow hover:scale-105 transition duration-200 ease-in"
          onClick={() => {
            setInfoOpen(!infoOpen);
          }}
        >
          {/* {infoOpen ? "Open " : "Close "} */}
          Plan Overview
        </button>
      </div>
      {infoOpen ? (
        <div className="absolute right-14 top-20 ml-5 p-4 px-0 w-max max-h-full bg-white bg-opacity-90 rounded shadow overflow-y-scroll">
          <InfoCards />
          <Distributions />
        </div>
      ) : null}
    </div>
  );
};

export default InfoMenu;
