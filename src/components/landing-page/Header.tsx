import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import Logo from "../../resources/images/logoDarker.png";

/**
 * Header of landing page.
 */
const Header: FC = () => {
  const history = useHistory();
  return (
    <div className="flex items-center justify-between p-4 h-1/6">
      <div className="flex items-center">
        <img className="mr-2 w-7 h-7" src={Logo} alt="" />
        <div
          className="text-2xl italic font-light cursor-pointer"
          onClick={() => history.push("/login")}
        >
          uCredit
        </div>
      </div>
      <button
        className="px-2 py-0.5 hover:text-white hover:bg-black border border-gray-600 rounded-lg transition duration-100 ease-in"
        onClick={() => history.push("/login")}
      >
        Log in
      </button>
    </div>
  );
};

export default Header;
