import axios from 'axios';

import {

  getTask,
  postTask,
  getTasks,
  patchTask,
  deleteTask,
  fetchTasksErrors,
  createTaskError,

} from './index';

const token = localStorage.getItem('token');

const url1 = scheduleId => `http://localhost:4000/schedules/${scheduleId}/tasks`;

const url2 = (
  scheduleId, taskId,
) => `http://localhost:4000/schedules/${scheduleId}/tasks${taskId}`;

const headers = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const fetchTasks = () => dispatch => {
  axios.get(
    url1,
    headers,
  ).then(response => {
    dispatch(getTasks(response.data));
  }).catch(error => {
    dispatch(fetchTasksErrors(error.message));
  });
};

export const fetchTask = () => dispatch => {
  axios.get(
    url2,
    headers,
  ).then(response => {
    dispatch(getTask(response.data));
  }).catch(error => error);
};

export const createTask = () => dispatch => {
  axios.post(
    url1,
    headers,
  ).then(response => {
    dispatch(postTask(response.data));
  }).catch(error => {
    dispatch(createTaskError(error.message));
  });
};

export const updateSchedule = () => dispatch => {
  axios.patch(
    url2,
    headers,
  ).then(response => {
    dispatch(patchTask(response.data));
  }).catch(error => error);
};

export const removeSchedule = () => dispatch => {
  axios.delete(
    url2,
    headers,
  ).then(response => {
    dispatch(deleteTask(response.data));
  }).catch(error => error);
};
