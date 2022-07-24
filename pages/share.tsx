import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateImportID } from '../lib/slices/userSlice';

const Share: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (router.query._id) {
      dispatch(updateImportID(router.query._id as string));
    }
    router.push('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query._id]);

  return <></>;
};

export default Share;
