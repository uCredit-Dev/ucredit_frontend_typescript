import React, { useState, useEffect } from 'react';
import CourseBar from './course-list/CourseBar';
import CourseList from './course-list/CourseList';
import { Distribution } from '../commonTypes';
import { testMajorDistributions, testUser } from '../testObjs';

function Content() {
  const [userName, setUserName] = useState<string>('');
  const [majorCredits, setMajorCredits] = useState<number>(0);
  const [distributions, setDistributions] = useState<Distribution[]>([]);

  useEffect(() => {
    setUserName(testUser.firstName + ' ' + testUser.lastName);
    setMajorCredits(127);
    getDistributions();
  }, []);

  const getDistributions = () => {
    setDistributions(testMajorDistributions);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'row',
        height: '100%',
        width: '100%,',
        position: 'relative',
      }}
    >
      <div
        style={{
          marginRight: '2rem',
        }}
      >
        <div style={userTitle}>{userName}'s 4 Year Plan</div>
        <div style={{}}>
          {distributions.map((dis) => (
            <CourseBar
              majorCredits={majorCredits}
              maxCredits={dis.required}
              plannedCredits={dis.planned}
              currentCredits={dis.current}
              section={dis.name}
            />
          ))}
        </div>
      </div>
      <CourseList user={testUser} />
    </div>
  );
}

const userTitle = {
  fontWeight: 'bold',
  fontSize: 'xx-large',
  color: 'navy',
  marginLeft: '4.5%',
  paddingTop: '2rem',
  marginBottom: '3rem',
  zIndex: 0,
} as React.CSSProperties;

export default Content;
