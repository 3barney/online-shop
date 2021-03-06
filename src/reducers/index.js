import {combineReducers} from 'redux';
import loginReducer from '../Components/Authentication/login/LoginReducer';
import registerReducer from '../Components/Authentication/register/RegisterReducer';
import categoryReducer from '../Components/Categories/CategoryReducer';
import productsReducer from '../Components/Products/ProductReducer';

const appReducer = combineReducers({
  loginReducer,
  registerReducer,
  categoryReducer,
  productsReducer
});

const rootReducer = (state, action) => {
  // PERFORMS LOGOUT BY RESETING THE STATE
  if (action.type === 'LOG_OUT_SUCCESS') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
