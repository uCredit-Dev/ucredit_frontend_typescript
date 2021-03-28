import React, { useState, useEffect } from "react";
import { UserCourse } from "../../commonTypes";
import { getColors } from "../../assets";
import CoursePopout from "./CoursePopout";

type courseProps = {
  course: UserCourse;
  detailName: string;
  setDetailName: Function;
};

function CourseComponent({ course, detailName, setDetailName }: courseProps) {
  const [subColor, setSubColor] = useState<string>("pink");
  const [mainColor, setMainColor] = useState<string>("red");

  // Chooses which colors to display course as.
  useEffect(() => {
    const colors: string[] | undefined = getColors(course.area);
    if (typeof colors !== "undefined" && subColor !== colors[1]) {
      setSubColor(colors[1]);
    } else if (typeof colors !== "undefined") {
      setMainColor(colors[0]);
    }
  }, [course.area, subColor, mainColor]);

  // Sets or resets the course displayed in popout after user clicks it in course list.
  const displayCourses = () => {
    if (course.title === detailName) {
      setDetailName("");
    } else {
      setDetailName(course.title);
    }
    console.log("click!");
  };

  return (
    <>
      <div
        className='bg-gray-coursecard w-semesterheading flex flex-col mt-4 p-4 h-auto rounded-2xl'
        onClick={displayCourses}>
        <div>{course.title}</div>
        <div>{course.number}</div>
        <div>
          {course.distribution_ids}, {course.credits}
        </div>
      </div>
      {course.title === detailName ? (
        <CoursePopout
          mainColor={mainColor}
          subColor={subColor}
          course={course}
        />
      ) : null}
    </>
  );
}

export default CourseComponent;
