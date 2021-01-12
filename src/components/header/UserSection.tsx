import React from 'react';

function UserSection() {
  return (
    <div style={userSection}>
      <div style={pfp}></div>
      <div style={name} className="center">
        Matthew Liu
      </div>
    </div>
  );
}

const name = {
  width: '2rem',
  float: 'left',
  fontWeight: 500,
  display: 'inline',
  marginLeft: '0.5rem',
  marginTop:'0.25rem'
} as React.CSSProperties;

const pfp = {
  position: 'relative',
  backgroundColor: 'orange',
  height: '3.5rem',
  width: '3.5rem',
  borderRadius: '50%',
  float: 'left',
  display: 'inline',
} as React.CSSProperties;

const userSection = {
  backgroundColor: 'whitesmoke',
  marginTop: '0.7rem',
  width: '10rem',
  padding: '0rem',
  height: '3.5rem',
  float: 'right',
  display: 'inline',
  marginRight: '6rem',
  borderRadius: '2rem',
} as React.CSSProperties;

export default UserSection;
