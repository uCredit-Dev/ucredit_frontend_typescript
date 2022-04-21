import axios from 'axios';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginCookieVal, getAPI } from '../../resources/assets';
import { DashboardMode } from '../../resources/commonTypes';
import { resetCurrentPlan } from '../../slices/currentPlanSlice';
import { selectInfoPopup, updateInfoPopup } from '../../slices/popupSlice';
import { resetUser, selectUser } from '../../slices/userSlice';

const HamburgerMenu: FC<{
  openHamburger: boolean;
  setOpenHamburger: (openHamburger: boolean) => void;
  mode: DashboardMode;
}> = ({ openHamburger, mode }) => {
  // Redux setup
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const router = useRouter();
  const infoPopup = useSelector(selectInfoPopup);
  const [cookies, , removeCookie] = useCookies(['connect.sid']);

  const handleLogoutClick = (): void => {
    const loginId = getLoginCookieVal(cookies);
    if (getAPI(window).includes('ucredit.me'))
      axios
        .delete(getAPI(window) + '/verifyLogin/' + loginId)
        .then(() => logOut())
        .catch((err) => {
          console.log('error logging out', err);
        });
    else logOut();
  };

  const logOut = () => {
    removeCookie('connect.sid', { path: '/' });
    dispatch(resetUser());
    dispatch(resetCurrentPlan());
    router.push('/login');
  };
  return (
    <div>
      {openHamburger && (
        <aside
          className="w-64 top-14 z-90 absolute right-0"
          aria-label="Sidebar"
        >
          <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded">
            <ul className="space-y-2">
              <li>
                <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg">
                  <svg
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="ml-3">
                    {typeof window !== 'undefined' &&
                      window.innerWidth > 600 && <div>{user.name}!</div>}
                  </span>
                </div>
              </li>
              <li>
                <button
                  onClick={() =>
                    router.push(
                      mode === DashboardMode.Advising
                        ? '/dashboard'
                        : '/reviewer',
                    )
                  }
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 "
                >
                  <svg
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                    <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    {mode === DashboardMode.Advising
                      ? DashboardMode.Planning
                      : DashboardMode.Advising}
                  </span>
                  <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full">
                    3
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => dispatch(updateInfoPopup(!infoPopup))}
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                >
                  <svg
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Plan Overview
                  </span>
                </button>
              </li>
              <li>
                {user._id === 'guestUser' ? (
                  <a
                    href="https://ucredit-api.herokuapp.com/api/login"
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                  >
                    <svg
                      className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Sign In
                    </span>
                  </a>
                ) : (
                  <button
                    onClick={handleLogoutClick}
                    className="flex items-center p-2 text-base w-full font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                  >
                    <svg
                      className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap w-full text-left">
                      Sign Out
                    </span>
                  </button>
                )}
              </li>
            </ul>
          </div>
        </aside>
      )}
    </div>
  );
};

export default HamburgerMenu;
