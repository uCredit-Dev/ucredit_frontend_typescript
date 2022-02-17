import { useRouter } from 'next/router';
import Dashboard from '../lib/components/dashboard';

const Share: React.FC = () => {
  const router = useRouter();
  console.log(router.query._id);
  return <Dashboard id={router.query._id && router.query._id[0]} />;
};

export default Share;
