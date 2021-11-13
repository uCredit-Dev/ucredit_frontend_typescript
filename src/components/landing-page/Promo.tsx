import { FC } from "react";
import data from "./promoData";

/**
 * Contains features and values that our app embraces.
 */
const Promo: FC = () => {
  return (
    <div className="flex flex-col items-center my-8 pb-8 px-16">
      <div className="">
        {data.map((d) => {
          return !d.order ? (
            <div className="flex flex-row" key={d.title}>
              <div className="pt-5 w-1/2">
                <div className="text-lg font-bold">{d.title}</div>
                <div>{d.desc}</div>
              </div>
              <div className="flex justify-center w-1/2 h-80 bg-gray-200 rounded-md">
                <img alt="" src={d.img} />
              </div>
            </div>
          ) : (
            <div className="flex flex-row" key={d.title}>
              <div className="flex justify-center w-1/2 bg-gray-200 rounded">
                <img alt="" src={d.img} />
              </div>
              <div className="p-5 w-1/2">
                <div className="text-lg font-bold">{d.title}</div>
                <div>{d.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Promo;
