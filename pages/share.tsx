import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Dashboard from '../lib/components/dashboard';

const Share: React.FC = () => {
  const router = useRouter();
  const [id, setId] = useState('');

  useEffect(() => {
    if (router.query._id) {
      setId(router.query._id as string);
    }
  }, [router.query._id]);

  return id && <Dashboard id={id} />;
};

export default Share;
