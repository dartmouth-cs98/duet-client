import * as types from "../constants/actionTypes";
import initialState from './initialState';

const userReducer = (state = initialState.user, action) => {
  switch(action.type) {
    case types.FETCH_USER_TOP_TRACKS:
      return {...state, topTracks: action.tracks}
    case types.FETCH_USER_TOP_ARTISTS:
      return {...state, topArtists: action.artists}
    case types.FETCH_USER_PROFILE: {
      const { 
        id,
        country, 
        display_name, 
        email, 
        followers, 
        images, 
        product, 
        uri
      } = action.profile;
      return {...state, id, country, display_name, email, followers, images, product, uri}
    }
    default:
      return state
  }
};

export default userReducer;