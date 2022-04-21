import { DashboardMode } from '../../resources/commonTypes';
import Notification from './Notification';
import { useState } from 'react';
import HamburgerMenu from './HamburgerMenu';

interface Props {
  mode: DashboardMode;
}

/**
 * User login/logout buttons.
 */
const UserSection: React.FC<Props> = ({ mode }) => {
  const [openHamburger, setOpenHamburger] = useState(false);

  return (
    <div className="fixed z-20 w-screen h-16 p-3 px-6 select-none bg-primary">
      <div className="flex flex-row items-center justify-end w-full h-full">
        {/* <div className="flex flex-row items-center justify-center mr-3 bg-white rounded-full w-11 h-11"> */}
        {/* <UserSvg className="w-6 h-6 stroke-2" /> */}
        {/* </div> */}
        <div className="flex flex-row items-center flex-grow ml-5 text-3xl font-bold text-white">
          <img src="/img/logo-darker.png" alt="logo" className="mr-3 h-9"></img>
          <div>uCredit</div>
        </div>
        <Notification />
        <div
          className="p-2 space-y-2 bg-gray-100 rounded shadow h-9 w-9 mx-2 cursor-pointer"
          onClick={() => setOpenHamburger(!openHamburger)}
        >
          <span className="block w-5 h-0.5 bg-black"></span>
          <span className="block w-5 h-0.5 bg-black"></span>
          <span className="block w-5 h-0.5 bg-black"></span>
        </div>
        <HamburgerMenu
          openHamburger={openHamburger}
          setOpenHamburger={setOpenHamburger}
          mode={mode}
        />
      </div>
    </div>
  );
};

export default UserSection;
