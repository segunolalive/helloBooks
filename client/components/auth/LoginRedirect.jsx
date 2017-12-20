import React from 'react';
import { Redirect } from 'react-router-dom';
import notify from '../../actions/notify';

/**
 * redirects users to login page if unauthenticated
 * 
 * @returns {JSX}  react-router dom Redirect component
 */
const LoginRedirect = () => {
  notify.error('Login to proceed');
  return (<Redirect to='/login'/>);
};

export default LoginRedirect;
