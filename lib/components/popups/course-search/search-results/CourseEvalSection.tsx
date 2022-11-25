import React, { useState, useEffect, FC } from 'react';
import { CourseEvals } from '../../../../resources/commonTypes';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectInspectedCourse } from '../../../../slices/searchSlice';
import CourseEvalCard from './CourseEvalCard';
import clsx from 'clsx';
import { getAPI } from '../../../../resources/assets';
import React from 'react';

/**
 * Displays course Evaluations based on inspected course
 */
const CourseEvalSection: FC = () => {
  let initialCourseEval: CourseEvals = {
    prof: '',
    number: '',
    rating: '',
    summary: '',
    term: '',
  };

  const inspected = useSelector(selectInspectedCourse);
  const [courseEvals, setEval] = useState(initialCourseEval);
  const [courseReviews, setReviews] = useState([]);
  const [selectedCourseEval, setSelectedCourseEval] = useState<number>(-1);

  // Gets all evaluations for a particular course.
  const getEvals = () => {
    // reset the course evals view
    setEval(initialCourseEval);
    setSelectedCourseEval(-1);
    setReviews([]);

    if (inspected !== 'None' && inspected !== undefined) {
      axios
        .get(getAPI(window) + '/evals/' + inspected.number)
        .then((retrievedData) => {
          setReviews(retrievedData.data.data.rev);
        })
        .catch((err) => console.log(err, ' - course likely does not exist'));
    }
  };

  /**
   * Updates the evaluations to a certain course evaluation.
   * @param revIndex - index of course evaluation amongst other evaluations
   */
  const updateEvals = (revIndex: number): void => {
    // remove if already selected
    if (revIndex === selectedCourseEval) {
      setSelectedCourseEval(-1);
      return;
    }
    setSelectedCourseEval(revIndex);
    if (courseReviews.length !== 0) {
      const chosenRev = courseReviews[revIndex];
      let courseEval: CourseEvals = { ...initialCourseEval };
      courseEval.prof = chosenRev['i'];
      courseEval.rating = chosenRev['g']; // random one
      courseEval.term = chosenRev['s'];
      courseEval.summary = chosenRev['c'];
      setEval(courseEval);
    }
  };

  // update every time inspected changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(getEvals, [inspected]);
  useEffect(() => {
    // default to latest
    updateEvals(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseReviews]);

  /**
   * Display component function.
   * @returns jsx components based on course reviews.
   */
  const displayEvals = () => {
    if (courseReviews.length === 0)
      return (
        <div className="flex flex-row justify-center mt-2">
          No reviews available!
        </div>
      );
    return (
      <div className="mt-2">
        {courseReviews.map(({ i, g, s }, index: number) => {
          return (
            <div>
              <button
                className={clsx(
                  'mb-2 border-b border-solid hover:border-black border-gray-300 focus:outline-none transform hover:scale-105 transition duration-200 ease-in',
                  {
                    'border-gray-900': selectedCourseEval === index,
                  },
                )}
                onClick={() => {
                  updateEvals(index);
                }}
              >
                {s} | {i} | {g}
              </button>
              {selectedCourseEval === index && (
                <CourseEvalCard
                  rating={courseEvals.rating}
                  summary={courseEvals.summary}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return displayEvals();
};

export default CourseEvalSection;
