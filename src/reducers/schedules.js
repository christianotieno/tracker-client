const GET_SCHEDULES = 'GET_SCHEDULES';
const CREATE_SCHEDULE = 'CREATE_SCHEDULE';
const DELETE_SCHEDULE = 'DELETE_SCHEDULE';
const UPDATE_SCHEDULE = 'UPDATE_SCHEDULE';

let updateObject = {};
let objectIndex = {};
let updatedState = [];

const scheduleReducer = (state = [], action) => {
  switch (action.type) {
    case GET_SCHEDULES:
      return action.payload;

    case CREATE_SCHEDULE:
      return [...state, action.data];

    case DELETE_SCHEDULE:
      return state.filter(
        element => element.id !== action.payload.id,
      );

    case UPDATE_SCHEDULE:
      objectIndex = state.findIndex(
        object => object.id === action.payload.id,
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
    default: return state;
  }
};

export default scheduleReducer;
