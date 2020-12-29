import React from 'react';
import NavBar from './nav/NavBar';
import { getUsers } from '../../connections/dataBaseService';
import { Button } from '@material-ui/core';

const Home = () => {
  const [allUsers, setAllUsers] = React.useState('');

  const getAllUsers = async (event) => {
    event.preventDefault();
    let userResponse;
    try {
      userResponse = await getUsers();
      if (userResponse) {
        const userData = userResponse.data.users;
        const users = [];
        userData.forEach(user => {
          users.push(user.username);
        });
        setAllUsers(users.join(", "));
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
          <>   
            <NavBar/>
            <h1>HOME</h1>
            <Button onClick={getAllUsers}>Get users</Button>
            {allUsers}

          </>
  );
};

export default Home;
