import axios from 'axios';

export const CREATE_TASK = 'CREATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const CREATE_TASK_ERROR = 'CREATE_TASK_ERROR';
export const DISPLAY_FETCHED_TASKS = 'DISPLAY_FETCHED_TASKS';

export const fetchScheduleTasks = (
  userid, scheduleid,
) => dispatch => axios.get(
  `http://localhost:4000/users/${userid}/schedules/${scheduleid}/tasks`,
)
  .then(response => response.data)
  .then(data => {
    dispatch({
      type: DISPLAY_FETCHED_TASKS,
      payload: data,
    });
  })
  .catch(error => {
    throw (error);
  });

export const createTask = data => async dispatch => {
  try {
    const response = await axios({
      method: 'POST',
      url: `http://localhost:4000/users/${data.user_id}/schedules/${data.schedule_id}/tasks `,
      data,
      crossdomain: true,
      withCredentials: true,
    });
    dispatch({
      type: CREATE_TASK,
      data: {
        ...data,
        id: response.data.id ? response.data.id : null,
      },

    });
  } catch (error) {
    dispatch({ type: CREATE_TASK_ERROR, payload: error });
  }
};

export const deleteTask = data => async dispatch => {
  try {
    dispatch({ type: DELETE_TASK, payload: data });
    const response = await axios({
      method: 'DELETE',
      url: `http://localhost:4000/users/${data.user_id}/schedules/${data.schedule_id}/tasks/${data.id}`,
      data,
      crossdomain: true,
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return (error);
  }
};

export const updateTask = data => async dispatch => {
  try {
    dispatch({
      type: UPDATE_TASK,
      payload: data,
    });
    const response = await axios({
      method: 'PATCH',
      url: `http://localhost:4000/users/${data.user_id}/schedules/${data.schedule_id}/tasks/${data.id}`,
      data,
      crossdomain: true,
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return (error);
  }
};
