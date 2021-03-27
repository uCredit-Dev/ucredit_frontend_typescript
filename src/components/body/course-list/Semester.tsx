import React, { useState } from 'react';
import { SemesterType, UserCourse, YearType } from '../../commonTypes';
import CourseComponent from './CourseComponent';
import { useDispatch } from 'react-redux';
import { updateSearchStatus, updateSearchTime } from '../../slices/searchSlice';

type semesterProps = {
  semesterName: SemesterType;
  semesterYear: YearType;
  courses: UserCourse[];
  detailName: string;
  setDetailName: Function;
};

// Dropdown of all courses in a semester.
function Semester({
  semesterName,
  semesterYear,
  courses,
  detailName,
  setDetailName,
}: semesterProps) {
  // Redux setup
  const dispatch = useDispatch();

  // State used to control whether dropdown is opened or closed
  const [display, setDisplay] = useState<boolean>(true);

  // Sets closed to open and open to closed for course display dropdown
  const displayCourses = () => {
    setDisplay(!display);
  };

  // Opens search popup to add new course.
  const addCourse = () => {
    dispatch(updateSearchStatus(true));
    dispatch(
      updateSearchTime({
        searchSemester: semesterName,
        searchYear: semesterYear,
      })
    );
  };

  return (
    <>
      <div style={semesterNameStyle} onClick={displayCourses}>
        <div style={centerText}>
          {semesterName} ({courses.length}){' '}
          <button onClick={addCourse}>+</button>
        </div>
      </div>
      {display ? (
        <div>
          {courses.map((course) => (
            <CourseComponent
              key={course.title}
              course={course}
              detailName={detailName}
              setDetailName={setDetailName}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}

const semesterNameStyle = {
  backgroundColor: '#D4D4D4',
  height: '2rem',
  paddingLeft: '3rem',
  borderBottom: 'solid',
  borderBottomColor: '#BEBEBE',
  verticalAlign: 'middle',
  position: 'relative',
  fontWeight: 'normal',
} as React.CSSProperties;

const centerText = {
  position: 'absolute',
  top: '50%',
  transform: 'translate(0, -50%)',
} as React.CSSProperties;

export default Semester;
