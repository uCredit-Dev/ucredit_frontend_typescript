import React, { FC } from 'react';
import clsx from 'clsx';
import { StarIcon } from '@heroicons/react/outline';

const ratingStars = Array(5).fill(0);

/**
 * A course evaluation card display component.
 * @prop props - rating: the evaluation rating, summary: the evaluation summary
 */
const CourseEvalCard: FC<{ rating: string; summary: string }> = ({
  rating,
  summary,
}) => {
  const ratingNum = Math.trunc(parseInt(rating)) - 1;

  return (
    <div className="w-full px-6 py-8 mb-2 rounded tight:pt-0 h-52 tight:h-96 bg-gray-50">
      <div className="flex flex-row w-full h-full tight:flex-col">
        <div className="flex flex-col items-center justify-center w-40 h-full p-4 mr-4">
          <h2 className="mb-2">Rating</h2>
          <div
            className="flex flex-row"
            data-tooltip-content={rating}
            data-tooltip-id="godtip"
          >
            {ratingStars.map((_, i) => (
              <StarIcon
                className={clsx(
                  'w-6 h-6 transform hover:scale-125 transition duration-200 ease-in',
                  {
                    'fill-gold': i <= ratingNum,
                  },
                )}
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
