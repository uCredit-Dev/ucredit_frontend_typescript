import { useState, useEffect } from 'react';

const useClickOutside = (ref) => {
  const [hit, setHit] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setHit(true);
      else setHit(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [ref]);

  return [hit, setHit];
};

export { useClickOutside };
