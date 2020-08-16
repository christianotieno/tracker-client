import axios from 'axios';

export const CREATE_SCHEDULE = 'CREATE_SCHEDULE';
export const DELETE_SCHEDULE = 'DELETE_SCHEDULE';
export const UPDATE_SCHEDULE = 'UPDATE_SCHEDULE';
export const CREATE_SCHEDULE_ERROR = 'CREATE_SCHEDULE_ERROR';
export const DISPLAY_FETCHED_SCHEDULE = 'DISPLAY_FETCHED_SCHEDULE';

export const fetchUserSchedule = id => dispatch => axios.get(`http://localhost:4000/${id}/schedules`)
  .then(response => response.data)
  .then(data => {
    dispatch({
      type: DISPLAY_FETCHED_SCHEDULE,
      payload: data,
    });
  })
  .catch(error => {
    throw (error);
  });

export const createSchedule = data => async dispatch => {
  try {
    const response = await axios({
      method: 'POST',
      url: `http://localhost:4000/users/${data.user_id}/schedules`,
      data,
      // crossdomain: true,
      // withCredentials: true,
    });
    dispatch({
      type: CREATE_SCHEDULE,
      data: {
        ...data,
        id: response.data.id ? response.data.id : null,
      },

    });
  } catch (error) {
    dispatch({ type: CREATE_SCHEDULE_ERROR, payload: error });
  }
};

export const deleteSchedule = data => async dispatch => {
  try {
    dispatch({ type: DELETE_SCHEDULE, payload: data });
    const response = await axios({
      method: 'DELETE',
      url: `http://localhost:4000/users/${data.user_id}/schedules/${data.id}`,
      data,
      // crossdomain: true,
      // withCredentials: true,
    });
    return response;
  } catch (error) {
    return (error);
  }
};

export const updateSchedule = data => async dispatch => {
  try {
    dispatch({ type: UPDATE_SCHEDULE, payload: data });
    const response = await axios({
      method: 'PATCH',
      url: `http://localhost:4000/users/${data.user_id}/schedules/${data.id}`,
      data,
      // crossdomain: true,
      // withCredentials: true,
    });
    return response;
  } catch (error) {
    return (error);
  }
};
