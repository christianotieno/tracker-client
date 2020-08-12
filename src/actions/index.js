const ADD_SIGNIN_ERROR = 'ADD_LOGIN_ERROR';
const ADD_SIGNUP_ERROR = 'ADD_SIGNUP_ERROR';
const REMOVE_ERRORS = 'REMOVE_ERRORS';

export const addSignInError = error => ({
  type: ADD_SIGNIN_ERROR,
  payload: error,
});

export const addSignUpError = error => ({
  type: ADD_SIGNUP_ERROR,
  payload: error,
});

export const removeErrors = () => ({
  type: REMOVE_ERRORS,
});
