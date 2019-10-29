import * as types from "../constants/actionTypes";
import initialState from './initialState';

function userReducer(state = initialState.user, action) {
  if (action.type === types.FETCH_USER_TOP_TRACKS) {
    return {...state, topTracks: action.tracks}
  }
  if (action.type === types.FETCH_USER_TOP_ARTISTS) {
    return {...state, topArtists: action.artists}
  }
  return state;
}

export default userReducer;