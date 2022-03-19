import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';
import { selectUser, resetUser } from '../../slices/userSlice';
import { resetCurrentPlan } from '../../slices/currentPlanSlice';
import { api, checkLocalhost, getLoginCookieVal } from '../../resources/assets';
import { DashboardMode } from '../../resources/commonTypes';

interface Props {
  mode: DashboardMode;
}

/**
 * User login/logout buttons.
 */
const UserSection: React.FC<Props> = ({ mode }) => {
  // Redux setup
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [cookies, , removeCookie] = useCookies(['connect.sid']);
  const router = useRouter();

  const handleLogoutClick = (): void => {
    const loginId = getLoginCookieVal(cookies);
    if (!checkLocalhost())
      axios
        .delete(api + '/verifyLogin/' + loginId)
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
    <div className="fixed z-20 w-screen h-16 p-3 px-6 shadow select-none bg-primary">
      <div className="flex flex-row items-center justify-between w-full h-full">
        {/* <div className="flex flex-row items-center justify-center mr-3 bg-white rounded-full w-11 h-11"> */}
        {/* <UserSvg className="w-6 h-6 stroke-2" /> */}
        {/* </div> */}
        <div className="flex flex-row items-center flex-grow ml-5 text-3xl font-bold text-white">
          <img src="/img/logo-darker.png" alt="logo" className="mr-3 h-9"></img>
          <div>uCredit</div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() =>
              router.push(
                mode === DashboardMode.Advising ? '/dashboard' : '/reviewer',
              )
            }
            className="flex flex-row items-center justify-center w-24 transition duration-200 ease-in transform bg-white border border-gray-200 rounded cursor-pointer select-none hover:shadow-md h-9 focus:outline-none"
          >
            {mode}
          </button>
          {typeof window !== 'undefined' && window.innerWidth > 800 && (
            <div className="flex items-center font-semibold text-white">
              Logged in as {user.name}!
            </div>
          )}
          {user._id === 'guestUser' ? (
            <a
              href="https://ucredit-api.herokuapp.com/api/login"
              className="flex flex-row items-center justify-center w-24 transition duration-200 ease-in transform bg-white border border-gray-200 rounded cursor-pointer select-none hover:shadow-md h-9 focus:outline-none"
            >
              Log In
            </a>
          ) : (
            <button
              onClick={handleLogoutClick}
              className="flex flex-row items-center justify-center w-24 transition duration-200 ease-in transform bg-white border border-gray-200 rounded cursor-pointer select-none hover:shadow-md h-9 focus:outline-none"
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSection;
