import React, { FC } from "react";
import Logo from '../../resources/images/logoDarker.png';

const Header: FC = () => {
  return (
    <div className='flex items-center justify-between p-4 h-14'>
      <div className="flex items-center">
        <img className='mr-2 w-7 h-7' src={Logo} alt='' />
        <div className='text-lg font-light'>uCredit</div>
      </div>
      <button className='px-2 py-0.5 hover:text-white hover:bg-black border border-gray-600 rounded-lg transition duration-100 ease-in'>
        Log in
      </button>
    </div>
  );
};

export default Header;
