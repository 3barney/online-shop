import * as types from '../../../actions/actionTypes';
import RegisterApi from '../../../api/mockRegisterApi';

export function registerSuccess(registeredUser) {
  return { type: types.REGISTER_USER_SUCCESS, registeredUser};
}

// TODO: Add capability to check if token exists then dont set
// Thunks
export function registerUser(userData) {
  return function(dispatch){
    return RegisterApi.register(userData)
      .then( registeredUser => {
        window.localStorage.setItem('shopID_token', userData.token);
        dispatch(registerSuccess(registeredUser));
      })
      .catch(error => {
        throw(error);
      });
  };
}
