import React, { useState } from 'react';
import { Course } from '../commonTypes';

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
        <div style={courseDropStyle}>
          <div style={courseStyle}>
            <div style={{ marginRight: '1rem' }}>EN.600.228</div>
            <div style={{ marginRight: '1rem' }}>Fullstack Javascript</div>
            <div style={{ marginRight: '1rem' }}>[-]</div>
          </div>
        </div>
      ) : null}
    </>
  );
}

const courseDropStyle = {} as React.CSSProperties;

const courseStyle = {
  paddingLeft: '4rem',
  display: 'flex',
  flexFlow: 'row',
} as React.CSSProperties;

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
