import React, { useState, useEffect } from 'react';
import CourseBar from './course-list/CourseBar';
import CourseList from './course-list/CourseList';
import { Distribution, SemesterType } from '../commonTypes';
import { testMajorDistributions, testUser } from '../testObjs';
import Search from './course-search/Search';
import {
  selectSearchStatus,
  updateSearchStatus,
  updateSearchTime,
} from '../slices/searchSlice';
import { useSelector, useDispatch } from 'react-redux';

function Content() {
  const [userName, setUserName] = useState<string>('');
  const [majorCredits, setMajorCredits] = useState<number>(0);
  const [distributions, setDistributions] = useState<Distribution[]>([]);
  const searching = useSelector(selectSearchStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserName(testUser.firstName + ' ' + testUser.lastName);
    setMajorCredits(127);
    getDistributions();
  }, []);

  const getDistributions = () => {
    setDistributions(testMajorDistributions);
  };

  const openSearch = (year: number, term: SemesterType) => {
    dispatch(updateSearchStatus(true));
    dispatch(updateSearchTime({ searchSemester: term, searchYear: year }));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'row',
        width: '100%,',
        height: '80%',
      }}
    >
      <div
        style={{
          marginRight: '2rem',
        }}
      >
        <button onClick={() => openSearch(2020, 'Fall')}>
          Test for Fall, 2020
        </button>
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
