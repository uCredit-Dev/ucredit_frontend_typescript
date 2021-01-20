import React, { useState, useEffect } from 'react';
import Year from './Year';
import { Course, User } from '../../commonTypes';
import { getCourses } from '../../assets';

type courseListProps = {
  user: User;
};

function CourseList({ user }: courseListProps) {
  const [freshmanCourses, setFreshmanCourses] = useState<Course[]>([]);
  const [sophomoreCourses, setSophomoreCourses] = useState<Course[]>([]);
  const [juniorCourses, setJuniorCourses] = useState<Course[]>([]);
  const [seniorCourses, setSeniorCourses] = useState<Course[]>([]);
  const [detailName, setDetailName] = useState<string>('');

  useEffect(() => {
    // get all courses by userId
    setFreshmanCourses(getCourses(user.freshmanCourses));
    setSophomoreCourses(getCourses(user.sophomoreCourses));
    setJuniorCourses(getCourses(user.juniorCourses));
    setSeniorCourses(getCourses(user.seniorCourses));
    console.log('called');
  }, [
    user.freshmanCourses,
    user.juniorCourses,
    user.seniorCourses,
    user.sophomoreCourses,
  ]);

  return (
    <div style={courseListBody}>
      <div style={courseListTitleStyle}>My Courses</div>
      <Year
        yearName={'Freshman'}
        courses={freshmanCourses}
        detailName={detailName}
        setDetailName={setDetailName}
      />
      <Year
        yearName={'Sophomore'}
        courses={sophomoreCourses}
        detailName={detailName}
        setDetailName={setDetailName}
      />
      <Year
        yearName={'Junior'}
        courses={juniorCourses}
        detailName={detailName}
        setDetailName={setDetailName}
      />
      <Year
        yearName={'Senior'}
        courses={seniorCourses}
        detailName={detailName}
        setDetailName={setDetailName}
      />
    </div>
  );
}

const courseListTitleStyle = {
  margin: '1rem',
  fontSize: '1.25rem',
  paddingLeft: '1rem',
};

const courseListBody = {
  backgroundColor: '#ECECEC',
  float: 'right',
  fontWeight: 'bold',
  margin: '0rem',
  zIndex: 0,
  overflowY: 'scroll',
  marginLeft: '2rem',
  minWidth: '20rem',
} as React.CSSProperties;

export default CourseList;
