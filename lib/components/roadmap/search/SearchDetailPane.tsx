import { useState } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateSearchTagsText,
  updateSearchMajorText,
  updateSearchTags,
  updateSearchTagsSearchType,
  selectSearchTags,
} from '../../../slices/roadmapSearchSlice';

const SearchDetailPane: React.FC = () => {
  const dispatch = useDispatch();
  const selectedTags = useSelector(selectSearchTags);

  //const [selectedTags, setSelectedTags] = useState<Array<string>>([]);
  const tagArray: Array<string> = [
    'Double major',
    'Humanities',
    'Pre-med',
    'Pre-law',
    'test 1',
    'test 2',
    'test 3',
    'test 4',
    'test 5',
  ];

  const addTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      return;
    }
    let newArray: Array<string> = selectedTags.slice();
    newArray.push(tag);
    dispatch(updateSearchTags(newArray));
  };

  const removeTag = (tag: string) => {
    let newArray: Array<string> = selectedTags.slice();
    const index = newArray.indexOf(tag);
    newArray.splice(index, 1);
    dispatch(updateSearchTags(newArray));
  };

  const onTagChange = (evt) => {
    if (evt.target.checked) {
      addTag(evt.target.value);
    } else {
      removeTag(evt.target.value);
    }
  };

  const onTagSearchTypeChange = (evt) => {
    dispatch(updateSearchTagsSearchType(evt.target.value));
  };

  const [selectedMajor, setselectedMajor] = useState<string>('');
  const majorArray: string[] = [
    'B.S. in Computer Science',
    'B.A. in Computer Science',
    'B.S. in Electrical Engineering',
    'B.A. in Mathematics',
    'B.S. in Public Health',
    'B.A. in Something Else',
    'B.S. in Something Else',
  ];

  const changeSelectedMajor = (evt) => {
    setselectedMajor(evt.target.innerText);
    dispatch(updateSearchMajorText(evt.target.innerText));
  };

  const onMajorChange = (evt) => {
    setselectedMajor(evt.target.value);
    dispatch(updateSearchMajorText(evt.target.value));
  };

  const onSearchTagsInput = (evt: any) => {
    console.log('tags updated!');
    dispatch(updateSearchTagsText(evt.target.value));
  };

  return (
    <div className="mx-8 my-5 px-6 py-4 bg-sky-100 rounded-xl">
      {/*<SearchBar
        iconSize={24}
        onInputProp={onSearchTagsInput}
        placeHolder="Search tags"
        heightClass="h-10"
        iconPosition="left-16"
  />*/}
      {/* Search Tags */}
      <h3>Search for plans with:</h3>
      <div className="flex flex-row flex-wrap">
        <div className="flex flex-row ml-4">
          <input
            type="radio"
            id="tagsSearchOr"
            name="tagsSearchType"
            value="or"
            className="mr-1"
            defaultChecked={true}
            onChange={onTagSearchTypeChange}
          ></input>
          <label htmlFor="tagsSearchOr">Any of selected tags</label>
        </div>
        <div className="flex flew-row ml-4">
          <input
            type="radio"
            id="tagsSearchAll"
            name="tagsSearchType"
            value="all"
            className="mr-1"
            onChange={onTagSearchTypeChange}
          ></input>
          <label htmlFor="tagsSearchAll">All selected tags</label>
        </div>
      </div>
      <div
        className="overflow-hidden outline outline-gray-600 outline-2
      rounded-2xl mt-1 mb-6 bg-white"
      >
        <ul
          className="flex flex-row flex-wrap items-start max-h-34 
        overflow-y-scroll pl-3 pr-1 py-0.5"
        >
          {tagArray.map((item) => {
            return (
              <div className="my-1 w-32">
                <input
                  key={item}
                  id={item}
                  type="checkbox"
                  value={item}
                  onChange={onTagChange}
                ></input>
                <label htmlFor={item} className="ml-1">
                  {item}
                </label>
              </div>
            );
          })}
        </ul>
      </div>
      {/* Search Major */}
      <div
        className="w-full my-2 outline outline-gray-600 outline-2
      rounded-2xl overflow-hidden bg-white"
      >
        <input
          className="w-full h-10 px-3 rounded-t-2xl outline
        outline-gray-600 outline-2 mb-[2px]"
          type="text"
          placeholder="search or select major"
          value={selectedMajor}
          onChange={onMajorChange}
        />
        <ul
          className="flex flex-col h-40 overflow-y-scroll rounded-b-2xl
        child:py-2 child:bg-white child:w-full child:text-left child:px-3
        child:outline child:outline-gray-400 child:outline-1 
        hover:child:underline hover:child:bg-gray-200"
        >
          {majorArray.map((item) => {
            if (item.includes(selectedMajor)) {
              return (
                <button key={item} onClick={changeSelectedMajor}>
                  {item}
                </button>
              );
            } else {
              return <></>;
            }
          })}
        </ul>
      </div>
      <p className="relative left-2 mt-4">
        <input type="checkbox" className="mr-2" />
        My favorites only
      </p>
    </div>
  );
};

export default SearchDetailPane;
