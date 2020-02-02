import * as types from "../constants/actionTypes";
import initialState from './initialState';

const userReducer = (state = initialState.user, action) => {
  switch(action.type) {
    case types.FETCH_USER_SPOTIFY_PROFILE: {
      const { 
        id,
        display_name, 
        email, 
        images, 
      } = action.profile;
      return {...state, id, display_name, email, images }
    }
    case types.FETCH_USER_TOP_ARTISTS:
      return { ...state, topArtists: action.topArtists }
    case types.FETCH_USER_FRIENDS:
      return { ...state, friends: action.friends }
    case types.FETCH_USER_TASTE:
      return { ...state, taste: action.taste, avg_taste: action.avg_taste }
    case types.FETCH_TOP_GENRES:
      return { ...state, genre_counts: action.genre_counts }
    case types.FETCH_DECADE:
      return { ...state, decade: action.decade}
    case types.FETCH_TRENDEX:
      return { ...state, trendex: action.trendex }
    case types.ADD_FRIEND:
      return { ...state, friends: [ ...state.friends, action.friend ]}
    case types.CLEAR_USER:
      return {}
    default:
      return state
  }
};

export default userReducer;