import { post, get, put } from './databaseConnector';

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
  } catch (err) {
    console.error(err);
  }
  return response;
};

const login = async (username, password) => {
  let loginData = { username, password };
  let response;
  try {
    response = await post('/users/login', loginData);

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
  } catch(err) {
    console.error(err)
  }
  return response;
}

const resetPassword = async (password) => {
  let response;
  try {
    console.log("1")
    response = await put('/users/resetPassword', { password });
    console.log("5")
  } catch(err) {
    console.log("6")
    console.error(err)
  }
  return response;
}

export { register, login, getUsers, checkToken, sendResetEmail, resetPassword };
