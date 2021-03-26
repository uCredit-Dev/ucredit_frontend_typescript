import React, { useState, useEffect } from 'react';
import CourseBar from './CourseBar';
import CourseList from './course-list/CourseList';
import { Distribution } from '../commonTypes';
import { testMajorDistributions, testUser } from '../testObjs';
import Search from './course-search/Search';
import { selectSearchStatus } from '../slices/searchSlice';
import { useSelector } from 'react-redux';

function Content() {
  const [userName, setUserName] = useState<string>('');
  const [majorCredits, setMajorCredits] = useState<number>(0);
  const [distributions, setDistributions] = useState<Distribution[]>([]);
  const searching = useSelector(selectSearchStatus);

  // On first render, gets user name, total credits, and distributions.
  useEffect(() => {
    setUserName(testUser.firstName + ' ' + testUser.lastName);
    setMajorCredits(127);
    getDistributions();
  }, []);

  // Sets all distributions for distribution bars.
  const getDistributions = () => {
    setDistributions(testMajorDistributions);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'row',
        width: '100%,',
        marginTop: '5.25rem',
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
      <CourseList />
      {searching ? <Search /> : null}
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
