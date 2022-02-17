import { useRouter } from 'next/router';
import DashboardEntry from '../../lib/components/login/DashboardEntry';

const Login: React.FC = () => {
  const router = useRouter();

  return <DashboardEntry token={router.query.token && router.query.token[0]} />;
};

export default Login;
