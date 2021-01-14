import React, { useState } from 'react';
import { Course } from '../commonTypes';

type courseProps = {
  course: Course;
};

function CourseComponent({ course }: courseProps) {
  const [subColor, setSubColor] = useState<string>('pink');
  const [mainColor, setMainColor] = useState<string>('red');
  const [display, setDisplay] = useState<boolean>(false);
  const displayCourses = () => {
    setDisplay(!display);
  };
  return (
    <div
      style={{
        borderBottom: 'solid',
        borderBottomColor: mainColor,
        backgroundColor: subColor,
      }}
    >
      <div style={courseStyle} onClick={displayCourses}>
        <div style={{ marginRight: '1.5rem' }}>{course.courseNumber}</div>
        <div style={{ marginRight: '1.5rem', width: '7.5rem' }}>
          {course.courseName}
        </div>
        <div style={{ marginRight: '2rem' }}>[-]</div>
      </div>
      {display ? <div>hi</div> : null}
    </div>
  );
}

const courseStyle = {
  display: 'flex',
  flexFlow: 'row',
  padding: '0.5rem',
  paddingLeft: '2rem',
  fontSize: 'small',
} as React.CSSProperties;

export default CourseComponent;
