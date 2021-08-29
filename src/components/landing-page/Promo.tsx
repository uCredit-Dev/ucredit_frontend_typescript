import React, { FC } from "react";
import data from "./promoData";

/**
 * Contains features and values that our app embraces.
 */
const Promo: FC = () => {
  return (
    <div className="flex flex-col items-center my-8 pb-8 px-16">
      <div
        className="grid gap-x-4 gap-y-8 grid-flow-row grid-cols-2"
        style={{ gridTemplateRows: "repeat(4, minmax(100px, 250px))" }}
      >
        {data.map((d) => {
          return !d.order ? (
            <>
              <div>
                <div className="text-lg font-bold">{d.title}</div>
                <div>{d.desc}</div>
              </div>
              <div className="flex justify-center bg-gray-200 rounded-md">
                <img alt="" src={d.img} />
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center bg-gray-200 rounded-md">
                <img alt="" src={d.img} />
              </div>
              <div>
                <div className="text-lg font-bold">{d.title}</div>
                <div>{d.desc}</div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Promo;
