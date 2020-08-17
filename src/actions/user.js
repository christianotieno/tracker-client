import axios from 'axios';

export const LOGGED_IN = 'LOGGED_IN';
export const LOGIN_USER = 'LOGIN_USER';
export const CREATE_USER = 'CREATE_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGGED_IN_ERROR = 'LOGGED_IN_ERROR';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';

export const createUser = newUser => async dispatch => {
  let response = {};
  try {
    response = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:4000/users',
      data: { user: newUser },
      crossdomain: true,
      withCredentials: true,
    });
    dispatch({
      type: CREATE_USER,
      payload: {
        ...newUser,
        id: response.data.user.id ? response.data.user.id : null,
      },
    });
    return response;
  } catch (error) {
    dispatch({ type: CREATE_USER_ERROR, payload: response.data.errors });
    return error;
  }
};

export const loginUser = user => async dispatch => {
  let response = {};
  try {
    response = await axios.post('http://127.0.0.1:4000/login', { user }, { withCredentials: true });
    dispatch({
      type: LOGIN_USER,
      payload: response.data,
    });
    return response;
  } catch (error) {
    dispatch({
      type: LOGIN_USER_ERROR,
      payload: error,
    });
    return error;
  }
};

export const logOutUser = () => async dispatch => {
  try {
    dispatch({ type: LOGOUT_USER, payload: {} });
    const response = await axios({
      method: 'DELETE',
      url: 'http://127.0.0.1:4000/logout',
      data: { user: {} },
      crossdomain: true,
      withCredentials: true,
    });
    return response;
  } catch (error) { return (error); }
};

export const loginStatus = () => dispatch => {
  axios.get('http://127.0.0.1:4000/logged_in',
    { withCredentials: true })
    .then(response => (
      response.data))
    .then(data => {
      dispatch({
        type: LOGGED_IN,
        payload: data,
      });
    })
    .catch(error => {
      dispatch({
        type: LOGGED_IN_ERROR,
        payload: error,
      });
    });
};
