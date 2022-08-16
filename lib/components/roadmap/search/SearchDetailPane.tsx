import { useState } from 'react';
import React from 'react';

const SearchDetailPane: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<Array<string>>([]);
  const tagArray: Array<string> = [
    'double major',
    'humanities',
    'pre-med',
    'pre-law',
  ];

  const addTag = (evt) => {
    let newArray: Array<string> = selectedTags.slice();
    newArray.push(evt.target.value);
    setSelectedTags(newArray);
  };

  const removeTag = (evt) => {
    let newArray: Array<string> = selectedTags.slice();
    const index = newArray.indexOf(evt.target.value);
    newArray.slice(index, 1);
    setSelectedTags(newArray);
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
  };

  const onMajorChange = (evt) => {
    setselectedMajor(evt.target.value);
  };

  return (
    <div className="mx-8 my-5 px-6 py-4 bg-sky-100 rounded-xl">
      {/*<SearchBar
        iconSize={24}
        onInputProp={() => {}}
        placeHolder="Search tags"
        heightClass="h-10"
        iconPosition="left-16"
  />*/}
      {/* Search Tags */}
      <h3>Select Tags Below</h3>
      <ul className="flex flex-col items-start">
        {tagArray.map((item) => {
          return (
            <div>
              <input key={item} id={item} type="checkbox" value={item}></input>
              <label htmlFor={item}>{item}</label>
            </div>
          );
        })}
      </ul>
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
