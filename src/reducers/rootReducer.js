import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
import scheduleReducer from './scheduleReducer';
import taskReducer from './taskReducer';
import userReducer from './userReducer';

const rootReducer = () => combineReducers({
  schedule: scheduleReducer,
  session: sessionReducer,
  task: taskReducer,
  user: userReducer,
});

export default rootReducer;
