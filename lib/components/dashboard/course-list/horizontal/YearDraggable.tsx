import React, { FC, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
  ReviewMode,
  UserCourse,
  Year,
} from '../../../../resources/commonTypes';
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
}> = (props) => {
  const [draggable, setDraggable] = useState<boolean>(true);
  return (
    <Draggable
      key={props.year._id}
      index={props.yearIndex}
      draggableId={props.year._id}
      isDragDisabled={
        draggable || props.id === 0 || props.mode === ReviewMode.View
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
              key={props.year._id}
              id={props.yearIndex}
              year={props.year}
              courses={props.yearCourses}
              setDraggable={setDraggable}
              mode={props.mode}
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
