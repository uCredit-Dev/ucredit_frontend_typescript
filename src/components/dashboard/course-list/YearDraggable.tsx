import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { UserCourse, Year } from "../../../resources/commonTypes";
import YearComponent from "./YearComponent";

/**
 * The year draggable for shifting around year ordering.
 * @param year - The year contained in the draggable.
 * @param yearIndex - The index of the year among the other years.
 * @param yearCourses - The courses contained in the year.
 */
const YearDraggable = (props: {
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
            <YearComponent
              key={props.year._id}
              id={props.yearIndex}
              customStyle="cursor-pointer"
              year={props.year}
              courses={props.yearCourses}
            />
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
  marginLeft: "auto",
  marginRight: "auto",
  width: "20%",
  minWidth: "205px",
  maxWIdth: "255px",
});

export default YearDraggable;
