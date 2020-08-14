const GET_TASK = 'GET_TASK';
const GET_TASKS = 'GET_TASKS';
const CREATE_TASK = 'CREATE_TASK';
const UPDATE_TASK = 'UPDATE_TASK';
const DELETE_TASK = 'DELETE_TASK';
const GET_TASKS_ERROR = 'GET_TASK_ERROR';
const CREATE_TASK_ERROR = 'CREATE_TASK_ERROR';

const CLEAR_SCHEDULE = 'CLEAR_SCHEDULE';
const GET_SCHEDULE = 'GET_SCHEDULE';
const GET_SCHEDULES = 'GET_SCHEDULES';
const DELETE_SCHEDULE = 'DELETE_SCHEDULE';
const CREATE_SCHEDULE = 'CREATE_SCHEDULE';
const UPDATE_SCHEDULE = 'UPDATE_SCHEDULE';
const GET_SCHEDULES_ERROR = 'GET_SCHEDULES_ERROR';
const CREATE_SCHEDULE_ERROR = 'CREATE_SCHEDULE_ERROR';

const REMOVE_ERRORS = 'REMOVE_ERRORS';
const ADD_SIGNIN_ERROR = 'ADD_SIGN_ERROR';
const ADD_SIGNUP_ERROR = 'ADD_SIGNUP_ERROR';

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

export const clearSchedule = () => ({
  type: CLEAR_SCHEDULE,
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
  type: GET_SCHEDULES_ERROR,
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
  type: GET_TASKS_ERROR,
  payload: error,
});

export const createTaskError = error => ({
  type: CREATE_TASK_ERROR,
  payload: error,
});
