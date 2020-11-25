import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/pages/Landing';
import Register from './components/pages/Register';
import Login from './components/pages/Login';

function App() {

  return (
       <Router>
      <Switch>
        <Route exact path='/'>
          <Landing />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
      </Switch>
    </Router>  
  );
}
export default App;