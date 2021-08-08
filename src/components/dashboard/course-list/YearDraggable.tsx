import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { UserCourse, Year } from "../../../resources/commonTypes";
import YearComponent from "./YearComponent";

const YearDroppable = (props: {
  year: Year;
  yearIndex: number;
  yearCourses: UserCourse[];
}) => {
  return (
    <Draggable
      key={props.year._id}
      index={props.yearIndex}
      draggableId={props.year._id}
    >
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
          >
            <div className="mx-auto">
              <YearComponent
                key={props.year._id}
                id={props.yearIndex}
                customStyle="cursor-pointer"
                year={props.year}
                courses={props.yearCourses}
              />
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",

  // styles we need to apply on draggables
  ...draggableStyle,

  padding: "0rem",
  margin: "0rem",
});

export default YearDroppable;
