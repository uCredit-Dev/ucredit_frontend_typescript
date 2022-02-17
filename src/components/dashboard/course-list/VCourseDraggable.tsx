import { FC, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { SemesterType, UserCourse, Year } from '../../../resources/commonTypes';
import VCourseComponent from './VCourseComponent';

/**
 * This is a draggable CourseComponent container used for course DnD.
 * @prop course - the course displayed by the course component
 * @prop index - the position of the course within its parent semester
 * @prop semesterYear - the year the parent semester is part of
 * @prop semesterName - the parent semester's name
 */
const VCourseDraggable: FC<{
  course: UserCourse;
  index: number;
  semesterYear: Year;
  semesterName: SemesterType;
}> = ({ course, index, semesterYear, semesterName }) => {
  const [draggable, setDraggable] = useState<boolean>(true);
  return (
    <Draggable
      key={course._id}
      index={index}
      draggableId={course._id}
      isDragDisabled={draggable}
    >
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style,
            )}
          >
            <VCourseComponent
              setDraggable={setDraggable}
              year={semesterYear}
              course={course}
              semester={semesterName}
            />
          </div>
        );
      }}
    </Draggable>
  );
};

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',

  // styles we need to apply on draggables
  ...draggableStyle,
});

export default VCourseDraggable;
