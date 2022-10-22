import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  getLoginCookieVal,
  getAPI,
  guestUser,
} from '../../lib/resources/assets';
import {
  selectImportID,
  selectLoginCheck,
  updateLoginCheck,
  updateUser,
} from '../../lib/slices/userSlice';
import LoadingPage from '../../lib/components/LoadingPage';
import { updateImportingStatus } from '../../lib/slices/currentPlanSlice';
import axios from 'axios';
import { User } from '../../lib/resources/commonTypes';
import { userService } from '../../lib/services';
import { updateAddingPlanStatus } from '../../lib/slices/popupSlice';

/**
 * The login page, designed after the Spotify login page..
 * @prop cookies contains the various resources provided by the wrapper component of react-cookie
 */
const Login: React.FC = () => {
  // Redux setup.
  const dispatch = useDispatch();
  const loginCheck = useSelector(selectLoginCheck);
  const [cookies] = useCookies();
  const [finishedLoginCheck, setFinishedLoginCheck] = useState<boolean>(true);
  const [openDevChoose, setOpenDevChoose] = useState<boolean>(false);
  const [session, setSession] = useState<string>('');
  const router = useRouter();
  const importID = useSelector(selectImportID);
  const devIDs = ['mockUser'];

  // Useffect runs once on page load, calling to https://ucredit-api.herokuapp.com/api/verifyLogin to retrieve user data.
  // On successful retrieve, update redux with retrieved user
  useEffect(() => {
    const token = router.query.token && router.query.token[0];
    const loginId = token ? token : getLoginCookieVal(cookies);
    if (loginId && window.location.href.includes('ucredit.me')) {
      setFinishedLoginCheck(false);
      handleDBLogin(loginId);
    } else if (loginId) handleJHULogin(loginId);
    else dispatch(updateLoginCheck(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.token]);

  const redirectToReferrer = () => {
    const referrer = router.query.referrer as string;
    if (referrer) {
      if (referrer.includes('-')) {
        const [pathname, id] = referrer.split('-');
        router.push(`/${pathname}/${id}`);
      } else router.push(`/${referrer}`);
    }
  };

  /**
   *
   * @param loginId the loginId to check sessions for
   * @param token the token to set the cookie as
   */
  const handleDBLogin = (loginId: string) => {
    userService
      .login(loginId)
      .then((retrievedUser) => {
        if (retrievedUser.errors === undefined) {
          if (retrievedUser.data.plan_ids.length === 0)
            dispatch(updateAddingPlanStatus(true));
          if (loginId)
            document.cookie =
              'connect.sid=' +
              loginId +
              '; expires=' +
              new Date(Date.now() + 200000000000000).toString() +
              '; path=/';
          if (importID) dispatch(updateImportingStatus(true));
          dispatch(updateUser(retrievedUser.data));
          dispatch(updateLoginCheck(true));

          const referrer = router.query.referrer as string;
          if (referrer) redirectToReferrer();
          else if (
            typeof router.query.plan !== 'undefined' &&
            typeof router.query.mode !== 'undefined'
          ) {
            router.push(
              `/dashboard?plan=${router.query.plan}&mode=${router.query.mode}`,
            );
          } else router.push('/dashboard');
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
        } else {
          router.push('/login');
        }
      });
  };

  /**
   * Handles if the user is invalid.
   */
  const handleGuest = (): void => {
    dispatch(updateUser(guestUser));
    router.push('/dashboard');
  };

  /*
   * Handles JHU Login button being pressed.
   */
  const handleJHULogin = (loginId: any) => {
    if (window.location.href.includes('ucredit.me')) {
      if (loginId && typeof loginId === 'string') handleDBLogin(loginId);
      else window.location.href = getAPI(window) + '/login';
    } else if (typeof loginId === 'string') handleDevLogin(loginId)();
    else if (!window.location.href.includes('ucredit.me'))
      setOpenDevChoose(true);
  };

  /**
   * Handles login for a chosen dev being pressed.
   * @param id - id of the dev to login as
   */
  const handleDevLogin = (id: string) => (): void => {
    axios
      .get(getAPI(window) + '/backdoor/verification/' + id)
      .then((res) => {
        const devUser: User = res.data.data;
        if (devUser.plan_ids.length === 0)
          dispatch(updateAddingPlanStatus(true));
        if (importID) dispatch(updateImportingStatus(true));
        dispatch(updateUser(devUser));
        dispatch(updateLoginCheck(true));
        document.cookie =
          'connect.sid=' +
          devUser._id +
          '; expires=' +
          new Date(Date.now() + 200000000000000).toString() +
          '; path=/';
        const referrer = router.query.referrer as string;
        if (referrer) redirectToReferrer();
        else if (
          typeof router.query.plan !== 'undefined' &&
          typeof router.query.mode !== 'undefined'
        ) {
          router.push(
            `/dashboard?plan=${router.query.plan}&mode=${router.query.mode}`,
          );
        } else router.push('/dashboard');
      })
      .catch((err) => {
        console.log('Backdoor verfication failed!', err);
      });
  };

  /**
   * Handles the case where we haven't logged in yet and users are exposed to the guest login button.
   */
  const preventPreLoginClick = () =>
    toast.info("Please wait while we check if you're logged in...", {
      toastId: 'check login'
    });

  /**
   * Handles custom session id change.
   */
  const onSessionChange = (e) => {
    setSession(e.target.value);
  };

  /**
   * Handles custom session id submission
   */
  const submitSession = () => {
    handleJHULogin(session);
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
          {openDevChoose && (
            <div className="flex flex-col absolute left-[35%] top-[35%] z-[80] w-[30%] pb-8 bg-gray-100 text-black rounded">
              <div
                className="mt-2 mr-4 text-2xl font-bold text-right cursor-pointer"
                onClick={() => setOpenDevChoose(false)}
              >
                X
              </div>
              <div className="mb-4 ml-4 text-xl">Choose a dev account:</div>
              {devIDs.map((id) => (
                <button
                  onClick={handleDevLogin(id)}
                  className="w-32 mx-auto mb-2 rounded bg-primary"
                  key={id}
                >
                  {id}
                </button>
              ))}
              <input
                placeholder="Enter a custom ID here"
                className="p-1 mx-auto rounded w-80"
                onChange={onSessionChange}
                value={session}
              />
              <button
                className="mx-auto mb-2 text-center rounded bg-primary w-80"
                onClick={submitSession}
              >
                Login as custom user
              </button>
            </div>
          )}
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
            <div className="flex flex-col mx-auto my-auto text-lg font-bold text-white rounded p-14 bg-primary">
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
              <button
                onClick={handleJHULogin}
                className="flex flex-row items-center justify-center w-64 h-12 mx-auto font-semibold tracking-widest transition duration-200 ease-in transform rounded-full cursor-pointer select-none bg-secondary hover:scale-105"
              >
                JHU Login
              </button>
              <button
                className="flex flex-row items-center justify-center w-64 h-12 mx-auto mt-5 mb-auto font-semibold tracking-widest transition duration-200 ease-in transform rounded-full cursor-pointer select-none bg-secondary focus:outline-none hover:scale-105"
                onClick={
                  finishedLoginCheck ? handleGuest : preventPreLoginClick
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
