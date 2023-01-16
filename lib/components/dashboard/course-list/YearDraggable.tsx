import React, { FC, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ReviewMode, UserCourse, Year } from '../../../resources/commonTypes';
import YearComponent from './YearComponent';

/**
 * The year draggable for shifting around year ordering.
 * @prop id - The index of the year among the other years.
 * @prop year - The year contained in the draggable.
 * @prop yearIndex - The index of the year among the other years.
 * @prop yearCourses - The courses contained in the year.
 */
const YearDraggable: FC<{
  id: number;
  year: Year;
  yearIndex: number;
  yearCourses: UserCourse[];
  mode: ReviewMode;
}> = ({ id, year, yearIndex, yearCourses, mode }) => {
  const [draggable, setDraggable] = useState<boolean>(true);
  return (
    <Draggable
      key={year._id}
      index={yearIndex}
      draggableId={year._id}
      isDragDisabled={
        draggable ||
        id === 0 ||
        mode === ReviewMode.View ||
        mode === ReviewMode.RoadMap
      }
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
            <YearComponent
              key={year._id}
              id={yearIndex}
              year={year}
              courses={yearCourses}
              setDraggable={setDraggable}
              mode={mode}
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

  padding: '0rem',
  marginLeft: '1rem',
});

export default YearDraggable;
