import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, resetUser } from '../../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { resetCurrentPlan } from '../../slices/currentPlanSlice';
import { api, getLoginCookieVal } from '../../resources/assets';
import bird from '../../resources/images/logoDarker.png';
import { useCookies } from 'react-cookie';
import axios from 'axios';

/**
 * User login/logout buttons.
 */
const UserSection: FC = () => {
  // Redux setup
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(['connect.sid']);

  return (
    <div className="fixed z-20 p-3 px-6 w-screen h-16 bg-gradient-to-r shadow from-blue-500 to-green-400 select-none">
      <div className="flex flex-row items-center justify-end w-full h-full">
        {/* <div className="flex flex-row items-center justify-center mr-3 w-11 h-11 bg-white rounded-full"> */}
        {/* <UserSvg className="w-6 h-6 stroke-2" /> */}
        {/* </div> */}
        <div className="flex flex-row flex-grow items-center ml-5 text-white text-3xl italic font-bold">
          <img src={bird} alt="logo" className="mr-3 h-9"></img>
          <div>uCredit</div>
        </div>
        {window.innerWidth > 800 ? (
          <div className="mr-3 text-white font-semibold">
            Logged in as {user.name}!
          </div>
        ) : null}
        {user._id === 'guestUser' ? (
          <a
            href="https://ucredit-api.herokuapp.com/api/login"
            className="flex flex-row items-center justify-center mr-3 w-24 h-9 hover:text-white hover:bg-blue-400 bg-white rounded cursor-pointer select-none transform hover:scale-105 transition duration-200 ease-in"
          >
            Log In
          </a>
        ) : (
          <button
            onClick={() => {
              const loginId = getLoginCookieVal(cookies);
              axios
                .delete(api + '/retrieveUser/' + loginId)
                .then(() => {
                  removeCookie('connect.sid', { path: '/' });
                  dispatch(resetUser());
                  dispatch(resetCurrentPlan());
                  navigate('/login');
                })
                .catch((err) => {
                  console.log('error logging out', err);
                });
            }}
            className="flex flex-row items-center justify-center w-24 h-9 bg-white rounded focus:outline-none cursor-pointer select-none transform hover:scale-110 transition duration-200 ease-in drop-shadow-xl"
          >
            Log Out
          </button>
        )}
      </div>
    </div>
  );
};

export default UserSection;
