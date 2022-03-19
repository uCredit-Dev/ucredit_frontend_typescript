import axios from 'axios';
import { useEffect, useState } from 'react';
import { api } from '../../../../resources/assets';
import ReviewersSearchResults from './ReviewerSearchResults';

const ReviewersSearch = () => {
  const [searchState, updateSearchState] = useState('');
  const [searchData, updateSearchData] = useState([]);

  const handleChange = (e) => {
    updateSearchState(e.target.value);
  };

  useEffect(() => {
    if (searchState.length > 0) {
      const search = setTimeout(() => Search(searchState), 500);
      return () => clearTimeout(search);
    }
  }, [searchState]);

  const Search = (text: String) => {
    axios
      .get(api + '/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          username: text,
        },
      })
      .then((users) => {
        updateSearchData(users.data.data);
      });
  };

  return (
    <div className="flex flex-col pr-1 bg-gray-100 rounded-lg">
      <div className="py-2 ml-2">
        <p className="text-gray-500">Add or remove advisors</p>
      </div>
      <input
        type="text"
        placeholder="jsmith1 or John Smith"
        className="px-3 py-1 mx-2 mb-3 bg-gray-200 rounded-md"
        value={searchState}
        onChange={handleChange}
      ></input>
      <ReviewersSearchResults users={searchData} />
    </div>
  );
};

export default ReviewersSearch;
