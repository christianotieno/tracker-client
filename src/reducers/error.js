const REMOVE_ERRORS = 'REMOVE_ERRORS';
const ADD_LOGIN_ERROR = 'ADD_LOGIN_ERROR';
const ADD_SIGNUP_ERROR = 'ADD_SIGNUP_ERROR';

const errorReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_LOGIN_ERROR:
      return {
        loginError: action.payload,
      };
    case ADD_SIGNUP_ERROR:
      return {
        signupError: action.payload,
      };
    case REMOVE_ERRORS:
      return {};
    default: return state;
  }
};

export default errorReducer;
