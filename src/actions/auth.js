import axios from 'axios';
import { addSignUpError, addSignInError } from './index';

const signUpUrl = 'http://localhost:4000/signup';
const signInUrl = 'http://localhost:4000/auth/login';

const signUpUser = (user, history) => dispatch => {
  axios.post(signUpUrl, user)
    .then(res => {
      dispatch({
        type: 'SIGNUP_SUCCESSFUL',
        payload: { token: res.data.auth_token },
      });
      history.push('/');
    }).catch(() => {
      dispatch(addSignUpError('Sign up failed, please try again'));
    });
};

const signInUser = (user, history) => dispatch => {
  axios.post(signInUrl, user)
    .then(res => {
      dispatch({
        type: 'LOGIN_SUCCESSFUL',
        payload: { token: res.data.auth_token },
      });
      history.push('/');
    }).catch(() => {
      dispatch(addSignInError('Incorrect email or password!'));
    });
};

export { signUpUser, signInUser };
