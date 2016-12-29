import {combineReducers} from 'redux';
import loginReducer from '../Components/Authentication/login/LoginReducer';

const rootReducer = combineReducers({
  loginReducer
});

export default rootReducer;
