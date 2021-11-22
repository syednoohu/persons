import {combineReducers} from 'redux';
import alertReducer from './alertReducer';
import dummyReducer from './dummyReducer';
import authReducer from './authReducer';

export default  combineReducers({
  alert : alertReducer,
  dummy : dummyReducer,
  auth : authReducer
});
