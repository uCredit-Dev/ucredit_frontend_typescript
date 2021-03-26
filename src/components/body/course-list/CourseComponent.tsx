import React, { useState, useEffect } from 'react';
import { UserCourse } from '../../commonTypes';
import { getColors } from '../../assets';
import CoursePopout from './CoursePopout';

type courseProps = {
  course: UserCourse;
  detailName: string;
  setDetailName: Function;
};

function CourseComponent({ course, detailName, setDetailName }: courseProps) {
  const [subColor, setSubColor] = useState<string>('pink');
  const [mainColor, setMainColor] = useState<string>('red');

  // Chooses which colors to display course as.
  useEffect(() => {
    const colors: string[] | undefined = getColors(course.area);
    if (typeof colors !== 'undefined' && subColor !== colors[1]) {
      setSubColor(colors[1]);
    } else if (typeof colors !== 'undefined') {
      setMainColor(colors[0]);
    }
  }, [course.area, subColor, mainColor]);

  // Sets or resets the course displayed in popout after user clicks it in course list.
  const displayCourses = () => {
    if (course.title === detailName) {
      setDetailName('');
    } else {
      setDetailName(course.title);
    }
    console.log('click!');
  };

  return (
    <div
      style={{
        borderBottom: 'solid',
        borderBottomColor: mainColor,
        backgroundColor: subColor,
        maxWidth: '50rem',
      }}
    >
      <div style={courseStyle} onClick={displayCourses}>
        <div style={{ marginRight: '1.5rem' }}>{course.number}</div>
        <div style={{ marginRight: '1.5rem', width: '7.5rem' }}>
          {course.title}
        </div>
        <div style={{ marginRight: '2rem' }}>[-]</div>
      </div>
      {course.title === detailName ? (
        <CoursePopout
          mainColor={mainColor}
          subColor={subColor}
          course={course}
        />
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
