import React, { useState, useEffect } from 'react';
import Semester from './Semester';
import { Course } from '../../commonTypes';

type semesterProps = {
  yearName: 'Freshman' | 'Sophomore' | 'Junior' | 'Senior';
  courses: Course[];
};

function Year({ yearName, courses }: semesterProps) {
  const [fallCourses, setFallCourses] = useState<Course[]>([]);
  const [springCourses, setSpringCourses] = useState<Course[]>([]);
  const [winterCourses, setWinterCourses] = useState<Course[]>([]);
  const [summerCourses, setSummerCourses] = useState<Course[]>([]);
  const [display, setDisplay] = useState<boolean>(true);

  useEffect(() => {
    courses.forEach((course) => {
      if (course.term === 'Fall') {
        setFallCourses([...fallCourses, course]);
      } else if (course.term === 'Spring') {
        setSpringCourses([...springCourses, course]);
      }
    });
    console.log('called');
  }, [courses]);

  const displaySemesters = () => {
    setDisplay(!display);
  };

  return (
    <div>
      <div style={yearNameSection} onClick={displaySemesters}>
        <div style={centerText}>{yearName}</div>
      </div>
      {display ? (
        <>
          <Semester semesterName={'Fall'} courses={fallCourses} />
          <Semester semesterName={'Spring'} courses={springCourses} />
          <Semester semesterName={'Winter'} courses={winterCourses} />
          <Semester semesterName={'Summer'} courses={summerCourses} />
        </>
      ) : null}
    </div>
  );
}

const yearNameSection = {
  backgroundColor: '#DEDEDE',
  height: '2rem',
  paddingLeft: '2rem',
  verticalAlign: 'middle',
  position: 'relative',
  borderBottom: 'solid',
  borderBottomColor: '#D4D4D4',
} as React.CSSProperties;

const centerText = {
  position: 'absolute',
  top: '50%',
  transform: 'translate(0, -50%)',
} as React.CSSProperties;

export default Year;
