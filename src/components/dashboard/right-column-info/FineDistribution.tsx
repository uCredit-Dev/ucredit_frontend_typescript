import clsx from "clsx";
import React, { useState } from "react";
import { ReactComponent as Check } from "../../../resources/svg/CheckMark.svg";
import { ReactComponent as X } from "../../../resources/svg/Close.svg";

type FineDistributionProps = {
  dis: { name: string; fulfilled_credits: Number; required_credits: Number };
  distributionOpen: Boolean;
};

/**
 * Component that displays fine requirements of a specific distribution.
 *
 * @prop dis - general distribution fine distribution is for.
 * @prop distributionOpen - whether this distribution bar is open or not.
 */
const FineDistribution = ({ dis, distributionOpen }: FineDistributionProps) => {
  const [showDistrDesc, setShowDistrDesc] = useState<boolean>(false);
  return (
    <div
      key={dis.name}
      className={clsx("flex justify-between w-full", {
        hidden: !distributionOpen,
      })}
    >
      <button
        onClick={() => {
          setShowDistrDesc(!showDistrDesc);
        }}
        className="flex mb-1 pr-2 w-full h-auto text-left focus:outline-none overflow-hidden transform hover:scale-101 transition duration-200 ease-in overflow-ellipsis"
      >
        <div>
          {dis.fulfilled_credits >= dis.required_credits ? (
            <Check fill="green" />
          ) : (
            <X stroke="red" />
          )}
        </div>
        <p
          className={clsx("pr-2 h-auto", {
            "overflow-hidden overflow-ellipsis whitespace-nowrap":
              !showDistrDesc,
          })}
        >
          {dis.name}
        </p>
      </button>
      <p className="font-bold">
        {dis.fulfilled_credits}/{dis.required_credits}
      </p>
    </div>
  );
};

export default FineDistribution;
