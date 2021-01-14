import React, { useState } from 'react';
import { Course } from '../../commonTypes';
import CourseComponent from '../CourseComponent';
import { testCourseFall, testCourseSpring } from '../../testObjs';

type semesterProps = {
  semesterName: string;
  courses: Course[];
};

function Semester({ semesterName, courses }: semesterProps) {
  const [display, setDisplay] = useState<boolean>(true);
  const displayCourses = () => {
    setDisplay(!display);
  };
  return (
    <>
      <div style={semesterNameStyle} onClick={displayCourses}>
        <div style={centerText}>{semesterName}</div>
      </div>
      {display ? (
        <div>
          <CourseComponent course={testCourseFall} />
          <CourseComponent course={testCourseSpring} />
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
} as React.CSSProperties;

const centerText = {
  position: 'absolute',
  top: '50%',
  transform: 'translate(0, -50%)',
} as React.CSSProperties;

export default Semester;
