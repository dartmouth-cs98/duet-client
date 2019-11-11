import initialState from './initialState';
import * as types from "../constants/actionTypes";

const friendReducer = (state = initialState.friend, action) => {
  switch(action.type) {
    case types.FETCH_FRIEND:
      return action.friend;
    default:
      return state
  }
};

export default friendReducer;