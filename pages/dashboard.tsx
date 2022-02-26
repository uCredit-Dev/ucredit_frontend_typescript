import Dashboard from '../lib/components/dashboard/index';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { selectUser } from '../lib/slices/userSlice';
import { useEffect } from 'react';
import { User } from '../lib/resources/commonTypes';
import { useRouter } from 'next/router';

const Dash: React.FC = () => {
  const user: User = useSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    if (user._id === 'noUser') router.push('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <meta name="description" content="Quick accessible degree planning." />
        <title>My Plan</title>
      </Head>
      <Dashboard />
    </>
  );
};

export default Dash;
