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
      <Year yearName={'Freshman'} courses={freshmanCourses} />
      <Year yearName={'Sophomore'} courses={sophomoreCourses} />
      <Year yearName={'Junior'} courses={juniorCourses} />
      <Year yearName={'Senior'} courses={seniorCourses} />
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
} as React.CSSProperties;

export default CourseList;
