import { React } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Home from '../components/home/Home';
import Register from '../components/register/Register';
import Login from '../components/login/Login';

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
      <Route path='/no'>
      </Route>          
    </Switch>
  </Router>
    )   
}

export default Routes;