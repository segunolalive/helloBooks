import React from 'react';
import { Redirect } from 'react-router-dom';
import Notify from '../../actions/Notify';

/**
 * redirects users to login page if unauthenticated
 *
 * @returns {JSX}  react-router dom Redirect component
 */
const LoginRedirect = () => {
  Notify.error('Login to proceed');
  return (<Redirect to='/login'/>);
};

export default LoginRedirect;
