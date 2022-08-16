import SearchBarArea from './SearchBarArea';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

/**
 * Header components.
 */
const Links: React.FC = () => {
  return (
    <div className="sm:space-x-5">
      <button className="w-full hover:bg-slate-300 text-lg rounded-lg sm:w-auto px-3 py-1 sm:hover:text-blue-header sm:hover:bg-blue-footer sm:rounded-[13px] transition duration-100 ease-in">
        my dashboard
      </button>

      <button className="w-full hover:bg-slate-300 text-lg rounded-lg sm:w-auto px-3 py-1 sm:hover:text-blue-header sm:hover:bg-blue-footer sm:rounded-[13px] transition duration-100 ease-in">
        post
      </button>
    </div>
  );
};

/**
 * Header of searching page ofoad map.
 */
const SearchHeader: React.FC = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <>
      <div className="sticky top-0 z-40 flex justify-between items-center py-1 px-4 h-1/6 bg-blue-header">
        <div className="flex-grow">
          <div className="inline-flex">
            <img
              className="w-12 h-12 mr-1 scale-x-[-1]"
              src="/img/logo.png"
              alt="logo"
            />

            <div
              className="text-3xl cursor-pointer text-blue-footer self-center"
              onClick={() => router.push('/')}
            >
              uCredit
            </div>
          </div>
        </div>
        <div>
          <div className="relative sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setShowMenu(!showMenu)}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {showMenu && (
              <div className="absolute w-20 top-12 space-y-1 right-0 z-100 bg-white shadow-xl rounded-lg">
                <Links />
              </div>
            )}
          </div>

          <div className="hidden sm:block">
            <Links />
          </div>
        </div>
      </div>
      <SearchBarArea />
    </>
  );
};

export default SearchHeader;
