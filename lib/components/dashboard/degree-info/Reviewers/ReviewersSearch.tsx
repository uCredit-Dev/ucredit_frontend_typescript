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
      <div className="ml-2 py-2">
        <p className="text-gray-500">Add or remove advisors</p>
      </div>
      <input
        type="text"
        placeholder="jsmith1 or John Smith"
        className="bg-gray-200 pl-8 py-1 ml-2 pr-8 mr-2 mb-3 rounded-md"
        value={searchState}
        onChange={handleChange}
      ></input>
      <ReviewersSearchResults Users={searchData} />
    </div>
  );
};

export default ReviewersSearch;
