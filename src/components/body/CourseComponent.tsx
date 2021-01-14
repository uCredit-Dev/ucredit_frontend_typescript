import React from 'react';

function CourseComponent() {
  return (
    <div style={courseStyle}>
      <div style={{ marginRight: '1.5rem' }}>EN.600.228</div>
      <div style={{ marginRight: '1.5rem', width: '7.5rem' }}>
        Fullstack Javascript
      </div>
      <div style={{ marginRight: '2rem' }}>[-]</div>
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
