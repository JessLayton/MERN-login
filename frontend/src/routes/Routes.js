import { React } from 'react';
import PropType from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Home from '../components/home/Home';
import Register from '../components/register/Register';
import Login from '../components/login/Login';
import Reset from '../components/reset/ResetRequest';
import PasswordReset from '../components/reset/PasswordReset';

const Routes = ({ userData }) => (
  <Router>
    <Switch>
      <PrivateRoute exact path='/' component={Home} userData={userData} />
      <Route path='/register'>
        <Register />
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/reset'>
        <Reset />
      </Route>
      <Route path='/passwordReset/:uuid'>
        <PasswordReset />
      </Route>
    </Switch>
  </Router>
);

Routes.propTypes = {
  userData: PropType.shape({ user: PropType.string, isAuthed: PropType.bool }).isRequired,
};

export default Routes;
