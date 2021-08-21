import React, { FC } from "react";

const Header: FC = () => {
  return (
    <div className='flex items-center justify-between p-4 h-14'>
      <div>uCredit</div>
      <button className='px-2 py-0.5 hover:text-white hover:bg-black border border-gray-600 rounded-lg transition duration-100 ease-in'>
        Log in
      </button>
    </div>
  );
};

export default Header;
