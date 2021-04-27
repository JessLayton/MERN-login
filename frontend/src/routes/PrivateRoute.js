import React from 'react';
import PropType from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ userData, component: Component, path }) => (
  <Route
    path={path}
    render={() => (
      userData.user && userData.isAuthed
        ? <Component />
        : <Redirect to='/login' />
    )}
  />
);

PrivateRoute.propTypes = {
  userData: PropType.shape({ user: PropType.string, isAuthed: PropType.bool }).isRequired,
  component: PropType.element.isRequired,
  path: PropType.string.isRequired,
};

export default PrivateRoute;
