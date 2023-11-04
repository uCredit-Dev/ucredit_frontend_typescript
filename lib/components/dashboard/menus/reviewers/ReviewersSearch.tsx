import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAPI } from '../../../../resources/assets';
import ReviewerSearchResults from './ReviewerSearchResults';
import { selectToken } from '../../../../slices/userSlice';
// import { userService } from '../../../../services';
// import { selectPlan } from '../../../../slices/currentPlanSlice';

const ReviewersSearch = () => {
  const token = useSelector(selectToken);
  const [searchState, setSearchState] = useState('');
  const [searchData, setSearchData] = useState([]);
  // const currentPlan = useSelector(selectPlan);

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
    } else setSearchData([]);
  }, [
    searchState,
    token,
    // userService.getPlanReviewers(currentPlan._id, token),
  ]);

  return (
    <div className="flex flex-col pr-1 mx-1 rounded-lg">
      <div className="ml-4 py-1">
        <p className="text-gray-500">Add reviewer</p>
      </div>
      <div className="flex flex-row py-1">
        <input
          type="text"
          placeholder="jsmith1 or John Smith"
          className="flex px-4 py-2 ml-4 mx-2 w-full text-sm rounded-sm outline outline-1 outline-gray-200 shadow-inner"
          value={searchState}
          onChange={handleChange}
        ></input>
      </div>
      <ReviewerSearchResults users={searchData} />
      <div className="ml-4 mt-3">
        <p className="text-gray-500">Reviewers</p>
      </div>
    </div>
  );
};

export default ReviewersSearch;
