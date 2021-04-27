import { post, get, put } from './databaseConnector';

const getHeaders = () => {
  const token = localStorage.getItem('auth-token');
  if (token) {
    return {
      headers: {
        'x-auth-token': token,
      },
    };
  }
  return {};
};

const register = async (email, username, password, confirmPassword) => {
  let response;
  const newUserData = {
    email, username, password, confirmPassword,
  };
  try {
    response = await post('/users/register', newUserData);
  } catch (err) {
    console.error(err);
  }
  return response;
};

const login = async (username, password) => {
  const loginData = { username, password };
  let response;
  try {
    response = await post('/users/login', loginData);
  } catch (err) {
    console.error(err);
  }
  return response;
};

const checkToken = async () => {
  let response;
  if (localStorage.getItem('auth-token')) {
    try {
      response = await get('/users/tokenIsValid', getHeaders());
    } catch (err) {
      console.error(err);
    }
  }
  return response;
};

const sendResetEmail = async (email) => {
  let response;
  try {
    response = await post('/users/sendResetEmail', { email });
  } catch (err) {
    console.error(err);
  }
  return response;
};

const resetPassword = async (password, uuid) => {
  let response;
  try {
    response = await put('/users/resetPassword', { password, uuid });
  } catch (err) {
    console.error(err);
  }
  return response;
};

const getUsers = async () => {
  let response;
  if (localStorage.getItem('auth-token')) {
    try {
      response = await get('/users/allUsers', getHeaders());
    } catch (err) {
      console.error(err);
    }
  }
  return response;
};

export {
  register, login, getUsers, checkToken, sendResetEmail, resetPassword,
};
