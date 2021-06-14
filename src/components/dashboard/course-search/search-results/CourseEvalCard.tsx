import React from "react";
import { ReactComponent as StarSvg } from "../../../../resources/svg/Star.svg";
import clsx from "clsx";

const ratingStars = Array(5).fill(0);

/**
 * A course evaluation card display component.
 * @param props - rating: the evaluation rating, summary: the evaluation summary
 */
const CourseEvalCard = (props: { rating: string; summary: string }) => {
  const ratingNum = Math.trunc(parseInt(props.rating)) - 1;

  return (
    <div className="mb-2 px-6 py-8 w-full h-52 bg-gray-50 rounded shadow">
      <div className="flex flex-row w-full h-full">
        <div className="flex flex-col items-center justify-center mr-4 p-4 w-40 h-full">
          <h2 className="mb-2">Rating</h2>
          <div
            className="flex flex-row"
            data-tip={props.rating}
            data-for="dashboard-tip-search"
          >
            {ratingStars.map((_, i) => (
              <StarSvg
                className={clsx(
                  "w-6 h-6 transform hover:scale-125 transition duration-200 ease-in",
                  {
                    "fill-gold": i <= ratingNum,
                  }
                )}
              />
            ))}
          </div>
        </div>
        <div className="flex-grow w-40 overflow-auto">{props.summary}</div>
      </div>
    </div>
  );
};

export default CourseEvalCard;
