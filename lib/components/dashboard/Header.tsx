import React from 'react';
import { DashboardMode } from '../../resources/commonTypes';
import CommentsOverview from './menus/comments/CommentsOverview';
import HamburgerMenu from './menus/HamburgerMenu';
import Notification from './menus/Notification';
import RoadaMapHeader from '../roadmap/Header';
import { ReviewMode } from '../../resources/commonTypes';
import { useRouter } from 'next/router';

/**
 * User login/logout buttons.
 */
const Header: React.FC<{
  userID: string;
  dashboardSwitchMode?: DashboardMode;
  mode: ReviewMode;
  zLevelMax?: boolean | null;
}> = ({ userID, dashboardSwitchMode, mode, zLevelMax }) => {
  const router = useRouter();
  return mode === ReviewMode.RoadMap ? (
    <RoadaMapHeader />
  ) : (
    <div
      className={`z-[${
        zLevelMax ? '91' : '40'
      } flex justify-between items-center py-1 px-4 h-1/6 bg-blue-header`}
    >
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
      {dashboardSwitchMode === DashboardMode.Planning && <CommentsOverview />}
      <Notification userID={userID} />
      <HamburgerMenu mode={dashboardSwitchMode} />
    </div>
  );
};

export default Header;
