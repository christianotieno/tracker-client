import { combineReducers } from 'redux';
import scheduleReducer from './schedules';
import errorReducer from './error';
import taskReducer from './tasks';
import authReducer from './auth';

const reducer = () => combineReducers({
  schedule: scheduleReducer,
  error: errorReducer,
  task: taskReducer,
  auth: authReducer,
});

export default reducer;
