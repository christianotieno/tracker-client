import axios from 'axios';

import {

  getSchedule,
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

export const createSchedule = id => dispatch => {
  axios.post(
    url1,
    {
      schedule_id: id,
    },
    headers,
  ).catch(error => {
    dispatch(createScheduleError(error.message));
  });
};

export const updateSchedule = id => dispatch => {
  axios.patch(
    url1,
    {
      schedule_id: id,
    },
    headers,
  ).then(response => {
    dispatch(patchSchedule(response.data));
  }).catch(error => error);
};

export const removeSchedule = id => dispatch => {
  axios.delete(
    url1,
    {
      headers,
      data: {
        schedule_id: id,
      },
    },
  ).then(response => {
    if (response.status === 200) {
      dispatch(deleteSchedule(id));
    }
  }).catch(error => error);
};
