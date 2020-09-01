import { combineReducers } from 'redux';
import scheduleReducer from './scheduleReducer';
import taskReducer from './taskReducer';
import userReducer from './userReducer';

const rootReducer = () => combineReducers({
  schedule: scheduleReducer,
  task: taskReducer,
  user: userReducer,
});

export default rootReducer;
