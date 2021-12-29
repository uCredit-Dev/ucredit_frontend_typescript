import { FC } from "react";
import { SISRetrievedCourse, Course } from "../../../../resources/commonTypes";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePlaceholder,
  selectVersion,
  updateInspectedCourse,
  updateInspectedVersion,
} from "../../../../slices/searchSlice";
import clsx from "clsx";

/**
 * A course card in the search list.
 * @prop course - the course being displayed.
 */
const CourseCard: FC<{
  course: SISRetrievedCourse;
  version: number;
}> = (props) => {
  // Setup Redux
  const dispatch = useDispatch();
  const selectedCourse = useSelector(selectVersion);

  /**
   * User selects a course to look at.
   */
  const handleCourseClick = () => {
    dispatch(updateInspectedCourse(props.course));
    dispatch(updatePlaceholder(false));
    const newInspected: Course = {
      title: props.course.title,
      number: props.course.number,
      ...props.course.versions[props.version],
    };
    dispatch(updateInspectedVersion(newInspected));
  };

  return (
    <div
      className={clsx(
        {
          "bg-secondary bg-opacity-25":
            selectedCourse !== "None" &&
            selectedCourse.number === props.course.number &&
            selectedCourse.term === props.course.terms[props.version],
        },
        "mb-2 p-2 w-full h-14 bg-white rounded hover:shadow cursor-pointer transition duration-200 ease-in-out"
      )}
      onClick={handleCourseClick}
    >
      <div className="flex flex-col justify-center w-full h-full">
        <div className="truncate">{props.course.title}</div>
        <div>
          {props.course.number} {props.course.terms[props.version]}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
