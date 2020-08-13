import { combineReducers } from 'redux';
import scheduleReducer from './schedulesReducer';
import taskReducer from './taskReducer';
import errorReducer from './error';
import authReducer from './auth';

const rootReducer = () => combineReducers({
  schedule: scheduleReducer,
  error: errorReducer,
  task: taskReducer,
  auth: authReducer,
});

export default rootReducer;
