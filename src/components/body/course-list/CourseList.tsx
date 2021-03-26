import React, { useState, useEffect } from 'react';
import Year from './Year';
import { useSelector } from 'react-redux';
import { selectCurrentPlan } from '../../slices/planSlice';

function CourseList() {
  // Name of the course that is in the popout. This state is passed to the its children, where it will get updated.
  // This is done because we only want one popout at a time, and thus, it needs to be at the top level.
  const [detailName, setDetailName] = useState<string>('');

  // Setting up redux
  const currentPlan = useSelector(selectCurrentPlan);

  // Updating yearly course plans with currentPlan courses.
  const freshmanCourses = currentPlan.freshman;
  const sophomoreCourses = currentPlan.sophomore;
  const juniorCourses = currentPlan.junior;
  const seniorCourses = currentPlan.senior;

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
