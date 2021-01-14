import React, { useState, useEffect } from 'react';

function MajorSelect() {
  const [selectedMajor, setSelectedMajor] = useState<string>('Add a major! +');
  const [options, setOptions] = useState<boolean>(false);
  const [majors, setMajors] = useState<string[]>(['']);

  useEffect(() => {
    setSelectedMajor('Computer Science - Bachelors of Science');
    setMajors([
      'Computer Science - Bachelors of Science',
      'Cognitive Science - Bachelors of Arts',
    ]);
  }, []);

  const handleMajorMapping = (major:string) => major !== selectedMajor ?
  <div
      style={{
        ...currentMajor,
        borderTop: 'solid',
        borderTopColor: 'grey',
      }}
      onClick={() => {
        setSelectedMajor(major);
      }}
    >
      {major}
      <div style={triangle}>+</div>
    </div>:null;

  return (
    <div
      style={majorArea}
      onMouseEnter={() => {
        setOptions(true);
      }}
      onMouseLeave={() => {
        setOptions(false);
      }}
    >
      <div style={currentMajor}>
        <div>{selectedMajor}</div>
        <div style={triangle}>▼</div>
      </div>
      {options ? (
        <>
          {majors.map(handleMajorMapping)
          }
        </>
      ) : null}
    </div>
  );
}

const majorArea = {
  width: '12rem',
  position:'absolute',
  right:"15rem",
  // float: 'right',
  // display: 'inline',
  marginTop: '0.6rem',
  marginRight: '4rem',
  backgroundColor: 'whitesmoke',
  textWrap: 'true',
  fontWeight: 400,
  borderRadius: '1.5rem',
  border: 'solid',
  borderWidth: '0.2rem',
  borderColor: 'grey',
  zIndex:10
} as React.CSSProperties;

const triangle = {
  color: 'grey',
  position: 'relative',
  bottom: '2rem',
  left: '9.75rem',
  width: '1rem',
} as React.CSSProperties;

const currentMajor = {
  padding: '0.5rem',
  paddingTop: '0.25rem',
  height: '2.5rem',
  borderRadius: '1.5rem',
  borderTopLeftRadius: '0rem',
  borderTopRightRadius: '0rem',
} as React.CSSProperties;

export default MajorSelect;
