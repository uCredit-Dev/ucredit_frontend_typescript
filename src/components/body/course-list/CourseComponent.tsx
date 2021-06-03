import React, { useState, useEffect } from "react";
import { UserCourse, Plan, SemesterType } from "../../commonTypes";
import { checkAllPrereqs, getColors } from "../../assets";
import { useDispatch, useSelector } from "react-redux";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  selectCurrentPlanCourses,
  selectPlan,
  updateSelectedPlan,
} from "../../slices/currentPlanSlice";
import { selectAllCourses } from "../../slices/userSlice";

const api = "https://ucredit-api.herokuapp.com/api";

type courseProps = {
  course: UserCourse;
  year: number;
  semester: SemesterType;
};

/*
  This is a course card displayed in the course list under each semester.
  Props:
    Course: course it's displaying
    Year: year this course is part of
    Semester: semester this course is part of
*/
function CourseComponent({ year, course, semester }: courseProps) {
  const [activated, setActivated] = useState<boolean>(false);
  const [satisfied, setSatisfied] = useState<boolean>(false);

  // Redux setup
  const dispatch = useDispatch();
  const currentPlan = useSelector(selectPlan);
  const currPlanCourses = useSelector(selectCurrentPlanCourses);
  const allCourses = useSelector(selectAllCourses);

  useEffect(() => {
    isSatisfied();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currPlanCourses]);

  const isSatisfied = () => {
    const temp = checkAllPrereqs(
      currPlanCourses,
      currentPlan,
      course.number,
      year,
      semester,
      allCourses
    );
    setSatisfied(temp);
  };

  // Sets or resets the course displayed in popout after user clicks it in course list.
  const displayCourses = () => {
    dispatch(updateSearchTime({ searchYear: year, searchSemester: semester }));
    dispatch(updateSearchTerm(course.number));
    axios
      .get(api + "/search", { params: { query: course.number } })
      .then((retrievedData) => {
        const retrievedCourse = retrievedData.data.data;
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
    fetch(api + "/courses/" + course._id, { method: "DELETE" }).then(() => {
      let newPlan: Plan;
      // TODO: Delete specific course by year AND semester
      const years = [...currentPlan.years];
      currentPlan.years.forEach((planYear, index) => {
        if (planYear.year === year) {
          const courses = planYear.courses.filter(
            (yearCourse) => yearCourse !== course._id
          );
          years[index] = { ...years[index], courses: courses };
        }
      });
      newPlan = { ...currentPlan, years: years };

      toast.error(course.title + " deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      dispatch(updateSelectedPlan(newPlan));
    });
  };

  const activate = () => {
    setActivated(true);
  };

  const deactivate = () => {
    setActivated(false);
  };

  const getFirst20 = (toParse: string) => {
    let out = "";
    const toParseArr = toParse.split("");
    toParseArr.forEach((char: string, index) => {
      if (index < 33) {
        out = out + char;
      } else if (index === 33) {
        out = out + "...";
      }
    });
    return out;
  };

  return (
    <>
      <div
        className={clsx(
          "relative items-center mt-2 p-2 h-14 bg-white rounded shadow",
          {
            "bg-red-300": !satisfied,
          }
        )}
        onMouseEnter={activate}
        onMouseLeave={deactivate}
        key={course.number}
      >
        <div className="flex flex-col gap-1 h-full">
          <div className="w-4/6 text-coursecard truncate">
            {getFirst20(course.title)}
          </div>
          {/* <div className="grid gap-1 grid-cols-3 text-center text-coursecard divide-x-2">
            <div>{course.number}</div>
            <div className="truncate">{course.credits} credits</div>
            <div className="truncate">{course.area}</div>
          </div> */}
          <div className="flex flex-row gap-1 text-center text-coursecard">
            <div>{course.number}</div>
            <div className="flex flex-row items-center">
              <div className="flex items-center px-1 w-auto h-5 text-white font-semibold bg-secondary rounded select-none">
                {course.credits}
              </div>
            </div>
            {course.area !== "None" ? (
              <div className="flex flex-row items-center">
                <div
                  className="flex items-center px-1 w-auto h-5 text-white font-semibold rounded select-none"
                  style={{ backgroundColor: getColors(course.area)[0] }}
                >
                  {course.area}
                </div>
              </div>
            ) : null}
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
      </div>
    </>
  );
}

export default CourseComponent;
