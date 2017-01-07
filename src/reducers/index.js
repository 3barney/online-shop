import {combineReducers} from 'redux';
import loginReducer from '../Components/Authentication/login/LoginReducer';
import registerReducer from '../Components/Authentication/register/RegisterReducer';
import categoryReducer from '../Components/Categories/CategoryReducer';

const rootReducer = combineReducers({
  loginReducer,
  registerReducer,
  categoryReducer
});

export default rootReducer;
