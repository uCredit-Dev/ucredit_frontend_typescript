import { FC, useEffect } from 'react';
import clsx from 'clsx';
import ReactTooltip from 'react-tooltip';
import { StarIcon } from '@heroicons/react/outline';

const ratingStars = Array(5).fill(0);

/**
 * A course evaluation card display component.
 * @prop props - rating: the evaluation rating, summary: the evaluation summary
 */
const CourseEvalCard: FC<{ rating: string; summary: string }> = (props) => {
  const ratingNum = Math.trunc(parseInt(props.rating)) - 1;

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [props.rating, props.summary]);

  return (
    <div className="w-full px-6 py-8 mb-2 rounded shadow tight:pt-0 h-52 tight:h-96 bg-gray-50">
      <div className="flex flex-row w-full h-full tight:flex-col">
        <div className="flex flex-col items-center justify-center w-40 h-full p-4 mr-4">
          <h2 className="mb-2">Rating</h2>
          <div
            className="flex flex-row"
            data-tip={props.rating}
            data-for="godTip"
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
        <div className="flex-grow w-40 overflow-auto">{props.summary}</div>
      </div>
    </div>
  );
};

export default CourseEvalCard;
