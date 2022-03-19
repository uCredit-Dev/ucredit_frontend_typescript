import Dashboard from '../lib/components/dashboard/index';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { selectUser } from '../lib/slices/userSlice';
import { useEffect, useState } from 'react';
import { Plan, ReviewMode, User } from '../lib/resources/commonTypes';
import { useRouter } from 'next/router';
import { userService } from '../lib/services';

const Dash: React.FC = () => {
  const user: User = useSelector(selectUser);
  const router = useRouter();
  const [plan, setPlan] = useState<Plan>(null);
  const [mode, setMode] = useState<ReviewMode>(ReviewMode.View);

  useEffect(() => {
    if (user._id === 'noUser') router.push('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!router.query) return;
    setMode(router.query.mode as ReviewMode);
    (async () => {
      try {
        const revieweePlan = (
          await userService.getPlan(router.query.plan as string)
        ).data;
        setPlan(revieweePlan);
      } catch (e) {}
    })();
  }, [router.query]);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <meta name="description" content="Quick accessible degree planning." />
        <title>My Plan</title>
      </Head>
      <Dashboard plan={plan} mode={mode} />
    </>
  );
};

export default Dash;
