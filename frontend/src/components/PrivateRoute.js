import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { getDefaultRedirect, getUserRole } from '../utils/user';

const PrivateRoute = ({
  path,
  role,
  component: Component,
}) => {
  const userRole = getUserRole();
  const defaultRedirect = getDefaultRedirect();

  if (path === '/') { return <Route path={path} exact><Component /></Route>; }

  return userRole ? userRole === role
    ? <Route path={path} exact><Component /></Route>
    : <Redirect from={path} to={defaultRedirect} exact />
    : <Redirect from={path} to="/" exact />;
};

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  role: PropTypes.string,
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
