import React, { useState, useEffect } from "react";
import { UserCourse, YearType, Plan, SemesterType } from "../../commonTypes";
import { getColors } from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import { selectPlan, updateSelectedPlan } from "../../slices/userSlice";
import {
  updateSearchStatus,
  updateInspectedCourse,
  updateSearchTime,
  updateSearchTerm,
  updatePlaceholder,
} from "../../slices/searchSlice";
import axios from "axios";
import { ReactComponent as RemoveSvg } from "../../svg/Remove.svg";
import { ReactComponent as DetailsSvg } from "../../svg/Details.svg";
import { Transition } from "@tailwindui/react";
import clsx from "clsx";

const api = "https://ucredit-api.herokuapp.com/api";

type courseProps = {
  course: UserCourse;
  year: YearType;
  semester: SemesterType;
};

function CourseComponent({ year, course, semester }: courseProps) {
  const [subColor, setSubColor] = useState<string>("pink");
  const [mainColor, setMainColor] = useState<string>("red");

  const [activated, setActivated] = useState<boolean>(false);

  // Redux setup
  const dispatch = useDispatch();
  const currentPlan = useSelector(selectPlan);

  // Chooses which colors to display course as.
  useEffect(() => {
    console.log(course);
    const colors: string[] | undefined = getColors(course.area);
    if (typeof colors !== "undefined" && subColor !== colors[1]) {
      setSubColor(colors[1]);
    } else if (typeof colors !== "undefined") {
      setMainColor(colors[0]);
    }
  }, [course.area, subColor, mainColor]);

  // Sets or resets the course displayed in popout after user clicks it in course list.
  const displayCourses = () => {
    dispatch(updateSearchTime({ searchYear: year, searchSemester: semester }));
    dispatch(updateSearchTerm(course.number));
    axios
      .get(api + "/search", { params: { query: course.number } })
      .then((retrievedData) => {
        const retrievedCourse = retrievedData.data.data;
        console.log(course.credits);
        if (retrievedCourse.length === 0) {
          dispatch(updatePlaceholder(true));
          const placeholderCourse = {
            title: course.title,
            number: course.number,
            areas: course.area,
            terms: [],
            school: "none",
            department: "none",
            credits: course.credits.toString(),
            wi: false,
            bio: "This is a placeholder course",
            tags: [],
            preReq: [],
            restrictions: [],
          };
          dispatch(updateInspectedCourse(placeholderCourse));
        } else {
          dispatch(updatePlaceholder(false));
          dispatch(updateInspectedCourse(retrievedCourse[0]));
        }
      })
      .then(() => {
        dispatch(updateSearchStatus(true));
      })
      .catch((err) => console.log(err));
  };

  // Deletes a course on click of the delete button. Updates currently displayed plan with changes.
  const deleteCourse = () => {
    fetch(api + "/courses/" + course._id, { method: "DELETE" }).then((resp) => {
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

  const activate = () => {
    setActivated(true);
  };

  const deactivate = () => {
    setActivated(false);
  };

  return (
    <>
      <div
        className="relative flex-row items-center mt-2 p-2 w-full h-14 bg-white rounded shadow"
        onMouseEnter={activate}
        onMouseLeave={deactivate}
      >
        <div className="flex flex-col w-full h-full select-none">
          <div className="text-coursecard truncate">{course.title}</div>
          <div>
            {course.number} | {course.credits} credits | {course.area}
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Transition
            show={activated}
            enter="transition-opacity duration-100 ease-in-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200 ease-in-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {(ref) => (
              <div
                ref={ref}
                className={clsx(
                  "absolute z-10 inset-0 flex flex-row items-center justify-center w-full h-full rounded",
                  {
                    "pointer-events-none": !activated,
                  }
                )}
              >
                <div className="absolute left-0 top-0 w-full h-full bg-white bg-opacity-80 rounded" />
                <DetailsSvg
                  className="relative z-20 flex flex-row items-center justify-center mr-5 p-0.5 w-6 h-6 text-white bg-secondary rounded-md outline-none stroke-2 cursor-pointer transform hover:translate-x-0.5 hover:translate-y-0.5 transition duration-150 ease-in"
                  onClick={displayCourses}
                />
                <RemoveSvg
                  className="relative z-20 flex flex-row items-center justify-center p-0.5 w-6 h-6 text-white bg-secondary rounded-md outline-none stroke-2 cursor-pointer transform hover:translate-x-0.5 hover:translate-y-0.5 transition duration-150 ease-in"
                  onClick={deleteCourse}
                />
              </div>
            )}
          </Transition>
        </div>
        {/* {course.distribution_ids.map(id =><div>{id.}</div>)}, Can't display distributions as they aren't retrieved yet*/}
        {/* {course.credits} */}
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
