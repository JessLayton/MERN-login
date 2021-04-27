import React, { useState, useEffect } from 'react';

import { checkToken } from './connections/dataBaseService';
import Routes from './routes/Routes';
import UserContext from './context/userContext';
import Loading from './components/Loading';
import Snackbar from './components/snackbar/Snackbar';

function App() {
  const [loading, isLoading] = useState(true);
  const [userData, setUserData] = useState({
    isAuthed: false,
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
        localStorage.removeItem('auth-token');
      }
      isLoading(false);
    };
    checkLoggedIn();
  }, []);

  return (
    <>
      <Snackbar />
      {loading
        ? (
          <Loading />
        )
        : (
          <UserContext.Provider value={{ userData, setUserData }}>
            <Routes userData={userData} />
          </UserContext.Provider>
        )}
    </>
  );
}
export default App;
