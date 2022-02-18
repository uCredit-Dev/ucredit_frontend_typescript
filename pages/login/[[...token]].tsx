import { useRouter } from 'next/router';
import DashboardEntry from '../../lib/components/login/DashboardEntry';
import Head from 'next/head';

const Login: React.FC = () => {
  const router = useRouter();

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
      <DashboardEntry token={router.query.token && router.query.token[0]} />
    </>
  );
};

export default Login;
