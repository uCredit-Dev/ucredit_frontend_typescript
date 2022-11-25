import axios from 'axios';
import { useRouter } from 'next/router';
import React, { FC, Fragment, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginCookieVal, getAPI } from '../../../resources/assets';
import { DashboardMode } from '../../../resources/commonTypes';
import { resetCurrentPlan } from '../../../slices/currentPlanSlice';
import {
  resetUser,
  selectUser,
  updateToken,
} from '../../../slices/userSlice';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const HamburgerMenu: FC<{
  mode: DashboardMode;
}> = ({ mode }) => {
  // Redux Setup
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const router = useRouter();
  const [cookies, , removeCookie] = useCookies(['connect.sid']);
  const [showMenu, setShowMenu] = useState<boolean>(false);

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
    dispatch(updateToken(''));
    dispatch(resetCurrentPlan());
    router.push('/login');
  };

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setShowMenu(!showMenu);
  };

  return (
    <>
      <Fragment key={'right'}>
        <Button onClick={toggleDrawer}>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="black"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </Button>
        <Drawer anchor={'right'} open={showMenu} onClose={toggleDrawer}>
          <ListItem>
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              {typeof window !== 'undefined' && window.innerWidth > 600 && (
                <div>{user.name}</div>
              )}
            </span>
          </ListItem>
          <Divider />
          {user._id !== 'guestUser' && (
            <ListItem disablePadding>
              <ListItemButton
                onClick={() =>
                  router.push(
                    mode === DashboardMode.Reviewer
                      ? '/dashboard'
                      : '/reviewer',
                  )
                }
              >
                <ListItemIcon>
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6"
                  >
                    <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                    <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                  </svg>
                </ListItemIcon>
                <ListItemText
                  primary={
                    (mode === DashboardMode.Reviewer
                      ? DashboardMode.Planning
                      : DashboardMode.Reviewer) + ' Dashboard'
                  }
                />
              </ListItemButton>
            </ListItem>
          )}
          <ListItem disablePadding>
            {user._id === 'guestUser' ? (
              <ListItemButton
                onClick={() => {
                  window.location.href =
                    'https://ucredit-api.onrender.com/api/login';
                }}
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <ListItemIcon>
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
                </ListItemIcon>
                <ListItemText>Sign In</ListItemText>
              </ListItemButton>
            ) : (
              <ListItemButton onClick={handleLogoutClick}>
                <ListItemIcon>
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
                </ListItemIcon>
                <ListItemText>Sign Out</ListItemText>
              </ListItemButton>
            )}
          </ListItem>
        </Drawer>
      </Fragment>
    </>
  );
};

export default HamburgerMenu;
