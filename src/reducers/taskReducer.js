import {

  CREATE_TASK,
  DELETE_TASK,
  UPDATE_TASK,
  DISPLAY_FETCHED_TASKS,

} from '../actions/task';

let objectIndex = {};
let updatedState = [];
let updateElement = {};

const taskReducer = (state = [], action) => {
  switch (action.type) {
    case DISPLAY_FETCHED_TASKS:
      return action.payload;

    case CREATE_TASK:
      return [...state, action.data];

    case DELETE_TASK:
      return state.filter(
        el => el.id !== action.payload.id,
      );

    case UPDATE_TASK:
      objectIndex = state.findIndex(
        obj => obj.id === action.payload.id,
      );

      updateElement = {
        ...state[objectIndex],
        name: action.payload.name,
        date: action.payload.date,
        done: action.payload.done,
        notes: action.payload.notes,
      };

      updatedState = [
        ...state.slice(0, objectIndex),
        updateElement,
        ...state.slice(objectIndex + 1),
      ];

      return updatedState;

    default:
      return state;
  }
};

export default taskReducer;
