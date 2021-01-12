import React from 'react';

function CourseList() {
  return (
    <div style={courseListBody}>
      <div>Your Courses</div>
    </div>
  );
}

const courseListBody = {
  height: '85%',
  backgroundColor: 'whitesmoke',
  position: 'absolute',
  right: '0rem',
  width: '23%',
  top: '5rem',
  fontWeight: 'bold',
} as React.CSSProperties;

export default CourseList;
