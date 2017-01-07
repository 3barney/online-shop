import {combineReducers} from 'redux';
import loginReducer from '../Components/Authentication/login/LoginReducer';
import registerReducer from '../Components/Authentication/register/RegisterReducer';
import categoryReducer from '../Components/Categories/CategoryReducer';

const appReducer = combineReducers({
  loginReducer,
  registerReducer,
  categoryReducer
});

const rootReducer = (state, action) => {
  // PERFORMS LOGOUT BY RESETING THE STATE
  if (action.type === 'LOG_OUT_SUCCESS') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
