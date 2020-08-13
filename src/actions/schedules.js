import axios from 'axios';

import {

  getSchedule,
  postSchedule,
  getSchedules,
  patchSchedule,
  deleteSchedule,
  fetchSchedulesError,
  createScheduleError,

} from './index';

const token = localStorage.getItem('token');

const url1 = () => 'http://localhost:4000/schedules';
const url2 = id => `http://localhost:4000/schedules/${id}`;

const headers = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const fetchSchedules = () => dispatch => {
  axios.get(
    url1,
    headers,
  ).then(response => {
    dispatch(getSchedules(response.data));
  }).catch(error => {
    dispatch(fetchSchedulesError(error.message));
  });
};

export const fetchSchedule = () => dispatch => {
  axios.get(
    url2,
    headers,
  ).then(response => {
    dispatch(getSchedule(response.data));
  }).catch(error => error);
};

export const createSchedule = () => dispatch => {
  axios.post(
    url1,
    headers,
  ).then(response => {
    dispatch(postSchedule(response.data));
  }).catch(error => {
    dispatch(createScheduleError(error.message));
  });
};

export const updateSchedule = () => dispatch => {
  axios.patch(
    url2,
    headers,
  ).then(response => {
    dispatch(patchSchedule(response.data));
  }).catch(error => error);
};

export const removeSchedule = () => dispatch => {
  axios.delete(
    url2,
    headers,
  ).then(response => {
    dispatch(deleteSchedule(response.data));
  }).catch(error => error);
};
