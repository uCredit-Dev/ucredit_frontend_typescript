import React, { useState, useEffect } from "react";
import { UserCourse, YearType, Plan } from "../../commonTypes";
import { getColors } from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import { selectPlan, updateSelectedPlan } from "../../slices/userSlice";
import CoursePopout from "./CoursePopout";
const api = "https://ucredit-api.herokuapp.com/api";

type courseProps = {
  course: UserCourse;
  detailName: string;
  setDetailName: Function;
  year: YearType;
};

function CourseComponent({
  year,
  course,
  detailName,
  setDetailName,
}: courseProps) {
  const [subColor, setSubColor] = useState<string>("pink");
  const [mainColor, setMainColor] = useState<string>("red");

  // Redux setup
  const dispatch = useDispatch();
  const currentPlan = useSelector(selectPlan);

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

  // Deletes a course on click of the delete button. Updates currently displayed plan with changes.
  const deleteCourse = () => {
    fetch(api + "/courses/" + course._id, { method: "DELETE" }).then((resp) => {
      console.log(resp);
      // TODO: Update plan
      let newPlan: Plan;
      if (year === "Freshman") {
        const freshmanCourses = currentPlan.freshman.filter(
          (freshCourse) => freshCourse !== course._id
        );
        newPlan = { ...currentPlan, freshman: freshmanCourses };
      } else if (year === "Sophomore") {
        const sophomoreCourses = currentPlan.sophomore.filter(
          (sophCourse) => sophCourse !== course._id
        );
        newPlan = { ...currentPlan, sophomore: sophomoreCourses };
      } else if (year === "Junior") {
        const juniorCourses = currentPlan.junior.filter(
          (juniorCourse) => juniorCourse !== course._id
        );
        newPlan = { ...currentPlan, junior: juniorCourses };
      } else {
        const seniorCourses = currentPlan.senior.filter(
          (seniorCourse) => seniorCourse !== course._id
        );
        newPlan = { ...currentPlan, senior: seniorCourses };
      }
      dispatch(updateSelectedPlan(newPlan));
    });
  };

  return (
    <>
      <div
        className="flex flex-col mt-4 p-4 w-semesterheading h-auto bg-gray-coursecard rounded-2xl"
        onClick={displayCourses}
      >
        <div>{course.title}</div>
        <div>{course.number}</div>
        <div>
          {/* {course.distribution_ids.map(id =><div>{id.}</div>)}, Can't display distributions as they aren't retrieved yet*/}
          {/* {course.credits} */}
          <button onClick={deleteCourse}>delete</button>
        </div>
      </div>
      {/* {course.title === detailName ? (
        <CoursePopout
          mainColor={mainColor}
          subColor={subColor}
          course={course}
        />
      ) : null} */}
    </>
  );
}

export default CourseComponent;
