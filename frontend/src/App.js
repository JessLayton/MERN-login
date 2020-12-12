import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import { checkToken, getUsers } from './connections/dataBaseService';
import PrivateRoute from './components/PrivateRoute';
import UserContext from './context/userContext';
import Landing from './components/pages/Landing';
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import Login from './components/pages/Login';

function App() {
  const history = useHistory();

  const [userData, setUserData] = useState({
    isAuthed: true,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      const tokenResponse = await checkToken();
      let userResponse;
      if (tokenResponse) {
        userResponse = await getUsers();
        if (userResponse) {
          setUserData({
            isAuthed: true,
            user: userResponse.data,
          });
        }
      }   
    }
    checkLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <>
    <UserContext.Provider value={{ userData, setUserData }}>
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
          <Route path='/home'>
            <Home />
          </Route>
          {/* <PrivateRoute path='/home' component={Home} userData={userData} /> */}
        </Switch>
      </Router>
    </UserContext.Provider>
</>

  );
}
export default App;