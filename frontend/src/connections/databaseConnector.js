import Axios from 'axios';

const getLocation = (path) => `http://localhost:5000${path}`;

const post = async (path, body, headers = {}) => {
  let response;
  try {
    response = await Axios.post(getLocation(path), body, headers);
  } catch (err) {
    console.error(err);
  }
  return response;
};

const get = async (path, headers = {}) => {
  let response;
  try {
    response = await Axios.get(getLocation(path), headers);
  } catch (err) {
    console.error(err);
  }
  return response;
};

const put = async (path, body, headers) => {
  console.log("2")
  let response;
  try {
    console.log("3")
    response = await Axios.put(getLocation(path), body);
    console.log("4")
  } catch (err) {
    console.error(err);
  }
  return response;
}

export { post, get, put };