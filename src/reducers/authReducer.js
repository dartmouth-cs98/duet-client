import * as types from '../constants/actionTypes';
import initialState from './initialState';

function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case types.STORE_SPOTIFY_TOKEN:
      return { ...state, spotify_token: action.token }
    case types.STORE_TOKEN:
      return { ...state, loggedIn: !!action.token, token: action.token}
    case types.CLEAR_AUTH:
      return {loggedIn: false, token: null}
    default:
      return state
  }
}

export default authReducer;