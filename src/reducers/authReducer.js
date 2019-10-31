import * as types from '../constants/actionTypes';
import initialState from './initialState';

function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case types.FETCH_TOKEN:
      return {loggedIn: !!action.token, token: action.token}
    default:
      return state
  }
}

export default authReducer;