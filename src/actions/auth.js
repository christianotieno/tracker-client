import axios from 'axios';

export const SIGNED_IN = 'SIGNED_IN';
export const SIGNIN_USER = 'SIGNIN_USER';
export const CREATE_USER = 'CREATE_USER';
export const SIGNOUT_USER = 'SIGNOUT_USER';
export const SIGNED_IN_ERROR = 'SIGNED_IN_ERROR';
export const SIGNIN_USER_ERROR = 'SIGNIN_USER_ERROR';
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';

export const createUser = newUser => async dispatch => {
  let response = {};
  try {
    response = await axios({
      method: 'POST',
      url: 'https://schedule-tracker-api.herokuapp.com/users',
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

export const signInUser = user => async dispatch => {
  let response = {};
  try {
    response = await axios.post('https://schedule-tracker-api.herokuapp.com/login', { user }, { withCredentials: true });
    dispatch({
      type: SIGNIN_USER,
      payload: response.data,
    });
    return response;
  } catch (error) {
    dispatch({
      type: SIGNIN_USER_ERROR,
      payload: error,
    });
    return error;
  }
};

export const signOutUser = () => async dispatch => {
  try {
    dispatch({ type: SIGNOUT_USER, payload: {} });
    const response = await axios({
      method: 'DELETE',
      url: 'https://schedule-tracker-api.herokuapp.com/logout',
      data: { user: {} },
      crossdomain: true,
      withCredentials: true,
    });
    return response;
  } catch (error) { return (error); }
};

export const signInStatus = () => dispatch => {
  axios.get('https://schedule-tracker-api.herokuapp.com/logged_in',
    { withCredentials: true })
    .then(response => (
      response.data))
    .then(data => {
      dispatch({
        type: SIGNED_IN,
        payload: data,
      });
    })
    .catch(error => {
      dispatch({
        type: SIGNED_IN_ERROR,
        payload: error,
      });
    });
};
