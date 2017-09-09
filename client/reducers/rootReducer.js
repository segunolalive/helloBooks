import { combineReducers } from 'redux';
import authReducer from './authReducer';
import bookReducer from './bookReducer';


const rootReducer = combineReducers(
  { authReducer, bookReducer }
);

export default rootReducer;
