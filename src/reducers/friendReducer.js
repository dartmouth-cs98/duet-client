import initialState from './initialState';
import * as types from "../constants/actionTypes";

const friendReducer = (state = initialState.friend, action) => {
  switch(action.type) {
    case types.FETCH_FRIEND:
      return action.friend;
    case types.CLEAR_FRIEND:
      return {}
    default:
      return state
  }
};

export default friendReducer;