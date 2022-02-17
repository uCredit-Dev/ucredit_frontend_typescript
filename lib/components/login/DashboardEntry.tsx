import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { updateUser, selectUser } from '../../slices/userSlice';
import { api, getLoginCookieVal, guestUser } from '../../resources/assets';

/**
 * The login page, designed after the Spotify login page..
 * @prop cookies contains the various resources provided by the wrapper component of react-cookie
 */
const DashboardEntry: React.FC<{ token: string }> = ({ token }) => {
  // Redux setup.
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [cookies] = useCookies();
  const [finishedLoginCheck, setFinishedLoginCheck] = useState(true);
  const router = useRouter();

  // Useffect runs once on page load, calling to https://ucredit-api.herokuapp.com/api/retrieveUser to retrieve user data.
  // On successful retrieve, update redux with retrieved user
  // On fail, guest user is used.
  useEffect(() => {
    if (token) fetchUser(token);
    else if (user._id === 'noUser') initialLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Initial login for when the user is the initial state, no_user.
  const initialLogin = (): void => {
    setFinishedLoginCheck(false);
    const loginId = getLoginCookieVal(cookies);
    fetch(api + '/retrieveUser/' + loginId, {
      mode: 'cors',
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((retrievedUser) => {
        if (retrievedUser.errors === undefined) {
          dispatch(updateUser(retrievedUser.data));
          router.push('/dashboard');
        } else {
          setFinishedLoginCheck(true);
        }
      })
      .catch((err) => {
        console.log('ERROR IS: ', err);
        setFinishedLoginCheck(true);
      });
  };

  // Fetches user based on url token.
  const fetchUser = (token: string): void => {
    fetch(api + '/retrieveUser/' + token, {
      mode: 'cors',
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((retrievedUser) => {
        if (
          retrievedUser.errors === undefined &&
          !token.includes('dashboard')
        ) {
          document.cookie =
            'connect.sid=' +
            token +
            '; expires=' +
            new Date(Date.now() + 200000000000000).toString() +
            '; path=/';
          dispatch(updateUser(retrievedUser.data));
          router.push('/dashboard');
        } else {
          setFinishedLoginCheck(true);
        }
      })
      .catch(() => {
        console.log("ERROR: couldn't log in with token " + token);
      });
  };

  /**
   * Handles if the user is invalid.
   */
  const handleGuest = (): void => {
    dispatch(updateUser(guestUser));
    router.push('/dashboard');
  };

  return (
    <>
      <div
        className="absolute flex w-screen h-screen"
        style={{
          backgroundImage:
            'url(/img/sample-plan.png), linear-gradient(205deg, rgba(52, 211, 153), rgba(59, 130, 246))',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundBlendMode: 'lighten',
          filter: 'blur(7px)',
          zIndex: 45,
        }}
      ></div>
      <div className="absolute z-50 flex w-full h-full">
        <div className="flex flex-col mx-auto my-auto text-lg font-bold text-white rounded shadow p-14 bg-gradient-to-b from-blue-500 to-green-400">
          <div className="flex flex-row items-center justify-center w-full pr-2 mt-auto text-3xl">
            <img src="/img/logo-darker.png" alt="logo" className="h-16 mr-2" />
            <div>uCredit</div>
          </div>
          <div className="w-full mx-auto mt-8 text-4xl text-center mb-14">
            Quick accessible degree planning.
          </div>
          <a
            href="https://ucredit-api.herokuapp.com/api/login"
            className="flex flex-row items-center justify-center w-64 h-12 mx-auto font-semibold tracking-widest transition duration-200 ease-in transform rounded-full shadow cursor-pointer select-none bg-secondary hover:scale-105"
          >
            JHU SSO Login
          </a>
          <button
            className="flex flex-row items-center justify-center w-64 h-12 mx-auto mt-5 mb-auto font-semibold tracking-widest transition duration-200 ease-in transform rounded-full shadow cursor-pointer select-none bg-secondary focus:outline-none hover:scale-105"
            onClick={
              finishedLoginCheck
                ? handleGuest
                : () => {
                    toast.info(
                      "Please wait while we check if you're logged in...",
                    );
                  }
            }
          >
            Continue as guest
          </button>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default DashboardEntry;
