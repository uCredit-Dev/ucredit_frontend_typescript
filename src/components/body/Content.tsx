import React, { useState, useEffect } from 'react';
import CourseBar from './CourseBar';
import CourseList from './CourseList';

function Content() {
  const [userName, setUserName] = useState('');
  const [majorCredits, setMajorCredits] = useState(0);

  useEffect(() => {
    setUserName('Matthew Liu');
    setMajorCredits(127);
  }, []);

  return (
    <div>
      <div style={userTitle}>{userName}'s 4 Year Plan</div>
      <div style={{ width: window.innerWidth * 0.7 }}>
        <CourseBar
          majorCredits={majorCredits}
          maxCredits={127}
          currentCredits={64}
          section={'Total Credits'}
          mainColor={'red'}
          subColor={'pink'}
        />
        <CourseBar
          majorCredits={majorCredits}
          maxCredits={28}
          currentCredits={18}
          section={'General Electives'}
          mainColor={'blue'}
          subColor={'lightblue'}
        />
        <CourseBar
          majorCredits={majorCredits}
          maxCredits={24}
          currentCredits={18}
          section={'Computer Science'}
          mainColor={'magenta'}
          subColor={'pink'}
        />
        <CourseBar
          majorCredits={majorCredits}
          maxCredits={24}
          currentCredits={12}
          section={'Mathematics'}
          mainColor={'lightblue'}
          subColor={'azure'}
        />
        <CourseBar
          majorCredits={majorCredits}
          maxCredits={18}
          currentCredits={12}
          section={'Natural Sciences'}
          mainColor={'green'}
          subColor={'lightgreen'}
        />
        <CourseBar
          majorCredits={majorCredits}
          maxCredits={16}
          currentCredits={12}
          section={'Humanities'}
          mainColor={'orange'}
          subColor={'yellow'}
        />
      </div>
      <CourseList />
    </div>
  );
}

const userTitle = {
  fontWeight: 'bold',
  fontSize: 'xx-large',
  color: 'navy',
  marginLeft: '4.5%',
  marginTop: '2rem',
  marginBottom: '3rem',
} as React.CSSProperties;

export default Content;
