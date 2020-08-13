import {
  ADD_SIGNIN_ERROR,
  ADD_SIGNUP_ERROR,
  REMOVE_ERRORS,
} from '../actions/index';

const errorReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_SIGNIN_ERROR:
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
