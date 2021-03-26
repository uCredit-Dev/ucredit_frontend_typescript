import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateSearchMode,
  updateSearchCredit,
  updateSearchDistribution,
  updateSearchTerm,
  selectSearchterm,
  selectSearchMode,
  selectSearchFilters,
} from '../../slices/searchSlice';
import { debounce } from 'ts-debounce';

const api = 'https://ucredit-api.herokuapp.com/api';

const creditFilters = ['None', 1, 2, 3, 4];
const distributionFilters = ['None', 'N', 'S', 'H', 'W', 'Q', 'E'];
//const tagFilters = ['tag1', 'tag2'];

const Form = () => {
  // Set up redux dispatch and variables
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchterm);
  const searchMode = useSelector(selectSearchMode);
  const searchFilters = useSelector(selectSearchFilters);

  const search = debounce(() => {
    console.log('searching for ', searchTerm);
    fetch(
      api +
        '/api/search' /*, {
      body: JSON.stringify({
        query: searchTerm,
        credits:
          searchFilters.credits === 'None' ? undefined : searchFilters.credits,
        areas:
          searchFilters.distribution === 'None'
            ? ''
            : searchFilters.distribution,
      }),
    }*/
    ).then((courses) => console.log('retrieved', courses));
  }, 1000);

  // Update term
  const handleSearchTerm = (event: any): void => {
    dispatch(updateSearchTerm(event.target.value));
    search();
  };
  const handleSearchModeChange = (event: any): void => {
    dispatch(updateSearchMode(event.target.value));
  };
  const handleCreditFilterChange = (event: any): void => {
    dispatch(updateSearchCredit(event.target.value));
  };
  const handleDistributionFilterChange = (event: any): void => {
    dispatch(updateSearchDistribution(event.target.value));
  };

  return (
    <form className={'p-5'}>
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
              <option value={credits}>{credits}</option>
            ))}
          </select>
        </p>
        <p>
          Distribution:
          <select
            onChange={handleDistributionFilterChange}
            defaultValue={searchFilters.distribution}
          >
            {distributionFilters.map((distribution) => (
              <option value={distribution}>{distribution}</option>
            ))}
          </select>
        </p>
      </label>
    </form>
  );
};

export default Form;
