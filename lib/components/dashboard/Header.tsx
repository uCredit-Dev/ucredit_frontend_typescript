import React from 'react';
import { DashboardMode } from '../../resources/commonTypes';
import CommentsOverview from './menus/comments/CommentsOverview';
import HamburgerMenu from './menus/HamburgerMenu';
import Notification from './menus/Notification';
/**
 * User login/logout buttons.
 */
const Header: React.FC<{
  userID: string;
  dashboardSwitchMode: DashboardMode;
}> = ({ userID, dashboardSwitchMode }) => {
  return (
    <div className="absolute z-20 w-full h-16 p-3 px-6 select-none bg-primary">
      <div className="flex flex-row items-center justify-end w-full h-full">
        {/* <div className="flex flex-row items-center justify-center mr-3 bg-white rounded-full w-11 h-11"> */}
        {/* <UserSvg className="w-6 h-6 stroke-2" /> */}
        {/* </div> */}
        <div className="flex flex-row items-center flex-grow ml-5 text-3xl font-bold text-white">
          <img src="/img/logo-darker.png" alt="logo" className="mr-3 h-9"></img>
          <div>uCredit</div>
        </div>
        {dashboardSwitchMode === DashboardMode.Planning && <CommentsOverview />}
        <Notification userID={userID} />
        <HamburgerMenu mode={dashboardSwitchMode} />
      </div>
      </div>
    );
  };
  
  export default Header;