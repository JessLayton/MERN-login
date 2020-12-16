import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { checkToken } from './connections/dataBaseService';
import PrivateRoute from './components/PrivateRoute';
import UserContext from './context/userContext';
import Loading from './components/pages/Loading';
import Landing from './components/pages/Landing';
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Snackbar from './components/snackbar/Snackbar';

function App() {  

  const [loading, isLoading] = useState(true);
  const [userData, setUserData] = useState({
    isAuthed: true,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      const tokenResponse = await checkToken();
      if (tokenResponse) {
        setUserData({
          isAuthed: true,
          user: tokenResponse.data.user,
        });
      } else {
        setUserData({
          isAuthed: false,
          user: undefined,
        });
        localStorage.setItem("auth-token", undefined);
      }
      isLoading(false);
    };
    checkLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <>
      <Snackbar />
      {loading
      ? ( 
        <Loading />
      )
      : (<UserContext.Provider value={{ userData, setUserData }}>
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
                <PrivateRoute path='/home' component={Home} userData={userData} />
            </Switch>
          </Router>
        </UserContext.Provider>)
      }
    </>
  );
}
export default App;