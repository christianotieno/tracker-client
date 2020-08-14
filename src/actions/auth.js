import axios from 'axios';
import { addSignUpError, addSignInError } from './index';

const signUpUrl = 'http://localhost:4000/signup';
const signInUrl = 'http://localhost:4000/auth/login';

export const signUpUser = (user, history) => dispatch => {
  axios.post(
    signUpUrl,
    user,
  ).then(response => {
    dispatch({
      type: 'SIGNUP_SUCCESSFUL',
      payload: {
        token: response.data.auth_token,
      },
    });
    history.push('/');
  }).catch(() => {
    dispatch(addSignUpError('Sign up failed, please try again'));
  });
};

export const signInUser = (user, history) => dispatch => {
  axios.post(
    signInUrl,
    user,
  ).then(response => {
    dispatch({
      type: 'LOGIN_SUCCESSFUL',
      payload: {
        token: response.data.auth_token,
      },
    });
    history.push('/');
  }).catch(() => {
    dispatch(addSignInError('Incorrect email or password!'));
  });
};
