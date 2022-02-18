import Dashboard from '../lib/components/dashboard/index';
import Head from 'next/head';

const Dash: React.FC = () => (
  <>
    <Head>
      <link rel="shortcut icon" href="/static/favicon.ico" />
      <meta name="description" content="Quick accessible degree planning." />
      <title>My Plan</title>
    </Head>
    <Dashboard />
  </>
);

export default Dash;
