import React from 'react';
import MajorSelect from './MajorSelect';
import UserSection from './UserSection';

function Header() {
  return (
    <>
      <div style={bannerStyle}>
        <div style={titleStyle}>UCredit</div>
        <UserSection />
        <MajorSelect />
      </div>
    </>
  );
}

const titleStyle = {
  paddingTop: '0.25rem',
  color: 'whitesmoke',
  fontStyle: 'italic',
  fontWeight: 'bold',
  fontSize: 'xxx-large',
  float: 'left',
  display: 'inline',
  marginLeft: '4.5%',
  paddingBottom: '0.5rem',
} as React.CSSProperties;

const bannerStyle = {
<<<<<<< Updated upstream
  width:'100%',
  backgroundColor: '#3399ff',
  textAlign: 'left',
 // position:'absolute'
=======
  width: '100%',
  backgroundColor: '#3399ff',
  textAlign: 'left',
  // position:'absolute'
>>>>>>> Stashed changes
} as React.CSSProperties;

export default Header;
