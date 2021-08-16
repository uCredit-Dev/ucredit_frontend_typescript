import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { SemesterType, UserCourse, Year } from "../../../resources/commonTypes";
import CourseComponent from "./CourseComponent";

type CourseDraggableProps = {
  course: UserCourse;
  index: number;
  semesterYear: Year;
  semesterName: SemesterType;
};

const CourseDraggable = ({
  course,
  index,
  semesterYear,
  semesterName,
}: CourseDraggableProps) => {
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
              provided.draggableProps.style
            )}
          >
            <CourseComponent
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
  userSelect: "none",

  // styles we need to apply on draggables
  ...draggableStyle,
});

export default CourseDraggable;
