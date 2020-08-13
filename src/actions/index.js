export const ADD_SIGNIN_ERROR = 'ADD_LOGIN_ERROR';
export const ADD_SIGNUP_ERROR = 'ADD_SIGNUP_ERROR';
export const REMOVE_ERRORS = 'REMOVE_ERRORS';
export const GET_SCHEDULES = 'GET_SCHEDULES';
export const GET_SCHEDULE = 'GET_SCHEDULE';
export const FETCH_SCHEDULES_ERROR = 'FETCH_SCHEDULES_ERROR';
export const GET_TASK = 'GET_TASK';
export const GET_TASKS = 'GET_TASKS';
export const FETCH_TASKS_ERROR = 'FETCH_TASK_ERROR';
export const CREATE_SCHEDULE_ERROR = 'CREATE_SCHEDULE_ERROR';
export const DELETE_SCHEDULE = 'DELETE_SCHEDULE';
export const DELETE_TASK = 'DELETE_TASK';
export const CREATE_SCHEDULE = 'CREATE_SCHEDULE';
export const UPDATE_SCHEDULE = 'UPDATE_SCHEDULE';
export const UPDATE_TASK = 'UPDATE_TASK';
export const CREATE_TASK = 'CREATE_TASK';
export const CREATE_TASK_ERROR = 'CREATE_TASK_ERROR';

export const addSignInError = error => ({
  type: ADD_SIGNIN_ERROR,
  payload: error,
});

export const addSignUpError = error => ({
  type: ADD_SIGNUP_ERROR,
  payload: error,
});

export const removeErrors = () => ({
  type: REMOVE_ERRORS,
});

export const getSchedules = schedules => ({
  type: GET_SCHEDULES,
  payload: schedules,
});

export const getSchedule = schedule => ({
  type: GET_SCHEDULE,
  payload: schedule,
});

export const patchSchedule = id => ({
  type: UPDATE_SCHEDULE,
  payload: id,
});

export const deleteSchedule = id => ({
  type: DELETE_SCHEDULE,
  payload: id,
});

export const postSchedule = schedule => ({
  type: CREATE_SCHEDULE,
  schedule: {
    ...schedule,
    id: schedule.id ? schedule.id : null,
  },
});

export const fetchSchedulesError = error => ({
  type: FETCH_SCHEDULES_ERROR,
  payload: error,
});

export const createScheduleError = error => ({
  type: CREATE_SCHEDULE_ERROR,
  payload: error,
});

export const getTask = task => ({
  type: GET_TASK,
  payload: task,
});

export const getTasks = tasks => ({
  type: GET_TASKS,
  payload: tasks,
});

export const patchTask = id => ({
  type: UPDATE_TASK,
  payload: id,
});

export const deleteTask = id => ({
  type: DELETE_TASK,
  payload: id,
});

export const postTask = task => ({
  type: CREATE_TASK,
  schedule: {
    ...task,
    id: task.id ? task.id : null,
  },
});

export const fetchTasksErrors = error => ({
  type: FETCH_TASKS_ERROR,
  payload: error,
});

export const createTaskError = error => ({
  type: CREATE_TASK_ERROR,
  payload: error,
});
