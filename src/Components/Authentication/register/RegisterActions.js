import * as types from '../../../actions/actionTypes';
import RegisterApi from '../../../api/mockRegisterApi';

export function registerSuccess(registeredUser) {
  return { type: types.REGISTER_USER_SUCCESS, registeredUser};
}

// Thunks
export function registerUser(userData) {
  return function(dispatch){
    return RegisterApi.register(userData)
      .then( registeredUser => {
        console.log('In action');
        console.log(registeredUser)
        window.localStorage.setItem('user', registeredUser.token);
        dispatch(registerSuccess(registeredUser));
      })
      .catch(error => {
        throw(error);
      });
  };
}
