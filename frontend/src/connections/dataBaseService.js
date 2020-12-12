import { post, get } from './databaseConnector';

const getHeaders = () => {
  const token = localStorage.getItem("auth-token");
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
  let newUserData = { email, username, password, confirmPassword };
  try {
    response = await post('/users/register', newUserData);
    console.log('reg response', response);
  } catch (err) {
    console.error(err);
  }
  return response;
};

const login = async (email, password) => {
  let loginData = { email, password };
  let response;
  try {
    response = await post('/users/login', loginData);
    console.log('login response', response);

  } catch (err) {
    console.error(err);
  }
  return response;
};

const getUsers = async (email, password) => {
  let loginData = { email, password };
  let response;
  try {
    response = await get('/users', loginData);
  } catch (err) {
    console.error(err);
  }
  return response;
};

const checkToken = async () => {
  let response;
  try {
    response = await get('/users/tokenIsValid', getHeaders());
  } catch (err) {
    console.error(err);
  }
  return response;
};

export { register, login, getUsers, checkToken };
