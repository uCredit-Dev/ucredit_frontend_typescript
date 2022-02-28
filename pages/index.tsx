import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { api } from '../lib/resources/assets';
import {
  selectCourseCache,
  selectUser,
  updateAllCoursesCached,
  updateCourseCache,
  updateRetrievedAll,
} from '../lib/slices/userSlice';
import {
  SISRetrievedCourse,
  UserCourse,
  Year,
} from '../lib/resources/commonTypes';
import { selectPlan } from '../lib/slices/currentPlanSlice';
import LandingPage from '../lib/components/landing-page';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const curPlan = useSelector(selectPlan);
  const courseCache = useSelector(selectCourseCache);

  // Component state setup.
  const [welcomeScreen, setWelcomeScreen] = useState<boolean>(false);
  const [needsToLoad, setNeedsToLoad] = useState<boolean>(false);

  const retrieveData = (counter: number, retrieved: SISRetrievedCourse[]) => {
    setNeedsToLoad(true);
    axios
      .get(api + '/search/skip/' + counter + '?mod=' + 450)
      .then((courses: any) => {
        if (courses.data.data.length > 0) {
          retrieveData(counter + 1, [...retrieved, ...courses.data.data]);
        } else {
          toast.dismiss();
          toast.success('SIS Courses Cached!');
          setWelcomeScreen(false);
          dispatch(updateAllCoursesCached(retrieved));
          dispatch(updateRetrievedAll(true));
        }
      })
      .catch((err) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        retrieveData(counter, retrieved);
        console.log('err is ', err.message);
      });
  };

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

  const courseCheck = (): boolean => {
    let hasCourses: boolean = false;
    curPlan.years.forEach((year: Year) => {
      if (year.courses.length !== 0) {
        hasCourses = true;
      }
    });
    return hasCourses;
  };

  useEffect(() => {
    const planHasCourses: boolean = courseCheck();
    if (
      courseCache.length === 0 &&
      curPlan._id !== 'noPlan' &&
      planHasCourses
    ) {
      let total = 0;
      let cum = 0;
      let SISCourses: SISRetrievedCourse[] = [];
      setNeedsToLoad(true);
      axios
        .get(api + '/coursesByPlan/' + curPlan._id)
        .then((response) => {
          response.data.data.forEach((c: UserCourse) => {
            total++;
            axios
              .get(api + '/search', {
                params: { query: c.number },
                // eslint-disable-next-line no-loop-func
              })
              .then((retrieved) => {
                let SISRetrieved: SISRetrievedCourse = retrieved.data.data[0];

                SISCourses.push(SISRetrieved);
                cum++;
                if (cum === total) {
                  dispatch(updateCourseCache([...SISCourses]));
                  setNeedsToLoad(false);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curPlan]);

  return <LandingPage />;
};

export default Home;
