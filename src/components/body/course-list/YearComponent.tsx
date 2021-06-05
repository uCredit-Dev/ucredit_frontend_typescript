import React, { useState, useEffect } from "react";
import Semester from "./Semester";
import { UserCourse, Year } from "../../commonTypes";
import { ReactComponent as MoreSvg } from "../../svg/More.svg";
import { useSelector, useDispatch } from "react-redux";
import { selectPlan, updateSelectedPlan } from "../../slices/currentPlanSlice";
import { ReactComponent as RemoveSvg } from "../../svg/Remove.svg";
import { toast } from "react-toastify";

const api = "https://ucredit-api.herokuapp.com/api";

type yearProps = {
  id: number;
  customStyle: string;
  year: Year;
  courses: UserCourse[];
};

const emptyYear = {
  _id: "emptyYear",
  name: "emptyYear",
  year: -1,
  courses: ["emptyYear"],
  plan_id: "",
  user_id: "emptyYear",
};

/*
  A component displaying all the courses in a specific semester.
  Props:
    courses: courses it's displaying
    yearName: year this column is displaying
*/
function YearComponent({ id, customStyle, year, courses }: yearProps) {
  const [fallCourses, setFallCourses] = useState<UserCourse[]>([]);
  const [springCourses, setSpringCourses] = useState<UserCourse[]>([]);
  const [winterCourses, setWinterCourses] = useState<UserCourse[]>([]);
  const [summerCourses, setSummerCourses] = useState<UserCourse[]>([]);
  const [display, setDisplay] = useState<boolean>(true);

  const [yearName, setYearName] = useState<string>(year.name);
  // Determines whether we're editing the name.
  const [editName, setEditName] = useState<boolean>(false);

  // Setting up redux
  const currentPlan = useSelector(selectPlan);
  const dispatch = useDispatch();

  // Updates and parses all courses into semesters whenever the current plan or courses array changes.
  useEffect(() => {
    // For each of the user's courses for this year, put them in their respective semesters.
    const parsedFallCourses: UserCourse[] = [];
    const parsedSpringCourses: UserCourse[] = [];
    const parsedIntersessionCourses: UserCourse[] = [];
    const parsedSummerCourses: UserCourse[] = [];
    courses.forEach((course) => {
      if (course.term.toLowerCase() === "fall") {
        parsedFallCourses.push(course);
      } else if (course.term.toLowerCase() === "spring") {
        parsedSpringCourses.push(course);
      } else if (course.term.toLowerCase() === "summer") {
        parsedSummerCourses.push(course);
      } else if (course.term.toLowerCase() === "intersession") {
        parsedIntersessionCourses.push(course);
      }
    });
    setFallCourses(parsedFallCourses);
    setSpringCourses(parsedSpringCourses);
    setWinterCourses(parsedIntersessionCourses);
    setSummerCourses(parsedSummerCourses);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses, currentPlan, currentPlan.name]);

  // Displays dropdown showing semester categories
  const displaySemesters = () => {
    setDisplay(!display);
  };

  // Updates temporary year name and notifies useffect on state change to update db plan name with debounce.
  const handleYearNameChange = (event: any) => {
    setYearName(event.target.value);
    setEditName(true);
  };

  // Only edits name if editName is true. If true, calls debounce update function
  useEffect(() => {
    if (editName) {
      const update = setTimeout(updateName, 1000);
      return () => clearTimeout(update);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearName]);

  const updateName = () => {
    console.log("updateName called");

    const body = {
      year_id: year._id,
      // majors: currentPlan.majors,
      name: yearName,
    };
    fetch(api + "/years/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((resp) => {
        console.log("new name - ", yearName, resp);
        const newUpdatedYear = { ...year, name: yearName };
        const newYearArray = [...currentPlan.years];
        newYearArray.forEach((yr, index) => {
          if (yr._id === newUpdatedYear._id) {
            newYearArray[index] = { ...newUpdatedYear };
          }
        });
        let newUpdatedPlan = { ...currentPlan, years: newYearArray };
        dispatch(updateSelectedPlan(newUpdatedPlan));

        toast.success("Year name changed to " + yearName + "!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
        });
        setEditName(false);
        // dispatch(updatePlanList(newPlanList));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      id={id.toString()}
      className={`${customStyle} ml-auto mr-auto medium:px-4 w-yearheading min-w-yearMin`}
    >
      <div
        className="flex flex-row justify-between mb-3 p-2 w-full h-yearheading text-white font-medium bg-primary rounded shadow"
        // onClick={displaySemesters}
      >
        <input
          value={yearName}
          className="flex-shrink w-full text-white font-semibold bg-primary border-b select-none"
          onChange={handleYearNameChange}
        />
        <RemoveSvg
          className="w-6 h-6 stroke-2 cursor-pointer select-none transform hover:translate-x-0.5 hover:translate-y-0.5 transition duration-200 ease-in"
          // onClick={activateDeletePlan}
        />
        {/* <div className="select-none"
        // onMouseEnter={() => setSearchOpacity(50)}
        // onMouseLeave={() => setSearchOpacity(100)}
        >{getYearName()}</div> */}
        <MoreSvg
          className="w-6 h-6 stroke-2 cursor-pointer"
          onClick={displaySemesters}
        />
      </div>
      {display ? (
        <div className="flex flex-col items-center">
          <Semester
            customStyle=""
            semesterName="Fall"
            semesterYear={year.year}
            courses={fallCourses}
          />
          <Semester
            customStyle=""
            semesterName="Spring"
            semesterYear={year.year}
            courses={springCourses}
          />
          <Semester
            customStyle=""
            semesterName="Intersession"
            semesterYear={year.year}
            courses={winterCourses}
          />
          <Semester
            customStyle=""
            semesterName="Summer"
            semesterYear={year.year}
            courses={summerCourses}
          />
        </div>
      ) : null}
    </div>
  );
}

export default YearComponent;
