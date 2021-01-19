import React, { useState, useEffect } from 'react';
import { Course } from '../commonTypes';
import { getColors } from '../assets';

type courseProps = {
  course: Course;
};

function CourseComponent({ course }: courseProps) {
  const [subColor, setSubColor] = useState<string>('pink');
  const [mainColor, setMainColor] = useState<string>('red');
  const [display, setDisplay] = useState<boolean>(false);

  useEffect(() => {
    const colors: string[] | undefined = getColors(course.distributions[0]);
    if (typeof colors !== 'undefined' && subColor !== colors[1]) {
      setSubColor(colors[1]);
    } else if (typeof colors !== 'undefined') {
      setMainColor(colors[0]);
    }
  }, [course.distributions, subColor, mainColor]);

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
        <div style={{ marginRight: '1.5rem' }}>{course.number}</div>
        <div style={{ marginRight: '1.5rem', width: '7.5rem' }}>
          {course.title}
        </div>
        <div style={{ marginRight: '2rem' }}>[-]</div>
      </div>
      {display ? (
        <div
          style={{
            paddingLeft: '2rem',
            paddingRight: '1rem',
            paddingBottom: '1rem',
            fontWeight: 'normal',
            fontSize: 'small',
          }}
        >
          {course.description}
        </div>
      ) : null}
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
