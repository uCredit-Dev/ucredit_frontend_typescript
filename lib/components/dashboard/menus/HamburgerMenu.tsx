import { Popover, Transition } from '@headlessui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FC, Fragment } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginCookieVal, getAPI } from '../../../resources/assets';
import { DashboardMode } from '../../../resources/commonTypes';
import { resetCurrentPlan } from '../../../slices/currentPlanSlice';
import { resetUser, selectUser } from '../../../slices/userSlice';

const HamburgerMenu: FC<{
  mode: DashboardMode;
}> = ({ mode }) => {
  // Redux Setup
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const router = useRouter();
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
    <>
      <Popover className="">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                            ${open ? '' : 'text-opacity-90'}
                            z-40 p-[0.53rem] pt-[0.6rem] space-y-1 bg-white rounded shadow h-9 w-9 mx-2 cursor-pointer absolute top-3 right-7 hamburger-menu`}
            >
              <span className="block w-5 h-[0.2rem] bg-black"></span>
              <span className="block w-5 h-[0.2rem] bg-black"></span>
              <span className="block w-5 h-[0.2rem] bg-black"></span>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="w-72 top-14 z-40 absolute right-0 shadow-lg">
                <div className="overflow-y-auto py-4 px-3 bg-white rounded">
                  <ul className="space-y-2">
                    <li>
                      <span className="self-center text-xl font-semibold whitespace-nowrap">
                        {typeof window !== 'undefined' &&
                          window.innerWidth > 600 && (
                            <div className="ml-2">{user.name}</div>
                          )}
                      </span>
                    </li>
                    {user._id !== 'guestUser' && (
                      <li>
                        <button
                          onClick={() =>
                            router.push(
                              mode === DashboardMode.Reviewer
                                ? '/dashboard'
                                : '/reviewer',
                            )
                          }
                          className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 w-full"
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
                          <span className="flex-1 ml-3 whitespace-nowrap text-left">
                            {mode === DashboardMode.Reviewer
                              ? DashboardMode.Planning
                              : DashboardMode.Reviewer}{' '}
                            {' Dashboard'}
                          </span>
                        </button>
                      </li>
                    )}
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
                              fillRule="evenodd"
                              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                              clipRule="evenodd"
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
                              fillRule="evenodd"
                              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                              clipRule="evenodd"
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
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
};

export default HamburgerMenu;
