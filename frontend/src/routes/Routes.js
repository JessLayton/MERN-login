import { React } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Home from '../components/home/Home';
import Register from '../components/register/Register';
import Login from '../components/login/Login';
import Reset from '../components/reset/Reset';
import PasswordReset from '../components/reset/PasswordReset'

const Routes = ({ userData }) => {
  return (
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
          <PasswordReset/>
        </Route>       
      </Switch>
    </Router>
  )
}

export default Routes;