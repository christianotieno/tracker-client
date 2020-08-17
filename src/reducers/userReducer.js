import {

  LOGGED_IN,
  CREATE_USER,
  LOGIN_USER,
  LOGOUT_USER,
  LOGGED_IN_ERROR,
  CREATE_USER_ERROR,

} from '../actions/user';

const initialState = {
  isLogin: false,
  user: {
    name: '',
    id: 0,
  },
  errors: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return {
        isLogin: true,
        user: {
          name: action.payload.user.name,
          password: action.payload.user.password,
          id: action.payload.user.id,
        },
      };

    case LOGGED_IN_ERROR:
      return {
        isLogin: false,
        user: {},
      };

    case CREATE_USER:
      return {
        isLogin: true,
        user: {
          id: action.payload.id,
          name: action.payload.name,
          password: action.payload.password,
          passwordConfirmation: action.payload.passwordConfirmation,
        },
      };

    case CREATE_USER_ERROR:
      return {
        isLogin: false,
        error: action.payload,
      };

    case LOGIN_USER:
      if (action.payload.user) {
        return {
          isLogin: true,
          user: {
            name: action.payload.user.name,
            id: action.payload.user.id,
          },
        };
      }
      return {
        isLogin: false,
        errors: action.payload.errors,
      };

    case LOGOUT_USER:
      return {
        isLogin: false,
        user: {},
        schedule: {},
      };

    default:
      return state;
  }
};
export default userReducer;
