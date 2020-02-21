import * as types from "../constants/actionTypes";

const usersReducer = (state = {}, action) => {
  switch(action.type) {
    case types.FETCH_MY_ID:
      return { ...state, my_id: action.my_id }
    case types.FETCH_USER_1:
      return { ...state, user_1: action.user }
    case types.FETCH_USER_2:
      return { ...state, user_2: action.user }
    case types.CLEAR_USERS:
      return { my_id: state.my_id} 
    default: 
      return state
  }
};

export default usersReducer;