import axios from 'axios';
import { useEffect, useState, useRef } from 'react';

export default () => {
  const [auth, setAuth] = useState();
  const authChecked = useRef(false);

  const verifyAuth = async () => {
    try {
      const res = await axios.get('/api/users/isloggedin');
      return res.data;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(() => {
    if (!authChecked.current) {
      (async () => {
        const data = await verifyAuth();
        setAuth(data);
        authChecked.current = true;
      })();
    }
  }, []);

  return { auth };
};
