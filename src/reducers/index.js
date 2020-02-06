import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import authReducer from './authReducer';
import userReducer from './usersReducer';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  users: userReducer,
});

export default rootReducer;