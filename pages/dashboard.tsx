import Dashboard from '../lib/components/dashboard/index';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { selectUser } from '../lib/slices/userSlice';
import { useEffect } from 'react';
import { User } from '../lib/resources/commonTypes';
import { useRouter } from 'next/router';
import axios from 'axios';
import { api } from '../lib/resources/assets';

const Dash: React.FC = () => {
  const user: User = useSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    if (user._id === 'noUser') router.push('/login');
    const yearRange = localStorage.getItem('yearRange');
    if (!yearRange)
      axios
        .get(api + '/getYearRange')
        .then((res) => {
          const { min, max } = res.data.data;
          const yearRange = {
            min,
            max,
            expiry: new Date().getTime() + 1829800000,
          };
          localStorage.setItem('yearRange', JSON.stringify(yearRange));
        })
        .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>My Plan</title>
      </Head>
      <Dashboard />
    </>
  );
};

export default Dash;
