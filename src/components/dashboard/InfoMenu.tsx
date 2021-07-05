import React, { useState } from "react";
import Distributions from "./right-column-info/Distributions";
import InfoCards from "./right-column-info/InfoCards";

const InfoMenu = () => {
  const [infoOpen, setInfoOpen] = useState(false);
  return (
    <div
      className="fixed z-50 right-0 flex flex-col justify-between w-8"
      style={{ height: "80vh" }}
    >
      <div className="my-auto transform -rotate-90">
        <button
          className="w-32 h-8 text-center bg-white focus:outline-none shadow"
          onClick={() => {
            setInfoOpen(!infoOpen);
          }}
        >
          Plan Overview
        </button>
      </div>
      {infoOpen ? (
        <div className="absolute right-14 top-20 ml-5 p-4 px-0 w-max max-h-full bg-white bg-opacity-90 shadow overflow-y-scroll">
          <InfoCards />
          <Distributions />
        </div>
      ) : null}
    </div>
  );
};

export default InfoMenu;
