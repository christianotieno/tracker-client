import axios from 'axios';
import { addSignUpError, addLogInError } from './index';

const postSignUp = 'http://localhost:4000/signup';
const postSignIn = 'http://localhost:4000/auth/login';

const registerUser = (user, history) => dispatch => {
  axios.post(postSignUp, user)
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

const loginUser = (user, history) => dispatch => {
  axios.post(postSignIn, user)
    .then(res => {
      dispatch({
        type: 'LOGIN_SUCCESSFUL',
        payload: { token: res.data.auth_token },
      });
      history.push('/');
    }).catch(() => {
      dispatch(addLogInError('Incorrect email or password!'));
    });
};

export { registerUser, loginUser };
