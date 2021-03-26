import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Course } from '../../commonTypes';
import {
  selectInspectedCourse,
  updateInspectedCourse,
} from '../../slices/searchSlice';

const CourseDisplay = () => {
  // Redux Setup
  const inspected = useSelector(selectInspectedCourse);
  const dispatch = useDispatch();

  // Function to return a list of clickable prereqs
  const getPreReqs = () =>
    inspected !== 'None' && inspected.preReq.length > 0
      ? inspected.preReq.map((prereq: Course) => (
          <button className="bg-gray-400" onClick={updateInspected(prereq)}>
            {prereq.number}
          </button>
        ))
      : 'No Prereqs!';

  // Function currying to produce a function that would update the store when clicking on prereqs
  const updateInspected = (prereq: Course) => () => {
    dispatch(updateInspectedCourse(prereq));
  };
  return (
    <div>
      {inspected === 'None' ? (
        <div>No inspected Courses</div>
      ) : (
        <div className="p-5">
          <p>{inspected.title}</p>
          <p>{inspected.number}</p>
          <p>{inspected.credits} Credits</p>
          <p>{inspected.bio}</p>
          <p>
            <p className="border-b-2">Prerequisites</p> <p>{getPreReqs()}</p>
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseDisplay;
