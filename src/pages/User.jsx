import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/user/Login';
import Layout from '../components/Layout';
import useAuth from '../hooks/useAuth';
import classes from './User.module.scss';

function Auth() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate('/');
    }
  }, [auth, navigate]);

  return (
    <Layout>
      <div className={classes.formContainer}>
        <Login />
      </div>
    </Layout>
  );
}

export default Auth;