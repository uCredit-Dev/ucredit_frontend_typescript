import { DashboardMode } from '../../resources/commonTypes';
import CommentsOverview from './menus/comments/CommentsOverview';
import HamburgerMenu from './menus/HamburgerMenu';
import Notification from './menus/Notification';
import RoadaMapHeader from '../roadmap/Header';
import { ReviewMode } from '../../resources/commonTypes';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

/**
 * User login/logout buttons.
 */
const Header: React.FC<{
  userID: string;
  dashboardSwitchMode: DashboardMode;
  mode: ReviewMode;
  zLevelMax: boolean | null;
}> = ({ userID, dashboardSwitchMode, mode, zLevelMax }) => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState<boolean>(false);
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
      <div className="absolute w-20 top-12 space-y-1 right-0 z-100">
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
        </div>
      </div>
      {dashboardSwitchMode === DashboardMode.Planning && <CommentsOverview />}
      <Notification userID={userID} />
      <HamburgerMenu mode={dashboardSwitchMode} />
    </div>
  );
};

export default Header;
