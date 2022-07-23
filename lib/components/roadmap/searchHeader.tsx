import SearchBarArea from './searchBarArea';
import { selectMobileAdvSearch } from '../../slices/roadmapSearchSlice';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaBars } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import React from 'react';

const SearchHeader: React.FC = () => {
  const [mobileNavShowing, setMobileNavShowing] = useState(false);

  const getMobileNavClass = () => {
    if (mobileNavShowing) {
      return '';
    } else {
      return 'hidden';
    }
  };

  const oppositeMobileNavClass = () => {
    if (mobileNavShowing) {
      return 'hidden';
    } else {
      return '';
    }
  };

  const mobileAdvSearch = useSelector(selectMobileAdvSearch);

  const getOuterTopClass = () => {
    if (mobileAdvSearch) {
      return 'top-0';
    } else {
      return '-top-32';
    }
  };

  return (
    <div className={`sticky ${getOuterTopClass()} md:-top-36`}>
      <div
        className="h-16 bg-sky-200 sticky top-0 flex flex-row
      justify-center items-center text-lg text-blue-900"
      >
        <a href="/">
          <div className="flex flex-row">
            <img className="w-9 h-9 ml-5" src="/img/logo.png" alt="logo" />
            <p
              className="hidden md:block text-xl flex-grow-0 mx-5 pt-0.5
            pb-1"
            >
              uCredit
            </p>
          </div>
        </a>
        <p className="flex-grow"></p>
        <div className="relative">
          <button
            className={`${oppositeMobileNavClass()}`}
            onClick={() => setMobileNavShowing(true)}
          >
            <FaBars size={28} color="black" className="md:hidden mr-6" />
          </button>
          <button
            className={`${getMobileNavClass()}`}
            onClick={() => setMobileNavShowing(false)}
          >
            <GrClose size={28} color="black" className="md:hidden mr-6" />
          </button>
          <div
            className={`absolute right-6 flex flex-col w-max outline
          outline-2 outline-black rounded-2xl overflow-hidden child:px-4 
          child:py-1 child:outline child:outline-gray-400 child:outline-1
          ${getMobileNavClass()} md:hidden`}
          >
            <a href="/">Dashboard</a>
            <a href="/">Post a Plan</a>
          </div>
        </div>
        <div className="hidden md:block flex-grow-0">
          <a
            href="/"
            className="mx-2 px-3 pb-0.5 underline rounded-3xl 
          hover:bg-blue-900 hover:text-white"
          >
            Dashboard
          </a>
          <a
            href="/"
            className="mx-2 px-3 pb-0.5 rounded-3xl text-white 
          bg-blue-900"
          >
            Search
          </a>
          <a
            href="/"
            className="ml-2 mr-5 px-3 pb-0.5 underline rounded-3xl 
          hover:bg-blue-900 hover:text-white"
          >
            Post
          </a>
        </div>
      </div>
      <SearchBarArea />
    </div>
  );
};

export default SearchHeader;
