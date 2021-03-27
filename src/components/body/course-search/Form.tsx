import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateSearchMode,
  updateSearchCredit,
  updateSearchDistribution,
  updateSearchTerm,
  updateRetrievedCourses,
  selectSearchterm,
  selectSearchMode,
  selectSearchFilters,
} from '../../slices/searchSlice';
import { debounce } from 'ts-debounce';
import axios from 'axios';

const api = 'https://ucredit-api.herokuapp.com/api';

const creditFilters = ['None', 0, 1, 2, 3, 4];
const distributionFilters = ['None', 'N', 'S', 'H', 'Q', 'E'];
//const tagFilters = ['tag1', 'tag2'];

const Form = () => {
  // Set up redux dispatch and variables.
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchterm);
  const searchMode = useSelector(selectSearchMode);
  const searchFilters = useSelector(selectSearchFilters);

  // Search with debouncing of 3/4s of a second.
  useEffect(() => {
    if (
      searchTerm === '' &&
      searchFilters.credits === 'None' &&
      searchFilters.distribution === 'None'
    ) {
      // If search term is empty with no filters, don't show any results.
      dispatch(updateRetrievedCourses([]));
    } else {
      // Otherwise, user is searching for something.
      const search = setTimeout(performSearch, 500);
      return () => clearTimeout(search);
    }
  }, [searchTerm, searchFilters]);

  // Performs search call with filters to backend and updates redux with retrieved courses.
  const performSearch = () => {
    console.log('searching for ', searchTerm);
    axios
      .get(api + '/search', {
        params: {
          query: searchTerm,
          credits:
            searchFilters.credits === 'None' ? null : searchFilters.credits,
          areas:
            searchFilters.distribution === 'None'
              ? ''
              : searchFilters.distribution,
        },
      })
      .then((courses) => {
        let returned = courses.data;
        dispatch(updateRetrievedCourses(returned.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Update search term
  const handleSearchTerm = (event: any): void => {
    dispatch(updateSearchTerm(event.target.value));
  };

  // Update searching for title vs. number
  const handleSearchModeChange = (event: any): void => {
    dispatch(updateSearchMode(event.target.value));
  };

  // Update searching for certain amounts of credits
  const handleCreditFilterChange = (event: any): void => {
    dispatch(updateSearchCredit(event.target.value));
  };

  // Update searching for a certain distribution.
  const handleDistributionFilterChange = (event: any): void => {
    dispatch(updateSearchDistribution(event.target.value));
  };

  return (
    <div className={'p-5'}>
      <p>
        <input
          className="border-b-2"
          type="text"
          placeholder={'Course title or number (ie. Physics, 601.280, etc.)'}
          style={{ width: '100%' }}
          defaultValue={searchTerm}
          onChange={handleSearchTerm}
        ></input>
        <select onChange={handleSearchModeChange} defaultValue={searchMode}>
          <option value="title">Title</option>
          <option value="number">Number</option>
        </select>
      </p>
      <label>
        <p>
          Credits:
          <select
            onChange={handleCreditFilterChange}
            defaultValue={searchFilters.credits}
          >
            {creditFilters.map((credits) => (
              <option key={credits} value={credits}>
                {credits}
              </option>
            ))}
          </select>
        </p>
        <p>
          Area:
          <select
            onChange={handleDistributionFilterChange}
            defaultValue={searchFilters.distribution}
          >
            {distributionFilters.map((distribution) => (
              <option key={distribution} value={distribution}>
                {distribution}
              </option>
            ))}
          </select>
        </p>
      </label>
    </div>
  );
};

export default Form;
