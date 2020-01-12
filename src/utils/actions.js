import { SET_COLOR, SET_IS_NINETIES_MODE } from './types';

export const setColor = color => {
  return {
    type: SET_COLOR,
    payload: color,
  }
}

export const setIsNinetiesMode = isNinetiesMode => {
  return {
    type: SET_IS_NINETIES_MODE,
    payload: isNinetiesMode,
  }
}
