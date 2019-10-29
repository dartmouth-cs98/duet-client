import * as types from '../constants/actionTypes';
import initialState from './initialState';

function authReducer(state = initialState.auth, action) {
  if (action.type === types.FETCH_TOKEN) {
    return {loggedIn: !!action.token, token: action.token};
  }
  return state;
}

export default authReducer;