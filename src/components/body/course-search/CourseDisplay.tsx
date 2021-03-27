import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Course } from '../../commonTypes';
import {
  selectInspectedCourse,
  updateInspectedCourse,
  clearSearch,
} from '../../slices/searchSlice';

// Displays course information once a user selects a course in the search list
const CourseDisplay = () => {
  // Redux Setup
  const inspected = useSelector(selectInspectedCourse);
  const dispatch = useDispatch();

  // Function to return a list of clickable prereqs
  const getPreReqs = () =>
    inspected !== 'None' && inspected.preReq.length > 0
      ? inspected.preReq.map((prereq: Course) => (
          <button
            key={prereq.number}
            className="bg-gray-400"
            onClick={updateInspected(prereq)}
          >
            {prereq.number}
          </button>
        ))
      : 'No Prereqs!';

  // Function currying to produce a function that would update the store when clicking on prereqs
  const updateInspected = (prereq: Course) => () => {
    dispatch(updateInspectedCourse(prereq));
  };

  // Adds course
  const addCourse = () => {
    dispatch(clearSearch());
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
          <p>
            {inspected.terms.map((term) => (
              <div>{term}</div>
            ))}
          </p>
          <p>{inspected.bio}</p>
          <p>
            <p className="border-b-2">Prerequisites</p> <p>{getPreReqs()}</p>
          </p>
          <button className="bg-gray-300" onClick={addCourse}>
            Add Course
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseDisplay;
