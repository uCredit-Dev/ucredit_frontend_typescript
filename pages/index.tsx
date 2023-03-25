import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
import { selectUser } from '../lib/slices/userSlice';

import LandingPage from '../lib/components/landing-page';
import Head from 'next/head';

const Home: React.FC = () => {
  const user = useSelector(selectUser);

  // Component state setup.
  const [welcomeScreen, setWelcomeScreen] = useState<boolean>(false);
  const [needsToLoad, setNeedsToLoad] = useState<boolean>(false);

  // const retrieveData = (counter: number, retrieved: SISRetrievedCourse[]) => {
  //   setNeedsToLoad(true);
  //   axios
  //     .get(getAPI(window) + '/search/skip/' + counter + '?mod=' + 450)
  //     .then((courses: any) => {
  //       if (courses.data.data.length > 0) {
  //         retrieveData(counter + 1, [...retrieved, ...courses.data.data]);
  //       } else {
  //         toast.dismiss();
  //         toast.success('SIS Courses Cached!');
  //         setWelcomeScreen(false);
  //         dispatch(updateAllCoursesCached(retrieved));
  //         dispatch(updateRetrievedAll(true));
  //       }
  //     })
  //     .catch((err) => {
  //       // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //       retrieveData(counter, retrieved);
  //       console.log('err is ', err.message);
  //     });
  // };

  useEffect(() => {
    if (user._id === 'noUser') {
      setWelcomeScreen(true);
      setNeedsToLoad(true);
    } else if (user._id !== 'noUser' && !needsToLoad && welcomeScreen) {
      setTimeout(() => setWelcomeScreen(false), 1000);
    } else if (needsToLoad) {
      setWelcomeScreen(true);
    }
  }, [user, needsToLoad, welcomeScreen]);

  return (
    <>
      <Head>
        <title>
          uCredit: quick and accessible degree planning for JHU students
        </title>
        <meta
          name="description"
          content="uCredit is a degree-tracking application packed with unique features, where users seamlessly manage their academic plans and developers are empowered to build great student-centered tools."
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="google-site-verification"
          content="pvEeXuYCxF6NJiH_huGZMae_aKeTckqDrTB74w7FdF8"
        />
      </Head>
      <LandingPage />
    </>
  );
};

export default Home;
