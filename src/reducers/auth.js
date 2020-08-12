const SIGNIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL';
const SIGNOUT_SUCCESSFUL = 'LOGOUT_SUCCESSFUL';
const SIGNUP_SUCCESSFUL = 'SIGNUP_SUCCESSFUL';
const SIGNIN_UNSUCCESSFUL = 'LOGIN_UNSUCCESSFUL';
const SIGNUP_UNSUCCESSFUL = 'SIGNUP_UNSUCCESSFUL';

const token = localStorage.getItem('token');
let isAuth = false;

if (token) isAuth = true;

const initialState = {
  token,
  isAuth,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESSFUL:
    case SIGNUP_SUCCESSFUL:
      localStorage.setItem('token', action.payload.token);
      return {
        token: action.payload.token,
        isAuth: true,
      };
    case SIGNOUT_SUCCESSFUL:
    case SIGNIN_UNSUCCESSFUL:
    case SIGNUP_UNSUCCESSFUL:
      localStorage.removeItem('token');
      return {
        token: null,
        isAuth: false,
      };
    default: return state;
  }
};

export default authReducer;
