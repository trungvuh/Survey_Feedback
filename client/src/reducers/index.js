import { combineReducers } from 'redux';
import auth from './authReducer';

export default combineReducers({
  // if key and value is the same, we dont have to type out the value
  auth
});
