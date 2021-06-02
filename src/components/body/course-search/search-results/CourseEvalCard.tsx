import clsx from "clsx";
import React from "react";
import ReactTooltip from "react-tooltip";
import { ReactComponent as StarSvg } from "../../../svg/Star.svg";

interface CourseEvalCardProps {
  rating: string;
  summary: string;
}

const ratingStars = Array(5).fill(0);

const CourseEvalCard: React.FC<CourseEvalCardProps> = ({ rating, summary }) => {
  const ratingNum = Math.trunc(parseInt(rating)) - 1;

  return (
    <div className="w-full px-6 py-8 mb-2 rounded shadow h-52 bg-gray-50">
      <ReactTooltip />
      <div className="flex flex-row w-full h-full">
        <div className="flex flex-col items-center justify-center w-40 h-full p-4 mr-4">
          <h2 className="mb-2">Rating</h2>
          <div className="flex flex-row" data-tip={rating}>
            {ratingStars.map((_, i) => (
              <StarSvg
                className={clsx("w-6 h-6", {
                  "fill-gold": i <= ratingNum,
                })}
              />
            ))}
          </div>
        </div>
        <div className="flex-grow w-40 overflow-auto">{summary}</div>
      </div>
    </div>
  );
};

export default CourseEvalCard;
