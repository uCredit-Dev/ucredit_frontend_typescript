import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getLoginCookieVal, api, guestUser } from '../../lib/resources/assets';
import {
  selectImportID,
  selectLoginCheck,
  updateLoginCheck,
  updateUser,
} from '../../lib/slices/userSlice';
import LoadingPage from '../../lib/components/LoadingPage';
import { updateImportingStatus } from '../../lib/slices/currentPlanSlice';

/**
 * The login page, designed after the Spotify login page..
 * @prop cookies contains the various resources provided by the wrapper component of react-cookie
 */
const Login: React.FC = () => {
  // Redux setup.
  const dispatch = useDispatch();
  const loginCheck = useSelector(selectLoginCheck);
  const [cookies] = useCookies();
  const [finishedLoginCheck, setFinishedLoginCheck] = useState(true);
  const router = useRouter();
  const importID = useSelector(selectImportID);

  // Useffect runs once on page load, calling to https://ucredit-api.herokuapp.com/api/verifyLogin to retrieve user data.
  // On successful retrieve, update redux with retrieved user
  useEffect(() => {
    setFinishedLoginCheck(false);
    const token = router.query.token && router.query.token[0];
    const loginId = token ? token : getLoginCookieVal(cookies);
    fetch(api + '/verifyLogin/' + loginId, {
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
          if (token)
            document.cookie =
              'connect.sid=' +
              token +
              '; expires=' +
              new Date(Date.now() + 200000000000000).toString() +
              '; path=/';
          if (importID) dispatch(updateImportingStatus(true));
          dispatch(updateUser(retrievedUser.data));
          dispatch(updateLoginCheck(true));
          router.push('/dashboard');
        } else {
          dispatch(updateLoginCheck(true));
          setFinishedLoginCheck(true);
        }
      })
      .catch((err) => {
        console.log('FAILED TO LOG IN. ERROR IS: ', err);
        if (importID) {
          dispatch(updateImportingStatus(true));
          dispatch(updateUser(guestUser));
          router.push('/dashboard');
        }
        dispatch(updateLoginCheck(true));
        setFinishedLoginCheck(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.token]);

  /**
   * Handles if the user is invalid.
   */
  const handleGuest = (): void => {
    dispatch(updateUser(guestUser));
    router.push('/dashboard');
  };

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <meta
          name="description"
          content="Quick accessible degree planning login."
        />
        <title>uCredit Login</title>
      </Head>
      {loginCheck ? (
        <>
          <div
            className="absolute flex w-screen h-screen"
            style={{
              backgroundImage: 'url(/img/sample-plan.png)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundBlendMode: 'lighten',
              filter: 'blur(7px)',
              zIndex: 45,
            }}
          ></div>
          <div className="absolute z-50 flex w-full h-full">
            <div className="flex flex-col mx-auto my-auto text-lg font-bold text-white rounded shadow p-14 bg-primary">
              <div className="flex flex-row items-center justify-center w-full pr-2 mt-auto text-3xl">
                <img
                  src="/img/logo-darker.png"
                  alt="logo"
                  className="h-16 mr-2"
                />
                <div>uCredit</div>
              </div>
              <div className="w-full mx-auto mt-8 text-4xl text-center mb-14">
                Quick accessible degree planning.
              </div>
              <a
                href="https://ucredit-api.herokuapp.com/api/login"
                className="flex flex-row items-center justify-center w-64 h-12 mx-auto font-semibold tracking-widest transition duration-200 ease-in transform rounded-full shadow cursor-pointer select-none bg-secondary hover:scale-105"
              >
                JHU Login
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
        </>
      ) : (
        <LoadingPage />
      )}
    </>
  );
};

export default Login;
