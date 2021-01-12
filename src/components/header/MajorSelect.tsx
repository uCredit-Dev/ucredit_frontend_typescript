import React, { useState, useEffect } from 'react';

function MajorSelect() {
  const [selectedMajor, setSelectedMajor] = useState('Add a major! +');
  const [options, setOptions] = useState(false);
  const [majors, setMajors] = useState(['']);

  useEffect(() => {
    console.log(majors);
    setSelectedMajor('Computer Science - Bachelors of Science');
    setMajors([
      'Computer Science - Bachelors of Science',
      'Cognitive Science - Bachelors of Arts',
    ]);
  }, [majors]);

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
          {majors.map((major) => {
            if (major !== selectedMajor) {
              return <div
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
                </div>
            }
          })}
        </>
      ) : null}
    </div>
  );
}

const majorArea = {
  width: '12rem',
  float: 'right',
  display: 'inline',
  marginTop: '0.6rem',
  marginRight: '4rem',
  backgroundColor: 'whitesmoke',
  textWrap: 'true',
  fontWeight: 400,
  borderRadius: '1.5rem',
  border: 'solid',
  borderWidth: '0.2rem',
  borderColor: 'grey',
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
