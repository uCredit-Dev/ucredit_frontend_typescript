import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../resources/images/logoDarker.png";

/**
 * Header of landing page.
 */
const Header: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between p-4 h-1/6">
      <div className="flex items-center">
        <img className="mr-2 w-7 h-7" src={Logo} alt="" />
        <div
          className="text-2xl italic font-light cursor-pointer"
          onClick={() => navigate("/login")}
        >
          uCredit
        </div>
      </div>
      <button
        className="px-2 py-0.5 hover:text-white hover:bg-black border border-gray-600 rounded-lg shadow transition duration-100 ease-in"
        onClick={() => navigate("/login")}
      >
        Log in
      </button>
    </div>
  );
};

export default Header;
