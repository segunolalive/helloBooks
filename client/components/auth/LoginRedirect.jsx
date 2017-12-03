import React from 'react';
import { Redirect } from 'react-router-dom';
import notify from '../../actions/notify';

const LoginRedirect = () => {
  notify.error('Login to proceed');
  return (<Redirect to='/login'/>);
};

export default LoginRedirect;
