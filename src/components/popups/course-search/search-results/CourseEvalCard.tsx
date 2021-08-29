import React, { useEffect } from "react";
import { ReactComponent as StarSvg } from "../../../../resources/svg/Star.svg";
import clsx from "clsx";
import ReactTooltip from "react-tooltip";

const ratingStars = Array(5).fill(0);

/**
 * A course evaluation card display component.
 * @prop props - rating: the evaluation rating, summary: the evaluation summary
 */
const CourseEvalCard = (props: { rating: string; summary: string }) => {
  const ratingNum = Math.trunc(parseInt(props.rating)) - 1;

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [props.rating, props.summary]);

  return (
    <div className="mb-2 tight:pt-0 px-6 py-8 w-full h-52 tight:h-96 bg-gray-50 rounded shadow">
      <div className="flex tight:flex-col flex-row w-full h-full">
        <div className="flex flex-col items-center justify-center mr-4 p-4 w-40 h-full">
          <h2 className="mb-2">Rating</h2>
          <div
            className="flex flex-row"
            data-tip={props.rating}
            data-for="godTip"
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
