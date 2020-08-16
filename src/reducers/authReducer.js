import {

  SIGNED_IN,
  CREATE_USER,
  SIGNIN_USER,
  SIGNOUT_USER,
  SIGNED_IN_ERROR,
  CREATE_USER_ERROR,

} from '../actions/auth';

const initialState = {
  isSignIn: false,
  user: {
    name: '',
    id: 0,
  },
  errors: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNED_IN:
      return {
        isSignIn: true,
        user: {
          name: action.payload.user.name,
          password: action.payload.user.password,
          id: action.payload.user.id,
        },
      };

    case SIGNED_IN_ERROR:
      return {
        isSignIn: false,
        user: {},
      };

    case CREATE_USER:
      return {
        isSignIn: true,
        user: {
          id: action.payload.id,
          name: action.payload.name,
          password: action.payload.password,
          passwordConfirmation: action.payload.passwordConfirmation,
        },
      };

    case CREATE_USER_ERROR:
      return {
        isSignIn: false,
        error: action.payload,
      };

    case SIGNIN_USER:
      if (action.payload.user) {
        return {
          isSignIn: true,
          user: {
            name: action.payload.user.name,
            id: action.payload.user.id,
          },
        };
      }
      return {
        isSignIn: false,
        errors: action.payload.errors,
      };

    case SIGNOUT_USER:
      return {
        isSignIn: false,
        user: {},
        schedule: {},
      };

    default:
      return state;
  }
};
export default authReducer;
