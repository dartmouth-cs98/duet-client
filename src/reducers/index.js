import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import authReducer from './authReducer';
import userReducer from './userReducer';
import compareReducer from './compareReducer';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  user: userReducer,
  compare: compareReducer,
});

export default rootReducer;