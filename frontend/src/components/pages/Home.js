import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/userContext';
import NavBar from '../nav/NavBar';

const Home = () => {
  const {userData} = useContext(UserContext);

  return (
    <div>
      {userData.user ? (
          <>   
            <NavBar/>
            <h1>HOME</h1>
          </>         
      ) : (
        <>
        </>
      )}
    </div>
  );
};

export default Home;
