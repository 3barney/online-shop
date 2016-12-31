import {combineReducers} from 'redux';
import loginReducer from '../Components/Authentication/login/LoginReducer';
import registerReducer from '../Components/Authentication/register/RegisterReducer';

const rootReducer = combineReducers({
  loginReducer,
  registerReducer
});

export default rootReducer;
