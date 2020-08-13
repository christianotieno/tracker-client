import { combineReducers } from 'redux';
import authReducer from './auth';
import errorReducer from './error';
import scheduleReducer from './schedulesReducer';

const rootReducer = () => combineReducers({
  auth: authReducer,
  error: errorReducer,
  schedule: scheduleReducer,
});

export default rootReducer;
