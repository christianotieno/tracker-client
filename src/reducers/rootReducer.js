import { combineReducers } from 'redux';
import scheduleReducer from './scheduleReducer';
import taskReducer from './taskReducer';
import authReducer from './authReducer';

const rootReducer = () => combineReducers({
  schedule: scheduleReducer,
  task: taskReducer,
  auth: authReducer,
});

export default rootReducer;
