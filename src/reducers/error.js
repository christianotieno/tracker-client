const ADD_SIGNIN_ERROR = 'ADD_SIGNIN_ERROR';
const ADD_SIGNUP_ERROR = 'ADD_SIGNUP_ERROR';
const FETCH_SCHEDULES_ERROR = 'FETCH_SCHEDULES_ERROR';
const FETCH_SCHEDULE_ERROR = 'FETCH_SCHEDULE_ERROR';
const FETCH_TASKS_ERROR = 'FETCH_TASKS_ERROR';
const ADD_TASK_ERROR = 'ADD_TASK_ERROR';
const REMOVE_TASK_ERROR = 'REMOVE_TASK_ERROR';
const REMOVE_ERRORS = 'REMOVE_ERRORS';

const errorReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_SIGNIN_ERROR:
      return {
        signInError: action.payload,
      };
    case ADD_SIGNUP_ERROR:
      return {
        signUpError: action.payload,
      };
    case FETCH_SCHEDULES_ERROR:
      return {
        fetchSchedulesError: action.payload,
      };
    case FETCH_SCHEDULE_ERROR:
      return {
        fetchScheduleError: action.payload,
      };
    case FETCH_TASKS_ERROR:
      return {
        fetchTaskError: action.payload,
      };
    case REMOVE_TASK_ERROR:
      return {
        removeTaskError: action.payload,
      };
    case ADD_TASK_ERROR:
      return {
        addTaskError: action.payload,
      };
    case REMOVE_ERRORS:
      return {};
    default: return state;
  }
};

export default errorReducer;
