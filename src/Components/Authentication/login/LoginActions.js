import * as types from '../../../actions/actionTypes';
import LoginApi from '../../../api/mockLoginApi';

export function loginSuccess(user) {
  return {type: types.LOG_IN_SUCCESS, user};
}

export function logoutSuccess(){
  return {type: types.LOG_OUT_SUCCESS};
}

// THUNK
export function loginUser(credentials) {
  return function(dispatch) {
    // dispatch(beginAjaxCall)
    return LoginApi.login(credentials)
      .then( user => {
        window.localStorage.setItem('shopID_token', user.token);
        dispatch(loginSuccess(user));
      })
      .catch(error => {
        throw(error);
      });
  };
}

export function logoutUser(){
  return function(dispatch) {
    try {
      window.localStorage.removeItem('shopID_token');
      window.localStorage.removeItem('loggedInUser');
      return dispatch(logoutSuccess());
    } catch (error) {
      throw(error);
    }
  };


}
