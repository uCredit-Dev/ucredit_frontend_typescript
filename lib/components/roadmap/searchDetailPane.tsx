import SearchBar from "./searchBar";
import {useState} from "react";
import React from "react";

const SearchDetailPane: React.FC = () => {
    const [selectedMajor, setselectedMajor] = useState("");
    const majorArray = [
        "B.S. in Computer Science",
        "B.A. in Computer Science",
        "B.S. in Electrical Engineering",
        "B.A. in Mathematics",
        "B.S. in Public Health",
        "B.A. in Something Else",
        "B.S. in Something Else",
    ];

    const changeSelectedMajor = (evt) => {
        setselectedMajor(evt.target.innerText);
    };

    const onInputChange = (evt) => {
        setselectedMajor(evt.target.value);
    };

    return (
    <div className="mx-8 my-5 px-6 py-4 bg-sky-100 rounded-xl">
      <SearchBar iconSize={24} onInputProp={() => {}}
      placeHolder="Search tags" heightClass="h-10" iconPosition="left-16"/>
      <div className="w-full my-2 outline outline-gray-600 outline-2
      rounded-2xl overflow-hidden bg-white">
        <input className="w-full h-10 px-3 rounded-t-2xl outline
        outline-gray-600 outline-2 mb-[2px]"
        type='text' placeholder="search or select major" value={selectedMajor}
               onChange={onInputChange}/>
        <ul className="flex flex-col h-40 overflow-y-scroll rounded-b-2xl
        child:py-2 child:bg-white child:w-full child:text-left child:px-3
        child:outline child:outline-gray-400 child:outline-1 
        hover:child:underline hover:child:bg-gray-200">
          {majorArray.map((item) => {
              if (item.includes(selectedMajor)) {
                  return (<button onClick={changeSelectedMajor}>{item}</button>);
              }
          })}
        </ul>
      </div>
      <p className="relative left-2 mt-4">
        <input type="checkbox" className="mr-2"/>
        My favorites only
      </p>
    </div>
  );
}

export default SearchDetailPane;