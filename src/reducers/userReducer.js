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
    case types.FETCH_USER_TASTE:
      return { ...state, taste: action.taste, avg_taste: action.avg_taste }
    case types.FETCH_TOP_GENRES:
      return { ...state, genre_counts: action.genre_counts }
    case types.FETCH_TOP_DECADES:
      return { ...state, decade_counts: action.decade_counts}
    case types.FETCH_TRACK_POPULARITIES:
      return { ...state, popularities: action.popularities }
    default:
      return state
  }
};

export default userReducer;