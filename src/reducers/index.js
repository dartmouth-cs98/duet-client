import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import authReducer from './authReducer';
import userReducer from './userReducer';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  user: userReducer,
});

export default rootReducer;