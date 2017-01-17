import axios from 'axios';
import qs from 'qs';
import * as configFile from '../../../config/config';
import * as types from '../../../actions/actionTypes';
import RegisterApi from '../../../api/mockRegisterApi';

export function registerSuccess(registeredUser) {
  return { type: types.REGISTER_USER_SUCCESS, registeredUser};
}

// TODO: Add capability to check if token exists then dont set
// Thunks
export function registerUser(userData) {
  return function(dispatch) {
    return axios.post(`${configFile.BASE_API_URL}/user/register`, qs.stringify(userData))
      .then(registeredUser => {
        window.localStorage.setItem('shopID_token', registeredUser.data.token);
        dispatch(registerSuccess(registeredUser.data));
      })
      .catch(error => {
        throw(error.response.data);
      });
  }
}


/*
, {userData}
export function registerUser({ email, firstName, lastName, password }) {
  return function(dispatch) {
    axios.post(`${API_URL}/auth/register`, { email, firstName, lastName, password })
    .then(response => {
      cookie.save('token', response.data.token, { path: '/' });
      dispatch({ type: AUTH_USER });
      window.location.href = CLIENT_ROOT_URL + '/dashboard';
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
}
*/
