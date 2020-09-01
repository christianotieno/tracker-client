import {

  CREATE_SCHEDULE,
  DELETE_SCHEDULE,
  UPDATE_SCHEDULE,
  DISPLAY_FETCHED_SCHEDULE,

} from '../actions/schedule';

let objectIndex = {};
let updateObject = {};
let updatedState = [];

const scheduleReducer = (state = [], action) => {
  switch (action.type) {
    case DISPLAY_FETCHED_SCHEDULE:
      return action.payload;

    case CREATE_SCHEDULE:
      return [...state, action.data];

    case DELETE_SCHEDULE:
      return state.filter(
        el => el.id !== action.payload.id,
      );

    case UPDATE_SCHEDULE:
      objectIndex = state.findIndex(
        obj => obj.id === action.payload.id,
      );

      updateObject = {
        ...state[objectIndex],
        title: action.payload.title,
      };

      updatedState = [
        ...state.slice(0, objectIndex),
        updateObject,
        ...state.slice(objectIndex + 1),
      ];
      return updatedState;

    default:
      return state;
  }
};

export default scheduleReducer;
