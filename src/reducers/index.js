import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import authReducer from './authReducer';
import userReducer from './userReducer';
import friendReducer from './friendReducer';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  user: userReducer,
  friend: friendReducer,
});

export default rootReducer;