import React, { FC, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
  ReviewMode,
  SemesterType,
  UserCourse,
  Year,
} from '../../../resources/commonTypes';
import Comments from '../Comments';
import CourseComponent from './CourseComponent';

/**
 * This is a draggable CourseComponent container used for course DnD.
 * @prop course - the course displayed by the course component
 * @prop index - the position of the course within its parent semester
 * @prop semesterYear - the year the parent semester is part of
 * @prop semesterName - the parent semester's name
 */
const CourseDraggable: FC<{
  course: UserCourse;
  index: number;
  semesterYear: Year;
  semesterName: SemesterType;
  mode: ReviewMode;
  thread: string;
}> = ({ course, index, semesterYear, semesterName, mode, thread }) => {
  const [draggable, setDraggable] = useState<boolean>(true);
  const [hovered, setHovered] = useState<boolean>(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Draggable
        key={course._id}
        index={index}
        draggableId={course._id}
        isDragDisabled={draggable || mode === ReviewMode.View}
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
              <Comments
                location={'Course ' + course._id}
                hovered={hovered}
                mode={mode}
              />
              <CourseComponent
                setDraggable={setDraggable}
                year={semesterYear}
                course={course}
                semester={semesterName}
                mode={mode}
                thread={thread}
              />
            </div>
          );
        }}
      </Draggable>
    </div>
  );
};

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',

  // styles we need to apply on draggables
  ...draggableStyle,
});

export default CourseDraggable;
