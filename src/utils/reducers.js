import { SET_COLOR, SET_IS_NINETIES_MODE } from './types';

export const ninetiesReducer = (state = false, action) => {
  switch(action.type) {
    case SET_IS_NINETIES_MODE:
      return action.payload;
    default:
      return state;
  }
}

export const colorReducer = (state = "blue", action) => {
  switch(action.type) {
    case SET_COLOR:
      return action.payload;
    default:
      return state;
  }
}
