import axios from 'axios';
import qs from 'qs';
import * as configFile from '../../../config/config';
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
    return axios.post(`${configFile.BASE_API_URL}/user/login`, qs.stringify(credentials))
      .then( loggedUser => {
        window.localStorage.setItem('shopID_token', loggedUser.data.token);
        dispatch(loginSuccess(loggedUser.data.userData));
      })
      .catch( error => {
        throw((error.response.data));
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
