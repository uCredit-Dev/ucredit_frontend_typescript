import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAPI } from '../../../../resources/assets';
import ReviewerSearchResults from './ReviewerSearchResults';
import { selectToken } from '../../../../slices/userSlice';

const ReviewersSearch = () => {
  const token = useSelector(selectToken);
  const [searchState, setSearchState] = useState('');
  const [searchData, setSearchData] = useState([]);

  const handleChange = (e) => {
    setSearchState(e.target.value);
  };

  useEffect(() => {
    const Search = (text: String) => {
      axios
        .get(getAPI(window) + '/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          params: {
            username: text,
          },
        })
        .then((users) => {
          // TODO: This should return plan objects as well
          setSearchData(users.data.data);
        });
    };
    if (searchState.length > 0) {
      const search = setTimeout(() => Search(searchState), 500);
      return () => clearTimeout(search);
    }
  }, [searchState, token]);

  return (
    <div className="flex flex-col pr-1 bg-slate-100 mx-1 rounded-lg">
      <div className="ml-2 py-2">
        <p className="text-gray-500">Add or remove reviewers</p>
      </div>
      <input
        type="text"
        placeholder="jsmith1 or John Smith"
        className="px-3 py-1 mx-2 mb-3 bg-gray-200 rounded-md"
        value={searchState}
        onChange={handleChange}
      ></input>
      <ReviewerSearchResults users={searchData} />
    </div>
  );
};

export default ReviewersSearch;
