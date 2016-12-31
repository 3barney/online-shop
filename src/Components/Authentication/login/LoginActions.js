import * as types from '../../../actions/actionTypes';
import LoginApi from '../../../api/mockLoginApi';

export function loginSuccess(user) {
  return {type: types.LOG_IN_SUCCESS, user};
}

// THUNK
export function loginUser(credentials) {
  return function(dispatch) {
    // dispatch(beginAjaxCall)
    return LoginApi.login(credentials)
      .then( user => {
        window.localStorage.setItem('token', user.token);
        dispatch(loginSuccess(user));
      })
      .catch(error => {
        throw(error);
      });
  };
}
