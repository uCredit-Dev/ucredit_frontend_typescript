import React, { FC } from 'react';
import { SISRetrievedCourse, Course } from '../../../../resources/commonTypes';
import { useDispatch, useSelector } from 'react-redux';
import {
  updatePlaceholder,
  selectVersion,
  updateInspectedCourse,
  updateInspectedVersion,
} from '../../../../slices/searchSlice';
import clsx from 'clsx';

/**
 * A course card in the search list.
 * @prop course - the course being displayed.
 */
const CourseCard: FC<{
  course: SISRetrievedCourse;
  version: number;
}> = ({ course, version }) => {
  // Setup Redux
  const dispatch = useDispatch();
  const selectedCourse = useSelector(selectVersion);

  /**
   * User selects a course to look at.
   */
  const handleCourseClick = () => {
    dispatch(updateInspectedCourse(course));
    dispatch(updatePlaceholder(false));
    const newInspected: Course = {
      title: course.title,
      number: course.number,
      ...course.versions[version],
    };
    dispatch(updateInspectedVersion(newInspected));
  };

  return (
    <div
      className={clsx(
        {
          'bg-secondary bg-opacity-25':
            selectedCourse !== 'None' &&
            selectedCourse.number === course.number &&
            selectedCourse.title === course.title &&
            selectedCourse.term === course.terms[version],
        },
        'mb-2 p-2 w-full h-14 bg-white rounded cursor-pointer transition duration-200 ease-in-out search-result',
      )}
      onClick={handleCourseClick}
    >
      <div className="flex flex-col justify-center w-full h-full">
        <div className="truncate">{course.title}</div>
        <div>
          {course.number} {course.terms[version]}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
